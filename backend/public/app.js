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
  myTasksTableBody: document.getElementById('myTasksTableBody'),

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
  verificationsTableBody: document.getElementById('verificationsTableBody'),
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

  // Corrections view (employee)
  correctionsList: document.getElementById('correctionsList'),
  correctionsTableBody: document.getElementById('correctionsTableBody'),

  // Correction modal (verifier → employee)
  correctionModal: document.getElementById('correctionModal'),
  correctionForm: document.getElementById('correctionForm'),
  correctionFormMsg: document.getElementById('correctionFormMsg'),
  correctionNote: document.getElementById('correction-note'),
  closeCorrectionModal: document.getElementById('closeCorrectionModal'),
  cancelCorrectionModal: document.getElementById('cancelCorrectionModal'),
  corrStartRecord: document.getElementById('corrStartRecord'),
  corrStopRecord: document.getElementById('corrStopRecord'),
  corrRecordStatus: document.getElementById('corrRecordStatus'),
  corrVoicePlayback: document.getElementById('corrVoicePlayback'),

  // Resend verification modal (employee after correction)
  resendVerifyModal: document.getElementById('resendVerifyModal'),
  resendVerifyForm: document.getElementById('resendVerifyForm'),
  resendVerifyFormMsg: document.getElementById('resendVerifyFormMsg'),
  resendVerifierName: document.getElementById('resendVerifierName'),
  resendFiles: document.getElementById('resend-files'),
  closeResendVerifyModal: document.getElementById('closeResendVerifyModal'),
  cancelResendVerifyModal: document.getElementById('cancelResendVerifyModal'),

  // Verify modal file input
  verifyFiles: document.getElementById('verify-files'),

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
  pendingTaskId: null,
  pendingVerifierId: null
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

function fillSelect(select, items, { placeholder, valueKey = 'id', labelKey = 'name', extraOption } = {}) {
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
  if (extraOption) {
    const opt = document.createElement('option');
    opt.value = extraOption.value; opt.textContent = extraOption.label;
    select.appendChild(opt);
  }
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

// Builds the "Project: / Task Type: / Details: [/ Assigned to:]" block used
// in the Task Details column of both the All Tasks and My Tasks tables.
function buildTaskDetailsHtml(task, { showAssignee = false } = {}) {
  const desc = task.description ?? '';
  const shortDesc = desc.length > 100 ? desc.slice(0, 100) + '…' : desc;
  let html = `
    <div class="task-detail-line"><span class="task-detail-label">Project:</span> ${escapeHtml(task.project?.name ?? '—')}</div>
    <div class="task-detail-line"><span class="task-detail-label">Task Type:</span> ${escapeHtml(task.task_type?.name ?? '—')}</div>
    <div class="task-detail-line"><span class="task-detail-label">Details:</span> ${escapeHtml(shortDesc)}</div>
  `;
  if (showAssignee) {
    html += `<div class="task-detail-line"><span class="task-detail-label">Assigned to:</span> ${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</div>`;
  }
  return html;
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
    ? [{ key:'add', label:'➕ Add new task' }, { key:'all', label:'📋 All delegated tasks' }, { key:'my', label:'✅ My tasks' }, { key:'recurring', label:'🔁 Recurring tasks' }]
    : [{ key:'my', label:'✅ My tasks' }, { key:'recurring', label:'🔁 My recurring tasks' }];

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
      els.navList.appendChild(makeNavButton('reports', '📊 Reports'));
    }
  }

  if (isAdmin || state.user.can_verify) {
    const verifyLabel = document.createElement('div');
    verifyLabel.className = 'nav-section-label'; verifyLabel.textContent = 'Verification';
    els.navList.appendChild(verifyLabel);
    els.navList.appendChild(makeNavButton('verifications', '🔎 Verification requests'));
  }

  // Corrections section — visible to all employees (admin doesn't get corrections, they assign them)
  if (!isAdmin) {
    const corrLabel = document.createElement('div');
    corrLabel.className = 'nav-section-label'; corrLabel.textContent = 'Corrections';
    els.navList.appendChild(corrLabel);
    els.navList.appendChild(makeNavButton('corrections', '↩ Corrections'));
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
  if (viewKey === 'corrections')   loadCorrections();
  if (viewKey === 'recurring')     loadRecurringView();
  if (viewKey === 'reports')       initReportsView();
  if (viewKey === 'reports')       initReportsView();
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
    fillRecurringDropdowns();
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
    fillSelect(recEls.employee(), employees, { placeholder: 'Select Employee', labelKey: 'full_name' });
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

// renders the admin "All delegated tasks" as a table (desktop)
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
    tdDetails.innerHTML = buildTaskDetailsHtml(task, { showAssignee: true });

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
  els.myTasksTableBody.innerHTML = `<tr><td colspan="8" class="empty-state">Loading tasks…</td></tr>`;
  els.myTasksList.innerHTML = '<div class="empty-state">Loading tasks…</div>';
  try {
    const allTasks = await api('/tasks/my');
    const visibleTasks = allTasks.filter(
      (task) => task.status !== 'Completed' && task.status !== 'Rejected'
    );
    renderMyTasksTable(els.myTasksTableBody, visibleTasks);
    renderTaskList(els.myTasksList, visibleTasks, { showAssignee: false, allowActions: true });
  } catch (err) { showToast(err.message, 'error'); }
}

// renders "My tasks" as a table (desktop). Same columns as All Tasks, minus
// "Assigned to" (it's always you), since this is the employee's own task list.
function renderMyTasksTable(tbody, tasks) {
  if (!tasks || tasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-state"><span class="emoji">📭</span>No tasks found</td></tr>`;
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
    tdDetails.innerHTML = buildTaskDetailsHtml(task, { showAssignee: false });

    // Due date (calculated from created_at + hours, same as the card view)
    const tdDate = document.createElement('td');
    tdDate.style.whiteSpace = 'nowrap';
    tdDate.textContent = getDeadlineHtml(task, false);

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
    buildPrimaryStatusButtons(task, { showAssignee: false, allowActions: true }).forEach((btn) => tdActions.appendChild(btn));
    tdActions.appendChild(buildCardMenuElement(task, { showAssignee: false }));

    tr.append(tdSr, tdDetails, tdDate, tdVoice, tdAttach, tdPriority, tdStatus, tdActions);
    tbody.appendChild(tr);
  });
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
    // Two-step: "Start Verification" → then Verify or Send for Correction
    const startBtn = makeActionBtn('action-start', '🔎 Start Verification', () => {
      actionsEl.innerHTML = '';
      actionsEl.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
        if (confirm('Mark this task as Verified?')) verifyApprove(task.id);
      }));
      actionsEl.appendChild(makeActionBtn('action-reject', '↩ Send for Correction', () => openCorrectionModal(task.id)));
    });
    actionsEl.appendChild(startBtn);
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
  if (els.verifyFiles) els.verifyFiles.value = '';
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
    const formData = new FormData();
    formData.append('verifier_id', els.verifyPerson.value);
    const files = els.verifyFiles ? [...els.verifyFiles.files].slice(0, 3) : [];
    files.forEach((f) => formData.append('verification_files', f));
    await api(`/tasks/${state.pendingTaskId}/send-for-verification`, {
      method: 'PATCH', body: formData, isForm: true
    });
    showToast('Sent for verification ✅', 'success');
    els.verifyModal.hidden = true; reloadCurrentTaskView();
  } catch (err) { els.verifyFormMsg.textContent = err.message; els.verifyFormMsg.hidden = false; }
});

// ─── Verifier two-step flow: Start → Verify OR Send for Correction ───────────
// Called when verifier clicks "Start Verification" on a card/row.
// We toggle the card's action area to show the two choice buttons.
function startVerificationInline(taskId, actionsEl) {
  actionsEl.innerHTML = '';
  actionsEl.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
    if (confirm('Mark this task as Verified?')) verifyApprove(taskId);
  }));
  actionsEl.appendChild(makeActionBtn('action-reject', '↩ Send for Correction', () => openCorrectionModal(taskId)));
}

async function verifyApprove(taskId) {
  try {
    await api(`/tasks/${taskId}/verify`, { method: 'PATCH', body: { approved: true } });
    showToast('Task verified ✅', 'success');
    loadVerifications();
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Correction Modal (verifier sends correction note + optional voice) ────────
let corrVoiceBlob = null;
let corrMediaRecorder = null;

function openCorrectionModal(taskId) {
  state.pendingTaskId = taskId;
  els.correctionNote.value = '';
  els.correctionFormMsg.hidden = true;
  els.corrVoicePlayback.hidden = true;
  els.corrVoicePlayback.src = '';
  els.corrRecordStatus.textContent = '';
  els.corrStartRecord.disabled = false;
  els.corrStopRecord.disabled = true;
  corrVoiceBlob = null;
  els.correctionModal.hidden = false;
}

els.closeCorrectionModal.addEventListener('click', stopCorrectionRecordingAndClose);
els.cancelCorrectionModal.addEventListener('click', stopCorrectionRecordingAndClose);
function stopCorrectionRecordingAndClose() {
  if (corrMediaRecorder && corrMediaRecorder.state !== 'inactive') corrMediaRecorder.stop();
  els.correctionModal.hidden = true;
}

// Voice recording for correction modal
els.corrStartRecord.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    corrMediaRecorder = new MediaRecorder(stream);
    corrMediaRecorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    corrMediaRecorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      corrVoiceBlob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(corrVoiceBlob);
      els.corrVoicePlayback.src = url;
      els.corrVoicePlayback.hidden = false;
      els.corrRecordStatus.textContent = '✅ Recording saved';
      els.corrStartRecord.disabled = false;
      els.corrStopRecord.disabled = true;
    };
    corrMediaRecorder.start();
    els.corrStartRecord.disabled = true;
    els.corrStopRecord.disabled = false;
    els.corrRecordStatus.textContent = '🔴 Recording…';
    els.corrVoicePlayback.hidden = true;
  } catch (err) {
    els.corrRecordStatus.textContent = '❌ Microphone access denied';
  }
});
els.corrStopRecord.addEventListener('click', () => {
  if (corrMediaRecorder && corrMediaRecorder.state !== 'inactive') corrMediaRecorder.stop();
});

els.correctionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.correctionFormMsg.hidden = true;
  const note = els.correctionNote.value.trim();
  if (!note) {
    els.correctionFormMsg.textContent = 'Please write a correction note before sending';
    els.correctionFormMsg.hidden = false;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('note', note);
    if (corrVoiceBlob) {
      formData.append('correction_voice', corrVoiceBlob, 'correction_voice.webm');
    }
    await api(`/tasks/${state.pendingTaskId}/send-correction`, {
      method: 'PATCH', body: formData, isForm: true
    });
    showToast('Correction sent ✅', 'success');
    els.correctionModal.hidden = true;
    loadVerifications();
  } catch (err) { els.correctionFormMsg.textContent = err.message; els.correctionFormMsg.hidden = false; }
});

async function loadVerifications() {
  els.verificationsTableBody.innerHTML = `<tr><td colspan="8" class="empty-state">Loading…</td></tr>`;
  els.verificationsList.innerHTML = '<div class="empty-state">Loading…</div>';
  try {
    const tasks = await api('/tasks/verifications');
    renderVerificationsTable(els.verificationsTableBody, tasks);
    renderTaskList(els.verificationsList, tasks, { showAssignee: true, allowActions: false, verificationMode: true });
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Corrections view (employee) ──────────────────────────────────────────────
async function loadCorrections() {
  if (els.correctionsTableBody) {
    els.correctionsTableBody.innerHTML = `<tr><td colspan="6" class="empty-state">Loading corrections…</td></tr>`;
  }
  if (els.correctionsList) {
    els.correctionsList.innerHTML = '<div class="empty-state">Loading corrections…</div>';
  }
  try {
    const allTasks = await api('/tasks/my');
    const corrections = allTasks.filter((t) => t.verification_status === 'Verification Rejected');
    renderCorrectionsTable(corrections);
    renderCorrectionsList(corrections);
  } catch (err) { showToast(err.message, 'error'); }
}

// Desktop table view — same data as the card view below, just laid out as rows.
function renderCorrectionsTable(tasks) {
  const tbody = els.correctionsTableBody;
  if (!tbody) return;
  if (!tasks.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state"><span class="emoji">✅</span>No corrections — you're all good!</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');

    const tdSr = document.createElement('td');
    tdSr.innerHTML = `<span class="sr-number">${index + 1}</span>`;

    const tdDetails = document.createElement('td');
    tdDetails.className = 'task-name-cell';
    tdDetails.innerHTML = buildTaskDetailsHtml(task, { showAssignee: false });

    const tdNote = document.createElement('td');
    tdNote.innerHTML = `
      <div class="correction-note-box" style="margin:0">
        <div class="correction-note-label">↩ From <strong>${escapeHtml(task.verifier?.full_name ?? 'Verifier')}</strong>:</div>
        <div class="correction-note-text">${escapeHtml(task.verification_note ?? '(no note)')}</div>
        ${task.correction_voice_url ? `<a href="${task.correction_voice_url}" target="_blank" rel="noopener" class="attachment-link" style="margin-top:6px;display:inline-block">🎤 Voice note</a>` : ''}
      </div>
    `;

    const tdPriority = document.createElement('td');
    tdPriority.innerHTML = `<span class="pill pill-${task.priority}">${task.priority}</span>`;

    const tdStatus = document.createElement('td');
    tdStatus.innerHTML = `<span class="pill pill-InProgress">${escapeHtml(task.status)}</span>`;

    const tdActions = document.createElement('td');
    const actionsWrap = document.createElement('div');
    actionsWrap.className = 'task-actions';
    actionsWrap.appendChild(makeActionBtn('action-start', '🔄 Resend for Verification', () => openResendVerifyModal(task)));
    tdActions.appendChild(actionsWrap);

    tr.append(tdSr, tdDetails, tdNote, tdPriority, tdStatus, tdActions);
    tbody.appendChild(tr);
  });
}

function renderCorrectionsList(tasks) {
  if (!tasks.length) {
    els.correctionsList.innerHTML = `<div class="empty-state"><span class="emoji">✅</span>No corrections — you're all good!</div>`;
    return;
  }
  els.correctionsList.innerHTML = '';
  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority}`;
    card.innerHTML = `
      <div class="task-card-top">
        <div>
          <div class="task-card-project">${escapeHtml(task.project?.name ?? '—')}</div>
          <div class="task-card-type">${escapeHtml(task.task_type?.name ?? '—')} · ${escapeHtml(task.department?.name ?? '—')}</div>
        </div>
        <span class="pill pill-Rejected">Correction Needed</span>
      </div>
      <p class="task-card-desc">${escapeHtml(task.description)}</p>
      <div class="correction-note-box">
        <div class="correction-note-label">↩ Correction note from <strong>${escapeHtml(task.verifier?.full_name ?? 'Verifier')}</strong>:</div>
        <div class="correction-note-text">${escapeHtml(task.verification_note ?? '(no note)')}</div>
        ${task.correction_voice_url ? `<a href="${task.correction_voice_url}" target="_blank" rel="noopener" class="attachment-link" style="margin-top:6px;display:inline-block">🎤 Voice note from verifier</a>` : ''}
      </div>
      ${task.verification_attachment_urls?.length ? `<div class="task-meta">${task.verification_attachment_urls.map((u, i) => `<a href="${u}" target="_blank" rel="noopener" class="attachment-link">📎 Your file ${i + 1}</a>`).join(' ')}</div>` : ''}
      <div class="task-card-footer">
        <span class="pill pill-InProgress">${task.status}</span>
        <div class="task-actions" id="corr-actions-${task.id}"></div>
      </div>
    `;
    const actionsEl = card.querySelector(`#corr-actions-${task.id}`);
    actionsEl.appendChild(makeActionBtn('action-start', '🔄 Resend for Verification', () => openResendVerifyModal(task)));
    els.correctionsList.appendChild(card);
  });
}

// Resend for verification (employee after correction — verifier is already known)
function openResendVerifyModal(task) {
  state.pendingTaskId = task.id;
  state.pendingVerifierId = task.verifier?.id ?? null;
  els.resendVerifierName.textContent = task.verifier?.full_name ?? 'the verifier';
  els.resendVerifyFormMsg.hidden = true;
  els.resendFiles.value = '';
  els.resendVerifyModal.hidden = false;
}
els.closeResendVerifyModal.addEventListener('click', () => { els.resendVerifyModal.hidden = true; });
els.cancelResendVerifyModal.addEventListener('click', () => { els.resendVerifyModal.hidden = true; });
els.resendVerifyForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.resendVerifyFormMsg.hidden = true;
  try {
    if (!state.pendingVerifierId) {
      throw new Error('Verifier not found — please contact your admin');
    }
    const formData = new FormData();
    formData.append('verifier_id', state.pendingVerifierId);
    const files = [...els.resendFiles.files].slice(0, 3);
    files.forEach((f) => formData.append('verification_files', f));
    await api(`/tasks/${state.pendingTaskId}/send-for-verification`, {
      method: 'PATCH', body: formData, isForm: true
    });
    showToast('Resent for verification ✅', 'success');
    els.resendVerifyModal.hidden = true;
    loadCorrections();
  } catch (err) { els.resendVerifyFormMsg.textContent = err.message; els.resendVerifyFormMsg.hidden = false; }
});

function renderVerificationsTable(tbody, tasks) {
  if (!tasks || tasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-state"><span class="emoji">📭</span>No verification requests</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');

    // Request ID
    const tdReqId = document.createElement('td');
    tdReqId.innerHTML = `<span class="sr-number">#${task.id}</span>`;

    // Task Sr No
    const tdSr = document.createElement('td');
    tdSr.textContent = index + 1;

    // Project
    const tdProject = document.createElement('td');
    tdProject.innerHTML = `<strong style="font-weight:600">${escapeHtml(task.project?.name ?? '—')}</strong>`;

    // Task Type
    const tdTaskType = document.createElement('td');
    tdTaskType.textContent = task.task_type?.name ?? '—';

    // Submitted By (person who did the task and sent for verification)
    const tdSubmittedBy = document.createElement('td');
    tdSubmittedBy.innerHTML = `<strong style="font-weight:600">${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong>`;

    // Attachments
    const tdAttach = document.createElement('td');
    tdAttach.style.textAlign = 'center';
    const links = [];
    if (task.attachment_url) {
      links.push(`<a href="${task.attachment_url}" target="_blank" rel="noopener" class="media-link" title="View attachment">📎</a>`);
    }
    if (task.voice_note_url) {
      links.push(`<a href="${task.voice_note_url}" target="_blank" rel="noopener" class="media-link" title="Play voice note">🎤</a>`);
    }
    tdAttach.innerHTML = links.length ? links.join(' ') : `<span class="media-none">—</span>`;

    // Submission date
    const tdDate = document.createElement('td');
    tdDate.style.whiteSpace = 'nowrap';
    tdDate.textContent = fmtDate(task.verification_requested_at ?? task.updated_at ?? task.created_at);

    // Actions — "Start Verification" → then Verify or Send for Correction
    const tdActions = document.createElement('td');
    tdActions.className = 'row-actions';
    const startBtn = makeActionBtn('action-start', '🔎 Start Verification', () => {
      tdActions.innerHTML = '';
      tdActions.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
        if (confirm('Mark this task as Verified?')) verifyApprove(task.id);
      }));
      tdActions.appendChild(makeActionBtn('action-reject', '↩ Send for Correction', () => openCorrectionModal(task.id)));
    });
    tdActions.appendChild(startBtn);

    tr.append(tdReqId, tdSr, tdProject, tdTaskType, tdSubmittedBy, tdAttach, tdDate, tdActions);
    tbody.appendChild(tr);
  });
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

// renders the "Manage employees" view as cards (shown on mobile)
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

// ─── RECURRING TASKS ──────────────────────────────────────────────────────────

// Elem references (recurring modal)
const recEls = {
  modal:         () => document.getElementById('recurringModal'),
  modalTitle:    () => document.getElementById('recurringModalTitle'),
  editId:        () => document.getElementById('recurring-edit-id'),
  department:    () => document.getElementById('rec-department'),
  employee:      () => document.getElementById('rec-employee'),
  taskType:      () => document.getElementById('rec-tasktype'),
  project:       () => document.getElementById('rec-project'),
  description:   () => document.getElementById('rec-description'),
  priority:      () => document.getElementById('rec-priority'),
  weeklyField:   () => document.getElementById('weeklyDaysField'),
  startDate:     () => document.getElementById('rec-start'),
  endDate:       () => document.getElementById('rec-end'),
  checkpointsList: () => document.getElementById('checkpointsList'),
  formMsg:       () => document.getElementById('recurringFormMsg'),
  saveBtn:       () => document.getElementById('saveRecurringBtn'),
  openBtn:       () => document.getElementById('openAddRecurring'),
  adminWrap:     () => document.getElementById('adminRecurringWrap'),
  empWrap:       () => document.getElementById('employeeRecurringWrap'),
  empList:       () => document.getElementById('employeeRecurringList'),
  adminTable:    () => document.getElementById('recurringTasksTableBody'),
  adminCards:    () => document.getElementById('adminRecurringCards'),
  newTaskTypeRow:    () => document.getElementById('recNewTaskTypeRow'),
  newTaskTypeInput:  () => document.getElementById('recNewTaskTypeInput'),
  newTaskTypeSave:   () => document.getElementById('recNewTaskTypeSave'),
  newTaskTypeCancel: () => document.getElementById('recNewTaskTypeCancel'),
  taskTypeMsg:       () => document.getElementById('recTaskTypeMsg'),
};

let recurringSelectedFreq = '';

function initRecurringModal() {
  // Frequency buttons
  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      recurringSelectedFreq = btn.dataset.freq;
      recEls.weeklyField().hidden = recurringSelectedFreq !== 'Weekly';
    });
  });

  // Add checkpoint
  document.getElementById('addCheckpointBtn').addEventListener('click', () => {
    addCheckpointRow('');
  });

  // Save button
  recEls.saveBtn().addEventListener('click', saveRecurringTask);

  // Close/cancel
  document.getElementById('closeRecurringModal').addEventListener('click', closeRecurringModal);
  document.getElementById('cancelRecurringModal').addEventListener('click', closeRecurringModal);

  // Open Add button (admin only)
  recEls.openBtn().addEventListener('click', () => openRecurringModal(null));

  // Task type changed → either open the inline "add new" row, or
  // auto-load that type's saved checkpoint template.
  recEls.taskType().addEventListener('change', async () => {
    const taskTypeId = recEls.taskType().value;

    if (taskTypeId === '__add_new__') {
      recEls.taskTypeMsg().hidden = true;
      recEls.newTaskTypeInput().value = '';
      recEls.newTaskTypeRow().hidden = false;
      recEls.newTaskTypeInput().focus();
      // Reset selection back to placeholder so "+ Add new task type…"
      // doesn't stay selected as if it were a real task type.
      recEls.taskType().value = '';
      return;
    }

    recEls.newTaskTypeRow().hidden = true;
    if (!taskTypeId) return;

    const hasExisting = recEls.checkpointsList().children.length > 0;
    if (hasExisting) {
      const ok = confirm("Load this task type's saved checkpoints? This will replace the current checkpoint list.");
      if (!ok) return;
    }
    try {
      const template = await api(`/recurring-tasks/checkpoint-templates/${taskTypeId}`);
      recEls.checkpointsList().innerHTML = '';
      template
        .sort((a, b) => a.sort_order - b.sort_order)
        .forEach(cp => addCheckpointRow(cp.label));
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  recEls.newTaskTypeCancel().addEventListener('click', () => {
    recEls.newTaskTypeRow().hidden = true;
  });
  recEls.newTaskTypeSave().addEventListener('click', saveNewTaskTypeFromModal);
  recEls.newTaskTypeInput().addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); saveNewTaskTypeFromModal(); }
  });
}

// Adds a new task type from inside the recurring-task modal, then refreshes
// every task-type dropdown in the app (including this modal's) and selects
// the freshly created type so the admin can keep going without re-opening
// the modal.
async function saveNewTaskTypeFromModal() {
  const name = recEls.newTaskTypeInput().value.trim();
  recEls.taskTypeMsg().hidden = true;
  if (!name) {
    recEls.taskTypeMsg().textContent = 'Please enter a task type name';
    recEls.taskTypeMsg().hidden = false;
    return;
  }
  recEls.newTaskTypeSave().disabled = true;
  try {
    await api('/master/task-types', { method: 'POST', body: { name } });
    // Refresh master task types everywhere (admin add-task form, filters, this modal)
    const taskTypes = await api('/master/task-types');
    state.master.taskTypes = taskTypes;
    fillSelect(els.fTaskType, taskTypes, { placeholder: 'Select task type' });
    fillSelect(recEls.taskType(), taskTypes, {
      placeholder: 'Select Task Type',
      extraOption: { value: '__add_new__', label: '+ Add new task type…' }
    });
    const created = taskTypes.find(t => t.name === name);
    if (created) recEls.taskType().value = created.id;
    recEls.newTaskTypeRow().hidden = true;
    showToast(`Task type "${name}" added ✅`, 'success');
  } catch (err) {
    recEls.taskTypeMsg().textContent = err.message;
    recEls.taskTypeMsg().hidden = false;
  } finally {
    recEls.newTaskTypeSave().disabled = false;
  }
}

function addCheckpointRow(value) {
  const list = recEls.checkpointsList();
  const row = document.createElement('div');
  row.className = 'checkpoint-row';
  row.innerHTML = `
    <input type="text" class="checkpoint-input" placeholder="Checkpoint label…" value="${escapeHtml(value)}" />
    <button type="button" class="ghost-btn-text cp-remove" style="color:#e53e3e">✕</button>
  `;
  row.querySelector('.cp-remove').addEventListener('click', () => row.remove());
  list.appendChild(row);
}

function getCheckpointValues() {
  return [...document.querySelectorAll('.checkpoint-input')]
    .map(i => i.value.trim())
    .filter(Boolean);
}

function openRecurringModal(task) {
  recEls.formMsg().hidden = true;
  recEls.checkpointsList().innerHTML = '';
  document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('selected'));
  recEls.weeklyField().hidden = true;
  recEls.newTaskTypeRow().hidden = true;
  recEls.taskTypeMsg().hidden = true;
  // uncheck all days
  document.querySelectorAll('#weeklyDaysField input[type=checkbox]').forEach(c => c.checked = false);

  if (task) {
    // Edit mode
    recEls.modalTitle().textContent = '✏️ Edit Recurring Task';
    recEls.saveBtn().textContent = 'Save Changes';
    recEls.editId().value = task.id;
    recEls.description().value = task.description || '';
    recEls.priority().value = task.priority || 'Medium';
    recEls.startDate().value = task.start_date || '';
    recEls.endDate().value = task.end_date || '';
    if (task.department?.id) recEls.department().value = task.department.id;
    if (task.project?.id) recEls.project().value = task.project.id;
    if (task.task_type?.id) recEls.taskType().value = task.task_type.id;
    if (task.assigned_to_user?.id) recEls.employee().value = task.assigned_to_user.id;
    // Frequency
    recurringSelectedFreq = task.frequency || '';
    const freqBtn = document.querySelector(`.freq-btn[data-freq="${recurringSelectedFreq}"]`);
    if (freqBtn) freqBtn.classList.add('selected');
    if (recurringSelectedFreq === 'Weekly') {
      recEls.weeklyField().hidden = false;
      const days = (task.frequency_days || '').split(',').map(Number);
      document.querySelectorAll('#weeklyDaysField input[type=checkbox]').forEach(c => {
        c.checked = days.includes(Number(c.value));
      });
    }
    // Checkpoints
    (task.checkpoints || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .forEach(cp => addCheckpointRow(cp.label));
  } else {
    // Create mode
    recEls.modalTitle().textContent = '🔁 Create Recurring Task';
    recEls.saveBtn().textContent = 'Create Recurring Task';
    recEls.editId().value = '';
    recEls.description().value = '';
    recEls.department().value = '';
    recEls.employee().value = '';
    recEls.taskType().value = '';
    recEls.project().value = '';
    recEls.priority().value = 'Medium';
    recEls.startDate().value = '';
    recEls.endDate().value = '';
    recurringSelectedFreq = '';
  }

  recEls.modal().hidden = false;
}

function closeRecurringModal() {
  recEls.modal().hidden = true;
}

async function saveRecurringTask() {
  recEls.formMsg().hidden = true;
  const editId = recEls.editId().value;

  if (!recEls.employee().value) {
    recEls.formMsg().textContent = 'Please select an employee'; recEls.formMsg().hidden = false; return;
  }
  if (!recEls.description().value.trim()) {
    recEls.formMsg().textContent = 'Please enter a task description'; recEls.formMsg().hidden = false; return;
  }
  if (!recurringSelectedFreq) {
    recEls.formMsg().textContent = 'Please select a frequency'; recEls.formMsg().hidden = false; return;
  }
  if (!recEls.startDate().value) {
    recEls.formMsg().textContent = 'Please select a start date'; recEls.formMsg().hidden = false; return;
  }

  const freqDays = [];
  if (recurringSelectedFreq === 'Weekly') {
    document.querySelectorAll('#weeklyDaysField input[type=checkbox]:checked').forEach(c => {
      freqDays.push(Number(c.value));
    });
    if (!freqDays.length) {
      recEls.formMsg().textContent = 'Please select at least one day'; recEls.formMsg().hidden = false; return;
    }
  }

  const body = {
    assigned_to:    recEls.employee().value,
    department_id:  recEls.department().value || null,
    project_id:     recEls.project().value || null,
    task_type_id:   recEls.taskType().value || null,
    description:    recEls.description().value.trim(),
    priority:       recEls.priority().value,
    frequency:      recurringSelectedFreq,
    frequency_days: freqDays,
    start_date:     recEls.startDate().value,
    end_date:       recEls.endDate().value || null,
    checkpoints:    getCheckpointValues()
  };

  recEls.saveBtn().disabled = true;
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
    recEls.formMsg().textContent = err.message;
    recEls.formMsg().hidden = false;
  } finally {
    recEls.saveBtn().disabled = false;
  }
}


async function loadRecurringView() {
  const isAdmin = state.user.role === 'admin';
  const canManageRecurring = isAdmin || !!state.user.can_add_employee;
  recEls.openBtn().hidden = !canManageRecurring;
  recEls.adminWrap().hidden = !canManageRecurring;
  recEls.empWrap().hidden = canManageRecurring;

  if (canManageRecurring) {
    await loadAdminRecurringTasks();
  } else {
    await loadEmployeeRecurringTasks();
  }
}
// ─── Admin view ───────────────────────────────────────────────────────────────

async function loadAdminRecurringTasks() {
  const tbody = recEls.adminTable();
  tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Loading…</td></tr>`;
  recEls.adminCards().innerHTML = `<div class="empty-state">Loading…</div>`;
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
  return task.frequency;
}

function renderAdminRecurringTable(tasks) {
  const tbody = recEls.adminTable();
  if (!tasks.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">No recurring tasks yet</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach(task => {
    const tr = document.createElement('tr');
    const cpCount = (task.checkpoints || []).length;
    tr.innerHTML = `
      <td><strong>${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong></td>
      <td style="max-width:200px">${escapeHtml(task.description?.slice(0,80) ?? '—')}${task.description?.length > 80 ? '…' : ''}</td>
      <td>${escapeHtml(freqLabel(task))}</td>
      <td style="font-size:12px">${escapeHtml(task.start_date ?? '—')} → ${escapeHtml(task.end_date ?? 'ongoing')}</td>
      <td>${cpCount ? `${cpCount} checkpoint${cpCount>1?'s':''}` : '<span style="color:#aaa">None</span>'}</td>
      <td><span class="pill ${task.is_active ? 'pill-In-Progress' : 'pill-Rejected'}">${task.is_active ? 'Active' : 'Inactive'}</span></td>
      <td class="row-actions"></td>
    `;
    const actCell = tr.lastElementChild;
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn action-accept'; editBtn.textContent = '✏️ Edit';
    editBtn.addEventListener('click', () => openRecurringModal(task));
    const delBtn = document.createElement('button');
    delBtn.className = 'action-btn action-reject'; delBtn.textContent = '🗑️ Delete';
    delBtn.addEventListener('click', () => deleteRecurringTask(task));
    actCell.appendChild(editBtn); actCell.appendChild(delBtn);
    tbody.appendChild(tr);
  });
}

function renderAdminRecurringCards(tasks) {
  const wrap = recEls.adminCards();
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
        <div class="task-detail-line"><span class="task-detail-label">Task:</span> ${escapeHtml(task.description?.slice(0,100) ?? '—')}${task.description?.length>100?'…':''}</div>
        <div class="task-detail-line"><span class="task-detail-label">Period:</span> ${escapeHtml(task.start_date)} → ${escapeHtml(task.end_date ?? 'ongoing')}</div>
        <div class="task-detail-line"><span class="task-detail-label">Checkpoints:</span> ${cpCount ? `${cpCount}` : 'None'}</div>
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
  if (!confirm(`Delete recurring task "${task.description?.slice(0,60)}"? This cannot be undone.`)) return;
  try {
    await api(`/recurring-tasks/${task.id}`, { method: 'DELETE' });
    showToast('Recurring task deleted', 'success');
    loadRecurringView();
  } catch (err) { showToast(err.message, 'error'); }
}

// ─── Employee view ────────────────────────────────────────────────────────────

// async function loadEmployeeRecurringTasks() {
//   const wrap = recEls.empList();
//   wrap.innerHTML = `<div class="empty-state">Loading your recurring tasks…</div>`;
//   try {
//     const tasks = await api('/recurring-tasks/my');
//     renderEmployeeRecurringList(tasks);
//   } catch (err) { showToast(err.message, 'error'); }
// }

async function loadEmployeeRecurringTasks() {
  const wrap = recEls.empList();
  const tbody = document.getElementById('employeeRecurringTableBody');
  wrap.innerHTML = `<div class="empty-state">Loading your recurring tasks…</div>`;
  if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Loading…</td></tr>`;
  try {
    const tasks = await api('/recurring-tasks/my');
    renderEmployeeRecurringList(tasks);
    renderEmployeeRecurringTable(tasks);
  } catch (err) { showToast(err.message, 'error'); }
}

// Desktop table view — same data as the card list above, laid out as rows.
function renderEmployeeRecurringTable(tasks) {
  const tbody = document.getElementById('employeeRecurringTableBody');
  if (!tbody) return;
  if (!tasks.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No recurring tasks assigned to you</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach((task) => {
    const tr = document.createElement('tr');
    const inst = task.today_instance;
    const checkpoints = (task.checkpoints || []).sort((a, b) => a.sort_order - b.sort_order);
    const completedIds = inst
      ? (inst.recurring_task_checkpoint_completions || []).map((c) => c.checkpoint_id)
      : [];
    const allDone = checkpoints.length > 0 && completedIds.length === checkpoints.length;
    const statusText = !task.fires_today ? 'Not today'
      : inst?.status === 'Completed' ? 'Completed'
      : checkpoints.length === 0 ? 'No checkpoints'
      : `${completedIds.length}/${checkpoints.length} done`;
    const pillClass = allDone ? 'pill-Completed'
      : !task.fires_today ? 'pill-Rejected'
      : 'pill-InProgress';

    const tdTask = document.createElement('td');
    tdTask.innerHTML = `
      <div class="task-detail-line"><strong>${escapeHtml(task.description ?? '')}</strong></div>
      ${task.project ? `<div class="task-detail-line"><span class="task-detail-label">Project:</span> ${escapeHtml(task.project.name)}</div>` : ''}
      ${task.task_type ? `<div class="task-detail-line"><span class="task-detail-label">Type:</span> ${escapeHtml(task.task_type.name)}</div>` : ''}
    `;

    const tdFreq = document.createElement('td');
    tdFreq.textContent = freqLabel(task);

    const tdPeriod = document.createElement('td');
    tdPeriod.style.whiteSpace = 'nowrap';
    tdPeriod.style.fontSize = '0.8rem';
    tdPeriod.textContent = `${task.start_date ?? '—'} → ${task.end_date ?? 'ongoing'}`;

    const tdCheckpoints = document.createElement('td');
    if (checkpoints.length === 0) {
      tdCheckpoints.innerHTML = `<span style="color:#aaa">None</span>`;
    } else {
      tdCheckpoints.innerHTML = checkpoints.map((cp) => {
        const done = completedIds.includes(cp.id);
        return `<div class="task-detail-line" style="${done ? 'text-decoration:line-through;color:#9CA3AF' : ''}">${done ? '✅' : '⬜'} ${escapeHtml(cp.label)}</div>`;
      }).join('');
    }

    const tdStatus = document.createElement('td');
    tdStatus.innerHTML = `<span class="pill ${pillClass}">${escapeHtml(statusText)}</span>`;

    tr.append(tdTask, tdFreq, tdPeriod, tdCheckpoints, tdStatus);
    tbody.appendChild(tr);
  });
}
function renderEmployeeRecurringList(tasks) {
  const wrap = recEls.empList();
  if (!tasks.length) {
    wrap.innerHTML = `<div class="empty-state">No recurring tasks assigned to you</div>`;
    return;
  }
  wrap.innerHTML = '';

  // Today's tasks split into "still to do" vs "already completed today" —
  // a completed task drops out of the active list so the employee isn't
  // staring at a checklist they already finished. It'll reappear here
  // automatically on its next due date once the backend creates a fresh
  // instance for that date.
  const dueToday = tasks.filter(t => t.fires_today);
  const activeToday = dueToday.filter(t => t.today_instance?.status !== 'Completed');
  const completedToday = dueToday.filter(t => t.today_instance?.status === 'Completed');
  const notToday = tasks.filter(t => !t.fires_today);

  if (activeToday.length) {
    const hdr = document.createElement('div');
    hdr.className = 'nav-section-label'; hdr.textContent = "Today's tasks";
    wrap.appendChild(hdr);
    activeToday.forEach(t => wrap.appendChild(buildEmployeeRecurringCard(t)));
  }
  if (completedToday.length) {
    const hdr = document.createElement('div');
    hdr.className = 'nav-section-label'; hdr.style.marginTop = '24px';
    hdr.textContent = '✅ Completed today';
    wrap.appendChild(hdr);
    completedToday.forEach(t => wrap.appendChild(buildEmployeeRecurringCard(t)));
  }
  if (!activeToday.length && !completedToday.length) {
    const hdr = document.createElement('div');
    hdr.className = 'nav-section-label'; hdr.textContent = "Today's tasks";
    wrap.appendChild(hdr);
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Nothing due today 🎉';
    wrap.appendChild(empty);
  }
  if (notToday.length) {
    const hdr = document.createElement('div');
    hdr.className = 'nav-section-label'; hdr.style.marginTop = '24px';
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
  const completedIds = inst
    ? (inst.recurring_task_checkpoint_completions || []).map(c => c.checkpoint_id)
    : [];
  const allDone = checkpoints.length > 0 && completedIds.length === checkpoints.length;
  const status = !task.fires_today ? 'Not today'
    : inst?.status === 'Completed' ? 'Completed'
    : checkpoints.length === 0 ? 'No checkpoints'
    : `${completedIds.length}/${checkpoints.length} done`;

  const pillClass = allDone ? 'pill-Completed'
    : !task.fires_today ? 'pill-Rejected'
    : 'pill-In-Progress';

  let checkpointsHtml = '';
  if (task.fires_today && checkpoints.length > 0) {
    checkpointsHtml = `<div class="checkpoint-list" style="margin-top:12px">`;
    checkpoints.forEach(cp => {
      const done = completedIds.includes(cp.id);
      const isLocked = !inst || inst.status === 'Completed';
      checkpointsHtml += `
        <label class="checkpoint-item ${done ? 'cp-done' : ''}" data-instance="${inst?.id}" data-cp="${cp.id}">
          <input type="checkbox" class="cp-checkbox" ${done ? 'checked' : ''} ${isLocked ? 'disabled' : ''} />
          <span>${escapeHtml(cp.label)}</span>
        </label>`;
    });
    checkpointsHtml += `</div>`;
  } else if (task.fires_today && checkpoints.length === 0) {
    checkpointsHtml = `<p class="form-note" style="margin-top:8px">No checkpoints — mark complete via the button below.</p>`;
  }

  card.innerHTML = `
    <div class="task-card-header">
      <span class="pill ${pillClass}">${escapeHtml(status)}</span>
      <span style="font-size:12px;color:#888">${escapeHtml(freqLabel(task))}</span>
    </div>
    <div class="task-card-body">
      <div class="task-detail-line"><strong>${escapeHtml(task.description ?? '')}</strong></div>
      ${task.project ? `<div class="task-detail-line"><span class="task-detail-label">Project:</span> ${escapeHtml(task.project.name)}</div>` : ''}
      ${task.task_type ? `<div class="task-detail-line"><span class="task-detail-label">Type:</span> ${escapeHtml(task.task_type.name)}</div>` : ''}
      <div class="task-detail-line"><span class="task-detail-label">Period:</span> ${escapeHtml(task.start_date)} → ${escapeHtml(task.end_date ?? 'ongoing')}</div>
      ${checkpointsHtml}
    </div>
    ${task.fires_today && checkpoints.length === 0 && inst?.status !== 'Completed' ? `
    <div class="task-card-actions">
      <button class="action-btn action-accept mark-done-btn" data-task-id="${task.id}" data-instance-id="${inst?.id ?? ''}">✅ Mark as done</button>
    </div>` : ''}
  `;

  // Attach checkbox handlers
  card.querySelectorAll('.cp-checkbox').forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const label = e.target.closest('label');
      const instanceId = label.dataset.instance;
      const checkpointId = label.dataset.cp;
      if (!instanceId) return;
      cb.disabled = true;
      try {
        const updated = await api(
          `/recurring-tasks/instances/${instanceId}/checkpoints/${checkpointId}/toggle`,
          { method: 'POST' }
        );
        // Refresh the whole list to reflect new state
        // const tasks = await api('/recurring-tasks/my');
        // renderEmployeeRecurringList(tasks);
        const tasks = await api('/recurring-tasks/my');
renderEmployeeRecurringList(tasks);
renderEmployeeRecurringTable(tasks);
        if (updated.status === 'Completed') showToast('All checkpoints done — task completed! ✅', 'success');
      } catch (err) {
        cb.disabled = false;
        cb.checked = !cb.checked;
        showToast(err.message, 'error');
      }
    });
  });

  return card;
}

// ─── Boot recurring modal once DOM is ready ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initRecurringModal();
});

// Fills the Department/Employee/Task Type/Project selects inside the
// recurring-task modal from state.master. Called directly from
// loadMasterData() once master data has loaded (not via monkey-patching —
// that previously broke silently if this file loaded after the dropdowns
// were first read).
function fillRecurringDropdowns() {
  if (!state.master) return;
  fillSelect(recEls.department(), state.master.departments, { placeholder: 'Select Department' });
  fillSelect(recEls.employee(), state.master.employees, { placeholder: 'Select Employee', labelKey: 'full_name' });
  fillSelect(recEls.taskType(), state.master.taskTypes, {
    placeholder: 'Select Task Type',
    extraOption: { value: '__add_new__', label: '+ Add new task type…' }
  });
  fillSelect(recEls.project(), state.master.projects, { placeholder: 'Select Project' });
}
// ─── Reports (admin only) ────────────────────────────────────────────────────

let reportState = { range: 'day' };
let _reportInitDone = false;

function initReportsView() {
  if (!_reportInitDone) {
    _reportInitDone = true;
    document.querySelectorAll('.report-range-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.report-range-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        reportState.range = btn.dataset.range;
        const cd = document.getElementById('reportCustomDates');
        cd.style.display = reportState.range === 'custom' ? 'flex' : 'none';
      });
    });
    document.getElementById('loadReportBtn').onclick = loadReport;
  }
  loadReport();
}

async function loadReport() {
  const area = document.getElementById('reportPrintArea');
  if (!area) return;
  area.innerHTML = '<p style="padding:30px;color:#94a3b8">Loading report…</p>';

  try {
    let url = `/tasks/report?range=${reportState.range}`;
    if (reportState.range === 'custom') {
      const from = document.getElementById('reportFrom').value;
      const to   = document.getElementById('reportTo').value;
      if (!from || !to) { showToast('Select both from and to dates', 'error'); area.innerHTML = ''; return; }
      url += `&from=${from}&to=${to}`;
    }
    const data = await api(url);
    renderReport(data);
    const exportBtn = document.getElementById('exportPdfBtn');
    if (exportBtn) exportBtn.style.display = 'inline-block';
  } catch (err) {
    area.innerHTML = `<p style="color:#ef4444;padding:20px">${err.message}</p>`;
  }
}

function _hrsBetween(a, b) {
  if (!a || !b) return null;
  return Math.round(((new Date(b) - new Date(a)) / 3600000) * 10) / 10;
}
function _fmtD(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}
function _hrsCell(h) {
  if (h === null || h === undefined) return '<span style="color:#d1d5db">—</span>';
  const color = h > 8 ? '#ef4444' : h > 4 ? '#f59e0b' : '#10b981';
  return `<span style="color:${color};font-weight:700">${h}h</span>`;
}

function renderReport(data) {
  const area = document.getElementById('reportPrintArea');
  const { report } = data;

  let totalTasks = 0, totalVerified = 0, totalPendingVerify = 0, totalCorrections = 0;
  const allTasks = [];

  report.forEach(emp => {
    emp.projects.forEach(proj => {
      proj.tasks.forEach(t => {
        totalTasks++;
        allTasks.push(t);
        if (t.verification_status === 'Verified') totalVerified++;
        if (t.verification_status === 'Pending Verification') totalPendingVerify++;
        if (t.verification_status === 'Verification Rejected') totalCorrections++;
      });
    });
  });

  // ── Section 1: Employee cards ──
  const sec1Cards = report.map(emp => {
    const empTasks = emp.projects.flatMap(p => p.tasks);
    const statusCount = {};
    empTasks.forEach(t => { statusCount[t.status] = (statusCount[t.status]||0)+1; });
    const verCount = {};
    empTasks.forEach(t => { if(t.verification_status) verCount[t.verification_status]=(verCount[t.verification_status]||0)+1; });

    const statusColors = { 'Completed':'#d1fae5,#065f46','In Progress':'#fef3c7,#92400e','Pending':'#f1f5f9,#475569','Rejected':'#fee2e2,#991b1b' };
    const verColors    = { 'Verified':'#d1fae5,#065f46','Pending Verification':'#fef3c7,#92400e','Verification Rejected':'#fee2e2,#991b1b' };

    const sPills = Object.entries(statusCount).map(([s,c]) => {
      const [bg,fg]=(statusColors[s]||'#f1f5f9,#475569').split(',');
      return `<span style="background:${bg};color:${fg};padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600">${s}: ${c}</span>`;
    }).join(' ');

    const vPills = Object.entries(verCount).map(([s,c]) => {
      const [bg,fg]=(verColors[s]||'#f1f5f9,#475569').split(',');
      return `<span style="background:${bg};color:${fg};padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600">${s}: ${c}</span>`;
    }).join(' ');

    const projRows = emp.projects.map(p =>
      `<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid #f1f5f9;font-size:12px">
        <span>${p.name}</span><span style="font-weight:700">${p.tasks.length}</span>
      </div>`
    ).join('');

    return `<div class="rpt-emp-card">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
        <span style="font-weight:800;font-size:13px">${emp.name}</span>
        <span style="font-size:11px;color:#9ca3af">${empTasks.length} tasks</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:5px">${sPills}</div>
      ${vPills?`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">${vPills}</div>`:''}
      <div style="margin-top:4px">${projRows}</div>
    </div>`;
  }).join('');

  // ── Section 1b: Time breakdown per employee ──
  const sec1b = report.map(emp => {
    const rows = emp.projects.flatMap(proj => proj.tasks.map(t => {
      const acceptHrs = _hrsBetween(t.created_at, t.accepted_at);
      const workHrs   = _hrsBetween(t.accepted_at, t.sent_for_verification_at);
      const verHrs    = _hrsBetween(t.sent_for_verification_at, t.verified_at);
      const totalHrs  = _hrsBetween(t.created_at, t.verified_at||t.rejected_at);
      const sc = {'Completed':'#065f46','In Progress':'#92400e','Pending':'#475569','Rejected':'#991b1b'}[t.status]||'#475569';
      const sb = {'Completed':'#d1fae5','In Progress':'#fef3c7','Pending':'#f1f5f9','Rejected':'#fee2e2'}[t.status]||'#f1f5f9';
      return `<tr>
        <td style="max-width:180px;white-space:normal">${t.description}</td>
        <td>${proj.name}</td>
        <td><span style="background:${sb};color:${sc};padding:2px 7px;border-radius:20px;font-size:10px;font-weight:700">${t.status}</span></td>
        <td style="font-size:11px;white-space:nowrap">${_fmtD(t.created_at)}</td>
        <td style="text-align:center">${_hrsCell(acceptHrs)}</td>
        <td style="text-align:center">${_hrsCell(workHrs)}</td>
        <td style="text-align:center">${_hrsCell(verHrs)}</td>
        <td style="text-align:center">${_hrsCell(totalHrs)}</td>
      </tr>`;
    })).join('');

    return `<div style="margin-bottom:24px">
      <div style="font-weight:700;font-size:13px;color:#374151;margin-bottom:8px;padding-bottom:4px;border-bottom:2px solid #e5e7eb">
        ${emp.name} <span style="font-weight:400;font-size:11px;color:#9ca3af">— time breakdown</span>
      </div>
      <div style="overflow-x:auto">
        <table class="rpt-table">
          <thead><tr>
            <th>Task</th><th>Project</th><th>Status</th><th>Created</th>
            <th title="Created → Accepted">⏱ Accept (h)</th>
            <th title="Accepted → Sent for verify">⏱ Work (h)</th>
            <th title="Sent → Verified">⏱ Verify (h)</th>
            <th title="Full cycle">⏱ Total (h)</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
  }).join('');

  // ── Section 2: Project × Employee matrix ──
  const allProjNames = [...new Set(allTasks.map(t=>t.project?.name||'No project'))].sort();
  const matrixRows = allProjNames.map(pname => {
    const cells = report.map(emp => {
      const c = emp.projects.find(p=>p.name===pname)?.tasks.length||0;
      return `<td style="text-align:center">${c||'<span style="color:#d1d5db">—</span>'}</td>`;
    }).join('');
    const total = report.reduce((s,emp)=>s+(emp.projects.find(p=>p.name===pname)?.tasks.length||0),0);
    return `<tr><td style="font-weight:600">${pname}</td>${cells}<td style="text-align:center;font-weight:700">${total}</td></tr>`;
  }).join('');
  const empTotals = report.map(e=>`<td style="text-align:center;font-weight:700">${e.totalTasks}</td>`).join('');
  const grand = report.reduce((s,e)=>s+e.totalTasks,0);

  // ── Section 3: Verifier matrix ──
  const verMap = {};
  allTasks.forEach(t => {
    if (!t.verifier) return;
    const vid = t.verifier.id;
    if (!verMap[vid]) verMap[vid] = { name:t.verifier.full_name, byProj:{}, total:0, statusCounts:{} };
    verMap[vid].total++;
    const pn = t.project?.name||'No project';
    verMap[vid].byProj[pn] = (verMap[vid].byProj[pn]||0)+1;
    const vs = t.verification_status||'Unknown';
    verMap[vid].statusCounts[vs]=(verMap[vid].statusCounts[vs]||0)+1;
  });
  const verifiers = Object.values(verMap);
  const verProjNames = [...new Set(allTasks.filter(t=>t.verifier).map(t=>t.project?.name||'No project'))].sort();

  const verMatrixRows = verProjNames.map(pname => {
    const cells = verifiers.map(v=>{
      const c=v.byProj[pname]||0;
      return `<td style="text-align:center">${c||'<span style="color:#d1d5db">—</span>'}</td>`;
    }).join('');
    const total = verifiers.reduce((s,v)=>s+(v.byProj[pname]||0),0);
    return `<tr><td style="font-weight:600">${pname}</td>${cells}<td style="text-align:center;font-weight:700">${total}</td></tr>`;
  }).join('');
  const verTotals = verifiers.map(v=>`<td style="text-align:center;font-weight:700">${v.total}</td>`).join('');
  const verGrand = verifiers.reduce((s,v)=>s+v.total,0);

  const verColors2 = {'Verified':'#d1fae5,#065f46','Pending Verification':'#fef3c7,#92400e','Verification Rejected':'#fee2e2,#991b1b'};
  const verSummaryCards = verifiers.map(v => {
    const pills = Object.entries(v.statusCounts).map(([s,c])=>{
      const [bg,fg]=(verColors2[s]||'#f1f5f9,#475569').split(',');
      return `<span style="background:${bg};color:${fg};padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600">${s}: ${c}</span>`;
    }).join(' ');
    return `<div class="rpt-emp-card">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <span style="font-weight:800;font-size:13px">${v.name}</span>
        <span style="font-size:11px;color:#9ca3af">${v.total} verified</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${pills}</div>
    </div>`;
  }).join('');

  // ── Section 4: Correction log ──
  const corrTasks = allTasks.filter(t=>t.verification_status==='Verification Rejected');
  const empCorrCount = {};
  report.forEach(emp=>{empCorrCount[emp.name]=0;});
  corrTasks.forEach(t=>{const n=t.assigned_to_user?.full_name||'?';empCorrCount[n]=(empCorrCount[n]||0)+1;});
  const corrPills = Object.entries(empCorrCount).map(([n,c])=>
    `<span style="background:${c>0?'#fee2e2':'#f1f5f9'};color:${c>0?'#991b1b':'#6b7280'};padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600">${n}: ${c}</span>`
  ).join(' ');
  const corrRows = corrTasks.length ? corrTasks.map(t=>
    `<div style="border-left:3px solid #f87171;padding:10px 14px;background:#fff;margin-bottom:6px;border-radius:0 6px 6px 0;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:13px"><strong>${t.assigned_to_user?.full_name||'?'}</strong> — ${t.project?.name||'No project'}</span>
      <span style="font-size:11px;color:#ef4444;font-weight:600">${t.verification_status}</span>
    </div>`
  ).join('') : '<p style="color:#9ca3af;font-size:13px">No corrections in this period.</p>';

  // ── Period label ──
  const from = new Date(data.from).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const to   = new Date(data.to).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});

  area.innerHTML = `<div id="reportDoc">
    <div class="rpt-doc-header">
      <div style="font-size:10px;letter-spacing:1.5px;color:#9ca3af;font-weight:600;text-transform:uppercase;margin-bottom:6px">Engineering Office · Task Register</div>
      <h1 style="font-size:24px;font-weight:800;color:#111;margin:0 0 4px">Work &amp; Verification Dashboard</h1>
      <p style="font-size:13px;color:#6b7280;margin:0">${from} – ${to} · ${totalTasks} tasks · ${report.length} employees · ${totalVerified+totalPendingVerify+totalCorrections} verification submissions</p>
    </div>

    <div class="rpt-summary-strip">
      ${[['Total Tasks',totalTasks,'#6366f1'],['Employees',report.length,'#3b82f6'],['Verified',totalVerified,'#10b981'],['Pending Verify',totalPendingVerify,'#f59e0b'],['Corrections',totalCorrections,'#ef4444']]
        .map(([l,v,c])=>`<div class="rpt-stat-card" style="border-top:3px solid ${c}">
          <div style="font-size:26px;font-weight:800;color:${c};line-height:1">${v}</div>
          <div style="font-size:10px;color:#9ca3af;letter-spacing:0.8px;text-transform:uppercase;margin-top:4px">${l}</div>
        </div>`).join('')}
    </div>

    <div class="rpt-section-title">1 · Work By Employee <span class="rpt-section-sub">total + status + project breakdown</span></div>
    <div class="rpt-emp-grid">${sec1Cards}</div>

    <div class="rpt-section-title" style="margin-top:32px">1b · Time Breakdown <span class="rpt-section-sub">how long each stage took per task</span></div>
    ${sec1b}

    <div class="rpt-section-title">2 · Project × Employee Matrix <span class="rpt-section-sub">how much work each person did per project</span></div>
    <div style="overflow-x:auto">
      <table class="rpt-table rpt-matrix">
        <thead><tr><th>Project</th>${report.map(e=>`<th style="text-align:center">${e.name}</th>`).join('')}<th style="text-align:center">Total</th></tr></thead>
        <tbody>${matrixRows}<tr style="background:#f8fafc"><td style="font-weight:700">Employee Total</td>${empTotals}<td style="text-align:center;font-weight:800">${grand}</td></tr></tbody>
      </table>
    </div>

    <div class="rpt-section-title">3 · Project × Verifier Matrix <span class="rpt-section-sub">who verified tasks on which project</span></div>
    <div style="overflow-x:auto">
      <table class="rpt-table rpt-matrix">
        <thead><tr><th>Project</th>${verifiers.map(v=>`<th style="text-align:center">${v.name}</th>`).join('')}<th style="text-align:center">Total</th></tr></thead>
        <tbody>${verMatrixRows}<tr style="background:#f8fafc"><td style="font-weight:700">Verifier Total</td>${verTotals}<td style="text-align:center;font-weight:800">${verGrand}</td></tr></tbody>
      </table>
    </div>

    <div class="rpt-section-title" style="margin-top:24px">3b · Verifier Summary <span class="rpt-section-sub">total verifications + status</span></div>
    <div class="rpt-emp-grid">${verSummaryCards||'<p style="color:#9ca3af;font-size:13px">No verifications in this period.</p>'}</div>

    <div class="rpt-section-title">4 · Correction Log <span class="rpt-section-sub">who was asked for corrections</span></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">${corrPills}</div>
    ${corrRows}
  </div>`;
}

function exportReportPdf() {
  window.print();
}
