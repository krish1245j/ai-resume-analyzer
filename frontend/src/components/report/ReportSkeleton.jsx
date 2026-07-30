import Card from "../ui/Card";

const steps = [
  "Reading your resume",
  "Comparing against the job description",
  "Drafting interview questions",
  "Building your preparation plan",
];

function ReportSkeleton({ activeStep = 0 }) {
  return (
    <div className="animate-fadeIn space-y-8">
      <Card className="p-8">
        <div className="flex flex-wrap items-center gap-3">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
                i <= activeStep
                  ? "border-brand-violetLight/50 bg-brand-violet/10 text-brand-violetLight"
                  : "border-surface-borderStrong text-ink-faint"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  i <= activeStep ? "bg-brand-violetLight" : "bg-ink-faint"
                }`}
              />
              {step}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-center">
        <div className="h-40 w-40 rounded-full skeleton animate-shimmer" style={{ borderRadius: "9999px" }} />
      </div>

      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 rounded-xl2 skeleton animate-shimmer" />
        ))}
      </div>
    </div>
  );
}

export default ReportSkeleton;
