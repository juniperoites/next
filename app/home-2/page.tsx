import React from "react";
import { Metadata } from "next";
import { getCategories, getServices, getLocations, getAMCPackages, getPortfolioItems, getTestimonials } from "@/lib/store";
import { Home2Client } from "@/components/Home2Client";

export const metadata: Metadata = {
  title: "Modern Technical Services Dubai | Premium Home & Villa Maintenance",
  description: "Experience Dubai's cleanest, fastest 25-minute emergency maintenance. AC servicing, plumbing, electrical, and full villa care with upfront pricing and warranty.",
  alternates: {
    canonical: "/home-2",
  },
};

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function Home2Page() {
  const [categories, services, locations, amcPackages, portfolioItems, testimonials] = await Promise.all([
    getCategories(),
    getServices(),
    getLocations(),
    getAMCPackages(),
    getPortfolioItems(),
    getTestimonials(),
  ]);

  return (
    <Home2Client
      categories={categories}
      services={services}
      locations={locations}
      amcPackages={amcPackages}
      portfolioItems={portfolioItems}
      testimonials={testimonials}
    />
  );
}
