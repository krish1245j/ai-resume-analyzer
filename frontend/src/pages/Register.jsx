import { useMemo, useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Weak", color: "bg-signal-danger" },
    { label: "Fair", color: "bg-signal-warning" },
    { label: "Good", color: "bg-brand-cyan" },
    { label: "Strong", color: "bg-signal-success" },
  ];

  const index = Math.max(0, Math.min(levels.length - 1, score - 1));
  return { score, ...levels[index] };
}

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      console.log(err.response);
      const message = err.response?.data?.message || "Register failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Create your account</h2>
        <p className="mt-1.5 text-sm text-ink-faint">
          A few details, then straight into your first report.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5" noValidate>
          <Input
            label="Username"
            icon={FiUser}
            autoComplete="username"
            placeholder="jane_doe"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            icon={FiMail}
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <Input
              label="Password"
              type="password"
              icon={FiLock}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <div className="mt-2.5">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i < strength.score ? strength.color : "bg-surface-borderStrong"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-ink-faint">
                  Password strength: <span className="font-medium text-ink-dim">{strength.label}</span>
                </p>
              </div>
            )}
          </div>

          {error && (
            <p className="rounded-lg border border-signal-danger/30 bg-signal-dangerBg px-3.5 py-2.5 text-sm text-signal-danger">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" loading={loading} icon={FiArrowRight} className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-ink-faint">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-brand-violetLight hover:text-brand-cyan transition-colors">
            Sign in
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}

export default Register;
