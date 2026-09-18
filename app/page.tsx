import React from "react";
import { getCategories, getServices, getLocations, getAMCPackages, getPortfolioItems, getTestimonials } from "@/lib/store";
import { HomePageClient } from "@/components/HomePageClient";

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const [categories, services, locations, amcPackages, portfolioItems, testimonials] = await Promise.all([
    getCategories(),
    getServices(),
    getLocations(),
    getAMCPackages(),
    getPortfolioItems(),
    getTestimonials(),
  ]);

  return (
    <HomePageClient
      categories={categories}
      services={services}
      locations={locations}
      amcPackages={amcPackages}
      portfolioItems={portfolioItems}
      testimonials={testimonials}
    />
  );
}
