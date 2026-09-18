import { ServiceData, LocationData, ServiceFAQ } from "./types";

export const SITE_CONFIG = {
  name: "Al-Safwa Technical Services & Facility Management UAE",
  shortName: "Al-Safwa Technical Services",
  domain: "https://alsafwa-technical.ae",
  phone: "+971 4 399 8877",
  phoneRaw: "+97143998877",
  emergencyHotline: "+971 50 882 1944",
  whatsappNumber: "971508821944",
  email: "support@alsafwa-technical.ae",
  address: {
    streetAddress: "Level 24, Marina Plaza, Dubai Marina",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "39200",
    addressCountry: "AE",
  },
  geo: {
    latitude: 25.0772,
    longitude: 55.1332,
  },
  currenciesAccepted: "AED",
  priceRange: "AED 150 - AED 15000",
  openingHours: "Mo-Su 00:00-24:00",
};

/**
 * Generate HomeAndConstructionBusiness JSON-LD Schema
 */
export function generateLocalBusinessSchema(location?: LocationData) {
  const isCustomLoc = Boolean(location);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_CONFIG.domain}/#business`,
    name: isCustomLoc
      ? `${SITE_CONFIG.name} - ${location?.neighborhood}, ${location?.city}`
      : SITE_CONFIG.name,
    image: `${SITE_CONFIG.domain}/images/al-safwa-og.jpg`,
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.phone,
    priceRange: SITE_CONFIG.priceRange,
    currenciesAccepted: SITE_CONFIG.currenciesAccepted,
    paymentAccepted: "Cash, Credit Card, Apple Pay, Bank Transfer, Cheque",
    address: {
      "@type": "PostalAddress",
      streetAddress: isCustomLoc ? `${location?.neighborhood} Operational Hub` : SITE_CONFIG.address.streetAddress,
      addressLocality: location ? location.city : SITE_CONFIG.address.addressLocality,
      addressRegion: location ? location.emirate : SITE_CONFIG.address.addressRegion,
      postalCode: location ? location.postalCode : SITE_CONFIG.address.postalCode,
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location ? location.latitude : SITE_CONFIG.geo.latitude,
      longitude: location ? location.longitude : SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: location
      ? [
          {
            "@type": "AdministrativeArea",
            name: `${location.neighborhood}, ${location.city}`,
          },
          {
            "@type": "Country",
            name: "United Arab Emirates",
          },
        ]
      : [
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Abu Dhabi" },
          { "@type": "City", name: "Sharjah" },
        ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.94",
      reviewCount: "847",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "UAE Residential & Commercial Technical Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emergency AC Repair & HVAC Servicing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Thermal Leak Detection & Plumbing Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DEWA Electrical Contracting & Smart Lighting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Annual Property Maintenance Contracts (AMC)",
          },
        },
      ],
    },
  };
}

/**
 * Generate Service JSON-LD Schema
 */
export function generateServiceSchema(service: ServiceData, location?: LocationData) {
  const serviceTitle = location
    ? `${service.name} in ${location.neighborhood}, ${location.city}`
    : service.name;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceTitle,
    serviceType: service.name,
    category: service.categoryName || "Property Maintenance",
    description: service.shortDesc,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressLocality: location ? location.city : "Dubai",
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location ? `${location.neighborhood}, ${location.city}, UAE` : "United Arab Emirates",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: service.basePriceAED,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: location
        ? `${SITE_CONFIG.domain}/services/${service.slug}/${location.citySlug}/${location.neighborhoodSlug}`
        : `${SITE_CONFIG.domain}/services/${service.categorySlug}/${service.slug}`,
    },
    termsOfService: `${SITE_CONFIG.domain}/terms`,
  };
}

/**
 * Generate FAQPage JSON-LD Schema
 */
export function generateFAQSchema(faqs: ServiceFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList JSON-LD Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.domain}${item.url}`,
    })),
  };
}
