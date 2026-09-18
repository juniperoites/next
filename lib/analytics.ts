import { TrackingEvent } from "./types";

type EventCallback = (event: TrackingEvent) => void;
const listeners: Set<EventCallback> = new Set();
const eventHistory: TrackingEvent[] = [];

/**
 * Register listener for real-time tracking events (used by UI debugger)
 */
export function subscribeToEvents(callback: EventCallback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getEventHistory(): TrackingEvent[] {
  return [...eventHistory];
}

/**
 * Unified event dispatcher for GTM / GA4 / Meta Pixel & CRM
 */
export function trackCustomEvent(
  eventName: TrackingEvent["eventName"],
  payload: Record<string, any> = {},
  channel: TrackingEvent["channel"] = "GA4"
) {
  const event: TrackingEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toLocaleTimeString(),
    eventName,
    payload,
    channel,
  };

  eventHistory.unshift(event);
  if (eventHistory.length > 50) eventHistory.pop();

  // Notify active UI debugger subscribers
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch (e) {
      console.error("Event listener error:", e);
    }
  });

  // Safe window-level dispatchers for real GTM/GA4/Meta environments
  if (typeof window !== "undefined") {
    // 1. Google Tag Manager / GA4 dataLayer
    const windowWithDataLayer = window as any;
    windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
    windowWithDataLayer.dataLayer.push({
      event: eventName,
      ...payload,
      timestamp: new Date().toISOString(),
    });

    // 2. Meta Pixel fbq trackCustom
    if (typeof windowWithDataLayer.fbq === "function") {
      windowWithDataLayer.fbq("trackCustom", eventName, payload);
    }

    // 3. Console logger in development
    if (process.env.NODE_ENV !== "production") {
      console.log(`📡 [Analytics Event Dispatched] [${channel}] ->`, eventName, payload);
    }
  }

  return event;
}

/**
 * Quick helpers for critical high-intent conversions
 */
export const Analytics = {
  trackWhatsAppClick: (serviceName?: string, locationName?: string) => {
    return trackCustomEvent(
      "whatsapp_click",
      {
        service: serviceName || "General Inquiry",
        location: locationName || "UAE",
        cta_position: "Direct WhatsApp Button",
        currency: "AED",
      },
      "Meta Pixel"
    );
  },

  trackPhoneCallClick: (serviceName?: string, locationName?: string) => {
    return trackCustomEvent(
      "phone_call_click",
      {
        service: serviceName || "Direct Hotline",
        location: locationName || "UAE",
        hotline: "+971 4 399 8877",
      },
      "GA4"
    );
  },

  trackQuoteSubmit: (data: {
    service: string;
    location: string;
    estimatedAED: number;
    urgency: string;
  }) => {
    return trackCustomEvent(
      "quote_form_submit",
      {
        ...data,
        value: data.estimatedAED,
        currency: "AED",
      },
      "CRM Webhook"
    );
  },

  trackAMCInquiry: (tier: string, priceAnnualAED: number) => {
    return trackCustomEvent(
      "amc_inquiry_submit",
      {
        plan_tier: tier,
        value: priceAnnualAED,
        currency: "AED",
        contract_type: "Annual 365-Day",
      },
      "GA4"
    );
  },

  trackEmergencyDispatch: (neighborhood: string, avgEtaMins: number) => {
    return trackCustomEvent(
      "emergency_dispatch_click",
      {
        target_neighborhood: neighborhood,
        eta_minutes: avgEtaMins,
        urgency: "HIGH_PRIORITY_CALLOUT",
      },
      "Meta Pixel"
    );
  },
};
