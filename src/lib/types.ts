export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  section: string;
  enrollmentDate: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  address: string;
  guardianName: string;
  guardianPhone: string;
  photoUrl: string;
  faceEncoded: boolean;
  status: "Active" | "Inactive" | "Graduated";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: "Present" | "Absent" | "Late";
  method: "Face Recognition" | "Manual";
  confidence?: number;
}
