// =====================================================================
// EDIT THIS to point at your deployed backend (e.g. https://your-app.vercel.app/api)
const API_BASE = 'https://dip-taskflow-v2.vercel.app/api';
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
  menuToggle: document.getElementById('menuToggle'),
  sidebar: document.getElementById('sidebar'),
  sidebarOverlay: document.getElementById('sidebarOverlay'),
  navList: document.getElementById('navList'),

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

  // employees
  employeesTableBody: document.getElementById('employeesTableBody'),
  openAddEmployee: document.getElementById('openAddEmployee'),
  employeeModal: document.getElementById('employeeModal'),
  employeeForm: document.getElementById('employeeForm'),
  employeeFormMsg: document.getElementById('employeeFormMsg'),
  closeEmployeeModal: document.getElementById('closeEmployeeModal'),
  cancelEmployeeModal: document.getElementById('cancelEmployeeModal'),
  credsModal: document.getElementById('credsModal'),
  credsUsername: document.getElementById('credsUsername'),
  credsPassword: document.getElementById('credsPassword'),
  closeCredsModal: document.getElementById('closeCredsModal'),
  closeCredsModalBtn: document.getElementById('closeCredsModalBtn'),

  // master data: departments & task types
  departmentsTableBody: document.getElementById('departmentsTableBody'),
  addDepartmentForm: document.getElementById('addDepartmentForm'),
  addDepartmentMsg: document.getElementById('addDepartmentMsg'),
  taskTypesTableBody: document.getElementById('taskTypesTableBody'),
  addTaskTypeForm: document.getElementById('addTaskTypeForm'),
  addTaskTypeMsg: document.getElementById('addTaskTypeMsg'),

  // sites
  sitesTableBody: document.getElementById('sitesTableBody'),
  openAddSite: document.getElementById('openAddSite'),
  siteModal: document.getElementById('siteModal'),
  siteForm: document.getElementById('siteForm'),
  siteFormMsg: document.getElementById('siteFormMsg'),
  closeSiteModal: document.getElementById('closeSiteModal'),
  cancelSiteModal: document.getElementById('cancelSiteModal'),
  siteTeamleader: document.getElementById('site-teamleader'),
  siteCoordinator: document.getElementById('site-coordinator'),
  siteIncharge: document.getElementById('site-incharge'),

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

function fmtDateOnly(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
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

// ----------------------------- sidebar toggle (mobile) -----------------------------
els.menuToggle.addEventListener('click', () => {
  els.sidebar.classList.add('open');
  els.sidebarOverlay.hidden = false;
});
els.sidebarOverlay.addEventListener('click', closeSidebar);
function closeSidebar() {
  els.sidebar.classList.remove('open');
  els.sidebarOverlay.hidden = true;
}

// ----------------------------- app shell -----------------------------
async function enterApp() {
  els.loginScreen.hidden = true;
  els.appScreen.hidden = false;
  els.userName.textContent = state.user.full_name;
  els.userRoleTag.textContent = state.user.role;

  buildNav();

  if (state.user.role === 'admin') {
    await loadMasterData();
    switchView('add');
  } else {
    switchView('my');
  }
}

function buildNav() {
  const isAdmin = state.user.role === 'admin';
  const taskItems = isAdmin
    ? [
        { key: 'add', label: '➕ Add new task' },
        { key: 'all', label: '📋 All delegated tasks' },
        { key: 'my',  label: '✅ My tasks' }
      ]
    : [{ key: 'my', label: '✅ My tasks' }];

  els.navList.innerHTML = '';

  const taskLabel = document.createElement('div');
  taskLabel.className = 'nav-section-label';
  taskLabel.textContent = 'Tasks';
  els.navList.appendChild(taskLabel);

  taskItems.forEach((t) => els.navList.appendChild(makeNavButton(t.key, t.label)));

  if (isAdmin) {
    const adminLabel = document.createElement('div');
    adminLabel.className = 'nav-section-label';
    adminLabel.textContent = 'Administration';
    els.navList.appendChild(adminLabel);

    els.navList.appendChild(makeNavButton('employees', '👥 Manage employees'));
    els.navList.appendChild(makeNavButton('sites', '🏗️ Manage sites'));
    els.navList.appendChild(makeNavButton('masterdata', '🗂️ Departments & task types'));
  }
}

function makeNavButton(key, label) {
  const btn = document.createElement('button');
  btn.className = 'nav-btn';
  btn.textContent = label;
  btn.dataset.view = key;
  btn.addEventListener('click', () => { switchView(key); closeSidebar(); });
  return btn;
}

function switchView(viewKey) {
  state.activeView = viewKey;
  document.querySelectorAll('.view').forEach((v) => { v.hidden = true; });
  document.getElementById(`view-${viewKey}`).hidden = false;

  document.querySelectorAll('.nav-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === viewKey);
  });

  if (viewKey === 'all') loadAllTasks();
  if (viewKey === 'my') loadMyTasks();
  if (viewKey === 'employees') loadEmployees();
  if (viewKey === 'sites') loadSites();
  if (viewKey === 'masterdata') loadMasterDataView();
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

    fillSelect(els.siteTeamleader, employees, { placeholder: 'Select team leader', labelKey: 'full_name' });
    fillSelect(els.siteCoordinator, employees, { placeholder: 'Select coordinator', labelKey: 'full_name' });
    fillSelect(els.siteIncharge, employees, { placeholder: 'Select site incharge', labelKey: 'full_name' });
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Re-pulls just the master employee list (used after adding/deactivating
// an employee, so dropdowns everywhere stay in sync).
async function refreshEmployeeDropdowns() {
  try {
    const employees = await api('/master/employees');
    state.master.employees = employees;
    fillSelect(els.fEmployee, employees, { placeholder: 'Select employee', labelKey: 'full_name' });
    fillSelect(els.filterEmployee, employees, { placeholder: 'All employees', labelKey: 'full_name' });
    fillSelect(els.siteTeamleader, employees, { placeholder: 'Select team leader', labelKey: 'full_name' });
    fillSelect(els.siteCoordinator, employees, { placeholder: 'Select coordinator', labelKey: 'full_name' });
    fillSelect(els.siteIncharge, employees, { placeholder: 'Select site incharge', labelKey: 'full_name' });
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

// ===================================================================
// MANAGE EMPLOYEES (admin only)
// ===================================================================

async function loadEmployees() {
  els.employeesTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">Loading employees…</td></tr>`;
  try {
    const employees = await api('/employees');
    renderEmployeesTable(employees);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderEmployeesTable(employees) {
  if (!employees.length) {
    els.employeesTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">No employees yet</td></tr>`;
    return;
  }

  els.employeesTableBody.innerHTML = '';
  employees.forEach((emp) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(emp.full_name)}</td>
      <td>${escapeHtml(emp.department ?? '—')}</td>
      <td>${escapeHtml(emp.designation ?? '—')}</td>
      <td><span class="role-pill ${emp.role}">${emp.role}</span></td>
      <td>${escapeHtml(emp.username)}</td>
      <td></td>
      <td class="row-actions"></td>
    `;

    const statusCell = tr.children[5];
    const statusBtn = document.createElement('button');
    statusBtn.className = `status-toggle ${emp.is_active ? 'active' : 'inactive'}`;
    statusBtn.textContent = emp.is_active ? 'Active' : 'Inactive';
    statusBtn.addEventListener('click', () => toggleEmployeeStatus(emp));
    statusCell.appendChild(statusBtn);

    const actionsCell = tr.children[6];
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '🔑 Reset password';
    resetBtn.addEventListener('click', () => resetEmployeePassword(emp));
    actionsCell.appendChild(resetBtn);

    els.employeesTableBody.appendChild(tr);
  });
}

async function toggleEmployeeStatus(emp) {
  try {
    await api(`/employees/${emp.id}`, { method: 'PATCH', body: { is_active: !emp.is_active } });
    showToast(`${emp.full_name} marked ${!emp.is_active ? 'active' : 'inactive'} ✅`, 'success');
    loadEmployees();
    refreshEmployeeDropdowns();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function resetEmployeePassword(emp) {
  if (!confirm(`Reset password for ${emp.full_name}?`)) return;
  try {
    const { generated_password } = await api(`/employees/${emp.id}/reset-password`, { method: 'POST' });
    els.credsUsername.textContent = emp.username;
    els.credsPassword.textContent = generated_password;
    els.credsModal.hidden = false;
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---- Add employee modal ----
els.openAddEmployee.addEventListener('click', () => {
  els.employeeForm.reset();
  els.employeeFormMsg.hidden = true;
  els.employeeModal.hidden = false;
});
els.closeEmployeeModal.addEventListener('click', () => { els.employeeModal.hidden = true; });
els.cancelEmployeeModal.addEventListener('click', () => { els.employeeModal.hidden = true; });

els.employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.employeeFormMsg.hidden = true;

  const body = {
    full_name: document.getElementById('emp-fullname').value.trim(),
    department: document.getElementById('emp-department').value.trim(),
    designation: document.getElementById('emp-designation').value.trim(),
    role: document.getElementById('emp-role').value
  };

  try {
    const created = await api('/employees', { method: 'POST', body });
    els.employeeModal.hidden = true;

    els.credsUsername.textContent = created.username;
    els.credsPassword.textContent = created.generated_password;
    els.credsModal.hidden = false;

    loadEmployees();
    refreshEmployeeDropdowns();
  } catch (err) {
    els.employeeFormMsg.textContent = err.message;
    els.employeeFormMsg.hidden = false;
  }
});

els.closeCredsModal.addEventListener('click', () => { els.credsModal.hidden = true; });
els.closeCredsModalBtn.addEventListener('click', () => { els.credsModal.hidden = true; });

// ===================================================================
// MANAGE DEPARTMENTS & TASK TYPES (admin only)
// ===================================================================

async function loadMasterDataView() {
  try {
    const [departments, taskTypes] = await Promise.all([
      api('/master/departments'),
      api('/master/task-types')
    ]);
    renderSimpleNameTable(els.departmentsTableBody, departments);
    renderSimpleNameTable(els.taskTypesTableBody, taskTypes);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderSimpleNameTable(tbody, items) {
  if (!items.length) {
    tbody.innerHTML = `<tr><td class="empty-state">None yet — add one above</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  items.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escapeHtml(item.name)}</td>`;
    tbody.appendChild(tr);
  });
}

els.addDepartmentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.addDepartmentMsg.hidden = true;
  const nameInput = document.getElementById('new-department-name');
  try {
    await api('/master/departments', { method: 'POST', body: { name: nameInput.value.trim() } });
    showToast('Department added ✅', 'success');
    nameInput.value = '';
    loadMasterDataView();
    loadMasterData(); // keep the Add Task / filter dropdowns in sync too
  } catch (err) {
    els.addDepartmentMsg.textContent = err.message;
    els.addDepartmentMsg.hidden = false;
  }
});

els.addTaskTypeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.addTaskTypeMsg.hidden = true;
  const nameInput = document.getElementById('new-tasktype-name');
  try {
    await api('/master/task-types', { method: 'POST', body: { name: nameInput.value.trim() } });
    showToast('Task type added ✅', 'success');
    nameInput.value = '';
    loadMasterDataView();
    loadMasterData();
  } catch (err) {
    els.addTaskTypeMsg.textContent = err.message;
    els.addTaskTypeMsg.hidden = false;
  }
});

// ===================================================================
// MANAGE SITES (admin only)
// ===================================================================

async function loadSites() {
  els.sitesTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">Loading sites…</td></tr>`;
  try {
    const sites = await api('/sites');
    renderSitesTable(sites);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderSitesTable(sites) {
  if (!sites.length) {
    els.sitesTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">No sites yet</td></tr>`;
    return;
  }

  els.sitesTableBody.innerHTML = '';
  sites.forEach((site) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(site.name)}</td>
      <td>${escapeHtml(site.client_name ?? '—')}</td>
      <td>${escapeHtml(site.location ?? '—')}</td>
      <td>${escapeHtml(site.project_type ?? '—')}</td>
      <td><span class="pill pill-Pending">${escapeHtml(site.status)}</span></td>
      <td>${escapeHtml(site.team_leader?.full_name ?? '—')}</td>
      <td class="row-actions"></td>
    `;

    const actionsCell = tr.children[6];
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.addEventListener('click', () => deleteSite(site));
    actionsCell.appendChild(deleteBtn);

    els.sitesTableBody.appendChild(tr);
  });
}

async function deleteSite(site) {
  if (!confirm(`Delete site "${site.name}"? This cannot be undone.`)) return;
  try {
    await api(`/sites/${site.id}`, { method: 'DELETE' });
    showToast('Site deleted', 'success');
    loadSites();
    loadMasterData(); // project dropdown used in Add Task needs refreshing too
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---- Add site modal ----
els.openAddSite.addEventListener('click', () => {
  els.siteForm.reset();
  els.siteFormMsg.hidden = true;
  els.siteModal.hidden = false;
});
els.closeSiteModal.addEventListener('click', () => { els.siteModal.hidden = true; });
els.cancelSiteModal.addEventListener('click', () => { els.siteModal.hidden = true; });

els.siteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.siteFormMsg.hidden = true;

  const body = {
    client_name: document.getElementById('site-client').value.trim(),
    name: document.getElementById('site-name').value.trim(),
    project_type: document.getElementById('site-type').value,
    location: document.getElementById('site-location').value.trim(),
    start_date: document.getElementById('site-start').value,
    expected_end_date: document.getElementById('site-end').value || null,
    team_leader_id: els.siteTeamleader.value,
    coordinator_id: els.siteCoordinator.value,
    site_incharge_id: els.siteIncharge.value,
    description: document.getElementById('site-description').value.trim()
  };

  try {
    await api('/sites', { method: 'POST', body });
    showToast('Site added ✅', 'success');
    els.siteModal.hidden = true;
    loadSites();
    loadMasterData(); // refresh project dropdown for Add Task
  } catch (err) {
    els.siteFormMsg.textContent = err.message;
    els.siteFormMsg.hidden = false;
  }
});

// ----------------------------- boot -----------------------------
if (state.token && state.user) {
  enterApp();
}
