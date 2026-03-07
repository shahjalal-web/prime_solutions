/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlineMail, HiOutlinePhone, HiOutlineCalendar } from "react-icons/hi";
import { toast } from "sonner";

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Fetch All Contacts
    const fetchContacts = async () => {
        try {
            const res = await fetch(`${API_URL}/contacts`);
            const data = await res.json();
            setContacts(data.data || []);
        } catch (err) {
            toast.error("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, []);

    // Delete Contact Logic
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this dispatch request?")) return;

        try {
            const res = await fetch(`${API_URL}/contacts/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Message Deleted");
                setContacts(contacts.filter(c => c._id !== id));
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse font-black uppercase tracking-widest opacity-40">Scanning Dispatch Records...</div>;

    return (
        <div className="p-4 md:p-8 bg-background min-h-screen">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">
                        Emergency <span className="text-primary">Dispatches</span>
                    </h1>
                    <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">Manage all incoming restoration requests</p>
                </div>
                <div className="bg-card px-6 py-3 rounded-2xl border border-border shadow-sm">
                    <span className="text-primary font-black text-xl">{contacts.length}</span>
                    <span className="ml-2 text-[10px] font-black uppercase text-secondary">Total Inquiries</span>
                </div>
            </div>

            <div className="overflow-x-auto rounded-[35px] border border-border shadow-2xl bg-card">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-accent/50 text-secondary uppercase text-[10px] font-black tracking-widest">
                        <tr>
                            <th className="px-8 py-6">Sender Details</th>
                            <th className="px-8 py-6">Service Type</th>
                            <th className="px-8 py-6">Incident Brief</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {[...contacts].reverse().map((contact) => (
                            <tr key={contact._id} className="hover:bg-accent/20 transition-colors group">
                                <td className="px-8 py-6">
                                    <p className="font-black text-foreground uppercase italic text-sm">{contact.name}</p>
                                    <div className="flex flex-col gap-1 mt-2">

                                        <div className="flex flex-col gap-1 mt-2">
                                            <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-[11px] text-secondary hover:text-primary transition-colors">
                                                <HiOutlinePhone /> {contact.phone}
                                            </a>
                                            <div className="flex items-center gap-2 text-[10px] text-secondary/60">
                                                <HiOutlineCalendar />
                                                {/* Date and Time formatting */}
                                                <span>
                                                    {new Date(contact.createdAt).toLocaleDateString()}
                                                    <span className="mx-1 opacity-50">|</span>
                                                    {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                                        {contact.category?.name || "N/A"}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-accent text-foreground text-[11px] font-bold border border-border">
                                        {contact.subCategory?.name || "General Inquiry"}
                                    </span>
                                </td>
                                <td className="px-8 py-6 max-w-xs">
                                    <p className="text-secondary text-xs leading-relaxed italic line-clamp-2 group-hover:line-clamp-none transition-all">
                                        "{contact.message}"
                                    </p>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-90"
                                    >
                                        <HiOutlineTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {contacts.length === 0 && (
                    <div className="py-20 text-center text-secondary font-bold italic uppercase tracking-widest opacity-40">
                        No active dispatch requests found.
                    </div>
                )}
            </div>
        </div>
    );
}