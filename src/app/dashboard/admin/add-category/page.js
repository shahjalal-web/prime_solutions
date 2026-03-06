/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import {
  HiCloudUpload,
  HiTrash,
  HiPencil,
  HiX,
  HiCheckCircle,
} from "react-icons/hi";
import { useAuth } from "@/app/context/AuthContext";
import imageCompression from "browser-image-compression";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // Full object store korbo
  const { user } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLOUD_NAME = "druw6dw7t"; // Replace with your Cloudinary Cloud Name
  const UPLOAD_PRESET = "prime_solutions"; // Replace with your Unsigned Upload Preset

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Image Compress and Upload to Cloudinary
  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 0.2, // 200KB max size for faster loading
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
      console.error("Upload Error:", error);
      throw new Error("Image upload failed");
    }
  };

  // Handle Form Submit (Add/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !user?.firebaseUid) return;

    setLoading(true);
    try {
      // Step 1: Default image data (editing mode hole puronota thakbe)
      let imageData = isEditing ? isEditing.image : null;

      // Step 2: Notun file select korle seta age upload hobe
      if (selectedFile) {
        const uploaded = await handleImageUpload(selectedFile);
        // Eikhane logic-ti thik kora holo
        imageData = {
          url: uploaded.url,
          publicId: uploaded.publicId,
        };
      }

      // Step 3: Check kora imageData asholei ache kina
      if (!imageData || !imageData.url) {
        setLoading(false);
        return alert("Please upload an image");
      }

      const payload = {
        name,
        image: imageData, // Sora-sori object-ti pathiye din
      };

      const url = isEditing
        ? `${API_URL}/categories/${isEditing._id}`
        : `${API_URL}/categories/add-category`;

      const res = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-uid": user.firebaseUid,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setName("");
        setSelectedFile(null);
        setIsEditing(null);
        fetchCategories();
      } else {
        alert(result.message || "Failed to save category");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Process failed!");
    } finally {
      setLoading(false);
    }
  };

  // Start Edit Mode
  const startEdit = (cat) => {
    setIsEditing(cat);
    setName(cat.name);
    setSelectedFile(null); // Reset file selection on edit start
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure? This will delete the image from Cloudinary too!",
      )
    )
      return;

    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-uid": user.firebaseUid,
        },
      });

      if (res.ok) {
        fetchCategories();
      }
    } catch (error) {
      alert("Delete failed!");
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text--foreground uppercase italic tracking-tighter">
          Category Management
        </h2>
        <p className="text--secondary text-sm border-l-4 border-orange-600 pl-4 mt-2">
          Manage service categories and their visual representations.
        </p>
      </div>

      {/* Main Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg--accent/20 p-8 rounded-[40px] border border--secondary/10 grid grid-cols-1 lg:grid-cols-2 gap-10 shadow-sm"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] ml-1">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg--background border border--secondary/20 rounded-2xl py-4 px-6 outline-none focus:border-orange-500 text--foreground font-bold transition-all"
              placeholder="e.g. Water Damage Restoration"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] ml-1">
              Featured Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border--secondary/20 rounded-3xl cursor-pointer hover:bg-orange-600/5 transition-all group relative overflow-hidden">
              {selectedFile ? (
                <div className="text-center">
                  <HiCheckCircle
                    size={40}
                    className="text-green-500 mx-auto mb-2"
                  />
                  <span className="text-xs font-bold text--foreground">
                    {selectedFile.name}
                  </span>
                </div>
              ) : (
                <>
                  <HiCloudUpload
                    size={40}
                    className="text--secondary mb-2 group-hover:text-orange-600 transition-colors"
                  />
                  <span className="text-xs font-bold text--secondary uppercase tracking-widest text-center px-6">
                    Click to upload & compress
                  </span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Preview and Actions */}
        <div className="flex flex-col">
          <label className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-2 ml-1">
            Live Preview
          </label>
          <div className="flex-1 bg--background rounded-3xl border border--secondary/10 overflow-hidden relative shadow-inner flex items-center justify-center min-h-50">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : isEditing ? (
              <img
                src={isEditing.image?.url}
                className="w-full h-full object-cover"
                alt="Current"
              />
            ) : (
              <p className="text--secondary italic text-sm">
                No image selected
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setName("");
                  setSelectedFile(null);
                }}
                className="p-4 bg--secondary/10 text--foreground rounded-2xl hover:bg--secondary/20 transition-all"
              >
                <HiX size={24} />
              </button>
            )}
            <button
              disabled={loading}
              className={`flex-1 py-4 rounded-2xl font-black tracking-widest transition-all shadow-xl uppercase ${
                isEditing
                  ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                  : "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
              } text-white disabled:opacity-50`}
            >
              {loading
                ? "PROCESSING..."
                : isEditing
                  ? "UPDATE CATEGORY"
                  : "SAVE CATEGORY"}
            </button>
          </div>
        </div>
      </form>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg--accent/10 rounded-[40px] border border--secondary/10 overflow-hidden group hover:border-orange-600/30 transition-all shadow-sm"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={cat.image.url}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 pr-6">
                <h3 className="text-white font-black text-xl uppercase tracking-tighter leading-tight">
                  {cat.name}
                </h3>
              </div>
            </div>
            <div className="p-4 bg--background/50 backdrop-blur-md flex justify-end gap-2">
              <button
                onClick={() => startEdit(cat)}
                className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-2xl transition-all"
                title="Edit Category"
              >
                <HiPencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                title="Delete Category"
              >
                <HiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
