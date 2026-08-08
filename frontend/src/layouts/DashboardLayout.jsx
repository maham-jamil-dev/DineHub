import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/AuthContext";

function DashboardLayout({ allowedRoles }) {

  const { user, role } = useAuth();

  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  const getTitle = () => {
    if (location.pathname.includes("/customer")) {
      return "Customer Portal";
    }

    if (location.pathname.includes("/owner")) {
      return "Owner Portal";
    }

    if (location.pathname.includes("/admin")) {
      return "Admin Portal";
    }

    return "Dashboard";
  };

  return (
    <div className="min-h-screen bg-cream flex">

      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">

          <div className="mb-6">

            <div className="flex items-center gap-3 mb-2">

              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />

              <h2 className="text-xl font-bold text-primary">
                {getTitle()}
              </h2>

            </div>

            <div className="h-0.5 bg-gradient-to-r from-primary via-gold to-transparent rounded-full"></div>

          </div>

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;