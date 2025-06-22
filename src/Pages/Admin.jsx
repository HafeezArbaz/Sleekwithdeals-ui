import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
    setPreviewUrls(acceptedFiles.map((file) => URL.createObjectURL(file)));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("drop", preventDefaults);
    window.addEventListener("dragover", preventDefaults);
    return () => {
      window.removeEventListener("drop", preventDefaults);
      window.removeEventListener("dragover", preventDefaults);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    images.forEach((image) => formData.append("images", image));

    try {
      const res = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("✅ Product submitted:", data);
      navigate("/");
    } catch (error) {
      console.error("❌ Error submitting product:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400">Add New Product</h2>

        {/* Product Name */}
        <div>
          <label className="block mb-1 text-sm">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 text-sm">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div
          {...getRootProps()}
          className={`transition-all duration-300 h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
            isDragActive
              ? "bg-gray-700 border-blue-400"
              : "bg-gray-800 hover:bg-gray-700 border-gray-600"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud size={40} className="text-blue-400 mb-2" />
          <p className="text-sm text-gray-300">
            {isDragActive ? "Drop the files here..." : "Drag & drop or click to upload"}
          </p>
        </div>

        {/* Image Preview */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                className="w-full h-32 object-cover rounded-md border border-gray-700 hover:scale-105 transition-transform"
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold transition-all w-full sm:w-auto"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
