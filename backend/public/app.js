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

  overdueTasksList: document.getElementById('overdueTasksList'),
  overdueTasksCards: document.getElementById('overdueTasksCards'),

  overdueExtendModal: document.getElementById('overdueExtendModal'),
  overdueExtendForm: document.getElementById('overdueExtendForm'),
  overdueExtendDate: document.getElementById('overdue-extend-date'),
  overdueExtendReason: document.getElementById('overdue-extend-reason'),
  overdueExtendFormMsg: document.getElementById('overdueExtendFormMsg'),
  closeOverdueExtendModal: document.getElementById('closeOverdueExtendModal'),
  cancelOverdueExtendModal: document.getElementById('cancelOverdueExtendModal'),

  overdueDrawerBackdrop: document.getElementById('overdueDrawerBackdrop'),
  closeOverdueDrawer: document.getElementById('closeOverdueDrawer'),
  overdueTabToday: document.getElementById('overdueTabToday'),
  overdueTabPending: document.getElementById('overdueTabPending'),
  overdueTabTodayCount: document.getElementById('overdueTabTodayCount'),
  overdueTabPendingCount: document.getElementById('overdueTabPendingCount'),
  overdueDrawerBody: document.getElementById('overdueDrawerBody'),

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

  // Leave (apply — everyone)
  myLeavesList: document.getElementById('myLeavesList'),
  openApplyLeave: document.getElementById('openApplyLeave'),
  leaveModal: document.getElementById('leaveModal'),
  leaveForm: document.getElementById('leaveForm'),
  leaveFormMsg: document.getElementById('leaveFormMsg'),
  leaveFrom: document.getElementById('leave-from'),
  leaveTo: document.getElementById('leave-to'),
  leaveHalfDay: document.getElementById('leave-halfday'),
  leaveReason: document.getElementById('leave-reason'),
  closeLeaveModal: document.getElementById('closeLeaveModal'),
  cancelLeaveModal: document.getElementById('cancelLeaveModal'),

  // Leave approvals (admin)
  leaveApprovalsList: document.getElementById('leaveApprovalsList'),
  leaveApprovalsStatusFilter: document.getElementById('leaveApprovalsStatusFilter'),
  rejectLeaveModal: document.getElementById('rejectLeaveModal'),
  rejectLeaveForm: document.getElementById('rejectLeaveForm'),
  rejectLeaveFormMsg: document.getElementById('rejectLeaveFormMsg'),
  rejectLeaveReason: document.getElementById('reject-leave-reason'),
  closeRejectLeaveModal: document.getElementById('closeRejectLeaveModal'),
  cancelRejectLeaveModal: document.getElementById('cancelRejectLeaveModal'),


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
  pendingVerifierId: null,
  pendingLeaveId: null
};

// ─── helpers ────────────────────────────────────────────────────────────────
function showToast(message, type = '') {
  els.toast.textContent = message;
  els.toast.className = `toast ${type}`;
  els.toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { els.toast.hidden = true; }, 3200);
}

// async function api(path, { method = 'GET', body, isForm = false } = {}) {
//   const headers = {};
//   if (state.token) headers.Authorization = `Bearer ${state.token}`;
//   if (!isForm && body) headers['Content-Type'] = 'application/json';
//   const res = await fetch(`${API_BASE}${path}`, {
//     method, headers,
//     body: isForm ? body : (body ? JSON.stringify(body) : undefined)
//   });
//   if (res.status === 401) { logout(); throw new Error('Session expired, please log in again'); }
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data.error || 'Something went wrong');
//   return data;
// }
async function api(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {};
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  if (!isForm && body) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API_BASE}${path}`, {
    method, headers,
    body: isForm ? body : (body ? JSON.stringify(body) : undefined)
  });
  // ✅ FIX: login route pe 401 aaye toh logout() mat karo
  if (res.status === 401 && path !== '/auth/login') {
    logout();
    throw new Error('Session expired, please log in again');
  }
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
  // Refresh badge counts now and every 60s
  refreshNavBadges();
  if (window._badgeInterval) clearInterval(window._badgeInterval);
  window._badgeInterval = setInterval(refreshNavBadges, 60000);
}

function buildNav() {
  const isAdmin = state.user.role === 'admin';
  const canAddSite = isAdmin || !!state.user.can_add_site;
  const canAddEmployee = isAdmin || !!state.user.can_add_employee;
  const canResolveTickets = isAdmin || !!state.user.can_resolve_tickets;

  const taskItems = isAdmin
    ? [{ key:'add', label:'➕ Add new task' }, { key:'all', label:'📋 All delegated tasks' }, { key:'overdue', label:'⏰ Overdue tasks' }, { key:'my', label:'✅ My tasks' }, { key:'recurring', label:'🔁 Recurring tasks' }]
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
      els.navList.appendChild(makeNavButton('daily-report', '📋 Daily Report'));
    }
  }

  // Leave section — everyone can apply; admin also gets the approvals queue.
  const leaveLabel = document.createElement('div');
  leaveLabel.className = 'nav-section-label'; leaveLabel.textContent = 'Leave';
  els.navList.appendChild(leaveLabel);
  els.navList.appendChild(makeNavButton('applyleave', '🌴 Apply Leave'));
  if (isAdmin) els.navList.appendChild(makeNavButton('leaveapprovals', '🗒️ Leave Approvals'));

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
    els.navList.appendChild(makeNavButton('updations', '📝 Updations'));
  }

  const supportLabel = document.createElement('div');
  supportLabel.className = 'nav-section-label';
  supportLabel.textContent = state.user.is_mis_executive ? 'MIS — Ticket Tracking' : 'Support';
  els.navList.appendChild(supportLabel);
  els.navList.appendChild(makeNavButton('tickets-open', '🟠 Open Tickets'));
  els.navList.appendChild(makeNavButton('tickets-resolved', '✅ Resolved Tickets'));

  // Drawings — admin only
  if (isAdmin) {
    const drawLabel = document.createElement('div');
    drawLabel.className = 'nav-section-label'; drawLabel.textContent = 'Drawings';
    els.navList.appendChild(drawLabel);
    els.navList.appendChild(makeNavButton('drawings-add', '➕ Add Drawing'));
    els.navList.appendChild(makeNavButton('drawings-all', '📐 All Drawings'));
  }
}

function makeNavButton(key, label, badge) {
  const btn = document.createElement('button');
  btn.className = 'nav-btn'; btn.dataset.view = key;
  btn.dataset.label = label;
  const labelSpan = document.createElement('span');
  labelSpan.className = 'nav-btn-label';
  labelSpan.textContent = label;
  btn.appendChild(labelSpan);
  if (badge != null && badge > 0) {
    const bdg = document.createElement('span');
    bdg.className = 'nav-badge';
    bdg.textContent = badge > 99 ? '99+' : badge;
    btn.appendChild(bdg);
  }
  btn.addEventListener('click', () => { switchView(key); closeSidebar(); });
  return btn;
}

// Updates badge on an existing nav button (or creates one if missing)
function setNavBadge(viewKey, count) {
  const btn = document.querySelector(`.nav-btn[data-view="${viewKey}"]`);
  if (!btn) return;
  let bdg = btn.querySelector('.nav-badge');
  if (!count || count <= 0) {
    if (bdg) bdg.remove();
    return;
  }
  if (!bdg) {
    bdg = document.createElement('span');
    bdg.className = 'nav-badge';
    btn.appendChild(bdg);
  }
  bdg.textContent = count > 99 ? '99+' : count;
}

// Poll badge counts from the API and update nav
async function refreshNavBadges() {
  try {
    if (state.user?.role !== 'admin') {
      // Employee: my tasks (pending), corrections, updations, verifications
      const myTasks = await api('/tasks/my');
      const pending = myTasks.filter(t => t.status === 'Pending' || t.status === 'In Progress').length;
      const corrections = myTasks.filter(t => t.verification_status === 'Verification Rejected').length;
      const updations = myTasks.filter(t => t.verification_status === 'Updation Required').length;
      setNavBadge('my', pending);
      setNavBadge('corrections', corrections);
      setNavBadge('updations', updations);

      // Verifications (if verifier)
      if (state.user?.can_verify) {
        const verifs = await api('/tasks/verifications');
        setNavBadge('verifications', verifs.length);
      }

      // Open tickets
      const tickets = await api('/tickets');
      const openTickets = tickets.filter(t => t.status === 'Open').length;
      setNavBadge('tickets-open', openTickets);
    } else {
      // Admin: all tasks pending, overdue, verifications, open tickets
      const allTasks = await api('/tasks/all');
      const now = new Date();
      const pendingCount = allTasks.filter(t => t.status === 'Pending' || t.verification_status === 'Pending Verification').length;
      const overdueCount = allTasks.filter(t => {
        if (!t.target_date) return false;
        if (t.status === 'Completed' || t.status === 'Rejected') return false;
        if (t.verification_status === 'Verified') return false;
        return new Date(t.target_date) < now;
      }).length;
      setNavBadge('all', pendingCount);
      setNavBadge('overdue', overdueCount);

      // Open tickets
      const tickets = await api('/tickets');
      const openTickets = tickets.filter(t => t.status === 'Open').length;
      setNavBadge('tickets-open', openTickets);
    }
  } catch(e) { /* silently fail — badges are non-critical */ }
}

function switchView(viewKey) {
  state.activeView = viewKey;
  document.querySelectorAll('.view').forEach((v) => { v.hidden = true; });

  // tickets-open and tickets-resolved share the same view-tickets section
  const htmlKey = (viewKey === 'tickets-open' || viewKey === 'tickets-resolved') ? 'tickets' : viewKey;
  const viewEl = document.getElementById(`view-${htmlKey}`);
  if (viewEl) viewEl.hidden = false;

  document.querySelectorAll('.nav-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === viewKey);
  });
  if (viewKey === 'all')           loadAllTasks();
  if (viewKey === 'overdue')       loadOverdueTasks();
  if (viewKey === 'my')            loadMyTasks();
  if (viewKey === 'employees')     loadEmployees();
  if (viewKey === 'sites')         loadSites();
  if (viewKey === 'masterdata')    loadMasterDataView();
  if (viewKey === 'permissions')   loadPermissions();
  if (viewKey === 'verifications') loadVerifications();
  if (viewKey === 'tickets')       loadTickets();
  if (viewKey === 'tickets-open')     loadTicketsFiltered('Open');
  if (viewKey === 'tickets-resolved') loadTicketsFiltered('Resolved');
  if (viewKey === 'corrections')   loadCorrections();
  if (viewKey === 'updations')     loadUpdations();
  if (viewKey === 'recurring')     loadRecurringView();
  if (viewKey === 'reports')       initReportsView();
  if (viewKey === 'applyleave')      loadMyLeaves();
  if (viewKey === 'leaveapprovals')  loadLeaveApprovals();
  if (viewKey === 'drawings-add')  renderDrawingAddView();
  if (viewKey === 'drawings-all')  loadAllDrawings();
  if (viewKey === 'daily-report')  loadDailyReport();
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

// ─── Overdue Tasks (admin) ───────────────────────────────────────────────────
// Reuses the same /tasks/all data as "All delegated tasks". A task counts as
// overdue when its target_date has passed and it hasn't actually finished
// (Rejected tasks never show here at all). Within that set:
//   - "source" tells you whether it's overdue because it's still sitting
//     unfinished from assignment, or because it's stuck waiting on a verifier.
//   - if an admin has set an overdue_extended_until that's still in the
//     future, the task moves to the "Pending" tab inside the drawer (it's
//     still overdue against the real target_date, but someone already
//     acknowledged it and gave the employee more time). Once that extended
//     time itself passes, it falls back into "Today" — needs attention again.
let overdueTasksCache = [];
let overdueDrawerTab = 'today';

function taskOverdueSource(task) {
  if (task.is_recurring) return 'recurring';
  return task.verification_status === 'Pending Verification' ? 'verification' : 'assignment';
}

// Turns a { task, instance } pair from GET /recurring-tasks/overdue into
// something shaped enough like a regular task that the existing Overdue
// Tasks table/cards/drawer can render it without special-casing every
// field. is_recurring + recurring_instance_id are what the actions code
// below checks to route "mark as done" to the right endpoint.
function mapRecurringOverdueToTaskLike({ task, instance }) {
  return {
    id: `rt-${instance.id}`,
    description: task.description,
    project: task.project,
    task_type: task.task_type,
    assigned_to_user: task.assigned_to_user,
    priority: task.priority,
    status: 'In Progress',
    verification_status: null,
    verifier: null,
    target_date: instance.due_date,
    hours_to_complete: null,
    overdue_extended_until: null,
    is_recurring: true,
    recurring_task_id: task.id,
    recurring_instance_id: instance.id,
    has_checkpoints: !!(task.checkpoints && task.checkpoints.length)
  };
}

// Marks either a real task or a recurring-task instance as done, called
// from the Overdue tasks menu/drawer where both kinds of rows can appear.
async function markOverdueEntryDone(task) {
  if (!task.is_recurring) { updateStatus(task.id, 'Completed'); return; }
  try {
    await api(`/recurring-tasks/instances/${task.recurring_instance_id}/complete`, { method: 'POST' });
    showToast('Recurring task marked as done ✅', 'success');
    loadOverdueTasks();
  } catch (err) {
    if (task.has_checkpoints) {
      showToast('This task has checklist items — open Recurring tasks to tick them off', 'error');
    } else {
      showToast(err.message, 'error');
    }
  }
}

function isOverdueExtensionActive(task) {
  return !!task.overdue_extended_until && new Date(task.overdue_extended_until) > new Date();
}

async function loadOverdueTasks() {
  els.overdueTasksList.innerHTML = `<tr><td colspan="9" class="empty-state">Loading overdue tasks…</td></tr>`;
  els.overdueTasksCards.innerHTML = `<div class="empty-state">Loading overdue tasks…</div>`;
  try {
    // Recurring tasks nobody completed used to only show inside the
    // Recurring tasks tab — pulled in here too now so they don't quietly
    // sit unnoticed. Fetched alongside regular tasks; if it fails for any
    // reason, the regular overdue list still loads.
    const [tasks, recurringOverdue] = await Promise.all([
      api('/tasks/all'),
      api('/recurring-tasks/overdue').catch(() => [])
    ]);
    const now = new Date();
    const realOverdue = tasks.filter((t) => {
      if (!t.target_date) return false;
      if (t.status === 'Completed' || t.status === 'Rejected') return false;
      if (t.verification_status === 'Verified') return false;
      return new Date(t.target_date) < now;
    });
    const recurringLike = (recurringOverdue || []).map(mapRecurringOverdueToTaskLike);
    const overdue = realOverdue.concat(recurringLike)
      .sort((a, b) => new Date(a.target_date) - new Date(b.target_date));

    overdueTasksCache = overdue;
    renderOverdueTasksTable(els.overdueTasksList, overdue);

    // Mobile cards: real tasks reuse the standard card + full action set.
    // Recurring rows get their own lightweight card instead — they don't
    // have a verifier/correction flow, and their id isn't a real task id,
    // so the generic action buttons wouldn't work for them.
    if (realOverdue.length) {
      renderTaskList(els.overdueTasksCards, realOverdue, { showAssignee: true, allowActions: true });
    } else {
      els.overdueTasksCards.innerHTML = '';
      els.overdueTasksCards.classList.add('task-list');
    }
    recurringLike.forEach(t => els.overdueTasksCards.appendChild(buildOverdueRecurringCard(t)));
    if (!overdue.length) {
      els.overdueTasksCards.innerHTML = `<div class="empty-state"><span class="emoji">🎉</span>No overdue tasks</div>`;
    }
  } catch (err) { showToast(err.message, 'error'); }
}

// Lightweight mobile card for a recurring-task overdue entry — mirrors the
// desktop table row (source badge, days overdue, single Mark-as-done
// action) instead of reusing renderTaskCard's full action set.
function buildOverdueRecurringCard(task) {
  const card = document.createElement('div');
  card.className = `task-card priority-${task.priority}`;
  const daysOverdue = Math.floor((new Date() - new Date(task.target_date)) / 86400000);
  card.innerHTML = `
    <div class="task-card-top">
      <div>
        <div class="task-card-project">${escapeHtml(task.project?.name ?? '—')}</div>
        <div class="task-card-type">${escapeHtml(task.task_type?.name ?? '—')} · 🔁 Recurring</div>
      </div>
      <span class="pill pill-${task.priority}">${task.priority}</span>
    </div>
    <p class="task-card-desc">${escapeHtml(task.description)}</p>
    <div class="task-meta">
      <span>Due <strong>${escapeHtml(fmtDeadlineDateOnlyWithHours(task.target_date, task.hours_to_complete))}</strong></span>
    </div>
    <div class="assigned-line">Assigned to <strong>${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong></div>
    <div class="assigned-line" style="color:#d33;font-weight:600">${daysOverdue <= 0 ? 'Overdue today' : `${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue 🔴`}</div>
    <div class="task-card-footer">
      <span class="pill pill-InProgress">In Progress</span>
      <div class="task-actions"></div>
    </div>
  `;
  card.querySelector('.task-actions').appendChild(makeActionBtn('action-complete', '✅ Mark as done', () => markOverdueEntryDone(task)));
  return card;
}

// renders the admin "Overdue tasks" as a table (desktop) — adds a Verifier
// column and a Source badge, and clicking a row opens the Today/Pending
// detail drawer for that task.
function renderOverdueTasksTable(tbody, tasks) {
  if (!tasks || tasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state"><span class="emoji">🎉</span>No overdue tasks</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    const statusClass = task.status.replace(/\s/g, '');
    const source = taskOverdueSource(task);

    // Sr No
    const tdSr = document.createElement('td');
    tdSr.innerHTML = `<span class="sr-number">${index + 1}</span>`;

    // Task details
    const tdDetails = document.createElement('td');
    tdDetails.className = 'task-name-cell';
    tdDetails.innerHTML = buildTaskDetailsHtml(task, { showAssignee: true });

    // Source — why is this overdue: stuck before submission, stuck in
    // verification, or a recurring task nobody marked done?
    const tdSource = document.createElement('td');
    tdSource.innerHTML = source === 'recurring'
      ? `<span class="source-badge source-recurring">🔁 Recurring</span>`
      : source === 'verification'
      ? `<span class="source-badge source-verification">⏳ Verification</span>`
      : `<span class="source-badge source-assignment">📋 Assignment</span>`;

    // Planned date (how overdue, shown in red) + extension note if active
    const tdDate = document.createElement('td');
    const daysOverdue = Math.floor((new Date() - new Date(task.target_date)) / 86400000);
    tdDate.innerHTML = `
      <div>${fmtDeadlineDateOnlyWithHours(task.target_date, task.hours_to_complete)}</div>
      <div style="color:#d33;font-size:0.8rem;font-weight:600">${daysOverdue <= 0 ? 'Overdue today' : `${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue 🔴`}</div>
      ${isOverdueExtensionActive(task) ? `<div style="color:var(--emerald);font-size:0.75rem;margin-top:2px">⏱ Extended to ${fmtDate(task.overdue_extended_until)}</div>` : ''}
    `;

    // Assigned to
    const tdAssigned = document.createElement('td');
    tdAssigned.innerHTML = `<strong style="font-weight:600">${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</strong>`;

    // Verifier — who the task is (or was) sent to for verification, if any
    const tdVerifier = document.createElement('td');
    tdVerifier.innerHTML = task.verifier?.full_name
      ? `<strong style="font-weight:600">${escapeHtml(task.verifier.full_name)}</strong>`
      : `<span class="media-none">—</span>`;

    // Priority
    const tdPriority = document.createElement('td');
    tdPriority.innerHTML = `<span class="pill pill-${task.priority}">${task.priority}</span>`;

    // Status (with verification badge if applicable)
    const tdStatus = document.createElement('td');
    let statusHtml = `<span class="pill pill-${statusClass}">${task.status}</span>`;
    if (task.verification_status === 'Pending Verification') {
      statusHtml += `<br><span class="pill pill-PendingVerification" style="margin-top:4px">⏳ Verifying</span>`;
    } else if (task.verification_status === 'Verification Rejected') {
      statusHtml += `<br><span class="pill pill-Rejected" style="margin-top:4px">↩ Rej.</span>`;
    }
    tdStatus.innerHTML = statusHtml;

    // Actions — overdue view only offers "Mark as done" + "Set extended time"
    const tdActions = document.createElement('td');
    tdActions.className = 'row-actions';
    tdActions.addEventListener('click', (e) => e.stopPropagation()); // don't open drawer when using the menu
    tdActions.appendChild(buildOverdueMenuElement(task));

    tr.append(tdSr, tdDetails, tdSource, tdDate, tdAssigned, tdVerifier, tdPriority, tdStatus, tdActions);
    tr.addEventListener('click', () => openOverdueDrawer(task.id));
    tbody.appendChild(tr);
  });
}

// Dedicated 3-dot menu for the Overdue view — intentionally just these two
// actions (not the full reschedule/reassign/reject menu used elsewhere),
// since "deal with it from here" in this view means either finish it or
// buy it more time.
function buildOverdueMenuElement(task) {
  const wrap = document.createElement('div'); wrap.className = 'card-menu';
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button'; menuBtn.className = 'card-menu-btn';
  menuBtn.setAttribute('aria-label', 'More options'); menuBtn.textContent = '⋮';
  const menuList = document.createElement('div');
  menuList.className = 'card-menu-list'; menuList.hidden = true;

  const items = [];
  if (task.status !== 'Completed') {
    items.push({ label: '✅ Mark as done', onClick: () => markOverdueEntryDone(task) });
  }
  // "Extended time" is an assignment-task concept only — recurring tasks
  // don't have that field, so the option is left out for those rows.
  if (!task.is_recurring) {
    items.push({ label: '⏱ Set extended time', onClick: () => openOverdueExtendModal(task) });
  }

  items.forEach((item) => {
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

// ─── Set extended time modal ──────────────────────────────────────────────
function openOverdueExtendModal(task) {
  state.pendingTaskId = task.id;
  els.overdueExtendFormMsg.hidden = true;
  els.overdueExtendDate.value = task.overdue_extended_until ? toDatetimeLocalValue(task.overdue_extended_until) : '';
  els.overdueExtendReason.value = task.overdue_extension_reason ?? '';
  els.overdueExtendModal.hidden = false;
}
els.closeOverdueExtendModal.addEventListener('click', () => { els.overdueExtendModal.hidden = true; });
els.cancelOverdueExtendModal.addEventListener('click', () => { els.overdueExtendModal.hidden = true; });
els.overdueExtendForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.overdueExtendFormMsg.hidden = true;
  try {
    await api(`/tasks/${state.pendingTaskId}/overdue-extend`, {
      method: 'PATCH',
      body: { extended_until: els.overdueExtendDate.value, reason: els.overdueExtendReason.value }
    });
    showToast('Extended time saved ⏱', 'success');
    els.overdueExtendModal.hidden = true;
    if (state.activeView === 'overdue') loadOverdueTasks();
  } catch (err) { els.overdueExtendFormMsg.textContent = err.message; els.overdueExtendFormMsg.hidden = false; }
});

// ─── Overdue detail drawer (Today / Pending tabs) ─────────────────────────
// "Today" = needs attention right now (no active extension, or the
// extension itself has already lapsed). "Pending" = an admin already gave
// the employee more time and that window hasn't passed yet.
function openOverdueDrawer(taskId) {
  const task = overdueTasksCache.find((t) => t.id === taskId);
  if (!task) return;
  overdueDrawerTab = isOverdueExtensionActive(task) ? 'pending' : 'today';
  renderOverdueDrawer();
  els.overdueDrawerBackdrop.hidden = false;
}
els.closeOverdueDrawer.addEventListener('click', () => { els.overdueDrawerBackdrop.hidden = true; });
els.overdueDrawerBackdrop.addEventListener('click', (e) => {
  if (e.target === els.overdueDrawerBackdrop) els.overdueDrawerBackdrop.hidden = true;
});
els.overdueTabToday.addEventListener('click', () => { overdueDrawerTab = 'today'; renderOverdueDrawer(); });
els.overdueTabPending.addEventListener('click', () => { overdueDrawerTab = 'pending'; renderOverdueDrawer(); });

function renderOverdueDrawer() {
  const today = overdueTasksCache.filter((t) => !isOverdueExtensionActive(t));
  const pending = overdueTasksCache.filter((t) => isOverdueExtensionActive(t));

  els.overdueTabTodayCount.textContent = today.length;
  els.overdueTabPendingCount.textContent = pending.length;
  els.overdueTabToday.classList.toggle('active', overdueDrawerTab === 'today');
  els.overdueTabPending.classList.toggle('active', overdueDrawerTab === 'pending');

  const list = overdueDrawerTab === 'today' ? today : pending;
  const body = els.overdueDrawerBody;

  if (!list.length) {
    body.innerHTML = `<div class="empty-state">${overdueDrawerTab === 'today' ? 'Nothing needs attention right now 🎉' : 'No tasks on extended time'}</div>`;
    return;
  }

  body.innerHTML = '';
  list.forEach((task) => {
    const source = taskOverdueSource(task);
    const item = document.createElement('div');
    item.className = 'drawer-task-item';
    item.innerHTML = `
      ${source === 'recurring'
        ? `<span class="source-badge source-recurring">🔁 Recurring</span>`
        : source === 'verification'
        ? `<span class="source-badge source-verification">⏳ Verification</span>`
        : `<span class="source-badge source-assignment">📋 Assignment</span>`}
      <div class="task-detail-line"><strong>${escapeHtml(task.description ?? '')}</strong></div>
      <div class="task-detail-line"><span class="task-detail-label">Assigned to:</span> ${escapeHtml(task.assigned_to_user?.full_name ?? '—')}</div>
      ${task.verifier?.full_name ? `<div class="task-detail-line"><span class="task-detail-label">Verifier:</span> ${escapeHtml(task.verifier.full_name)}</div>` : ''}
      <div class="task-detail-line"><span class="task-detail-label">Planned date:</span> ${escapeHtml(fmtDeadlineDateOnlyWithHours(task.target_date, task.hours_to_complete))}</div>
      ${overdueDrawerTab === 'pending' ? `
        <div class="drawer-extension-note">
          ⏱ Extended to <strong>${escapeHtml(fmtDate(task.overdue_extended_until))}</strong>
          ${task.overdue_extension_reason ? `<br>Reason: ${escapeHtml(task.overdue_extension_reason)}` : ''}
        </div>
      ` : ''}
      <div class="drawer-task-actions"></div>
    `;
    const actionsEl = item.querySelector('.drawer-task-actions');
    if (task.status !== 'Completed') {
      actionsEl.appendChild(makeActionBtn('action-complete', '✅ Mark as done', () => markOverdueEntryDone(task)));
    }
    if (!task.is_recurring) {
      actionsEl.appendChild(makeActionBtn('action-start', '⏱ Set extended time', () => openOverdueExtendModal(task)));
    }
    body.appendChild(item);
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
  if (task.verification_status === 'Updation Required') {
    return `<span class="pill pill-Pending" style="font-size:0.7rem">📝 Updation Required</span>`;
  }
  if (task.status === 'Ticket Raised') {
    return `<span class="pill pill-Pending" style="font-size:0.7rem">🎫 Ticket Raised</span>`;
  }
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

  // Employee hasn't accepted/rejected this task yet — no extra options until
  // they make that call via the primary Accept/Reject buttons.
  if (!isAdminManaging && task.status === 'Pending') {
    return items;
  }

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
  items.push({ label: '🎫 Raise a ticket', onClick: () => openTicketModal(task.id, task.description, task.project?.name) });
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
  const items = buildCardMenuItems(task, { showAssignee });
  const wrap = document.createElement('div'); wrap.className = 'card-menu';
  if (items.length === 0) return wrap; // nothing to show — keep an empty wrapper for layout
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button'; menuBtn.className = 'card-menu-btn';
  menuBtn.setAttribute('aria-label', 'More options'); menuBtn.textContent = '⋮';
  const menuList = document.createElement('div');
  menuList.className = 'card-menu-list'; menuList.hidden = true;

  items.forEach((item) => {
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
//   if (verificationMode) {
//     // Two-step: "Start Verification" → then Verify or Send for Correction
//     const startBtn = makeActionBtn('action-start', '🔎 Start Verification', () => {
//       actionsEl.innerHTML = '';
//       actionsEl.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
//         if (confirm('Mark this task as Verified?')) verifyApprove(task.id);
//       }));

//       actionsEl.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
//       if (confirm('Mark this task as Verified?')) verifyApprove(task.id);
//     }));
//     actionsEl.appendChild(makeActionBtn('action-reject', '↩ Send for Correction', () => openCorrectionModal(task.id)));
//     actionsEl.appendChild(makeActionBtn('action-updation', '📝 Updation', () => openUpdationModal(task.id)));
//     return card;
  
//   buildPrimaryStatusButtons(task, { showAssignee, allowActions }).forEach((btn) => actionsEl.appendChild(btn));
//   return card;
// }
if (verificationMode) {
    actionsEl.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
      if (confirm('Mark this task as Verified?')) verifyApprove(task.id);
    }));
    actionsEl.appendChild(makeActionBtn('action-reject', '↩ Send for Correction', () => openCorrectionModal(task.id)));
    actionsEl.appendChild(makeActionBtn('action-updation', '📝 Updation', () => openUpdationModal(task.id)));
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
    showToast('Task updated ✅', 'success'); reloadCurrentTaskView(); refreshNavBadges();
  } catch (err) { showToast(err.message, 'error'); }
}

function reloadCurrentTaskView() {
  if (state.activeView === 'all')           loadAllTasks();
  else if (state.activeView === 'my')       loadMyTasks();
  else if (state.activeView === 'overdue')  loadOverdueTasks();
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
  actionsEl.appendChild(makeActionBtn('action-reject', '↩ Correction', () => openCorrectionModal(taskId)));
  actionsEl.appendChild(makeActionBtn('action-updation', '📝 Updation', () => openUpdationModal(taskId)));
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

// Tracks which task IDs have had "Start Verification" clicked this session.
// Survives re-renders so the button doesn't reset when another task is actioned.
const activeVerifications = new Set();

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
    tdDate.textContent = fmtDate(task.verification_requested_at ?? task.updated_at ?? task.created_at);

    // Actions — "Start Verification" → then Verify or Send for Correction
    // activeVerifications Set ensures button stays in "started" state even after re-render
    const tdActions = document.createElement('td');
    tdActions.className = 'row-actions';

    function showVerifyActions() {
      tdActions.innerHTML = '';
      tdActions.appendChild(makeActionBtn('action-complete', '✅ Verify', () => {
        if (confirm('Mark this task as Verified?')) verifyApprove(task.id);
      }));
      tdActions.appendChild(makeActionBtn('action-reject', '↩ Correction', () => openCorrectionModal(task.id)));
      tdActions.appendChild(makeActionBtn('action-updation', '📝 Updation', () => openUpdationModal(task.id)));
    }

    // if (activeVerifications.has(task.id)) {
    //   // Already started before re-render — show verify/correction buttons directly
    //   showVerifyActions();
    // } else {
    //   const startBtn = makeActionBtn('action-start', '🔎 Start Verification', () => {
    //     activeVerifications.add(task.id);
    //     showVerifyActions();
    //   });
    //   tdActions.appendChild(startBtn);
    // }
showVerifyActions();
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

const TICKET_CATEGORY_LABELS = {
  'Technical': '🔧 Technical',
  'Task':      '📋 Task related',
  'Access':    '🔑 Access / Login',
  'Other':     '📌 Other',
  'General':   '📌 General'
};

// Categories that require screenshot / screen recording
const TICKET_NEEDS_MEDIA = new Set(['Technical', 'Access']);

function openTicketModal(taskId, taskDescription) {
  state.pendingTaskId = taskId || null;
  els.ticketFormMsg.hidden = true;
  els.ticketDescription.value = '';
  document.getElementById('ticket-category').value = '';
  document.getElementById('ticketMediaFields').hidden = true;
  const mediaInput = document.getElementById('ticket-media');
  if (mediaInput) mediaInput.value = '';

  // Task banner
  const banner     = document.getElementById('ticketTaskBanner');
  const bannerText = document.getElementById('ticketTaskBannerText');
  if (taskId && taskDescription) {
    bannerText.textContent = taskDescription.length > 80
      ? taskDescription.slice(0, 80) + '…'
      : taskDescription;
    banner.hidden = false;
    document.getElementById('ticket-category').value = 'Task';
    document.getElementById('ticketMediaFields').hidden = true;
  } else {
    banner.hidden = true;
  }

  els.ticketModal.hidden = false;
}

// Show/hide media upload when category changes
document.getElementById('ticket-category').addEventListener('change', function () {
  const mediaWrap = document.getElementById('ticketMediaFields');
  mediaWrap.hidden = !TICKET_NEEDS_MEDIA.has(this.value);
  if (mediaWrap.hidden) {
    const mi = document.getElementById('ticket-media');
    if (mi) mi.value = '';
  }
});

els.openRaiseTicket.addEventListener('click', () => openTicketModal(null));
els.closeTicketModal.addEventListener('click',  () => { els.ticketModal.hidden = true; });
els.cancelTicketModal.addEventListener('click', () => { els.ticketModal.hidden = true; });

els.ticketForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.ticketFormMsg.hidden = true;

  const category    = document.getElementById('ticket-category').value;
  const description = els.ticketDescription.value.trim();
  if (!category)    { els.ticketFormMsg.textContent = 'Please select a category'; els.ticketFormMsg.hidden = false; return; }
  if (!description) { els.ticketFormMsg.textContent = 'Please describe the issue'; els.ticketFormMsg.hidden = false; return; }

  try {
    const mediaInput = document.getElementById('ticket-media');
    const hasMedia   = mediaInput && mediaInput.files[0] && TICKET_NEEDS_MEDIA.has(category);

    if (hasMedia) {
      // Use FormData so the media file goes through the backend (same pattern as task attachments)
      const formData = new FormData();
      formData.append('task_id',     state.pendingTaskId || '');
      formData.append('category',    category);
      formData.append('description', description);
      formData.append('media',       mediaInput.files[0]);
      await api('/tickets', { method: 'POST', body: formData, isForm: true });
    } else {
      await api('/tickets', { method: 'POST', body: { task_id: state.pendingTaskId, category, description } });
    }

    showToast('Ticket raised ✅', 'success');
    els.ticketModal.hidden = true;
    if (state.activeView === 'tickets') loadTickets();
  } catch (err) {
    els.ticketFormMsg.textContent = err.message;
    els.ticketFormMsg.hidden = false;
  }
});

// ─── Updation Modal (verifier/admin → employee: request task updation) ──────────
function openUpdationModal(taskId) {
  state.pendingTaskId = taskId;
  document.getElementById('updation-note').value = '';
  document.getElementById('updationFormMsg').hidden = true;
  document.getElementById('updationModal').hidden = false;
}

document.getElementById('closeUpdationModal').addEventListener('click', () => {
  document.getElementById('updationModal').hidden = true;
});
document.getElementById('cancelUpdationModal').addEventListener('click', () => {
  document.getElementById('updationModal').hidden = true;
});
document.getElementById('updationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const note = document.getElementById('updation-note').value.trim();
  const msgEl = document.getElementById('updationFormMsg');
  msgEl.hidden = true;
  if (!note) {
    msgEl.textContent = 'Please write an updation note before sending';
    msgEl.hidden = false;
    return;
  }
  try {
    await api(`/tasks/${state.pendingTaskId}/send-updation`, {
      method: 'PATCH', body: { note }
    });
    showToast('Updation request sent ✅', 'success');
    document.getElementById('updationModal').hidden = true;
    loadVerifications();
  } catch (err) {
    msgEl.textContent = err.message;
    msgEl.hidden = false;
  }
});

// ─── Load & Render Updations (employee view) ──────────────────────────────────
async function loadUpdations() {
  const listEl = document.getElementById('updationsList');
  if (listEl) listEl.innerHTML = '<div class="empty-state">Loading updations…</div>';
  try {
    const allTasks = await api('/tasks/my');
    const updations = allTasks.filter((t) => t.verification_status === 'Updation Required');
    renderUpdationsList(updations);
  } catch (err) { showToast(err.message, 'error'); }
}

function renderUpdationsList(tasks) {
  const listEl = document.getElementById('updationsList');
  if (!listEl) return;
  if (!tasks.length) {
    listEl.innerHTML = `<div class="empty-state"><span class="emoji">📝</span>No updations pending — you're all good!</div>`;
    return;
  }
  listEl.innerHTML = '';
  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority}`;
    card.innerHTML = `
      <div class="task-card-top">
        <div>
          <div class="task-card-project">${escapeHtml(task.project?.name ?? '—')}</div>
          <div class="task-card-type">${escapeHtml(task.task_type?.name ?? '—')} · ${escapeHtml(task.department?.name ?? '—')}</div>
        </div>
        <span class="pill pill-Pending">📝 Updation Required</span>
      </div>
      <p class="task-card-desc">${escapeHtml(task.description)}</p>
      <div class="correction-note-box">
        <div class="correction-note-label">📝 Updation note from <strong>${escapeHtml(task.verifier?.full_name ?? 'Verifier')}</strong>:</div>
        <div class="correction-note-text">${escapeHtml(task.updation_note ?? '(no note)')}</div>
      </div>
      <div class="task-card-footer">
        <span class="pill pill-InProgress">${task.status}</span>
        <div class="task-actions" id="upd-actions-${task.id}"></div>
      </div>
    `;
    const actionsEl = card.querySelector(`#upd-actions-${task.id}`);
    actionsEl.appendChild(makeActionBtn('action-start', '🔄 Resend for Verification', () => openResendVerifyModal(task)));
    listEl.appendChild(card);
  });
}

// ─── Solution Modal (admin / resolver) ───────────────────────────────────────
let _solvingTicketId = null;

function openSolutionModal(ticket) {
  _solvingTicketId = ticket.id;
  document.getElementById('solution-text').value = '';
  document.getElementById('solutionFormMsg').hidden = true;

  const info = document.getElementById('solutionTicketInfo');
  info.innerHTML = `
    <div class="solution-ticket-summary">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">
        <span class="pill pill-Pending pill-sm">Open</span>
        <span class="ticket-category-chip">${escapeHtml(TICKET_CATEGORY_LABELS[ticket.category] || ticket.category)}</span>
      </div>
      <p class="solution-ticket-desc">"${escapeHtml(ticket.description.length > 120 ? ticket.description.slice(0,120)+'…' : ticket.description)}"</p>
      <p class="solution-ticket-meta">
        Raised by <strong>${escapeHtml(ticket.raised_by_user?.full_name ?? '—')}</strong>
        ${ticket.task ? ` · Task: <em>${escapeHtml(ticket.task.description.slice(0,60))}${ticket.task.description.length > 60 ? '…' : ''}</em>` : ''}
        · ${fmtDate(ticket.created_at)}
      </p>
      ${ticket.attachment_url ? `<div style="margin-top:6px"><a href="${escapeHtml(ticket.attachment_url)}" target="_blank" class="ghost-btn-text" style="font-size:0.8rem">📎 View attached screenshot/recording</a></div>` : ''}
    </div>
  `;
  document.getElementById('solutionModal').hidden = false;
}

document.getElementById('closeSolutionModal').addEventListener('click',  () => { document.getElementById('solutionModal').hidden = true; });
document.getElementById('cancelSolutionModal').addEventListener('click', () => { document.getElementById('solutionModal').hidden = true; });

document.getElementById('submitSolutionBtn').addEventListener('click', async () => {
  const solution = document.getElementById('solution-text').value.trim();
  const msgEl    = document.getElementById('solutionFormMsg');
  msgEl.hidden   = true;
  if (!solution) { msgEl.textContent = 'Please write a solution before submitting'; msgEl.hidden = false; return; }
  try {
    await api(`/tickets/${_solvingTicketId}/solve`, { method: 'PATCH', body: { solution } });
    showToast('Solution submitted & ticket resolved ✅', 'success');
    document.getElementById('solutionModal').hidden = true;
    loadTickets();
  } catch (err) {
    msgEl.textContent = err.message;
    msgEl.hidden = false;
  }
});

// ─── Load & Render ────────────────────────────────────────────────────────────
async function loadTickets() {
  const titleEl = document.getElementById('ticketsViewTitle');
  const subEl   = document.getElementById('ticketsViewSub');
  if (titleEl) titleEl.textContent = '🎫 Tickets';
  if (subEl)   subEl.textContent   = 'Raise and track support issues.';
  els.ticketsList.innerHTML = '<div class="empty-state">Loading tickets…</div>';
  try {
    const tickets = await api('/tickets');
    renderTicketsList(tickets);
  } catch (err) { showToast(err.message, 'error'); }
}

async function loadTicketsFiltered(statusFilter) {
  // Update view heading dynamically
  const titleEl = document.getElementById('ticketsViewTitle');
  const subEl   = document.getElementById('ticketsViewSub');
  if (titleEl) titleEl.textContent = statusFilter === 'Open' ? '🟠 Open Tickets' : '✅ Resolved Tickets';
  if (subEl)   subEl.textContent   = statusFilter === 'Open'
    ? 'All open tickets pending resolution.'
    : 'All resolved / closed tickets.';

  els.ticketsList.innerHTML = `<div class="empty-state">Loading ${statusFilter.toLowerCase()} tickets…</div>`;
  try {
    const tickets = await api('/tickets');
    const filtered = tickets.filter(t => t.status === statusFilter);
    renderTicketsList(filtered, statusFilter);
  } catch (err) { showToast(err.message, 'error'); }
}

function renderTicketsList(tickets, statusFilter) {
  if (!tickets.length) {
    const msg = statusFilter === 'Open' ? '🟠 No open tickets right now'
              : statusFilter === 'Resolved' ? '✅ No resolved tickets yet'
              : '🎫 No tickets yet';
    els.ticketsList.innerHTML = `<div class="empty-state"><span class="emoji">🎫</span>${msg}</div>`;
    return;
  }
  els.ticketsList.innerHTML = '';

  const isMisOrAdmin = state.user.role === 'admin'
    || !!state.user.can_resolve_tickets
    || !!state.user.is_mis_executive;

  //const canSolve = state.user.role === 'admin' || !!state.user.can_resolve_tickets;
  const canSolve = state.user.role === 'admin' || !!state.user.can_resolve_tickets || !!state.user.is_mis_executive;

  tickets.forEach((ticket) => {
    const card = document.createElement('div');
    card.className = 'ticket-card';

    const catLabel = TICKET_CATEGORY_LABELS[ticket.category] || ticket.category || '';

    card.innerHTML = `
      <div class="ticket-top">
        <div class="ticket-top-left">
          <span class="pill ${ticket.status === 'Open' ? 'pill-Pending' : 'pill-Completed'}">${ticket.status}</span>
          ${catLabel ? `<span class="ticket-category-chip">${escapeHtml(catLabel)}</span>` : ''}
        </div>
        <div class="row-actions"></div>
      </div>

      ${ticket.task ? `
        <div class="ticket-task-ref">
          🔗 ${ticket.task.project?.name ? `<strong>${escapeHtml(ticket.task.project.name)}</strong> · ` : ''}Task: <em>${escapeHtml(ticket.task.description.slice(0,80))}${ticket.task.description.length > 80 ? '…' : ''}</em>
        </div>` : ''}

      <p class="ticket-desc">${escapeHtml(ticket.description)}</p>

      ${ticket.attachment_url ? `
        <div class="ticket-media-row">
          <a href="${escapeHtml(ticket.attachment_url)}" target="_blank" class="ticket-media-link">📎 Screenshot / Recording</a>
        </div>` : ''}

      <div class="ticket-meta">
        Raised by <strong>${escapeHtml(ticket.raised_by_user?.full_name ?? '—')}</strong>
        · ${fmtDate(ticket.created_at)}
      </div>

      ${ticket.solution ? `
        <div class="ticket-solution-box">
          <div class="ticket-solution-header">💡 Solution</div>
          <p class="ticket-solution-text">${escapeHtml(ticket.solution)}</p>
          <div class="ticket-solution-meta">
            By <strong>${escapeHtml(ticket.solved_by_user?.full_name ?? '—')}</strong>
            · ${fmtDate(ticket.solution_at)}
          </div>
        </div>` : ''}
    `;

    const actionsCell = card.querySelector('.row-actions');

    // Admin/resolver: show Solution button on open tickets
    if (canSolve && ticket.status === 'Open') {
      const solveBtn = document.createElement('button');
      solveBtn.className = 'action-btn action-verify';
      solveBtn.textContent = '💡 Solution';
      solveBtn.addEventListener('click', () => openSolutionModal(ticket));
      actionsCell.appendChild(solveBtn);
    }

    els.ticketsList.appendChild(card);
  });
}

// ─── Leave: apply (everyone) ───────────────────────────────────────────────────
function openLeaveModal() {
  els.leaveFormMsg.hidden = true;
  els.leaveForm.reset();
  els.leaveModal.hidden = false;
}
els.openApplyLeave.addEventListener('click', openLeaveModal);
els.closeLeaveModal.addEventListener('click', () => { els.leaveModal.hidden = true; });
els.cancelLeaveModal.addEventListener('click', () => { els.leaveModal.hidden = true; });
els.leaveForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.leaveFormMsg.hidden = true;
  try {
    await api('/leaves', {
      method: 'POST',
      body: {
        from_date: els.leaveFrom.value,
        to_date: els.leaveTo.value,
        is_half_day: els.leaveHalfDay.checked,
        reason: els.leaveReason.value.trim()
      }
    });
    showToast('Leave request submitted ✅', 'success');
    els.leaveModal.hidden = true;
    if (state.activeView === 'applyleave') loadMyLeaves();
  } catch (err) { els.leaveFormMsg.textContent = err.message; els.leaveFormMsg.hidden = false; }
});

async function loadMyLeaves() {
  els.myLeavesList.innerHTML = '<div class="empty-state">Loading your leave requests…</div>';
  try {
    const leaves = await api('/leaves/my');
    renderMyLeavesList(leaves);
  } catch (err) { showToast(err.message, 'error'); }
}

function leavePillClass(status) {
  if (status === 'Approved') return 'pill-Completed';
  if (status === 'Rejected') return 'pill-Rejected';
  return 'pill-Pending';
}

function leaveDateRangeLabel(leave) {
  const from = fmtDateOnly(leave.from_date);
  const to = fmtDateOnly(leave.to_date);
  const range = leave.from_date === leave.to_date ? from : `${from} → ${to}`;
  return leave.is_half_day ? `${range} (Half day)` : range;
}

function renderMyLeavesList(leaves) {
  if (!leaves.length) {
    els.myLeavesList.innerHTML = `<div class="empty-state"><span class="emoji">🌴</span>No leave requests yet</div>`;
    return;
  }
  els.myLeavesList.innerHTML = '';
  leaves.forEach((leave) => {
    const card = document.createElement('div');
    card.className = 'ticket-card';
    card.innerHTML = `
      <div class="ticket-top">
        <span class="pill ${leavePillClass(leave.status)}">${leave.status}</span>
        <div class="row-actions"></div>
      </div>
      <div class="ticket-desc"><strong>${escapeHtml(leaveDateRangeLabel(leave))}</strong></div>
      <p class="ticket-desc">${escapeHtml(leave.reason)}</p>
      ${leave.decision_note ? `<div class="ticket-meta">Admin's note: ${escapeHtml(leave.decision_note)}</div>` : ''}
      <div class="ticket-meta">
        Applied ${fmtDate(leave.created_at)}
        ${leave.decided_at ? ` · Decided by <strong>${escapeHtml(leave.decided_by_user?.full_name ?? '—')}</strong> on ${fmtDate(leave.decided_at)}` : ''}
      </div>
    `;
    if (leave.status === 'Pending') {
      const actionsCell = card.querySelector('.row-actions');
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'action-btn action-reject';
      cancelBtn.textContent = '✕ Cancel';
      cancelBtn.addEventListener('click', async () => {
        if (!confirm('Cancel this leave request?')) return;
        try {
          await api(`/leaves/${leave.id}`, { method: 'DELETE' });
          showToast('Leave request cancelled', 'success'); loadMyLeaves();
        } catch (err) { showToast(err.message, 'error'); }
      });
      actionsCell.appendChild(cancelBtn);
    }
    els.myLeavesList.appendChild(card);
  });
}

// ─── Leave: approvals (admin) ──────────────────────────────────────────────────
async function loadLeaveApprovals() {
  els.leaveApprovalsList.innerHTML = '<div class="empty-state">Loading leave requests…</div>';
  try {
    const status = els.leaveApprovalsStatusFilter.value;
    const leaves = await api(`/leaves/all${status ? `?status=${encodeURIComponent(status)}` : ''}`);
    renderLeaveApprovalsList(leaves);
  } catch (err) { showToast(err.message, 'error'); }
}
els.leaveApprovalsStatusFilter.addEventListener('change', loadLeaveApprovals);

function renderLeaveApprovalsList(leaves) {
  if (!leaves.length) {
    els.leaveApprovalsList.innerHTML = `<div class="empty-state"><span class="emoji">🗒️</span>No leave requests found</div>`;
    return;
  }
  els.leaveApprovalsList.innerHTML = '';
  leaves.forEach((leave) => {
    const card = document.createElement('div');
    card.className = 'ticket-card';
    card.innerHTML = `
      <div class="ticket-top">
        <span class="pill ${leavePillClass(leave.status)}">${leave.status}</span>
        <div class="row-actions"></div>
      </div>
      <div class="ticket-desc"><strong>${escapeHtml(leave.user?.full_name ?? '—')}</strong> · ${escapeHtml(leaveDateRangeLabel(leave))}</div>
      <p class="ticket-desc">${escapeHtml(leave.reason)}</p>
      ${leave.decision_note ? `<div class="ticket-meta">Decision note: ${escapeHtml(leave.decision_note)}</div>` : ''}
      <div class="ticket-meta">
        Applied ${fmtDate(leave.created_at)}
        ${leave.decided_at ? ` · Decided by <strong>${escapeHtml(leave.decided_by_user?.full_name ?? '—')}</strong> on ${fmtDate(leave.decided_at)}` : ''}
      </div>
    `;
    if (leave.status === 'Pending') {
      const actionsCell = card.querySelector('.row-actions');

      const approveBtn = document.createElement('button');
      approveBtn.className = 'action-btn action-complete';
      approveBtn.textContent = '✅ Approve';
      approveBtn.addEventListener('click', async () => {
        try {
          await api(`/leaves/${leave.id}/approve`, { method: 'PATCH' });
          showToast('Leave approved ✅', 'success'); loadLeaveApprovals();
        } catch (err) { showToast(err.message, 'error'); }
      });

      const rejectBtn = document.createElement('button');
      rejectBtn.className = 'action-btn action-reject';
      rejectBtn.textContent = '✕ Reject';
      rejectBtn.addEventListener('click', () => openRejectLeaveModal(leave.id));

      actionsCell.appendChild(approveBtn);
      actionsCell.appendChild(rejectBtn);
    }
    els.leaveApprovalsList.appendChild(card);
  });
}

function openRejectLeaveModal(leaveId) {
  state.pendingLeaveId = leaveId;
  els.rejectLeaveFormMsg.hidden = true;
  els.rejectLeaveReason.value = '';
  els.rejectLeaveModal.hidden = false;
}
els.closeRejectLeaveModal.addEventListener('click', () => { els.rejectLeaveModal.hidden = true; });
els.cancelRejectLeaveModal.addEventListener('click', () => { els.rejectLeaveModal.hidden = true; });
els.rejectLeaveForm.addEventListener('submit', async (e) => {
  e.preventDefault(); els.rejectLeaveFormMsg.hidden = true;
  try {
    await api(`/leaves/${state.pendingLeaveId}/reject`, {
      method: 'PATCH',
      body: { reason: els.rejectLeaveReason.value.trim() }
    });
    showToast('Leave rejected', 'success');
    els.rejectLeaveModal.hidden = true;
    loadLeaveApprovals();
  } catch (err) { els.rejectLeaveFormMsg.textContent = err.message; els.rejectLeaveFormMsg.hidden = false; }
});

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
      ['can_verify', 'Verify tasks'],
      ['is_mis_executive', 'MIS Executive']
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
  // NOTE: this used to also check state.user.can_add_employee, which is an
  // "Add employee" permission unrelated to recurring tasks. That caused any
  // employee granted that one permission to also get the admin recurring
  // task view (Add Recurring Task button, edit/delete, etc.), even though
  // the backend only allows actual admins to create/edit/delete recurring
  // tasks (see requireAdmin in recurring_tasks.js). Gate on isAdmin only.
  const canManageRecurring = isAdmin;
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
  if (tbody) tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Loading…</td></tr>`;
  try {
    const tasks = await api('/recurring-tasks/my');
    renderEmployeeRecurringList(tasks);
    renderEmployeeRecurringTable(tasks);
  } catch (err) { showToast(err.message, 'error'); }
}

// Desktop table view — same data as the card list above, laid out as rows.
// One row per *instance* that needs attention: today's (if due and not yet
// completed) plus one row for every still-open earlier due date. A Weekly
// task waiting for its day contributes no rows at all — it simply isn't
// due, so it isn't shown here (it'll appear on its own on the right day).
function renderEmployeeRecurringTable(allTasks) {
  const tbody = document.getElementById('employeeRecurringTableBody');
  if (!tbody) return;

  const entries = [];
  allTasks.forEach(task => {
    if (task.fires_today && task.today_instance && task.today_instance.status !== 'Completed') {
      entries.push({ task, inst: task.today_instance, overdue: false });
    }
    (task.overdue_instances || []).forEach(inst => entries.push({ task, inst, overdue: true }));
  });

  if (!entries.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">No recurring tasks assigned to you</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  entries.forEach(({ task, inst, overdue }) => {
    const tr = document.createElement('tr');
    const checkpoints = (task.checkpoints || []).sort((a, b) => a.sort_order - b.sort_order);
    const completedIds = (inst.recurring_task_checkpoint_completions || []).map((c) => c.checkpoint_id);
    const allDone = checkpoints.length > 0 && completedIds.length === checkpoints.length;
    const canAct = inst.status !== 'Completed';
    const statusText = overdue ? `Overdue — due ${inst.due_date}`
      : checkpoints.length === 0 ? 'Pending'
      : `${completedIds.length}/${checkpoints.length} done`;
    const pillClass = overdue ? 'pill-Rejected' : (allDone ? 'pill-Completed' : 'pill-InProgress');

    const tdTask = document.createElement('td');
    tdTask.innerHTML = `
      <div class="task-detail-line"><strong>${escapeHtml(task.description ?? '')}</strong></div>
      ${task.project ? `<div class="task-detail-line"><span class="task-detail-label">Project:</span> ${escapeHtml(task.project.name)}</div>` : ''}
      ${task.task_type ? `<div class="task-detail-line"><span class="task-detail-label">Type:</span> ${escapeHtml(task.task_type.name)}</div>` : ''}
    `;

    const tdFreq = document.createElement('td');
    tdFreq.textContent = freqLabel(task);

    const tdPeriod = document.createElement('td');
    tdPeriod.style.fontSize = '0.8rem';
    tdPeriod.textContent = `${task.start_date ?? '—'} → ${task.end_date ?? 'ongoing'}`;

    const tdStatus = document.createElement('td');
    tdStatus.innerHTML = `<span class="pill ${pillClass}">${escapeHtml(statusText)}</span>`;
    if (canAct) {
      tdStatus.innerHTML += `
        <div style="margin-top:6px">
          <button class="action-btn action-accept done-btn">✅ Done</button>
        </div>`;
      tdStatus.querySelector('.done-btn').addEventListener('click', () => {
        openRecurringDoneFlow(task, inst, checkpoints);
      });
    }

    tr.append(tdTask, tdFreq, tdPeriod, tdStatus);
    tbody.appendChild(tr);
  });
}

// Shared "Done" flow for a recurring task instance, used by both the table
// and card views. If the task has no checkpoints, completes immediately.
// If it has checkpoints, opens a modal to tick them off, then Submit saves
// and closes it. On completion the task drops out of the active list —
// renderEmployeeRecurringList/-Table already do this automatically once the
// refreshed data shows status: 'Completed'.
async function openRecurringDoneFlow(task, inst, checkpoints) {
  if (!inst) return;

  if (checkpoints.length === 0) {
    try {
      const updated = await api(`/recurring-tasks/instances/${inst.id}/complete`, { method: 'POST' });
      const refreshed = await api('/recurring-tasks/my');
      renderEmployeeRecurringList(refreshed);
      renderEmployeeRecurringTable(refreshed);
      if (updated.status === 'Completed') showToast('Task marked as done ✅', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
    return;
  }

  const completedIds = (inst.recurring_task_checkpoint_completions || []).map(c => c.checkpoint_id);
  const modal = document.getElementById('checkpointModal');
  const titleEl = document.getElementById('checkpointModalTitle');
  const listEl = document.getElementById('checkpointModalList');
  const msgEl = document.getElementById('checkpointModalMsg');
  const submitBtn = document.getElementById('submitCheckpointModal');

  titleEl.textContent = task.description || 'Checkpoints';
  msgEl.hidden = true;
  listEl.innerHTML = `<div class="checkpoint-list">` + checkpoints.map(cp => {
    const done = completedIds.includes(cp.id);
    return `
      <label class="checkpoint-item ${done ? 'cp-done' : ''}" data-cp="${cp.id}">
        <input type="checkbox" class="cp-checkbox" ${done ? 'checked' : ''} />
        <span>${escapeHtml(cp.label)}</span>
      </label>`;
  }).join('') + `</div>`;

  listEl.querySelectorAll('.cp-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      e.target.closest('label').classList.toggle('cp-done', cb.checked);
    });
  });

  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit';

  function close() {
    modal.hidden = true;
    submitBtn.removeEventListener('click', onSubmit);
    document.getElementById('cancelCheckpointModal').removeEventListener('click', close);
    document.getElementById('closeCheckpointModal').removeEventListener('click', close);
  }

  async function onSubmit() {
    const checkedIds = [...listEl.querySelectorAll('.cp-checkbox:checked')]
      .map(cb => cb.closest('label').dataset.cp);
    submitBtn.disabled = true;
    try {
      const updated = await api(
        `/recurring-tasks/instances/${inst.id}/submit`,
        { method: 'POST', body: { checkpoint_ids: checkedIds } }
      );
      close();
      const refreshed = await api('/recurring-tasks/my');
      renderEmployeeRecurringList(refreshed);
      renderEmployeeRecurringTable(refreshed);
      if (updated.status === 'Completed') {
        showToast('All checkpoints done — task completed! ✅', 'success');
      } else {
        showToast('Checkpoints saved', 'success');
      }
    } catch (err) {
      submitBtn.disabled = false;
      showToast(err.message, 'error');
    }
  }

  submitBtn.addEventListener('click', onSubmit);
  document.getElementById('cancelCheckpointModal').addEventListener('click', close);
  document.getElementById('closeCheckpointModal').addEventListener('click', close);

  modal.hidden = false;
}
function renderEmployeeRecurringList(tasks) {
  const wrap = recEls.empList();
  if (!tasks.length) {
    wrap.innerHTML = `<div class="empty-state">No recurring tasks assigned to you</div>`;
    return;
  }
  wrap.innerHTML = '';

  // Today's tasks, minus anything already completed today — a completed
  // task drops out of the list immediately (no "Completed today" section)
  // so the employee only ever sees what's left to do. It'll reappear here
  // automatically on its next due date once the backend creates a fresh
  // instance for that date.
  const dueToday = tasks.filter(t => t.fires_today);
  const activeToday = dueToday.filter(t => t.today_instance?.status !== 'Completed');

  // Anything left un-done from an earlier due date. This is what keeps a
  // missed day visible as "still pending" instead of it silently
  // disappearing the moment today's fresh instance is created — and the
  // same entries feed the admin's Overdue tasks list.
  const overdueEntries = [];
  tasks.forEach(t => {
    (t.overdue_instances || []).forEach(inst => overdueEntries.push({ task: t, inst }));
  });

  const hdr1 = document.createElement('div');
  hdr1.className = 'nav-section-label'; hdr1.textContent = "Today's tasks";
  wrap.appendChild(hdr1);
  if (activeToday.length) {
    activeToday.forEach(t => wrap.appendChild(buildEmployeeRecurringCard(t, t.today_instance, false)));
  } else {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Nothing due today 🎉';
    wrap.appendChild(empty);
  }

  if (overdueEntries.length) {
    const hdr2 = document.createElement('div');
    hdr2.className = 'nav-section-label'; hdr2.style.marginTop = '24px';
    hdr2.textContent = `Overdue / not done (${overdueEntries.length})`;
    wrap.appendChild(hdr2);
    overdueEntries.forEach(({ task, inst }) => wrap.appendChild(buildEmployeeRecurringCard(task, inst, true)));
  }

  // Tasks that simply aren't due today (e.g. a Weekly task waiting for its
  // day) are intentionally left out entirely — they'll show up on their
  // own due date instead of cluttering today's view ahead of time.
}

// Renders one instance — either today's or a leftover overdue one — as a
// card. `overdue` controls the label/pill and disables nothing: a leftover
// instance can still be marked done directly from here.
function buildEmployeeRecurringCard(task, inst, overdue) {
  const card = document.createElement('div');
  card.className = 'task-card';
  const checkpoints = (task.checkpoints || []).sort((a, b) => a.sort_order - b.sort_order);
  const completedIds = inst
    ? (inst.recurring_task_checkpoint_completions || []).map(c => c.checkpoint_id)
    : [];
  const allDone = checkpoints.length > 0 && completedIds.length === checkpoints.length;
  const canAct = !!inst && inst.status !== 'Completed';
  const status = overdue ? `Overdue — due ${inst.due_date}`
    : inst?.status === 'Completed' ? 'Completed'
    : checkpoints.length === 0 ? 'Pending'
    : `${completedIds.length}/${checkpoints.length} done`;

  const pillClass = overdue ? 'pill-Rejected'
    : allDone ? 'pill-Completed'
    : 'pill-In-Progress';

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
    </div>
    ${canAct ? `
    <div class="task-card-actions">
      <button class="action-btn action-accept done-btn">✅ Done</button>
    </div>` : ''}
  `;

  const doneBtn = card.querySelector('.done-btn');
  if (doneBtn) {
    doneBtn.addEventListener('click', () => openRecurringDoneFlow(task, inst, checkpoints));
  }

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

// ═══════════════════════════════════════════════════════════════════
// ─── DRAWINGS MODULE ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

const DRAWING_CATEGORIES = ['Layout','Presentation','Architectural','Structural','MEP','Others'];

// ─── Add Drawing View ────────────────────────────────────────────────
function renderDrawingAddView() {
  const view = document.getElementById('view-drawings-add');
  if (!view) return;

  // Load projects for dropdown
  api('/master/projects').then(projects => {
    const projSel = view.querySelector('#drw-project');
    if (projSel) {
      projSel.innerHTML = '<option value="">-- Select Project --</option>';
      (projects || []).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id; opt.textContent = p.name;
        projSel.appendChild(opt);
      });
    }
  }).catch(() => {});

  // Load verifiers/heads for dropdown
  api('/master/verifiers').then(users => {
    const headSel = view.querySelector('#drw-head');
    if (headSel) {
      headSel.innerHTML = '<option value="">-- Select Head --</option>';
      (users || []).forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id; opt.textContent = u.full_name;
        headSel.appendChild(opt);
      });
    }
  }).catch(() => {});

  // Category change → update subcategory
  const catSel = view.querySelector('#drw-category');
  const sub1Sel = view.querySelector('#drw-sub1');
  if (catSel && sub1Sel) {
    catSel.addEventListener('change', () => {
      sub1Sel.innerHTML = '<option value="">-- Select Sub Category --</option>';
    });
  }

  const form = view.querySelector('#drawingForm');
  const msgEl = view.querySelector('#drawingFormMsg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgEl.hidden = true;

    const project_id = view.querySelector('#drw-project').value;
    const category   = view.querySelector('#drw-category').value;
    const sub_cat_1  = view.querySelector('#drw-sub1').value;
    const sub_cat_2  = view.querySelector('#drw-sub2').value;
    const sub_cat_3  = view.querySelector('#drw-sub3').value;
    const drawing_date = view.querySelector('#drw-date').value;
    const head_id    = view.querySelector('#drw-head').value;
    const revision   = view.querySelector('#drw-revision').value || 'R0';
    const remarks    = view.querySelector('#drw-remarks').value;
    const fileInput  = view.querySelector('#drw-files');

    if (!project_id || !category || !drawing_date || !head_id) {
      msgEl.textContent = 'Please fill in all required fields';
      msgEl.hidden = false;
      return;
    }

    try {
      const fd = new FormData();
      fd.append('project_id', project_id);
      fd.append('category', category);
      fd.append('sub_cat_1', sub_cat_1);
      fd.append('sub_cat_2', sub_cat_2);
      fd.append('sub_cat_3', sub_cat_3);
      fd.append('drawing_date', drawing_date);
      fd.append('head_id', head_id);
      fd.append('revision', revision);
      fd.append('remarks', remarks);
      if (fileInput.files.length > 0) {
        Array.from(fileInput.files).forEach(f => fd.append('files', f));
      }

      await api('/drawings', { method: 'POST', body: fd, isForm: true });
      showToast('Drawing saved ✅', 'success');
      form.reset();
    } catch (err) {
      msgEl.textContent = err.message || 'Failed to save drawing';
      msgEl.hidden = false;
    }
  });

  // Reset button
  const resetBtn = view.querySelector('#drawingResetBtn');
  if (resetBtn) resetBtn.addEventListener('click', () => { form.reset(); msgEl.hidden = true; });
}

// ─── All Drawings View ───────────────────────────────────────────────
let allDrawingsCache = [];

async function loadAllDrawings() {
  const view = document.getElementById('view-drawings-all');
  if (!view) return;
  const tbody = view.querySelector('#drawingsTableBody');
  tbody.innerHTML = `<tr><td colspan="11" class="empty-state">Loading drawings…</td></tr>`;

  try {
    allDrawingsCache = await api('/drawings');
    // Populate project filter
    const filterSel = view.querySelector('#drwFilterProject');
    if (filterSel) {
      const projects = [...new Map(allDrawingsCache.map(d => [d.project?.id, d.project?.name])).entries()]
        .filter(([id]) => id).sort((a,b) => a[1].localeCompare(b[1]));
      filterSel.innerHTML = '<option value="">All Projects</option>';
      projects.forEach(([id, name]) => {
        const opt = document.createElement('option');
        opt.value = id; opt.textContent = name;
        filterSel.appendChild(opt);
      });
    }
    renderDrawingsTable(allDrawingsCache);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="11" class="empty-state">Failed to load drawings</td></tr>`;
    showToast(err.message, 'error');
  }
}

function renderDrawingsTable(drawings) {
  const view = document.getElementById('view-drawings-all');
  const tbody = view.querySelector('#drawingsTableBody');
  const countEl = view.querySelector('#drawingsCount');
  if (countEl) countEl.textContent = `${drawings.length} total`;

  if (!drawings.length) {
    tbody.innerHTML = `<tr><td colspan="11" class="empty-state"><span class="emoji">📐</span>No drawings found</td></tr>`;
    return;
  }
  tbody.innerHTML = '';
  drawings.forEach((d, i) => {
    const tr = document.createElement('tr');
    const fileUrls = Array.isArray(d.file_urls) ? d.file_urls : (d.file_url ? [d.file_url] : []);
    const previewHtml = fileUrls.length
      ? fileUrls.map(u => `<a href="${escapeHtml(u)}" target="_blank" class="media-link drw-view-btn">View</a>`).join(' ')
      : `<span class="media-none">—</span>`;

    tr.innerHTML = `
      <td><span class="sr-number">${i+1}</span></td>
      <td><strong style="font-weight:600">${escapeHtml(d.project?.name ?? '—')}</strong></td>
      <td><span class="ticket-category-chip">${escapeHtml(d.category ?? '—')}</span></td>
      <td>${escapeHtml(d.sub_cat_1 || '—')}</td>
      <td>${escapeHtml(d.sub_cat_2 || '—')}</td>
      <td>${escapeHtml(d.sub_cat_3 || '—')}</td>
      <td style="white-space:nowrap">${d.drawing_date ? fmtDate(d.drawing_date) : '—'}</td>
      <td>${escapeHtml(d.head_user?.full_name ?? '—')}</td>
      <td><span class="pill pill-Pending" style="font-size:0.72rem;padding:2px 8px">${escapeHtml(d.revision ?? 'R0')}</span></td>
      <td style="font-size:0.8rem">${escapeHtml(d.remarks || '—')}</td>
      <td style="text-align:center">${previewHtml}</td>
      <td>${escapeHtml(d.added_by_user?.full_name ?? '—')}</td>
      <td class="row-actions"><button class="action-btn action-delete drw-delete-btn" data-id="${d.id}">🗑 Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Delete listeners
  tbody.querySelectorAll('.drw-delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this drawing?')) return;
      try {
        await api(`/drawings/${btn.dataset.id}`, { method: 'DELETE' });
        showToast('Drawing deleted', 'success');
        loadAllDrawings();
      } catch (err) { showToast(err.message, 'error'); }
    });
  });
}

// Filter by project
document.addEventListener('change', (e) => {
  if (e.target.id === 'drwFilterProject') {
    const val = e.target.value;
    const filtered = val
      ? allDrawingsCache.filter(d => String(d.project?.id) === val)
      : allDrawingsCache;
    renderDrawingsTable(filtered);
  }
});

// ═══════════════════════════════════════════════════════════════════
// ─── DAILY REPORT MODULE ──────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

let _drptMode = 'single'; // 'single' | 'range'

function loadDailyReport() {
  const dateInput   = document.getElementById('drptDate');
  const fromInput   = document.getElementById('drptFromDate');
  const toInput     = document.getElementById('drptToDate');
  const genBtn      = document.getElementById('drptGenBtn');
  const dlBtn       = document.getElementById('drptDownloadBtn');
  const modeSingle  = document.getElementById('drptModeSingle');
  const modeRange   = document.getElementById('drptModeRange');
  const singleWrap  = document.getElementById('drptSingleWrap');
  const rangeWrap   = document.getElementById('drptRangeWrap');

  // Default: yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  if (dateInput && !dateInput._drptInit) {
    dateInput.value = yStr;
    dateInput._drptInit = true;
  }
  if (fromInput && !fromInput._drptInit) {
    fromInput.value = yStr;
    toInput.value = new Date().toISOString().slice(0, 10);
    fromInput._drptInit = true;
  }

  // Mode toggle
  if (modeSingle && !modeSingle._drptBound) {
    modeSingle._drptBound = true;
    modeSingle.addEventListener('click', () => {
      _drptMode = 'single';
      modeSingle.classList.add('active');
      modeRange.classList.remove('active');
      singleWrap.style.display = 'flex';
      rangeWrap.style.display = 'none';
    });
    modeRange.addEventListener('click', () => {
      _drptMode = 'range';
      modeRange.classList.add('active');
      modeSingle.classList.remove('active');
      singleWrap.style.display = 'none';
      rangeWrap.style.display = 'flex';
    });
  }

  // Generate on button click
  if (genBtn && !genBtn._drptBound) {
    genBtn._drptBound = true;
    genBtn.addEventListener('click', () => generateDailyReport());
    if (dateInput) dateInput.addEventListener('change', () => generateDailyReport());
    // Auto-generate on first load
    generateDailyReport();
  }

  if (dlBtn && !dlBtn._drptBound) {
    dlBtn._drptBound = true;
    dlBtn.addEventListener('click', () => downloadDailyReportPdf());
  }
}

async function generateDailyReport() {
  const dateInput  = document.getElementById('drptDate');
  const fromInput  = document.getElementById('drptFromDate');
  const toInput    = document.getElementById('drptToDate');
  const body       = document.getElementById('drptBody');
  const subtitle   = document.getElementById('drptSubtitle');
  const dlBtn      = document.getElementById('drptDownloadBtn');

  let reportDateStr, rangeLabel;

  if (_drptMode === 'range') {
    const fromStr = fromInput?.value;
    const toStr   = toInput?.value;
    if (!fromStr || !toStr) return;
    const fmtD = (s) => new Date(s).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
    rangeLabel = `${fmtD(fromStr)} – ${fmtD(toStr)}`;
    if (subtitle) subtitle.textContent = `Report: ${rangeLabel}`;
    reportDateStr = null; // signal range mode
    body.innerHTML = `<div class="empty-state">Generating report…</div>`;
    await _generateDailyReportForRange(fromStr, toStr, body, dlBtn, subtitle, rangeLabel);
    return;
  }

  reportDateStr = dateInput?.value;
  if (!reportDateStr) return;

  const d = new Date(reportDateStr);
  const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'long' });
  if (subtitle) subtitle.textContent = `Report for ${label}`;

  body.innerHTML = `<div class="empty-state">Generating report…</div>`;

  try {
    const allTasks = await api('/tasks/all');
    const rDate    = new Date(reportDateStr); rDate.setHours(0,0,0,0);
    const rDateEnd = new Date(rDate); rDateEnd.setDate(rDateEnd.getDate() + 1);

    // ── categorise tasks ───────────────────────────────────────────
    const doneTasks      = [];
    const pendingTasks   = [];
    const verifyingTasks = [];
    const overdueTasks   = [];

    allTasks.forEach(t => {
      const isDone  = t.status === 'Completed' || t.verification_status === 'Verified';
      const targetD = t.target_date ? new Date(t.target_date) : null;
      if (targetD) targetD.setHours(0,0,0,0);

      if (isDone) { doneTasks.push(t); return; }
      if (t.verification_status === 'Pending Verification') { verifyingTasks.push(t); return; }
      if (targetD && targetD < rDateEnd) {
        const days = Math.floor((rDate - targetD) / 86400000);
        pendingTasks.push({ ...t, _daysLate: Math.max(0, days) });
        if (days > 0) overdueTasks.push({ ...t, _daysLate: days });
      }
    });

    overdueTasks.sort((a, b) => b._daysLate - a._daysLate);
    pendingTasks.sort((a, b) => b._daysLate - a._daysLate);

    body.innerHTML = '';

    // ── PMS-style header (matching image format) ──
    const periodLabel = `${d.toLocaleDateString('en-IN', {day:'2-digit',month:'2-digit',year:'numeric'})}`;
    const pmsHtml = `
      <div class="drpt-pms-header">
        <div class="drpt-pms-smile">☺</div>
        <div class="drpt-pms-title">PMS (${periodLabel})</div>
      </div>`;
    body.insertAdjacentHTML('beforeend', pmsHtml);

    // // ── Summary cards ──
    // body.insertAdjacentHTML('beforeend', `
    //   <div class="drpt-summary-row">
    //     <div class="drpt-stat-card drpt-stat-done"><div class="drpt-stat-num">${doneTasks.length}</div><div class="drpt-stat-label">✅ Completed</div></div>
    //     <div class="drpt-stat-card drpt-stat-pending"><div class="drpt-stat-num">${pendingTasks.length}</div><div class="drpt-stat-label">⏳ Pending</div></div>
    //     <div class="drpt-stat-card drpt-stat-overdue"><div class="drpt-stat-num">${overdueTasks.length}</div><div class="drpt-stat-label">🔴 Overdue</div></div>
    //     <div class="drpt-stat-card drpt-stat-verify"><div class="drpt-stat-num">${verifyingTasks.length}</div><div class="drpt-stat-label">🔎 Under Verification</div></div>
    //   </div>`);

    // ── Main PMS table (all tasks combined, like the image) ──
    const allForDay = [
      ...overdueTasks.map(t => ({ ...t, _section: 'overdue' })),
      ...pendingTasks.filter(t => t._daysLate === 0).map(t => ({ ...t, _section: 'pending' })),
      ...verifyingTasks.map(t => ({ ...t, _section: 'verification' })),
      ...doneTasks.map(t => ({ ...t, _section: 'done' }))
    ];

    if (allForDay.length) {
      body.insertAdjacentHTML('beforeend', `<div class="drpt-section-title" style="margin-top:20px">📋 Task Status Summary</div>`);
      const tbl = buildDrptPmsTable(allForDay);
      body.appendChild(tbl);
    }

    // ── Overdue detail ──
    // if (overdueTasks.length) {
    //   body.insertAdjacentHTML('beforeend', `<div class="drpt-section-title" style="margin-top:28px">🔴 Overdue Tasks</div>`);
    //   body.appendChild(buildDrptTable(
    //     ['Sr', 'Project', 'Task', 'Assignee', 'Target Date', 'Days Overdue', 'Status', 'Remarks'],
    //     overdueTasks.map((t, i) => ({
    //       sr: i + 1, project: t.project?.name ?? '—', task: t.description,
    //       assignee: t.assigned_to_user?.full_name ?? '—',
    //       target_date: t.target_date ? fmtDate(t.target_date) : '—',
    //       days: `<span class="drpt-overdue-badge">${t._daysLate} day${t._daysLate !== 1 ? 's' : ''}</span>`,
    //       status: t.status, remarks: t._remarks || ''
    //     })), true
    //   ));
    // }

    // // ── Pending (due today) ──
    // const pendingNotOverdue = pendingTasks.filter(t => t._daysLate === 0);
    // if (pendingNotOverdue.length) {
    //   body.insertAdjacentHTML('beforeend', `<div class="drpt-section-title" style="margin-top:28px">⏳ Pending Tasks (Due Today)</div>`);
    //   body.appendChild(buildDrptTable(
    //     ['Sr', 'Project', 'Task', 'Assignee', 'Target Date', 'Status', 'Remarks'],
    //     pendingNotOverdue.map((t, i) => ({
    //       sr: i + 1, project: t.project?.name ?? '—', task: t.description,
    //       assignee: t.assigned_to_user?.full_name ?? '—',
    //       target_date: t.target_date ? fmtDate(t.target_date) : '—',
    //       status: t.status, remarks: t._remarks || ''
    //     })), true
    //   ));
    // }

    // // ── Under Verification ──
    // if (verifyingTasks.length) {
    //   body.insertAdjacentHTML('beforeend', `<div class="drpt-section-title" style="margin-top:28px">🔎 Under Verification</div>`);
    //   body.appendChild(buildDrptTable(
    //     ['Sr', 'Project', 'Task', 'Assignee', 'Verifier', 'Target Date', 'Status'],
    //     verifyingTasks.map((t, i) => ({
    //       sr: i + 1, project: t.project?.name ?? '—', task: t.description,
    //       assignee: t.assigned_to_user?.full_name ?? '—',
    //       verifier: t.verifier?.full_name ?? '—',
    //       target_date: t.target_date ? fmtDate(t.target_date) : '—',
    //       status: `<span class="pill pill-PendingVerification" style="font-size:0.72rem">⏳ Verifying</span>`
    //     })), false
    //   ));
    // }

    // // ── Completed ──
    // if (doneTasks.length) {
    //   body.insertAdjacentHTML('beforeend', `<div class="drpt-section-title" style="margin-top:28px">✅ Completed Tasks</div>`);
    //   body.appendChild(buildDrptTable(
    //     ['Sr', 'Project', 'Task', 'Assignee', 'Target Date', 'Status'],
    //     doneTasks.map((t, i) => ({
    //       sr: i + 1, project: t.project?.name ?? '—', task: t.description,
    //       assignee: t.assigned_to_user?.full_name ?? '—',
    //       target_date: t.target_date ? fmtDate(t.target_date) : '—',
    //       status: `<span class="pill pill-Completed" style="font-size:0.72rem">✅ Done</span>`
    //     })), false
    //   ));
    // }

    if (dlBtn) dlBtn.style.display = '';
  } catch (err) {
    body.innerHTML = `<div class="empty-state">Failed to generate report: ${escapeHtml(err.message)}</div>`;
  }
}

// Builds the PMS-style main table matching the image format (Sr, Date, Task, Assignee, Delay, Remarks)
function buildDrptPmsTable(tasks) {
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap drpt-pms-wrap';
  const tbl  = document.createElement('table');
  tbl.className = 'data-table drpt-table drpt-pms-table';

  tbl.innerHTML = `<thead><tr>
    <th class="col-sr">Sr.no</th>
    <th>Date</th>
    <th>Task</th>
    <th>Assigne</th>
    <th>Delay</th>
    <th>Remarks</th>
  </tr></thead>`;

  const tbody = document.createElement('tbody');
  tasks.forEach((t, i) => {
    const tr = document.createElement('tr');
    const isDone = t._section === 'done';
    const isVerify = t._section === 'verification';
    const daysLate = t._daysLate ?? 0;

    // Delay cell
    let delayHtml;
    if (isDone)   delayHtml = `<span class="drpt-done-badge">DONE</span>`;
    else if (isVerify) delayHtml = `<span class="drpt-verify-badge">Under Verification</span>`;
    else if (daysLate > 0) delayHtml = `<span class="drpt-overdue-badge">${daysLate} Days</span>`;
    else          delayHtml = `<span class="drpt-pending-badge">Today</span>`;

    // Remarks
    let remarksHtml;
    if (isVerify && t.verifier) {
      remarksHtml = `<span style="color:#6d28d9;font-size:0.8rem">Under Verification<br><strong>${escapeHtml(t.verifier.full_name)}</strong></span>`;
    } else {
      remarksHtml = `<input type="text" value="" placeholder="Add remark…" class="drpt-remark-input" />`;
    }

    tr.innerHTML = `
      <td><span class="sr-number">${i + 1}</span></td>
      <td style="white-space:nowrap;font-size:0.82rem">${t.target_date ? fmtDateOnly(t.target_date) : '—'}</td>
      <td class="drpt-task-cell">
        <div style="font-size:0.8rem;font-weight:700;color:var(--indigo,#4f46e5);text-transform:uppercase">${escapeHtml(t.project?.name ?? '')}</div>
        <div style="font-size:0.82rem">${escapeHtml(t.description)}</div>
      </td>
      <td style="font-weight:600;font-size:0.82rem">${escapeHtml(t.assigned_to_user?.full_name ?? '—')}</td>
      <td>${delayHtml}</td>
      <td></td>
    `;
    const remarksCell = tr.children[5];
    remarksCell.innerHTML = remarksHtml;
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  return wrap;
}

// Date-range report: fetches all tasks and buckets by target_date within range
async function _generateDailyReportForRange(fromStr, toStr, body, dlBtn, subtitle, rangeLabel) {
  try {
    const allTasks = await api('/tasks/all');
    const from = new Date(fromStr); from.setHours(0,0,0,0);
    const to   = new Date(toStr);   to.setHours(23,59,59,999);

    // Group tasks by date (target_date) within range
    const byDate = {};
    const dateList = [];
    allTasks.forEach(t => {
      if (!t.target_date) return;
      const d = new Date(t.target_date); d.setHours(0,0,0,0);
      if (d < from || d > to) return;
      const key = d.toISOString().slice(0,10);
      if (!byDate[key]) { byDate[key] = []; dateList.push(key); }
      byDate[key].push(t);
    });

    // Remove duplicate dates
    const uniqueDates = [...new Set(dateList)].sort();

    body.innerHTML = '';

    // PMS style header for range
    body.insertAdjacentHTML('beforeend', `
      <div class="drpt-pms-header">
        <div class="drpt-pms-smile">☺</div>
        <div class="drpt-pms-title">PMS (${rangeLabel})</div>
      </div>`);

    if (!uniqueDates.length) {
      body.insertAdjacentHTML('beforeend', `<div class="empty-state">No tasks found for this date range</div>`);
      if (dlBtn) dlBtn.style.display = 'none';
      return;
    }

    // Summary cards across range
    const done    = allTasks.filter(t => { if (!t.target_date) return false; const d = new Date(t.target_date); return d >= from && d <= to && (t.status === 'Completed' || t.verification_status === 'Verified'); }).length;
    const overdue = allTasks.filter(t => { if (!t.target_date) return false; const d = new Date(t.target_date); return d >= from && d <= to && d < new Date() && t.status !== 'Completed' && t.status !== 'Rejected' && t.verification_status !== 'Verified'; }).length;
    const verif   = allTasks.filter(t => { if (!t.target_date) return false; const d = new Date(t.target_date); return d >= from && d <= to && t.verification_status === 'Pending Verification'; }).length;
    const total   = Object.values(byDate).flat().length;

    // body.insertAdjacentHTML('beforeend', `
    //   <div class="drpt-summary-row">
    //     <div class="drpt-stat-card drpt-stat-done"><div class="drpt-stat-num">${done}</div><div class="drpt-stat-label">✅ Completed</div></div>
    //     <div class="drpt-stat-card drpt-stat-overdue"><div class="drpt-stat-num">${overdue}</div><div class="drpt-stat-label">🔴 Overdue</div></div>
    //     <div class="drpt-stat-card drpt-stat-verify"><div class="drpt-stat-num">${verif}</div><div class="drpt-stat-label">🔎 Under Verify</div></div>
    //     <div class="drpt-stat-card drpt-stat-pending"><div class="drpt-stat-num">${total}</div><div class="drpt-stat-label">📋 Total in Range</div></div>
    //   </div>`);

    // One PMS table per date in range
    uniqueDates.forEach(dateKey => {
      const tasks = byDate[dateKey];
      const dayLabel = new Date(dateKey).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric', weekday:'long' });
      body.insertAdjacentHTML('beforeend', `<div class="drpt-section-title" style="margin-top:28px">📅 ${dayLabel}</div>`);

      const now = new Date();
      const enriched = tasks.map(t => {
        const isDone   = t.status === 'Completed' || t.verification_status === 'Verified';
        const isVerify = t.verification_status === 'Pending Verification';
        const tgt      = new Date(t.target_date);
        const daysLate = isDone ? 0 : Math.max(0, Math.floor((now - tgt) / 86400000));
        return { ...t, _section: isDone ? 'done' : isVerify ? 'verification' : daysLate > 0 ? 'overdue' : 'pending', _daysLate: daysLate };
      });

      body.appendChild(buildDrptPmsTable(enriched));
    });

    if (dlBtn) dlBtn.style.display = '';
  } catch (err) {
    body.innerHTML = `<div class="empty-state">Failed: ${escapeHtml(err.message)}</div>`;
  }
}

function buildDrptTable(headers, rows, editableRemarks) {
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';

  const colCount = headers.length;
  const tbl = document.createElement('table');
  tbl.className = 'data-table drpt-table';

  // Head
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
  tbl.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="${colCount}" class="empty-state">No tasks</td></tr>`;
  } else {
    rows.forEach(row => {
      const tr = document.createElement('tr');
      const vals = Object.values(row);
      vals.forEach((val, idx) => {
        const td = document.createElement('td');
        // Last column + editableRemarks → make it an input
        if (editableRemarks && idx === vals.length - 1) {
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.value = val || '';
          inp.placeholder = 'Add remark…';
          inp.className = 'drpt-remark-input';
          td.appendChild(inp);
        } else {
          td.innerHTML = String(val ?? '—');
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  return wrap;
}

function downloadDailyReportPdf() {
  const dateInput  = document.getElementById('drptDate');
  const reportDate = dateInput?.value || 'report';
  const body       = document.getElementById('drptBody');
  const subtitle   = document.getElementById('drptSubtitle');

  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Daily Report – ${reportDate}</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #111; margin: 20px; }
        h1 { font-size: 18px; text-align: center; margin-bottom: 4px; }
        .sub { text-align:center; color:#555; margin-bottom: 20px; font-size:12px; }
        .drpt-summary-row { display:flex; gap:16px; margin-bottom:20px; }
        .drpt-stat-card { border:1px solid #ddd; border-radius:8px; padding:12px 20px; text-align:center; flex:1; }
        .drpt-stat-num { font-size:28px; font-weight:700; }
        .drpt-stat-done { border-color:#10b981; color:#10b981; }
        .drpt-stat-pending { border-color:#f59e0b; color:#f59e0b; }
        .drpt-stat-overdue { border-color:#ef4444; color:#ef4444; }
        .drpt-stat-verify { border-color:#6d28d9; color:#6d28d9; }
        .drpt-stat-label { font-size:11px; color:#555; margin-top:4px; }
        .drpt-section-title { font-weight:700; font-size:13px; text-transform:uppercase;
          letter-spacing:.05em; margin:20px 0 8px; padding-bottom:4px;
          border-bottom:2px solid #6d28d9; color:#6d28d9; }
        table { width:100%; border-collapse:collapse; margin-bottom:16px; }
        th { background:#1e1b4b; color:#fff; padding:7px 10px; text-align:left; font-size:11px; }
        td { padding:6px 10px; border-bottom:1px solid #e5e7eb; font-size:11px; vertical-align:top; }
        tr:nth-child(even) td { background:#f9fafb; }
        .drpt-overdue-badge { background:#fef2f2; color:#dc2626; font-weight:700;
          padding:2px 8px; border-radius:6px; font-size:10px; }
        input.drpt-remark-input { border:none; background:transparent; width:100%; font-size:11px; }
        @media print { body { margin:10px; } }
      </style>
    </head>
    <body>
      <h1>📋 DIP Projects — Daily Report</h1>
      <p class="sub">${subtitle?.textContent || reportDate}</p>
      ${body.innerHTML.replace(/class="drpt-remark-input"/g, 'style="border:none;width:100%;font-size:11px"')}
      <script>window.onload = () => { window.print(); }<\/script>
    </body>
    </html>
  `);
  win.document.close();
}
