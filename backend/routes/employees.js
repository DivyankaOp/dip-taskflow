const express = require('express');
const bcrypt = require('bcryptjs');
const supabase = require('../lib/supabaseClient');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);
router.use(requireAdmin); // every route here is admin-only

// ----------------------------- helpers -----------------------------

// Turns "Jignesh Thakorbhai Lad" -> "jignesh.l" (firstname.lastinitial),
// then appends a number if that username is already taken.
function slugifyName(full_name) {
  const parts = full_name.trim().toLowerCase().split(/\s+/);
  const first = parts[0].replace(/[^a-z0-9]/g, '');
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return lastInitial ? `${first}.${lastInitial}` : first;
}

async function generateUniqueUsername(full_name) {
  const base = slugifyName(full_name);
  let candidate = base;
  let suffix = 1;

  // Keep trying base, base2, base3... until we find one that's free.
  // (Loop is bounded — there's no realistic scenario with 1000s of clashes.)
  while (true) {
    const { data: existing, error } = await supabase
      .from('users')
      .select('id')
      .eq('username', candidate)
      .maybeSingle();
    if (error) throw error;
    if (!existing) return candidate;
    suffix += 1;
    candidate = `${base}${suffix}`;
  }
}

function generatePassword() {
  // 8 random alphanumeric characters — easy enough to read out/type once,
  // the employee can be asked to change it after first login if you add
  // that flow later.
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 8; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  return pwd;
}

// ----------------------------- list employees -----------------------------
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, full_name, department, designation, role, is_active, can_verify, is_mis_executive, can_add_site, can_add_employee, created_at, reporting_head_id, reporting_head:users!users_reporting_head_id_fkey ( id, full_name )')
      .order('created_at', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('List employees error:', err.message);
    res.status(500).json({ error: 'Could not load employees' });
  }
});

// ----------------------------- add employee -----------------------------
router.post('/', async (req, res) => {
  try {
    const { full_name, department, designation, role, reporting_head_id } = req.body || {};

    if (!full_name || !department || !designation || !role) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }
    if (!['admin', 'employee'].includes(role)) {
      return res.status(400).json({ error: 'Role must be admin or employee' });
    }

    const username = await generateUniqueUsername(full_name);
    const password = generatePassword();
    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert({
        username, password_hash, full_name, department, designation, role, is_active: true,
        reporting_head_id: reporting_head_id || null // optional — left blank means "no reporting head / top level"
      })
      .select('id, username, full_name, department, designation, role, is_active, reporting_head_id, reporting_head:users!users_reporting_head_id_fkey ( id, full_name )')
      .single();

    if (error) throw error;

    // Plaintext password is only ever returned here, right after creation —
    // it is not retrievable again afterwards (only the hash is stored).
    res.status(201).json({ ...data, generated_password: password });
  } catch (err) {
    console.error('Add employee error:', err.message);
    res.status(500).json({ error: err.message || 'Could not add employee' });
  }
});

// ----------------------------- update employee (details, status) -----------------------------
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, department, designation, role, is_active, can_verify, is_mis_executive, can_add_site, can_add_employee, reporting_head_id } = req.body || {};

    const updates = {};
    if (full_name !== undefined) updates.full_name = full_name;
    if (department !== undefined) updates.department = department;
    if (designation !== undefined) updates.designation = designation;
    if (role !== undefined) {
      if (!['admin', 'employee'].includes(role)) {
        return res.status(400).json({ error: 'Role must be admin or employee' });
      }
      updates.role = role;
    }
    if (is_active !== undefined) updates.is_active = is_active;
    if (can_verify !== undefined) updates.can_verify = can_verify;
    if (is_mis_executive !== undefined) updates.is_mis_executive = is_mis_executive;
    if (can_add_site !== undefined) updates.can_add_site = can_add_site;
    if (can_add_employee !== undefined) updates.can_add_employee = can_add_employee;
    // reporting_head_id is optional — '' / null clears it back to "no head / top level".
    // Can't be your own reporting head — guard against that here too (frontend already excludes it).
    if (reporting_head_id !== undefined) {
      if (reporting_head_id && String(reporting_head_id) === String(id)) {
        return res.status(400).json({ error: 'An employee cannot be their own reporting head' });
      }
      updates.reporting_head_id = reporting_head_id || null;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('id, username, full_name, department, designation, role, is_active, can_verify, is_mis_executive, can_add_site, can_add_employee, reporting_head_id, reporting_head:users!users_reporting_head_id_fkey ( id, full_name )')
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Update employee error:', err.message);
    res.status(500).json({ error: err.message || 'Could not update employee' });
  }
});

// ----------------------------- reset password -----------------------------
router.post('/:id/reset-password', async (req, res) => {
  try {
    const { id } = req.params;
    const password = generatePassword();
    const password_hash = await bcrypt.hash(password, 10);

    const { error } = await supabase.from('users').update({ password_hash }).eq('id', id);
    if (error) throw error;

    res.json({ generated_password: password });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ error: 'Could not reset password' });
  }
});

module.exports = router;
