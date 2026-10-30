/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Parent Controller (js/parent.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check Parent Role Guard
  if (window.NadwiAuth && !window.NadwiAuth.checkAuth("parent")) {
    return;
  }

  initParentDashboard();
});

const DEMO_CHILDREN = [
  {
    id: "S-1001",
    rollNo: "401",
    name: "Muhammad Abdullah",
    class: "Class 4 - Primary Wing",
    classTeacher: "Dr. Muhammad Usman",
    attendance: "96.2%",
    termRank: "1st in Class (93.4%)",
    hifzProgress: "Noorani Qaida & Juz 30",
    feeStatus: "Paid",
    avatar: "../assets/avatars/male-student-1.svg",
    transport: "Route 1 (Marul Central Van 01)"
  },
  {
    id: "S-1003",
    rollNo: "201",
    name: "Muhammad Hamza",
    class: "Class 2 - Primary Wing",
    classTeacher: "Umar Farooq",
    attendance: "90.5%",
    termRank: "3rd in Class (88.2%)",
    hifzProgress: "Noorani Qaida Completed",
    feeStatus: "Pending (₹1,600)",
    avatar: "../assets/avatars/male-student-1.svg",
    transport: "Route 1 (Marul Central Van 01)"
  }
];

let selectedChildIndex = 0;

function initParentDashboard() {
  setupParentModuleNavigation();
  renderSelectedChild();

  // Simulated Fee Payment Form
  const feePayForm = document.getElementById("parentFeePaymentForm");
  if (feePayForm) {
    feePayForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const child = DEMO_CHILDREN[selectedChildIndex];
      const amount = 3200;

      const newPayment = {
        studentId: child.id,
        studentName: child.name,
        class: child.class.split(' - ')[0],
        amount: amount,
        feeType: "Tuition & Lab Fee (Paid via Demo Card)",
        paymentMethod: "Credit Card Demo (Simulated)"
      };

      window.NadwiData.addFeePayment(newPayment);

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful (Demo)',
        html: `<p>Voucher payment of <strong>₹${amount.toLocaleString()}</strong> for <strong>${child.name}</strong> confirmed!</p>
               <p class="small text-muted">Receipt voucher generated in payment records.</p>`,
        confirmButtonColor: '#16A34A'
      });

      child.feeStatus = "Paid";
      renderSelectedChild();
      const modalEl = document.getElementById('payFeeModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    });
  }

  // Parent Leave Submission
  const parentLeaveForm = document.getElementById("parentLeaveRequestForm");
  if (parentLeaveForm) {
    parentLeaveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: 'success',
        title: 'Leave Note Received',
        text: 'The class teacher and attendance supervisor have been notified.',
        confirmButtonColor: '#2563EB'
      });
      parentLeaveForm.reset();
    });
  }

  // Teacher Message
  const chatForm = document.getElementById("parentChatForm");
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("parentChatInput").value;
      const history = document.getElementById("parentChatHistory");
      if (history) {
        history.insertAdjacentHTML("beforeend", `
          <div class="d-flex justify-content-end mb-3">
            <div class="p-3 rounded bg-primary text-white" style="max-width: 75%;">
              <div>${msg}</div>
              <small class="text-white-50 d-block text-end mt-1">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • Delivered</small>
            </div>
          </div>
        `);
        history.scrollTop = history.scrollHeight;
      }
      chatForm.reset();
      window.NadwiUI.toast("Message sent to class teacher.");
    });
  }
}

function setupParentModuleNavigation() {
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

      const crumb = document.getElementById("parentBreadcrumbCurrent");
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

function switchChildSelection(index) {
  selectedChildIndex = index;
  renderSelectedChild();
  window.NadwiUI.toast(`Switched child profile to: ${DEMO_CHILDREN[index].name}`);
}

function renderSelectedChild() {
  const child = DEMO_CHILDREN[selectedChildIndex];

  // Update switcher pills
  const pillsContainer = document.getElementById("childSwitcherPills");
  if (pillsContainer) {
    pillsContainer.innerHTML = DEMO_CHILDREN.map((c, i) => `
      <button type="button" class="btn btn-sm ${i === selectedChildIndex ? 'btn-primary' : 'btn-outline-secondary'}" onclick="switchChildSelection(${i})">
        <i class="fa-solid fa-user me-1"></i> ${c.name} (${c.class.split(' - ')[0]})
      </button>
    `).join('');
  }

  // Update Overview Elements
  const nameEl = document.getElementById("childActiveName");
  if (nameEl) nameEl.textContent = child.name;

  const classEl = document.getElementById("childActiveClass");
  if (classEl) classEl.textContent = `${child.class} • Roll #${child.rollNo} • ID: ${child.id}`;

  const attEl = document.getElementById("childActiveAttendance");
  if (attEl) attEl.textContent = child.attendance;

  const rankEl = document.getElementById("childActiveRank");
  if (rankEl) rankEl.textContent = child.termRank;

  const hifzEl = document.getElementById("childActiveHifz");
  if (hifzEl) hifzEl.textContent = child.hifzProgress;

  const feeBadge = document.getElementById("childActiveFeeBadge");
  if (feeBadge) {
    if (child.feeStatus === "Paid") {
      feeBadge.className = "badge-nadwi badge-success";
      feeBadge.textContent = "All Dues Cleared";
    } else {
      feeBadge.className = "badge-nadwi badge-danger";
      feeBadge.textContent = "Payment Due: ₹3,200";
    }
  }

  const transportEl = document.getElementById("childActiveTransport");
  if (transportEl) transportEl.textContent = child.transport;
}

