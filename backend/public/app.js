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
  filterCreatedTo:   document.getElementById('filter-created-to'),
  dateRangeCount:    document.getElementById('dateRangeCount'),

  myTasksList: document.getElementById('myTasksList'),

  employeesTableBody: document.getElementById('employeesTableBody'),
  employeesCards: document.getElementById('employeesCards'),
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

  editEmployeeModal: document.getElementById('editEmployeeModal'),
  editEmployeeForm: document.getElementById('editEmployeeForm'),
  editEmployeeFormMsg: document.getElementById('editEmployeeFormMsg'),
  closeEditEmployeeModal: document.getElementById('closeEditEmployeeModal'),
  cancelEditEmployeeModal: document.getElementById('cancelEditEmployeeModal'),
  editEmpId: document.getElementById('edit-emp-id'),
  editEmpFullname: document.getElementById('edit-emp-fullname'),
  editEmpDepartment: document.getElementById('edit-emp-department'),
  editEmpDesignation: document.getElementById('edit-emp-designation'),
  editEmpRole: document.getElementById('edit-emp-role'),
  editEmpPassword: document.getElementById('edit-emp-password'),
  toggleEditPassword: document.getElementById('toggleEditPassword'),

  permissionsTableBody: document.getElementById('permissionsTableBody'),

  allTasksCards: document.getElementById('allTasksCards'),

  departmentsTableBody: document.getElementById('departmentsTableBody'),
  addDepartmentForm: document.getElementById('addDepartmentForm'),
  addDepartmentMsg: document.getElementById('addDepartmentMsg'),
  taskTypesTableBody: document.getElementById('taskTypesTableBody'),
  addTaskTypeForm: document.getElementById('addTaskTypeForm'),
  addTaskTypeMsg: document.getElementById('addTaskTypeMsg'),

  verificationsList: document.getElementById('verificationsList'),
  verifyModal: document.getElementById('verifyModal'),
  verifyForm: document.getElementById('verifyForm'),
  verifyFormMsg: document.getElementById('verifyFormMsg'),
  verifyPerson: document.getElementById('verify-person'),
  closeVerifyModal: document.getElementById('closeVerifyModal'),
  cancelVerifyModal: document.getElementById('cancelVerifyModal'),

  ticketsList: document.getElementById('ticketsList'),
  openRaiseTicket: document.getElementById('openRaiseTicket'),
  ticketModal: document.getElementById('ticketModal'),
  ticketForm: document.getElementById('ticketForm'),
  ticketFormMsg: document.getElementById('ticketFormMsg'),
  ticketDescription: document.getElementById('ticket-description'),
  closeTicketModal: document.getElementById('closeTicketModal'),
  cancelTicketModal: document.getElementById('cancelTicketModal'),

  rescheduleModal: document.getElementById('rescheduleModal'),
  rescheduleForm: document.getElementById('rescheduleForm'),
  rescheduleFormMsg: document.getElementById('rescheduleFormMsg'),
  rescheduleDate: document.getElementById('reschedule-date'),
  closeRescheduleModal: document.getElementById('closeRescheduleModal'),
  cancelRescheduleModal: document.getElementById('cancelRescheduleModal'),

  reassignModal: document.getElementById('reassignModal'),
  reassignForm: document.getElementById('reassignForm'),
  reassignFormMsg: document.getElementById('reassignFormMsg'),
  reassignEmployee: document.getElementById('reassign-employee'),
  closeReassignModal: document.getElementById('closeReassignModal'),
  cancelReassignModal: document.getElementById('cancelReassignModal'),

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
  pendingTaskId: null
};

// ─── helpers ────────────────────────────────────────────────────────────────
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
    method, headers,
    body: isForm ? body : (body ? JSON.stringify(body) : undefined)
  });
  if (res.status === 401) { logout(); throw new Error('Session expired, please log in again'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

function fillSelect(select, items, { placeholder, valueKey = 'id', labelKey = 'name' } = {}) {
  select.innerHTML = '';
  if (placeholder) {
    const opt = document.createElement('option');
    opt.value = ''; opt.textContent = placeholder;
    select.appendChild(opt);
  }
  items.forEach((item) => {
    const opt = document.createElement('option');
    opt.value = item[valueKey]; opt.textContent = item[labelKey];
    select.appendChild(opt);
  });
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'
  });
}
function fmtDateOnly(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}
function fmtDeadlineDateOnlyWithHours(iso, hours) {
  const d = fmtDateOnly(iso);
  return hours != null ? `${d} · ${hours}h` : d;
}
function fmtCalculatedDeadline(createdAtIso, hours) {
  if (!createdAtIso) return '—';
  const created = new Date(createdAtIso);
  const h = Number(hours) || 0;
  const deadline = new Date(created.getTime() + h * 60 * 60 * 1000);
  const d = fmtDate(deadline.toISOString());
  return hours != null ? `${d} · ${hours}h` : d;
}
function toDatetimeLocalValue(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// ─── auth ────────────────────────────────────────────────────────────────────
els.togglePassword.addEventListener('click', () => {
  const isPw = els.passwordInput.type === 'password';
  els.passwordInput.type = isPw ? 'text' : 'password';
  els.togglePassword.textContent = isPw ? '🙈' : '👁';
});

els.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.loginError.hidden = true;
  els.loginBtn.disabled = true;
  els.loginBtn.textContent = 'Logging in…';
  try {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const { token, user } = await api('/auth/login', { method: 'POST', body: { username, password } });
    state.token = token; state.user = user;
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
  state.token = null; state.user = null;
  localStorage.removeItem('tf_token'); localStorage.removeItem('tf_user');
  els.appScreen.hidden = true; els.loginScreen.hidden = false; els.loginForm.reset();
}
els.logoutBtn.addEventListener('click', logout);

// ─── sidebar toggle (mobile) ─────────────────────────────────────────────────
els.menuToggle.addEventListener('click', () => {
  els.sidebar.classList.add('open'); els.sidebarOverlay.hidden = false;
});
els.sidebarOverlay.addEventListener('click', closeSidebar);
function closeSidebar() {
  els.sidebar.classList.remove('open'); els.sidebarOverlay.hidden = true;
}

// ─── app shell ───────────────────────────────────────────────────────────────
async function enterApp() {
  els.loginScreen.hidden = true; els.appScreen.hidden = false;
  els.userName.textContent = state.user.full_name;
  els.userRoleTag.textContent = state.user.role;
  buildNav();
  if (state.user.role === 'admin') {
    await loadMasterData(); switchView('add');
  } else {
    switchView('my');
  }
}

function buildNav() {
  const isAdmin = state.user.role === 'admin';
  const canAddSite = isAdmin || !!state.user.can_add_site;
  const canAddEmployee = isAdmin || !!state.user.can_add_employee;
  const canResolveTickets = isAdmin || !!state.user.can_resolve_tickets;

  const taskItems = isAdmin
    ? [{ key:'add', label:'➕ Add new task' }, { key:'all', label:'📋 All delegated tasks' }, { key:'my', label:'✅ My tasks' }]
    : [{ key:'my', label:'✅ My tasks' }];

  els.navList.innerHTML = '';
  const taskLabel = document.createElement('div');
  taskLabel.className = 'nav-section-label'; taskLabel.textContent = 'Tasks';
  els.navList.appendChild(taskLabel);
  taskItems.forEach((t) => els.navList.appendChild(makeNavButton(t.key, t.label)));

  if (isAdmin || canAddEmployee || canAddSite) {
    const adminLabel = document.createElement('div');
    adminLabel.className = 'nav-section-label'; adminLabel.textContent = 'Administration';
    els.navList.appendChild(adminLabel);
    if (isAdmin || canAddEmployee) els.navList.appendChild(makeNavButton('employees', '👥 Manage employees'));
    if (isAdmin || canAddSite)     els.navList.appendChild(makeNavButton('sites', '🏗️ Manage sites'));
    if (isAdmin) {
      els.navList.appendChild(makeNavButton('masterdata', '🗂️ Departments & task types'));
      els.navList.appendChild(makeNavButton('permissions', '🔐 Permissions'));
    }
  }

  if (isAdmin || state.user.can_verify) {
    const verifyLabel = document.createElement('div');
    verifyLabel.className = 'nav-section-label'; verifyLabel.textContent = 'Verification';
    els.navList.appendChild(verifyLabel);
    els.navList.appendChild(makeNavButton('verifications', '🔎 Verification requests'));
  }

  const supportLabel = document.createElement('div');
  supportLabel.className = 'nav-section-label'; supportLabel.textContent = 'Support';
  els.navList.appendChild(supportLabel);
  els.navList.appendChild(makeNavButton('tickets', '🎫 Tickets'));
}

function makeNavButton(key, label) {
  const btn = document.createElement('button');
  btn.className = 'nav-btn'; btn.textContent = label; btn.dataset.view = key;
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
  if (viewKey === 'all')           loadAllTasks();
  if (viewKey === 'my')            loadMyTasks();
  if (viewKey === 'employees')     loadEmployees();
  if (viewKey === 'sites')         loadSites();
  if (viewKey === 'masterdata')    loadMasterDataView();
  if (viewKey === 'permissions')   loadPermissions();
  if (viewKey === 'verifications') loadVerifications();
  if (viewKey === 'tickets')       loadTickets();
}

// ─── master data (admin) ─────────────────────────────────────────────────────
async function loadMasterData() {
  try {
    const [departments, projects, taskTypes, employees] = await Promise.all([
      api('/master/departments'), api('/master/projects'),
      api('/master/task-types'),  api('/master/employees')
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
  } catch (err) { showToast(err.message, 'error'); }
}

async function refreshEmployeeDropdowns() {
  try {
    const employees = await api('/master/employees');
    state.master.employees = employees;
    fillSelect(els.fEmployee, employees, { placeholder: 'Select employee', labelKey: 'full_name' });
    fillSelect(els.filterEmployee, employees, { placeholder: 'All employees', labelKey: 'full_name' });
    fillSelect(els.siteTeamleader, employees, { placeholder: 'Select team leader', labelKey: 'full_name' });
    fillSelect(els.siteCoordinator, employees, { placeholder: 'Select coordinator', labelKey: 'full_name' });
    fillSelect(els.siteIncharge, employees, { placeholder: 'Select site incharge', labelKey: 'full_name' });
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Add New Task ────────────────────────────────────────────────────────────
els.addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.addTaskMsg.hidden = true;
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
  const voiceNote  = document.getElementById('f-voicenote').files[0];
  if (attachment) formData.append('attachment', attachment);
  if (voiceNote)  formData.append('voice_note', voiceNote);
  try {
    await api('/tasks', { method: 'POST', body: formData, isForm: true });
    showToast('Task assigned ✅', 'success');
    els.addTaskForm.reset();
    document.getElementById('f-priority').value = 'Medium';
    document.getElementById('f-reschedule').value = 'false';
  } catch (err) {
    els.addTaskMsg.textContent = err.message; els.addTaskMsg.hidden = false;
  }
});

// ─── All Delegated Tasks ──────────────────────────────────────────────────────
function buildAllTasksQuery() {
  const params = new URLSearchParams();
  if (els.filterDepartment.value) params.set('department_id', els.filterDepartment.value);
  if (els.filterEmployee.value)   params.set('employee_id',   els.filterEmployee.value);
  if (els.filterStatus.value)     params.set('status',        els.filterStatus.value);
  return params.toString();
}

async function loadAllTasks() {
  const tbody = els.allTasksList;
  tbody.innerHTML = `<tr><td colspan="9" class="empty-state">Loading tasks…</td></tr>`;
  els.allTasksCards.innerHTML = `<div class="empty-state">Loading tasks…</div>`;
  try {
    const query = buildAllTasksQuery();
    let tasks = await api(`/tasks/all${query ? `?${query}` : ''}`);

    if (!els.filterStatus.value) {
      tasks = tasks.filter(
        (t) => t.status === 'Pending' || t.verification_status === 'Pending Verification'
      );
    }

    const from = els.filterCreatedFrom.value ? new Date(els.filterCreatedFrom.value) : null;
    const to   = els.filterCreatedTo.value   ? new Date(els.filterCreatedTo.value + 'T23:59:59') : null;
    if (from || to) {
      const before = tasks.length;
      tasks = tasks.filter((t) => {
        const d = new Date(t.created_at);
        if (from && d < from) return false;
        if (to   && d > to)   return false;
        return true;
      });
      const hidden = before - tasks.length;
      els.dateRangeCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''} in range${hidden ? ` · ${hidden} hidden` : ''}`;
      els.dateRangeCount.hidden = false;
    } else {
      els.dateRangeCount.hidden = true;
    }

    renderAllTasksTable(tbody, tasks);
    renderTaskList(els.allTasksCards, tasks, { showAssignee: true, allowActions: true });
  } catch (err) { showToast(err.message, 'error'); }
}

[els.filterDepartment, els.filterEmployee, els.filterStatus].forEach((sel) =>
  sel.addEventListener('change', loadAllTasks)
);
[els.filterCreatedFrom, els.filterCreatedTo].forEach((inp) =>
  inp.addEventListener('change', loadAllTasks)
);
els.clearAllFilters.addEventListener('click', () => {
  els.filterDepartment.value = ''; els.filterEmployee.value = '';
  els.filterStatus.value = ''; els.filterCreatedFrom.value = '';
  els.filterCreatedTo.value = ''; els.dateRangeCount.hidden = true;
  loadAllTasks();
});

// ── NEW: renders the admin "All delegated tasks" as the requested table format
function renderAllTasksTable(tbody, tasks) {
  if (!tasks || tasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state"><span class="emoji">📭</span>No tasks found</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');
    const statusClass = task.status.replace(/\s/g, '');

    // Sr No
    const tdSr = document.createElement('td');
    tdSr.innerHTML = `<span class="sr-number">${index + 1}</span>`;

    // Task details
    const tdDetails = document.createElement('td');
    tdDetails.className = 'task-name-cell';
    tdDetails.innerHTML = `
      <strong>${escapeHtml(task.description.length > 80 ? task.description.slice(0,80)+'…' : task.description)}</strong>
      <span>${escapeHtml(task.project?.name ?? '—')} · ${escapeHtml(task.task_type?.name ?? '—')} · ${escapeHtml(task.department?.name ?? '—')}</span>
    `;

    // Planned date
    const tdDate = document.createElement('td');
    tdDate.style.whiteSpace = 'nowrap';
    tdDate.textContent = fmtDeadlineDateOnlyWithHours(task.target_date, task.hours_to_complete);

    // Assigned to
    const tdAssigned = document.createElement('td');
    tdAssigned.innerHTML = `<strong style="font-weight:600">${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong>`;

    // Voice note
    const tdVoice = document.createElement('td');
    tdVoice.style.textAlign = 'center';
    if (task.voice_note_url) {
      const a = document.createElement('a');
      a.href = task.voice_note_url; a.target = '_blank'; a.rel = 'noopener';
      a.className = 'media-link'; a.title = 'Play voice note'; a.textContent = '🎤';
      tdVoice.appendChild(a);
    } else {
      tdVoice.innerHTML = `<span class="media-none">—</span>`;
    }

    // Attachment
    const tdAttach = document.createElement('td');
    tdAttach.style.textAlign = 'center';
    if (task.attachment_url) {
      const a = document.createElement('a');
      a.href = task.attachment_url; a.target = '_blank'; a.rel = 'noopener';
      a.className = 'media-link'; a.title = 'View attachment'; a.textContent = '📎';
      tdAttach.appendChild(a);
    } else {
      tdAttach.innerHTML = `<span class="media-none">—</span>`;
    }

    // Priority
    const tdPriority = document.createElement('td');
    tdPriority.innerHTML = `<span class="pill pill-${task.priority}">${task.priority}</span>`;

    // Status (with verification badge if applicable)
    const tdStatus = document.createElement('td');
    let statusHtml = `<span class="pill pill-${statusClass}">${task.status}</span>`;
    if (task.verification_status === 'Pending Verification') {
      statusHtml += `<br><span class="pill pill-PendingVerification" style="margin-top:4px">⏳ Verifying</span>`;
    } else if (task.verification_status === 'Verified') {
      statusHtml += `<br><span class="pill pill-Completed" style="margin-top:4px">✅ Verified</span>`;
    } else if (task.verification_status === 'Verification Rejected') {
      statusHtml += `<br><span class="pill pill-Rejected" style="margin-top:4px">↩ Rej.</span>`;
    }
    tdStatus.innerHTML = statusHtml;

    // Actions
    const tdActions = document.createElement('td');
    tdActions.className = 'row-actions';
    buildPrimaryStatusButtons(task, { showAssignee: true, allowActions: true }).forEach((btn) => tdActions.appendChild(btn));
    tdActions.appendChild(buildCardMenuElement(task, { showAssignee: true }));

    tr.append(tdSr, tdDetails, tdDate, tdAssigned, tdVoice, tdAttach, tdPriority, tdStatus, tdActions);
    tbody.appendChild(tr);
  });
}

// ─── My Tasks ────────────────────────────────────────────────────────────────
async function loadMyTasks() {
  els.myTasksList.innerHTML = '<div class="empty-state">Loading tasks…</div>';
  try {
    const allTasks = await api('/tasks/my');
    const visibleTasks = allTasks.filter(
      (task) => task.status !== 'Completed' && task.status !== 'Rejected'
    );
    renderTaskList(els.myTasksList, visibleTasks, { showAssignee: false, allowActions: true });
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── shared task card rendering (My Tasks / Verifications) ───────────────────
function renderTaskList(container, tasks, { showAssignee, allowActions, verificationMode = false }) {
  if (!tasks || tasks.length === 0) {
    container.innerHTML = `<div class="empty-state"><span class="emoji">📭</span>No tasks found</div>`;
    return;
  }
  container.classList.add('task-list');
  container.innerHTML = '';
  tasks.forEach((task) => container.appendChild(renderTaskCard(task, { showAssignee, allowActions, verificationMode })));
}

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
  if (task.status === 'In Progress' && state.user.role === 'admin') {
    buttons.push(makeActionBtn('action-complete', 'Mark complete', () => updateStatus(task.id, 'Completed')));
  }
  if (task.status === 'Rejected') {
    buttons.push(makeActionBtn('action-start', 'Re-open', () => updateStatus(task.id, 'Pending')));
  }
  return buttons;
}

function buildCardMenuElement(task, { showAssignee }) {
  const wrap = document.createElement('div'); wrap.className = 'card-menu';
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button'; menuBtn.className = 'card-menu-btn';
  menuBtn.setAttribute('aria-label', 'More options'); menuBtn.textContent = '⋮';
  const menuList = document.createElement('div');
  menuList.className = 'card-menu-list'; menuList.hidden = true;

  buildCardMenuItems(task, { showAssignee }).forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'card-menu-item'; btn.textContent = item.label;
    btn.addEventListener('click', () => { menuList.hidden = true; item.onClick(); });
    menuList.appendChild(btn);
  });

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.card-menu-list').forEach((l) => { if (l !== menuList) l.hidden = true; });
    menuList.hidden = !menuList.hidden;
  });
  wrap.appendChild(menuBtn); wrap.appendChild(menuList);
  return wrap;
}

function renderTaskCard(task, { showAssignee, allowActions, verificationMode = false }) {
  const card = document.createElement('div');
  card.className = `task-card priority-${task.priority}`;
  const statusClass = task.status.replace(/\s/g, '');
  card.innerHTML = `
    <div class="task-card-top">
      <div>
        <div class="task-card-project">${escapeHtml(task.project?.name ?? '—')}</div>
        <div class="task-card-type">${escapeHtml(task.task_type?.name ?? '—')} · ${escapeHtml(task.department?.name ?? '—')}</div>
      </div>
      <span class="pill pill-${task.priority}">${task.priority}</span>
    </div>
    <p class="task-card-desc">${escapeHtml(task.description)}</p>
    <div class="task-meta">
      <span>Due <strong>${getDeadlineHtml(task, showAssignee)}</strong></span>
      ${task.attachment_url ? `<a class="attachment-link" href="${task.attachment_url}" target="_blank" rel="noopener">📎 Attachment</a>` : ''}
      ${task.voice_note_url ? `<a class="attachment-link" href="${task.voice_note_url}" target="_blank" rel="noopener">🎤 Voice note</a>` : ''}
    </div>
    ${showAssignee ? `<div class="assigned-line">Assigned to <strong>${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong> by ${escapeHtml(task.assigned_by_user?.full_name ?? '—')}</div>` : ''}
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

function makeActionBtn(cls, label, onClick) {
  const btn = document.createElement('button');
  btn.className = `action-btn ${cls}`; btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}

async function updateStatus(taskId, status, status_note) {
  try {
    await api(`/tasks/${taskId}/status`, { method: 'PATCH', body: { status, status_note } });
    showToast('Task updated ✅', 'success'); reloadCurrentTaskView();
  } catch (err) { showToast(err.message, 'error'); }
}

function reloadCurrentTaskView() {
  if (state.activeView === 'all')           loadAllTasks();
  else if (state.activeView === 'my')       loadMyTasks();
  else if (state.activeView === 'verifications') loadVerifications();
}

document.addEventListener('click', () => {
  document.querySelectorAll('.card-menu-list').forEach((l) => { l.hidden = true; });
});

// ─── Send for verification ───────────────────────────────────────────────────
async function openVerifyModal(taskId) {
  state.pendingTaskId = taskId; els.verifyFormMsg.hidden = true;
  els.verifyPerson.innerHTML = '<option value="">Loading…</option>';
  els.verifyModal.hidden = false;
  try {
    const verifiers = await api('/master/verifiers');
    fillSelect(els.verifyPerson, verifiers, { placeholder: 'Select a verifier', labelKey: 'full_name' });
  } catch (err) { els.verifyFormMsg.textContent = err.message; els.verifyFormMsg.hidden = false; }
}
els.closeVerifyModal.addEventListener('click', () => { els.verifyModal.hidden = true; });
els.cancelVerifyModal.addEventListener('click', () => { els.verifyModal.hidden = true; });
els.verifyForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.verifyFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/send-for-verification`, {
      method: 'PATCH', body: { verifier_id: els.verifyPerson.value }
    });
    showToast('Sent for verification ✅', 'success');
    els.verifyModal.hidden = true; reloadCurrentTaskView();
  } catch (err) { els.verifyFormMsg.textContent = err.message; els.verifyFormMsg.hidden = false; }
});

async function verifyTask(taskId, approved, note) {
  try {
    await api(`/tasks/${taskId}/verify`, { method: 'PATCH', body: { approved, note } });
    showToast(approved ? 'Task verified ✅' : 'Sent back to the assignee', 'success');
    loadVerifications();
  } catch (err) { showToast(err.message, 'error'); }
}

async function loadVerifications() {
  els.verificationsList.innerHTML = '<div class="empty-state">Loading…</div>';
  try {
    const tasks = await api('/tasks/verifications');
    renderTaskList(els.verificationsList, tasks, { showAssignee: true, allowActions: false, verificationMode: true });
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Reschedule ───────────────────────────────────────────────────────────────
function openRescheduleModal(taskId, currentTargetDate) {
  state.pendingTaskId = taskId; els.rescheduleFormMsg.hidden = true;
  els.rescheduleDate.value = toDatetimeLocalValue(currentTargetDate);
  els.rescheduleModal.hidden = false;
}
els.closeRescheduleModal.addEventListener('click', () => { els.rescheduleModal.hidden = true; });
els.cancelRescheduleModal.addEventListener('click', () => { els.rescheduleModal.hidden = true; });
els.rescheduleForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.rescheduleFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/reschedule`, {
      method: 'PATCH', body: { target_date: els.rescheduleDate.value }
    });
    showToast('Task rescheduled ✅', 'success');
    els.rescheduleModal.hidden = true; reloadCurrentTaskView();
  } catch (err) { els.rescheduleFormMsg.textContent = err.message; els.rescheduleFormMsg.hidden = false; }
});

// ─── Reassign ─────────────────────────────────────────────────────────────────
function openReassignModal(taskId) {
  state.pendingTaskId = taskId; els.reassignFormMsg.hidden = true;
  fillSelect(els.reassignEmployee, state.master.employees, { placeholder: 'Select employee', labelKey: 'full_name' });
  els.reassignModal.hidden = false;
}
els.closeReassignModal.addEventListener('click', () => { els.reassignModal.hidden = true; });
els.cancelReassignModal.addEventListener('click', () => { els.reassignModal.hidden = true; });
els.reassignForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.reassignFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/reassign`, {
      method: 'PATCH', body: { assigned_to: els.reassignEmployee.value }
    });
    showToast('Task reassigned ✅', 'success');
    els.reassignModal.hidden = true; reloadCurrentTaskView();
  } catch (err) { els.reassignFormMsg.textContent = err.message; els.reassignFormMsg.hidden = false; }
});

// ─── Tickets ──────────────────────────────────────────────────────────────────
function openTicketModal(taskId) {
  state.pendingTaskId = taskId || null; els.ticketFormMsg.hidden = true;
  els.ticketDescription.value = ''; els.ticketModal.hidden = false;
}
els.openRaiseTicket.addEventListener('click', () => openTicketModal(null));
els.closeTicketModal.addEventListener('click', () => { els.ticketModal.hidden = true; });
els.cancelTicketModal.addEventListener('click', () => { els.ticketModal.hidden = true; });
els.ticketForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.ticketFormMsg.hidden = true;
  try {
    await api('/tickets', {
      method: 'POST',
      body: { task_id: state.pendingTaskId, description: els.ticketDescription.value.trim() }
    });
    showToast('Ticket raised ✅', 'success');
    els.ticketModal.hidden = true;
    if (state.activeView === 'tickets') loadTickets();
  } catch (err) { els.ticketFormMsg.textContent = err.message; els.ticketFormMsg.hidden = false; }
});

async function loadTickets() {
  els.ticketsList.innerHTML = '<div class="empty-state">Loading tickets…</div>';
  try {
    const tickets = await api('/tickets');
    renderTicketsList(tickets);
  } catch (err) { showToast(err.message, 'error'); }
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
        ${ticket.task ? ` · on task: ${escapeHtml(ticket.task.description.slice(0,60))}${ticket.task.description.length > 60 ? '…' : ''}` : ''}
        · ${fmtDate(ticket.created_at)}
      </div>
    `;
    if (state.user.role === 'admin' && ticket.status === 'Open') {
      const actionsCell = card.querySelector('.row-actions');
      const resolveBtn = document.createElement('button');
      resolveBtn.className = 'action-btn action-complete';
      resolveBtn.textContent = '✅ Mark resolved';
      resolveBtn.addEventListener('click', async () => {
        try {
          await api(`/tickets/${ticket.id}/resolve`, { method: 'PATCH' });
          showToast('Ticket resolved ✅', 'success'); loadTickets();
        } catch (err) { showToast(err.message, 'error'); }
      });
      actionsCell.appendChild(resolveBtn);
    }
    els.ticketsList.appendChild(card);
  });
}

// ─── Manage Employees ─────────────────────────────────────────────────────────
async function loadEmployees() {
  els.employeesTableBody.innerHTML = `<tr><td colspan="8" class="empty-state">Loading employees…</td></tr>`;
  els.employeesCards.innerHTML = `<div class="empty-state">Loading employees…</div>`;
  try {
    const employees = await api('/employees');
    renderEmployeesTable(employees);
    renderEmployeesCards(employees);
  } catch (err) { showToast(err.message, 'error'); }
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
      <td><strong style="font-weight:600">${escapeHtml(emp.full_name)}</strong></td>
      <td>${escapeHtml(emp.department ?? '—')}</td>
      <td>${escapeHtml(emp.designation ?? '—')}</td>
      <td><span class="role-pill ${emp.role}">${emp.role}</span></td>
      <td style="font-family:var(--font-mono);font-size:0.8rem">${escapeHtml(emp.username)}</td>
      <td></td><td></td><td class="row-actions"></td>
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
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn action-start';
    editBtn.textContent = '✏️ Edit';
    editBtn.addEventListener('click', () => openEditEmployeeModal(emp));
    actionsCell.appendChild(editBtn);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'action-btn action-start';
    resetBtn.textContent = '🔑 Reset password';
    resetBtn.addEventListener('click', () => resetEmployeePassword(emp));
    actionsCell.appendChild(resetBtn);

    els.employeesTableBody.appendChild(tr);
  });
}

// ── NEW: renders the "Manage employees" view as cards (shown on mobile)
function renderEmployeesCards(employees) {
  if (!employees.length) {
    els.employeesCards.innerHTML = `<div class="empty-state"><span class="emoji">👥</span>No employees yet</div>`;
    return;
  }
  els.employeesCards.innerHTML = '';
  employees.forEach((emp) => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <div class="employee-card-top">
        <div>
          <strong>${escapeHtml(emp.full_name)}</strong>
          <span class="employee-card-meta">${escapeHtml(emp.designation ?? '—')} · ${escapeHtml(emp.department ?? '—')}</span>
        </div>
        <span class="role-pill ${emp.role}">${emp.role}</span>
      </div>
      <div class="employee-card-row">
        <span class="employee-card-label">Username</span>
        <span class="employee-card-value mono">${escapeHtml(emp.username)}</span>
      </div>
      <div class="employee-card-toggles"></div>
      <div class="employee-card-actions"></div>
    `;

    const togglesEl = card.querySelector('.employee-card-toggles');
    const statusBtn = document.createElement('button');
    statusBtn.className = `status-toggle ${emp.is_active ? 'active' : 'inactive'}`;
    statusBtn.textContent = emp.is_active ? 'Active' : 'Inactive';
    statusBtn.addEventListener('click', () => toggleEmployeeStatus(emp));
    togglesEl.appendChild(statusBtn);

    const verifierBtn = document.createElement('button');
    verifierBtn.className = `status-toggle ${emp.can_verify ? 'active' : 'inactive'}`;
    verifierBtn.textContent = emp.can_verify ? 'Verifier: Yes' : 'Verifier: No';
    verifierBtn.addEventListener('click', () => toggleEmployeeVerifier(emp));
    togglesEl.appendChild(verifierBtn);

    const actionsEl = card.querySelector('.employee-card-actions');
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn action-start';
    editBtn.textContent = '✏️ Edit';
    editBtn.addEventListener('click', () => openEditEmployeeModal(emp));
    actionsEl.appendChild(editBtn);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'action-btn action-start';
    resetBtn.textContent = '🔑 Reset password';
    resetBtn.addEventListener('click', () => resetEmployeePassword(emp));
    actionsEl.appendChild(resetBtn);

    els.employeesCards.appendChild(card);
  });
}

async function toggleEmployeeStatus(emp) {
  try {
    await api(`/employees/${emp.id}`, { method: 'PATCH', body: { is_active: !emp.is_active } });
    showToast(`${emp.full_name} marked ${!emp.is_active ? 'active' : 'inactive'} ✅`, 'success');
    loadEmployees(); refreshEmployeeDropdowns();
  } catch (err) { showToast(err.message, 'error'); }
}
async function toggleEmployeeVerifier(emp) {
  try {
    await api(`/employees/${emp.id}`, { method: 'PATCH', body: { can_verify: !emp.can_verify } });
    showToast(`${emp.full_name} ${!emp.can_verify ? 'can now verify tasks' : 'is no longer a verifier'} ✅`, 'success');
    loadEmployees();
  } catch (err) { showToast(err.message, 'error'); }
}
async function resetEmployeePassword(emp) {
  if (!confirm(`Reset password for ${emp.full_name}?`)) return;
  try {
    const { generated_password } = await api(`/employees/${emp.id}/reset-password`, { method: 'POST' });
    els.credsUsername.textContent = emp.username; els.credsPassword.textContent = generated_password;
    els.credsModal.hidden = false;
  } catch (err) { showToast(err.message, 'error'); }
}

els.openAddEmployee.addEventListener('click', () => {
  els.employeeForm.reset(); els.employeeFormMsg.hidden = true; els.employeeModal.hidden = false;
});
els.closeEmployeeModal.addEventListener('click', () => { els.employeeModal.hidden = true; });
els.cancelEmployeeModal.addEventListener('click', () => { els.employeeModal.hidden = true; });
els.employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.employeeFormMsg.hidden = true;
  const body = {
    full_name:   document.getElementById('emp-fullname').value.trim(),
    department:  document.getElementById('emp-department').value.trim(),
    designation: document.getElementById('emp-designation').value.trim(),
    role:        document.getElementById('emp-role').value
  };
  try {
    const created = await api('/employees', { method: 'POST', body });
    els.employeeModal.hidden = true;
    els.credsUsername.textContent = created.username; els.credsPassword.textContent = created.generated_password;
    els.credsModal.hidden = false;
    loadEmployees(); refreshEmployeeDropdowns();
  } catch (err) { els.employeeFormMsg.textContent = err.message; els.employeeFormMsg.hidden = false; }
});
els.closeCredsModal.addEventListener('click', () => { els.credsModal.hidden = true; });
els.closeCredsModalBtn.addEventListener('click', () => { els.credsModal.hidden = true; });

// ─── Edit employee (designation + role + department + optional new password) ─
function openEditEmployeeModal(emp) {
  els.editEmployeeFormMsg.hidden = true;
  els.editEmpId.value = emp.id;
  els.editEmpFullname.value = emp.full_name || '';
  els.editEmpDepartment.value = emp.department || '';
  els.editEmpDesignation.value = emp.designation || '';
  els.editEmpRole.value = emp.role || 'employee';
  els.editEmpPassword.value = '';
  els.editEmployeeModal.hidden = false;
}
els.closeEditEmployeeModal.addEventListener('click', () => { els.editEmployeeModal.hidden = true; });
els.cancelEditEmployeeModal.addEventListener('click', () => { els.editEmployeeModal.hidden = true; });
els.toggleEditPassword.addEventListener('click', () => {
  const isPw = els.editEmpPassword.type === 'password';
  els.editEmpPassword.type = isPw ? 'text' : 'password';
  els.toggleEditPassword.textContent = isPw ? '🙈' : '👁';
});
els.editEmployeeForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.editEmployeeFormMsg.hidden = true;
  const newPassword = els.editEmpPassword.value;
  if (newPassword && newPassword.length < 6) {
    els.editEmployeeFormMsg.textContent = 'Password must be at least 6 characters';
    els.editEmployeeFormMsg.hidden = false;
    return;
  }
  const body = {
    full_name:   els.editEmpFullname.value.trim(),
    department:  els.editEmpDepartment.value.trim(),
    designation: els.editEmpDesignation.value.trim(),
    role:        els.editEmpRole.value
  };
  if (newPassword) body.new_password = newPassword;
  try {
    await api(`/employees/${els.editEmpId.value}`, { method: 'PATCH', body });
    showToast('Employee updated ✅', 'success');
    els.editEmployeeModal.hidden = true;
    loadEmployees(); refreshEmployeeDropdowns();
  } catch (err) { els.editEmployeeFormMsg.textContent = err.message; els.editEmployeeFormMsg.hidden = false; }
});

// ─── Permissions (admin only) ──────────────────────────────────────────────────
async function loadPermissions() {
  els.permissionsTableBody.innerHTML = `<tr><td colspan="6" class="empty-state">Loading employees…</td></tr>`;
  try {
    const employees = await api('/employees');
    renderPermissionsTable(employees);
  } catch (err) { showToast(err.message, 'error'); }
}
function renderPermissionsTable(employees) {
  if (!employees.length) {
    els.permissionsTableBody.innerHTML = `<tr><td colspan="6" class="empty-state">No employees yet</td></tr>`;
    return;
  }
  els.permissionsTableBody.innerHTML = '';
  employees.forEach((emp) => {
    const tr = document.createElement('tr');
    const isAdminRow = emp.role === 'admin';
    tr.innerHTML = `
      <td><strong style="font-weight:600">${escapeHtml(emp.full_name)}</strong></td>
      <td><span class="role-pill ${emp.role}">${emp.role}</span></td>
    `;
    const flags = [
      ['can_add_site', 'Add site'],
      ['can_add_employee', 'Add employee'],
      ['can_resolve_tickets', 'Resolve tickets'],
      ['can_verify', 'Verify tasks']
    ];
    flags.forEach(([flag, label]) => {
      const td = document.createElement('td');
      td.className = 'perm-col';
      const btn = document.createElement('button');
      const checked = isAdminRow || !!emp[flag];
      btn.className = `status-toggle ${checked ? 'active' : 'inactive'}`;
      btn.textContent = checked ? 'Yes' : 'No';
      btn.title = isAdminRow ? 'Admins already have full access' : `Toggle "${label}" for ${emp.full_name}`;
      if (isAdminRow) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => togglePermission(emp, flag));
      }
      td.appendChild(btn);
      tr.appendChild(td);
    });
    els.permissionsTableBody.appendChild(tr);
  });
}
async function togglePermission(emp, flag) {
  try {
    await api(`/employees/${emp.id}`, { method: 'PATCH', body: { [flag]: !emp[flag] } });
    showToast(`Permission updated for ${emp.full_name} ✅`, 'success');
    loadPermissions();
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Master data ──────────────────────────────────────────────────────────────
async function loadMasterDataView() {
  try {
    const [departments, taskTypes] = await Promise.all([
      api('/master/departments'), api('/master/task-types')
    ]);
    renderSimpleNameTable(els.departmentsTableBody, departments);
    renderSimpleNameTable(els.taskTypesTableBody, taskTypes);
  } catch (err) { showToast(err.message, 'error'); }
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
  e.preventDefault(); els.addDepartmentMsg.hidden = true;
  const nameInput = document.getElementById('new-department-name');
  try {
    await api('/master/departments', { method: 'POST', body: { name: nameInput.value.trim() } });
    showToast('Department added ✅', 'success'); nameInput.value = '';
    loadMasterDataView(); loadMasterData();
  } catch (err) { els.addDepartmentMsg.textContent = err.message; els.addDepartmentMsg.hidden = false; }
});
els.addTaskTypeForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.addTaskTypeMsg.hidden = true;
  const nameInput = document.getElementById('new-tasktype-name');
  try {
    await api('/master/task-types', { method: 'POST', body: { name: nameInput.value.trim() } });
    showToast('Task type added ✅', 'success'); nameInput.value = '';
    loadMasterDataView(); loadMasterData();
  } catch (err) { els.addTaskTypeMsg.textContent = err.message; els.addTaskTypeMsg.hidden = false; }
});

// ─── Manage Sites ─────────────────────────────────────────────────────────────
async function loadSites() {
  els.sitesTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">Loading sites…</td></tr>`;
  try { const sites = await api('/sites'); renderSitesTable(sites); }
  catch (err) { showToast(err.message, 'error'); }
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
      <td><strong style="font-weight:600">${escapeHtml(site.name)}</strong></td>
      <td>${escapeHtml(site.client_name ?? '—')}</td>
      <td>${escapeHtml(site.location ?? '—')}</td>
      <td>${escapeHtml(site.project_type ?? '—')}</td>
      <td><span class="pill pill-Pending">${escapeHtml(site.status)}</span></td>
      <td>${escapeHtml(site.team_leader?.full_name ?? '—')}</td>
      <td class="row-actions"></td>
    `;
    const actionsCell = tr.children[6];
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn action-reject'; deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.addEventListener('click', () => deleteSite(site));
    actionsCell.appendChild(deleteBtn);
    els.sitesTableBody.appendChild(tr);
  });
}
async function deleteSite(site) {
  if (!confirm(`Delete site "${site.name}"? This cannot be undone.`)) return;
  try {
    await api(`/sites/${site.id}`, { method: 'DELETE' });
    showToast('Site deleted', 'success'); loadSites(); loadMasterData();
  } catch (err) { showToast(err.message, 'error'); }
}
els.openAddSite.addEventListener('click', () => {
  els.siteForm.reset(); els.siteFormMsg.hidden = true; els.siteModal.hidden = false;
});
els.closeSiteModal.addEventListener('click', () => { els.siteModal.hidden = true; });
els.cancelSiteModal.addEventListener('click', () => { els.siteModal.hidden = true; });
els.siteForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.siteFormMsg.hidden = true;
  const body = {
    client_name:       document.getElementById('site-client').value.trim(),
    name:              document.getElementById('site-name').value.trim(),
    project_type:      document.getElementById('site-type').value,
    location:          document.getElementById('site-location').value.trim(),
    start_date:        document.getElementById('site-start').value,
    expected_end_date: document.getElementById('site-end').value || null,
    team_leader_id:    els.siteTeamleader.value,
    coordinator_id:    els.siteCoordinator.value,
    site_incharge_id:  els.siteIncharge.value,
    description:       document.getElementById('site-description').value.trim()
  };
  try {
    await api('/sites', { method: 'POST', body });
    showToast('Site added ✅', 'success'); els.siteModal.hidden = true;
    loadSites(); loadMasterData();
  } catch (err) { els.siteFormMsg.textContent = err.message; els.siteFormMsg.hidden = false; }
});

// ─── boot ─────────────────────────────────────────────────────────────────────
if (state.token && state.user) { enterApp(); }
