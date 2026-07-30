import { FiAlertTriangle, FiAlertCircle, FiInfo } from "react-icons/fi";

const severityMap = {
  high: {
    icon: FiAlertTriangle,
    label: "High",
    classes: "bg-signal-dangerBg text-signal-danger border-signal-danger/30",
  },
  medium: {
    icon: FiAlertCircle,
    label: "Medium",
    classes: "bg-signal-warningBg text-signal-warning border-signal-warning/30",
  },
  low: {
    icon: FiInfo,
    label: "Low",
    classes: "bg-signal-successBg text-signal-success border-signal-success/30",
  },
};

function SkillGapCard({ skill, severity }) {
  const tone = severityMap[String(severity).toLowerCase()] || severityMap.low;
  const Icon = tone.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium animate-fadeIn ${tone.classes}`}
    >
      <Icon className="h-4 w-4" />
      {skill}
      <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
        {tone.label}
      </span>
    </span>
  );
}

export default SkillGapCard;
