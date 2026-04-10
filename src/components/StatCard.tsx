import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "accent" | "success" | "warning";
}

const variantStyles = {
  default: "bg-card border-border",
  accent: "gradient-accent text-accent-foreground",
  success: "bg-success/10 border-success/20",
  warning: "bg-warning/10 border-warning/20",
};

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  accent: "bg-accent-foreground/20 text-accent-foreground",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
};

export default function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-6 ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${variant === "accent" ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{title}</p>
          <p className="text-3xl font-heading font-bold mt-1">{value}</p>
          {subtitle && <p className={`text-xs mt-1 ${variant === "accent" ? "text-accent-foreground/60" : "text-muted-foreground"}`}>{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from yesterday
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconVariantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
