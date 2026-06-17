const express = require('express');
const multer = require('multer');
const supabase = require('../lib/supabaseClient');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB per file
});

const BUCKET = 'task-files';

// Nested select used everywhere we return a task, so every task always
// looks the same on the wire (matches what frontend/app.js expects).
const TASK_SELECT = `
  id, description, hours_to_complete, target_date, priority,
  rescheduling_possible, status, status_note, attachment_url, voice_note_url, created_at,
  project:projects ( id, name ),
  task_type:task_types ( id, name ),
  department:departments ( id, name ),
  assigned_to_user:users!tasks_assigned_to_fkey ( id, full_name ),
  assigned_by_user:users!tasks_assigned_by_fkey ( id, full_name )
`;

async function uploadFile(file, folder) {
  if (!file) return null;
  const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ----------------------------- create task (admin only) -----------------------------
router.post(
  '/',
  requireAdmin,
  upload.fields([
    { name: 'attachment', maxCount: 1 },
    { name: 'voice_note', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        department_id,
        assigned_to,
        project_id,
        task_type_id,
        description,
        hours_to_complete,
        target_date,
        priority,
        rescheduling_possible
      } = req.body;

      if (!department_id || !assigned_to || !project_id || !task_type_id || !description || !target_date) {
        return res.status(400).json({ error: 'Please fill in all required fields' });
      }

      const attachmentFile = req.files?.attachment?.[0];
      const voiceNoteFile = req.files?.voice_note?.[0];

      const [attachment_url, voice_note_url] = await Promise.all([
        uploadFile(attachmentFile, 'attachments'),
        uploadFile(voiceNoteFile, 'voice-notes')
      ]);

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          department_id,
          assigned_to,
          assigned_by: req.user.id,
          project_id,
          task_type_id,
          description,
          hours_to_complete: hours_to_complete ? Number(hours_to_complete) : null,
          target_date,
          priority: priority || 'Medium',
          rescheduling_possible: rescheduling_possible === 'true',
          attachment_url,
          voice_note_url,
          status: 'Pending'
        })
        .select(TASK_SELECT)
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      console.error('Create task error:', err.message);
      res.status(500).json({ error: err.message || 'Could not create task' });
    }
  }
);

// ----------------------------- all delegated tasks (admin only, reference view) -----------------------------
router.get('/all', requireAdmin, async (req, res) => {
  try {
    let query = supabase.from('tasks').select(TASK_SELECT).order('target_date', { ascending: true });

    if (req.query.department_id) query = query.eq('department_id', req.query.department_id);
    if (req.query.employee_id) query = query.eq('assigned_to', req.query.employee_id);
    if (req.query.status) query = query.eq('status', req.query.status);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List all tasks error:', err.message);
    res.status(500).json({ error: 'Could not load tasks' });
  }
});

// ----------------------------- my tasks (everyone — only their own) -----------------------------
router.get('/my', async (req, res) => {
  try {
    let query = supabase
      .from('tasks')
      .select(TASK_SELECT)
      .eq('assigned_to', req.user.id)
      .order('target_date', { ascending: true });

    if (req.query.status) query = query.eq('status', req.query.status);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List my tasks error:', err.message);
    res.status(500).json({ error: 'Could not load your tasks' });
  }
});

// ----------------------------- update status (the task's own assignee, or admin) -----------------------------
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, status_note } = req.body || {};
    const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'Rejected'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data: existing, error: fetchErr } = await supabase
      .from('tasks')
      .select('id, assigned_to')
      .eq('id', id)
      .maybeSingle();

    if (fetchErr) throw fetchErr;
    if (!existing) return res.status(404).json({ error: 'Task not found' });

    const isOwnTask = existing.assigned_to === req.user.id;
    if (!isOwnTask && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You can only update your own tasks' });
    }

    const updates = { status };
    if (status === 'Rejected') {
      updates.status_note = `Rejected by ${req.user.full_name}${status_note ? `: ${status_note}` : ''}`;
    } else if (status === 'Pending') {
      updates.status_note = null; // cleared on re-open
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select(TASK_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Update status error:', err.message);
    res.status(500).json({ error: 'Could not update task' });
  }
});

module.exports = router;
