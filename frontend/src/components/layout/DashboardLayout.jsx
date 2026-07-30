import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="pointer-events-none fixed inset-0 bg-aurora opacity-60" />
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
