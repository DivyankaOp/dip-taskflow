const express = require('express');
const supabase = require('../lib/supabaseClient');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const TICKET_SELECT = `
  id, description, status, created_at,
  task:tasks ( id, description ),
  raised_by_user:users!tickets_raised_by_fkey ( id, full_name )
`;

// ----------------------------- raise a ticket (anyone logged in) -----------------------------
router.post('/', async (req, res) => {
  try {
    const { task_id, description } = req.body || {};
    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Please describe the issue' });
    }

    const { data, error } = await supabase
      .from('tickets')
      .insert({
        task_id: task_id || null,
        raised_by: req.user.id,
        description: description.trim(),
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
// Admin sees every ticket; everyone else sees only their own.
router.get('/', async (req, res) => {
  try {
    let query = supabase.from('tickets').select(TICKET_SELECT).order('created_at', { ascending: false });
    if (req.user.role !== 'admin') {
      query = query.eq('raised_by', req.user.id);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List tickets error:', err.message);
    res.status(500).json({ error: 'Could not load tickets' });
  }
});

// ----------------------------- resolve a ticket (admin only) -----------------------------
router.patch('/:id/resolve', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .update({ status: 'Resolved' })
      .eq('id', req.params.id)
      .select(TICKET_SELECT)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Resolve ticket error:', err.message);
    res.status(500).json({ error: 'Could not resolve ticket' });
  }
});

module.exports = router;
