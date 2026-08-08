import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  UtensilsCrossed,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, role, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (role === "customer") return "/customer/dashboard";
    if (role === "owner") return "/owner/dashboard";
    if (role === "admin") return "/admin/dashboard";
    return "/";
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/restaurants", label: "Restaurants" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.png"
              alt="Dine Hub"
              className="h-20 w-20 object-contain group-hover:scale-110 transition-transform"
            />

            <div className="hidden sm:block">
              <span className="text-2xl font-bold text-primary">
                Dine
              </span>

              <span className="text-2xl font-bold text-gold">
                Hub
              </span>
            </div>
          </Link>

          {/* Desktop Links */}

          <div className="hidden md:flex items-center gap-2">

            {navLinks.map((link) => (

              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-xl text-gray-600 hover:text-primary hover:bg-gold/10 transition"
              >
                {link.label}
              </Link>

            ))}

          </div>

          {/* Desktop Right */}

          <div className="hidden md:flex items-center gap-3">

            {user ? (

              <div className="relative">

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-primary-dark font-medium hover:bg-gold/20 transition-colors"
                >
                  <User className="h-5 w-5 text-primary" />

                  <span className="capitalize">
                    {user.fullName || role}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (

                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border">

                    <Link
                      to={getDashboardLink()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gold/10 hover:text-primary transition-colors"
                    >
                      <UtensilsCrossed className="h-4 w-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-primary hover:bg-gold/10 transition-colors font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              <>

                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl text-primary font-semibold hover:bg-gold/10 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>

              </>

            )}

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {isOpen && (

        <div className="md:hidden bg-white border-t">

          <div className="px-4 py-4 space-y-2">

            {navLinks.map((link) => (

              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gold/10 hover:text-primary transition"
              >
                {link.label}
              </Link>

            ))}

            <div className="border-t pt-4 mt-4">

              {user ? (

                <>

                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:bg-gold/10 hover:text-primary transition"
                  >
                    <UtensilsCrossed className="h-5 w-5" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-primary hover:bg-gold/10 transition font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>

                </>

              ) : (

                <div className="flex flex-col gap-2">

                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center px-4 py-3 rounded-xl text-primary font-semibold hover:bg-gold/10 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary text-center"
                  >
                    Get Started
                  </Link>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;