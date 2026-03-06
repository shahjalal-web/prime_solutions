/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { HiTrash, HiPencil, HiPlus, HiX } from "react-icons/hi";
import { useAuth } from "@/app/context/AuthContext";

export default function CityManagement() {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // Edit korar somoy City ID thakbe
  const { user } = useAuth(); 

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch Cities
  const fetchCities = async () => {
    try {
      const res = await fetch(`${API_URL}/cities`);
      const data = await res.json();
      setCities(data.data || []);
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Handle Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim() || !user?.firebaseUid) return;

    setLoading(true);
    const url = isEditing 
      ? `${API_URL}/cities/${isEditing}` 
      : `${API_URL}/cities/add-city`;
    
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "x-user-uid": user.firebaseUid,
        },
        body: JSON.stringify({ name: cityName }),
      });

      const result = await res.json();

      if (res.ok) {
        setCityName("");
        setIsEditing(null);
        fetchCities();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Set Edit Mode
  const startEdit = (city) => {
    setIsEditing(city._id);
    setCityName(city.name);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form-e focus korar jonno scroll
  };

  // Cancel Edit
  const cancelEdit = () => {
    setIsEditing(null);
    setCityName("");
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;

    try {
      const res = await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-uid": user.firebaseUid,
        },
      });

      if (res.ok) {
        fetchCities();
      } else {
        const result = await res.json();
        alert(result.message);
      }
    } catch (error) {
      alert("Delete failed!");
    }
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

      {/* Input Form (Add/Update) */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row gap-4 items-end ${
          isEditing ? "bg-orange-600/5 border-orange-600/30" : "bg--accent/20 border--secondary/10"
        }`}
      >
        <div className="flex-1 space-y-2 w-full">
          <label className="text-xs font-bold text-orange-600 uppercase tracking-widest ml-1">
            {isEditing ? "Update City Name" : "New City Name"}
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
        
        <div className="flex gap-2 w-full md:w-auto">
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
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
              <>
                <HiPencil size={20} /> UPDATE CITY
              </>
            ) : (
              <>
                <HiPlus size={20} /> ADD CITY
              </>
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