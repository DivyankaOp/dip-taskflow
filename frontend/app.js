// =====================================================================
// EDIT THIS to point at your deployed backend (e.g. https://your-app.onrender.com/api)
const API_BASE = 'http://localhost:4000/api';
// =====================================================================

const els = {
  loginScreen: document.getElementById('loginScreen'),
  appScreen:   document.getElementById('appScreen'),
  loginForm:   document.getElementById('loginForm'),
  loginError:  document.getElementById('loginError'),
  loginBtn:    document.getElementById('loginBtn'),
  togglePassword: document.getElementById('togglePassword'),
  passwordInput:  document.getElementById('password'),

  userName: document.getElementById('userName'),
  userRoleTag: document.getElementById('userRoleTag'),
  logoutBtn: document.getElementById('logoutBtn'),
  tabBar: document.getElementById('tabBar'),

  addTaskForm: document.getElementById('addTaskForm'),
  addTaskMsg: document.getElementById('addTaskMsg'),
  fDepartment: document.getElementById('f-department'),
  fEmployee: document.getElementById('f-employee'),
  fProject: document.getElementById('f-project'),
  fTaskType: document.getElementById('f-tasktype'),

  filterDepartment: document.getElementById('filter-department'),
  filterEmployee: document.getElementById('filter-employee'),
  filterStatus: document.getElementById('filter-status'),
  clearAllFilters: document.getElementById('clearAllFilters'),
  allTasksList: document.getElementById('allTasksList'),

  myFilterStatus: document.getElementById('my-filter-status'),
  myTasksList: document.getElementById('myTasksList'),

  toast: document.getElementById('toast')
};

let state = {
  token: localStorage.getItem('tf_token') || null,
  user: JSON.parse(localStorage.getItem('tf_user') || 'null'),
  master: { departments: [], projects: [], taskTypes: [], employees: [] },
  activeView: null
};

// ----------------------------- helpers -----------------------------
function showToast(message, type = '') {
  els.toast.textContent = message;
  els.toast.className = `toast ${type}`;
  els.toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { els.toast.hidden = true; }, 3200);
}

async function api(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {};
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  if (!isForm && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : (body ? JSON.stringify(body) : undefined)
  });

  if (res.status === 401) {
    logout();
    throw new Error('Session expired, please log in again');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

function fillSelect(select, items, { placeholder, valueKey = 'id', labelKey = 'name' } = {}) {
  select.innerHTML = '';
  if (placeholder) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = placeholder;
    select.appendChild(opt);
  }
  items.forEach((item) => {
    const opt = document.createElement('option');
    opt.value = item[valueKey];
    opt.textContent = item[labelKey];
    select.appendChild(opt);
  });
}

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

// ----------------------------- auth -----------------------------
els.togglePassword.addEventListener('click', () => {
  const isPw = els.passwordInput.type === 'password';
  els.passwordInput.type = isPw ? 'text' : 'password';
  els.togglePassword.textContent = isPw ? '🙈' : '👁';
});

els.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.loginError.hidden = true;
  els.loginBtn.disabled = true;
  els.loginBtn.textContent = 'Logging in...';

  try {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const { token, user } = await api('/auth/login', { method: 'POST', body: { username, password } });

    state.token = token;
    state.user = user;
    localStorage.setItem('tf_token', token);
    localStorage.setItem('tf_user', JSON.stringify(user));

    enterApp();
  } catch (err) {
    els.loginError.textContent = err.message;
    els.loginError.hidden = false;
  } finally {
    els.loginBtn.disabled = false;
    els.loginBtn.textContent = 'Log in';
  }
});

function logout() {
  state.token = null;
  state.user = null;
  localStorage.removeItem('tf_token');
  localStorage.removeItem('tf_user');
  els.appScreen.hidden = true;
  els.loginScreen.hidden = false;
  els.loginForm.reset();
}
els.logoutBtn.addEventListener('click', logout);

// ----------------------------- app shell -----------------------------
async function enterApp() {
  els.loginScreen.hidden = true;
  els.appScreen.hidden = false;
  els.userName.textContent = state.user.full_name;
  els.userRoleTag.textContent = state.user.role;

  buildTabs();

  if (state.user.role === 'admin') {
    await loadMasterData();
    switchView('add');
  } else {
    switchView('my');
  }
}

function buildTabs() {
  const tabs = state.user.role === 'admin'
    ? [
        { key: 'add', label: 'Add new task' },
        { key: 'all', label: 'All delegated tasks' },
        { key: 'my',  label: 'My tasks' }
      ]
    : [{ key: 'my', label: 'My tasks' }];

  els.tabBar.innerHTML = '';
  tabs.forEach((t) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = t.label;
    btn.dataset.view = t.key;
    btn.addEventListener('click', () => switchView(t.key));
    els.tabBar.appendChild(btn);
  });
}

function switchView(viewKey) {
  state.activeView = viewKey;
  document.querySelectorAll('.view').forEach((v) => { v.hidden = true; });
  document.getElementById(`view-${viewKey}`).hidden = false;

  document.querySelectorAll('.tab-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === viewKey);
  });

  if (viewKey === 'all') loadAllTasks();
  if (viewKey === 'my') loadMyTasks();
}

// ----------------------------- master data (admin) -----------------------------
async function loadMasterData() {
  try {
    const [departments, projects, taskTypes, employees] = await Promise.all([
      api('/master/departments'),
      api('/master/projects'),
      api('/master/task-types'),
      api('/master/employees')
    ]);
    state.master = { departments, projects, taskTypes, employees };

    fillSelect(els.fDepartment, departments, { placeholder: 'Select department' });
    fillSelect(els.fEmployee, employees, { placeholder: 'Select employee', labelKey: 'full_name' });
    fillSelect(els.fProject, projects, { placeholder: 'Select project' });
    fillSelect(els.fTaskType, taskTypes, { placeholder: 'Select task type' });

    fillSelect(els.filterDepartment, departments, { placeholder: 'All departments' });
    fillSelect(els.filterEmployee, employees, { placeholder: 'All employees', labelKey: 'full_name' });
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ----------------------------- Add New Task (admin) -----------------------------
els.addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.addTaskMsg.hidden = true;

  const formData = new FormData();
  formData.append('department_id', els.fDepartment.value);
  formData.append('assigned_to', els.fEmployee.value);
  formData.append('project_id', els.fProject.value);
  formData.append('task_type_id', els.fTaskType.value);
  formData.append('description', document.getElementById('f-description').value);
  formData.append('hours_to_complete', document.getElementById('f-hours').value);
  formData.append('target_date', document.getElementById('f-targetdate').value);
  formData.append('priority', document.getElementById('f-priority').value);
  formData.append('rescheduling_possible', document.getElementById('f-reschedule').value);

  const attachment = document.getElementById('f-attachment').files[0];
  const voiceNote = document.getElementById('f-voicenote').files[0];
  if (attachment) formData.append('attachment', attachment);
  if (voiceNote) formData.append('voice_note', voiceNote);

  try {
    await api('/tasks', { method: 'POST', body: formData, isForm: true });
    showToast('Task assigned ✅', 'success');
    els.addTaskForm.reset();
    document.getElementById('f-priority').value = 'Medium';
    document.getElementById('f-reschedule').value = 'false';
  } catch (err) {
    els.addTaskMsg.textContent = err.message;
    els.addTaskMsg.hidden = false;
  }
});

// ----------------------------- All Delegated Tasks (admin) -----------------------------
function buildAllTasksQuery() {
  const params = new URLSearchParams();
  if (els.filterDepartment.value) params.set('department_id', els.filterDepartment.value);
  if (els.filterEmployee.value) params.set('employee_id', els.filterEmployee.value);
  if (els.filterStatus.value) params.set('status', els.filterStatus.value);
  return params.toString();
}

async function loadAllTasks() {
  els.allTasksList.innerHTML = '<div class="empty-state">Loading tasks…</div>';
  try {
    const query = buildAllTasksQuery();
    const tasks = await api(`/tasks/all${query ? `?${query}` : ''}`);
    renderTaskList(els.allTasksList, tasks, { showAssignee: true, allowActions: true });
  } catch (err) {
    showToast(err.message, 'error');
  }
}
[els.filterDepartment, els.filterEmployee, els.filterStatus].forEach((sel) =>
  sel.addEventListener('change', loadAllTasks)
);
els.clearAllFilters.addEventListener('click', () => {
  els.filterDepartment.value = '';
  els.filterEmployee.value = '';
  els.filterStatus.value = '';
  loadAllTasks();
});

// ----------------------------- My Tasks (everyone) -----------------------------
async function loadMyTasks() {
  els.myTasksList.innerHTML = '<div class="empty-state">Loading tasks…</div>';
  try {
    const status = els.myFilterStatus.value;
    const tasks = await api(`/tasks/my${status ? `?status=${status}` : ''}`);
    renderTaskList(els.myTasksList, tasks, { showAssignee: false, allowActions: true });
  } catch (err) {
    showToast(err.message, 'error');
  }
}
els.myFilterStatus.addEventListener('change', loadMyTasks);

// ----------------------------- shared task card rendering -----------------------------
function renderTaskList(container, tasks, { showAssignee, allowActions }) {
  if (!tasks || tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="emoji">📭</span>
        No tasks found
      </div>`;
    return;
  }

  container.innerHTML = '';
  tasks.forEach((task) => container.appendChild(renderTaskCard(task, { showAssignee, allowActions })));
}

function renderTaskCard(task, { showAssignee, allowActions }) {
  const card = document.createElement('div');
  card.className = `task-card priority-${task.priority}`;

  const statusClass = task.status.replace(/\s/g, '');
  const isOwnTask = state.user.role !== 'admin' || (showAssignee === false);

  card.innerHTML = `
    <div class="task-card-top">
      <div>
        <div class="task-card-project">${task.project?.name ?? '—'}</div>
        <div class="task-card-type">${task.task_type?.name ?? '—'} · ${task.department?.name ?? '—'}</div>
      </div>
      <span class="pill pill-${task.priority}">${task.priority}</span>
    </div>

    <p class="task-card-desc">${escapeHtml(task.description)}</p>

    <div class="task-meta">
      <span><strong>${task.hours_to_complete ?? 0}h</strong> to complete</span>
      <span>Due <strong>${fmtDate(task.target_date)}</strong></span>
      ${task.attachment_url ? `<a class="attachment-link" href="${task.attachment_url}" target="_blank" rel="noopener">📎 Attachment</a>` : ''}
      ${task.voice_note_url ? `<a class="attachment-link" href="${task.voice_note_url}" target="_blank" rel="noopener">🎤 Voice note</a>` : ''}
    </div>

    ${showAssignee ? `<div class="assigned-line">Assigned to <strong>${task.assigned_to_user?.full_name ?? '—'}</strong> by ${task.assigned_by_user?.full_name ?? '—'}</div>` : ''}
    ${task.status_note ? `<div class="assigned-line">${escapeHtml(task.status_note)}</div>` : ''}

    <div class="task-card-footer">
      <span class="pill pill-${statusClass}">${task.status}</span>
      <div class="task-actions"></div>
    </div>
  `;

  const actionsEl = card.querySelector('.task-actions');
  const canAct = allowActions && (state.user.role === 'admin' || isOwnTask) && task.status !== 'Completed';

  if (canAct) {
    if (task.status === 'Pending') {
      actionsEl.appendChild(makeActionBtn('action-start', 'Start', () => updateStatus(task.id, 'In Progress')));
      actionsEl.appendChild(makeActionBtn('action-reject', 'Reject', () => {
        const reason = prompt('Reason for rejecting this task (optional):') || '';
        updateStatus(task.id, 'Rejected', reason);
      }));
    }
    if (task.status === 'In Progress') {
      actionsEl.appendChild(makeActionBtn('action-complete', 'Mark complete', () => updateStatus(task.id, 'Completed')));
    }
    if (task.status === 'Rejected') {
      actionsEl.appendChild(makeActionBtn('action-start', 'Re-open', () => updateStatus(task.id, 'Pending')));
    }
  }

  return card;
}

function makeActionBtn(cls, label, onClick) {
  const btn = document.createElement('button');
  btn.className = `action-btn ${cls}`;
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}

async function updateStatus(taskId, status, status_note) {
  try {
    await api(`/tasks/${taskId}/status`, { method: 'PATCH', body: { status, status_note } });
    showToast('Task updated ✅', 'success');
    if (state.activeView === 'all') loadAllTasks();
    else loadMyTasks();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// ----------------------------- boot -----------------------------
if (state.token && state.user) {
  enterApp();
}
