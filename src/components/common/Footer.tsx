import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">TurfBooker</h2>
          <p className="text-xs text-gray-400 mt-1">Book your game, not your time.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 text-xs">
          <Link to="/privacy" className="hover:text-blue-400 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-blue-400 transition">Terms</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} TurfBooker
        </div>
      </div>
    </footer>
  );
};

export default Footer;
