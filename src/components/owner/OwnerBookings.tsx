import { useEffect, useState } from "react";
import axiosClient from "../../lib/axios";
import { Button } from "../ui/button";

interface Booking {
  _id: string;
  turfName: string;
  user: {
    name: string;
    email: string;
  };
  date: string;
  slot: string;
  status: string;
  ticketCode: string;
  createdAt: string;
}

const OwnerBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/owner/bookings?page=${pageNum}&limit=5`);
      setBookings(res.data.bookings);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(1);
  }, []);

  const handleNext = () => {
    if (page < totalPages) fetchBookings(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) fetchBookings(page - 1);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Turf Bookings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Turf</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Slot</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {bookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{b.turfName}</td>
                  <td className="px-4 py-3">{b.user.name}</td>
                  <td className="px-4 py-3">{b.user.email}</td>
                  <td className="px-4 py-3">{b.date}</td>
                  <td className="px-4 py-3">{b.slot}</td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === "booked"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">{b.ticketCode}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button onClick={handlePrev} disabled={page <= 1}>
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button onClick={handleNext} disabled={page >= totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerBookingsPage;
