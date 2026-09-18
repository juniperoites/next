import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServices, getServiceBySlug, getLocations, getLocationBySlugs } from "@/lib/store";
import { getAllLocationServiceCombinations } from "@/lib/data";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from "@/lib/seo";
import { LocalizedLandingPageClient } from "@/components/LocalizedLandingPageClient";

interface PageProps {
  params: {
    serviceOrCategory: string;
    slugOrCity: string;
    location: string;
  };
}

export const revalidate = 60; // ISR revalidate

export async function generateStaticParams() {
  const combos = getAllLocationServiceCombinations();
  return combos.map((combo) => ({
    serviceOrCategory: combo.serviceSlug,
    slugOrCity: combo.citySlug,
    location: combo.locationSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const [service, location] = await Promise.all([
    getServiceBySlug(params.serviceOrCategory),
    getLocationBySlugs(params.slugOrCity, params.location),
  ]);

  if (!service || !location) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `${service.name} in ${location.neighborhood}, ${location.city} | Sub-30 Min Arrival`;
  const description = `24/7 Professional ${service.name.toLowerCase()} in ${location.neighborhood}, ${location.city}. DEWA certified master technicians with an average response time of ${location.avgResponseMins} minutes. Book with 90-day warranty.`;
  const canonicalUrl = `${SITE_CONFIG.domain}/services/${service.slug}/${location.citySlug}/${location.neighborhoodSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_AE",
      type: "article",
    },
  };
}

export default async function LocalizedServiceLocationPage({ params }: PageProps) {
  const [service, location, allServices, allLocations] = await Promise.all([
    getServiceBySlug(params.serviceOrCategory),
    getLocationBySlugs(params.slugOrCity, params.location),
    getServices(),
    getLocations(),
  ]);

  if (!service || !location) {
    notFound();
  }

  // Localized FAQs
  const localizedFaqs = [
    {
      question: `How fast can a technician reach my property in ${location.neighborhood}?`,
      answer: `We maintain mobile response teams specifically assigned to ${location.neighborhood} with an average emergency arrival time of ${location.avgResponseMins} minutes 24 hours a day, 7 days a week.`,
    },
    {
      question: `What is the starting price for ${service.name} in ${location.neighborhood}?`,
      answer: `Our base rate starts from AED ${service.basePriceAED} (${service.priceUnit}) with transparent upfront pricing, no hidden emergency surcharges, and a 90-day parts & workmanship warranty.`,
    },
    ...service.faqs,
  ];

  const localBusinessSchema = generateLocalBusinessSchema(location);
  const serviceSchema = generateServiceSchema(service, location);
  const faqSchema = generateFAQSchema(localizedFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: location.city, url: `/#locations-grid` },
    { name: location.neighborhood, url: `/#locations-grid` },
    { name: `${service.name} in ${location.neighborhood}`, url: `/services/${service.slug}/${location.citySlug}/${location.neighborhoodSlug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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

      <LocalizedLandingPageClient
        service={service}
        location={location}
        allServices={allServices}
        allLocations={allLocations}
        faqs={localizedFaqs}
      />
    </>
  );
}
