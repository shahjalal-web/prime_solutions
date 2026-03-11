import ServiceContent from "./ServiceContent"; // আমরা লজিকগুলো এই ফাইলে পাঠাবো

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- ISR Data Fetching ---
async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 60 }, // ১ ঘণ্টা পর পর ডেটা আপডেট হবে (ISR)
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data || [];
}

export default async function Services() {
  const categories = await getCategories();

  return (
    <section className="bg-background text-foreground transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-32 relative">
        {/* Header Section */}
        <div className="text-center mb-24">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Expert Restoration
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase italic tracking-tighter">
            Our Recovery Services
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-medium">
            Licensed specialists available 24/7 to restore your property.
          </p>
        </div>
        <ServiceContent categories={categories} />
      </div>
    </section>
  );
}