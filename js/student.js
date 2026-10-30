/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Student Controller (js/student.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check Student Role Guard
  if (window.NadwiAuth && !window.NadwiAuth.checkAuth("student")) {
    return;
  }

  initStudentDashboard();
});

let currentQuizIndex = 0;
let userQuizScore = 0;

function initStudentDashboard() {
  setupStudentModuleNavigation();
  renderStudentTimetable();
  initStudentQuiz();
  renderStudentReportCard();
  renderStudentIdCardView();

  // Homework Submission
  const hwSubmitForm = document.getElementById("studentAssignmentForm");
  if (hwSubmitForm) {
    hwSubmitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: 'success',
        title: 'Assignment Submitted!',
        text: 'Your Tafseer commentary assignment has been submitted to Maulana Abdul Rahman for grading.',
        confirmButtonColor: '#2563EB'
      });
      hwSubmitForm.reset();
      const statusBadge = document.getElementById("hwStatusBadge1");
      if (statusBadge) {
        statusBadge.className = "badge-nadwi badge-success";
        statusBadge.textContent = "Submitted for Review";
      }
    });
  }

  // Student Leave Request
  const leaveForm = document.getElementById("studentLeaveForm");
  if (leaveForm) {
    leaveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: 'success',
        title: 'Leave Application Dispatched',
        text: 'Your leave application has been sent to your Class Teacher In-charge.',
        confirmButtonColor: '#142B4A'
      });
      leaveForm.reset();
    });
  }

  // Student Chart
  if (window.NadwiCharts) {
    setTimeout(() => {
      window.NadwiCharts.initStudentPerformanceChart("studentMarksCanvas");
    }, 200);
  }
}

function setupStudentModuleNavigation() {
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

      const crumb = document.getElementById("studentBreadcrumbCurrent");
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

function renderStudentTimetable() {
  const tbody = document.getElementById("studentTodayTimetable");
  if (!tbody) return;

  const routine = [
    { period: "Period 1", time: "08:30 - 09:20", subject: "Quranic Tafseer (Surah Al-Hujurat)", teacher: "Maulana Abdul Rahman", room: "Room 101" },
    { period: "Period 2", time: "09:20 - 10:10", subject: "Physics (Thermodynamics)", teacher: "Bilal Ahmad", room: "Lab A" },
    { period: "Period 3", time: "10:10 - 11:00", subject: "Mathematics (Algebra & Trigonometry)", teacher: "Umar Farooq", room: "Room 101" },
    { period: "Period 4", time: "11:20 - 12:10", subject: "Advanced Arabic Grammar (Nahw)", teacher: "Tariq Jameel Nadwi", room: "Room 101" },
    { period: "Period 5", time: "12:10 - 01:00", subject: "English Literature", teacher: "Zaid Hashmi", room: "Room 101" }
  ];

  tbody.innerHTML = routine.map(r => `
    <tr>
      <td><span class="badge-nadwi badge-blue">${r.period}</span></td>
      <td><strong>${r.time}</strong></td>
      <td><strong>${r.subject}</strong></td>
      <td>${r.teacher}</td>
      <td><span class="badge-nadwi badge-gold">${r.room}</span></td>
    </tr>
  `).join('');
}

// Interactive Quiz System
function initStudentQuiz() {
  const questions = window.NadwiData.getQuiz();
  currentQuizIndex = 0;
  userQuizScore = 0;
  loadQuizQuestion(0);
}

function loadQuizQuestion(index) {
  const questions = window.NadwiData.getQuiz();
  const qContainer = document.getElementById("quizQuestionArea");
  if (!qContainer) return;

  if (index >= questions.length) {
    // Quiz finished
    qContainer.innerHTML = `
      <div class="text-center py-4">
        <i class="fa-solid fa-trophy text-gold display-3 mb-3 d-block"></i>
        <h4 class="fw-bold text-navy">MashaAllah! Quiz Completed</h4>
        <p class="fs-5 text-secondary">Your Score: <strong class="text-primary">${userQuizScore}</strong> out of ${questions.length}</p>
        <button class="btn-nadwi btn-nadwi-primary mt-3" onclick="initStudentQuiz()">
          <i class="fa-solid fa-arrows-rotate me-1"></i> Retake Quiz
        </button>
      </div>
    `;
    return;
  }

  const q = questions[index];
  qContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <span class="badge-nadwi badge-gold">Question ${index + 1} of ${questions.length}</span>
      <span class="small text-muted"><i class="fa-solid fa-clock me-1"></i>Islamic &amp; General Knowledge</span>
    </div>
    <h5 class="fw-bold text-navy mb-4">${q.question}</h5>
    <div class="quiz-options-group">
      ${q.options.map((opt, optIdx) => `
        <div class="quiz-option-label" onclick="submitQuizAnswer(${optIdx}, ${q.answer})">
          <span class="badge-nadwi badge-navy py-1 px-2">${String.fromCharCode(65 + optIdx)}</span>
          <span class="ms-2">${opt}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function submitQuizAnswer(selectedIdx, correctIdx) {
  const questions = window.NadwiData.getQuiz();
  const q = questions[currentQuizIndex];
  const isCorrect = (selectedIdx === correctIdx);

  if (isCorrect) userQuizScore++;

  Swal.fire({
    icon: isCorrect ? 'success' : 'error',
    title: isCorrect ? 'Correct! MashaAllah' : 'Incorrect',
    text: q.explanation,
    confirmButtonColor: '#2563EB',
    confirmButtonText: 'Next Question'
  }).then(() => {
    currentQuizIndex++;
    loadQuizQuestion(currentQuizIndex);
  });
}

function renderStudentReportCard() {
  const container = document.getElementById("studentReportCardBox");
  if (!container) return;

  container.innerHTML = `
    <div class="certificate-container" id="printableReportCardElement">
      <div class="certificate-inner-border">
        <div class="text-center mb-2">
          <img src="../assets/logo/official-logo.png" alt="Logo" width="70" height="70" class="rounded-circle p-1 border">
        </div>
        <div class="cert-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div class="cert-school-name-en">JAMIA ABUL HASAN ALI NADWI</div>
        <div class="cert-school-name-ur">جامعہ ابوالحسن علی ندوی (ربانی فاؤنڈیشن مارول)</div>
        
        <div class="cert-title-badge">
          <span class="cert-title-text">MID-TERM PRIMARY REPORT CARD</span>
        </div>

        <div class="row my-3 small">
          <div class="col-6">
            <div><strong>Student Name:</strong> Muhammad Abdullah</div>
            <div><strong>Father Name:</strong> Ibrahim Khan</div>
            <div><strong>Class &amp; Roll:</strong> Class 4 (Roll 401)</div>
          </div>
          <div class="col-6 text-end">
            <div><strong>Student ID:</strong> S-1001</div>
            <div><strong>Academic Session:</strong> 2026–2027</div>
            <div><strong>Attendance:</strong> 96.2%</div>
          </div>
        </div>

        <div class="table-responsive-nadwi my-3">
          <table class="table-nadwi">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Max Marks</th>
                <th>Marks Obtained</th>
                <th>Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Quranic Nazira &amp; Tajweed</td><td>100</td><td><strong>98</strong></td><td><span class="badge-nadwi badge-success">A+</span></td><td>Fluent Recitation with Tajweed</td></tr>
              <tr><td>Daily Masnoon Duas &amp; Deeniyat</td><td>100</td><td><strong>96</strong></td><td><span class="badge-nadwi badge-success">A+</span></td><td>Excellent Memorization</td></tr>
              <tr><td>Basic Arabic &amp; Vocabulary</td><td>100</td><td><strong>94</strong></td><td><span class="badge-nadwi badge-success">A+</span></td><td>Good Word Recognition</td></tr>
              <tr><td>Primary Mathematics</td><td>100</td><td><strong>92</strong></td><td><span class="badge-nadwi badge-success">A+</span></td><td>Quick Mental Math</td></tr>
              <tr><td>Environmental Studies (EVS)</td><td>100</td><td><strong>89</strong></td><td><span class="badge-nadwi badge-blue">A</span></td><td>Active in Nature Projects</td></tr>
              <tr><td>English Language &amp; Phonics</td><td>100</td><td><strong>91</strong></td><td><span class="badge-nadwi badge-success">A+</span></td><td>Strong Reading &amp; Spelling</td></tr>
              <tr><td>Urdu Adab &amp; Writing</td><td>100</td><td><strong>95</strong></td><td><span class="badge-nadwi badge-success">A+</span></td><td>Neat Handwriting</td></tr>
            </tbody>
            <tfoot>
              <tr class="fw-bold bg-light">
                <td>Total Aggregate:</td>
                <td>700</td>
                <td>655 (93.6%)</td>
                <td colspan="2"><span class="badge-nadwi badge-gold fs-6">Position: 1st in Class 4</span></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="cert-signatures mt-4">
          <div class="cert-signature-box">
            <div class="cert-sig-line"></div>
            <strong>Class Teacher In-charge</strong>
          </div>
          <div class="cert-signature-box">
            <div class="cert-sig-line"></div>
            <strong>Headmaster / Director</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStudentIdCardView() {
  const container = document.getElementById("studentIdCardViewBox");
  if (!container) return;

  container.innerHTML = `
    <div class="id-card-preview-wrap" id="studentMyIdCardElement">
      <div class="id-card-header" style="background: linear-gradient(135deg, #064E3B, #0F5132);">
        <img src="../assets/logo/official-logo.png" alt="Logo" width="40" height="40" class="rounded-circle bg-white p-1 mb-1">
        <h5>JAMIA ABUL HASAN ALI NADWI</h5>
        <p>جامعہ ابوالحسن علی ندوی (ربانی فاؤنڈیشن مارول)</p>
      </div>
      <div class="id-card-body">
        <img src="../assets/avatars/male-student-1.svg" alt="Muhammad Abdullah" class="id-card-avatar">
        <div class="id-card-name">Muhammad Abdullah</div>
        <div class="id-card-role">Primary Student (Class 4)</div>

        <table class="id-card-details-table">
          <tr><td>ID Number:</td><td class="fw-bold">S-1001</td></tr>
          <tr><td>Roll Number:</td><td><strong>401</strong></td></tr>
          <tr><td>Father Name:</td><td>Ibrahim Khan</td></tr>
          <tr><td>Blood Group:</td><td><span class="badge-nadwi badge-danger py-0 px-2">B+</span></td></tr>
          <tr><td>Emergency:</td><td>0321-5550001</td></tr>
        </table>

        <div class="mt-auto w-100 text-center">
          <i class="fa-solid fa-qrcode text-dark" style="font-size: 2rem;"></i>
        </div>
      </div>
      <div class="id-card-footer">
        Session 2026–27 • Valid Identity Card
      </div>
    </div>
  `;
}

