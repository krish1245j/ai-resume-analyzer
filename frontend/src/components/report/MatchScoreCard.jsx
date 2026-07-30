import { useEffect, useState } from "react";
import { FiTarget } from "react-icons/fi";
import Card from "../ui/Card";

function getTone(score) {
  if (score >= 75) return { stroke: "#34d399", label: "Strong match", text: "text-signal-success" };
  if (score >= 50) return { stroke: "#fbbf24", label: "Moderate match", text: "text-signal-warning" };
  return { stroke: "#fb7185", label: "Needs work", text: "text-signal-danger" };
}

function MatchScoreCard({ score = 0 }) {
  const clamped = Math.max(0, Math.min(100, score));
  const [display, setDisplay] = useState(0);
  const tone = getTone(clamped);

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (display / 100) * circumference;

  useEffect(() => {
    let frame;
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * clamped));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  return (
    <Card className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-center sm:justify-between animate-fadeIn">
      <div className="flex items-center gap-6">
        <div className="relative h-48 w-48 shrink-0">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgba(245,243,255,0.08)"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={tone.stroke}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.15s linear, stroke 0.4s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl font-semibold text-ink">{display}%</span>
            <span className={`mt-1 text-xs font-medium ${tone.text}`}>{tone.label}</span>
          </div>
        </div>

        <div className="hidden sm:block">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-violetLight">
            <FiTarget className="h-3.5 w-3.5" />
            Match score
          </span>
          <h3 className="mt-2 max-w-xs text-lg font-medium text-ink">
            How closely your background fits this role
          </h3>
          <p className="mt-1.5 max-w-xs text-sm text-ink-faint">
            Calculated from your resume, self description, and the job description you provided.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default MatchScoreCard;
