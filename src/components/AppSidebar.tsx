import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Camera, ClipboardList, UserPlus, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/students", icon: Users, label: "Students" },
  { to: "/add-student", icon: UserPlus, label: "Add Student" },
  { to: "/mark-attendance", icon: Camera, label: "Mark Attendance" },
  { to: "/attendance", icon: ClipboardList, label: "Records" },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 gradient-hero flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
            <Camera className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-sidebar-accent-foreground">FaceTrack</h1>
            <p className="text-xs text-sidebar-foreground/60">Attendance System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className="block">
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
