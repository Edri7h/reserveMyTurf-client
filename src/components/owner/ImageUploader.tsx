import { useRef, useState } from "react";
import { X } from "lucide-react";

const ImageUploader = () => {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).filter(
      (file) => file.size <= 5 * 1024 * 1024 // max 5MB
    );

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mt-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Images
      </label>

      <div
        onClick={openFilePicker}
        className="block border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
      >
        <div className="text-neutral-600">
          Tap here to select photos
        </div>
        <p className="text-sm text-gray-500 mt-2">
          JPG or PNG (Max 5MB each)
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

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
  );
};

export default ImageUploader;
