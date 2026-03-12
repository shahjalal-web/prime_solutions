import Link from "next/link";
import BlogCard from "./BlogCardClient"; // আমরা ক্লায়েন্ট এনিমেশনের জন্য আলাদা ছোট কম্পোনেন্ট ব্যবহার করব

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- ISR Data Fetching (Server Side) ---
async function getLatestBlogs() {
  const res = await fetch(`${API_URL}/blogs`, {
    next: { revalidate: 60 }, // প্রতি ১ ঘণ্টা পর পর ডেটা অটো আপডেট হবে (ISR)
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data?.slice(0, 3) || [];
}

export default async function BlogGrid() {
  const blogs = await getLatestBlogs();

  return (
    <section className="py-24 bg-background transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header with Local SEO Focus */}
        <div className="text-center mb-16">
          <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            Certified Restoration Insights
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase italic tracking-tighter leading-none">
            Expert <span className="text-orange-600">Recovery</span> Knowledge
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium italic">
            Get professional tips on **Water Damage Restoration**, **Mold Remediation**, and **Fire Damage Recovery** serving Virginia, Maryland, and Washington DC. 
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <BlogCard key={blog._id} blog={blog} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <Link
            href="/pages/blogs"
            className="inline-flex items-center gap-4 bg-accent/20 border border-border px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-foreground hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-xl"
          >
            Browse All Restoration Insights
          </Link>
        </div>
      </div>
    </section>
  );
}