import { useState } from "react";
import axiosClient from "../../lib/axios";
import { toast } from "sonner";
import { Loader2, SearchCheck } from "lucide-react";

interface VerifiedBooking {
  turf: string;
  date: string;
  slot: string;
  numPlayers: number;
  status: string;
  user: {
    name: string;
    email: string;
  };
}

const VerifyTicketPage = () => {
  const [ticketCode, setTicketCode] = useState("");
  const [booking, setBooking] = useState<VerifiedBooking | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const handleVerify = async () => {
    if (!ticketCode.trim()) {
      setVerificationError("Please enter a ticket code.");
      toast.warning("Please enter a ticket code.");
      return;
    }

    setLoading(true);
    setVerificationError(""); // reset any previous error
    setBooking(null); // clear previous booking

    try {
      const res = await axiosClient.post("/api/owner/verify-ticket", { ticketCode });
      setBooking(res.data.booking);
      toast.success("Ticket verified!");
    } catch (err: unknown) {
        const error = err as { response?: { data?: { msg?: string } } };
      const message = error?.response?.data?.msg || "Verification failed";
      setVerificationError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-neutral-900 mb-8">Verify Ticket</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-2">
        <input
          type="text"
          placeholder="Enter ticket code"
          value={ticketCode}
          onChange={(e) => {
            setTicketCode(e.target.value);
            setVerificationError(""); // clear error on input change
          }}
          className={`flex-1 px-4 py-3 border ${
            verificationError ? "border-red-500" : "border-neutral-300"
          } rounded-xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-black text-white px-5 py-3 rounded-xl text-base flex items-center gap-2 hover:bg-neutral-800 transition"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <SearchCheck className="w-4 h-4" />}
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {verificationError && (
        <p className="text-red-500 text-sm mt-1">{verificationError}</p>
      )}

      {booking && (
        <div className="bg-white border border-gray-400 rounded-2xl shadow-md p-6 mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{booking.turf}</h2>
            <p className="text-sm text-gray-950">Ticket verified successfully</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-800">
            <div>
                <p className="text-gray-500 mb-1">User Name</p>
              <p className="font-medium">{booking.user.name}</p>
             
            </div>
            <div>
                 <p className="text-gray-500 mb-1">User Email</p>
              <p className="font-medium">{booking.user.email}</p>
              
            </div>
            <div>
              <p className="text-gray-500 mb-1">Number of Players</p>
              <p className="font-medium">{booking.numPlayers}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <p
                className={`font-medium ${
                  booking.status === "booked" ? "text-green-600" : "text-red-500"
                }`}
              >
                {booking.status}
              </p>
            </div>
            <div>
               <p className="text-gray-500 mb-1">Date</p>
              <p className="font-medium">{booking.date}</p>
            </div>
            <div>
            <p className="text-gray-500 mb-1">Slot</p>
              <p className="font-medium">{booking.slot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyTicketPage;
