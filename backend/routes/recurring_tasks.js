// State for recurring modal
let recurringSelectedFreq = '';
let recurringEditingId = null;

// Task-type checkpoint templates: { taskTypeId -> [{ id?, label }] }
// Stored in memory per session; persisted to backend as recurring_task_checkpoints
let taskTypeCheckpointTemplates = {};

// ─── Task Type Dropdown with "+ Add" ─────────────────────────────────────────

function fillRecurringTaskTypeDropdown(taskTypes) {
  const sel = document.getElementById('rec-tasktype');
  if (!sel) return;
  sel.innerHTML = '';
  const blank = document.createElement('option');
  blank.value = ''; blank.textContent = 'Select Task Type';
  sel.appendChild(blank);
  taskTypes.forEach(tt => {
    const opt = document.createElement('option');
    opt.value = tt.id; opt.textContent = tt.name;
    sel.appendChild(opt);
  });
  // "+ Add new task type" option
  const addOpt = document.createElement('option');
  addOpt.value = '__add__'; addOpt.textContent = '+ Add new task type…';
  addOpt.style.color = '#7c3aed'; addOpt.style.fontWeight = '600';
  sel.appendChild(addOpt);
}

// When task type changes in recurring modal, show its saved checkpoints
document.addEventListener('change', async (e) => {
  if (e.target.id !== 'rec-tasktype') return;
  const val = e.target.value;

  if (val === '__add__') {
    e.target.value = '';
    const name = prompt('Enter new task type name:');
    if (!name || !name.trim()) return;
    try {
      const created = await api('/master/task-types', { method: 'POST', body: { name: name.trim() } });
      state.master.taskTypes = await api('/master/task-types');
      fillRecurringTaskTypeDropdown(state.master.taskTypes);
      // Also refresh main task type dropdowns
      fillSelect(els.fTaskType, state.master.taskTypes, { placeholder: 'Select task type' });
      document.getElementById('rec-tasktype').value = created.id;
      showToast(`Task type "${created.name}" added ✅`, 'success');
    } catch (err) { showToast(err.message, 'error'); }
    return;
  }

  // Load checkpoints for this task type if we haven't yet
  if (val && !taskTypeCheckpointTemplates[val]) {
    try {
      const templates = await api(`/recurring-tasks/task-type-checkpoints/${val}`);
      taskTypeCheckpointTemplates[val] = templates;
    } catch (_) {
      taskTypeCheckpointTemplates[val] = [];
    }
  }

  // Populate checkpoints list
  const list = document.getElementById('checkpointsList');
  if (!list) return;
  list.innerHTML = '';
  (taskTypeCheckpointTemplates[val] || []).forEach(cp => addCheckpointRow(cp.label, cp.id));
});

// ─── Checkpoint rows ──────────────────────────────────────────────────────────

function addCheckpointRow(value, templateId) {
  const list = document.getElementById('checkpointsList');
  if (!list) return;
  const row = document.createElement('div');
  row.className = 'checkpoint-row';
  row.dataset.templateId = templateId || '';
  row.innerHTML = `
    <span class="cp-drag-handle">⠿</span>
    <input type="text" class="checkpoint-input" placeholder="e.g. Check site boundary…" value="${escapeHtml(value)}" />
    <button type="button" class="cp-remove ghost-btn-text" style="color:#e53e3e" title="Remove">✕</button>
  `;
  row.querySelector('.cp-remove').addEventListener('click', () => row.remove());
  list.appendChild(row);
}

function getCheckpointValues() {
  return [...document.querySelectorAll('.checkpoint-input')]
    .map(i => i.value.trim()).filter(Boolean);
}

// ─── Open / Close Recurring Modal ────────────────────────────────────────────

function openRecurringModal(task) {
  recurringEditingId = task ? task.id : null;
  document.getElementById('recurringFormMsg').hidden = true;
  document.getElementById('checkpointsList').innerHTML = '';
  document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('weeklyDaysField').hidden = true;
  document.querySelectorAll('#weeklyDaysField input[type=checkbox]').forEach(c => c.checked = false);

  if (task) {
    document.getElementById('recurringModalTitle').textContent = '✏️ Edit Recurring Task';
    document.getElementById('saveRecurringBtn').textContent = 'Save Changes';
    document.getElementById('rec-description').value = task.description || '';
    document.getElementById('rec-start').value = task.start_date || '';
    document.getElementById('rec-end').value   = task.end_date   || '';
    if (task.department?.id)       document.getElementById('rec-department').value = task.department.id;
    if (task.project?.id)          document.getElementById('rec-project').value    = task.project.id;
    if (task.task_type?.id)        document.getElementById('rec-tasktype').value   = task.task_type.id;
    if (task.assigned_to_user?.id) document.getElementById('rec-employee').value   = task.assigned_to_user.id;
    recurringSelectedFreq = task.frequency || '';
    const freqBtn = document.querySelector(`.freq-btn[data-freq="${recurringSelectedFreq}"]`);
    if (freqBtn) freqBtn.classList.add('selected');
    if (recurringSelectedFreq === 'Weekly') {
      document.getElementById('weeklyDaysField').hidden = false;
      const days = (task.frequency_days || '').split(',').map(Number);
      document.querySelectorAll('#weeklyDaysField input[type=checkbox]')
        .forEach(c => { c.checked = days.includes(Number(c.value)); });
    }
    (task.checkpoints || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .forEach(cp => addCheckpointRow(cp.label, cp.id));
  } else {
    document.getElementById('recurringModalTitle').textContent = '🔁 Create Recurring Task';
    document.getElementById('saveRecurringBtn').textContent   = 'Next →';
    document.getElementById('rec-description').value = '';
    document.getElementById('rec-department').value  = '';
    document.getElementById('rec-employee').value    = '';
    document.getElementById('rec-tasktype').value    = '';
    document.getElementById('rec-project').value     = '';
    document.getElementById('rec-start').value       = '';
    document.getElementById('rec-end').value         = '';
    recurringSelectedFreq = '';
    recurringEditingId = null;
  }

  document.getElementById('recurringModal').hidden = false;
}

function closeRecurringModal() {
  document.getElementById('recurringModal').hidden = true;
  document.getElementById('addChecklistPrompt').hidden = true;
  recurringEditingId = null;
}

// ─── Save Recurring Task (step 1: form → step 2: checklist prompt) ───────────

let _pendingRecurringBody = null; // holds form data between steps

async function saveRecurringTask() {
  document.getElementById('recurringFormMsg').hidden = true;
  const isEdit = !!recurringEditingId;

  const assignedTo = document.getElementById('rec-employee').value;
  const description = document.getElementById('rec-description').value.trim();
  const startDate   = document.getElementById('rec-start').value;

  if (!assignedTo)   { showRecurringError('Please select an employee'); return; }
  if (!description)  { showRecurringError('Please enter a task description'); return; }
  if (!recurringSelectedFreq) { showRecurringError('Please select a frequency'); return; }
  if (!startDate)    { showRecurringError('Please select a start date'); return; }

  const freqDays = [];
  if (recurringSelectedFreq === 'Weekly') {
    document.querySelectorAll('#weeklyDaysField input[type=checkbox]:checked')
      .forEach(c => freqDays.push(Number(c.value)));
    if (!freqDays.length) { showRecurringError('Please select at least one day'); return; }
  }

  const checkpoints = getCheckpointValues();

  _pendingRecurringBody = {
    assigned_to:   assignedTo,
    department_id: document.getElementById('rec-department').value || null,
    project_id:    document.getElementById('rec-project').value    || null,
    task_type_id:  document.getElementById('rec-tasktype').value   || null,
    description,
    priority: 'Medium',
    frequency:      recurringSelectedFreq,
    frequency_days: freqDays,
    start_date:     startDate,
    end_date:       document.getElementById('rec-end').value || null,
    checkpoints
  };

  if (isEdit) {
    // In edit mode, save directly
    await doSaveRecurring(recurringEditingId, _pendingRecurringBody);
  } else {
    // In create mode — show "Add checklist?" prompt if no checkpoints yet
    if (!checkpoints.length) {
      document.getElementById('addChecklistPrompt').hidden = false;
      document.getElementById('saveRecurringBtn').hidden = true;
    } else {
      // Already has checkpoints, save directly
      await doSaveRecurring(null, _pendingRecurringBody);
    }
  }
}

function showRecurringError(msg) {
  const el = document.getElementById('recurringFormMsg');
  el.textContent = msg; el.hidden = false;
}

async function doSaveRecurring(editId, body) {
  const btn = document.getElementById('saveRecurringBtn');
  if (btn) btn.disabled = true;
  try {
    if (editId) {
      await api(`/recurring-tasks/${editId}`, { method: 'PATCH', body });
      showToast('Recurring task updated ✅', 'success');
    } else {
      await api('/recurring-tasks', { method: 'POST', body });
      showToast('Recurring task created ✅', 'success');
    }
    closeRecurringModal();
    loadRecurringView();
  } catch (err) {
    showRecurringError(err.message);
  } finally {
    if (btn) { btn.disabled = false; }
  }
}

// ─── Checklist prompt handlers ────────────────────────────────────────────────

document.addEventListener('click', async (e) => {
  if (e.target.id === 'promptYesChecklist') {
    // Hide prompt, reveal checkpoint area, restore Save btn
    document.getElementById('addChecklistPrompt').hidden = true;
    document.getElementById('saveRecurringBtn').hidden = false;
    document.getElementById('saveRecurringBtn').textContent = 'Create Recurring Task';
    document.getElementById('checkpointsSection').scrollIntoView({ behavior: 'smooth' });
    addCheckpointRow('');
    document.querySelector('.checkpoint-input')?.focus();
  }
  if (e.target.id === 'promptNoChecklist') {
    // Save without checkpoints
    document.getElementById('addChecklistPrompt').hidden = true;
    document.getElementById('saveRecurringBtn').hidden = false;
    await doSaveRecurring(null, _pendingRecurringBody);
  }
});

// ─── View loading ─────────────────────────────────────────────────────────────

async function loadRecurringView() {
  const isAdmin = state.user.role === 'admin';
  document.getElementById('openAddRecurring').hidden  = !isAdmin;
  document.getElementById('adminRecurringWrap').hidden = !isAdmin;
  document.getElementById('employeeRecurringWrap').hidden = isAdmin;

  if (isAdmin) {
    await loadAdminRecurringTasks();
  } else {
    await loadEmployeeRecurringTasks();
  }
}

// ─── Admin table ──────────────────────────────────────────────────────────────

async function loadAdminRecurringTasks() {
  const tbody = document.getElementById('recurringTasksTableBody');
  tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Loading…</td></tr>`;
  document.getElementById('adminRecurringCards').innerHTML = `<div class="empty-state">Loading…</div>`;
  try {
    const tasks = await api('/recurring-tasks/all');
    renderAdminRecurringTable(tasks);
    renderAdminRecurringCards(tasks);
  } catch (err) { showToast(err.message, 'error'); }
}

function freqLabel(task) {
  if (task.frequency === 'Weekly' && task.frequency_days) {
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const days = task.frequency_days.split(',').map(Number).map(d => dayNames[d]).join(', ');
    return `Weekly (${days})`;
  }
  return task.frequency || '—';
}

function renderAdminRecurringTable(tasks) {
  const tbody = document.getElementById('recurringTasksTableBody');
  if (!tasks.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">No recurring tasks yet — click "+ Add recurring task" to create one</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach(task => {
    const tr = document.createElement('tr');
    const cpCount = (task.checkpoints || []).length;
    const desc = (task.description || '').slice(0, 70) + ((task.description || '').length > 70 ? '…' : '');
    tr.innerHTML = `
      <td><strong>${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong>
          <div style="font-size:11px;color:#888">${escapeHtml(task.department?.name ?? '')}</div></td>
      <td style="max-width:180px">${escapeHtml(desc)}</td>
      <td><span style="font-size:12px">${escapeHtml(freqLabel(task))}</span></td>
      <td style="font-size:12px">${escapeHtml(task.start_date ?? '—')} →<br>${escapeHtml(task.end_date ?? 'ongoing')}</td>
      <td>${cpCount ? `<span style="font-size:12px">✅ ${cpCount} checkpoint${cpCount>1?'s':''}</span>` : '<span style="color:#aaa;font-size:12px">None</span>'}</td>
      <td><span class="pill ${task.is_active ? 'pill-In-Progress' : 'pill-Rejected'}">${task.is_active ? 'Active' : 'Inactive'}</span></td>
      <td class="row-actions"></td>
    `;
    const act = tr.lastElementChild;
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn action-accept'; editBtn.textContent = '✏️ Edit';
    editBtn.addEventListener('click', () => openRecurringModal(task));
    const delBtn = document.createElement('button');
    delBtn.className = 'action-btn action-reject'; delBtn.textContent = '🗑️ Delete';
    delBtn.addEventListener('click', () => deleteRecurringTask(task));
    act.append(editBtn, delBtn);
    tbody.appendChild(tr);
  });
}

function renderAdminRecurringCards(tasks) {
  const wrap = document.getElementById('adminRecurringCards');
  if (!tasks.length) { wrap.innerHTML = `<div class="empty-state">No recurring tasks yet</div>`; return; }
  wrap.innerHTML = '';
  tasks.forEach(task => {
    const cpCount = (task.checkpoints || []).length;
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <div class="task-card-header">
        <span class="pill ${task.is_active ? 'pill-In-Progress' : 'pill-Rejected'}">${task.is_active ? 'Active' : 'Inactive'}</span>
        <span style="font-size:12px;color:#888">${escapeHtml(freqLabel(task))}</span>
      </div>
      <div class="task-card-body">
        <div class="task-detail-line"><span class="task-detail-label">Employee:</span> ${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</div>
        <div class="task-detail-line"><span class="task-detail-label">Task:</span> ${escapeHtml((task.description||'').slice(0,100))}${(task.description||'').length>100?'…':''}</div>
        <div class="task-detail-line"><span class="task-detail-label">Period:</span> ${escapeHtml(task.start_date)} → ${escapeHtml(task.end_date ?? 'ongoing')}</div>
        <div class="task-detail-line"><span class="task-detail-label">Checkpoints:</span> ${cpCount ? cpCount : 'None'}</div>
      </div>
      <div class="task-card-actions">
        <button class="action-btn action-accept edit-rec-btn">✏️ Edit</button>
        <button class="action-btn action-reject del-rec-btn">🗑️ Delete</button>
      </div>
    `;
    card.querySelector('.edit-rec-btn').addEventListener('click', () => openRecurringModal(task));
    card.querySelector('.del-rec-btn').addEventListener('click', () => deleteRecurringTask(task));
    wrap.appendChild(card);
  });
}

async function deleteRecurringTask(task) {
  if (!confirm(`Delete recurring task "${(task.description||'').slice(0,50)}"?\nThis cannot be undone.`)) return;
  try {
    await api(`/recurring-tasks/${task.id}`, { method: 'DELETE' });
    showToast('Deleted ✅', 'success');
    loadRecurringView();
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Employee recurring task view ─────────────────────────────────────────────

async function loadEmployeeRecurringTasks() {
  const wrap = document.getElementById('employeeRecurringList');
  wrap.innerHTML = `<div class="empty-state">Loading your recurring tasks…</div>`;
  try {
    const tasks = await api('/recurring-tasks/my');
    renderEmployeeRecurringList(tasks);
  } catch (err) { showToast(err.message, 'error'); }
}

function renderEmployeeRecurringList(tasks) {
  const wrap = document.getElementById('employeeRecurringList');
  if (!tasks.length) {
    wrap.innerHTML = `<div class="empty-state">No recurring tasks assigned to you</div>`;
    return;
  }
  wrap.innerHTML = '';
  const today    = tasks.filter(t => t.fires_today);
  const notToday = tasks.filter(t => !t.fires_today);

  if (today.length) {
    const hdr = document.createElement('div');
    hdr.className = 'nav-section-label'; hdr.textContent = "Today's recurring tasks";
    wrap.appendChild(hdr);
    today.forEach(t => wrap.appendChild(buildEmployeeRecurringCard(t)));
  }
  if (notToday.length) {
    const hdr = document.createElement('div');
    hdr.className = 'nav-section-label';
    hdr.style.marginTop = '24px';
    hdr.textContent = 'Other recurring tasks (not due today)';
    wrap.appendChild(hdr);
    notToday.forEach(t => wrap.appendChild(buildEmployeeRecurringCard(t)));
  }
}

function buildEmployeeRecurringCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card';
  const inst = task.today_instance;
  const checkpoints = (task.checkpoints || []).sort((a, b) => a.sort_order - b.sort_order);
  const completedIds = inst ? (inst.recurring_task_checkpoint_completions || []).map(c => c.checkpoint_id) : [];
  const allDone = checkpoints.length > 0 && completedIds.length === checkpoints.length;
  const instStatus = inst?.status === 'Completed' ? 'Completed' : null;

  const status = !task.fires_today   ? 'Not today'
    : instStatus === 'Completed'     ? 'Completed'
    : checkpoints.length === 0       ? 'Due today'
    : `${completedIds.length}/${checkpoints.length} done`;

  const pillClass = allDone || instStatus === 'Completed' ? 'pill-Completed'
    : !task.fires_today ? 'pill-Rejected' : 'pill-In-Progress';

  let checkpointsHtml = '';
  if (task.fires_today && checkpoints.length > 0) {
    checkpointsHtml = `<div class="checkpoint-list" style="margin-top:12px">`;
    checkpoints.forEach(cp => {
      const done = completedIds.includes(cp.id);
      checkpointsHtml += `
        <label class="checkpoint-item ${done ? 'cp-done' : ''}" data-instance="${inst?.id || ''}" data-cp="${cp.id}">
          <input type="checkbox" class="cp-checkbox" ${done ? 'checked' : ''} ${!inst ? 'disabled' : ''} />
          <span>${escapeHtml(cp.label)}</span>
        </label>`;
    });
    checkpointsHtml += `</div>`;
  }

  card.innerHTML = `
    <div class="task-card-header">
      <span class="pill ${pillClass}">${escapeHtml(status)}</span>
      <span style="font-size:12px;color:#888">${escapeHtml(freqLabel(task))}</span>
    </div>
    <div class="task-card-body">
      <div style="font-weight:600;margin-bottom:6px">${escapeHtml(task.description ?? '')}</div>
      ${task.project   ? `<div class="task-detail-line"><span class="task-detail-label">Project:</span> ${escapeHtml(task.project.name)}</div>` : ''}
      ${task.task_type ? `<div class="task-detail-line"><span class="task-detail-label">Type:</span> ${escapeHtml(task.task_type.name)}</div>` : ''}
      <div class="task-detail-line"><span class="task-detail-label">Schedule:</span> ${escapeHtml(freqLabel(task))} · ${escapeHtml(task.start_date)} → ${escapeHtml(task.end_date ?? 'ongoing')}</div>
      ${checkpointsHtml}
      ${task.fires_today && checkpoints.length === 0 && instStatus !== 'Completed' ? `
        <div class="task-card-actions" style="margin-top:10px">
          <button class="action-btn action-accept mark-nodone-btn">✅ Mark as done</button>
        </div>` : ''}
    </div>
  `;

  // Checkbox toggle
  card.querySelectorAll('.cp-checkbox').forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const lbl = e.target.closest('label');
      const instanceId  = lbl.dataset.instance;
      const checkpointId = lbl.dataset.cp;
      if (!instanceId) return;
      cb.disabled = true;
      try {
        const updated = await api(
          `/recurring-tasks/instances/${instanceId}/checkpoints/${checkpointId}/toggle`,
          { method: 'POST' }
        );
        const tasks2 = await api('/recurring-tasks/my');
        renderEmployeeRecurringList(tasks2);
        if (updated.status === 'Completed') showToast('All checkpoints done — task completed! ✅', 'success');
      } catch (err) {
        cb.disabled = false; cb.checked = !cb.checked;
        showToast(err.message, 'error');
      }
    });
  });

  return card;
}

// ─── Wire up modal events on DOMContentLoaded ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Frequency buttons
  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      recurringSelectedFreq = btn.dataset.freq;
      document.getElementById('weeklyDaysField').hidden = recurringSelectedFreq !== 'Weekly';
    });
  });

  document.getElementById('addCheckpointBtn')?.addEventListener('click', () => addCheckpointRow(''));
  document.getElementById('saveRecurringBtn')?.addEventListener('click', saveRecurringTask);
  document.getElementById('closeRecurringModal')?.addEventListener('click', closeRecurringModal);
  document.getElementById('cancelRecurringModal')?.addEventListener('click', closeRecurringModal);
  document.getElementById('openAddRecurring')?.addEventListener('click', () => openRecurringModal(null));
});
