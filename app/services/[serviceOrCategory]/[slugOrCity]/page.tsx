import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServices, getServiceBySlug, getLocations } from "@/lib/store";
import { getAllCategoryServiceCombinations } from "@/lib/data";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, SITE_CONFIG } from "@/lib/seo";
import { ServiceDetailPageClient } from "@/components/ServiceDetailPageClient";

interface PageProps {
  params: {
    serviceOrCategory: string;
    slugOrCity: string;
  };
}

export const revalidate = 60; // ISR revalidate

export async function generateStaticParams() {
  return getAllCategoryServiceCombinations().map((combo) => ({
    serviceOrCategory: combo.category,
    slugOrCity: combo.serviceSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slugOrCity);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const canonicalUrl = `${SITE_CONFIG.domain}/services/${params.serviceOrCategory}/${service.slug}`;

  return {
    title: `${service.name} in UAE | Al-Safwa Technical Services`,
    description: service.metaDesc || service.shortDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.name} | Al-Safwa Technical Services UAE`,
      description: service.shortDesc,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_AE",
      type: "article",
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const [service, allServices, locations] = await Promise.all([
    getServiceBySlug(params.slugOrCity),
    getServices(),
    getLocations(),
  ]);

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);
  const faqSchema = generateFAQSchema(service.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/#all-services" },
    { name: service.categoryName || "Category", url: `/services/${params.serviceOrCategory}/${service.slug}` },
    { name: service.name, url: `/services/${params.serviceOrCategory}/${service.slug}` },
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
        service={service}
        allServices={allServices}
        locations={locations}
        categorySlug={params.serviceOrCategory}
      />
    </>
  );
}
