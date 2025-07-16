import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/background.jpeg')`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Decorative background */}
      

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200 text-slate-600 text-sm font-medium mb-4 shadow-sm">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Trusted by 10,000+ sports enthusiasts
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
          Book Sports Turfs
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Seamlessly
          </span>
        </h1>

        <p className="text-2xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
          Players book. Owners manage.{" "}
         
        </p>



        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition shadow-lg"
          >
            Get Started
          </button>

         

          {(!user || user.role === "user") ? (
            <button
              onClick={() => navigate("/browse-turfs")}
              className="px-8 py-4 bg-emerald-500 border border-emerald-400 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition shadow-lg"
            >
              Browse Turfs
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-emerald-500 border border-emerald-400 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition shadow-lg"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200 text-slate-600 shadow-lg">
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