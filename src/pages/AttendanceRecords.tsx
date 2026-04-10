import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Calendar, ScanFace } from "lucide-react";
import { mockAttendance } from "@/lib/mockData";

export default function AttendanceRecords() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockAttendance.filter((a) => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || a.studentId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Attendance Records</h1>
          <p className="text-muted-foreground mt-1">View and manage attendance history</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Present", "Late", "Absent"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check In</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check Out</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record, i) => (
              <motion.tr key={record.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {record.studentName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{record.studentName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{record.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{record.date}</td>
                <td className="px-6 py-4 text-sm font-mono">{record.checkInTime}</td>
                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{record.checkOutTime || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    record.status === "Present" ? "bg-success/10 text-success" : record.status === "Late" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  }`}>{record.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs">
                    {record.method === "Face Recognition" && <ScanFace className="w-3.5 h-3.5 text-accent" />}
                    {record.method}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono">{record.confidence ? `${record.confidence}%` : "—"}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
