import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import API from "../../api/axios";

function Navbar() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await API.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setLoggingOut(false);
      navigate("/");
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-surface-border bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-dim transition-colors hover:bg-white/5 hover:text-ink disabled:opacity-60"
        >
          <FiLogOut className="h-4 w-4" />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
