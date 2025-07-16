import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../lib/axios";
import { toast } from "sonner";

interface Turf {
  _id: string;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  images: string[];
  maxPlayers: number;
  pricePerSlot: number;
  googleMapLink: string;
  ownerId: {
    name: string;
    email: string;
  };
}

interface AvailabilityResponse {
  turfId: string;
  date: string;
  allSlots: string[];
  bookedSlots: string[];
}

const TurfDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [turf, setTurf] = useState<Turf | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date();

  // Fetch turf details
  useEffect(() => {
    if (!id) return;
    const fetchTurf = async () => {
      try {
        const res = await axiosClient.get(`/api/turfs/${id}`);
        setTurf(res.data);
      } catch (err) {
        console.error("Failed to fetch turf:", err);
      }
    };
    fetchTurf();
  }, [id]);

  // Fetch slot availability
  const fetchAvailability = useCallback(async () => {
  try {
    const res = await axiosClient.get("/api/bookings/availability", {
      params: { turfId: id, date: selectedDate },
    });
    setAvailability(res.data);
  } catch (err) {
    console.error("Error fetching availability:", err);
  }
}, [id, selectedDate]); // dependencies used inside the function

useEffect(() => {
  if (!selectedDate || !id) return;
  fetchAvailability();
}, [fetchAvailability, selectedDate, id]);

  const isSlotInPast = (slot: string) => {
    if (selectedDate !== todayDate) return false;

    const [start] = slot.split("–");
    const [slotHour, slotMinute] = start.split(":").map(Number);
    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(slotHour, slotMinute, 0, 0);

    return slotDateTime < currentTime;
  };

 const handleBookNow = async () => {
  if (!turf || !selectedSlot || !selectedDate || numPlayers < 1) return;

  try {
    setLoading(true);
    const bookingPayload = {
      turfId: turf._id,
      date: selectedDate,
      slot: selectedSlot,
      numPlayers,
    };
     await axiosClient.post("/api/bookings/create", bookingPayload);
    toast.success(` Booking successful! Ticket Sent to your Email`);
    setSelectedSlot(null);
    await fetchAvailability(); // 🔥 Refresh slot availability
  } catch (err: unknown) {
    const error = err as { response?: { data?: { msg?: string } } };
    toast.error(error?.response?.data?.msg || "Booking failed");
  } finally {
    setLoading(false);
  }
};


  if (!turf) return <div className="p-4">Loading turf...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{turf.name}</h1>
      <p className="text-gray-600 mb-1">📍 {turf.location}</p>
      <p className="text-sm text-gray-500 mb-4">
        Open: {turf.openTime} | Close: {turf.closeTime}
      </p>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {turf.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Turf ${idx}`}
            className="rounded-lg w-full h-48 object-cover"
          />
        ))}
      </div>

      {/* Owner */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Owner Info</h2>
        <p>Name: {turf.ownerId.name}</p>
        <p>Email: {turf.ownerId.email}</p>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label htmlFor="date" className="block font-medium mb-1">Select a date:</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          min={todayDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot(null);
          }}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Players */}
      <div className="mb-6">
        <label htmlFor="players" className="block font-medium mb-1">
          Number of players (max {turf.maxPlayers}):
        </label>
        <input
          id="players"
          type="number"
          value={numPlayers}
          min={1}
          max={turf.maxPlayers}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
          className="border rounded px-3 py-2 w-32"
        />
      </div>

      {/* Slots */}
      {availability && (
        <>
          <h2 className="text-lg font-semibold mb-2">
            Available Slots for {selectedDate}
          </h2>

         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
  {availability.allSlots.map((slot) => {
    const isBooked = availability.bookedSlots.includes(slot);
    const isPast = isSlotInPast(slot);
    const isSelected = selectedSlot === slot;
    const disabled = isBooked || isPast;

    return (
      <button
        key={slot}
        disabled={disabled}
        onClick={() => setSelectedSlot(slot)}
        className={`px-4 py-2 rounded font-medium border text-sm transition
          ${
            isBooked
              ? "bg-red-500 text-white cursor-not-allowed"
              : isPast
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : isSelected
              ? "bg-blue-600 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }
        `}
      >
        {slot} {isBooked ? " (Not Available)" : isPast ? " (Not Available)" : ""}
      </button>
    );
  })}
</div>


          {/* Summary */}
          {selectedSlot && (
            <p className="mb-4 text-green-700 font-semibold">
              Selected Slot: {selectedSlot} | Players: {numPlayers}
            </p>
          )}

          <button
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
            disabled={
              !selectedSlot ||
              numPlayers < 1 ||
              numPlayers > turf.maxPlayers ||
              loading
            }
            onClick={handleBookNow}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default TurfDetailsPage;
// import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosClient from "../../lib/axios";
// import { toast } from "sonner";
// import {
//   MapPin,
//   Clock,
//   UserCircle,
//   Mail,
//   CalendarDays,
//   Plus,
//   Minus,
//   Users,
//   CheckCircle,
// } from "lucide-react";

// interface Turf {
//   _id: string;
//   name: string;
//   location: string;
//   openTime: string;
//   closeTime: string;
//   images: string[];
//   maxPlayers: number;
//   pricePerSlot: number;
//   googleMapLink: string;
//   ownerId: {
//     name: string;
//     email: string;
//   };
// }

// interface AvailabilityResponse {
//   turfId: string;
//   date: string;
//   allSlots: string[];
//   bookedSlots: string[];
// }

// const TurfDetailsPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [turf, setTurf] = useState<Turf | null>(null);
//   const [selectedDate, setSelectedDate] = useState(() =>
//     new Date().toISOString().split("T")[0]
//   );
//   const [availability, setAvailability] = useState<AvailabilityResponse | null>(
//     null
//   );
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
//   const [numPlayers, setNumPlayers] = useState<number>(1);
//   const [loading, setLoading] = useState(false);

//   const todayDate = new Date().toISOString().split("T")[0];
//   const currentTime = new Date();

//   useEffect(() => {
//     if (!id) return;
//     const fetchTurf = async () => {
//       try {
//         const res = await axiosClient.get(`/api/turfs/${id}`);
//         setTurf(res.data);
//       } catch (err) {
//         console.error("Failed to fetch turf:", err);
//       }
//     };
//     fetchTurf();
//   }, [id]);

//   const fetchAvailability = useCallback(async () => {
//     try {
//       const res = await axiosClient.get("/api/bookings/availability", {
//         params: { turfId: id, date: selectedDate },
//       });
//       setAvailability(res.data);
//     } catch (err) {
//       console.error("Error fetching availability:", err);
//     }
//   }, [id, selectedDate]);

//   useEffect(() => {
//     if (!selectedDate || !id) return;
//     fetchAvailability();
//   }, [fetchAvailability, selectedDate, id]);

//   const isSlotInPast = (slot: string) => {
//     if (selectedDate !== todayDate) return false;
//     const [start] = slot.split("–");
//     const [slotHour, slotMinute] = start.split(":").map(Number);
//     const slotDateTime = new Date(selectedDate);
//     slotDateTime.setHours(slotHour, slotMinute, 0, 0);
//     return slotDateTime < currentTime;
//   };

//   const handleBookNow = async () => {
//     if (!turf || !selectedSlot || !selectedDate || numPlayers < 1) return;
//     try {
//       setLoading(true);
//       const bookingPayload = {
//         turfId: turf._id,
//         date: selectedDate,
//         slot: selectedSlot,
//         numPlayers,
//       };
//       const res = await axiosClient.post("/api/bookings/create", bookingPayload);
//       toast.success(`Booking successful! Ticket: ${res.data.booking.ticketCode}`);
//       setSelectedSlot(null);
//       await fetchAvailability();
//     } catch (err: unknown) {
//       const error = err as {response:{data:{msg:string}}}
//       toast.error(error?.response?.data?.msg || "Booking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!turf)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-lg text-gray-600 font-medium">Loading turf...</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">{turf.name}</h1>
//           <div className="flex justify-center items-center gap-2 text-gray-600">
//             <MapPin className="w-5 h-5" />
//             <span>{turf.location}</span>
//           </div>
//           <div className="flex justify-center gap-4 text-sm text-gray-500 mt-2">
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> {turf.openTime}
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" /> {turf.closeTime}
//             </span>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           {turf.images.map((img, idx) => (
//             <div key={idx} className="aspect-video overflow-hidden rounded-md border bg-gray-200">
//               <img
//                 src={img}
//                 alt={`Turf ${idx}`}
//                 loading="lazy"
//                 onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Owner Info */}
//         <div className="bg-white p-6 rounded-md shadow border mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <UserCircle className="w-6 h-6" /> Owner Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//             <div className="flex items-center gap-2">
//               <UserCircle className="w-5 h-5" />
//               {turf.ownerId.name}
//             </div>
//             <div className="flex items-center gap-2">
//               <Mail className="w-5 h-5" />
//               {turf.ownerId.email}
//             </div>
//           </div>
//         </div>

//         {/* Booking Section */}
//         <div className="bg-white p-6 rounded-md shadow border">
//           <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Book Your Slot</h2>

//           {/* Date Picker */}
//           <div className="mb-6">
//             <label className=" font-medium mb-1 text-gray-700 flex items-center gap-2">
//               <CalendarDays className="w-5 h-5" />
//               Select a date:
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               min={todayDate}
//               onChange={(e) => {
//                 setSelectedDate(e.target.value);
//                 setSelectedSlot(null);
//               }}
//               className="border px-4 py-2 rounded w-full md:w-auto bg-white"
//             />
//           </div>

//           {/* Player Count */}
//           <div className="mb-6">
//             <label className=" font-medium mb-1 text-gray-700 flex items-center gap-2">
//               <Users className="w-5 h-5" />
//               Number of players (max {turf.maxPlayers}):
//             </label>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setNumPlayers(Math.max(1, numPlayers - 1))}
//                 className="px-3 py-2 bg-gray-200 rounded"
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <input
//                 type="number"
//                 value={numPlayers}
//                 min={1}
//                 max={turf.maxPlayers}
//                 onChange={(e) => setNumPlayers(Number(e.target.value))}
//                 className="w-16 text-center border rounded px-3 py-2"
//               />
//               <button
//                 onClick={() => setNumPlayers(Math.min(turf.maxPlayers, numPlayers + 1))}
//                 className="px-3 py-2 bg-gray-200 rounded"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Slots */}
//           {availability && (
//             <>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Available Slots for {selectedDate}
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
//                 {availability.allSlots.map((slot) => {
//                   const isBooked = availability.bookedSlots.includes(slot);
//                   const isPast = isSlotInPast(slot);
//                   const isSelected = selectedSlot === slot;
//                   const disabled = isBooked || isPast;

//                   return (
//                     <button
//                       key={slot}
//                       onClick={() => setSelectedSlot(slot)}
//                       disabled={disabled}
//                       className={`border rounded-md px-4 py-2 text-sm font-medium ${
//                         disabled
//                           ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                           : isSelected
//                           ? "bg-black text-white"
//                           : "bg-white text-gray-800"
//                       }`}
//                     >
//                       {slot}
//                       {(isBooked || isPast) && (
//                         <div className="text-xs mt-1 text-gray-500">Not Available</div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Booking Summary */}
//               {selectedSlot && (
//                 <div className="bg-gray-100 border rounded-md p-4 mb-6">
//                   <h4 className="font-medium text-gray-800 mb-2">Booking Summary</h4>
//                   <div className="flex flex-wrap gap-4 text-sm text-gray-700">
//                     <span>Slot: <strong>{selectedSlot}</strong></span>
//                     <span>Players: <strong>{numPlayers}</strong></span>
//                     <span>Price: <strong>₹{turf.pricePerSlot}</strong></span>
//                   </div>
//                 </div>
//               )}

//               {/* Book Now Button */}
//               <button
//                 disabled={
//                   !selectedSlot || numPlayers < 1 || numPlayers > turf.maxPlayers || loading
//                 }
//                 onClick={handleBookNow}
//                 className={`w-full py-3 rounded-md text-white font-semibold flex items-center justify-center gap-2 ${
//                   !selectedSlot || loading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-black"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
//                     Booking...
//                   </div>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-5 h-5" />
//                     Book Now
//                   </>
//                 )}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TurfDetailsPage;
