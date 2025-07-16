// import React, { useState,} from "react";
// import type {  ChangeEvent, FormEvent ,} from "react";
// import { toast } from "sonner";
// import { Loader2, X } from "lucide-react";
// import axiosClient from "@/lib/axios";

// interface TurfForm {
//   name: string;
//   location: string;
//   openTime: string;
//   closeTime: string;
//   pricePerSlot: string;
//   maxPlayers: string;
// }

// const CreateTurfPage: React.FC = () => {
//   const [form, setForm] = useState<TurfForm>({
//     name: "",
//     location: "",
//     openTime: "",
//     closeTime: "",
//     pricePerSlot: "",
//     maxPlayers: "",
//   });

//   const [images, setImages] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files) {
//     const newFiles = Array.from(e.target.files);
//     setImages((prev) => [...prev, ...newFiles]);
//   }
// };


//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!images.length) {
//       toast.error("Please upload at least one image");
//       return;
//     }

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       setLoading(true);
//       // Simulate API call
//        await axiosClient.post("/api/turfs/create", formData);
//       toast.success("Turf created successfully!");

//       setForm({
//         name: "",
//         location: "",
//         openTime: "",
//         closeTime: "",
//         pricePerSlot: "",
//         maxPlayers: "",
//       });
//       setImages([]);
//     } catch (err: unknown) {
//         const error = err as { response?: { data?: { msg?: string } } };
//       toast.error(error.response?.data?.msg||"Failed to create turf");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold text-gray-900 mb-2">Create New Turf</h1>
//           <p className="text-gray-600">Fill in the details to create a new turf</p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column */}
//             <div className="space-y-5">
//               {[
//                 { id: "name", label: "Turf Name", type: "text", placeholder: "e.g. Sunrise Turf" },
//                 { id: "location", label: "Location", type: "text", placeholder: "e.g. Andheri West" },
//                 { id: "openTime", label: "Opening Time", type: "time", placeholder: "" },
//               ].map(({ id, label, type, placeholder }) => (
//                 <div key={id}>
//                   <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
//                     {label}
//                   </label>
//                   <input
//                     id={id}
//                     name={id}
//                     type={type}
//                     value={form[id as keyof TurfForm]}
//                     onChange={handleChange}
//                     required
//                     placeholder={placeholder}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Right Column */}
//             <div className="space-y-5">
//               {[
//                 { id: "closeTime", label: "Closing Time", type: "time", placeholder: "" },
//                 { id: "pricePerSlot", label: "Price per Slot", type: "number", placeholder: "₹1000" },
//                 { id: "maxPlayers", label: "Max Players", type: "number", placeholder: "10" },
//               ].map(({ id, label, type, placeholder }) => (
//                 <div key={id}>
//                   <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
//                     {label}
//                   </label>
//                   <input
//                     id={id}
//                     name={id}
//                     type={type}
//                     value={form[id as keyof TurfForm]}
//                     onChange={handleChange}
//                     required
//                     min={type === "number" ? 0 : undefined}
//                     placeholder={placeholder}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="mt-8">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
//             <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
//               <label htmlFor="images" className="cursor-pointer text-blue-600 hover:underline">
//                 Click to upload or drag & drop
//               </label>
//               <input
//                 id="images"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <p className="text-sm text-gray-500 mt-2">JPG or PNG (Max 5MB each)</p>
//             </div>

//             {/* Preview */}
//             {images.length > 0 && (
//               <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
//                 {images.map((file, index) => (
//                   <div key={index} className="relative group">
//                     <div className="aspect-square rounded overflow-hidden border">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`preview-${index}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit */}
//           <div className="mt-8">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                   Creating Turf...
//                 </div>
//               ) : (
//                 "Create Turf"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTurfPage;



import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import axiosClient from "@/lib/axios";
import { useNavigate } from "react-router-dom";

interface TurfForm {
  name: string;
  location: string;
  pricePerSlot: string;
  maxPlayers: string;
  googleMapLink: string;
}

const CreateTurfPage: React.FC = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState<TurfForm>({
    name: "",
    location: "",
    pricePerSlot: "",
    maxPlayers: "",
    googleMapLink: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!images.length) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      await axiosClient.post("/api/turfs/create", formData);
      toast.success("Turf created successfully!");

      setForm({
        name: "",
        location: "",
        pricePerSlot: "",
        maxPlayers: "",
        googleMapLink: "",
      });
      setImages([]);
      navigate("/dashboard/turf")
    } catch (err: unknown) {
      const error = err as { response?: { data?: { msg?: string } } };
      toast.error(error.response?.data?.msg || "Failed to create turf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Create New Turf</h1>
          <p className="text-gray-600">Fill in the details to create a new turf</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-5">
              {[
                { id: "name", label: "Turf Name", type: "text", placeholder: "e.g. Sunrise Turf" },
                { id: "location", label: "Location", type: "text", placeholder: "e.g. Andheri West" },
                { id: "googleMapLink", label: "Google Map Link", type: "text", placeholder: "https://maps.google.com/..." },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={form[id as keyof TurfForm]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {[
                { id: "pricePerSlot", label: "Price per Slot", type: "number", placeholder: "₹1000" },
                { id: "maxPlayers", label: "Max Players", type: "number", placeholder: "10" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={form[id as keyof TurfForm]}
                    onChange={handleChange}
                    required
                    min={type === "number" ? 0 : undefined}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <label htmlFor="images" className="cursor-pointer text-neutral-600 hover:underline">
                Click to upload or drag & drop
              </label>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">JPG or PNG (Max 5MB each)</p>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded overflow-hidden border">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-400 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating Turf...
                </div>
              ) : (
                "Create Turf"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTurfPage;
