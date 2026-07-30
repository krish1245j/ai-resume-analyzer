import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import {
  FiFileText,
  FiUser,
  FiBriefcase,
  FiZap,
  FiCode,
  FiUsers,
  FiAlertOctagon,
  FiCalendar,
} from "react-icons/fi";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import SectionTitle from "../components/shared/SectionTitle";
import MatchScoreCard from "../components/report/MatchScoreCard";
import QuestionCard from "../components/report/QuestionCard";
import SkillGapCard from "../components/report/SkillGapCard";
import PreparationTimeline from "../components/report/PreparationTimeline";
import ReportSkeleton from "../components/report/ReportSkeleton";

function Dashboard() {
  const [resume, setResume] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const reportRef = useRef(null);
  const stepInterval = useRef(null);

  useEffect(() => {
    if (loading) {
      setActiveStep(0);
      stepInterval.current = setInterval(() => {
        setActiveStep((s) => (s < 3 ? s + 1 : s));
      }, 1400);
    } else {
      clearInterval(stepInterval.current);
    }
    return () => clearInterval(stepInterval.current);
  }, [loading]);

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [report]);

  async function generateReport() {
    try {
      setLoading(true);
      setReport(null);

      const res = await API.post("/interview/generate", {
        resume,
        selfDescription,
        jobDescription,
      });

      setReport(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  }

  const canGenerate = jobDescription.trim().length > 0 && !loading;

  return (
    <DashboardLayout>
      {/* Hero */}
      <section className="animate-fadeIn">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-borderStrong bg-surface-light px-3 py-1 text-xs font-medium text-brand-violetLight">
          <FiZap className="h-3.5 w-3.5" />
          AI Interview Analyzer
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Turn any job description into an
          <span className="text-gradient"> interview-ready plan.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-ink-faint">
          Paste your resume, a short self description, and the job you're targeting.
          Rovue scores the fit and builds your questions, gaps, and prep plan.
        </p>
      </section>

      {/* Inputs */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 animate-slideUp" style={{ animationDelay: "0ms" }}>
          <Textarea
            label="Resume"
            icon={FiFileText}
            placeholder="Paste your resume here"
            rows={12}
            maxLength={8000}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </Card>

        <Card className="p-6 animate-slideUp" style={{ animationDelay: "80ms" }}>
          <Textarea
            label="Self description"
            icon={FiUser}
            placeholder="Tell us about yourself"
            rows={12}
            maxLength={3000}
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
          />
        </Card>

        <Card className="p-6 animate-slideUp" style={{ animationDelay: "160ms" }}>
          <Textarea
            label="Job description"
            icon={FiBriefcase}
            placeholder="Paste the job description here"
            rows={12}
            maxLength={8000}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </Card>
      </section>

      {/* Generate CTA */}
      <section className="mt-8 flex flex-col items-center gap-3">
        <Button
          onClick={generateReport}
          disabled={!canGenerate}
          loading={loading}
          size="lg"
          icon={FiZap}
          className="w-full max-w-sm sm:w-auto"
        >
          {loading ? "Generating your report" : "Generate interview report"}
        </Button>
        {!jobDescription.trim() && (
          <p className="text-xs text-ink-faint">Add a job description to get started.</p>
        )}
      </section>

      {/* Loading state */}
      {loading && (
        <section className="mt-14">
          <ReportSkeleton activeStep={activeStep} />
        </section>
      )}

      {/* Report */}
      {report && !loading && (
        <div ref={reportRef} className="mt-16 space-y-16 scroll-mt-24">
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
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
