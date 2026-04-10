import { Student, AttendanceRecord } from "./types";

export const mockStudents: Student[] = [
  { id: "1", studentId: "STU-2024-001", firstName: "Aarav", lastName: "Sharma", email: "aarav.sharma@university.edu", phone: "+91 98765 43210", department: "Computer Science", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-04-12", gender: "Male", address: "Block 4, University Hostel", guardianName: "Rajesh Sharma", guardianPhone: "+91 98765 00001", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "2", studentId: "STU-2024-002", firstName: "Priya", lastName: "Patel", email: "priya.patel@university.edu", phone: "+91 98765 43211", department: "Electronics", semester: 3, section: "B", enrollmentDate: "2023-08-10", dateOfBirth: "2004-07-22", gender: "Female", address: "Room 12, Girls Hostel", guardianName: "Amit Patel", guardianPhone: "+91 98765 00002", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "3", studentId: "STU-2024-003", firstName: "Rahul", lastName: "Verma", email: "rahul.verma@university.edu", phone: "+91 98765 43212", department: "Mechanical", semester: 7, section: "A", enrollmentDate: "2021-08-12", dateOfBirth: "2002-11-05", gender: "Male", address: "25 MG Road, Bangalore", guardianName: "Suresh Verma", guardianPhone: "+91 98765 00003", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "4", studentId: "STU-2024-004", firstName: "Sneha", lastName: "Reddy", email: "sneha.reddy@university.edu", phone: "+91 98765 43213", department: "Computer Science", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-09-18", gender: "Female", address: "Block 2, Girls Hostel", guardianName: "Venkat Reddy", guardianPhone: "+91 98765 00004", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "5", studentId: "STU-2024-005", firstName: "Arjun", lastName: "Singh", email: "arjun.singh@university.edu", phone: "+91 98765 43214", department: "Civil", semester: 1, section: "C", enrollmentDate: "2024-08-01", dateOfBirth: "2005-02-28", gender: "Male", address: "15 Park Avenue, Delhi", guardianName: "Harpreet Singh", guardianPhone: "+91 98765 00005", photoUrl: "", faceEncoded: false, status: "Active" },
  { id: "6", studentId: "STU-2024-006", firstName: "Ananya", lastName: "Iyer", email: "ananya.iyer@university.edu", phone: "+91 98765 43215", department: "Computer Science", semester: 3, section: "B", enrollmentDate: "2023-08-10", dateOfBirth: "2004-01-10", gender: "Female", address: "Room 8, Girls Hostel", guardianName: "Subramaniam Iyer", guardianPhone: "+91 98765 00006", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "7", studentId: "STU-2024-007", firstName: "Vikram", lastName: "Deshmukh", email: "vikram.deshmukh@university.edu", phone: "+91 98765 43216", department: "Electronics", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-06-14", gender: "Male", address: "Flat 302, Shanti Nagar, Pune", guardianName: "Manoj Deshmukh", guardianPhone: "+91 98765 00007", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "8", studentId: "STU-2024-008", firstName: "Meera", lastName: "Nair", email: "meera.nair@university.edu", phone: "+91 98765 43217", department: "Mechanical", semester: 3, section: "B", enrollmentDate: "2023-08-10", dateOfBirth: "2004-03-25", gender: "Female", address: "House 14, Trivandrum", guardianName: "Gopal Nair", guardianPhone: "+91 98765 00008", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "9", studentId: "STU-2024-009", firstName: "Rohan", lastName: "Gupta", email: "rohan.gupta@university.edu", phone: "+91 98765 43218", department: "Civil", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-12-01", gender: "Male", address: "45 Nehru Street, Lucknow", guardianName: "Anil Gupta", guardianPhone: "+91 98765 00009", photoUrl: "", faceEncoded: false, status: "Active" },
  { id: "10", studentId: "STU-2024-010", firstName: "Kavya", lastName: "Menon", email: "kavya.menon@university.edu", phone: "+91 98765 43219", department: "Computer Science", semester: 7, section: "A", enrollmentDate: "2021-08-12", dateOfBirth: "2002-08-19", gender: "Female", address: "Apartment 5B, Kochi", guardianName: "Ravi Menon", guardianPhone: "+91 98765 00010", photoUrl: "", faceEncoded: true, status: "Active" },
  { id: "11", studentId: "STU-2024-011", firstName: "Aditya", lastName: "Joshi", email: "aditya.joshi@university.edu", phone: "+91 98765 43220", department: "Electronics", semester: 1, section: "C", enrollmentDate: "2024-08-01", dateOfBirth: "2005-05-07", gender: "Male", address: "12 Camp Road, Pune", guardianName: "Sanjay Joshi", guardianPhone: "+91 98765 00011", photoUrl: "", faceEncoded: false, status: "Active" },
  { id: "12", studentId: "STU-2024-012", firstName: "Divya", lastName: "Rao", email: "divya.rao@university.edu", phone: "+91 98765 43221", department: "Mechanical", semester: 5, section: "A", enrollmentDate: "2022-08-15", dateOfBirth: "2003-10-30", gender: "Female", address: "Block 7, Hyderabad", guardianName: "Krishna Rao", guardianPhone: "+91 98765 00012", photoUrl: "", faceEncoded: true, status: "Active" },
];

const today = new Date().toISOString().split("T")[0];

// Generate attendance from the student list itself
export const mockAttendance: AttendanceRecord[] = mockStudents
  .filter((s) => s.faceEncoded)
  .map((s, i) => {
    const checkInHour = 8 + Math.floor(Math.random() * 2);
    const checkInMin = Math.floor(Math.random() * 60);
    const isLate = checkInHour >= 9 && checkInMin > 15;
    const checkIn = `${String(checkInHour).padStart(2, "0")}:${String(checkInMin).padStart(2, "0")}`;
    const checkOutHour = 16 + Math.floor(Math.random() * 2);
    const checkOut = `${checkOutHour}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
    return {
      id: `a${i + 1}`,
      studentId: s.studentId,
      studentName: `${s.firstName} ${s.lastName}`,
      department: s.department,
      date: today,
      checkInTime: checkIn,
      checkOutTime: checkOut,
      status: isLate ? "Late" as const : "Present" as const,
      method: "Face Recognition" as const,
      confidence: parseFloat((95 + Math.random() * 4.5).toFixed(1)),
    };
  });
