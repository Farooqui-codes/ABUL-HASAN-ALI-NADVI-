/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Teacher Controller (js/teacher.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check Teacher Role Guard
  if (window.NadwiAuth && !window.NadwiAuth.checkAuth("teacher")) {
    return;
  }

  initTeacherDashboard();
});

function initTeacherDashboard() {
  renderTeacherStudents();
  renderHomeworkList();
  renderMarksEntryTable();
  setupTeacherModuleNavigation();

  // Homework Form
  const hwForm = document.getElementById("addHomeworkForm");
  if (hwForm) {
    hwForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const subject = document.getElementById("hwSubject").value;
      const targetClass = document.getElementById("hwClass").value;
      const dueDate = document.getElementById("hwDueDate").value;
      const title = document.getElementById("hwTitle").value.trim();
      const desc = document.getElementById("hwDesc").value.trim();

      const newHw = {
        id: "HW-" + Math.floor(100 + Math.random() * 900),
        subject,
        targetClass,
        dueDate,
        title,
        desc
      };

      const existingHw = JSON.parse(localStorage.getItem("NADWI_TEACHER_HW") || "[]");
      existingHw.unshift(newHw);
      localStorage.setItem("NADWI_TEACHER_HW", JSON.stringify(existingHw));

      renderHomeworkList();
      hwForm.reset();
      window.NadwiUI.toast(`Homework '${title}' assigned to ${targetClass}.`);
    });
  }

  // Teacher Leave Request Form
  const leaveForm = document.getElementById("teacherLeaveForm");
  if (leaveForm) {
    leaveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: 'success',
        title: 'Leave Application Submitted',
        text: 'Your leave request has been forwarded to Principal Dr. Muhammad Usman for approval.',
        confirmButtonColor: '#2563EB'
      });
      leaveForm.reset();
    });
  }

  // Parent Message Form
  const msgForm = document.getElementById("teacherMsgForm");
  if (msgForm) {
    msgForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const parentName = document.getElementById("msgParentSelect").value;
      const msgText = document.getElementById("msgText").value;
      
      const chatBox = document.getElementById("teacherChatHistory");
      if (chatBox) {
        const msgHtml = `
          <div class="d-flex justify-content-end mb-3">
            <div class="p-3 rounded bg-primary text-white" style="max-width: 75%;">
              <div class="small fw-bold mb-1">To: ${parentName}</div>
              <div>${msgText}</div>
              <small class="text-white-50 d-block text-end mt-1">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • Sent</small>
            </div>
          </div>
        `;
        chatBox.insertAdjacentHTML("beforeend", msgHtml);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
      msgForm.reset();
      window.NadwiUI.toast("Message dispatched to parent.");
    });
  }
}

function setupTeacherModuleNavigation() {
  const links = document.querySelectorAll(".sidebar-nav-link[data-module]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModule = link.getAttribute("data-module");

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      document.querySelectorAll(".erp-module-section").forEach(sec => {
        sec.classList.remove("active");
      });

      const activeSec = document.getElementById("mod-" + targetModule);
      if (activeSec) {
        activeSec.classList.add("active");
      }

      const crumb = document.getElementById("teacherBreadcrumbCurrent");
      if (crumb) {
        crumb.textContent = link.querySelector(".nav-label")?.textContent || targetModule;
      }

      const sidebar = document.getElementById("dashboardSidebar");
      if (sidebar && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
      }
    });
  });
}

function renderTeacherStudents() {
  const tbody = document.getElementById("teacherStudentsTableBody");
  if (!tbody) return;

  const students = window.NadwiData.getStudents().slice(0, 8);
  tbody.innerHTML = students.map(s => `
    <tr>
      <td><strong>${s.rollNo}</strong></td>
      <td>
        <div class="table-avatar-cell">
          <img src="${s.avatar}" alt="${s.name}" class="table-avatar-img">
          <div>
            <div class="table-user-name">${s.name}</div>
            <div class="table-user-sub">${s.id}</div>
          </div>
        </div>
      </td>
      <td>${s.class} (${s.section})</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div class="progress flex-grow-1" style="height: 6px;">
            <div class="progress-bar bg-success" style="width: ${s.attendancePercent}%;"></div>
          </div>
          <span class="small fw-bold">${s.attendancePercent}%</span>
        </div>
      </td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-success active" onclick="markStudentAtt(this, '${s.name}', 'Present')">P</button>
          <button type="button" class="btn btn-outline-warning" onclick="markStudentAtt(this, '${s.name}', 'Late')">L</button>
          <button type="button" class="btn btn-outline-danger" onclick="markStudentAtt(this, '${s.name}', 'Absent')">A</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function markStudentAtt(btn, name, status) {
  const group = btn.parentElement;
  group.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  window.NadwiUI.toast(`${name} marked as ${status}.`);
}

function renderHomeworkList() {
  const container = document.getElementById("teacherHomeworkList");
  if (!container) return;

  const defaultHw = [
    { id: "HW-101", subject: "Quranic Nazira & Tajweed", targetClass: "Class 4", dueDate: "2026-11-02", title: "Surah Al-Alaq First 5 Verses Tajweed", desc: "Practice recitation with proper Makharij and write 5 word meanings." },
    { id: "HW-102", subject: "Primary English", targetClass: "Class 3", dueDate: "2026-11-03", title: "Phonics & Noun Identification", desc: "Circle nouns in lesson 4 storybook and complete workbook exercise 2." }
  ];

  const customHw = JSON.parse(localStorage.getItem("NADWI_TEACHER_HW") || "[]");
  const allHw = [...customHw, ...defaultHw];

  container.innerHTML = allHw.map(h => `
    <div class="dash-card mb-3 p-3">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <span class="badge-nadwi badge-gold">${h.subject}</span>
        <small class="text-danger fw-bold"><i class="fa-solid fa-clock me-1"></i>Due: ${h.dueDate}</small>
      </div>
      <h6 class="fw-bold text-navy mb-1">${h.title}</h6>
      <p class="text-secondary small mb-2">${h.desc}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span class="badge-nadwi badge-blue">${h.targetClass}</span>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteHomework('${h.id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  `).join('');
}

function deleteHomework(id) {
  let customHw = JSON.parse(localStorage.getItem("NADWI_TEACHER_HW") || "[]");
  customHw = customHw.filter(h => h.id !== id);
  localStorage.setItem("NADWI_TEACHER_HW", JSON.stringify(customHw));
  renderHomeworkList();
  window.NadwiUI.toast("Homework assignment removed.");
}

function renderMarksEntryTable() {
  const tbody = document.getElementById("teacherMarksTableBody");
  if (!tbody) return;

  const students = window.NadwiData.getStudents().slice(0, 6);
  tbody.innerHTML = students.map((s, idx) => `
    <tr>
      <td>${s.rollNo}</td>
      <td><strong>${s.name}</strong></td>
      <td><input type="number" class="form-control form-control-sm text-center" value="${92 + (idx % 6)}" style="width: 70px;" onchange="recalcGrade(this)"></td>
      <td><input type="number" class="form-control form-control-sm text-center" value="${88 + (idx % 8)}" style="width: 70px;" onchange="recalcGrade(this)"></td>
      <td><input type="number" class="form-control form-control-sm text-center" value="${95 - (idx % 5)}" style="width: 70px;" onchange="recalcGrade(this)"></td>
      <td><span class="badge-nadwi badge-success">A+ (Pass)</span></td>
    </tr>
  `).join('');
}

function recalcGrade(input) {
  window.NadwiUI.toast("Marks updated for evaluation.");
}

