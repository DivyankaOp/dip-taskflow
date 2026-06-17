const express = require('express');
const supabase = require('../lib/supabaseClient');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Every master-data endpoint just needs the user to be logged in.
router.use(requireAuth);

router.get('/departments', async (req, res) => {
  const { data, error } = await supabase.from('departments').select('id, name').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/projects', async (req, res) => {
  const { data, error } = await supabase.from('projects').select('id, name').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/task-types', async (req, res) => {
  const { data, error } = await supabase.from('task_types').select('id, name').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Used to populate the "Assign to" dropdown and the employee filter.
router.get('/employees', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, role')
    .eq('is_active', true)
    .order('full_name');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
