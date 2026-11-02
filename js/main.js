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
  container.innerHTML = notices.map((item, idx) => {
    const catClass = (item.category || '').toLowerCase();
    const catIcon = catClass.includes('admission') ? 'fa-graduation-cap' :
                    catClass.includes('event') ? 'fa-trophy' : 'fa-book-open';

    let displayDate = item.date;
    try {
      const d = new Date(item.date);
      if (!isNaN(d.getTime())) {
        displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } catch(e) {}

    return `
      <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="${idx * 100}">
        <div class="announcement-card">
          <div class="announcement-meta-top">
            <span class="announcement-category-badge ${catClass}">
              <i class="fa-solid ${catIcon} me-1"></i>${item.category}
            </span>
            <span class="announcement-date">
              <i class="fa-regular fa-calendar-check"></i> ${displayDate}
            </span>
          </div>
          <h4 class="announcement-title">${item.title}</h4>
          <p class="announcement-desc">${item.content}</p>
          <div class="announcement-footer">
            <span class="announcement-audience">
              <i class="fa-solid fa-users me-1"></i>${item.audience}
            </span>
            <a href="pages/events.html" class="announcement-read-link">
              <span>View Notice</span>
              <i class="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

