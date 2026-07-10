import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}