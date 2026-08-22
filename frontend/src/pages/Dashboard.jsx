import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import { FiFileText, FiUser, FiBriefcase, FiZap, FiClock } from "react-icons/fi";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import SectionTitle from "../components/shared/SectionTitle";
import ReportView from "../components/report/ReportView";
import ReportHistory from "../components/report/ReportHistory";
import ReportSkeleton from "../components/report/ReportSkeleton";

function Dashboard() {
  const [resume, setResume] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const reportRef = useRef(null);
  const stepInterval = useRef(null);

  async function fetchHistory() {
    try {
      setHistoryLoading(true);
      const res = await API.get("/interview");
      setHistory(res.data.reports || []);
    } catch (error) {
      console.log(error);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

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
      fetchHistory();
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

      {/* Past reports */}
      <section className="mt-10">
        <SectionTitle
          eyebrow="History"
          icon={FiClock}
          title="Past reports"
          description="Reopen a report you generated earlier."
        />
        <div className="mt-6">
          <ReportHistory reports={history} loading={historyLoading} />
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <section className="mt-14">
          <ReportSkeleton activeStep={activeStep} />
        </section>
      )}

      {/* Report */}
      {report && !loading && (
        <div ref={reportRef} className="mt-16 scroll-mt-24">
          <ReportView report={report} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
