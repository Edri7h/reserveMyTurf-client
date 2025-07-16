import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { clearUser } from "../../redux/slice/userSlice";
import axiosClient from "../../lib/axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  // const [isLoggedIn, setUser] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axiosClient.post("/api/auth/logout");
      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { msg?: string } } };
      toast.error(error.response?.data?.msg || "Logout failed");
    } finally {
      setIsLoading(false);
      setShowDropdown(false);
    }
  };

  const name = user?.name?.split(" ")[0] ?? "";
  const userInitials =
    user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "";

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            ReserveMyTurf
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-full px-3 py-2 transition-all border border-gray-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{userInitials}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>

                      {user?.role === "owner" ? (
                        <Link to="/dashboard">
                          <button className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-50">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </button>
                        </Link>
                      ) : (
                        <Link to="/my-booking">
                          <button className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-50">
                            <Calendar className="w-4 h-4 mr-2" />
                            My Bookings
                          </button>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full px-4 py-2 flex items-center text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {isLoading ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <Link to="/login">
                    <Button variant="ghost" className="w-full text-left text-gray-700 hover:bg-blue-50">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-3 py-2 border-b border-gray-100 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{userInitials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                  </div>

                  {user?.role === "owner" ? (
                    <Link to="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/my-bookings">
                      <Button variant="ghost" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        My Bookings
                      </Button>
                    </Link>
                  )}

                  <Button
                    onClick={handleLogout}
                    disabled={isLoading}
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isLoading ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </nav>
  );
};

export default Navbar;
