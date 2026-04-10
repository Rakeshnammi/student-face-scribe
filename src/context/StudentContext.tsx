import { createContext, useContext, useState, ReactNode } from "react";
import { Student, AttendanceRecord } from "@/lib/types";
import { mockStudents, mockAttendance } from "@/lib/mockData";

interface StudentContextType {
  students: Student[];
  attendance: AttendanceRecord[];
  addStudent: (student: Omit<Student, "id" | "studentId" | "photoUrl" | "faceEncoded" | "status" | "enrollmentDate">) => void;
  addAttendanceRecords: (records: AttendanceRecord[]) => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);

  const addStudent = (data: Omit<Student, "id" | "studentId" | "photoUrl" | "faceEncoded" | "status" | "enrollmentDate">) => {
    const newId = String(students.length + 1);
    const studentId = `STU-2024-${String(students.length + 1).padStart(3, "0")}`;
    const student: Student = {
      ...data,
      id: newId,
      studentId,
      photoUrl: "",
      faceEncoded: false,
      status: "Active",
      enrollmentDate: new Date().toISOString().split("T")[0],
    };
    setStudents((prev) => [...prev, student]);
  };

  const addAttendanceRecords = (records: AttendanceRecord[]) => {
    setAttendance((prev) => [...prev, ...records]);
  };

  return (
    <StudentContext.Provider value={{ students, attendance, addStudent, addAttendanceRecords }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used within StudentProvider");
  return ctx;
}
