import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, AlertCircle, ScanFace, Zap, Video, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { mockStudents } from "@/lib/mockData";

type ScanState = "idle" | "scanning" | "success" | "error";

interface RecognizedStudent {
  name: string;
  id: string;
  confidence: number;
}

export default function MarkAttendance() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [recognized, setRecognized] = useState<RecognizedStudent[]>([]);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Pick random students from the enrolled list who have face encoded
  const getRandomStudents = useCallback(() => {
    const encoded = mockStudents.filter((s) => s.faceEncoded);
    const count = Math.min(3 + Math.floor(Math.random() * 3), encoded.length);
    const shuffled = [...encoded].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((s) => ({
      name: `${s.firstName} ${s.lastName}`,
      id: s.studentId,
      confidence: parseFloat((95 + Math.random() * 4.5).toFixed(1)),
    }));
  }, []);

  const startCamera = async () => {
    try {
      setCameraError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera permission.");
      toast.error("Could not access camera");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startScan = () => {
    if (!cameraOn) {
      toast.error("Please turn on the camera first");
      return;
    }
    setScanState("scanning");
    setRecognized([]);
    const results = getRandomStudents();
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < results.length) {
        setRecognized((prev) => [...prev, results[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setScanState("success");
        toast.success(`${results.length} students recognized from enrolled list`);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Mark Attendance</h1>
        <p className="text-muted-foreground mt-1">Use live camera & face recognition to mark attendance from enrolled students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Camera view */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-3 bg-card rounded-xl border border-border overflow-hidden">
          <div className="relative aspect-video bg-primary/5 flex items-center justify-center overflow-hidden">
            {/* Live video feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${cameraOn ? "block" : "hidden"}`}
            />

            {/* Overlay when camera is off */}
            {!cameraOn && (
              <div className="absolute inset-0 gradient-hero opacity-90" />
            )}

            {/* Scan overlay on top of video */}
            {cameraOn && scanState === "scanning" && (
              <div className="absolute inset-0 border-4 border-accent/40 rounded-lg m-4 animate-pulse" />
            )}

            <div className="relative z-10 text-center">
              {!cameraOn && !cameraError && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <Camera className="w-16 h-16 text-muted-foreground/40 mx-auto" />
                  <p className="text-muted-foreground/60 mt-3 text-sm">Turn on camera to begin</p>
                </motion.div>
              )}
              {cameraError && (
                <div>
                  <AlertCircle className="w-16 h-16 text-destructive/60 mx-auto" />
                  <p className="text-destructive/80 mt-3 text-sm max-w-xs">{cameraError}</p>
                </div>
              )}
              {cameraOn && scanState === "idle" && (
                <div className="bg-background/60 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-sm text-foreground/80">📷 Camera live — ready to scan</p>
                </div>
              )}
              {cameraOn && scanState === "scanning" && (
                <div className="bg-background/70 backdrop-blur-sm rounded-lg px-4 py-3">
                  <ScanFace className="w-10 h-10 text-accent mx-auto" />
                  <p className="text-accent mt-2 text-sm font-medium">Scanning faces...</p>
                </div>
              )}
              {cameraOn && scanState === "success" && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-background/70 backdrop-blur-sm rounded-lg px-4 py-3">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
                  <p className="text-success mt-2 font-medium">Scan Complete</p>
                </motion.div>
              )}
            </div>

            {/* Scan line animation */}
            {scanState === "scanning" && (
              <div className="absolute left-0 right-0 h-0.5 bg-accent/60 animate-scan-line shadow-[0_0_8px_hsl(174,62%,42%)]" />
            )}
          </div>

          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={cameraOn ? stopCamera : startCamera}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  cameraOn
                    ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {cameraOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {cameraOn ? "Stop Camera" : "Start Camera"}
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>
                  {scanState === "scanning"
                    ? "Processing..."
                    : scanState === "success"
                    ? `${recognized.length} faces detected`
                    : cameraOn
                    ? "Camera ready"
                    : "Camera off"}
                </span>
              </div>
            </div>
            <button
              onClick={startScan}
              disabled={scanState === "scanning" || !cameraOn}
              className="px-5 py-2.5 rounded-lg text-sm font-medium gradient-accent text-accent-foreground flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <ScanFace className="w-4 h-4" />
              {scanState === "idle" ? "Start Scan" : scanState === "scanning" ? "Scanning..." : "Scan Again"}
            </button>
          </div>
        </motion.div>

        {/* Recognition results */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold mb-1">Recognized Students</h3>
          <p className="text-xs text-muted-foreground mb-4">Matched from {mockStudents.filter((s) => s.faceEncoded).length} enrolled faces</p>
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
                <p className="text-xs mt-1 opacity-60">Students will be matched from the enrolled list</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
