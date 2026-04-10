import { Student, AttendanceRecord } from "./types";

export const mockStudents: Student[] = [
  { id: "1", studentId: "STU-2024-001", firstName: "Aarav", lastName: "Sharma", email: "aarav.s@university.edu", phone: "+91 98765 43210", department: "Computer Science", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-04-12", gender: "Male", address: "Block 4, University Hostel", guardianName: "Rajesh Sharma", guardianPhone: "+91 98765 00001", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "2", studentId: "STU-2024-002", firstName: "Priya", lastName: "Patel", email: "priya.p@university.edu", phone: "+91 98765 43211", department: "Electronics", semester: 3, section: "B", enrollmentDate: "2023-08-10", dateOfBirth: "2004-07-22", gender: "Female", address: "Room 12, Girls Hostel", guardianName: "Amit Patel", guardianPhone: "+91 98765 00002", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "3", studentId: "STU-2024-003", firstName: "Rahul", lastName: "Kumar", email: "rahul.k@university.edu", phone: "+91 98765 43212", department: "Mechanical", semester: 7, section: "A", enrollmentDate: "2021-08-12", dateOfBirth: "2002-11-05", gender: "Male", address: "25 Main St, City", guardianName: "Suresh Kumar", guardianPhone: "+91 98765 00003", photoUrl: "", faceEncoded: false, status: "Active" },
  { id: "4", studentId: "STU-2024-004", firstName: "Sneha", lastName: "Reddy", email: "sneha.r@university.edu", phone: "+91 98765 43213", department: "Computer Science", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-09-18", gender: "Female", address: "Block 2, Girls Hostel", guardianName: "Venkat Reddy", guardianPhone: "+91 98765 00004", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "5", studentId: "STU-2024-005", firstName: "Arjun", lastName: "Singh", email: "arjun.s@university.edu", phone: "+91 98765 43214", department: "Civil", semester: 1, section: "C", enrollmentDate: "2024-08-01", dateOfBirth: "2005-02-28", gender: "Male", address: "15 Park Ave", guardianName: "Harpreet Singh", guardianPhone: "+91 98765 00005", photoUrl: "", faceEncoded: false, status: "Active" },
  { id: "6", studentId: "STU-2024-006", firstName: "Ananya", lastName: "Iyer", email: "ananya.i@university.edu", phone: "+91 98765 43215", department: "Computer Science", semester: 3, section: "B", enrollmentDate: "2023-08-10", dateOfBirth: "2004-01-10", gender: "Female", address: "Room 8, Girls Hostel", guardianName: "Subramaniam Iyer", guardianPhone: "+91 98765 00006", photoUrl: "", faceEncoded: true, status: "Active" },
];

const today = new Date().toISOString().split("T")[0];

export const mockAttendance: AttendanceRecord[] = [
  { id: "a1", studentId: "STU-2024-001", studentName: "Aarav Sharma", department: "Computer Science", date: today, checkInTime: "08:55", checkOutTime: "16:30", status: "Present", method: "Face Recognition", confidence: 98.5 },
  { id: "a2", studentId: "STU-2024-002", studentName: "Priya Patel", department: "Electronics", date: today, checkInTime: "09:02", checkOutTime: "16:15", status: "Present", method: "Face Recognition", confidence: 97.2 },
  { id: "a3", studentId: "STU-2024-004", studentName: "Sneha Reddy", department: "Computer Science", date: today, checkInTime: "09:18", status: "Late", method: "Face Recognition", confidence: 96.8 },
  { id: "a4", studentId: "STU-2024-003", studentName: "Rahul Kumar", department: "Mechanical", date: today, checkInTime: "08:45", checkOutTime: "16:00", status: "Present", method: "Manual" },
  { id: "a5", studentId: "STU-2024-006", studentName: "Ananya Iyer", department: "Computer Science", date: today, checkInTime: "08:50", checkOutTime: "16:45", status: "Present", method: "Face Recognition", confidence: 99.1 },
];
