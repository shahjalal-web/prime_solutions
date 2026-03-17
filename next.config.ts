import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old service pages → new service pages
      {
        source: "/services/:slug",
        destination: "/pages/service-details/:slug",
        permanent: true,
      },
      // Old service-area pages → new location pages
      {
        source: "/service-area/:slug",
        destination: "/pages/locations/:slug",
        permanent: true,
      },
      // Old service-area index
      {
        source: "/service-area",
        destination: "/pages/locations",
        permanent: true,
      },
      // Old areas-we-serve
      {
        source: "/areas-we-serve",
        destination: "/pages/locations",
        permanent: true,
      },
      // Old blog pages → new blog pages
      {
        source: "/blog/:slug",
        destination: "/pages/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/pages/blogs",
        permanent: true,
      },
      // Old portfolio/works
      {
        source: "/our-works",
        destination: "/pages/portfolio",
        permanent: true,
      },
      // Old pages
      {
        source: "/gallery",
        destination: "/pages/portfolio",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/pages/about",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/#faq",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
