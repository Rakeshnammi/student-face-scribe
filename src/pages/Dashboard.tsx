import { Users, UserCheck, Clock, Camera } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import { useStudents } from "@/context/StudentContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { day: "Mon", present: 42, absent: 8 },
  { day: "Tue", present: 45, absent: 5 },
  { day: "Wed", present: 40, absent: 10 },
  { day: "Thu", present: 44, absent: 6 },
  { day: "Fri", present: 38, absent: 12 },
];

const COLORS = ["hsl(174, 62%, 42%)", "hsl(222, 60%, 18%)", "hsl(38, 92%, 50%)", "hsl(210, 92%, 55%)"];

export default function Dashboard() {
  const { students, attendance } = useStudents();

  const totalStudents = students.length;
  const presentToday = attendance.filter((a) => a.status === "Present").length;
  const lateToday = attendance.filter((a) => a.status === "Late").length;

  const deptCounts = students.reduce<Record<string, number>>((acc, s) => {
    const key = s.department.length > 4 ? s.department.slice(0, 4) : s.department;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const deptData = Object.entries(deptCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time attendance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={totalStudents} icon={Users} subtitle="Enrolled & active" trend={{ value: 2.5, positive: true }} />
        <StatCard title="Present Today" value={presentToday} icon={UserCheck} variant="success" subtitle="Checked in" trend={{ value: 5, positive: true }} />
        <StatCard title="Late Today" value={lateToday} icon={Clock} variant="warning" subtitle="After 9:00 AM" />
        <StatCard title="Face Scans" value={attendance.filter((a) => a.method === "Face Recognition").length} icon={Camera} variant="accent" subtitle="AI verified" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="day" stroke="hsl(220, 9%, 46%)" fontSize={12} />
              <YAxis stroke="hsl(220, 9%, 46%)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(220, 13%, 89%)", fontSize: 13 }} />
              <Bar dataKey="present" fill="hsl(174, 62%, 42%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="absent" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-4">By Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {deptData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {attendance.slice(0, 5).map((record) => (
            <div key={record.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                  {record.studentName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{record.studentName}</p>
                  <p className="text-xs text-muted-foreground">{record.department}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  record.status === "Present" ? "bg-success/10 text-success" : record.status === "Late" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                }`}>
                  {record.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{record.checkInTime}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
