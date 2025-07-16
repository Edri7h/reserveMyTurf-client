import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
 ArrowLeft,
  Loader2,
  Calendar,
  Star,
  Map,
} from "lucide-react";
import axiosClient from "@/lib/axios";
import { Button } from "../ui/button";

interface Turf {
  _id: string;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  pricePerSlot: number;
  maxPlayers: number;
  images: string[];
  googleMapLink?: string;
  rating?: number;
  totalReviews?: number;
  createdAt: string;
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const StarRating: React.FC<{ rating?: number }> = ({ rating = 0 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : i < rating
          ? "fill-yellow-400/50 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
  return <div className="flex">{stars}</div>;
};

const BrowseTurfsPage: React.FC = () => {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axiosClient.get("/api/turfs");
        setTurfs(res.data.turfs || []);
      } catch (err) {
        console.error("Failed to fetch turfs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }
  // const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <Button className="px-4 " onClick={()=>navigate("/")}><ArrowLeft/>Back</Button>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8 text-center">
          Available Turfs
        </h2>

        {turfs.length === 0 ? (
          <p className="text-center text-gray-600">No active turfs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {turfs.map((turf) => (
              <div
                key={turf._id}
                className="bg-neutral-50 border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="h-48 bg-gray-100 relative">
                  {turf.images?.[0] ? (
                    <img
                      src={turf.images[0]}
                      alt={turf.name}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {turf.googleMapLink && (
                    <a
                      href={turf.googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                    >
                      <Map className="w-5 h-5 text-black" />
                    </a>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {turf.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {turf.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {formatTime(turf.openTime)} - {formatTime(turf.closeTime)}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      Max {turf.maxPlayers} players
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">
                        {formatPrice(turf.pricePerSlot)}
                      </span>
                      <span className="text-gray-500">per slot</span>
                    </div>
                    {turf.rating !== undefined && (
                      <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={turf.rating} />
                        {turf.totalReviews && (
                          <span className="text-xs text-gray-500">
                            ({turf.totalReviews})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/turf/${turf._id}`)}
                    className="w-full mt-2 py-2 text-white bg-black rounded-lg hover:opacity-90 transition"
                  >
                    <Calendar className="w-4 h-4 inline-block mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTurfsPage;
