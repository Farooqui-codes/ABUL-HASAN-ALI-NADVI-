/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Public Website Scripts (js/main.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render Dynamic Notices on Homepage & Public Pages if notice container exists
  renderPublicNotices();

  // Admission Form Submission Handler
  const admissionForm = document.getElementById("publicAdmissionForm");
  if (admissionForm) {
    admissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const applicantName = document.getElementById("applicantName")?.value || "Student Applicant";
      const appliedGrade = document.getElementById("appliedGrade")?.value || "Grade 1";

      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: 'success',
          title: 'Admission Application Received',
          html: `<p>Jazakallahu Khair! The application for <strong>${applicantName}</strong> (Male) for <strong>${appliedGrade}</strong> has been recorded in the demo system.</p>
                 <p class="text-muted small">Application Token: #ADM-${Math.floor(1000 + Math.random() * 9000)} (Demo Mode)</p>`,
          confirmButtonColor: '#064E3B'
        });
      } else {
        alert("Application submitted successfully for " + applicantName);
      }
      admissionForm.reset();
    });
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById("publicContactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent (Demo)',
          text: 'Thank you for contacting Jamia Abul Hasan Ali Nadwi. Our administrative office will get back to you shortly.',
          confirmButtonColor: '#064E3B'
        });
      } else {
        alert("Thank you! Your message has been sent.");
      }
      contactForm.reset();
    });
  }
});

function renderPublicNotices() {
  const container = document.getElementById("publicNoticesList");
  if (!container || !window.NadwiData) return;

  const notices = window.NadwiData.getNotices();
  container.innerHTML = notices.map(item => `
    <div class="col-md-4 mb-4">
      <div class="feature-card">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge-nadwi badge-gold">${item.category}</span>
          <small class="text-muted"><i class="fa-solid fa-calendar-days me-1"></i>${item.date}</small>
        </div>
        <h5 class="feature-title mb-2">${item.title}</h5>
        <p class="feature-desc">${item.content}</p>
        <div class="mt-auto">
          <span class="badge-nadwi badge-emerald"><i class="fa-solid fa-users me-1"></i>${item.audience}</span>
        </div>
      </div>
    </div>
  `).join('');
}

