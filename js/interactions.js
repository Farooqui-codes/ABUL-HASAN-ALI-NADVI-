/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * UI Interactions, Theme Management, Printing & Toasts (js/interactions.js)
 */

class NadwiInteractions {
  constructor() {
    this.THEME_KEY = "NADWI_THEME_MODE";
    this.initTheme();
    this.bindGlobalEvents();
  }

  initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || "light";
    this.applyTheme(savedTheme);
  }

  applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (typeof Chart !== "undefined") {
        Chart.defaults.color = "#CBD5E1";
        Chart.defaults.borderColor = "#1E2E4A";
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (typeof Chart !== "undefined") {
        Chart.defaults.color = "#475569";
        Chart.defaults.borderColor = "#E2E8F0";
      }
    }
    localStorage.setItem(this.THEME_KEY, theme);

    // Update toggle icon and state
    this.updateThemeUI(theme);

    // Refresh charts if rendered
    if (window.NadwiCharts && window.NadwiCharts.chartInstances) {
      Object.values(window.NadwiCharts.chartInstances).forEach(chart => {
        if (chart && typeof chart.update === "function") {
          chart.update();
        }
      });
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    this.applyTheme(isDark ? "light" : "dark");
  }

  updateThemeUI(theme) {
    const themeIcon = document.getElementById("themeToggleIcon");
    if (themeIcon) {
      if (theme === "dark") {
        themeIcon.className = "fa-solid fa-sun";
      } else {
        themeIcon.className = "fa-solid fa-moon";
      }
    }
    const themeBtnLabel = document.getElementById("themeBtnLabel");
    if (themeBtnLabel) {
      themeBtnLabel.textContent = (theme === "dark") ? "Light" : "Dark";
    }
  }

  bindGlobalEvents() {
    document.addEventListener("DOMContentLoaded", () => {
      // Ensure Theme UI controls match active theme
      const currentTheme = localStorage.getItem(this.THEME_KEY) || "light";
      this.updateThemeUI(currentTheme);

      // Sidebar Collapse Toggle (Desktop)
      const collapseBtn = document.getElementById("sidebarCollapseBtn");
      const sidebar = document.getElementById("dashboardSidebar");
      if (collapseBtn && sidebar) {
        collapseBtn.addEventListener("click", () => {
          sidebar.classList.toggle("collapsed");
        });
      }

      // Mobile Menu Toggle
      const mobileToggle = document.getElementById("mobileMenuToggle");
      if (mobileToggle && sidebar) {
        mobileToggle.addEventListener("click", () => {
          sidebar.classList.toggle("mobile-open");
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener("click", (e) => {
          if (sidebar.classList.contains("mobile-open") &&
              !sidebar.contains(e.target) &&
              !mobileToggle.contains(e.target)) {
            sidebar.classList.remove("mobile-open");
          }
        });
      }

      // Animated counters
      this.initCounters();

      // Floating Scroll-To-Top Up Arrow Button
      this.initScrollToTop();

      // Progressive Web App (PWA) Desktop/Mobile Install
      this.initPWA();
    });
  }

  // Floating Back to Top (Up Arrow) in Right Corner
  initScrollToTop() {
    let btn = document.getElementById("scrollToTopBtn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "scrollToTopBtn";
      btn.className = "scroll-to-top-btn";
      btn.setAttribute("title", "Scroll to top / اوپر جائیں");
      btn.setAttribute("aria-label", "Scroll to top");
      btn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
      document.body.appendChild(btn);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 280) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Progressive Web App (PWA) & Desktop App Installation
  initPWA() {
    if ('serviceWorker' in navigator) {
      const isSubDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/dashboards/');
      const swPath = isSubDir ? '../sw.js' : 'sw.js';
      navigator.serviceWorker.register(swPath).then((reg) => {
        reg.update();
      }).catch(err => {
        // Service worker silent catch
      });

      // Clear any legacy caches to always serve fresh UI
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach(key => {
            if (key !== 'nadwi-erp-v4') caches.delete(key);
          });
        });
      }
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      const installBtns = document.querySelectorAll('.pwa-install-btn, #pwaInstallBtn');
      installBtns.forEach(b => b.classList.add('available'));
    });

    window.installPWA = () => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            this.toast('Jazakallahu Khair! Jamia Nadwi App installed to your device.');
          }
          this.deferredPrompt = null;
        });
      } else {
        // Professional fallback installation guidance modal
        if (typeof Swal !== "undefined") {
          Swal.fire({
            title: 'Install Jamia Nadwi ERP App',
            html: `
              <div class="text-start p-2">
                <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <img src="${window.location.pathname.includes('/pages/') || window.location.pathname.includes('/dashboards/') ? '../assets/logo/official-logo.png' : 'assets/logo/official-logo.png'}" width="56" height="56" class="rounded-circle shadow-sm">
                  <div>
                    <h6 class="fw-bold mb-0">JAMIA ABUL HASAN ALI NADWI</h6>
                    <small class="text-muted">Desktop &amp; Mobile Web App (PWA)</small>
                  </div>
                </div>
                <p class="small mb-2"><strong>How to install on your Computer:</strong></p>
                <ol class="small text-secondary ps-3 mb-3">
                  <li>In Google Chrome or Microsoft Edge, look at the top address bar on the right.</li>
                  <li>Click the <strong>Install / App icon</strong> (<i class="fa-solid fa-laptop-arrow-down text-warning"></i>) or open Browser Menu (3 dots) &rarr; <strong>Install Jamia Nadwi ERP</strong>.</li>
                  <li>Click <strong>Install</strong> to get a standalone desktop window and Desktop shortcut!</li>
                </ol>
                <div class="alert alert-info py-2 small mb-0">
                  <i class="fa-solid fa-circle-check text-success me-1"></i> Fast launch, standalone window &amp; offline ready.
                </div>
              </div>
            `,
            confirmButtonText: 'Got It!',
            confirmButtonColor: '#0F5132'
          });
        } else {
          alert("To install as a Desktop App: Click the Install App icon on your browser's address bar or menu.");
        }
      }
    };
  }

  initCounters() {
    const counters = document.querySelectorAll(".counter-value");
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target") || 0;
      let count = 0;
      const speed = Math.max(10, Math.floor(target / 40));
      const update = () => {
        count += speed;
        if (count < target) {
          counter.innerText = count.toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      update();
    });
  }

  // Toast Notification wrapper
  toast(message, type = "success") {
    if (typeof Swal !== "undefined") {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: type,
        title: message
      });
    } else {
      alert(message);
    }
  }

  // Print helper for specific element container (Receipts, ID Cards, Certificates)
  printElement(elementId, title = "School Document") {
    const el = document.getElementById(elementId);
    if (!el) return;

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${document.documentElement.lang}" dir="${document.documentElement.dir}">
      <head>
        <title>${title} — Syed Abul Hasan Ali Nadwi School</title>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/components.css">
        <style>
          body { background: #FFFFFF !important; padding: 20px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          ${el.innerHTML}
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
}

// Global Singleton Instance
window.NadwiUI = new NadwiInteractions();

