const express = require('express');
const multer  = require('multer');
const supabase = require('../lib/supabaseClient');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// 10 MB limit for attachments / voice notes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

const BUCKET = 'task-files';

async function uploadFile(file, folder) {
  if (!file) return null;
  const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file.buffer, {
    contentType: file.mimetype, upsert: false
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

const TASK_SELECT = `
  id, description, status, priority, target_date, hours_to_complete,
  rescheduling_possible, attachment_url, voice_note_url,
  verification_status, status_note, created_at,
  department:departments ( id, name ),
  project:projects ( id, name ),
  task_type:task_types ( id, name ),
  assigned_to_user:users!tasks_assigned_to_fkey ( id, full_name ),
  assigned_by_user:users!tasks_assigned_by_fkey ( id, full_name ),
  verifier:users!tasks_verifier_id_fkey ( id, full_name )
`;

// ─── Create task (admin only, multipart) ──────────────────────────────────────
router.post(
  '/',
  requireAdmin,
  upload.fields([{ name: 'attachment', maxCount: 1 }, { name: 'voice_note', maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        department_id, assigned_to, project_id, task_type_id,
        description, target_date, priority, rescheduling_possible, hours_to_complete
      } = req.body || {};

      if (!department_id || !assigned_to || !project_id || !task_type_id || !description || !target_date) {
        return res.status(400).json({ error: 'Please fill in all required fields' });
      }

      const attachmentFile  = req.files?.attachment?.[0]  || null;
      const voiceNoteFile   = req.files?.voice_note?.[0]  || null;

      const [attachment_url, voice_note_url] = await Promise.all([
        uploadFile(attachmentFile,  'attachments'),
        uploadFile(voiceNoteFile,   'voice-notes'),
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
          target_date,
          priority: priority || 'Medium',
          rescheduling_possible: rescheduling_possible === 'true' || rescheduling_possible === true,
          hours_to_complete: hours_to_complete ? Number(hours_to_complete) : null,
          attachment_url,
          voice_note_url,
          status: 'Pending',
          verification_status: 'Not Submitted'
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

// ─── List all tasks (admin only, with optional filters) ───────────────────────
router.get('/all', requireAdmin, async (req, res) => {
  try {
    let query = supabase
      .from('tasks')
      .select(TASK_SELECT)
      .order('created_at', { ascending: false });

    if (req.query.department_id) query = query.eq('department_id', req.query.department_id);
    if (req.query.employee_id)   query = query.eq('assigned_to',  req.query.employee_id);
    if (req.query.status)        query = query.eq('status',       req.query.status);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List all tasks error:', err.message);
    res.status(500).json({ error: 'Could not load tasks' });
  }
});

// ─── My tasks (logged-in user) ────────────────────────────────────────────────
router.get('/my', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select(TASK_SELECT)
      .eq('assigned_to', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List my tasks error:', err.message);
    res.status(500).json({ error: 'Could not load your tasks' });
  }
});

// ─── Tasks pending verification (verifier view) ───────────────────────────────
router.get('/verifications', async (req, res) => {
  try {
    let query = supabase
      .from('tasks')
      .select(TASK_SELECT)
      .eq('verification_status', 'Pending Verification')
      .order('created_at', { ascending: false });

    // Non-admins only see tasks assigned to them to verify
    if (req.user.role !== 'admin') {
      query = query.eq('verifier_id', req.user.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List verifications error:', err.message);
    res.status(500).json({ error: 'Could not load verification tasks' });
  }
});

// ─── Reports endpoint ─────────────────────────────────────────────────────────
router.get('/report', requireAdmin, async (req, res) => {
  try {
    const { range, from, to, employee_id, department_id } = req.query;

    let query = supabase
      .from('tasks')
      .select(TASK_SELECT)
      .order('created_at', { ascending: false });

    if (employee_id)   query = query.eq('assigned_to',  employee_id);
    if (department_id) query = query.eq('department_id', department_id);

    if (range === 'custom' && from && to) {
      query = query.gte('created_at', from).lte('created_at', to + 'T23:59:59');
    } else if (range) {
      const now = new Date();
      const cutoff = new Date();
      if (range === 'today') {
        cutoff.setHours(0, 0, 0, 0);
      } else if (range === 'week') {
        cutoff.setDate(now.getDate() - 7);
      } else if (range === 'month') {
        cutoff.setDate(now.getDate() - 30);
      }
      query = query.gte('created_at', cutoff.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Report error:', err.message);
    res.status(500).json({ error: 'Could not load report' });
  }
});

// ─── Update task status (employee marks in-progress / done) ──────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, status_note } = req.body || {};

    if (!status) return res.status(400).json({ error: 'Status is required' });

    // Employees can only update their own tasks
    const { data: existing, error: fetchErr } = await supabase
      .from('tasks').select('id, assigned_to, status').eq('id', id).maybeSingle();
    if (fetchErr) throw fetchErr;
    if (!existing) return res.status(404).json({ error: 'Task not found' });
    if (req.user.role !== 'admin' && existing.assigned_to !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own tasks' });
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({ status, status_note: status_note || null })
      .eq('id', id)
      .select(TASK_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Update task status error:', err.message);
    res.status(500).json({ error: err.message || 'Could not update task status' });
  }
});

// ─── Send for verification ────────────────────────────────────────────────────
router.patch(
  '/:id/send-for-verification',
  upload.array('files', 10),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { verifier_id } = req.body || {};

      if (!verifier_id) return res.status(400).json({ error: 'Please select a verifier' });

      // Upload any proof files
      const fileUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const url = await uploadFile(file, 'verification-proof');
          if (url) fileUrls.push(url);
        }
      }

      const updates = {
        verification_status: 'Pending Verification',
        verifier_id,
        status: 'Completed'
      };
      if (fileUrls.length > 0) updates.verification_files = fileUrls;

      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select(TASK_SELECT)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error('Send for verification error:', err.message);
      res.status(500).json({ error: err.message || 'Could not send for verification' });
    }
  }
);

// ─── Verify / approve a task ──────────────────────────────────────────────────
router.patch('/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body || {};

    const newVerifStatus = approved ? 'Verified' : 'Rejected';

    const { data, error } = await supabase
      .from('tasks')
      .update({
        verification_status: newVerifStatus,
        status: approved ? 'Completed' : 'Rejected'
      })
      .eq('id', id)
      .select(TASK_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Verify task error:', err.message);
    res.status(500).json({ error: err.message || 'Could not verify task' });
  }
});

// ─── Send correction (verifier → employee) ────────────────────────────────────
router.patch(
  '/:id/send-correction',
  upload.fields([{ name: 'voice_note', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { correction_note } = req.body || {};

      const voiceNoteFile = req.files?.voice_note?.[0] || null;
      const voice_note_url = await uploadFile(voiceNoteFile, 'correction-voice-notes');

      const updates = {
        verification_status: 'Correction Required',
        status: 'Pending'
      };
      if (correction_note) updates.correction_note = correction_note;
      if (voice_note_url)  updates.correction_voice_note_url = voice_note_url;

      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select(TASK_SELECT)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error('Send correction error:', err.message);
      res.status(500).json({ error: err.message || 'Could not send correction' });
    }
  }
);

// ─── Send updation (employee sends additional notes back) ─────────────────────
router.patch(
  '/:id/send-updation',
  upload.array('files', 10),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { updation_note } = req.body || {};

      const fileUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const url = await uploadFile(file, 'updation-files');
          if (url) fileUrls.push(url);
        }
      }

      const updates = { verification_status: 'Pending Verification' };
      if (updation_note) updates.updation_note = updation_note;
      if (fileUrls.length > 0) updates.updation_files = fileUrls;

      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select(TASK_SELECT)
        .single();

      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error('Send updation error:', err.message);
      res.status(500).json({ error: err.message || 'Could not send updation' });
    }
  }
);

// ─── Reschedule task ──────────────────────────────────────────────────────────
router.patch('/:id/reschedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { new_date, reason } = req.body || {};

    if (!new_date) return res.status(400).json({ error: 'New date is required' });

    const { data, error } = await supabase
      .from('tasks')
      .update({ target_date: new_date, reschedule_reason: reason || null })
      .eq('id', id)
      .select(TASK_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Reschedule task error:', err.message);
    res.status(500).json({ error: err.message || 'Could not reschedule task' });
  }
});

// ─── Overdue extend ───────────────────────────────────────────────────────────
router.patch('/:id/overdue-extend', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { new_date, reason } = req.body || {};

    if (!new_date) return res.status(400).json({ error: 'New date is required' });

    const { data, error } = await supabase
      .from('tasks')
      .update({ target_date: new_date, reschedule_reason: reason || null })
      .eq('id', id)
      .select(TASK_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Overdue extend error:', err.message);
    res.status(500).json({ error: err.message || 'Could not extend task deadline' });
  }
});

// ─── Reassign task (admin only) ───────────────────────────────────────────────
router.patch('/:id/reassign', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id } = req.body || {};

    if (!employee_id) return res.status(400).json({ error: 'Please select an employee' });

    const { data, error } = await supabase
      .from('tasks')
      .update({ assigned_to: employee_id, status: 'Pending', verification_status: 'Not Submitted' })
      .eq('id', id)
      .select(TASK_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Reassign task error:', err.message);
    res.status(500).json({ error: err.message || 'Could not reassign task' });
  }
});

module.exports = router;
