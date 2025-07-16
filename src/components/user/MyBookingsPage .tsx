import { useEffect, useState } from "react";
import axiosClient from "../../lib/axios";
import { Button } from "../ui/button";
import {toast} from "sonner"
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
interface Booking {
  _id: string;
  turfId: {
    name: string;
    location: string;
  };
  date: string;
  slot: string;
  ticketCode: string;
  status: string;
  createdAt: string;
}

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosClient.get("/api/bookings/user");
        setBookings(res.data.bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking= async (id:string)=>{
   try {
    const res= await axiosClient.put(`api/bookings/cancel/${id}`)
    toast.success(res.data.msg)

    const updatedBookings = bookings.map((booking)=>{
        if(booking._id===id){
            return {...booking,status:"cancelled"}
        }
        return booking;
    })

    setBookings(updatedBookings)
    
    
   } catch (error:unknown) {
    const err = error as {response:{data:{msg:string}}}
    toast.error(err.response.data.msg)
   }
  }
const navigate= useNavigate();
  return (
    <div className="p-6 max-w-6xl mx-auto">
       <Button className="px-4 mb-4" onClick={()=>navigate("/")}><ArrowLeft/>Back</Button>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Turf</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Slot</th>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Booked On</th>
                <th className="px-4 py-3 text-left text-red-500 ">Action</th>
                
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {bookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{b.turfId.name}</td>
                  <td className="px-4 py-3">{b.turfId.location}</td>
                  <td className="px-4 py-3">{b.date}</td>
                  <td className="px-4 py-3">{b.slot}</td>
                  <td className="px-4 py-3 font-mono">{b.ticketCode}</td>
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
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-500 ">
                     <Button  onClick={()=>{handleCancelBooking(b._id)}} variant={"outline"}> Cancel</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
