/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { HiTrash, HiPencil, HiPlus, HiX, HiOutlineMinus } from "react-icons/hi";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import 'react-quill-new/dist/quill.snow.css';

export default function CityManagement() {
  const { user } = useAuth();

  const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-40 bg-accent/20 animate-pulse rounded-2xl" />
  }), []);

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Form state
  const [cityName, setCityName] = useState("");
  const [county, setCounty] = useState("");
  const [description, setDescription] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [localRisks, setLocalRisks] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Temp inputs for adding items
  const [neighborhoodInput, setNeighborhoodInput] = useState("");
  const [riskInput, setRiskInput] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCities = async () => {
    try {
      const res = await fetch(`${API_URL}/cities`);
      const data = await res.json();
      setCities(data.data || []);
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };

  useEffect(() => { fetchCities(); }, []);

  const resetForm = () => {
    setCityName("");
    setCounty("");
    setDescription("");
    setNeighborhoods([]);
    setLocalRisks([]);
    setFaqs([]);
    setMetaTitle("");
    setMetaDescription("");
    setNeighborhoodInput("");
    setRiskInput("");
    setIsEditing(null);
    setShowAdvanced(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim() || !user?.firebaseUid) return;

    setLoading(true);
    const url = isEditing
      ? `${API_URL}/cities/${isEditing}`
      : `${API_URL}/cities/add-city`;

    const method = isEditing ? "PATCH" : "POST";

    // Filter out empty FAQs
    const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

    const payload = {
      name: cityName,
      county,
      description,
      neighborhoods: neighborhoods.filter(n => n.trim()),
      localRisks: localRisks.filter(r => r.trim()),
      faqs: validFaqs,
      metaTitle,
      metaDescription,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-user-uid": user.firebaseUid,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(isEditing ? "City Updated!" : "City Added!");
        resetForm();
        fetchCities();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (city) => {
    setIsEditing(city._id);
    setCityName(city.name || "");
    setCounty(city.county || "");
    setDescription(city.description || "");
    setNeighborhoods(city.neighborhoods || []);
    setLocalRisks(city.localRisks || []);
    setFaqs(city.faqs && city.faqs.length > 0 ? city.faqs.map(f => ({ question: f.question, answer: f.answer })) : []);
    setMetaTitle(city.metaTitle || "");
    setMetaDescription(city.metaDescription || "");
    setShowAdvanced(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;
    try {
      const res = await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
        headers: { "x-user-uid": user.firebaseUid },
      });
      if (res.ok) {
        toast.success("City Deleted!");
        fetchCities();
      } else {
        const result = await res.json();
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  // Neighborhood helpers
  const addNeighborhood = () => {
    if (neighborhoodInput.trim()) {
      setNeighborhoods([...neighborhoods, neighborhoodInput.trim()]);
      setNeighborhoodInput("");
    }
  };

  const removeNeighborhood = (index) => {
    setNeighborhoods(neighborhoods.filter((_, i) => i !== index));
  };

  // Local Risk helpers
  const addRisk = () => {
    if (riskInput.trim()) {
      setLocalRisks([...localRisks, riskInput.trim()]);
      setRiskInput("");
    }
  };

  const removeRisk = (index) => {
    setLocalRisks(localRisks.filter((_, i) => i !== index));
  };

  // FAQ helpers
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text--foreground uppercase italic">
          City Management
        </h2>
        <p className="text--secondary text-sm border-l-4 border-orange-600 pl-4">
          {isEditing ? "Editing city details..." : "Add or manage operational zones."} Currently logged in as:{" "}
          <span className="text-orange-600 font-bold">{user?.name}</span>
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-3xl border transition-all duration-300 space-y-6 ${
          isEditing ? "bg-orange-600/5 border-orange-600/30" : "bg--accent/20 border--secondary/10"
        }`}
      >
        {/* Basic: City Name + County */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
              {isEditing ? "Update City Name" : "New City Name"} *
            </label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="e.g. Fairfax City"
              className="w-full bg--background border border--secondary/20 rounded-xl py-4 px-6 outline-none focus:border-orange-500 text--foreground transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
              County
            </label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="w-full bg--background border border--secondary/20 rounded-xl py-4 px-6 outline-none focus:border-orange-500 text--foreground transition-all"
            >
              <option value="">Select County (Optional)</option>
              <option value="Loudoun County">Loudoun County</option>
              <option value="Fairfax County">Fairfax County</option>
              <option value="Prince William County">Prince William County</option>
              <option value="Arlington County">Arlington County</option>
              <option value="Independent City">Independent City</option>
              <option value="Washington DC">Washington DC</option>
              <option value="Maryland">Maryland</option>
            </select>
          </div>
        </div>

        {/* Toggle Advanced Fields */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2"
        >
          {showAdvanced ? <HiX size={16} /> : <HiPlus size={16} />}
          {showAdvanced ? "Hide SEO & Local Content Fields" : "Add SEO & Local Content (Optional)"}
        </button>

        {showAdvanced && (
          <div className="space-y-6 border-t border--secondary/10 pt-6">

            {/* SEO Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Water Damage Restoration Fairfax VA | 24/7"
                  className="w-full bg--background border border--secondary/20 rounded-xl py-4 px-6 outline-none focus:border-orange-500 text--foreground transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
                  Meta Description (SEO)
                </label>
                <input
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief SEO description for this city page..."
                  className="w-full bg--background border border--secondary/20 rounded-xl py-4 px-6 outline-none focus:border-orange-500 text--foreground transition-all"
                />
              </div>
            </div>

            {/* Description (Rich Text) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
                City Description (Unique Content)
              </label>
              <div className="h-72 mb-8">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="h-56 text-foreground"
                />
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
                Neighborhoods / Sub-Areas
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={neighborhoodInput}
                  onChange={(e) => setNeighborhoodInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addNeighborhood(); } }}
                  placeholder="Type neighborhood name and press Enter or Add"
                  className="flex-1 bg--background border border--secondary/20 rounded-xl py-3 px-5 outline-none focus:border-orange-500 text--foreground transition-all"
                />
                <button type="button" onClick={addNeighborhood} className="px-5 py-3 bg-orange-600/10 text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-600/20 transition-colors">
                  Add
                </button>
              </div>
              {neighborhoods.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((n, i) => (
                    <span key={i} className="flex items-center gap-2 bg--background border border--secondary/20 px-4 py-2 rounded-full text-sm font-bold">
                      {n}
                      <button type="button" onClick={() => removeNeighborhood(i)} className="text-red-500 hover:text-red-600">
                        <HiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Local Risks */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
                Local Risks (Flooding, Weather, etc.)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={riskInput}
                  onChange={(e) => setRiskInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addRisk(); } }}
                  placeholder="e.g. Flash flooding near Broad Run"
                  className="flex-1 bg--background border border--secondary/20 rounded-xl py-3 px-5 outline-none focus:border-orange-500 text--foreground transition-all"
                />
                <button type="button" onClick={addRisk} className="px-5 py-3 bg-orange-600/10 text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-600/20 transition-colors">
                  Add
                </button>
              </div>
              {localRisks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {localRisks.map((r, i) => (
                    <span key={i} className="flex items-center gap-2 bg--background border border--secondary/20 px-4 py-2 rounded-full text-sm font-bold">
                      {r}
                      <button type="button" onClick={() => removeRisk(i)} className="text-red-500 hover:text-red-600">
                        <HiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
                  Local FAQs
                </label>
                <button
                  type="button"
                  onClick={addFaq}
                  className="flex items-center gap-2 bg-orange-600/10 text-orange-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-600/20 transition-colors"
                >
                  <HiPlus size={16} /> Add FAQ
                </button>
              </div>
              {faqs.map((faq, index) => (
                <div key={index} className="bg--background border border--secondary/20 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text--secondary">FAQ #{index + 1}</span>
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
                    className="w-full bg--accent/20 border border--secondary/10 p-3 rounded-xl outline-none font-bold text--foreground focus:border-orange-500 transition-colors"
                    value={faq.question}
                    onChange={e => updateFaq(index, "question", e.target.value)}
                  />
                  <textarea
                    placeholder="Answer"
                    rows={2}
                    className="w-full bg--accent/20 border border--secondary/10 p-3 rounded-xl outline-none font-medium text--foreground focus:border-orange-500 transition-colors resize-none"
                    value={faq.answer}
                    onChange={e => updateFaq(index, "answer", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-4 rounded-xl font-black flex items-center justify-center bg--secondary/10 text--foreground hover:bg--secondary/20 transition-all"
            >
              <HiX size={20} />
            </button>
          )}
          <button
            disabled={loading}
            className={`px-10 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-xl w-full md:w-auto ${
              isEditing ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20" : "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
            } text-white`}
          >
            {loading ? (
              "PROCESSING..."
            ) : isEditing ? (
              <><HiPencil size={20} /> UPDATE CITY</>
            ) : (
              <><HiPlus size={20} /> ADD CITY</>
            )}
          </button>
        </div>
      </form>

      {/* Cities Table */}
      <div className="bg--accent/20 rounded-[35px] border border--secondary/10 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg--secondary/5 text--secondary text-[10px] uppercase tracking-[0.2em]">
              <th className="p-6 font-black">Location / City Name</th>
              <th className="p-6 font-black text-center">County</th>
              <th className="p-6 font-black text-center">Content</th>
              <th className="p-6 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide--secondary/10">
            {cities.map((city) => (
              <tr
                key={city._id}
                className={`transition-colors group ${isEditing === city._id ? "bg-orange-600/10" : "hover:bg-orange-600/5"}`}
              >
                <td className="p-6 text--foreground font-bold text-lg">
                  {city.name}
                </td>
                <td className="p-6 text-center">
                  {city.county ? (
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase">
                      {city.county}
                    </span>
                  ) : (
                    <span className="text--secondary text-xs italic">—</span>
                  )}
                </td>
                <td className="p-6 text-center">
                  {city.description ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black uppercase">
                      Unique
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-[10px] font-black uppercase">
                      Default
                    </span>
                  )}
                </td>
                <td className="p-6 flex justify-end gap-3">
                  <button
                    onClick={() => startEdit(city)}
                    className="p-3 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                    title="Edit"
                  >
                    <HiPencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(city._id)}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Delete"
                  >
                    <HiTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cities.length === 0 && (
          <div className="p-20 text-center text--secondary italic">
            No cities added yet.
          </div>
        )}
      </div>
    </div>
  );
}
