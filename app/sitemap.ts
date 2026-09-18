import { MetadataRoute } from "next";
import { getAllLocationServiceCombinations, getAllCategoryServiceCombinations } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;

  // 1. Root & static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#amc-packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#before-after`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 2. Category & Service hub pages
  const categoryCombos = getAllCategoryServiceCombinations();
  const categoryRoutes: MetadataRoute.Sitemap = categoryCombos.map((combo) => ({
    url: `${baseUrl}/services/${combo.category}/${combo.serviceSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Programmatic Localized Permutations (500+ permutations across Dubai, Abu Dhabi, Sharjah)
  const locationCombos = getAllLocationServiceCombinations();
  const localizedRoutes: MetadataRoute.Sitemap = locationCombos.map((combo) => ({
    url: `${baseUrl}/services/${combo.serviceSlug}/${combo.citySlug}/${combo.locationSlug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...localizedRoutes];
}
