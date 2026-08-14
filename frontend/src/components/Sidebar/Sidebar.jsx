import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  LayoutDashboard,
  ShoppingBag,
  ChefHat,
  UtensilsCrossed,
  BarChart3,
  Users,
  Building2,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Calendar,
  BookOpen,
} from "lucide-react";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { role, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // ============================
  // Customer Links
  // ============================

  const customerLinks = [
    {
      to: "/customer/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/customer/orders",
      icon: ShoppingBag,
      label: "My Orders",
    },
    {
      to: "/customer/reservations",
      icon: Calendar,
      label: "My Reservations",
    },
  ];

  // ============================
  // Owner Links
  // ============================

  const ownerLinks = [
    {
      to: "/owner/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/owner/restaurant",
      icon: Building2,
      label: "Restaurant",
    },
    {
      to: "/owner/menu",
      icon: UtensilsCrossed,
      label: "Menu",
    },
    {
      to: "/owner/reservations",
      icon: Calendar,
      label: "Reservations",
    },
    {
      to: "/owner/orders",
      icon: ShoppingBag,
      label: "Orders",
    },
    {
      to: "/owner/reviews",
      icon: FileText,
      label: "Reviews",
    },
    {
      to: "/owner/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
  ];

  // ============================
  // Admin Links
  // ============================

  const adminLinks = [
    {
      to: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/admin/users",
      icon: Users,
      label: "Users",
    },
    {
      to: "/admin/restaurants",
      icon: ChefHat,
      label: "Restaurants",
    },
    {
      to: "/admin/reservations",
      icon: Calendar,
      label: "Reservations",
    },
    {
      to: "/admin/blogs",
      icon: BookOpen,
      label: "Blogs",
    },
    {
      to: "/admin/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
    {
      to: "/admin/reports",
      icon: FileText,
      label: "Reports",
    },
  ];

  // ============================
  // Select Links According to Role
  // ============================

  const links =
    role === "admin"
      ? adminLinks
      : role === "owner"
      ? ownerLinks
      : customerLinks;

  // ============================
  // Logout
  // ============================

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* ============================
          Mobile Menu Button
      ============================ */}

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-primary text-white rounded-xl shadow-lg"
      >
        {mobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* ============================
          Mobile Overlay
      ============================ */}

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* ============================
          Sidebar
      ============================ */}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-40 flex flex-col transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ============================
            Logo
        ============================ */}

        <div className="p-6 border-b border-gray-100">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/logo.png"
              alt="DineHub Logo"
              className="h-12 w-12 object-contain"
            />

            <div>
              <span className="text-xl font-bold text-primary">
                Dine
              </span>

              <span className="text-xl font-bold text-gold">
                Hub
              </span>
            </div>
          </Link>
        </div>

        {/* ============================
            Navigation Links
        ============================ */}

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive =
              location.pathname === link.to ||
              location.pathname.startsWith(`${link.to}/`);

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-link ${
                  isActive ? "active" : ""
                }`}
              >
                <link.icon className="h-5 w-5" />

                <span>{link.label}</span>

                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ============================
            Logout
        ============================ */}

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary font-medium hover:bg-gold/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;