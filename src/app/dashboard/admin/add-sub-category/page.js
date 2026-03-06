/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  HiCloudUpload,
  HiTrash,
  HiPencil,
  HiPlus,
  HiX,
  HiCheckCircle,
} from "react-icons/hi";
import { useAuth } from "@/app/context/AuthContext";
import imageCompression from "browser-image-compression";
import "react-quill-new/dist/quill.snow.css";

// React Quill Dynamic Import
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-white animate-pulse rounded-xl border border--secondary/10" />
  ),
});

export default function SubCategoryManagement() {
  const { user } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Data States
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [serviceType, setServiceType] = useState("Both");
  const [selectedFile, setSelectedFile] = useState(null);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  // Initial Data Fetch
  const fetchData = async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        fetch(`${API_URL}/categories`),
        fetch(`${API_URL}/sub-categories`),
      ]);
      const cats = await catRes.json();
      const subs = await subRes.json();
      setCategories(cats.data || []);
      setSubCategories(subs.data || []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FAQ Handlers
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  // Image Upload logic (Cloudinary)
  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressed = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", "prime_solutions"); // Your preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/druw6dw7t/image/upload`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || (!isEditing && !selectedFile)) {
      return alert("Category and Image are required!");
    }

    setLoading(true);
    try {
      let imageData = isEditing ? isEditing.image : null;
      if (selectedFile) {
        imageData = await handleImageUpload(selectedFile);
      }

      const payload = {
        name,
        slug: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        description,
        category: selectedCategory,
        serviceType,
        image: imageData,
        faqs: faqs.filter((f) => f.question.trim() !== ""),
      };

      const url = isEditing
        ? `${API_URL}/sub-categories/${isEditing._id}`
        : `${API_URL}/sub-categories/add-sub-category`;

      const res = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-uid": user.firebaseUid,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        resetForm();
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (sub) => {
    setIsEditing(sub);
    setName(sub.name);
    setDescription(sub.description);
    setSelectedCategory(sub.category?._id || sub.category);
    setServiceType(sub.serviceType);
    setFaqs(
      sub.faqs && sub.faqs.length > 0
        ? sub.faqs
        : [{ question: "", answer: "" }],
    );
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will delete from Cloudinary too!"))
      return;
    try {
      const res = await fetch(`${API_URL}/sub-categories/${id}`, {
        method: "DELETE",
        headers: { "x-user-uid": user.firebaseUid },
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const resetForm = () => {
    setIsEditing(null);
    setName("");
    setDescription("");
    setSelectedCategory("");
    setServiceType("Both");
    setSelectedFile(null);
    setFaqs([{ question: "", answer: "" }]);
  };

  return (
    <div className="space-y-10 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text--foreground uppercase italic tracking-tighter">
            Sub-Category / Service
          </h2>
          <p className="text--secondary text-sm border-l-4 border-orange-600 pl-4 mt-2 italic">
            Manage global services with rich descriptions and FAQs.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg--accent/20 p-8 rounded-[40px] border border--secondary/10 space-y-8 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-orange-600 uppercase ml-1">
                  Service Title
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Water Extraction"
                  className="w-full bg--background p-4 rounded-2xl border border--secondary/20 text--foreground font-bold outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-orange-600 uppercase ml-1">
                  Parent Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg--background p-4 rounded-2xl border border--secondary/20 text--foreground outline-none focus:border-orange-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-orange-600 uppercase ml-1">
                Service Classification
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg--background p-4 rounded-2xl border border--secondary/20 text--foreground outline-none focus:border-orange-500"
              >
                <option value="Residential">Residential Only</option>
                <option value="Commercial">Commercial Only</option>
                <option value="Both">Both (Residential & Commercial)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-orange-600 uppercase ml-1">
                Featured Service Image
              </label>
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border--secondary/20 rounded-3xl cursor-pointer hover:bg-orange-600/5 transition-all group overflow-hidden">
                {selectedFile ? (
                  <div className="text-center">
                    <HiCheckCircle
                      size={30}
                      className="text-green-500 mx-auto"
                    />
                    <p className="text-[10px] mt-1 font-bold">
                      {selectedFile.name}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text--secondary">
                    <HiCloudUpload
                      size={30}
                      className="mx-auto mb-1 group-hover:text-orange-600"
                    />
                    <p className="text-[10px] font-black uppercase">
                      Upload Image
                    </p>
                  </div>
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

          {/* Right Column: Preview & FAQ */}
          <div className="space-y-6">
            <div className="h-44 bg--background rounded-3xl border border--secondary/10 overflow-hidden relative shadow-inner">
              {selectedFile || isEditing ? (
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : isEditing?.image?.url
                  }
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="h-full flex items-center justify-center text--secondary text-xs italic">
                  Image Preview
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-orange-600 uppercase ml-1">
                  Service FAQs
                </label>{" "}
                <button
                  type="button"
                  onClick={addFaq}
                  className="text-[10px] bg-blue-600/10 text-blue-600 px-3 py-1 rounded-lg font-black"
                >
                  + ADD
                </button>
              </div>
              <div className="max-h-52 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg--background p-4 rounded-2xl border border--secondary/10 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HiX />
                    </button>
                    <input
                      value={faq.question}
                      onChange={(e) =>
                        updateFaq(idx, "question", e.target.value)
                      }
                      placeholder="Question"
                      className="w-full bg-transparent border-b border--secondary/10 pb-2 mb-2 text-xs font-bold outline-none focus:border-orange-500"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                      placeholder="Answer"
                      className="w-full bg-transparent text-xs outline-none h-12"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-orange-600 uppercase ml-1">
            Main Description (Rich Text)
          </label>
          <div className="bg-white text-black rounded-3xl overflow-hidden shadow-xl">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="h-80 mb-12"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-10 py-4 bg--secondary/10 text--foreground rounded-2xl font-black"
            >
              CANCEL
            </button>
          )}
          <button
            disabled={loading}
            className={`flex-1 py-5 rounded-2xl font-black text-white uppercase tracking-widest shadow-2xl transition-all ${isEditing ? "bg-blue-600" : "bg-orange-600"}`}
          >
            {loading
              ? "Processing..."
              : isEditing
                ? "Update Service Information"
                : "Save Service Category"}
          </button>
        </div>
      </form>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subCategories.map((sub) => (
          <div
            key={sub._id}
            className="bg--accent/20 rounded-[35px] border border--secondary/10 overflow-hidden flex flex-col group"
          >
            <div className="h-44 relative overflow-hidden">
              <img
                src={sub.image?.url}
                alt={sub.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                  {sub.category?.name}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-black text--foreground uppercase leading-tight mb-2">
                {sub.name}
              </h3>
              <p className="text-[10px] text-blue-500 font-bold mb-4 uppercase tracking-widest">
                Type: {sub.serviceType}
              </p>
              <div className="mt-auto flex justify-between items-center pt-4 border-t border--secondary/10">
                <span className="text-[10px] text--secondary font-bold uppercase">
                  {sub.faqs?.length || 0} FAQs Added
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(sub)}
                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
