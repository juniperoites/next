import prisma from "./prisma";
import {
  CATEGORIES,
  SERVICES,
  LOCATIONS,
  AMC_PACKAGES,
  PORTFOLIO_ITEMS,
  TESTIMONIALS,
  BLOG_POSTS,
  BUSINESS_SETTINGS,
} from "./data";
import {
  ServiceData,
  LocationData,
  CategoryData,
  AMCPackageData,
  PortfolioItemData,
  TestimonialData,
  BlogPostData,
  BusinessSettingsData,
  LeadRecord,
  LeadFormData,
} from "./types";

// Runtime in-memory state stores for instant zero-latency admin modifications
let runtimeServices: ServiceData[] = [...SERVICES];
let runtimeCategories: CategoryData[] = [...CATEGORIES];
let runtimeLocations: LocationData[] = [...LOCATIONS];
let runtimeAMCPackages: AMCPackageData[] = [...AMC_PACKAGES];
let runtimePortfolio: PortfolioItemData[] = [...PORTFOLIO_ITEMS];
let runtimeTestimonials: TestimonialData[] = [...TESTIMONIALS];
let runtimeBlogPosts: BlogPostData[] = [...BLOG_POSTS];
let runtimeSettings: BusinessSettingsData = { ...BUSINESS_SETTINGS };

let runtimeLeads: LeadRecord[] = [
  {
    id: "lead-1",
    fullName: "Mansoor Al-Nuaimi",
    email: "mansoor.nuaimi@emirates.ae",
    phone: "+971501234567",
    city: "Dubai",
    neighborhood: "Dubai Marina",
    propertyType: "Penthouse",
    serviceSlug: "ac-repair",
    urgency: "EMERGENCY_NOW",
    estimatedAED: 380,
    message: "AC compressor shut down in master bedroom. Need urgent technician tonight.",
    status: "DISPATCHED",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "lead-2",
    fullName: "Sarah Jenkins",
    email: "s.jenkins@dubaiproperties.com",
    phone: "+971559876543",
    city: "Dubai",
    neighborhood: "Palm Jumeirah",
    propertyType: "Villa / Townhouse",
    amcTier: "GOLD",
    urgency: "SCHEDULED",
    estimatedAED: 3850,
    message: "Requesting Gold Villa Care AMC contract review for 5-bed Frond villa.",
    status: "NEW",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "lead-3",
    fullName: "Eng. Rashid Al-Kaabi",
    email: "eng.rashid@adnoc.ae",
    phone: "+971523456789",
    city: "Abu Dhabi",
    neighborhood: "Yas Island",
    propertyType: "Villa / Townhouse",
    serviceSlug: "plumbing",
    urgency: "WITHIN_24_HRS",
    estimatedAED: 7950,
    message: "Platinum Royal AMC inquiry for luxury villa compound.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

// --- Business Settings ---
export async function getBusinessSettings(): Promise<BusinessSettingsData> {
  return runtimeSettings;
}

export async function updateBusinessSettings(settings: Partial<BusinessSettingsData>): Promise<BusinessSettingsData> {
  runtimeSettings = { ...runtimeSettings, ...settings };
  return runtimeSettings;
}

// --- Categories ---
export async function getCategories(): Promise<CategoryData[]> {
  return runtimeCategories;
}

export async function saveCategory(category: CategoryData): Promise<CategoryData> {
  const index = runtimeCategories.findIndex((c) => c.id === category.id || c.slug === category.slug);
  if (index >= 0) {
    runtimeCategories[index] = category;
  } else {
    runtimeCategories.push(category);
  }
  return category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  runtimeCategories = runtimeCategories.filter((c) => c.id !== id && c.slug !== id);
  return true;
}

// --- Services ---
export async function getServices(): Promise<ServiceData[]> {
  return runtimeServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const normalized = slug.toLowerCase().trim();
  return (
    runtimeServices.find(
      (s) => s.slug.toLowerCase() === normalized || s.id.toLowerCase() === normalized
    ) || null
  );
}

export async function saveService(service: ServiceData): Promise<ServiceData> {
  const index = runtimeServices.findIndex((s) => s.id === service.id || s.slug === service.slug);
  if (index >= 0) {
    runtimeServices[index] = service;
  } else {
    runtimeServices.unshift(service);
  }
  return service;
}

export async function updateServicePrice(serviceId: string, basePriceAED: number, isActive?: boolean): Promise<boolean> {
  const srv = runtimeServices.find((s) => s.id === serviceId || s.slug === serviceId);
  if (srv) {
    srv.basePriceAED = basePriceAED;
    if (typeof isActive === "boolean") srv.isActive = isActive;
    return true;
  }
  return false;
}

export async function deleteService(idOrSlug: string): Promise<boolean> {
  runtimeServices = runtimeServices.filter((s) => s.id !== idOrSlug && s.slug !== idOrSlug);
  return true;
}

// --- Locations ---
export async function getLocations(): Promise<LocationData[]> {
  return runtimeLocations;
}

export async function getLocationBySlugs(citySlug: string, neighborhoodSlug: string): Promise<LocationData | null> {
  return (
    runtimeLocations.find(
      (l) =>
        l.citySlug.toLowerCase() === citySlug.toLowerCase() &&
        l.neighborhoodSlug.toLowerCase() === neighborhoodSlug.toLowerCase()
    ) || null
  );
}

export async function saveLocation(loc: LocationData): Promise<LocationData> {
  const index = runtimeLocations.findIndex((l) => l.id === loc.id || (l.citySlug === loc.citySlug && l.neighborhoodSlug === loc.neighborhoodSlug));
  if (index >= 0) {
    runtimeLocations[index] = loc;
  } else {
    runtimeLocations.push(loc);
  }
  return loc;
}

export async function deleteLocation(id: string): Promise<boolean> {
  runtimeLocations = runtimeLocations.filter((l) => l.id !== id);
  return true;
}

// --- AMC Packages ---
export async function getAMCPackages(): Promise<AMCPackageData[]> {
  return runtimeAMCPackages;
}

export async function saveAMCPackage(pkg: AMCPackageData): Promise<AMCPackageData> {
  const index = runtimeAMCPackages.findIndex((p) => p.id === pkg.id || p.slug === pkg.slug);
  if (index >= 0) {
    runtimeAMCPackages[index] = pkg;
  } else {
    runtimeAMCPackages.push(pkg);
  }
  return pkg;
}

// --- Portfolio ---
export async function getPortfolioItems(): Promise<PortfolioItemData[]> {
  return runtimePortfolio;
}

export async function savePortfolioItem(item: PortfolioItemData): Promise<PortfolioItemData> {
  const index = runtimePortfolio.findIndex((p) => p.id === item.id || p.slug === item.slug);
  if (index >= 0) {
    runtimePortfolio[index] = item;
  } else {
    runtimePortfolio.push(item);
  }
  return item;
}

// --- Testimonials ---
export async function getTestimonials(): Promise<TestimonialData[]> {
  return runtimeTestimonials;
}

export async function saveTestimonial(test: TestimonialData): Promise<TestimonialData> {
  const index = runtimeTestimonials.findIndex((t) => t.id === test.id);
  if (index >= 0) {
    runtimeTestimonials[index] = test;
  } else {
    runtimeTestimonials.unshift(test);
  }
  return test;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  runtimeTestimonials = runtimeTestimonials.filter((t) => t.id !== id);
  return true;
}

// --- Blog Posts ---
export async function getBlogPosts(): Promise<BlogPostData[]> {
  return runtimeBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  return runtimeBlogPosts.find((b) => b.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPostData): Promise<BlogPostData> {
  const index = runtimeBlogPosts.findIndex((b) => b.id === post.id || b.slug === post.slug);
  if (index >= 0) {
    runtimeBlogPosts[index] = post;
  } else {
    runtimeBlogPosts.unshift(post);
  }
  return post;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  runtimeBlogPosts = runtimeBlogPosts.filter((b) => b.id !== id && b.slug !== id);
  return true;
}

// --- Leads CRM ---
export async function getLeads(): Promise<LeadRecord[]> {
  return runtimeLeads;
}

export async function createLead(data: LeadFormData): Promise<LeadRecord> {
  const newLead: LeadRecord = {
    id: `lead-${Date.now()}`,
    ...data,
    status: data.urgency === "EMERGENCY_NOW" ? "DISPATCHED" : "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  runtimeLeads.unshift(newLead);
  return newLead;
}

export async function updateLeadStatus(id: string, status: LeadRecord["status"]): Promise<boolean> {
  const found = runtimeLeads.find((l) => l.id === id);
  if (found) {
    found.status = status;
    found.updatedAt = new Date().toISOString();
    return true;
  }
  return false;
}

export async function deleteLead(id: string): Promise<boolean> {
  runtimeLeads = runtimeLeads.filter((l) => l.id !== id);
  return true;
}
