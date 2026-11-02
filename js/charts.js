/**
 * SYED ABUL HASAN ALI NADWI — PREMIUM ISLAMIC SCHOOL ERP
 * Chart.js Visualizations (js/charts.js)
 */

class NadwiCharts {
  constructor() {
    this.chartInstances = {};
  }

  // Admin: Student Attendance Chart (Weekly line)
  initAdminAttendanceChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.chartInstances[canvasId]) {
      this.chartInstances[canvasId].destroy();
    }

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Present Students (%)',
            data: [96.5, 95.2, 98.1, 94.8, 97.4, 95.0],
            borderColor: '#064E3B',
            backgroundColor: 'rgba(6, 78, 59, 0.12)',
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#064E3B',
            pointRadius: 4
          },
          {
            label: 'Target Baseline',
            data: [95, 95, 95, 95, 95, 95],
            borderColor: '#D6A84F',
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: { min: 85, max: 100 }
        }
      }
    });
  }

  // Admin: Monthly Fee Collection (Bar)
  initAdminFeeChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.chartInstances[canvasId]) {
      this.chartInstances[canvasId].destroy();
    }

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [
          {
            label: 'Collected (₹/Demo)',
            data: [280000, 310000, 295000, 340000, 325000, 180000],
            backgroundColor: '#064E3B',
            borderRadius: 6
          },
          {
            label: 'Pending (₹/Demo)',
            data: [25000, 30000, 20000, 35000, 45000, 90000],
            backgroundColor: '#D6A84F',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  // Admin: Student Distribution by Grade (Doughnut)
  initStudentDistributionChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.chartInstances[canvasId]) {
      this.chartInstances[canvasId].destroy();
    }

    // Use verified class distribution from NadwiData if available
    let dataValues = [60, 30, 69, 74];
    if (window.NadwiData) {
      const cls = window.NadwiData.getClasses();
      const nurLkg = cls.filter(c => c.name.includes('Nursery') || c.name.includes('LKG')).reduce((s, c) => s + c.studentsCount, 0) || 60;
      const ukg = cls.filter(c => c.name.includes('UKG')).reduce((s, c) => s + c.studentsCount, 0) || 30;
      const c12 = cls.filter(c => c.name === 'Class 1' || c.name === 'Class 2').reduce((s, c) => s + c.studentsCount, 0) || 69;
      const c34 = cls.filter(c => c.name === 'Class 3' || c.name === 'Class 4').reduce((s, c) => s + c.studentsCount, 0) || 74;
      dataValues = [nurLkg, ukg, c12, c34];
    }

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Nursery & LKG', 'UKG', 'Class 1 & 2', 'Class 3 & 4'],
        datasets: [{
          data: dataValues,
          backgroundColor: ['#0B6E52', '#047857', '#D6A84F', '#064E3B']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // Student & Parent Performance Radar / Bar Chart
  initStudentPerformanceChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    if (this.chartInstances[canvasId]) {
      this.chartInstances[canvasId].destroy();
    }

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Quran & Tajweed', 'Masnoon Duas', 'Basic Arabic', 'Math', 'EVS Science', 'English', 'Urdu'],
        datasets: [
          {
            label: 'Student Marks (%)',
            data: [98, 96, 94, 92, 89, 91, 95],
            backgroundColor: '#0F5132',
            borderRadius: 6
          },
          {
            label: 'Class Average (%)',
            data: [86, 84, 80, 78, 82, 80, 85],
            backgroundColor: '#94A3B8',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 50, max: 100 }
        }
      }
    });
  }
}

// Global Singleton Instance
window.NadwiCharts = new NadwiCharts();

