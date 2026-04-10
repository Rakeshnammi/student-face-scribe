import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Upload } from "lucide-react";
import { toast } from "sonner";

const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];

export default function AddStudent() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", department: "", semester: "", section: "",
    dateOfBirth: "", gender: "", address: "", guardianName: "", guardianPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Student added successfully! Face enrollment pending.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", department: "", semester: "", section: "", dateOfBirth: "", gender: "", address: "", guardianName: "", guardianPhone: "" });
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Add Student</h1>
        <p className="text-muted-foreground mt-1">Register a new student for face recognition attendance</p>
      </div>

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-8 space-y-6">
        <div className="flex justify-center">
          <label className="cursor-pointer group">
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-border group-hover:border-accent flex flex-col items-center justify-center transition-colors bg-muted/50">
              <Upload className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="text-xs text-muted-foreground mt-1">Upload Photo</span>
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className={labelClass}>First Name *</label><input name="firstName" value={form.firstName} onChange={handleChange} required className={inputClass} /></div>
          <div><label className={labelClass}>Last Name *</label><input name="lastName" value={form.lastName} onChange={handleChange} required className={inputClass} /></div>
          <div><label className={labelClass}>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} /></div>
          <div><label className={labelClass}>Phone</label><input name="phone" value={form.phone} onChange={handleChange} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Department *</label>
            <select name="department" value={form.department} onChange={handleChange} required className={inputClass}>
              <option value="">Select</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Semester *</label><input name="semester" type="number" min={1} max={8} value={form.semester} onChange={handleChange} required className={inputClass} /></div>
            <div><label className={labelClass}>Section</label><input name="section" value={form.section} onChange={handleChange} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Date of Birth</label><input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2"><label className={labelClass}>Address</label><textarea name="address" value={form.address} onChange={handleChange} rows={2} className={inputClass} /></div>
          <div><label className={labelClass}>Guardian Name</label><input name="guardianName" value={form.guardianName} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Guardian Phone</label><input name="guardianPhone" value={form.guardianPhone} onChange={handleChange} className={inputClass} /></div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" className="px-5 py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">Cancel</button>
          <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-medium gradient-accent text-accent-foreground flex items-center gap-2 hover:opacity-90 transition-opacity">
            <UserPlus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </motion.form>
    </div>
  );
}
