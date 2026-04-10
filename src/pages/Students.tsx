import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Pencil, Trash2, ScanFace } from "lucide-react";
import { useStudents } from "@/context/StudentContext";
import { Student } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Students() {
  const { students } = useStudents();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [selected, setSelected] = useState<Student | null>(null);

  const departments = ["All", ...new Set(students.map((s) => s.department))];

  const filtered = students.filter((s) => {
    const matchSearch = `${s.firstName} ${s.lastName} ${s.studentId}`.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">{students.length} students enrolled</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {departments.map((d) => (
            <button key={d} onClick={() => setDeptFilter(d)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${deptFilter === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Semester</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Face</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, i) => (
              <motion.tr key={student.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{student.firstName} {student.lastName}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{student.studentId}</td>
                <td className="px-6 py-4 text-sm">{student.department}</td>
                <td className="px-6 py-4 text-sm">{student.semester}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${student.faceEncoded ? "text-success" : "text-warning"}`}>
                    <ScanFace className="w-3.5 h-3.5" />
                    {student.faceEncoded ? "Encoded" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${student.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{student.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setSelected(student)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Student Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center text-xl font-bold text-accent-foreground">
                  {selected.firstName[0]}{selected.lastName[0]}
                </div>
                <div>
                  <p className="text-lg font-heading font-bold">{selected.firstName} {selected.lastName}</p>
                  <p className="text-sm text-muted-foreground font-mono">{selected.studentId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {([
                  ["Email", selected.email],
                  ["Phone", selected.phone],
                  ["Department", selected.department],
                  ["Semester", `${selected.semester} - Section ${selected.section}`],
                  ["Date of Birth", selected.dateOfBirth],
                  ["Gender", selected.gender],
                  ["Enrollment", selected.enrollmentDate],
                  ["Address", selected.address],
                  ["Guardian", selected.guardianName],
                  ["Guardian Phone", selected.guardianPhone],
                ] as [string, string][]).map(([label, val]) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
