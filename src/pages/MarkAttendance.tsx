import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, AlertCircle, ScanFace, Zap } from "lucide-react";
import { toast } from "sonner";

type ScanState = "idle" | "scanning" | "success" | "error";

const mockResults = [
  { name: "Aarav Sharma", id: "STU-2024-001", confidence: 98.5 },
  { name: "Priya Patel", id: "STU-2024-002", confidence: 97.2 },
  { name: "Sneha Reddy", id: "STU-2024-004", confidence: 96.8 },
  { name: "Ananya Iyer", id: "STU-2024-006", confidence: 99.1 },
];

export default function MarkAttendance() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [recognized, setRecognized] = useState<typeof mockResults>([]);

  const startScan = () => {
    setScanState("scanning");
    setRecognized([]);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < mockResults.length) {
        setRecognized((prev) => [...prev, mockResults[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setScanState("success");
        toast.success(`${mockResults.length} students recognized`);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Mark Attendance</h1>
        <p className="text-muted-foreground mt-1">Use face recognition to mark attendance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Camera view */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-3 bg-card rounded-xl border border-border overflow-hidden">
          <div className="relative aspect-video bg-primary/5 flex items-center justify-center overflow-hidden">
            {/* Simulated camera */}
            <div className="absolute inset-0 gradient-hero opacity-90" />
            <div className="relative z-10 text-center">
              {scanState === "idle" && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <Camera className="w-16 h-16 text-muted-foreground/40 mx-auto" />
                  <p className="text-muted-foreground/60 mt-3 text-sm">Camera preview</p>
                </motion.div>
              )}
              {scanState === "scanning" && (
                <div className="relative">
                  <ScanFace className="w-20 h-20 text-accent mx-auto" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-2 border-accent animate-pulse-ring" />
                  </div>
                  <p className="text-accent mt-4 text-sm font-medium">Scanning faces...</p>
                </div>
              )}
              {scanState === "success" && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
                  <p className="text-success mt-3 font-medium">Scan Complete</p>
                </motion.div>
              )}
            </div>

            {/* Scan line animation */}
            {scanState === "scanning" && (
              <div className="absolute left-0 right-0 h-0.5 bg-accent/60 animate-scan-line shadow-[0_0_8px_hsl(174,62%,42%)]" />
            )}
          </div>

          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span>{scanState === "scanning" ? "Processing..." : scanState === "success" ? `${recognized.length} faces detected` : "Ready to scan"}</span>
            </div>
            <button
              onClick={startScan}
              disabled={scanState === "scanning"}
              className="px-5 py-2.5 rounded-lg text-sm font-medium gradient-accent text-accent-foreground flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              {scanState === "idle" ? "Start Scan" : scanState === "scanning" ? "Scanning..." : "Scan Again"}
            </button>
          </div>
        </motion.div>

        {/* Recognition results */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold mb-4">Recognized Students</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {recognized.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <div className="w-9 h-9 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{r.id}</p>
                  </div>
                  <span className="text-xs font-medium text-success">{r.confidence}%</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {recognized.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <ScanFace className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No faces scanned yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
