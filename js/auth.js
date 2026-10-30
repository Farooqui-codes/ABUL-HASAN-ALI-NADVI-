/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Authentication & Role Management (js/auth.js)
 */

const NADWI_DEMO_USERS = {
  admin: {
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
    name: "Dr. Muhammad Usman",
    title: "Chief Administrator & Principal",
    avatar: "../assets/avatars/male-admin.svg",
    dashboardUrl: "../dashboards/admin.html"
  },
  teacher: {
    email: "teacher@demo.com",
    password: "teacher123",
    role: "teacher",
    name: "Maulana Abdul Rahman",
    title: "Senior Faculty & Vice Principal",
    avatar: "../assets/avatars/male-teacher-1.svg",
    dashboardUrl: "../dashboards/teacher.html"
  },
  student: {
    email: "student@demo.com",
    password: "student123",
    role: "student",
    name: "Muhammad Abdullah",
    title: "Class 4 • Roll # 401",
    avatar: "../assets/avatars/male-student-1.svg",
    dashboardUrl: "../dashboards/student.html"
  },
  parent: {
    email: "parent@demo.com",
    password: "parent123",
    role: "parent",
    name: "Ibrahim Khan",
    title: "Guardian of M. Abdullah (Class 4) & M. Hamza (Class 2)",
    avatar: "../assets/avatars/male-parent.svg",
    dashboardUrl: "../dashboards/parent.html"
  }
};

class NadwiAuth {
  constructor() {
    this.SESSION_KEY = "NADWI_CURRENT_USER";
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem(this.SESSION_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  }

  login(email, password, selectedRole) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanEmail = email.trim().toLowerCase();
        const roleData = NADWI_DEMO_USERS[selectedRole];

        if (!roleData) {
          reject({ message: "Invalid role selected. Please choose Admin, Teacher, Student, or Parent." });
          return;
        }

        if (cleanEmail === roleData.email && password === roleData.password) {
          const userSession = {
            email: roleData.email,
            role: roleData.role,
            name: roleData.name,
            title: roleData.title,
            avatar: roleData.avatar,
            loginTime: new Date().toISOString()
          };
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(userSession));
          resolve(roleData);
        } else {
          reject({ message: `Invalid credentials for ${selectedRole.toUpperCase()}. Expected email: ${roleData.email} and password: ${roleData.password}` });
        }
      }, 500); // realistic feel
    });
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    // Redirect to login page
    window.location.href = "../pages/login.html";
  }

  checkAuth(requiredRole) {
    const user = this.getCurrentUser();
    if (!user) {
      // Not logged in -> redirect to login page
      window.location.href = "../pages/login.html?redirect=" + encodeURIComponent(window.location.pathname);
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Role mismatch -> redirect to own dashboard
      const correctDashboard = NADWI_DEMO_USERS[user.role]?.dashboardUrl || "../pages/login.html";
      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: 'warning',
          title: 'Access Restricted',
          text: `You are logged in as a ${user.role.toUpperCase()}. Redirecting to your assigned dashboard...`,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = correctDashboard;
        });
      } else {
        window.location.href = correctDashboard;
      }
      return false;
    }

    return true;
  }

  // Pre-fill credentials helper for demo presentation
  fillDemoCredentials(role) {
    const cred = NADWI_DEMO_USERS[role];
    if (cred) {
      const emailInput = document.getElementById("loginEmail");
      const passwordInput = document.getElementById("loginPassword");
      const roleSelect = document.getElementById("loginRole");
      if (emailInput) emailInput.value = cred.email;
      if (passwordInput) passwordInput.value = cred.password;
      if (roleSelect) roleSelect.value = cred.role;
    }
  }
}

// Global Singleton Instance
window.NadwiAuth = new NadwiAuth();

