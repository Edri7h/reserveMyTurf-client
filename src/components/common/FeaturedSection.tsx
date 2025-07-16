import React from "react";
import {
  Users,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <CalendarDays className="w-7 h-7 text-blue-600" />,
    title: "Easy Booking",
    desc: "Book 2-hour slots instantly. No calls, no hassle.",
  },
  {
    icon: <Users className="w-7 h-7 text-green-600" />,
    title: "Group Friendly",
    desc: "Book for your whole team or group with just one ticket.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-purple-600" />,
    title: "Verified Turf Owners",
    desc: "All owners are verified for a secure experience.",
  },
];

const FeaturedSection: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose TurfBooker?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-xl shadow-sm text-center hover:shadow-md transition-all"
            >
              <div className="mb-3 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
