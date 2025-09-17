import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/players">Players</Link>
          <Link to="/teams">Teams</Link>
        </nav>
      </header>

      {/* Main content (pages will be injected here) */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()} Joey Millaire - All rights reserved.
      </footer>
    </div>
  );
}
