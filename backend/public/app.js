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
  filterCreatedFrom: document.getElementById('filter-created-from'),
  filterCreatedTo: document.getElementById('filter-created-to'),
  dateRangeCount: document.getElementById('dateRangeCount'),

  // My Tasks has no filter controls anymore — it always shows the
  // current user's own Pending tasks only.
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

  // verification requests
  verificationsList: document.getElementById('verificationsList'),
  verifyModal: document.getElementById('verifyModal'),
  verifyForm: document.getElementById('verifyForm'),
  verifyFormMsg: document.getElementById('verifyFormMsg'),
  verifyPerson: document.getElementById('verify-person'),
  closeVerifyModal: document.getElementById('closeVerifyModal'),
  cancelVerifyModal: document.getElementById('cancelVerifyModal'),

  // tickets
  ticketsList: document.getElementById('ticketsList'),
  openRaiseTicket: document.getElementById('openRaiseTicket'),
  ticketModal: document.getElementById('ticketModal'),
  ticketForm: document.getElementById('ticketForm'),
  ticketFormMsg: document.getElementById('ticketFormMsg'),
  ticketDescription: document.getElementById('ticket-description'),
  closeTicketModal: document.getElementById('closeTicketModal'),
  cancelTicketModal: document.getElementById('cancelTicketModal'),

  // reschedule
  rescheduleModal: document.getElementById('rescheduleModal'),
  rescheduleForm: document.getElementById('rescheduleForm'),
  rescheduleFormMsg: document.getElementById('rescheduleFormMsg'),
  rescheduleDate: document.getElementById('reschedule-date'),
  closeRescheduleModal: document.getElementById('closeRescheduleModal'),
  cancelRescheduleModal: document.getElementById('cancelRescheduleModal'),

  // reassign
  reassignModal: document.getElementById('reassignModal'),
  reassignForm: document.getElementById('reassignForm'),
  reassignFormMsg: document.getElementById('reassignFormMsg'),
  reassignEmployee: document.getElementById('reassign-employee'),
  closeReassignModal: document.getElementById('closeReassignModal'),
  cancelReassignModal: document.getElementById('cancelReassignModal'),

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
  activeView: null,
  pendingTaskId: null // which task a verify/ticket/reschedule modal currently targets
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

// Combined "deadline" string: date + time + hours-to-complete together,
// e.g. "19 Jun 2026, 4:30 PM · 6h to complete". Used in the ADMIN view —
// shows the exact target_date the admin chose when creating the task.
function fmtDeadlineWithHours(iso, hours) {
  const dateStr = fmtDate(iso);
  const hoursStr = (hours ?? hours === 0) ? `${hours}h to complete` : null;
  return hoursStr ? `${dateStr} · ${hoursStr}` : dateStr;
}

// Admin's "All delegated tasks" deadline column: date only (no time), since
// the admin just needs to see which day a task is due, not the minute.
function fmtDeadlineDateOnlyWithHours(iso, hours) {
  const dateStr = fmtDateOnly(iso);
  const hoursStr = (hours ?? hours === 0) ? `${hours}h to complete` : null;
  return hoursStr ? `${dateStr} · ${hoursStr}` : dateStr;
}

// Employee's "My Tasks" deadline: calculated as (task creation time +
// hours_to_complete), NOT the admin's chosen target_date. E.g. a task
// created at 4:49 PM with "1h to complete" shows a deadline of 5:49 PM
// the same day — this is what the employee actually needs to hit.
function fmtCalculatedDeadline(createdAtIso, hours) {
  if (!createdAtIso) return '—';
  const created = new Date(createdAtIso);
  const h = Number(hours) || 0;
  const deadline = new Date(created.getTime() + h * 60 * 60 * 1000);
  const dateStr = fmtDate(deadline.toISOString());
  return (hours ?? hours === 0) ? `${dateStr} · ${hours}h to complete` : dateStr;
}

function toDatetimeLocalValue(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
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

  if (isAdmin || state.user.can_verify) {
    const verifyLabel = document.createElement('div');
    verifyLabel.className = 'nav-section-label';
    verifyLabel.textContent = 'Verification';
    els.navList.appendChild(verifyLabel);
    els.navList.appendChild(makeNavButton('verifications', '🔎 Verification requests'));
  }

  const supportLabel = document.createElement('div');
  supportLabel.className = 'nav-section-label';
  supportLabel.textContent = 'Support';
  els.navList.appendChild(supportLabel);
  els.navList.appendChild(makeNavButton('tickets', '🎫 Tickets'));
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
  if (viewKey === 'verifications') loadVerifications();
  if (viewKey === 'tickets') loadTickets();
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
// "My Tasks" shows the current user's Pending and In Progress tasks — there
// is no filter control for employees. Completed tasks disappear from this
// view once finished (they still live forever in the admin's "All
// delegated tasks"), and Rejected tasks are hidden too. We fetch the full
// unfiltered list from /tasks/my and filter client-side, since the backend
// only supports a single exact-match status, not "anything except X/Y".
async function loadMyTasks() {
  els.myTasksList.innerHTML = '<div class="empty-state">Loading tasks…</div>';
  try {
    const allTasks = await api('/tasks/my');
    const visibleTasks = allTasks.filter(
      (task) => task.status !== 'Completed' && task.status !== 'Rejected'
    );
    renderTaskList(els.myTasksList, visibleTasks, { showAssignee: false, allowActions: true });
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ----------------------------- shared task card rendering -----------------------------
function renderTaskList(container, tasks, { showAssignee, allowActions, verificationMode = false }) {
  if (!tasks || tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="emoji">📭</span>
        No tasks found
      </div>`;
    return;
  }

  if (verificationMode) {
    container.className = 'task-list';
    container.innerHTML = '';
    tasks.forEach((task) => container.appendChild(renderTaskCard(task, { showAssignee, allowActions, verificationMode })));
    return;
  }

  // Everywhere else: cards on mobile, a table on desktop (CSS toggles which shows).
  container.className = '';
  container.innerHTML = '';

  const mobileWrap = document.createElement('div');
  mobileWrap.className = 'task-list task-list-mobile';
  tasks.forEach((task) => mobileWrap.appendChild(renderTaskCard(task, { showAssignee, allowActions })));

  const desktopWrap = document.createElement('div');
  desktopWrap.className = 'task-list-desktop table-wrap';
  desktopWrap.appendChild(renderTaskTable(tasks, { showAssignee, allowActions }));

  container.appendChild(mobileWrap);
  container.appendChild(desktopWrap);
}

// Deadline display differs by audience: the admin's "All delegated tasks"
// (showAssignee: true) shows the exact target_date the admin chose, date
// only. The employee's "My Tasks" (showAssignee: false) shows a calculated
// deadline = task creation time + hours_to_complete, with time included.
function getDeadlineHtml(task, showAssignee) {
  return showAssignee
    ? fmtDeadlineDateOnlyWithHours(task.target_date, task.hours_to_complete)
    : fmtCalculatedDeadline(task.created_at, task.hours_to_complete);
}

function verificationBadgeHtml(task) {
  if (task.verification_status === 'Pending Verification') {
    return `<div class="verify-badge pending">⏳ Sent for verification to <strong>${escapeHtml(task.verifier?.full_name ?? '—')}</strong></div>`;
  }
  if (task.verification_status === 'Verification Rejected') {
    return `<div class="verify-badge rejected">↩ Verification rejected${task.verification_note ? `: ${escapeHtml(task.verification_note)}` : ''}</div>`;
  }
  if (task.verification_status === 'Verified') {
    return `<div class="verify-badge verified">✅ Verified by <strong>${escapeHtml(task.verifier?.full_name ?? '—')}</strong></div>`;
  }
  return '';
}

// Items for the "⋮" overflow menu. In the admin's "All delegated tasks"
// view this is the primary way to manage a task; everywhere else it just
// holds the secondary actions (verification / reschedule / ticket).
function buildCardMenuItems(task, { showAssignee }) {
  const isActuallyMine = task.assigned_to_user?.id === state.user.id;
  const canManageThisTask = state.user.role === 'admin' || isActuallyMine;
  const isPendingVerification = task.verification_status === 'Pending Verification';
  const isAdminManaging = showAssignee && state.user.role === 'admin';

  const items = [];

  if (isAdminManaging) {
    if (task.status !== 'Completed') {
      items.push({ label: '✅ Mark as done', onClick: () => updateStatus(task.id, 'Completed') });
    }
    items.push({ label: '🗓️ Reschedule', onClick: () => openRescheduleModal(task.id, task.target_date) });
    items.push({ label: '🔁 Reassign', onClick: () => openReassignModal(task.id) });
    if (task.status !== 'Rejected') {
      items.push({ label: '❌ Reject task', onClick: () => {
        const reason = prompt('Reason for rejecting this task (optional):') || '';
        updateStatus(task.id, 'Rejected', reason);
      }});
    }
  } else if (task.rescheduling_possible && task.status !== 'Completed' && !isPendingVerification && canManageThisTask) {
    items.push({ label: '🗓️ Reschedule', onClick: () => openRescheduleModal(task.id, task.target_date) });
  }

  if (task.status !== 'Completed' && !isPendingVerification && canManageThisTask) {
    items.push({ label: '🔎 Send for verification', onClick: () => openVerifyModal(task.id) });
  }
  items.push({ label: '🎫 Raise a ticket', onClick: () => openTicketModal(task.id) });

  return items;
}

// The big colored Accept/Reject/Mark-complete/Re-open buttons. Hidden for
// the admin's "All delegated tasks" view, where those same actions live in
// the "⋮" menu instead (Mark as done / Reject task).
function buildPrimaryStatusButtons(task, { showAssignee, allowActions }) {
  const isOwnTask = state.user.role !== 'admin' || (showAssignee === false);
  const isPendingVerification = task.verification_status === 'Pending Verification';
  const isAdminManaging = showAssignee && state.user.role === 'admin';
  const canAct = allowActions && (state.user.role === 'admin' || isOwnTask)
    && task.status !== 'Completed' && !isPendingVerification && !isAdminManaging;

  const buttons = [];
  if (!canAct) return buttons;

  if (task.status === 'Pending') {
    buttons.push(makeActionBtn('action-start', 'Accept', () => updateStatus(task.id, 'In Progress')));
    buttons.push(makeActionBtn('action-reject', 'Reject', () => {
      const reason = prompt('Reason for rejecting this task (optional):') || '';
      updateStatus(task.id, 'Rejected', reason);
    }));
  }
  if (task.status === 'In Progress') {
    buttons.push(makeActionBtn('action-complete', 'Mark complete', () => updateStatus(task.id, 'Completed')));
  }
  if (task.status === 'Rejected') {
    buttons.push(makeActionBtn('action-start', 'Re-open', () => updateStatus(task.id, 'Pending')));
  }
  return buttons;
}

function buildCardMenuElement(task, { showAssignee }) {
  const wrap = document.createElement('div');
  wrap.className = 'card-menu';
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.className = 'card-menu-btn';
  menuBtn.setAttribute('aria-label', 'More options');
  menuBtn.textContent = '⋮';
  const menuList = document.createElement('div');
  menuList.className = 'card-menu-list';
  menuList.hidden = true;

  buildCardMenuItems(task, { showAssignee }).forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-menu-item';
    btn.textContent = item.label;
    btn.addEventListener('click', () => { menuList.hidden = true; item.onClick(); });
    menuList.appendChild(btn);
  });

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.card-menu-list').forEach((l) => { if (l !== menuList) l.hidden = true; });
    menuList.hidden = !menuList.hidden;
  });

  wrap.appendChild(menuBtn);
  wrap.appendChild(menuList);
  return wrap;
}

function renderTaskCard(task, { showAssignee, allowActions, verificationMode = false }) {
  const card = document.createElement('div');
  card.className = `task-card priority-${task.priority}`;

  const statusClass = task.status.replace(/\s/g, '');

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
      <span>Due <strong>${fmtDeadlineWithHours(task.target_date, task.hours_to_complete)}</strong></span>
      ${task.attachment_url ? `<a class="attachment-link" href="${task.attachment_url}" target="_blank" rel="noopener">📎 Attachment</a>` : ''}
      ${task.voice_note_url ? `<a class="attachment-link" href="${task.voice_note_url}" target="_blank" rel="noopener">🎤 Voice note</a>` : ''}
    </div>

    ${showAssignee ? `<div class="assigned-line">Assigned to <strong>${task.assigned_to_user?.full_name ?? '—'}</strong> by ${task.assigned_by_user?.full_name ?? '—'}</div>` : ''}
    ${task.status_note ? `<div class="assigned-line">${escapeHtml(task.status_note)}</div>` : ''}
    ${verificationBadgeHtml(task)}

    <div class="task-card-footer">
      <span class="pill pill-${statusClass}">${task.status}</span>
      <div class="task-actions"></div>
    </div>
  `;

  if (allowActions && !verificationMode) {
    card.querySelector('.task-card-top').appendChild(buildCardMenuElement(task, { showAssignee }));
  }

  const actionsEl = card.querySelector('.task-actions');

  if (verificationMode) {
    actionsEl.appendChild(makeActionBtn('action-complete', 'Approve', () => verifyTask(task.id, true)));
    actionsEl.appendChild(makeActionBtn('action-reject', 'Reject', () => {
      const note = prompt('Reason for rejecting this verification (optional):') || '';
      verifyTask(task.id, false, note);
    }));
    return card;
  }

  buildPrimaryStatusButtons(task, { showAssignee, allowActions }).forEach((btn) => actionsEl.appendChild(btn));
  return card;
}

// ----------------------------- desktop table view -----------------------------
function renderTaskTable(tasks, { showAssignee, allowActions }) {
  const table = document.createElement('table');
  table.className = 'data-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Project</th><th>Type / Dept</th>
        ${showAssignee ? '<th>Assigned to</th>' : ''}
        <th>Priority</th><th>Deadline</th><th>Status</th><th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');
  tasks.forEach((task) => tbody.appendChild(renderTaskRow(task, { showAssignee, allowActions })));
  return table;
}

function renderTaskRow(task, { showAssignee, allowActions }) {
  const tr = document.createElement('tr');
  const statusClass = task.status.replace(/\s/g, '');

  tr.innerHTML = `
    <td>${escapeHtml(task.project?.name ?? '—')}</td>
    <td>${escapeHtml(task.task_type?.name ?? '—')} · ${escapeHtml(task.department?.name ?? '—')}</td>
    ${showAssignee ? `<td>${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</td>` : ''}
    <td><span class="pill pill-${task.priority}">${task.priority}</span></td>
    <td>${fmtDeadlineWithHours(task.target_date, task.hours_to_complete)}</td>
    <td>
      <span class="pill pill-${statusClass}">${task.status}</span>
      ${verificationBadgeHtml(task)}
    </td>
    <td class="row-actions"></td>
  `;

  const actionsCell = tr.querySelector('.row-actions');
  if (allowActions) {
    buildPrimaryStatusButtons(task, { showAssignee, allowActions }).forEach((btn) => actionsCell.appendChild(btn));
    actionsCell.appendChild(buildCardMenuElement(task, { showAssignee }));
  }
  return tr;
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
    reloadCurrentTaskView();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function reloadCurrentTaskView() {
  if (state.activeView === 'all') loadAllTasks();
  else if (state.activeView === 'my') loadMyTasks();
  else if (state.activeView === 'verifications') loadVerifications();
}

// close any open 3-dot menus when clicking elsewhere on the page
document.addEventListener('click', () => {
  document.querySelectorAll('.card-menu-list').forEach((l) => { l.hidden = true; });
});

// ===================================================================
// SEND FOR VERIFICATION
// ===================================================================

async function openVerifyModal(taskId) {
  state.pendingTaskId = taskId;
  els.verifyFormMsg.hidden = true;
  els.verifyPerson.innerHTML = '<option value="">Loading…</option>';
  els.verifyModal.hidden = false;
  try {
    const verifiers = await api('/master/verifiers');
    fillSelect(els.verifyPerson, verifiers, { placeholder: 'Select a verifier', labelKey: 'full_name' });
  } catch (err) {
    els.verifyFormMsg.textContent = err.message;
    els.verifyFormMsg.hidden = false;
  }
}
els.closeVerifyModal.addEventListener('click', () => { els.verifyModal.hidden = true; });
els.cancelVerifyModal.addEventListener('click', () => { els.verifyModal.hidden = true; });

els.verifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.verifyFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/send-for-verification`, {
      method: 'PATCH',
      body: { verifier_id: els.verifyPerson.value }
    });
    showToast('Sent for verification ✅', 'success');
    els.verifyModal.hidden = true;
    reloadCurrentTaskView();
  } catch (err) {
    els.verifyFormMsg.textContent = err.message;
    els.verifyFormMsg.hidden = false;
  }
});

async function verifyTask(taskId, approved, note) {
  try {
    await api(`/tasks/${taskId}/verify`, { method: 'PATCH', body: { approved, note } });
    showToast(approved ? 'Task verified ✅' : 'Sent back to the assignee', 'success');
    loadVerifications();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function loadVerifications() {
  els.verificationsList.innerHTML = '<div class="empty-state">Loading…</div>';
  try {
    const tasks = await api('/tasks/verifications');
    renderTaskList(els.verificationsList, tasks, { showAssignee: true, allowActions: false, verificationMode: true });
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ===================================================================
// RESCHEDULE
// ===================================================================

function openRescheduleModal(taskId, currentTargetDate) {
  state.pendingTaskId = taskId;
  els.rescheduleFormMsg.hidden = true;
  els.rescheduleDate.value = toDatetimeLocalValue(currentTargetDate);
  els.rescheduleModal.hidden = false;
}
els.closeRescheduleModal.addEventListener('click', () => { els.rescheduleModal.hidden = true; });
els.cancelRescheduleModal.addEventListener('click', () => { els.rescheduleModal.hidden = true; });

els.rescheduleForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.rescheduleFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/reschedule`, {
      method: 'PATCH',
      body: { target_date: els.rescheduleDate.value }
    });
    showToast('Task rescheduled ✅', 'success');
    els.rescheduleModal.hidden = true;
    reloadCurrentTaskView();
  } catch (err) {
    els.rescheduleFormMsg.textContent = err.message;
    els.rescheduleFormMsg.hidden = false;
  }
});

// ===================================================================
// REASSIGN (admin only)
// ===================================================================

function openReassignModal(taskId) {
  state.pendingTaskId = taskId;
  els.reassignFormMsg.hidden = true;
  fillSelect(els.reassignEmployee, state.master.employees, { placeholder: 'Select employee', labelKey: 'full_name' });
  els.reassignModal.hidden = false;
}
els.closeReassignModal.addEventListener('click', () => { els.reassignModal.hidden = true; });
els.cancelReassignModal.addEventListener('click', () => { els.reassignModal.hidden = true; });

els.reassignForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.reassignFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/reassign`, {
      method: 'PATCH',
      body: { assigned_to: els.reassignEmployee.value }
    });
    showToast('Task reassigned ✅', 'success');
    els.reassignModal.hidden = true;
    reloadCurrentTaskView();
  } catch (err) {
    els.reassignFormMsg.textContent = err.message;
    els.reassignFormMsg.hidden = false;
  }
});

// ===================================================================
// TICKETS
// ===================================================================

function openTicketModal(taskId) {
  state.pendingTaskId = taskId || null;
  els.ticketFormMsg.hidden = true;
  els.ticketDescription.value = '';
  els.ticketModal.hidden = false;
}
els.openRaiseTicket.addEventListener('click', () => openTicketModal(null));
els.closeTicketModal.addEventListener('click', () => { els.ticketModal.hidden = true; });
els.cancelTicketModal.addEventListener('click', () => { els.ticketModal.hidden = true; });

els.ticketForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.ticketFormMsg.hidden = true;
  try {
    await api('/tickets', {
      method: 'POST',
      body: { task_id: state.pendingTaskId, description: els.ticketDescription.value.trim() }
    });
    showToast('Ticket raised ✅', 'success');
    els.ticketModal.hidden = true;
    if (state.activeView === 'tickets') loadTickets();
  } catch (err) {
    els.ticketFormMsg.textContent = err.message;
    els.ticketFormMsg.hidden = false;
  }
});

async function loadTickets() {
  els.ticketsList.innerHTML = '<div class="empty-state">Loading tickets…</div>';
  try {
    const tickets = await api('/tickets');
    renderTicketsList(tickets);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderTicketsList(tickets) {
  if (!tickets.length) {
    els.ticketsList.innerHTML = `<div class="empty-state"><span class="emoji">🎫</span>No tickets yet</div>`;
    return;
  }
  els.ticketsList.innerHTML = '';
  tickets.forEach((ticket) => {
    const card = document.createElement('div');
    card.className = 'ticket-card';
    card.innerHTML = `
      <div class="ticket-top">
        <span class="pill ${ticket.status === 'Open' ? 'pill-Pending' : 'pill-Completed'}">${ticket.status}</span>
        <div class="row-actions"></div>
      </div>
      <p class="ticket-desc">${escapeHtml(ticket.description)}</p>
      <div class="ticket-meta">
        Raised by <strong>${escapeHtml(ticket.raised_by_user?.full_name ?? '—')}</strong>
        ${ticket.task ? ` · on task: ${escapeHtml(ticket.task.description.slice(0, 60))}${ticket.task.description.length > 60 ? '…' : ''}` : ''}
        · ${fmtDate(ticket.created_at)}
      </div>
    `;
    if (state.user.role === 'admin' && ticket.status === 'Open') {
      const actionsCell = card.querySelector('.row-actions');
      const resolveBtn = document.createElement('button');
      resolveBtn.textContent = '✅ Mark resolved';
      resolveBtn.addEventListener('click', async () => {
        try {
          await api(`/tickets/${ticket.id}/resolve`, { method: 'PATCH' });
          showToast('Ticket resolved ✅', 'success');
          loadTickets();
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
      actionsCell.appendChild(resolveBtn);
    }
    els.ticketsList.appendChild(card);
  });
}

// ===================================================================
// MANAGE EMPLOYEES (admin only)
// ===================================================================

async function loadEmployees() {
  els.employeesTableBody.innerHTML = `<tr><td colspan="8" class="empty-state">Loading employees…</td></tr>`;
  try {
    const employees = await api('/employees');
    renderEmployeesTable(employees);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderEmployeesTable(employees) {
  if (!employees.length) {
    els.employeesTableBody.innerHTML = `<tr><td colspan="8" class="empty-state">No employees yet</td></tr>`;
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
      <td></td>
      <td class="row-actions"></td>
    `;

    const statusCell = tr.children[5];
    const statusBtn = document.createElement('button');
    statusBtn.className = `status-toggle ${emp.is_active ? 'active' : 'inactive'}`;
    statusBtn.textContent = emp.is_active ? 'Active' : 'Inactive';
    statusBtn.addEventListener('click', () => toggleEmployeeStatus(emp));
    statusCell.appendChild(statusBtn);

    const verifierCell = tr.children[6];
    const verifierBtn = document.createElement('button');
    verifierBtn.className = `status-toggle ${emp.can_verify ? 'active' : 'inactive'}`;
    verifierBtn.textContent = emp.can_verify ? 'Yes' : 'No';
    verifierBtn.addEventListener('click', () => toggleEmployeeVerifier(emp));
    verifierCell.appendChild(verifierBtn);

    const actionsCell = tr.children[7];
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

async function toggleEmployeeVerifier(emp) {
  try {
    await api(`/employees/${emp.id}`, { method: 'PATCH', body: { can_verify: !emp.can_verify } });
    showToast(`${emp.full_name} ${!emp.can_verify ? 'can now verify tasks' : 'is no longer a verifier'} ✅`, 'success');
    loadEmployees();
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
