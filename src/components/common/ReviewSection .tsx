import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Aman Verma",
    role: "Turf User",
    rating: 5,
    comment: "Super easy to book! I found a nearby turf, picked a slot, and paid in under a minute. Loved the clean UI!",
  },
  {
    name: "Ritika Sharma",
    role: "Turf Owner",
    rating: 4,
    comment: "Managing bookings on my dashboard is smooth. The verification with ticket codes is a great touch!",
  },
  {
    name: "Siddharth Rao",
    role: "Turf User",
    rating: 5,
    comment: "The availability system works great. I like how I can see only the open 2-hour slots and book instantly.",
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-transparent py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
        <p className="text-gray-600 mb-10">
          Whether you're booking a game or managing your turf, people love using ReserveMyTurf!
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <Card key={idx} className="shadow-md hover:shadow-lg transition rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base text-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm font-normal text-gray-600">{review.comment}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 mt-4 border-t">
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-500">{review.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
