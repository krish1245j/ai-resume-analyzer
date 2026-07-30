import { FiCheck } from "react-icons/fi";
import Card from "../ui/Card";

function PreparationTimeline({ days = [] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-violet/60 via-surface-borderStrong to-transparent sm:left-6" />

      <ol className="space-y-6">
        {days.map((day, i) => (
          <li key={day.day ?? i} className="relative flex gap-4 pl-0 animate-fadeIn">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface-borderStrong bg-canvas font-mono text-sm font-semibold text-brand-violetLight sm:h-12 sm:w-12">
              {day.day}
            </div>

            <Card className="flex-1 p-5" hover>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-cyan">
                Day {day.day}
              </p>
              <h4 className="mt-1 text-base font-medium text-ink">{day.focus}</h4>

              {Array.isArray(day.tasks) && day.tasks.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {day.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-dim">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal-success" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default PreparationTimeline;
