import { MetadataRoute } from "next";

const baseUrl = "https://psolutionservices.com";
const API_URL = "https://prime-solutions-server.vercel.app/api/v1";

// Static routes
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${baseUrl}/pages/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/pages/services`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${baseUrl}/pages/blogs`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/pages/portfolio`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${baseUrl}/pages/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

// Fetch all blogs
async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const blogs = data.data || [];

    return blogs.map((blog: { slug: string; updatedAt?: string; createdAt?: string }) => ({
      url: `${baseUrl}/pages/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

// Fetch all service categories
async function getCategoryRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const categories = data.data || [];

    return categories.map((cat: { _id: string; updatedAt?: string }) => ({
      url: `${baseUrl}/pages/services/${cat._id}`,
      lastModified: new Date(cat.updatedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

// Fetch all sub-categories (service detail pages)
async function getSubCategoryRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_URL}/sub-categories`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const subCategories = data.data || [];

    return subCategories.map((sub: { slug: string; updatedAt?: string }) => ({
      url: `${baseUrl}/pages/service-details/${sub.slug}`,
      lastModified: new Date(sub.updatedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogRoutes, categoryRoutes, subCategoryRoutes] = await Promise.all([
    getBlogRoutes(),
    getCategoryRoutes(),
    getSubCategoryRoutes(),
  ]);

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...subCategoryRoutes,
    ...blogRoutes,
  ];
}
