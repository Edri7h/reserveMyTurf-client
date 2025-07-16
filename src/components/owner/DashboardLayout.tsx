// import type { ReactNode } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  CheckCircle,
} from "lucide-react";
import Navbar from "../common/Navbar";
import MobileNavbar from "./MobileNavbar";

const navItems = [
  { to: "/dashboard", label: "Dashboard Home", icon: <LayoutDashboard className="w-4 h-4" /> },
  { to: "/dashboard/turf/create", label: "List New Turf", icon: <PlusCircle className="w-4 h-4" /> },
  { to: "/dashboard/turf", label: "My Turfs", icon: <Building2 className="w-4 h-4" /> },
  { to: "/dashboard/bookings", label: "Bookings", icon: <CalendarDays className="w-4 h-4" /> },
  { to: "/dashboard/verify", label: "Verify Ticket Code", icon: <CheckCircle className="w-4 h-4" /> },
];



export default function DashboardLayout() {
  const location = useLocation();

  return (
   <>
   <Navbar/>

    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 px-6 py-8 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Owner Panel</h1>

        <nav className="space-y-2 text-sm font-medium">
          {navItems.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {icon}
                {label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6"><Outlet/></main>
    </div>
    <MobileNavbar/>
   </>
  );
}
