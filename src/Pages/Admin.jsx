import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

const Admin = () => {
  const [files, setFiles] = useState([]); // each: { file, preview }
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const removeFile = (idx) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  useEffect(() => {
    const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
      files.forEach((f) => URL.revokeObjectURL(f.preview)); // cleanup on unmount
    };
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("sub_category", subCategory);
    files.forEach((f) => formData.append("images", f.file));

    try {
      const res = await fetch("https://sleekwithdeals.onrender.com/products", {
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

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Sub‑Category */}
        <div>
          <label className="block mb-1 text-sm">Sub‑Category</label>
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
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
          />
        </div>

        {/* Image Upload */}
        <div
          {...getRootProps()}
          className={`transition-all duration-300 h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
            isDragActive ? "bg-gray-700 border-blue-400" : "bg-gray-800 hover:bg-gray-700 border-gray-600"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud size={40} className="text-blue-400 mb-2" />
          <p className="text-sm text-gray-300">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop or click to upload images"}
          </p>
        </div>

        {/* Previews with Remove */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {files.map((f, idx) => (
              <div key={idx} className="relative">
                <img
                  src={f.preview}
                  alt={`preview-${idx}`}
                  className="w-full h-32 object-cover rounded-md border border-gray-700 hover:scale-105 transition-transform"
                />
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
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
