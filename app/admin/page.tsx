import React from "react";
import type { Metadata } from "next";
import {
  getLeads,
  getServices,
  getLocations,
  getCategories,
  getTestimonials,
  getBlogPosts,
  getBusinessSettings,
} from "@/lib/store";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Operations & CMS | Al-Safwa UAE",
  description: "Live technician dispatch control room, AED price updates, categories, and SEO inspection.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [leads, services, locations, categories, testimonials, blogPosts, settings] = await Promise.all([
    getLeads(),
    getServices(),
    getLocations(),
    getCategories(),
    getTestimonials(),
    getBlogPosts(),
    getBusinessSettings(),
  ]);

  return (
    <AdminDashboard
      initialLeads={leads}
      initialServices={services}
      locations={locations}
      categories={categories}
      testimonials={testimonials}
      blogPosts={blogPosts}
      settings={settings}
    />
  );
}
