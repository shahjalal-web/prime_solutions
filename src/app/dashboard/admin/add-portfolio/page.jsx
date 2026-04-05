/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression";
import { HiOutlineTrash, HiOutlineCloudUpload, HiXCircle, HiPlus, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";
import 'react-quill-new/dist/quill.snow.css';

export default function PortfolioAdmin() {
    const { user } = useAuth();

    // React Quill Dynamic Import
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), {
        ssr: false,
        loading: () => <div className="h-64 bg-accent/20 animate-pulse rounded-2xl" />
    }), []);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(null); // Stores ID of project being edited

    // Local state for image management
    const [beforeFiles, setBeforeFiles] = useState([]); // Array of { file?, previewUrl, publicId? }
    const [afterFiles, setAfterFiles] = useState([]);

    const [formData, setFormData] = useState({
        title: "", description: "", type: "Residential", category: "", subCategory: "", clientName: "", projectYear: ""
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // 1. Initial Data Fetching
    const fetchData = async () => {
        try {
            const [catRes, portRes] = await Promise.all([
                fetch(`${API_URL}/categories`),
                fetch(`${API_URL}/portfolios`)
            ]);
            const cats = await catRes.json();
            const ports = await portRes.json();
            setCategories(cats.data || []);
            setPortfolios(ports.data || []);
        } catch (err) {
            toast.error("Failed to sync with database");
        }
    };

    useEffect(() => { fetchData(); }, [API_URL]);

    // 2. Dynamic Sub-category Fetching
    useEffect(() => {
        if (formData.category) {
            fetch(`${API_URL}/sub-categories?category=${formData.category}`)
                .then(res => res.json())
                .then(d => setSubCategories(d.data || []));
        } else {
            setSubCategories([]);
        }
    }, [formData.category, API_URL]);

    // 3. Image Selection & Preview Handler
    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        if (type === 'before') setBeforeFiles(prev => [...prev, ...newFiles]);
        if (type === 'after') setAfterFiles(prev => [...prev, ...newFiles]);
    };

    // 4. Remove Selected Image
    const removeImage = (index, type) => {
        if (type === 'before') {
            const updated = [...beforeFiles];
            if (updated[index].previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(updated[index].previewUrl);
            }
            setBeforeFiles(updated.filter((_, i) => i !== index));
        } else {
            const updated = [...afterFiles];
            if (updated[index].previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(updated[index].previewUrl);
            }
            setAfterFiles(updated.filter((_, i) => i !== index));
        }
    };

    // 5. Cloudinary Upload Logic (Handles both New and Existing)
    const uploadImages = async (fileObjects) => {
        const uploaded = [];
        const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1200, useWebWorker: true };

        for (const obj of fileObjects) {
            // Case A: Image is already on Cloudinary (Edit mode)
            if (obj.publicId) {
                uploaded.push({ url: obj.previewUrl, publicId: obj.publicId });
                continue;
            }

            // Case B: New Image to be uploaded
            try {
                const compressed = await imageCompression(obj.file, options);
                const data = new FormData();
                data.append("file", compressed);
                data.append("upload_preset", "ml_default");
                const res = await fetch(`https://api.cloudinary.com/v1_1/daq2xbt9h/image/upload`, { method: "POST", body: data });
                const result = await res.json();
                uploaded.push({ url: result.secure_url, publicId: result.public_id });
            } catch (error) {
                console.error("Upload Error:", error);
            }
        }
        return uploaded;
    };

    // 6. Edit Logic (Auto-fill Form)
    const handleEdit = (project) => {
        setIsEditing(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            type: project.type,
            category: project.category?._id || "",
            subCategory: project.subCategory?._id || "",
            clientName: project.clientName || "",
            projectYear: project.projectYear || ""
        });

        // Set Image States with existing server data
        setBeforeFiles(project.images?.before?.map(img => ({ previewUrl: img.url, publicId: img.publicId })) || []);
        setAfterFiles(project.images?.after?.map(img => ({ previewUrl: img.url, publicId: img.publicId })) || []);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 7. Submit (POST or PATCH)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.firebaseUid) return toast.error("Unauthorized");
        setLoading(true);

        try {
            const beforeImages = await uploadImages(beforeFiles);
            const afterImages = await uploadImages(afterFiles);

            const payload = {
                ...formData,
                images: { before: beforeImages, after: afterImages }
            };

            const url = isEditing ? `${API_URL}/portfolios/${isEditing}` : `${API_URL}/portfolios`;
            const method = isEditing ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "x-user-uid": user.firebaseUid },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success(isEditing ? "Project Updated!" : "Project Published!");
                resetForm();
                fetchData();
            }
        } catch (err) {
            toast.error("Process failed!");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setIsEditing(null);
        setFormData({ title: "", description: "", type: "Residential", category: "", subCategory: "", clientName: "", projectYear: "" });
        setBeforeFiles([]);
        setAfterFiles([]);
        setSubCategories([]);
    };

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-4xl font-black uppercase italic mb-10">Project <span className="text-orange-600">Manager</span></h1>

            {/* Form Section */}
            <div className="bg-card p-10 rounded-[40px] border border-border shadow-sm mb-16">
                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Project Title</label>
                            <input required placeholder="Enter Title" className="w-full bg-background border border-border p-4 rounded-xl font-bold"
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Sector</label>
                            <select required className="w-full bg-background border border-border p-4 rounded-xl font-bold"
                                value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Industrial">Industrial</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Category</label>
                            <select required className="w-full bg-background border border-border p-4 rounded-xl font-bold"
                                value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value, subCategory: "" })}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Sub Category</label>
                            <select required disabled={!formData.category} className="w-full bg-background border border-border p-4 rounded-xl font-bold disabled:opacity-40"
                                value={formData.subCategory} onChange={e => setFormData({ ...formData, subCategory: e.target.value })}>
                                <option value="">Select Sub-Category</option>
                                {subCategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Client Name</label>
                                <input placeholder="Optional" className="w-full bg-background border border-border p-4 rounded-xl font-bold"
                                    value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Project Year</label>
                                <input placeholder="2024" className="w-full bg-background border border-border p-4 rounded-xl font-bold"
                                    value={formData.projectYear} onChange={e => setFormData({ ...formData, projectYear: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Image Previews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase text-orange-600 tracking-tighter italic">Before Restoration</label>
                            <div className="flex flex-wrap gap-4 min-h-30 p-6 border-2 border-dashed border-border rounded-[25px]">
                                {beforeFiles.map((img, i) => (
                                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group/img">
                                        <img src={img.previewUrl} className="w-full h-full object-cover" alt="before" />
                                        <button type="button" onClick={() => removeImage(i, 'before')} className="absolute top-1 right-1 text-red-500 bg-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            <HiXCircle size={22} />
                                        </button>
                                    </div>
                                ))}
                                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-orange-600/30 rounded-xl cursor-pointer hover:bg-orange-600/5 transition-all text-orange-600">
                                    <HiPlus size={24} />
                                    <input type="file" multiple className="hidden" onChange={e => handleFileChange(e, 'before')} />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase text-green-600 tracking-tighter italic">After Restoration</label>
                            <div className="flex flex-wrap gap-4 min-h-30 p-6 border-2 border-dashed border-border rounded-[25px]">
                                {afterFiles.map((img, i) => (
                                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group/img">
                                        <img src={img.previewUrl} className="w-full h-full object-cover" alt="after" />
                                        <button type="button" onClick={() => removeImage(i, 'after')} className="absolute top-1 right-1 text-red-500 bg-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            <HiXCircle size={22} />
                                        </button>
                                    </div>
                                ))}
                                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-green-600/30 rounded-xl cursor-pointer hover:bg-green-600/5 transition-all text-green-600">
                                    <HiPlus size={24} />
                                    <input type="file" multiple className="hidden" onChange={e => handleFileChange(e, 'after')} />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="h-80 mb-12">
                        <ReactQuill theme="snow" value={formData.description} onChange={val => setFormData({ ...formData, description: val })} className="h-64" />
                    </div>

                    <div className="flex gap-4">
                        <button disabled={loading} className="bg-orange-600 text-white px-12 py-5 rounded-[20px] font-black uppercase tracking-widest shadow-xl shadow-orange-600/20 hover:bg-black transition-all disabled:opacity-50">
                            {loading ? "Processing Meta..." : isEditing ? "Update Project" : "Publish Project"}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="bg-accent text-foreground px-8 py-5 rounded-[20px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Portfolio Table */}
            <div className="bg-card rounded-[40px] border border-border overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-accent/50 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                        <tr>
                            <th className="p-8">Project Record</th>
                            <th className="p-8">Sector</th>
                            <th className="p-8 text-right">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {portfolios.map(p => (
                            <tr key={p._id} className="hover:bg-accent/10 transition-colors group">
                                <td className="p-8">
                                    <p className="font-black uppercase italic text-sm text-foreground">{p.title}</p>
                                    <p className="text-[10px] text-secondary mt-1 font-bold">{p.category?.name} • {p.subCategory?.name}</p>
                                </td>
                                <td className="p-8">
                                    <span className="px-3 py-1 bg-orange-600/10 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-tighter border border-orange-600/20">{p.type}</span>
                                </td>
                                <td className="p-8 text-right space-x-3">
                                    <button onClick={() => handleEdit(p)} className="p-3 bg-accent text-secondary hover:text-primary rounded-xl transition-all shadow-sm">
                                        <HiOutlinePencilAlt size={22} />
                                    </button>
                                    <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                        <HiOutlineTrash size={22} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}