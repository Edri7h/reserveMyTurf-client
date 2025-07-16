import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-teal-100 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-100 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 text-slate-600 text-sm font-medium mb-8 shadow-sm">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Trusted by 10,000+ sports enthusiasts
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
          Book Sports Turfs
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Seamlessly
          </span>
        </h1>

        <p className="text-2xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
          Players book. Owners manage.{" "}
         
        </p>



        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-16">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition"
          >
            Get Started
          </button>

          <a
            href="#features"
            className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-white transition"
          >
            Learn More
          </a>

          {(!user || user.role === "user") ? (
            <button
              onClick={() => navigate("/browse-turfs")}
              className="px-8 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-100 transition"
            >
              Browse Turfs
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-100 transition"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 text-slate-600 shadow-sm">
          <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span className="text-sm">Turf Owners get access to analytics and revenue insights</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
