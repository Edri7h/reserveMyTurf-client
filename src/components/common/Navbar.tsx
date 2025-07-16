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
// import Hero from "./Hero";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axiosClient.post("/api/auth/logout",{withCredentials:true});
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
    <>
    <nav className="bg-transparent  top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-lg object-cover shadow-sm" src="logo.jpg" alt="Logo" />
            </div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              ReserveMyTurf
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 font-medium transition-all duration-200"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-3 bg-black/20 hover:bg-black/30 rounded-full px-4 py-2 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm">{userInitials}</span>
                    </div>
                    <span className="text-white font-medium drop-shadow-sm">{name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                          {user?.role}
                        </p>
                      </div>

                      {user?.role === "owner" ? (
                        <Link to="/dashboard">
                          <button className="w-full px-4 py-3 flex items-center text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 group">
                            <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500 group-hover:text-blue-600" />
                            Dashboard
                          </button>
                        </Link>
                      ) : (
                        <Link to="/my-booking">
                          <button className="w-full px-4 py-3 flex items-center text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 group">
                            <Calendar className="w-4 h-4 mr-3 text-gray-500 group-hover:text-blue-600" />
                            My Bookings
                          </button>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full px-4 py-3 flex items-center text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <LogOut className="w-4 h-4 mr-3 " />
                        {isLoading ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white shadow-xl rounded-xl mx-2 mt-2 w-14 ">
            <div className="px-4 pt-4 pb-4 space-y-3">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      className="w-full text-left text-slate-800 hover:bg-gray-100 justify-start font-medium"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm">{userInitials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-600 capitalize bg-gray-200 px-2 py-1 rounded-full mt-1 inline-block">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                  {user?.role === "owner" ? (
                    <Link to="/dashboard">
                      <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 text-gray-800">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/my-bookings">
                      <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 text-gray-800">
                        <Calendar className="w-4 h-4 mr-2" />
                        My Bookings
                      </Button>
                    </Link>
                  )}

                  <Button
                    onClick={handleLogout}
                    disabled={isLoading}
                    variant="ghost"
                    className="w-full justify-start hover:tex-red-50  rounded-md"
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

      {/* Overlay for dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </nav>
    
    </>
  );
};

export default Navbar;
