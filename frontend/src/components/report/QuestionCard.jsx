import { useState } from "react";
import { FiChevronDown, FiCompass, FiMessageSquare } from "react-icons/fi";
import Card from "../ui/Card";

function QuestionCard({ index, question, intention, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden animate-fadeIn" hover>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-surface-borderStrong bg-surface-light font-mono text-xs font-semibold text-brand-violetLight">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm font-medium leading-relaxed text-ink sm:text-base">{question}</p>
        </div>
        <FiChevronDown
          className={`mt-1 h-4.5 w-4.5 shrink-0 text-ink-faint transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-surface-border px-5 pb-5 pt-4 pl-[3.25rem]">
            {intention && (
              <div className="flex items-start gap-2.5">
                <FiCompass className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                    Interviewer intention
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">{intention}</p>
                </div>
              </div>
            )}
            {answer && (
              <div className="flex items-start gap-2.5">
                <FiMessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-signal-success" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                    Suggested answer
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">{answer}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default QuestionCard;
