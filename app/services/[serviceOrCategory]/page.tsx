import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServices, getServiceBySlug, getLocations, getCategories } from "@/lib/store";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, SITE_CONFIG } from "@/lib/seo";
import { ServiceDetailPageClient } from "@/components/ServiceDetailPageClient";

interface PageProps {
  params: {
    serviceOrCategory: string;
  };
}

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);
  const serviceParams = services.map((s) => ({ serviceOrCategory: s.slug }));
  const categoryParams = categories.map((c) => ({ serviceOrCategory: c.slug }));
  return [...serviceParams, ...categoryParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.serviceOrCategory);
  if (!service) {
    return {
      title: "Service | Al-Safwa UAE",
      description: "Professional technical maintenance services across UAE.",
    };
  }

  const canonicalUrl = `${SITE_CONFIG.domain}/services/${service.slug}`;

  return {
    title: `${service.name} in UAE | Al-Safwa Technical Services`,
    description: service.metaDesc || service.shortDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.name} | Al-Safwa UAE`,
      description: service.shortDesc,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_AE",
      type: "article",
    },
  };
}

export default async function SingleServicePage({ params }: PageProps) {
  const [service, allServices, locations, categories] = await Promise.all([
    getServiceBySlug(params.serviceOrCategory),
    getServices(),
    getLocations(),
    getCategories(),
  ]);

  // If it's a category slug, find first service or render services for category
  let matchedService = service;
  if (!matchedService) {
    const cat = categories.find((c) => c.slug === params.serviceOrCategory);
    if (cat) {
      matchedService = allServices.find((s) => s.categorySlug === cat.slug || s.categoryId === cat.id) || allServices[0];
    }
  }

  if (!matchedService) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(matchedService);
  const faqSchema = generateFAQSchema(matchedService.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/#all-services" },
    { name: matchedService.name, url: `/services/${matchedService.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ServiceDetailPageClient
        service={matchedService}
        allServices={allServices}
        locations={locations}
        categorySlug={matchedService.categorySlug || "ac-services"}
      />
    </>
  );
}
