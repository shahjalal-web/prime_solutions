/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression"; // Image compression library
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCloudUpload } from "react-icons/hi";
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
    console.log(blogs)
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(null);

    const [formData, setFormData] = useState({
        title: "", content: "", category: "", subCategory: ""
    });

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

            // Step 3: Payload construction (Image should be an object)
            const payload = {
                ...formData,
                image: imageData, // {url, publicId}
                slug
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
                                className="w-1/2 bg-background border border-border p-5 rounded-2xl outline-none font-bold text-foreground"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
                            >
                                <option value="">Category</option>
                                {categories?.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <select
                                required
                                className="w-1/2 bg-background border border-border p-5 rounded-2xl outline-none font-bold text-foreground disabled:opacity-50"
                                value={formData.subCategory}
                                onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                                disabled={!formData.category}
                            >
                                <option value="">Sub Category</option>
                                {subCategories?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
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

                    <div className="flex gap-4">
                        <button disabled={loading} type="submit" className="bg-primary text-forground px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-foreground transition-all shadow shadow-green-400 hover:shadow-2xl shadow-primary/20 disabled:opacity-50">
                            {loading ? "Processing..." : isEditing ? "Update Article" : "Publish Article"}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", content: "", category: "", subCategory: "" }); setSelectedFile(null); }} className="bg-accent text-foreground px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
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
                                    <button onClick={() => { setIsEditing(blog); setFormData({ title: blog.title, content: blog.content, category: blog.category?._id, subCategory: blog.subCategory?._id }); window.scrollTo(0, 0); }} className="p-3 bg-accent text-secondary hover:text-primary rounded-xl"><HiOutlinePencilAlt size={20} /></button>
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