import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API from "../api/axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ReportSkeleton from "../components/report/ReportSkeleton";
import ReportView from "../components/report/ReportView";

function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchReport() {
      try {
        setLoading(true);
        setError("");
        const res = await API.get(`/interview/${id}`);
        if (!cancelled) {
          setReport(res.data.report?.response ?? null);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(
            err.response?.data?.message || "Failed to load this report."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchReport();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to dashboard
      </button>

      {loading && <ReportSkeleton activeStep={3} />}

      {!loading && error && (
        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <p className="text-ink">{error}</p>
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </Button>
        </Card>
      )}

      {!loading && !error && report && <ReportView report={report} />}
    </DashboardLayout>
  );
}

export default ReportDetail;
