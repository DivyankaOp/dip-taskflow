const express = require('express');
const supabase = require('../lib/supabaseClient');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const SITE_SELECT = `
  id, name, client_name, project_type, location, start_date, expected_end_date,
  status, description, created_at,
  team_leader:users!projects_team_leader_id_fkey ( id, full_name ),
  coordinator:users!projects_coordinator_id_fkey ( id, full_name ),
  site_incharge:users!projects_site_incharge_id_fkey ( id, full_name )
`;

// ----------------------------- list sites (everyone, for dropdowns + table) -----------------------------
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(SITE_SELECT)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List sites error:', err.message);
    res.status(500).json({ error: 'Could not load sites' });
  }
});

// ----------------------------- add site (admin only) -----------------------------
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      name, client_name, project_type, location,
      start_date, expected_end_date,
      team_leader_id, coordinator_id, site_incharge_id,
      description
    } = req.body || {};

    if (!name || !client_name || !project_type || !location || !start_date ||
        !team_leader_id || !coordinator_id || !site_incharge_id) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        name, client_name, project_type, location,
        start_date, expected_end_date: expected_end_date || null,
        team_leader_id, coordinator_id, site_incharge_id,
        description: description || null,
        status: 'Planning'
      })
      .select(SITE_SELECT)
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Add site error:', err.message);
    res.status(500).json({ error: err.message || 'Could not add site' });
  }
});

// ----------------------------- update site team / details (admin only) -----------------------------
router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      'name', 'client_name', 'project_type', 'location', 'start_date',
      'expected_end_date', 'team_leader_id', 'coordinator_id',
      'site_incharge_id', 'description', 'status'
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select(SITE_SELECT)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Update site error:', err.message);
    res.status(500).json({ error: err.message || 'Could not update site' });
  }
});

// ----------------------------- delete site (admin only) -----------------------------
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    console.error('Delete site error:', err.message);
    res.status(500).json({ error: err.message || 'Could not delete site' });
  }
});

module.exports = router;
