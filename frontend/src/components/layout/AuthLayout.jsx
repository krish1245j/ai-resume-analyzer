import { FiCpu, FiTarget, FiTrendingUp } from "react-icons/fi";
import Logo from "./Logo";

const features = [
  {
    icon: FiTarget,
    title: "Role-fit match score",
    description: "See exactly how your resume lines up against any job description.",
  },
  {
    icon: FiCpu,
    title: "AI-generated interview prep",
    description: "Technical and behavioural questions written around your real background.",
  },
  {
    icon: FiTrendingUp,
    title: "A day-by-day study plan",
    description: "Close your skill gaps with a preparation timeline built for the role.",
  },
];

function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-canvas">
      {/* Left: hero */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-surface-border px-12 py-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-aurora animate-drift" />
        <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-60" style={{ backgroundSize: "28px 28px, auto" }} />

        <div className="relative z-10">
          <Logo size="md" />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-4xl font-semibold leading-[1.15] text-ink">
            Walk into every interview
            <span className="text-gradient"> already prepared.</span>
          </h1>
          <p className="mt-4 text-base text-ink-faint">
            Paste your resume and a job description. Rovue reads both like a hiring
            manager would, then hands you the questions, gaps, and plan to close them.
          </p>

          <ul className="mt-10 space-y-5">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-surface-borderStrong bg-surface-light">
                  <Icon className="h-4.5 w-4.5 text-brand-violetLight" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{title}</p>
                  <p className="mt-0.5 text-sm text-ink-faint">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-ink-faint">
          Built for candidates who'd rather over-prepare than hope for the best.
        </p>
      </div>

      {/* Right: form card */}
      <div className="relative flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-40 lg:hidden" />
        <div className="mb-8 flex justify-center lg:hidden">
          <Logo />
        </div>
        <div className="relative z-10 w-full max-w-md animate-slideUp">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
