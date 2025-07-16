import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    
  Loader2,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import axiosClient from "@/lib/axios";
import { Link } from "react-router-dom";

interface Turf {
  _id: string;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  pricePerSlot: number;
  maxPlayers: number;
  images: string[];
  createdAt: string;
  isActive: boolean;
  googleMapLink?: string;
}

const MyTurfsPage: React.FC = () => {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyTurfs();
  }, []);

  const fetchMyTurfs = async () => {
    try {
      setLoading(true);
      setError(null);
    //   const token = localStorage.getItem("token");

     const response = await axiosClient.get("/api/turfs/my", {
  withCredentials: true,
});
setTurfs(response.data.turfs || []);


      console.log("Fetched turfs:", response.data.turfs);

    //   setTurfs(response.data. || []);
    } catch (err) {
      console.error("Error fetching turfs:", err);
      setError("Failed to fetch turfs");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (turfId: string) => {
    console.log("Edit turf:", turfId);
    // e.g., navigate(`/owner/edit/${turfId}`);
  };

  const handleDelete = async (turfId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/turfs/${turfId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTurfs((prev) => prev.filter((t) => t._id !== turfId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete turf.");
    }
  };

  const toggleStatus = async (turfId: string) => {
    try {
      const token = localStorage.getItem("token");
      const turf = turfs.find((t) => t._id === turfId);
      if (!turf) return;

      await axios.patch(
        `/api/turfs/${turfId}/status`,
        { isActive: !turf.isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTurfs((prev) =>
        prev.map((t) =>
          t._id === turfId ? { ...t, isActive: !t.isActive } : t
        )
      );
    } catch (err) {
      console.error("Status toggle failed:", err);
      alert("Could not update status.");
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-gray-600">Loading your turfs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchMyTurfs}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">My Turfs</h1>
            {/* <p className="text-gray-600 mt-1">Manage your turf listings</p> */}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            <Link to ="create">Add New Turf</Link>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Turfs</p>
                <p className="text-2xl font-bold">{turfs.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Active Turfs</p>
                <p className="text-2xl font-bold">
                  {turfs.filter((t) => t.isActive).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold">
                  ₹
                  {Math.round(
                    turfs.reduce((sum, t) => sum + t.pricePerSlot, 0) /
                      turfs.length || 0
                  )}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Turf List */}
        {turfs.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No turfs found</h3>
            <p className="text-gray-600 mb-6">
              You haven't created any turfs yet. Start by adding your first turf.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Create Your First Turf
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {turfs.map((turf) => (
              <div
                key={turf._id}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-gray-100 relative">
                  {turf.images[0] ? (
                    <img
                      src={turf.images[0]}
                      alt={turf.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
                      turf.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {turf.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {turf.name}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {turf.location}
                    </div>
                    {/* {turf.googleMapLink && (
  <div className="flex items-center">
    <Globe className="w-4 h-4 mr-2 text-blue-600" />
    <a
      href={turf.googleMapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      View on Map
    </a>
  </div>
)} */}


                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatTime(turf.openTime)} - {formatTime(turf.closeTime)}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Max {turf.maxPlayers} players
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      ₹{turf.pricePerSlot} per slot
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3 text-sm">
                    <span className="text-gray-500">
                      Created {formatDate(turf.createdAt)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(turf._id)}
                        className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                          turf.isActive
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {turf.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleEdit(turf._id)}
                        className="p-1 text-gray-500 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(turf._id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTurfsPage;
