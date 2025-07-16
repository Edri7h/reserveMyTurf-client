import type { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const user = useSelector((state: RootState)=>state.user.user)

  useEffect(() => {
    setIsVisible(true);
    type MouseEvent = {
      clientX: number;
      clientY: number;
    };
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating cursor effect */}
      <div 
        className="absolute pointer-events-none opacity-20 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        {/* Header content */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Whether you're a player looking to book a slot or an owner managing your turfs — 
            <span className="font-semibold text-slate-700"> TurfBooker</span> gives you the control you need.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 flex-wrap mb-16">
            <button
              onClick={() => window.location.href = '/login'}
              className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <a
              href="#features"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-white hover:shadow-lg hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Learn More
            </a>
            
           {
            !user || user.role === 'user' ?(
               <button
              onClick={() => window.location.href = '/browse-turfs'}
              className="px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:from-emerald-100 hover:to-teal-100 hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Turfs
            </button>
            ) :(
              <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 rounded-2xl font-semibold hover:from-emerald-100 hover:to-teal-100 hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Dashboard
            </button>
            )
           }
          </div>
        </div>

        {/* Feature cards */}
        

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 text-slate-600 shadow-sm">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="text-sm">Turf Owners get access to comprehensive analytics and revenue insights</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;