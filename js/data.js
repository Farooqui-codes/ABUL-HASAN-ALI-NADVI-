/**
 * JAMIA ABUL HASAN ALI NADWI (RABBANI FOUNDATION MARUL)
 * Central Mock Data Store (js/data.js)
 * 
 * SCHOOL GRADE LEVEL SPECIFICATION:
 * Currently operating from Nursery, LKG, UKG to 4th Standard (Primary Foundation).
 * Future expansion to 5th–10th planned in upcoming phases.
 * 
 * STRICT ISLAMIC SCHOOL DEMO DATA POLICY:
 * Fictional data only. Male names and male profiles exclusively.
 * Clearly labeled as DEMO DATA.
 */

const NadwiInitialData = {
  schoolInfo: {
    nameEn: "JAMIA ABUL HASAN ALI NADWI",
    nameUr: "جامعہ ابوالحسن علی ندوی",
    foundationEn: "RABBANI FOUNDATION MARUL",
    foundationUr: "ربانی فاؤنڈیشن مارول",
    taglineEn: "Islamic Nursery & Primary School (Nursery to 4th Standard)",
    taglineUr: "اسلامک نرسری و پرائمری اسکول (نرسری تا چہارم جماعت)",
    classesOffered: "Nursery, LKG, UKG, Class 1, Class 2, Class 3, Class 4",
    futureExpansion: "Class 5th to 10th planned in Phase 2",
    established: "2018",
    email: "info@jamianadwi.demo",
    phone: "+91 98765 43210 (Demo)",
    address: "Marul Campus, Rabbani Foundation Complex (Demo Address)"
  },

  // 100% Male Faculty & Teachers (Specialized for Early Childhood & Primary Education)
  teachers: [
    { id: "T-101", name: "Dr. Muhammad Usman", designation: "Headmaster & Academic Director", subject: "Islamic Studies & Primary Curriculum", qualification: "M.A., Alim (Nadwatul Ulama)", phone: "0300-1110001", email: "usman.headmaster@demo.com", avatar: "../assets/avatars/male-admin.svg", experience: "16 Years", status: "Active" },
    { id: "T-102", name: "Maulana Abdul Rahman", designation: "Head of Quranic Nazira & Hifz Foundation", subject: "Quranic Nazira & Basic Arabic", qualification: "Hafiz, Qari & Alim", phone: "0300-1110002", email: "abdulrahman@demo.com", avatar: "../assets/avatars/male-teacher-1.svg", experience: "12 Years", status: "Active" },
    { id: "T-103", name: "Umar Farooq", designation: "Senior Primary Teacher", subject: "Class 4 Mathematics & Science", qualification: "B.Sc., B.Ed.", phone: "0300-1110003", email: "umar.math@demo.com", avatar: "../assets/avatars/male-teacher-2.svg", experience: "9 Years", status: "Active" },
    { id: "T-104", name: "Bilal Ahmad", designation: "Primary English & Environmental Studies", subject: "Class 3 & 4 English", qualification: "M.A. English", phone: "0300-1110004", email: "bilal.english@demo.com", avatar: "../assets/avatars/male-teacher-2.svg", experience: "8 Years", status: "Active" },
    { id: "T-105", name: "Ibrahim Khan", designation: "Junior Section Supervisor", subject: "Class 1 & 2 General Subjects", qualification: "B.A., D.El.Ed.", phone: "0300-1110005", email: "ibrahim.primary@demo.com", avatar: "../assets/avatars/male-teacher-1.svg", experience: "7 Years", status: "Active" },
    { id: "T-106", name: "Qari Muhammad Hamza", designation: "Early Childhood Nazira Instructor", subject: "Nursery & KG Noorani Qaida", qualification: "Hafiz & Qari", phone: "0300-1110006", email: "hamza.qaida@demo.com", avatar: "../assets/avatars/male-teacher-1.svg", experience: "10 Years", status: "Active" }
  ],

  // 100% Male Students Demo Profiles (Nursery to 4th Standard)
  students: [
    { id: "S-1001", rollNo: "401", name: "Muhammad Abdullah", class: "Class 4", section: "A", guardianName: "Ibrahim Khan (Father)", dob: "2016-04-12", bloodGroup: "B+", phone: "0321-5550001", feesStatus: "Paid", attendancePercent: 96, avatar: "../assets/avatars/male-student-1.svg", status: "Active" },
    { id: "S-1002", rollNo: "402", name: "Ahmed Raza", class: "Class 4", section: "A", guardianName: "Muhammad Farooq (Father)", dob: "2016-08-20", bloodGroup: "O+", phone: "0321-5550002", feesStatus: "Paid", attendancePercent: 92, avatar: "../assets/avatars/male-student-2.svg", status: "Active" },
    { id: "S-1003", rollNo: "201", name: "Muhammad Hamza", class: "Class 2", section: "A", guardianName: "Ibrahim Khan (Father)", dob: "2018-01-15", bloodGroup: "A+", phone: "0321-5550003", feesStatus: "Pending", attendancePercent: 90, avatar: "../assets/avatars/male-student-1.svg", status: "Active" },
    { id: "S-1004", rollNo: "301", name: "Abdul Rahman", class: "Class 3", section: "A", guardianName: "Abdul Hadi (Father)", dob: "2017-06-18", bloodGroup: "AB+", phone: "0321-5550004", feesStatus: "Paid", attendancePercent: 98, avatar: "../assets/avatars/male-student-2.svg", status: "Active" },
    { id: "S-1005", rollNo: "302", name: "Muhammad Usman", class: "Class 3", section: "A", guardianName: "Tariq Mahmood (Father)", dob: "2017-03-22", bloodGroup: "O+", phone: "0321-5550005", feesStatus: "Paid", attendancePercent: 94, avatar: "../assets/avatars/male-student-1.svg", status: "Active" },
    { id: "S-1006", rollNo: "101", name: "Muhammad Zaid", class: "Class 1", section: "A", guardianName: "Zubair Ahmad (Father)", dob: "2019-07-11", bloodGroup: "B-", phone: "0321-5550006", feesStatus: "Pending", attendancePercent: 88, avatar: "../assets/avatars/male-student-2.svg", status: "Active" },
    { id: "S-1007", rollNo: "UKG-01", name: "Yusuf Ahmed", class: "UKG", section: "A", guardianName: "Ahmed Faraz (Father)", dob: "2020-11-05", bloodGroup: "O+", phone: "0321-5550007", feesStatus: "Paid", attendancePercent: 97, avatar: "../assets/avatars/male-student-1.svg", status: "Active" },
    { id: "S-1008", rollNo: "LKG-01", name: "Bilal Ahmad", class: "LKG", section: "A", guardianName: "Rashid Ali (Father)", dob: "2021-02-14", bloodGroup: "A-", phone: "0321-5550008", feesStatus: "Paid", attendancePercent: 99, avatar: "../assets/avatars/male-student-2.svg", status: "Active" },
    { id: "S-1009", rollNo: "NUR-01", name: "Ayaan Khan", class: "Nursery", section: "A", guardianName: "Kamran Khan (Father)", dob: "2022-09-09", bloodGroup: "B+", phone: "0321-5550009", feesStatus: "Paid", attendancePercent: 95, avatar: "../assets/avatars/male-student-1.svg", status: "Active" },
    { id: "S-1010", rollNo: "NUR-02", name: "Muhammad Saad", class: "Nursery", section: "A", guardianName: "Farooq Azam (Father)", dob: "2022-12-01", bloodGroup: "O+", phone: "0321-5550010", feesStatus: "Paid", attendancePercent: 93, avatar: "../assets/avatars/male-student-2.svg", status: "Active" }
  ],

  // Classes currently offered: Nursery to 4th Standard
  classes: [
    { id: "CLS-NUR", name: "Nursery", incharge: "Qari Muhammad Hamza", studentsCount: 28, roomNo: "Junior Wing - Room 1" },
    { id: "CLS-LKG", name: "LKG (Lower KG)", incharge: "Ibrahim Khan", studentsCount: 32, roomNo: "Junior Wing - Room 2" },
    { id: "CLS-UKG", name: "UKG (Upper KG)", incharge: "Bilal Ahmad", studentsCount: 30, roomNo: "Junior Wing - Room 3" },
    { id: "CLS-1", name: "Class 1", incharge: "Ibrahim Khan", studentsCount: 35, roomNo: "Primary Wing - Room 101" },
    { id: "CLS-2", name: "Class 2", incharge: "Umar Farooq", studentsCount: 34, roomNo: "Primary Wing - Room 102" },
    { id: "CLS-3", name: "Class 3", incharge: "Bilal Ahmad", studentsCount: 36, roomNo: "Primary Wing - Room 103" },
    { id: "CLS-4", name: "Class 4", incharge: "Dr. Muhammad Usman", studentsCount: 38, roomNo: "Primary Wing - Room 104" }
  ],

  // Fee Structure & Demo Records
  fees: [
    { receiptNo: "REC-2026-701", studentId: "S-1001", studentName: "Muhammad Abdullah", class: "Class 4", amount: 1800, feeType: "Monthly Tuition (October)", date: "2026-10-05", status: "Paid", paymentMethod: "Online Bank Demo" },
    { receiptNo: "REC-2026-702", studentId: "S-1002", studentName: "Ahmed Raza", class: "Class 4", amount: 1800, feeType: "Monthly Tuition (October)", date: "2026-10-06", status: "Paid", paymentMethod: "Cash / Counter Demo" },
    { receiptNo: "REC-2026-703", studentId: "S-1003", studentName: "Muhammad Hamza", class: "Class 2", amount: 1600, feeType: "Monthly Tuition (October)", date: "2026-10-25", status: "Pending", paymentMethod: "Unpaid" },
    { receiptNo: "REC-2026-704", studentId: "S-1007", studentName: "Yusuf Ahmed", class: "UKG", amount: 1500, feeType: "Monthly Tuition (October)", date: "2026-10-08", status: "Paid", paymentMethod: "Online Bank Demo" },
    { receiptNo: "REC-2026-705", studentId: "S-1009", studentName: "Ayaan Khan", class: "Nursery", amount: 1400, feeType: "Monthly Tuition (October)", date: "2026-10-09", status: "Paid", paymentMethod: "Cash / Counter Demo" }
  ],

  // Library Books (Child & Primary Islamic Reading)
  books: [
    { id: "BK-101", title: "Noorani Qaida with Tajweed Colour Coded", category: "Quranic Foundation", author: "Noor Muhammad Ludhianvi", isbn: "978-9960-01", totalCopies: 50, availableCopies: 42, rack: "Shelf A-1" },
    { id: "BK-102", title: "Stories of the Prophets for Children", category: "Islamic History", author: "Syed Abul Hasan Ali Nadwi", isbn: "978-9960-02", totalCopies: 35, availableCopies: 28, rack: "Shelf A-2" },
    { id: "BK-103", title: "Primary Mathematics Book 1-4", category: "Mathematics", author: "Oxford Primary Press", isbn: "978-0195-03", totalCopies: 45, availableCopies: 39, rack: "Shelf B-1" },
    { id: "BK-104", title: "Junior Arabic Picture Dictionary", category: "Arabic Foundation", author: "Dar-ul-Ilm", isbn: "978-9960-04", totalCopies: 30, availableCopies: 26, rack: "Shelf B-2" },
    { id: "BK-105", title: "Islamic Manners & Duas for Kids", category: "Moral Tarbiyah", author: "Maulana Abdul Rahman", isbn: "978-9960-05", totalCopies: 40, availableCopies: 34, rack: "Shelf C-1" }
  ],

  // Transport Routes
  transports: [
    { routeId: "RT-01", routeName: "Marul Central & Main Road", driverName: "Muhammad Tariq (Demo Driver)", vehicleNo: "VAN-NADWI-01", capacity: 22, studentsEnrolled: 20, contact: "0333-7770001" },
    { routeId: "RT-02", routeName: "Marul East & Colony Shuttle", driverName: "Abdul Ghaffar (Demo Driver)", vehicleNo: "VAN-NADWI-02", capacity: 20, studentsEnrolled: 18, contact: "0333-7770002" }
  ],

  // Notices
  notices: [
    { id: "NOT-101", title: "Admissions Open for Nursery, LKG, UKG & Classes 1 to 4", date: "2026-10-28", category: "Admissions", audience: "All Parents", content: "Admissions for academic session 2026-27 are open under Rabbani Foundation Marul. Limited seats for Nursery to 4th Standard." },
    { id: "NOT-102", title: "Junior Qira'at & Dua Memorization Competition", date: "2026-10-22", category: "Events", audience: "Nursery to Class 4", content: "Annual recitation contest for Noorani Qaida, Daily Masnoon Duas, and Short Surahs to be held next month." },
    { id: "NOT-103", title: "Parent-Teacher Review for Primary Grades", date: "2026-10-18", category: "Academics", audience: "Parents", content: "Consultation regarding foundational Arabic literacy and English phonics scheduled for this Saturday." }
  ],

  // Interactive Quiz for Primary Boys
  quizQuestions: [
    {
      id: 1,
      question: "Which sacred book was revealed to Prophet Muhammad (PBUH)?",
      options: ["The Holy Quran", "Tawrat", "Zabur", "Injeel"],
      answer: 0,
      explanation: "The Holy Quran was revealed to the final Prophet, Muhammad (PBUH)."
    },
    {
      id: 2,
      question: "How many daily obligatory prayers (Salah) are there in Islam?",
      options: ["3 Prayers", "4 Prayers", "5 Prayers", "7 Prayers"],
      answer: 2,
      explanation: "Every Muslim prays 5 times daily: Fajr, Zuhr, Asr, Maghrib, and Isha."
    },
    {
      id: 3,
      question: "What is the first kalimah of Islam?",
      options: ["Kalimah Tayyibah", "Kalimah Shahadah", "Kalimah Tamjeed", "Kalimah Tawheed"],
      answer: 0,
      explanation: "The first Kalimah is 'La ilaha illallah Muhammadur Rasulullah' (Kalimah Tayyibah)."
    },
    {
      id: 4,
      question: "What is 7 + 8 in basic mathematics?",
      options: ["13", "14", "15", "16"],
      answer: 2,
      explanation: "7 plus 8 equals 15."
    }
  ]
};

// Store with LocalStorage auto-migration
class NadwiStore {
  constructor() {
    this.STORAGE_KEY = "JAMIA_NADWI_ERP_DATA_V2";
    this.init();
  }

  init() {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      this.save(NadwiInitialData);
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : NadwiInitialData;
    } catch (e) {
      console.error("Error reading localStorage:", e);
      return NadwiInitialData;
    }
  }

  save(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  reset() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(NadwiInitialData));
    return true;
  }

  getStudents() {
    return this.load().students;
  }

  addStudent(student) {
    const data = this.load();
    student.id = "S-" + (1000 + data.students.length + 1);
    student.status = "Active";
    student.avatar = "../assets/avatars/male-student-1.svg";
    data.students.unshift(student);
    this.save(data);
    return student;
  }

  deleteStudent(id) {
    const data = this.load();
    data.students = data.students.filter(s => s.id !== id);
    this.save(data);
    return true;
  }

  getTeachers() {
    return this.load().teachers;
  }

  addTeacher(teacher) {
    const data = this.load();
    teacher.id = "T-" + (100 + data.teachers.length + 1);
    teacher.status = "Active";
    teacher.avatar = "../assets/avatars/male-teacher-2.svg";
    data.teachers.unshift(teacher);
    this.save(data);
    return teacher;
  }

  deleteTeacher(id) {
    const data = this.load();
    data.teachers = data.teachers.filter(t => t.id !== id);
    this.save(data);
    return true;
  }

  getFees() {
    return this.load().fees;
  }

  addFeePayment(payment) {
    const data = this.load();
    payment.receiptNo = "REC-2026-" + Math.floor(700 + Math.random() * 299);
    payment.date = new Date().toISOString().split('T')[0];
    payment.status = "Paid";
    data.fees.unshift(payment);
    this.save(data);
    return payment;
  }

  getBooks() {
    return this.load().books;
  }

  getNotices() {
    return this.load().notices;
  }

  getTransports() {
    return this.load().transports;
  }

  getQuiz() {
    return this.load().quizQuestions;
  }
}

// Global Singleton Instance
window.NadwiData = new NadwiStore();
