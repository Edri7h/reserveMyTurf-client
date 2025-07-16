import { NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Building2,
  CalendarDays,
  QrCode,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Home" },
  { to: "/dashboard/turf/create", icon: <PlusCircle className="w-5 h-5" />, label: "Create" },
  { to: "/dashboard/turf", icon: <Building2 className="w-5 h-5" />, label: "Turfs" },
  { to: "/dashboard/bookings", icon: <CalendarDays className="w-5 h-5" />, label: "Bookings" },
  { to: "/dashboard/verify", icon: <QrCode className="w-5 h-5" />, label: "Verify" },
];

const MobileBottomNavbar = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-full px-6 py-3 md:hidden">
      <div className="flex justify-between items-center">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            title={label}
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? "text-blue-600 bg-blue-100" : "text-gray-500"
              }`
            }
          >
            {icon}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNavbar;
