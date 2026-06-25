const express = require('express');
const multer  = require('multer');
const supabase = require('../lib/supabaseClient');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// 10 MB limit for screenshots / screen recordings
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

const TICKET_SELECT = `
  id, category, description, status, attachment_url, solution, solution_at, created_at,
  task:tasks ( id, description ),
  raised_by_user:users!tickets_raised_by_fkey ( id, full_name ),
  solved_by_user:users!tickets_solution_by_fkey ( id, full_name )
`;

// ----------------------------- raise a ticket (anyone logged in) -----------------------------
router.post('/', upload.single('media'), async (req, res) => {
  try {
    const { task_id, category, description } = req.body || {};
    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Please describe the issue' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ error: 'Please select a category' });
    }

    // Upload screenshot / screen recording if provided
    let attachment_url = null;
    if (req.file) {
      attachment_url = await uploadFile(req.file, 'ticket-media');
    }

    const { data, error } = await supabase
      .from('tickets')
      .insert({
        task_id: task_id || null,
        raised_by: req.user.id,
        category: category.trim(),
        description: description.trim(),
        attachment_url,
        status: 'Open'
      })
      .select(TICKET_SELECT)
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Raise ticket error:', err.message);
    res.status(500).json({ error: err.message || 'Could not raise ticket' });
  }
});

// ----------------------------- list tickets -----------------------------
// Admin / can_resolve_tickets / is_mis_executive → sees all
// Everyone else → sees only their own
router.get('/', async (req, res) => {
  try {
    let seeAll = req.user.role === 'admin';
    if (!seeAll) {
      const { data: me, error: meErr } = await supabase
        .from('users')
        .select('can_resolve_tickets, is_mis_executive')
        .eq('id', req.user.id)
        .maybeSingle();
      if (meErr) throw meErr;
      seeAll = !!me?.can_resolve_tickets || !!me?.is_mis_executive;
    }

    let query = supabase.from('tickets').select(TICKET_SELECT).order('created_at', { ascending: false });
    if (!seeAll) query = query.eq('raised_by', req.user.id);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List tickets error:', err.message);
    res.status(500).json({ error: 'Could not load tickets' });
  }
});

// ----------------------------- solve (admin or can_resolve_tickets) -----------------------------
router.patch('/:id/solve', async (req, res) => {
  // Admins can always solve; other users need the can_resolve_tickets flag.
  if (req.user.role !== 'admin') {
    const { data: me, error: meErr } = await supabase
      .from('users').select('can_resolve_tickets').eq('id', req.user.id).maybeSingle();
    if (meErr || !me?.can_resolve_tickets) {
      return res.status(403).json({ error: 'You do not have permission to resolve tickets' });
    }
  }
  try {
    const { solution } = req.body || {};
    if (!solution || !solution.trim()) {
      return res.status(400).json({ error: 'Please provide a solution' });
    }
    const { data, error } = await supabase
      .from('tickets')
      .update({
        status: 'Resolved',
        solution: solution.trim(),
        solution_by: req.user.id,
        solution_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select(TICKET_SELECT)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Solve ticket error:', err.message);
    res.status(500).json({ error: 'Could not resolve ticket' });
  }
});

module.exports = router;
