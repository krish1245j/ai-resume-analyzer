import { useNavigate } from "react-router-dom";
import { FiClock, FiChevronRight } from "react-icons/fi";
import Card from "../ui/Card";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function scoreTone(score = 0) {
  if (score >= 75) return "text-signal-success";
  if (score >= 50) return "text-signal-warning";
  return "text-signal-danger";
}

function ReportHistory({ reports = [], loading = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 w-56 shrink-0 rounded-xl2 skeleton animate-shimmer" />
        ))}
      </div>
    );
  }

  if (!reports.length) {
    return (
      <Card className="p-5 text-sm text-ink-faint">
        You don't have any past reports yet. Generate one above to see it here.
      </Card>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {reports.map((r) => (
        <button
          key={r._id}
          onClick={() => navigate(`/reports/${r._id}`)}
          className="group flex w-64 shrink-0 items-center justify-between gap-3 rounded-xl2 glass p-4 text-left transition-transform duration-200 hover:-translate-y-0.5 hover:border-surface-borderStrong"
        >
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs text-ink-faint">
              <FiClock className="h-3.5 w-3.5" />
              {formatDate(r.createdAt)}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">Interview report</p>
            <p className={`mt-0.5 text-xs font-semibold ${scoreTone(r.response?.matchScore)}`}>
              {r.response?.matchScore ?? "—"}% match
            </p>
          </div>
          <FiChevronRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
        </button>
      ))}
    </div>
  );
}

export default ReportHistory;
