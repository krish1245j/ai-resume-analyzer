import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Welcome back</h2>
        <p className="mt-1.5 text-sm text-ink-faint">
          Sign in to continue prepping for your next interview.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5" noValidate>
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

          <Input
            label="Password"
            type="password"
            icon={FiLock}
            autoComplete="current-password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="rounded-lg border border-signal-danger/30 bg-signal-dangerBg px-3.5 py-2.5 text-sm text-signal-danger">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-ink-dim">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-surface-borderStrong bg-surface-light accent-brand-violet"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => alert("Password reset isn't available yet — check back soon.")}
              className="text-brand-violetLight hover:text-brand-cyan transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} icon={FiArrowRight} className="w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-ink-faint">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-brand-violetLight hover:text-brand-cyan transition-colors">
            Create one
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}

export default Login;
