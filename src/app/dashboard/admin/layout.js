import AdminGuard from "../../components/admin/AdminGurd";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg--background transition-colors duration-500 pt-10">
        {/* Fixed Sidebar */}
        <aside className="w-64 fixed inset-y-0 left-0 z-50 bg--accent/20 border-r border--secondary/10 backdrop-blur-md">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* Dynamic Pages */}
          <main className="p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
