"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LeadRecord,
  ServiceData,
  LocationData,
  CategoryData,
  TestimonialData,
  BlogPostData,
  BusinessSettingsData,
} from "@/lib/types";
import {
  Users,
  DollarSign,
  Zap,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Edit2,
  Save,
  Trash2,
  Plus,
  MessageSquare,
  Phone,
  Code,
  Globe,
  Sliders,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  Star,
  Settings,
  Layers,
  MapPin,
  Building,
  Image as ImageIcon,
  Check,
  X,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { generateLocalBusinessSchema, generateServiceSchema, SITE_CONFIG } from "@/lib/seo";
import { AdminLogin } from "./AdminLogin";

interface AdminDashboardProps {
  initialLeads: LeadRecord[];
  initialServices: ServiceData[];
  locations: LocationData[];
  categories: CategoryData[];
  testimonials: TestimonialData[];
  blogPosts: BlogPostData[];
  settings: BusinessSettingsData;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialLeads,
  initialServices,
  locations: initialLocations,
  categories: initialCategories,
  testimonials: initialTestimonials,
  blogPosts: initialBlogs,
  settings: initialSettings,
}) => {
  const [activeTab, setActiveTab] = useState<
    "leads" | "pricing" | "categories" | "locations" | "blogs" | "testimonials" | "settings" | "seo"
  >("leads");

  // State
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [services, setServices] = useState<ServiceData[]>(initialServices);
  const [locations, setLocations] = useState<LocationData[]>(initialLocations);
  const [categories, setCategories] = useState<CategoryData[]>(initialCategories);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(initialTestimonials);
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>(initialBlogs);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettingsData>(initialSettings);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("alsafwa_admin_user");
      if (stored) {
        try {
          const user = JSON.parse(stored);
          setCurrentUser(user);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("alsafwa_admin_user");
        }
      }
      setIsAuthChecking(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("alsafwa_admin_user");
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    showNotification("Logged out successfully from Admin Console");
  };

  // Filters & Notifications
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Edit / Add Service Modal
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceData>>({
    name: "",
    slug: "",
    categoryId: "cat-ac",
    categorySlug: "ac-services",
    categoryName: "AC Services",
    shortDesc: "",
    fullContent: "",
    basePriceAED: 199,
    priceUnit: "per service",
    emergencyAvailable: true,
    isPopular: false,
    isActive: true,
    features: ["24/7 Rapid Response", "DEWA Certified", "90-Day Warranty"],
    faqs: [{ question: "How fast can you arrive?", answer: "Within 25 to 30 minutes in Dubai." }],
    metaTitle: "",
    metaDesc: "",
  });

  // Edit Price Inline
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  // Add Location Modal
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationForm, setLocationForm] = useState<Partial<LocationData>>({
    city: "Dubai",
    citySlug: "dubai",
    neighborhood: "",
    neighborhoodSlug: "",
    emirate: "Dubai",
    isHighDemand: true,
    avgResponseMins: 25,
    techniciansOnDuty: 5,
    postalCode: "39200",
    latitude: 25.1,
    longitude: 55.2,
  });

  // SEO Inspector State
  const [inspectorServiceSlug, setInspectorServiceSlug] = useState<string>(services[0]?.slug || "ac-repair");
  const [inspectorLocationId, setInspectorLocationId] = useState<string>(locations[0]?.id || "");

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
        showNotification("Leads CRM refreshed with latest customer inquiries");
      }
    } catch (e) {
      showNotification("Failed to refresh leads", "error");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadRecord["status"]) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        showNotification(`Lead status updated to ${newStatus}`);
      }
    } catch (e) {
      showNotification("Failed to update status", "error");
    }
  };

  const handleSavePrice = async (serviceId: string) => {
    try {
      const res = await fetch("/api/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, basePriceAED: editPrice }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === serviceId ? { ...s, basePriceAED: editPrice } : s))
        );
        setEditingServiceId(null);
        showNotification(`Instant Price updated: AED ${editPrice} is now live on the website!`);
      }
    } catch (e) {
      showNotification("Failed to update price", "error");
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name || !serviceForm.slug) {
      showNotification("Service Name and URL slug are required", "error");
      return;
    }

    const payload: ServiceData = {
      id: serviceForm.id || `srv-${serviceForm.slug}`,
      name: serviceForm.name,
      slug: serviceForm.slug.toLowerCase().replace(/\s+/g, "-"),
      categoryId: serviceForm.categoryId || "cat-ac",
      categorySlug: serviceForm.categorySlug || "ac-services",
      categoryName: serviceForm.categoryName || "AC Services",
      shortDesc: serviceForm.shortDesc || "Professional UAE technical maintenance service.",
      fullContent: serviceForm.fullContent || "Comprehensive engineering service with 90-day warranty.",
      basePriceAED: Number(serviceForm.basePriceAED) || 199,
      priceUnit: serviceForm.priceUnit || "per service",
      emergencyAvailable: Boolean(serviceForm.emergencyAvailable),
      isPopular: Boolean(serviceForm.isPopular),
      isActive: serviceForm.isActive !== false,
      features: serviceForm.features || ["24/7 Rapid Response", "DEWA Certified"],
      faqs: serviceForm.faqs || [],
      metaTitle: serviceForm.metaTitle || `${serviceForm.name} in Dubai UAE`,
      metaDesc: serviceForm.metaDesc || `Professional ${serviceForm.name} in Dubai & UAE.`,
    };

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => {
          const index = prev.findIndex((s) => s.id === payload.id || s.slug === payload.slug);
          if (index >= 0) {
            const updated = [...prev];
            updated[index] = payload;
            return updated;
          }
          return [payload, ...prev];
        });
        setIsServiceModalOpen(false);
        showNotification(`Service "${payload.name}" saved successfully! Page is live.`);
      }
    } catch (e) {
      showNotification("Failed to save service", "error");
    }
  };

  const handleDeleteService = async (serviceId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services?id=${serviceId}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== serviceId && s.slug !== serviceId));
        showNotification(`Service "${name}" deleted.`);
      }
    } catch (e) {
      showNotification("Failed to delete service", "error");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessSettings),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Business hotline numbers, address & DED licenses updated across website!");
      }
    } catch (e) {
      showNotification("Failed to update settings", "error");
    }
  };

  // KPI Calculations
  const totalLeadsCount = leads.length;
  const emergencyCalloutsCount = leads.filter((l) => l.urgency === "EMERGENCY_NOW").length;
  const totalPipelineAED = leads.reduce((acc, curr) => acc + (curr.estimatedAED || 0), 0);
  const activeDispatches = leads.filter((l) => l.status === "DISPATCHED").length;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const inspectedService = services.find((s) => s.slug === inspectorServiceSlug) || services[0];
  const inspectedLocation = locations.find((l) => l.id === inspectorLocationId) || locations[0];
  const generatedServiceSchema = inspectedService
    ? generateServiceSchema(inspectedService, inspectedLocation)
    : null;

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-slate-700">
        <div className="flex items-center gap-2.5 text-xs font-bold bg-white px-5 py-3 rounded-2xl border border-surfaceBorder shadow-sm">
          <span className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          showNotification(`Authenticated as ${user.name}`);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface text-slate-900 pb-24">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-surfaceBorder sticky top-0 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surfaceHover border border-surfaceBorder text-xs font-semibold text-slate-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg text-slate-900">
                AL-SAFWA Admin CMS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                OPERATIONS CONTROL ROOM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surfaceBorder text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-700">
                {currentUser?.name || "Master Dispatcher"}
              </span>
              <span className="text-slate-400 text-[10px]">({currentUser?.email || "admin@alsafwa.ae"})</span>
            </div>

            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Sync & Refresh Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-8 mt-4 ${
            notification.type === "success" ? "text-emerald-800 bg-emerald-50 border-emerald-300" : "text-red-800 bg-red-50 border-red-300"
          } p-3 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-sm animate-in fade-in`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Total Leads</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-heading font-extrabold text-slate-900">
              {totalLeadsCount}
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% new inquiries this week
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Pipeline Value</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-heading font-extrabold text-slate-900">
              AED {totalPipelineAED.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Avg job estimate: AED {totalLeadsCount ? Math.round(totalPipelineAED / totalLeadsCount) : 0}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Active Dispatches</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-heading font-extrabold text-slate-900">
              {activeDispatches} Technicians
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-semibold">
              On-site in &lt; 25 mins
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Emergency 24/7 Calls</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl font-heading font-extrabold text-slate-900">
              {emergencyCalloutsCount} Callouts
            </div>
            <div className="mt-1 text-[11px] text-amber-700 font-semibold">
              High-priority urgent breakdown
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-surfaceBorder pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "leads"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads CRM ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "pricing"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Services & Pricing ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "categories"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("locations")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "locations"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Location Hubs ({locations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "blogs"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blog & Guides ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "testimonials"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Testimonials ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "settings"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Business Hotlines & Licenses</span>
          </button>

          <button
            onClick={() => setActiveTab("seo")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "seo"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-surfaceHover border border-surfaceBorder"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SEO & Schema Inspector</span>
          </button>
        </div>

        {/* Tab 1: Leads CRM */}
        {activeTab === "leads" && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder flex flex-col sm:flex-row items-center justify-between gap-3 shadow-subtle">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer, area, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-surface border border-surfaceBorder text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-600">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-surface border border-surfaceBorder font-semibold text-slate-800"
                >
                  <option value="ALL">All Statuses ({leads.length})</option>
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="DISPATCHED">DISPATCHED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl bg-white border border-surfaceBorder shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface text-slate-600 uppercase text-[10px] font-bold border-b border-surfaceBorder">
                    <tr>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Location & Property</th>
                      <th className="p-4">Urgency & Estimated AED</th>
                      <th className="p-4">Dispatch Status</th>
                      <th className="p-4 text-right">Instant CRM Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surfaceBorder">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-sm">{lead.fullName}</div>
                          <div className="text-slate-600 font-mono mt-0.5">{lead.phone}</div>
                          <div className="text-slate-400 text-[11px]">{lead.email}</div>
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-slate-800">
                            {lead.neighborhood}, {lead.city}
                          </div>
                          <div className="text-brand-600 font-medium text-[11px]">
                            {lead.propertyType}
                          </div>
                          {lead.message && (
                            <div className="text-slate-500 text-[11px] line-clamp-1 mt-1 max-w-xs">
                              "{lead.message}"
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            {lead.urgency === "EMERGENCY_NOW" ? (
                              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold border border-red-200 text-[10px]">
                                🚨 EMERGENCY NOW
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                                {lead.urgency}
                              </span>
                            )}
                          </div>
                          <div className="font-heading font-extrabold text-emerald-700 text-sm">
                            {lead.estimatedAED ? `AED ${lead.estimatedAED}` : "Custom Quote"}
                          </div>
                        </td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadRecord["status"])
                            }
                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] border cursor-pointer ${
                              lead.status === "DISPATCHED"
                                ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                                : lead.status === "NEW"
                                ? "bg-blue-100 border-blue-300 text-blue-800"
                                : lead.status === "CONTACTED"
                                ? "bg-amber-100 border-amber-300 text-amber-800"
                                : "bg-slate-100 border-slate-300 text-slate-700"
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="DISPATCHED">DISPATCHED</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                              lead.fullName
                            )}%2C%20this%20is%20Al-Safwa%20Operations%20regarding%20your%20maintenance%20inquiry.`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surfaceHover border border-surfaceBorder text-slate-700 font-semibold"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Services & Pricing CMS */}
        {activeTab === "pricing" && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder flex flex-wrap items-center justify-between gap-4 shadow-subtle">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  Services & Pricing CMS
                </h3>
                <p className="text-xs text-slate-500">
                  Update any service price instantly (e.g. AC Repair AED 199 → AED 249) or add new service landing pages without code changes.
                </p>
              </div>

              <button
                onClick={() => {
                  setServiceForm({
                    name: "",
                    slug: "",
                    categoryId: "cat-ac",
                    categorySlug: "ac-services",
                    categoryName: "AC Services",
                    shortDesc: "",
                    fullContent: "",
                    basePriceAED: 199,
                    priceUnit: "per service",
                    emergencyAvailable: true,
                    isPopular: false,
                    isActive: true,
                    features: ["24/7 Rapid Response", "DEWA Certified", "90-Day Warranty"],
                    faqs: [{ question: "How fast can you arrive?", answer: "Within 25 to 30 minutes." }],
                    metaTitle: "",
                    metaDesc: "",
                  });
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service Page</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((srv) => {
                const isEditing = editingServiceId === srv.id;

                return (
                  <div
                    key={srv.id}
                    className="p-5 rounded-2xl bg-white border border-surfaceBorder hover:border-brand-400 shadow-subtle flex flex-col justify-between transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                          {srv.categoryName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            srv.isActive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {srv.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      <h4 className="text-base font-heading font-bold text-slate-900">
                        {srv.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.shortDesc}</p>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">/services/{srv.slug}</div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-surfaceBorder flex items-center justify-between">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600">AED</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                            className="w-20 bg-surface text-slate-900 font-bold p-1 rounded-lg border border-brand-500 text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleSavePrice(srv.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" /> Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Base Tariff</div>
                          <div className="text-lg font-heading font-extrabold text-slate-900">
                            AED {srv.basePriceAED}
                          </div>
                        </div>
                      )}

                      {!isEditing && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingServiceId(srv.id);
                              setEditPrice(srv.basePriceAED);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surfaceHover border border-surfaceBorder text-slate-700 text-xs font-semibold flex items-center gap-1"
                            title="Quick Edit Price"
                          >
                            <Edit2 className="w-3 h-3 text-brand-600" />
                            <span>Edit Price</span>
                          </button>

                          <button
                            onClick={() => {
                              setServiceForm(srv);
                              setIsServiceModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-surface hover:bg-surfaceHover border border-surfaceBorder text-slate-600"
                            title="Full Edit"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteService(srv.id, srv.name)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Categories CMS */}
        {activeTab === "categories" && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder flex items-center justify-between shadow-subtle">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">Service Categories</h3>
                <p className="text-xs text-slate-500">
                  Manage primary service categories and their display order.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-base">{cat.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
                  <div className="text-[11px] font-mono text-slate-400 mt-2">/services/{cat.slug}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Locations CMS */}
        {activeTab === "locations" && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder flex flex-wrap items-center justify-between gap-4 shadow-subtle">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  UAE Service Areas & Neighborhoods
                </h3>
                <p className="text-xs text-slate-500">
                  Manage programmatic landing page locations and dispatch response SLAs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div key={loc.id} className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {loc.city}
                      </span>
                      {loc.isHighDemand && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          High Demand
                        </span>
                      )}
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      {loc.neighborhood}
                    </h4>
                    <div className="text-xs text-slate-500 mt-1">
                      Active Techs: <strong className="text-slate-800">{loc.techniciansOnDuty}</strong> | Response SLA: <strong className="text-emerald-700">{loc.avgResponseMins} mins</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-surfaceBorder flex items-center justify-between">
                    <Link
                      href={`/services/ac-repair/${loc.citySlug}/${loc.neighborhoodSlug}`}
                      target="_blank"
                      className="text-xs text-brand-600 hover:underline font-bold flex items-center gap-1"
                    >
                      <span>View Live Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Blog CMS */}
        {activeTab === "blogs" && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder flex items-center justify-between shadow-subtle">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">Blog & UAE Maintenance Guides</h3>
                <p className="text-xs text-slate-500">
                  Publish SEO-optimized guides to generate organic Google search traffic and homeowner trust.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((blog) => (
                <div key={blog.id} className="rounded-2xl bg-white border border-surfaceBorder overflow-hidden shadow-subtle flex flex-col justify-between">
                  <img src={blog.coverImage} alt={blog.title} className="h-44 w-full object-cover" />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                        {blog.category}
                      </span>
                      <h4 className="font-heading font-bold text-slate-900 text-sm mt-2 leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{blog.excerpt}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-surfaceBorder flex items-center justify-between text-xs text-slate-400">
                      <span>{blog.publishedDate}</span>
                      <Link href={`/blog/${blog.slug}`} className="text-brand-600 font-bold hover:underline">
                        Read Guide →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Testimonials CMS */}
        {activeTab === "testimonials" && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder flex items-center justify-between shadow-subtle">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">Customer Reviews & Testimonials</h3>
                <p className="text-xs text-slate-500">
                  Verified customer reviews from Palm Jumeirah, Emirates Hills, and Saadiyat Island.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-5 rounded-2xl bg-white border border-surfaceBorder shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic">"{t.reviewText}"</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surfaceBorder flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block">{t.authorName}</strong>
                      <span className="text-slate-500">{t.neighborhood}, {t.city}</span>
                    </div>
                    <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                      Verified Client
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Business Settings CMS */}
        {activeTab === "settings" && (
          <div className="mt-6">
            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-6">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-lg">
                  Business Information & Emergency Hotlines
                </h3>
                <p className="text-xs text-slate-500">
                  Changes saved here immediately update the website headers, footers, CTAs, and WhatsApp dispatch numbers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={businessSettings.companyName}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, companyName: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Primary Toll-Free Phone</label>
                  <input
                    type="text"
                    value={businessSettings.phone}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, phone: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">24/7 Emergency Hotline</label>
                  <input
                    type="text"
                    value={businessSettings.emergencyHotline}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, emergencyHotline: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Dispatch Number (International format)</label>
                  <input
                    type="text"
                    value={businessSettings.whatsappNumber}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, whatsappNumber: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Support Email</label>
                  <input
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, email: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Office Address</label>
                  <input
                    type="text"
                    value={businessSettings.address}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, address: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">DED Commercial License</label>
                  <input
                    type="text"
                    value={businessSettings.dedLicense}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, dedLicense: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">DEWA Contractor License</label>
                  <input
                    type="text"
                    value={businessSettings.dewaLicense}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, dewaLicense: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Emergency Header Announcement</label>
                <input
                  type="text"
                  value={businessSettings.bannerNotice}
                  onChange={(e) => setBusinessSettings({ ...businessSettings, bannerNotice: e.target.value })}
                  className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings & Hotlines</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 8: SEO & Schema Inspector */}
        {activeTab === "seo" && (
          <div className="mt-6 space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-surfaceBorder grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-subtle">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Service</label>
                <select
                  value={inspectorServiceSlug}
                  onChange={(e) => setInspectorServiceSlug(e.target.value)}
                  className="w-full bg-surface text-slate-900 p-2.5 rounded-xl border border-surfaceBorder text-xs"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select UAE Location</label>
                <select
                  value={inspectorLocationId}
                  onChange={(e) => setInspectorLocationId(e.target.value)}
                  className="w-full bg-surface text-slate-900 p-2.5 rounded-xl border border-surfaceBorder text-xs"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.neighborhood} ({l.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-surfaceBorder shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  Target Programmatic SEO Endpoint
                </span>
                <Link
                  href={`/services/${inspectedService.slug}/${inspectedLocation.citySlug}/${inspectedLocation.neighborhoodSlug}`}
                  target="_blank"
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>Open Live Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-surface font-mono text-xs text-slate-800 break-all border border-surfaceBorder">
                {SITE_CONFIG.domain}/services/{inspectedService.slug}/{inspectedLocation.citySlug}/{inspectedLocation.neighborhoodSlug}
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-slate-700 mb-1">Auto-Generated JSON-LD `Service` Schema:</div>
                <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-72">
                  {JSON.stringify(generatedServiceSchema, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-surfaceBorder shadow-2xl my-8 overflow-hidden">
            <div className="p-5 bg-surface border-b border-surfaceBorder flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900 text-base">
                {serviceForm.id ? "Edit Service" : "Add New Service Page"}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Service Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. AC Duct Deep Cleaning"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    required
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL Slug *</label>
                  <input
                    type="text"
                    placeholder="e.g. ac-duct-cleaning"
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    required
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Base Price in AED *</label>
                  <input
                    type="number"
                    value={serviceForm.basePriceAED}
                    onChange={(e) => setServiceForm({ ...serviceForm, basePriceAED: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Price Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. per inspection / per room"
                    value={serviceForm.priceUnit}
                    onChange={(e) => setServiceForm({ ...serviceForm, priceUnit: e.target.value })}
                    className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Short Description (for Cards & SERPs)</label>
                <textarea
                  rows={2}
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Technical Scope & Content</label>
                <textarea
                  rows={4}
                  value={serviceForm.fullContent}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullContent: e.target.value })}
                  className="w-full bg-surface border border-surfaceBorder rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceForm.emergencyAvailable}
                    onChange={(e) => setServiceForm({ ...serviceForm, emergencyAvailable: e.target.checked })}
                    className="accent-brand-600 w-4 h-4 rounded"
                  />
                  <span>24/7 Emergency Dispatch Available</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceForm.isActive}
                    onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
                    className="accent-brand-600 w-4 h-4 rounded"
                  />
                  <span>Service Active</span>
                </label>
              </div>

              <div className="pt-4 border-t border-surfaceBorder flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface text-slate-700 font-semibold text-xs hover:bg-surfaceHover border border-surfaceBorder"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
                >
                  Save Service Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
