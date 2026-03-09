/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlinePencilAlt, HiSearch, HiX, HiExclamationCircle, HiCheck } from "react-icons/hi";
import { toast } from "sonner";

export default function InspectionManager() {
    const [inspections, setInspections] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [statusToUpdate, setStatusToUpdate] = useState({ id: "", newStatus: "" });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchInspections = async () => {
        try {
            const res = await fetch(`${API_URL}/inspections`);
            const data = await res.json();
            setInspections(data.data || []);
        } catch (err) { toast.error("Database sync failed"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchInspections(); }, []);

    // 1. Data Update Function (Used for both Edit and Status)
    const handleUpdate = async (id, updatedData) => {
        try {
            const res = await fetch(`${API_URL}/inspections/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });
            if (res.ok) {
                toast.success("Success!", { description: "Record has been updated in the cloud." });
                setIsEditModalOpen(false);
                setIsConfirmOpen(false);
                fetchInspections();
            }
        } catch (err) { toast.error("Update failed"); }
    };

    // 2. Open Status Confirm Modal
    const triggerStatusChange = (id, newStatus) => {
        setStatusToUpdate({ id, newStatus });
        setIsConfirmOpen(true);
    };

    // 3. Delete Logic
    const handleDelete = async (id) => {
        if (!confirm("Are you sure? This lead will be permanently purged.")) return;
        try {
            const res = await fetch(`${API_URL}/inspections/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Lead Purged Successfully");
                fetchInspections();
            }
        } catch (err) { toast.error("Delete failed"); }
    };

    const filteredData = inspections.filter(item => {
        const matchesStatus = filterStatus === "All" || item.status === filterStatus;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.phone.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="p-4 md:p-8 bg-background min-h-screen text-foreground">
            {/* --- Header & Filtering --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                        Inspection <span className="text-orange-600">Dispatch</span>
                    </h1>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mt-1">Real-time Lead Management</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {["All", "Pending", "Contacted", "Completed"].map((status) => (
                        <button key={status} onClick={() => setFilterStatus(status)}
                            className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                filterStatus === status ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "bg-accent/50 text-secondary hover:bg-accent"
                            }`}
                        > {status} </button>
                    ))}
                </div>
            </div>

            {/* --- Search & Tools --- */}
            <div className="relative mb-8 max-w-md">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input placeholder="Search by name or contact..." className="w-full bg-card border border-border p-4 pl-12 rounded-2xl outline-none focus:border-orange-600 font-bold text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            {/* --- Main Table Container --- */}
            <div className="bg-card rounded-[40px] border border-border overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-accent/30 text-[10px] font-black uppercase tracking-widest text-secondary">
                            <tr>
                                <th className="p-6">Client Info</th>
                                <th className="p-6">Service Type</th>
                                <th className="p-6">Property Address</th>
                                <th className="p-6">Problem Brief</th>
                                <th className="p-6">Current Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredData.map((item) => (
                                <tr key={item._id} className="hover:bg-accent/5 transition-colors group">
                                    <td className="p-6 whitespace-nowrap">
                                        <p className="font-black uppercase text-sm text-foreground">{item.name}</p>
                                        <p className="text-xs text-orange-600 font-bold">{item.phone}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-[10px] font-black uppercase text-orange-600 tracking-tighter">{item.category?.name}</p>
                                        <p className="text-xs font-bold text-foreground italic">{item.subCategory?.name}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xs text-foreground font-bold truncate">{item.address}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-[11px] text-secondary italic">"{item.problem}"</p>
                                    </td>
                                    <td className="p-6">
                                        <select 
                                            value={item.status} 
                                            onChange={(e) => triggerStatusChange(item._id, e.target.value)}
                                            className={`text-[9px] font-black uppercase tracking-widest p-2 rounded-lg border outline-none cursor-pointer transition-colors ${
                                                item.status === 'Pending' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                item.status === 'Contacted' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                'bg-green-500/10 text-green-500 border-green-500/20'
                                            }`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingItem(item); setIsEditModalOpen(true); }} className="p-3 bg-accent text-secondary hover:text-orange-600 rounded-xl transition-all">
                                                <HiOutlinePencilAlt size={18} />
                                            </button>
                                            {item.status === 'Completed' && (
                                                <button onClick={() => handleDelete(item._id)} className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                                                    <HiOutlineTrash size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Status Confirmation Modal (Text White & Orange) --- */}
            <AnimatePresence>
                {isConfirmOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsConfirmOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-[#0f0f0f] border border-white/10 rounded-[40px] p-10 text-center shadow-2xl">
                            <div className="w-16 h-16 bg-orange-600/10 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <HiExclamationCircle size={36} />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic text-white mb-3">Update <span className="text-orange-600">Protocol?</span></h3>
                            <p className="text-xs text-white font-bold uppercase tracking-widest mb-10 leading-relaxed">Are you sure you want to update it to <br/> <span className="text-orange-600 text-lg">"{statusToUpdate.newStatus}"</span>?</p>
                            
                            <div className="flex gap-4">
                                <button onClick={() => setIsConfirmOpen(false)} className="flex-1 py-4 bg-white/5 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white/10 transition-all border border-white/5">Cancel</button>
                                <button onClick={() => handleUpdate(statusToUpdate.id, { status: statusToUpdate.newStatus })} className="flex-1 py-4 bg-orange-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-black transition-all shadow-lg shadow-orange-600/20">Yes Update</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- Edit Data Modal (Text White & Orange) --- */}
            <AnimatePresence>
                {isEditModalOpen && editingItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-[#0f0f0f] border border-white/10 rounded-[50px] p-10 shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Edit <span className="text-orange-600">Lead Registry</span></h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-3 bg-white/5 rounded-full text-white hover:bg-red-600 transition-all"><HiX size={20} /></button>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-orange-600 ml-2 tracking-[0.2em]">Client Identity</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold focus:border-orange-600 outline-none transition-all" 
                                            defaultValue={editingItem.name} id="edit-name" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase text-orange-600 ml-2 tracking-[0.2em]">Contact Line</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold focus:border-orange-600 outline-none transition-all" 
                                            defaultValue={editingItem.phone} id="edit-phone" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase text-orange-600 ml-2 tracking-[0.2em]">Site Address</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold focus:border-orange-600 outline-none h-24 transition-all" 
                                        defaultValue={editingItem.address} id="edit-address" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase text-orange-600 ml-2 tracking-[0.2em]">Situational Brief</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold focus:border-orange-600 outline-none h-24 transition-all" 
                                        defaultValue={editingItem.problem} id="edit-problem" />
                                </div>
                                
                                <button 
                                    onClick={() => handleUpdate(editingItem._id, {
                                        name: document.getElementById('edit-name').value,
                                        phone: document.getElementById('edit-phone').value,
                                        address: document.getElementById('edit-address').value,
                                        problem: document.getElementById('edit-problem').value
                                    })}
                                    className="w-full py-5 bg-orange-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-orange-600/20 hover:bg-white hover:text-black transition-all duration-500"
                                > Update </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}