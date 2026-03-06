import ServiceListClient from "./ServiceListClient";

export const revalidate = 60; // ISR: 60 sec por por refresh hobe

async function getData(categoryId) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const [catRes, subRes] = await Promise.all([
      fetch(`${API_URL}/categories`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/sub-categories?category=${categoryId}`, { next: { revalidate: 60 } })
    ]);

    const allCats = await catRes.json();
    const subData = await subRes.json();

    return {
      currentCategory: allCats.data?.find(c => c._id === categoryId),
      subCategories: subData.data || []
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return { currentCategory: null, subCategories: [] };
  }
}

export default async function CategoryDetailPage({ params }) {
  const { id } = await params;
  const { currentCategory, subCategories } = await getData(id);

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      {/* --- Header Section (Static Part) --- */}
      <div className="mb-12 text-center max-w-3xl mx-auto relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <h2 className="text-5xl md:text-7xl font-black uppercase italic text-foreground tracking-tighter leading-none mb-6">
          {currentCategory?.name || "Premium"} <span className="text-primary underline decoration-border decoration-wavy underline-offset-8">Solutions</span>
        </h2>
        <p className="text-secondary font-medium text-sm max-w-lg mx-auto leading-relaxed">
          Custom restoration for <span className="text-foreground font-bold">{currentCategory?.name}</span> needs.
        </p>
      </div>

      {/* --- Client Side Filterable List --- */}
      <ServiceListClient initialServices={subCategories} />
    </div>
  );
}