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

export async function ensureDatabaseSeeded() {
  try {
    const catCount = await prisma.category.count();
    if (catCount > 0) {
      // Check if other tables need initial seed
      const leadCount = await prisma.lead.count();
      if (leadCount === 0) {
        await seedInitialLeads();
      }
      return;
    }

    console.log("🌱 Seeding database with complete UAE Technical Services data...");

    // 1. Categories
    for (const cat of CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
          sortOrder: cat.sortOrder,
        },
      });
    }

    // 2. Services
    for (const srv of SERVICES) {
      await prisma.service.upsert({
        where: { slug: srv.slug },
        update: {},
        create: {
          id: srv.id,
          name: srv.name,
          slug: srv.slug,
          categoryId: srv.categoryId,
          shortDesc: srv.shortDesc,
          fullContent: srv.fullContent,
          basePriceAED: srv.basePriceAED,
          priceUnit: srv.priceUnit,
          emergencyAvailable: srv.emergencyAvailable,
          isPopular: srv.isPopular,
          isActive: srv.isActive,
          features: JSON.stringify(srv.features),
          faqs: JSON.stringify(srv.faqs),
          metaTitle: srv.metaTitle,
          metaDesc: srv.metaDesc,
          image: srv.image || null,
        } as any,
      });
    }

    // 3. Locations
    for (const loc of LOCATIONS) {
      await prisma.location.upsert({
        where: {
          citySlug_neighborhoodSlug: {
            citySlug: loc.citySlug,
            neighborhoodSlug: loc.neighborhoodSlug,
          },
        },
        update: {},
        create: {
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
          metaTitle: loc.metaTitle || `${loc.neighborhood} Technical Services`,
          metaDesc: loc.metaDesc || `24/7 Technical Services in ${loc.neighborhood}, ${loc.city}`,
        },
      });
    }

    // 4. AMC Packages
    for (const amc of AMC_PACKAGES) {
      await prisma.aMCPackage.upsert({
        where: { slug: amc.slug },
        update: {},
        create: {
          id: amc.id,
          name: amc.name,
          slug: amc.slug,
          tier: amc.tier,
          priceAnnualAED: amc.priceAnnualAED,
          priceMonthlyAED: amc.priceMonthlyAED,
          visitsPerYear: amc.visitsPerYear,
          emergencyCallouts: amc.emergencyCallouts,
          acServiceCount: amc.acServiceCount,
          plumbingCheckups: amc.plumbingCheckups,
          electricalAudits: amc.electricalAudits,
          freeSparePartsAED: amc.freeSparePartsAED,
          targetPropertyType: amc.targetPropertyType,
          features: JSON.stringify(amc.features),
          isFeatured: amc.isFeatured,
        },
      });
    }

    // 5. Portfolio Items
    await prisma.portfolioItem.deleteMany({});
    for (const item of PORTFOLIO_ITEMS) {
      await prisma.portfolioItem.create({
        data: {
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
          resultsAchieved: JSON.stringify(item.resultsAchieved),
        },
      });
    }

    // 6. Testimonials
    for (const test of TESTIMONIALS) {
      await prisma.testimonial.upsert({
        where: { id: test.id },
        update: {},
        create: {
          id: test.id,
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
    }

    // 7. Blog Posts
    for (const blog of BLOG_POSTS) {
      await prisma.blogPost.upsert({
        where: { slug: blog.slug },
        update: {},
        create: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          coverImage: blog.coverImage,
          author: blog.author,
          category: blog.category,
          readTime: blog.readTime,
          publishedDate: blog.publishedDate,
          metaTitle: blog.metaTitle,
          metaDesc: blog.metaDesc,
        },
      });
    }

    // 8. Business Settings
    await prisma.businessSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        companyName: BUSINESS_SETTINGS.companyName,
        phone: BUSINESS_SETTINGS.phone,
        emergencyHotline: BUSINESS_SETTINGS.emergencyHotline,
        whatsappNumber: BUSINESS_SETTINGS.whatsappNumber,
        email: BUSINESS_SETTINGS.email,
        address: BUSINESS_SETTINGS.address,
        city: BUSINESS_SETTINGS.city,
        country: BUSINESS_SETTINGS.country,
        openingHours: BUSINESS_SETTINGS.openingHours,
        dedLicense: BUSINESS_SETTINGS.dedLicense,
        dewaLicense: BUSINESS_SETTINGS.dewaLicense,
        municipalityLicense: BUSINESS_SETTINGS.municipalityLicense,
        isoCertified: BUSINESS_SETTINGS.isoCertified,
        bannerNotice: BUSINESS_SETTINGS.bannerNotice,
        bannerEnabled: BUSINESS_SETTINGS.bannerEnabled,
      },
    });

    // 9. Initial Leads
    await seedInitialLeads();

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.warn("Database seed note (fallback available):", error);
  }
}

async function seedInitialLeads() {
  await prisma.lead.upsert({
    where: { id: "lead-init-1" },
    update: {},
    create: {
      id: "lead-init-1",
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
    },
  });

  await prisma.lead.upsert({
    where: { id: "lead-init-2" },
    update: {},
    create: {
      id: "lead-init-2",
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
    },
  });

  await prisma.lead.upsert({
    where: { id: "lead-init-3" },
    update: {},
    create: {
      id: "lead-init-3",
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
    },
  });
}
