export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categorySlug?: string;
  categoryName?: string;
  shortDesc: string;
  fullContent: string;
  basePriceAED: number;
  priceUnit: string;
  emergencyAvailable: boolean;
  isPopular: boolean;
  isActive: boolean;
  features: string[];
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDesc: string;
  image?: string;
}

export interface LocationData {
  id: string;
  city: string; // e.g. "Dubai", "Abu Dhabi", "Sharjah", "Ajman"
  citySlug: string;
  neighborhood: string; // e.g. "Dubai Marina", "Palm Jumeirah", "JVC", "Downtown Dubai"
  neighborhoodSlug: string;
  emirate: string;
  isHighDemand: boolean;
  avgResponseMins: number;
  techniciansOnDuty: number;
  postalCode: string;
  latitude: number;
  longitude: number;
  metaTitle?: string;
  metaDesc?: string;
}

export interface AMCPackageData {
  id: string;
  name: string;
  slug: string;
  tier: "SILVER" | "GOLD" | "PLATINUM";
  priceAnnualAED: number;
  priceMonthlyAED: number;
  visitsPerYear: number;
  emergencyCallouts: number; // -1 for unlimited
  acServiceCount: number;
  plumbingCheckups: number;
  electricalAudits: number;
  freeSparePartsAED: number;
  targetPropertyType: string;
  features: string[];
  isFeatured: boolean;
}

export interface PortfolioItemData {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  locationName: string;
  beforeImage: string;
  afterImage: string;
  completionTime: string;
  clientType: string;
  description: string;
  resultsAchieved: string[];
}

export interface TestimonialData {
  id: string;
  authorName: string;
  authorRole: string;
  neighborhood: string;
  city: string;
  rating: number;
  reviewText: string;
  verifiedPurchase: boolean;
  serviceName: string;
  date: string;
  avatarUrl?: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  readTime: string;
  publishedDate: string;
  metaTitle: string;
  metaDesc: string;
}

export interface BusinessSettingsData {
  companyName: string;
  phone: string;
  emergencyHotline: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
  openingHours: string;
  dedLicense: string;
  dewaLicense: string;
  municipalityLicense: string;
  isoCertified: string;
  bannerNotice: string;
  bannerEnabled: boolean;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
  propertyType: "Apartment" | "Villa / Townhouse" | "Commercial" | "Penthouse";
  serviceSlug?: string;
  amcTier?: string;
  urgency: "EMERGENCY_NOW" | "WITHIN_24_HRS" | "SCHEDULED";
  estimatedAED?: number;
  message?: string;
  gtmEventId?: string;
}

export type LeadStatus = "NEW" | "CONTACTED" | "DISPATCHED" | "COMPLETED" | "CANCELLED";

export interface LeadRecord extends LeadFormData {
  id: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingEvent {
  id: string;
  timestamp: string;
  eventName:
    | "whatsapp_click"
    | "phone_call_click"
    | "quote_form_submit"
    | "amc_inquiry_submit"
    | "emergency_dispatch_click"
    | "page_view"
    | "calculator_calculate";
  payload: Record<string, any>;
  channel: "GA4" | "GTM" | "Meta Pixel" | "CRM Webhook";
}
