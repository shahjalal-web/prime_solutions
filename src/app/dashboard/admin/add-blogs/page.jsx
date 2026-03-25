/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression"; // Image compression library
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCloudUpload, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext"
import 'react-quill-new/dist/quill.snow.css';

export default function BlogAdmin() {
    const { user } = useAuth();

    const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), {
        ssr: false,
        loading: () => <div className="h-64 bg-accent/20 animate-pulse rounded-2xl" />
    }), []);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(null);

    const [formData, setFormData] = useState({
        title: "", content: "", category: "", subCategory: ""
    });

    const [faqs, setFaqs] = useState([]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const CLOUD_NAME = "druw6dw7t";
    const UPLOAD_PRESET = "prime_solutions";

    // Fetch initial data
    const fetchInitialData = async () => {
        try {
            const [catRes, blogRes] = await Promise.all([
                fetch(`${API_URL}/categories`),
                fetch(`${API_URL}/blogs`)
            ]);
            const cats = await catRes.json();
            const bgs = await blogRes.json();
            setCategories(cats.data || []);
            setBlogs(bgs.data || []);
        } catch (err) {
            toast.error("Failed to load initial data");
        }
    };

    useEffect(() => { fetchInitialData(); }, [API_URL]);

    // Fetch sub-categories based on category selection
    useEffect(() => {
        if (formData.category) {
            fetch(`${API_URL}/sub-categories?category=${formData.category}`)
                .then(res => res.json())
                .then(d => setSubCategories(d.data || []));
        }
    }, [formData.category, API_URL]);

    // handleImageUpload function-ti update korun jate object return kore
    const handleImageUpload = async (file) => {
        const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const data = new FormData();
            data.append("file", compressedFile);
            data.append("upload_preset", UPLOAD_PRESET);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: data,
            });
            const result = await res.json();

            // Model er sathe match rakhte Object return korte hobe
            return {
                url: result.secure_url,
                publicId: result.public_id
            };
        } catch (error) {
            console.error("Upload Error:", error);
            throw new Error("Image upload failed");
        }
    };

    // FAQ handlers
    const addFaq = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
    };

    const removeFaq = (index) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const updateFaq = (index, field, value) => {
        const updated = [...faqs];
        updated[index][field] = value;
        setFaqs(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.firebaseUid) return toast.error("Unauthorized");

        setLoading(true);
        try {
            // Step 1: Handle Image Data
            let imageData = isEditing ? isEditing.image : null;
            if (selectedFile) {
                imageData = await handleImageUpload(selectedFile);
            }

            if (!imageData || !imageData.url) {
                setLoading(false);
                return toast.error("Please upload an image");
            }

            // Step 2: Slug generation
            const slug = formData.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

            // Step 3: Filter out empty FAQs
            const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

            // Step 4: Payload construction (Image should be an object)
            const payload = {
                ...formData,
                image: imageData, // {url, publicId}
                slug,
                faqs: validFaqs
            };

            const url = isEditing
                ? `${API_URL}/blogs/${isEditing._id}`
                : `${API_URL}/blogs`;

            const res = await fetch(url, {
                method: isEditing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-uid": user.firebaseUid
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (res.ok) {
                toast.success(isEditing ? "Blog Updated!" : "Blog Published!");
                setFormData({ title: "", content: "", category: "", subCategory: "" });
                setFaqs([]);
                setSelectedFile(null);
                setIsEditing(null);
                fetchInitialData();
            } else {
                // Error message backend theke asha console e check korun
                toast.error(result.message || "Server side validation failed");
                console.log("Backend Error Details:", result);
            }
        } catch (err) {
            toast.error("Process failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`${API_URL}/blogs/${id}`, {
                method: "DELETE",
                headers: { "x-user-uid": user.firebaseUid }
            });
            if (res.ok) {
                toast.success("Blog Deleted");
                fetchInitialData();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    // Edit button handler - fixes category/subCategory/title not showing
    const handleEdit = async (blog) => {
        const categoryId = blog.category?._id || blog.category || "";
        const subCategoryId = blog.subCategory?._id || blog.subCategory || "";

        setIsEditing(blog);

        // First set category to trigger subcategory fetch
        setFormData({
            title: blog.title || "",
            content: blog.content || "",
            category: categoryId,
            subCategory: "" // temporarily empty, will set after subcategories load
        });

        // Load FAQs from blog
        setFaqs(blog.faqs && blog.faqs.length > 0 ? blog.faqs.map(f => ({ question: f.question, answer: f.answer })) : []);

        // Fetch subcategories for this category, then set the subCategory value
        if (categoryId) {
            try {
                const res = await fetch(`${API_URL}/sub-categories?category=${categoryId}`);
                const d = await res.json();
                setSubCategories(d.data || []);
                // Now set subCategory after subcategories are loaded
                setFormData(prev => ({ ...prev, subCategory: subCategoryId }));
            } catch (err) {
                console.error("Failed to load subcategories for edit:", err);
            }
        }

        window.scrollTo(0, 0);
    };

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-10 text-foreground">
                Editorial <span className="text-primary">Panel</span>
            </h1>

            {/* Form Section */}
            <div className="bg-card p-10 rounded-[40px] border border-border shadow-sm mb-16">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <input
                            required
                            placeholder="Blog Title"
                            className="bg-background border border-border p-5 rounded-2xl outline-none font-bold text-foreground focus:border-primary transition-colors"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />

                        <div className="flex gap-4">
                            <select
                                required
                                className="w-1/2 bg-gray-500 border border-border p-5 rounded-2xl outline-none font-bold text-white"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
                            >
                                <option value="">Category</option>
                                {categories?.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <select
                                required
                                className="w-1/2 bg-gray-600 border border-border p-5 rounded-2xl outline-none font-bold text-white disabled:opacity-50"
                                value={formData.subCategory}
                                onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                                disabled={!formData.category}
                            >
                                <option value="">Sub Category</option>
                                {subCategories?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-background p-4 rounded-2xl border border-border">
                        <label className="flex items-center gap-4 cursor-pointer">
                            <HiOutlineCloudUpload size={30} className="text-primary" />
                            <div className="flex flex-col">
                                <span className="text-foreground font-bold">{selectedFile ? selectedFile.name : "Upload Feature Image"}</span>
                                <span className="text-[10px] text-secondary uppercase font-black tracking-widest">Supports optimized JPG/PNG</span>
                            </div>
                            <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files[0])} accept="image/*" />
                        </label>
                    </div>

                    <div className="h-96 mb-12">
                        <ReactQuill theme="snow" value={formData.content} onChange={val => setFormData({ ...formData, content: val })} className="h-80 text-foreground" />
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black uppercase italic tracking-tight text-foreground">
                                FAQs <span className="text-secondary text-sm font-medium normal-case not-italic">(Optional)</span>
                            </h3>
                            <button
                                type="button"
                                onClick={addFaq}
                                className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors"
                            >
                                <HiOutlinePlus size={18} /> Add FAQ
                            </button>
                        </div>

                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-background border border-border rounded-2xl p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">FAQ #{index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFaq(index)}
                                        className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-bold transition-colors"
                                    >
                                        <HiOutlineMinus size={16} /> Remove
                                    </button>
                                </div>
                                <input
                                    placeholder="Question"
                                    className="w-full bg-card border border-border p-4 rounded-xl outline-none font-bold text-foreground focus:border-primary transition-colors"
                                    value={faq.question}
                                    onChange={e => updateFaq(index, "question", e.target.value)}
                                />
                                <textarea
                                    placeholder="Answer"
                                    rows={3}
                                    className="w-full bg-card border border-border p-4 rounded-xl outline-none font-medium text-foreground focus:border-primary transition-colors resize-none"
                                    value={faq.answer}
                                    onChange={e => updateFaq(index, "answer", e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button disabled={loading} type="submit" className="bg-primary text-forground px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-foreground transition-all shadow shadow-green-400 hover:shadow-2xl shadow-primary/20 disabled:opacity-50">
                            {loading ? "Processing..." : isEditing ? "Update Article" : "Publish Article"}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", content: "", category: "", subCategory: "" }); setFaqs([]); setSelectedFile(null); }} className="bg-accent text-foreground px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div className="bg-card rounded-[40px] border border-border overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-accent/50 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                        <tr>
                            <th className="p-8">Article</th>
                            <th className="p-8 text-center">Category</th>
                            <th className="p-8 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {blogs.map(blog => (
                            <tr key={blog._id} className="hover:bg-accent/10 transition-all">
                                <td className="p-8 flex items-center gap-4">
                                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-accent">
                                        <img src={blog.image.url} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <span className="font-bold text-foreground uppercase italic">{blog.title}</span>
                                </td>
                                <td className="p-8 text-center">
                                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase">{blog.category?.name || "N/A"}</span>
                                </td>
                                <td className="p-8 text-right space-x-2">
                                    <button onClick={() => handleEdit(blog)} className="p-3 bg-accent text-secondary hover:text-primary rounded-xl"><HiOutlinePencilAlt size={20} /></button>
                                    <button onClick={() => handleDelete(blog._id)} className="p-3 bg-accent text-secondary hover:text-red-600 rounded-xl"><HiOutlineTrash size={20} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
