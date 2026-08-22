import { FiCode, FiUsers, FiAlertOctagon, FiCalendar } from "react-icons/fi";
import SectionTitle from "../shared/SectionTitle";
import MatchScoreCard from "./MatchScoreCard";
import QuestionCard from "./QuestionCard";
import SkillGapCard from "./SkillGapCard";
import PreparationTimeline from "./PreparationTimeline";

// Renders a full report. Used both for a freshly generated report
// and for a past report opened from history.
function ReportView({ report }) {
  if (!report) return null;

  return (
    <div className="space-y-16">
      <MatchScoreCard score={report.matchScore} />

      {Array.isArray(report.technicalQuestions) && report.technicalQuestions.length > 0 && (
        <section>
          <SectionTitle
            eyebrow="Prep"
            icon={FiCode}
            title="Technical questions"
            description="What an interviewer is likely to ask about how you build things."
          />
          <div className="mt-6 space-y-3">
            {report.technicalQuestions.map((q, i) => (
              <QuestionCard
                key={i}
                index={i}
                question={q.question}
                intention={q.intention}
                answer={q.answer}
              />
            ))}
          </div>
        </section>
      )}

      {Array.isArray(report.behavioralQuestions) && report.behavioralQuestions.length > 0 && (
        <section>
          <SectionTitle
            eyebrow="Prep"
            icon={FiUsers}
            title="Behavioral questions"
            description="How you've handled real situations — and how to talk about them."
          />
          <div className="mt-6 space-y-3">
            {report.behavioralQuestions.map((q, i) => (
              <QuestionCard
                key={i}
                index={i}
                question={q.question}
                intention={q.intention}
                answer={q.answer}
              />
            ))}
          </div>
        </section>
      )}

      {Array.isArray(report.skillGaps) && report.skillGaps.length > 0 && (
        <section>
          <SectionTitle
            eyebrow="Gaps"
            icon={FiAlertOctagon}
            title="Skill gaps"
            description="Areas the job description expects that your background doesn't fully cover yet."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {report.skillGaps.map((gap, i) => (
              <SkillGapCard key={i} skill={gap.skill} severity={gap.severity} />
            ))}
          </div>
        </section>
      )}

      {Array.isArray(report.preparationPlan) && report.preparationPlan.length > 0 && (
        <section>
          <SectionTitle
            eyebrow="Plan"
            icon={FiCalendar}
            title="Preparation plan"
            description="A day-by-day path to closing the gaps above before your interview."
          />
          <div className="mt-6">
            <PreparationTimeline days={report.preparationPlan} />
          </div>
        </section>
      )}
    </div>
  );
}

export default ReportView;
