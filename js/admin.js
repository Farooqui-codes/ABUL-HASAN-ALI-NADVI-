/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Administrator Controller (js/admin.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check Admin Role Guard
  if (window.NadwiAuth && !window.NadwiAuth.checkAuth("admin")) {
    return;
  }

  initAdminDashboard();
});

function initAdminDashboard() {
  // Render Overview Data & Charts
  renderAdminOverview();
  renderStudentTable();
  renderTeacherTable();
  renderClassTable();
  renderFeeTable();
  renderLibraryTable();
  renderTransportTable();
  renderAdminNotices();

  // Setup Module Tab Switching
  setupModuleNavigation();

  // Setup Chart Visualizations
  if (window.NadwiCharts) {
    setTimeout(() => {
      window.NadwiCharts.initAdminAttendanceChart("adminAttendanceCanvas");
      window.NadwiCharts.initAdminFeeChart("adminFeeCanvas");
      window.NadwiCharts.initStudentDistributionChart("adminStudentDistCanvas");
    }, 200);
  }

  // Bind Form Submissions
  bindStudentForm();
  bindTeacherForm();
  bindNoticeForm();
  bindAttendanceActions();
}

function setupModuleNavigation() {
  const links = document.querySelectorAll(".sidebar-nav-link[data-module]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModule = link.getAttribute("data-module");

      // Update active nav link
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Update module sections
      document.querySelectorAll(".erp-module-section").forEach(sec => {
        sec.classList.remove("active");
      });

      const activeSec = document.getElementById("mod-" + targetModule);
      if (activeSec) {
        activeSec.classList.add("active");
      }

      // Update breadcrumb
      const crumb = document.getElementById("adminBreadcrumbCurrent");
      if (crumb) {
        crumb.textContent = link.querySelector(".nav-label")?.textContent || targetModule;
      }

      // If mobile sidebar open, close it
      const sidebar = document.getElementById("dashboardSidebar");
      if (sidebar && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
      }
    });
  });
}

function renderAdminOverview() {
  const students = window.NadwiData.getStudents();
  const teachers = window.NadwiData.getTeachers();
  const fees = window.NadwiData.getFees();

  const totalStudentsEl = document.getElementById("totalStudentsCount");
  if (totalStudentsEl) totalStudentsEl.textContent = students.length * 70; // Scaled demo display

  const totalTeachersEl = document.getElementById("totalTeachersCount");
  if (totalTeachersEl) totalTeachersEl.textContent = teachers.length + 37;

  // Calculate fee sums
  let totalPaid = 0;
  let totalPending = 0;
  fees.forEach(f => {
    if (f.status === "Paid") totalPaid += f.amount;
    else totalPending += f.amount;
  });

  const paidEl = document.getElementById("totalFeeCollected");
  if (paidEl) paidEl.textContent = "₹" + (totalPaid + 320000).toLocaleString();

  const pendingEl = document.getElementById("totalFeePending");
  if (pendingEl) pendingEl.textContent = "₹" + (totalPending + 45000).toLocaleString();
}

// ==========================================
// 1. STUDENT MANAGEMENT
// ==========================================
function renderStudentTable(filteredStudents = null) {
  const tbody = document.getElementById("adminStudentTableBody");
  if (!tbody) return;

  const students = filteredStudents || window.NadwiData.getStudents();
  
  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No student records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><strong>${s.id}</strong></td>
      <td>
        <div class="table-avatar-cell">
          <img src="${s.avatar}" alt="${s.name}" class="table-avatar-img">
          <div>
            <div class="table-user-name">${s.name}</div>
            <div class="table-user-sub">Roll No: ${s.rollNo}</div>
          </div>
        </div>
      </td>
      <td><span class="badge-nadwi badge-blue">${s.class} (${s.section})</span></td>
      <td>${s.guardianName}</td>
      <td>${s.phone}</td>
      <td>
        <span class="badge-nadwi ${s.feesStatus === 'Paid' ? 'badge-success' : 'badge-danger'}">
          ${s.feesStatus}
        </span>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="action-btn" title="View ID Card" onclick="viewStudentIdCard('${s.id}')">
            <i class="fa-solid fa-id-badge"></i>
          </button>
          <button class="action-btn print" title="Generate Certificate" onclick="viewBonafideCertificate('${s.id}')">
            <i class="fa-solid fa-award"></i>
          </button>
          <button class="action-btn delete" title="Delete Student" onclick="deleteStudentPrompt('${s.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterStudents() {
  const query = document.getElementById("studentSearchInput")?.value.toLowerCase() || "";
  const classFilter = document.getElementById("studentClassFilter")?.value || "";

  let list = window.NadwiData.getStudents();
  if (query) {
    list = list.filter(s => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query));
  }
  if (classFilter) {
    list = list.filter(s => s.class === classFilter);
  }
  renderStudentTable(list);
}

function bindStudentForm() {
  const form = document.getElementById("addStudentModalForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("newStudentName").value.trim();
    const studentClass = document.getElementById("newStudentClass").value;
    const guardian = document.getElementById("newStudentGuardian").value.trim();
    const phone = document.getElementById("newStudentPhone").value.trim();
    const rollNo = document.getElementById("newStudentRoll").value.trim() || Math.floor(100 + Math.random() * 900);

    const newStudent = {
      name,
      class: studentClass,
      section: "A",
      guardianName: guardian + " (Father)",
      phone,
      rollNo,
      feesStatus: "Paid",
      attendancePercent: 95
    };

    window.NadwiData.addStudent(newStudent);
    renderStudentTable();
    renderAdminOverview();

    // Close modal
    const modalEl = document.getElementById('addStudentModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    form.reset();

    window.NadwiUI.toast(`Student ${name} successfully enrolled (Demo).`);
  });
}

function deleteStudentPrompt(id) {
  Swal.fire({
    title: 'Delete Student Record?',
    text: `Are you sure you want to remove student ${id}? This action will update demo storage.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#64748B',
    confirmButtonText: 'Yes, Delete'
  }).then((result) => {
    if (result.isConfirmed) {
      window.NadwiData.deleteStudent(id);
      renderStudentTable();
      renderAdminOverview();
      window.NadwiUI.toast(`Student ${id} deleted.`);
    }
  });
}

// ==========================================
// 2. TEACHER MANAGEMENT
// ==========================================
function renderTeacherTable() {
  const tbody = document.getElementById("adminTeacherTableBody");
  if (!tbody) return;

  const teachers = window.NadwiData.getTeachers();
  tbody.innerHTML = teachers.map(t => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>
        <div class="table-avatar-cell">
          <img src="${t.avatar}" alt="${t.name}" class="table-avatar-img">
          <div>
            <div class="table-user-name">${t.name}</div>
            <div class="table-user-sub">${t.designation}</div>
          </div>
        </div>
      </td>
      <td><span class="badge-nadwi badge-gold">${t.subject}</span></td>
      <td>${t.qualification}</td>
      <td>${t.experience}</td>
      <td><span class="badge-nadwi badge-success">${t.status}</span></td>
      <td>
        <div class="action-btn-group">
          <button class="action-btn delete" title="Remove Faculty" onclick="deleteTeacherPrompt('${t.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function bindTeacherForm() {
  const form = document.getElementById("addTeacherModalForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("newTeacherName").value.trim();
    const designation = document.getElementById("newTeacherDesignation").value.trim();
    const subject = document.getElementById("newTeacherSubject").value.trim();
    const qualification = document.getElementById("newTeacherQual").value.trim();
    const experience = document.getElementById("newTeacherExp").value.trim();

    const newTeacher = {
      name,
      designation,
      subject,
      qualification,
      experience,
      phone: "0300-8880001",
      email: name.toLowerCase().replace(/[^a-z]/g, '') + "@demo.com"
    };

    window.NadwiData.addTeacher(newTeacher);
    renderTeacherTable();

    const modalEl = document.getElementById('addTeacherModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    form.reset();

    window.NadwiUI.toast(`Teacher ${name} added to faculty.`);
  });
}

function deleteTeacherPrompt(id) {
  Swal.fire({
    title: 'Remove Faculty Member?',
    text: `Are you sure you want to remove teacher ${id}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#64748B',
    confirmButtonText: 'Yes, Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      window.NadwiData.deleteTeacher(id);
      renderTeacherTable();
      window.NadwiUI.toast(`Teacher ${id} removed.`);
    }
  });
}

// ==========================================
// 3. CLASS MANAGEMENT
// ==========================================
function renderClassTable() {
  const tbody = document.getElementById("adminClassTableBody");
  if (!tbody) return;

  const classes = window.NadwiData.load().classes;
  tbody.innerHTML = classes.map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td><span class="badge-nadwi badge-blue fs-6">${c.name}</span></td>
      <td>${c.incharge}</td>
      <td><strong>${c.studentsCount}</strong> Students</td>
      <td>${c.roomNo}</td>
      <td>
        <span class="badge-nadwi badge-success">Active Session</span>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// 4. FEE MANAGEMENT & RECEIPT GENERATOR
// ==========================================
function renderFeeTable() {
  const tbody = document.getElementById("adminFeeTableBody");
  if (!tbody) return;

  const fees = window.NadwiData.getFees();
  tbody.innerHTML = fees.map(f => `
    <tr>
      <td><span class="font-monospace fw-bold">${f.receiptNo}</span></td>
      <td>
        <strong>${f.studentName}</strong>
        <div class="text-muted small">${f.class} • ${f.studentId}</div>
      </td>
      <td>${f.feeType}</td>
      <td><strong>₹${f.amount.toLocaleString()}</strong></td>
      <td>${f.date}</td>
      <td>
        <span class="badge-nadwi ${f.status === 'Paid' ? 'badge-success' : 'badge-danger'}">
          ${f.status}
        </span>
      </td>
      <td>
        <button class="btn-nadwi btn-nadwi-outline btn-nadwi-sm" onclick="previewOfficialReceipt('${f.receiptNo}')">
          <i class="fa-solid fa-receipt"></i> Print Receipt
        </button>
      </td>
    </tr>
  `).join('');
}

function previewOfficialReceipt(receiptNo) {
  const fees = window.NadwiData.getFees();
  const fee = fees.find(f => f.receiptNo === receiptNo) || fees[0];

  const container = document.getElementById("receiptModalContent");
  if (!container) return;

  container.innerHTML = `
    <div class="receipt-container" id="printableReceiptBox">
      <div class="receipt-header">
        <div class="d-flex align-items-center gap-3">
          <img src="../assets/logo/official-logo.png" alt="Logo" width="55" height="55" class="rounded-circle border p-1">
          <div>
            <h4 class="fw-bold text-navy mb-0">JAMIA ABUL HASAN ALI NADWI</h4>
            <div class="font-urdu text-gold fs-5">جامعہ ابوالحسن علی ندوی (ربانی فاؤنڈیشن مارول)</div>
            <small class="text-muted">Primary School Official Fee Voucher (Nursery to 4th)</small>
          </div>
        </div>
        <div class="text-end">
          <span class="receipt-badge">${fee.status.toUpperCase()}</span>
          <div class="font-monospace small mt-1">Receipt: ${fee.receiptNo}</div>
          <div class="small text-muted">Date: ${fee.date}</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <div class="small text-muted">Student Details:</div>
          <div class="fw-bold fs-6 text-navy">${fee.studentName}</div>
          <div class="small text-secondary">Student ID: ${fee.studentId} | Class: ${fee.class}</div>
        </div>
        <div class="col-6 text-end">
          <div class="small text-muted">Payment Mode:</div>
          <div class="fw-bold">${fee.paymentMethod || 'Online Bank Portal'}</div>
          <div class="small text-secondary">Authorized Cashier: Office Accounts</div>
        </div>
      </div>

      <div class="receipt-row">
        <span>Tuition &amp; Educational Instruction Fee</span>
        <span>₹${(fee.amount * 0.75).toFixed(0)}</span>
      </div>
      <div class="receipt-row">
        <span>Campus Library &amp; Laboratory Resource Access</span>
        <span>₹${(fee.amount * 0.15).toFixed(0)}</span>
      </div>
      <div class="receipt-row">
        <span>Examination &amp; Student Tarbiyah Activities</span>
        <span>₹${(fee.amount * 0.10).toFixed(0)}</span>
      </div>

      <div class="receipt-total">
        <span>Total Net Paid:</span>
        <span class="text-primary">₹${fee.amount.toLocaleString()}</span>
      </div>

      <div class="d-flex justify-content-between align-items-end mt-4 pt-4 border-top">
        <div class="small text-muted font-urdu">جزاکم اللہ خیرا واحسن الجزاء</div>
        <div class="text-center" style="width: 160px;">
          <div style="border-top: 1.5px solid #142B4A; padding-top: 4px;" class="small fw-bold">Authorized Signatory</div>
        </div>
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('receiptPreviewModal'));
  modal.show();
}

// ==========================================
// 5. BONAFIDE / CHARACTER CERTIFICATES
// ==========================================
function viewBonafideCertificate(studentId) {
  const students = window.NadwiData.getStudents();
  const s = students.find(st => st.id === studentId) || students[0];

  const container = document.getElementById("certificateModalContent");
  if (!container) return;

  container.innerHTML = `
    <div class="certificate-container" id="printableCertificateBox">
      <div class="cert-corner-ornament cert-top-left"></div>
      <div class="cert-corner-ornament cert-top-right"></div>
      <div class="cert-corner-ornament cert-bottom-left"></div>
      <div class="cert-corner-ornament cert-bottom-right"></div>

      <div class="certificate-inner-border">
        <div class="text-center mb-2">
          <img src="../assets/logo/official-logo.png" alt="Emblem" width="75" height="75" class="rounded-circle p-1 border">
        </div>
        <div class="cert-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div class="cert-school-name-en">JAMIA ABUL HASAN ALI NADWI</div>
        <div class="cert-school-name-ur">جامعہ ابوالحسن علی ندوی (ربانی فاؤنڈیشن مارول)</div>

        <div class="cert-title-badge">
          <span class="cert-title-text">BONAFIDE &amp; CHARACTER CERTIFICATE</span>
        </div>

        <div class="cert-body-text">
          This is to certify that Master <span class="cert-highlight">${s.name}</span>, Son of Mr. <span class="cert-highlight">${s.guardianName.replace(' (Father)','')}</span>, 
          bearing Roll Number <span class="cert-highlight">${s.rollNo}</span> and Registration ID <span class="cert-highlight">${s.id}</span>, 
          is a bonafide student of this primary institution studying in <span class="cert-highlight">${s.class}</span> for the academic session 2026–2027.
          <br><br>
          During his tenure at Jamia Abul Hasan Ali Nadwi (Rabbani Foundation Marul), he has maintained an exemplary attendance rate of <span class="cert-highlight">${s.attendancePercent}%</span>. 
          To the best of our knowledge, his moral conduct, obedience to faculty, enthusiasm for Noorani Qaida and foundational English/Math have been genuinely outstanding. We pray for his continued progress in sacred and academic fields of knowledge.
        </div>

        <div class="cert-signatures">
          <div class="cert-signature-box">
            <div class="cert-sig-line"></div>
            <strong>Class Teacher In-charge</strong>
          </div>
          <div class="cert-signature-box">
            <div class="text-gold fw-bold mb-1">Official Seal (Demo)</div>
            <div class="small text-muted">Rabbani Foundation Marul</div>
          </div>
          <div class="cert-signature-box">
            <div class="cert-sig-line"></div>
            <strong>Headmaster &amp; Director</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('certificatePreviewModal'));
  modal.show();
}

// ==========================================
// 6. STUDENT ID CARD GENERATOR
// ==========================================
function viewStudentIdCard(studentId) {
  const students = window.NadwiData.getStudents();
  const s = students.find(st => st.id === studentId) || students[0];

  const container = document.getElementById("idCardModalContent");
  if (!container) return;

  container.innerHTML = `
    <div class="id-card-preview-wrap" id="printableIdCardBox">
      <div class="id-card-header" style="background: linear-gradient(135deg, #064E3B, #0F5132);">
        <img src="../assets/logo/official-logo.png" alt="Logo" width="40" height="40" class="rounded-circle bg-white p-1 mb-1">
        <h5>JAMIA ABUL HASAN ALI NADWI</h5>
        <p>جامعہ ابوالحسن علی ندوی (ربانی فاؤنڈیشن مارول)</p>
      </div>

      <div class="id-card-body">
        <img src="${s.avatar}" alt="${s.name}" class="id-card-avatar">
        <div class="id-card-name">${s.name}</div>
        <div class="id-card-role">Primary Student (${s.class})</div>

        <table class="id-card-details-table">
          <tr>
            <td>Student ID:</td>
            <td class="fw-bold">${s.id}</td>
          </tr>
          <tr>
            <td>Class &amp; Roll:</td>
            <td><strong>${s.class}</strong> (Roll: ${s.rollNo})</td>
          </tr>
          <tr>
            <td>Father Name:</td>
            <td>${s.guardianName.replace(' (Father)','')}</td>
          </tr>
          <tr>
            <td>Blood Group:</td>
            <td><span class="badge-nadwi badge-danger py-0 px-2">${s.bloodGroup || 'B+'}</span></td>
          </tr>
          <tr>
            <td>Emergency Tel:</td>
            <td>${s.phone}</td>
          </tr>
        </table>

        <div class="mt-auto w-100 text-center">
          <div class="d-inline-block p-1 bg-light border rounded">
            <i class="fa-solid fa-qrcode text-dark" style="font-size: 2rem;"></i>
          </div>
        </div>
      </div>

      <div class="id-card-footer">
        Academic Session 2026–27 • Authorized School Identity Card
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('idCardPreviewModal'));
  modal.show();
}

// ==========================================
// 7. LIBRARY & TRANSPORT
// ==========================================
function renderLibraryTable() {
  const tbody = document.getElementById("adminLibraryTableBody");
  if (!tbody) return;

  const books = window.NadwiData.getBooks();
  tbody.innerHTML = books.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>
        <div class="fw-bold text-navy">${b.title}</div>
        <div class="text-muted small">Author: ${b.author}</div>
      </td>
      <td><span class="badge-nadwi badge-gold">${b.category}</span></td>
      <td>${b.rack}</td>
      <td><strong>${b.totalCopies}</strong> Copies</td>
      <td>
        <span class="badge-nadwi badge-success">${b.availableCopies} Available</span>
      </td>
    </tr>
  `).join('');
}

function renderTransportTable() {
  const tbody = document.getElementById("adminTransportTableBody");
  if (!tbody) return;

  const transports = window.NadwiData.getTransports();
  tbody.innerHTML = transports.map(t => `
    <tr>
      <td><strong>${t.routeId}</strong></td>
      <td><span class="fw-bold text-navy">${t.routeName}</span></td>
      <td>${t.driverName}</td>
      <td><span class="badge-nadwi badge-blue">${t.vehicleNo}</span></td>
      <td>${t.studentsEnrolled} / ${t.capacity}</td>
      <td>${t.contact}</td>
    </tr>
  `).join('');
}

// ==========================================
// 8. NOTICES
// ==========================================
function renderAdminNotices() {
  const container = document.getElementById("adminNoticesList");
  if (!container) return;

  const notices = window.NadwiData.getNotices();
  container.innerHTML = notices.map(n => `
    <div class="p-3 mb-3 border rounded bg-white">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <span class="badge-nadwi badge-gold">${n.category}</span>
        <small class="text-muted">${n.date}</small>
      </div>
      <h6 class="fw-bold text-navy mb-1">${n.title}</h6>
      <p class="text-secondary small mb-2">${n.content}</p>
      <span class="badge-nadwi badge-blue py-0 px-2">${n.audience}</span>
    </div>
  `).join('');
}

function bindNoticeForm() {
  const form = document.getElementById("addNoticeForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("noticeTitle").value.trim();
    const category = document.getElementById("noticeCategory").value;
    const audience = document.getElementById("noticeAudience").value;
    const content = document.getElementById("noticeContent").value.trim();

    const data = window.NadwiData.load();
    const newNotice = {
      id: "NOT-" + (100 + data.notices.length + 1),
      title,
      category,
      audience,
      content,
      date: new Date().toISOString().split('T')[0]
    };

    data.notices.unshift(newNotice);
    window.NadwiData.save(data);
    renderAdminNotices();

    form.reset();
    window.NadwiUI.toast("Notice broadcasted successfully.");
  });
}

function bindAttendanceActions() {
  const btn = document.getElementById("adminMarkAllPresentBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.NadwiUI.toast("All 42 students in selected class marked Present.");
    });
  }
}

// Factory Reset Demo Data
function resetDemoDataAction() {
  Swal.fire({
    title: 'Reset Demo Data?',
    text: 'This will restore all default male student profiles, fee collections, and faculty records.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2563EB',
    cancelButtonColor: '#64748B',
    confirmButtonText: 'Yes, Reset'
  }).then((result) => {
    if (result.isConfirmed) {
      window.NadwiData.reset();
      window.location.reload();
    }
  });
}

