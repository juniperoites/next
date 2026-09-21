import prisma from "./prisma";
import { ensureDatabaseSeeded } from "./seed";
import {
  BUSINESS_SETTINGS,
  CATEGORIES,
  SERVICES,
  LOCATIONS,
  AMC_PACKAGES,
  PORTFOLIO_ITEMS,
  TESTIMONIALS,
  BLOG_POSTS,
} from "./data";
import {
  ServiceData,
  ServiceFAQ,
  LocationData,
  CategoryData,
  AMCPackageData,
  PortfolioItemData,
  TestimonialData,
  BlogPostData,
  BusinessSettingsData,
  LeadRecord,
  LeadFormData,
  LeadStatus,
} from "./types";

let isSeedingInitialized = false;

async function checkInitSeed() {
  if (!isSeedingInitialized) {
    isSeedingInitialized = true;
    try {
      await ensureDatabaseSeeded();
    } catch (err) {
      console.warn("Auto-seed error:", err);
    }
  }
}

// --- Mappers ---
function mapDbService(s: any): ServiceData {
  let features: string[] = [];
  try {
    features = typeof s.features === "string" ? JSON.parse(s.features) : s.features || [];
  } catch {
    features = [];
  }

  let faqs: ServiceFAQ[] = [];
  try {
    faqs = typeof s.faqs === "string" ? JSON.parse(s.faqs) : s.faqs || [];
  } catch {
    faqs = [];
  }

  return {
    id: s.id,
    name: s.name,
    slug: s.slug,
    categoryId: s.categoryId,
    categorySlug: s.category?.slug,
    categoryName: s.category?.name,
    shortDesc: s.shortDesc,
    fullContent: s.fullContent,
    basePriceAED: s.basePriceAED,
    priceUnit: s.priceUnit,
    emergencyAvailable: s.emergencyAvailable,
    isPopular: s.isPopular,
    isActive: s.isActive,
    features,
    faqs,
    metaTitle: s.metaTitle,
    metaDesc: s.metaDesc,
    image: s.image || undefined,
  };
}

function mapDbAMCPackage(p: any): AMCPackageData {
  let features: string[] = [];
  try {
    features = typeof p.features === "string" ? JSON.parse(p.features) : p.features || [];
  } catch {
    features = [];
  }

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    tier: p.tier as AMCPackageData["tier"],
    priceAnnualAED: p.priceAnnualAED,
    priceMonthlyAED: p.priceMonthlyAED,
    visitsPerYear: p.visitsPerYear,
    emergencyCallouts: p.emergencyCallouts,
    acServiceCount: p.acServiceCount,
    plumbingCheckups: p.plumbingCheckups,
    electricalAudits: p.electricalAudits,
    freeSparePartsAED: p.freeSparePartsAED,
    targetPropertyType: p.targetPropertyType,
    features,
    isFeatured: p.isFeatured,
  };
}

function mapDbPortfolio(item: any): PortfolioItemData {
  let resultsAchieved: string[] = [];
  try {
    resultsAchieved =
      typeof item.resultsAchieved === "string"
        ? JSON.parse(item.resultsAchieved)
        : item.resultsAchieved || [];
  } catch {
    resultsAchieved = [];
  }

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    categorySlug: item.categorySlug,
    locationName: item.locationName,
    beforeImage: item.beforeImage,
    afterImage: item.afterImage,
    completionTime: item.completionTime,
    clientType: item.clientType,
    description: item.description,
    resultsAchieved,
  };
}

function mapDbLead(l: any): LeadRecord {
  return {
    id: l.id,
    fullName: l.fullName,
    email: l.email,
    phone: l.phone,
    city: l.city,
    neighborhood: l.neighborhood,
    propertyType: l.propertyType as LeadRecord["propertyType"],
    serviceSlug: l.serviceSlug || undefined,
    amcTier: l.amcTier || undefined,
    urgency: l.urgency as LeadRecord["urgency"],
    estimatedAED: l.estimatedAED ?? undefined,
    message: l.message || undefined,
    status: l.status as LeadStatus,
    gtmEventId: l.gtmEventId || undefined,
    createdAt: l.createdAt instanceof Date ? l.createdAt.toISOString() : String(l.createdAt),
    updatedAt: l.updatedAt instanceof Date ? l.updatedAt.toISOString() : String(l.updatedAt),
  };
}

// --- Business Settings ---
export async function getBusinessSettings(): Promise<BusinessSettingsData> {
  await checkInitSeed();
  try {
    const settings = await prisma.businessSettings.findFirst({
      where: { id: "default" },
    });
    if (settings) {
      return {
        companyName: settings.companyName,
        phone: settings.phone,
        emergencyHotline: settings.emergencyHotline,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        address: settings.address,
        city: settings.city,
        country: settings.country,
        openingHours: settings.openingHours,
        dedLicense: settings.dedLicense,
        dewaLicense: settings.dewaLicense,
        municipalityLicense: settings.municipalityLicense,
        isoCertified: settings.isoCertified,
        bannerNotice: settings.bannerNotice,
        bannerEnabled: settings.bannerEnabled,
      };
    }
  } catch (err) {
    console.warn("getBusinessSettings DB error, fallback to data.ts:", err);
  }
  return { ...BUSINESS_SETTINGS };
}

export async function updateBusinessSettings(
  settings: Partial<BusinessSettingsData>
): Promise<BusinessSettingsData> {
  await checkInitSeed();
  const current = await getBusinessSettings();
  const merged = { ...current, ...settings };

  await prisma.businessSettings.upsert({
    where: { id: "default" },
    update: {
      companyName: merged.companyName,
      phone: merged.phone,
      emergencyHotline: merged.emergencyHotline,
      whatsappNumber: merged.whatsappNumber,
      email: merged.email,
      address: merged.address,
      city: merged.city,
      country: merged.country,
      openingHours: merged.openingHours,
      dedLicense: merged.dedLicense,
      dewaLicense: merged.dewaLicense,
      municipalityLicense: merged.municipalityLicense,
      isoCertified: merged.isoCertified,
      bannerNotice: merged.bannerNotice,
      bannerEnabled: merged.bannerEnabled,
    },
    create: {
      id: "default",
      companyName: merged.companyName,
      phone: merged.phone,
      emergencyHotline: merged.emergencyHotline,
      whatsappNumber: merged.whatsappNumber,
      email: merged.email,
      address: merged.address,
      city: merged.city,
      country: merged.country,
      openingHours: merged.openingHours,
      dedLicense: merged.dedLicense,
      dewaLicense: merged.dewaLicense,
      municipalityLicense: merged.municipalityLicense,
      isoCertified: merged.isoCertified,
      bannerNotice: merged.bannerNotice,
      bannerEnabled: merged.bannerEnabled,
    },
  });

  return merged;
}

// --- Categories ---
export async function getCategories(): Promise<CategoryData[]> {
  await checkInitSeed();
  try {
    const cats = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (cats.length > 0) {
      return cats.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        sortOrder: c.sortOrder,
      }));
    }
  } catch (err) {
    console.warn("getCategories DB error:", err);
  }
  return [...CATEGORIES];
}

export async function saveCategory(category: CategoryData): Promise<CategoryData> {
  await checkInitSeed();
  const saved = await prisma.category.upsert({
    where: { slug: category.slug },
    update: {
      name: category.name,
      description: category.description,
      icon: category.icon,
      sortOrder: category.sortOrder,
    },
    create: {
      id: category.id || `cat-${category.slug}`,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      sortOrder: category.sortOrder,
    },
  });

  return {
    id: saved.id,
    name: saved.name,
    slug: saved.slug,
    description: saved.description,
    icon: saved.icon,
    sortOrder: saved.sortOrder,
  };
}

export async function deleteCategory(idOrSlug: string): Promise<boolean> {
  await checkInitSeed();
  await prisma.category.deleteMany({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });
  return true;
}

// --- Services ---
export async function getServices(): Promise<ServiceData[]> {
  await checkInitSeed();
  try {
    const services = await prisma.service.findMany({
      include: { category: true },
      orderBy: { createdAt: "asc" },
    });
    if (services.length > 0) {
      return services.map(mapDbService);
    }
  } catch (err) {
    console.warn("getServices DB error:", err);
  }
  return [...SERVICES];
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  await checkInitSeed();
  const normalized = slug.toLowerCase().trim();
  try {
    const s = await prisma.service.findFirst({
      where: {
        OR: [{ slug: normalized }, { id: normalized }],
      },
      include: { category: true },
    });
    if (s) {
      return mapDbService(s);
    }
  } catch (err) {
    console.warn("getServiceBySlug DB error:", err);
  }
  const fallback = SERVICES.find(
    (s) => s.slug.toLowerCase() === normalized || s.id.toLowerCase() === normalized
  );
  return fallback || null;
}

export async function saveService(service: ServiceData): Promise<ServiceData> {
  await checkInitSeed();
  const featuresJson = JSON.stringify(service.features || []);
  const faqsJson = JSON.stringify(service.faqs || []);

  const saved = await prisma.service.upsert({
    where: { slug: service.slug },
    update: {
      name: service.name,
      categoryId: service.categoryId,
      shortDesc: service.shortDesc,
      fullContent: service.fullContent,
      basePriceAED: service.basePriceAED,
      priceUnit: service.priceUnit || "per unit / visit",
      emergencyAvailable: service.emergencyAvailable ?? true,
      isPopular: service.isPopular ?? false,
      isActive: service.isActive ?? true,
      features: featuresJson,
      faqs: faqsJson,
      metaTitle: service.metaTitle,
      metaDesc: service.metaDesc,
      image: service.image || null,
    },
    create: {
      id: service.id || `srv-${service.slug}`,
      name: service.name,
      slug: service.slug,
      categoryId: service.categoryId,
      shortDesc: service.shortDesc,
      fullContent: service.fullContent,
      basePriceAED: service.basePriceAED,
      priceUnit: service.priceUnit || "per unit / visit",
      emergencyAvailable: service.emergencyAvailable ?? true,
      isPopular: service.isPopular ?? false,
      isActive: service.isActive ?? true,
      features: featuresJson,
      faqs: faqsJson,
      metaTitle: service.metaTitle,
      metaDesc: service.metaDesc,
      image: service.image || null,
    },
    include: { category: true },
  });

  return mapDbService(saved);
}

export async function updateServicePrice(
  serviceId: string,
  basePriceAED: number,
  isActive?: boolean
): Promise<boolean> {
  await checkInitSeed();
  const updateData: any = { basePriceAED };
  if (typeof isActive === "boolean") {
    updateData.isActive = isActive;
  }
  await prisma.service.updateMany({
    where: {
      OR: [{ id: serviceId }, { slug: serviceId }],
    },
    data: updateData,
  });
  return true;
}

export async function deleteService(idOrSlug: string): Promise<boolean> {
  await checkInitSeed();
  await prisma.service.deleteMany({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });
  return true;
}

// --- Locations ---
export async function getLocations(): Promise<LocationData[]> {
  await checkInitSeed();
  try {
    const locations = await prisma.location.findMany({
      orderBy: [{ city: "asc" }, { neighborhood: "asc" }],
    });
    if (locations.length > 0) {
      return locations.map((loc) => ({
        id: loc.id,
        city: loc.city,
        citySlug: loc.citySlug,
        neighborhood: loc.neighborhood,
        neighborhoodSlug: loc.neighborhoodSlug,
        emirate: loc.emirate,
        isHighDemand: loc.isHighDemand,
        avgResponseMins: loc.avgResponseMins,
        techniciansOnDuty: loc.techniciansOnDuty,
        postalCode: loc.postalCode,
        latitude: loc.latitude,
        longitude: loc.longitude,
        metaTitle: loc.metaTitle,
        metaDesc: loc.metaDesc,
      }));
    }
  } catch (err) {
    console.warn("getLocations DB error:", err);
  }
  return [...LOCATIONS];
}

export async function getLocationBySlugs(
  citySlug: string,
  neighborhoodSlug: string
): Promise<LocationData | null> {
  await checkInitSeed();
  const cSlug = citySlug.toLowerCase().trim();
  const nSlug = neighborhoodSlug.toLowerCase().trim();
  try {
    const loc = await prisma.location.findFirst({
      where: {
        citySlug: cSlug,
        neighborhoodSlug: nSlug,
      },
    });
    if (loc) {
      return {
        id: loc.id,
        city: loc.city,
        citySlug: loc.citySlug,
        neighborhood: loc.neighborhood,
        neighborhoodSlug: loc.neighborhoodSlug,
        emirate: loc.emirate,
        isHighDemand: loc.isHighDemand,
        avgResponseMins: loc.avgResponseMins,
        techniciansOnDuty: loc.techniciansOnDuty,
        postalCode: loc.postalCode,
        latitude: loc.latitude,
        longitude: loc.longitude,
        metaTitle: loc.metaTitle,
        metaDesc: loc.metaDesc,
      };
    }
  } catch (err) {
    console.warn("getLocationBySlugs DB error:", err);
  }
  const fallback = LOCATIONS.find(
    (l) =>
      l.citySlug.toLowerCase() === cSlug &&
      l.neighborhoodSlug.toLowerCase() === nSlug
  );
  return fallback || null;
}

export async function saveLocation(loc: LocationData): Promise<LocationData> {
  await checkInitSeed();
  const saved = await prisma.location.upsert({
    where: {
      citySlug_neighborhoodSlug: {
        citySlug: loc.citySlug,
        neighborhoodSlug: loc.neighborhoodSlug,
      },
    },
    update: {
      city: loc.city,
      neighborhood: loc.neighborhood,
      emirate: loc.emirate,
      isHighDemand: loc.isHighDemand,
      avgResponseMins: loc.avgResponseMins,
      techniciansOnDuty: loc.techniciansOnDuty,
      postalCode: loc.postalCode,
      latitude: loc.latitude,
      longitude: loc.longitude,
      metaTitle: loc.metaTitle || `${loc.neighborhood} Technical Services`,
      metaDesc: loc.metaDesc || `24/7 Technical Services in ${loc.neighborhood}, ${loc.city}`,
    },
    create: {
      id: loc.id || `loc-${loc.citySlug}-${loc.neighborhoodSlug}`,
      city: loc.city,
      citySlug: loc.citySlug,
      neighborhood: loc.neighborhood,
      neighborhoodSlug: loc.neighborhoodSlug,
      emirate: loc.emirate,
      isHighDemand: loc.isHighDemand,
      avgResponseMins: loc.avgResponseMins,
      techniciansOnDuty: loc.techniciansOnDuty,
      postalCode: loc.postalCode,
      latitude: loc.latitude,
      longitude: loc.longitude,
      metaTitle: loc.metaTitle || `${loc.neighborhood} Technical Services`,
      metaDesc: loc.metaDesc || `24/7 Technical Services in ${loc.neighborhood}, ${loc.city}`,
    },
  });

  return {
    id: saved.id,
    city: saved.city,
    citySlug: saved.citySlug,
    neighborhood: saved.neighborhood,
    neighborhoodSlug: saved.neighborhoodSlug,
    emirate: saved.emirate,
    isHighDemand: saved.isHighDemand,
    avgResponseMins: saved.avgResponseMins,
    techniciansOnDuty: saved.techniciansOnDuty,
    postalCode: saved.postalCode,
    latitude: saved.latitude,
    longitude: saved.longitude,
    metaTitle: saved.metaTitle,
    metaDesc: saved.metaDesc,
  };
}

export async function deleteLocation(id: string): Promise<boolean> {
  await checkInitSeed();
  await prisma.location.deleteMany({
    where: { id },
  });
  return true;
}

// --- AMC Packages ---
export async function getAMCPackages(): Promise<AMCPackageData[]> {
  await checkInitSeed();
  try {
    const packages = await prisma.aMCPackage.findMany({
      orderBy: { priceAnnualAED: "asc" },
    });
    if (packages.length > 0) {
      return packages.map(mapDbAMCPackage);
    }
  } catch (err) {
    console.warn("getAMCPackages DB error:", err);
  }
  return [...AMC_PACKAGES];
}

export async function saveAMCPackage(pkg: AMCPackageData): Promise<AMCPackageData> {
  await checkInitSeed();
  const featuresJson = JSON.stringify(pkg.features || []);
  const saved = await prisma.aMCPackage.upsert({
    where: { slug: pkg.slug },
    update: {
      name: pkg.name,
      tier: pkg.tier,
      priceAnnualAED: pkg.priceAnnualAED,
      priceMonthlyAED: pkg.priceMonthlyAED,
      visitsPerYear: pkg.visitsPerYear,
      emergencyCallouts: pkg.emergencyCallouts,
      acServiceCount: pkg.acServiceCount,
      plumbingCheckups: pkg.plumbingCheckups,
      electricalAudits: pkg.electricalAudits,
      freeSparePartsAED: pkg.freeSparePartsAED,
      targetPropertyType: pkg.targetPropertyType,
      features: featuresJson,
      isFeatured: pkg.isFeatured,
    },
    create: {
      id: pkg.id || `amc-${pkg.slug}`,
      name: pkg.name,
      slug: pkg.slug,
      tier: pkg.tier,
      priceAnnualAED: pkg.priceAnnualAED,
      priceMonthlyAED: pkg.priceMonthlyAED,
      visitsPerYear: pkg.visitsPerYear,
      emergencyCallouts: pkg.emergencyCallouts,
      acServiceCount: pkg.acServiceCount,
      plumbingCheckups: pkg.plumbingCheckups,
      electricalAudits: pkg.electricalAudits,
      freeSparePartsAED: pkg.freeSparePartsAED,
      targetPropertyType: pkg.targetPropertyType,
      features: featuresJson,
      isFeatured: pkg.isFeatured,
    },
  });

  return mapDbAMCPackage(saved);
}

// --- Portfolio ---
export async function getPortfolioItems(): Promise<PortfolioItemData[]> {
  await checkInitSeed();
  try {
    const existing = await prisma.portfolioItem.findMany();
    // If DB contains old unsplash links or needs sync, refresh with local matched assets
    const needsRefresh =
      existing.length === 0 ||
      existing.some((item) => item.beforeImage.startsWith("http") || !item.beforeImage.startsWith("/images/"));

    if (needsRefresh) {
      await prisma.portfolioItem.deleteMany({});
      for (const p of PORTFOLIO_ITEMS) {
        await prisma.portfolioItem.create({
          data: {
            id: p.id,
            title: p.title,
            slug: p.slug,
            categorySlug: p.categorySlug,
            locationName: p.locationName,
            beforeImage: p.beforeImage,
            afterImage: p.afterImage,
            completionTime: p.completionTime,
            clientType: p.clientType,
            description: p.description,
            resultsAchieved: JSON.stringify(p.resultsAchieved),
          },
        });
      }
    }

    const items = await prisma.portfolioItem.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (items.length > 0) {
      return items.map(mapDbPortfolio);
    }
  } catch (err) {
    console.warn("getPortfolioItems DB error:", err);
  }
  return [...PORTFOLIO_ITEMS];
}

export async function savePortfolioItem(item: PortfolioItemData): Promise<PortfolioItemData> {
  await checkInitSeed();
  const resultsJson = JSON.stringify(item.resultsAchieved || []);
  const saved = await prisma.portfolioItem.upsert({
    where: { slug: item.slug },
    update: {
      title: item.title,
      categorySlug: item.categorySlug,
      locationName: item.locationName,
      beforeImage: item.beforeImage,
      afterImage: item.afterImage,
      completionTime: item.completionTime,
      clientType: item.clientType,
      description: item.description,
      resultsAchieved: resultsJson,
    },
    create: {
      id: item.id || `port-${item.slug}`,
      title: item.title,
      slug: item.slug,
      categorySlug: item.categorySlug,
      locationName: item.locationName,
      beforeImage: item.beforeImage,
      afterImage: item.afterImage,
      completionTime: item.completionTime,
      clientType: item.clientType,
      description: item.description,
      resultsAchieved: resultsJson,
    },
  });

  return mapDbPortfolio(saved);
}

// --- Testimonials ---
export async function getTestimonials(): Promise<TestimonialData[]> {
  await checkInitSeed();
  try {
    const tests = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (tests.length > 0) {
      return tests.map((t) => ({
        id: t.id,
        authorName: t.authorName,
        authorRole: t.authorRole,
        neighborhood: t.neighborhood,
        city: t.city,
        rating: t.rating,
        reviewText: t.reviewText,
        verifiedPurchase: t.verifiedPurchase,
        serviceName: t.serviceName,
        date: t.date,
      }));
    }
  } catch (err) {
    console.warn("getTestimonials DB error:", err);
  }
  return [...TESTIMONIALS];
}

export async function saveTestimonial(test: TestimonialData): Promise<TestimonialData> {
  await checkInitSeed();
  const saved = await prisma.testimonial.upsert({
    where: { id: test.id },
    update: {
      authorName: test.authorName,
      authorRole: test.authorRole,
      neighborhood: test.neighborhood,
      city: test.city,
      rating: test.rating,
      reviewText: test.reviewText,
      verifiedPurchase: test.verifiedPurchase,
      serviceName: test.serviceName,
      date: test.date,
    },
    create: {
      id: test.id || `test-${Date.now()}`,
      authorName: test.authorName,
      authorRole: test.authorRole,
      neighborhood: test.neighborhood,
      city: test.city,
      rating: test.rating,
      reviewText: test.reviewText,
      verifiedPurchase: test.verifiedPurchase,
      serviceName: test.serviceName,
      date: test.date,
    },
  });

  return {
    id: saved.id,
    authorName: saved.authorName,
    authorRole: saved.authorRole,
    neighborhood: saved.neighborhood,
    city: saved.city,
    rating: saved.rating,
    reviewText: saved.reviewText,
    verifiedPurchase: saved.verifiedPurchase,
    serviceName: saved.serviceName,
    date: saved.date,
  };
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await checkInitSeed();
  await prisma.testimonial.deleteMany({
    where: { id },
  });
  return true;
}

// --- Blog Posts ---
export async function getBlogPosts(): Promise<BlogPostData[]> {
  await checkInitSeed();
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (posts.length > 0) {
      return posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.coverImage,
        author: p.author,
        category: p.category,
        readTime: p.readTime,
        publishedDate: p.publishedDate,
        metaTitle: p.metaTitle,
        metaDesc: p.metaDesc,
      }));
    }
  } catch (err) {
    console.warn("getBlogPosts DB error:", err);
  }
  return [...BLOG_POSTS];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  await checkInitSeed();
  const normalized = slug.toLowerCase().trim();
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug: normalized }, { id: normalized }],
      },
    });
    if (post) {
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        author: post.author,
        category: post.category,
        readTime: post.readTime,
        publishedDate: post.publishedDate,
        metaTitle: post.metaTitle,
        metaDesc: post.metaDesc,
      };
    }
  } catch (err) {
    console.warn("getBlogPostBySlug DB error:", err);
  }
  const fallback = BLOG_POSTS.find(
    (b) => b.slug.toLowerCase() === normalized || b.id.toLowerCase() === normalized
  );
  return fallback || null;
}

export async function saveBlogPost(post: BlogPostData): Promise<BlogPostData> {
  await checkInitSeed();
  const saved = await prisma.blogPost.upsert({
    where: { slug: post.slug },
    update: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      author: post.author,
      category: post.category,
      readTime: post.readTime,
      publishedDate: post.publishedDate,
      metaTitle: post.metaTitle,
      metaDesc: post.metaDesc,
    },
    create: {
      id: post.id || `blog-${post.slug}`,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      author: post.author,
      category: post.category,
      readTime: post.readTime,
      publishedDate: post.publishedDate,
      metaTitle: post.metaTitle,
      metaDesc: post.metaDesc,
    },
  });

  return {
    id: saved.id,
    title: saved.title,
    slug: saved.slug,
    excerpt: saved.excerpt,
    content: saved.content,
    coverImage: saved.coverImage,
    author: saved.author,
    category: saved.category,
    readTime: saved.readTime,
    publishedDate: saved.publishedDate,
    metaTitle: saved.metaTitle,
    metaDesc: saved.metaDesc,
  };
}

export async function deleteBlogPost(idOrSlug: string): Promise<boolean> {
  await checkInitSeed();
  await prisma.blogPost.deleteMany({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });
  return true;
}

// --- Leads CRM ---
export async function getLeads(): Promise<LeadRecord[]> {
  await checkInitSeed();
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (leads.length > 0) {
      return leads.map(mapDbLead);
    }
  } catch (err) {
    console.warn("getLeads DB error:", err);
  }
  return [];
}

export async function createLead(data: LeadFormData): Promise<LeadRecord> {
  await checkInitSeed();
  const initialStatus: LeadStatus =
    data.urgency === "EMERGENCY_NOW" ? "DISPATCHED" : "NEW";

  const created = await prisma.lead.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      neighborhood: data.neighborhood,
      propertyType: data.propertyType,
      serviceSlug: data.serviceSlug || null,
      amcTier: data.amcTier || null,
      urgency: data.urgency,
      estimatedAED: data.estimatedAED ?? null,
      message: data.message || null,
      status: initialStatus,
      gtmEventId: data.gtmEventId || null,
    },
  });

  return mapDbLead(created);
}

export async function updateLeadStatus(
  id: string,
  status: LeadRecord["status"]
): Promise<boolean> {
  await checkInitSeed();
  await prisma.lead.update({
    where: { id },
    data: { status },
  });
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  await checkInitSeed();
  await prisma.lead.deleteMany({
    where: { id },
  });
  return true;
}
