"use client";

import React, { useState, useEffect } from "react";
import { subscribeToEvents, getEventHistory } from "@/lib/analytics";
import { TrackingEvent } from "@/lib/types";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

export const EventDebuggerDrawer: React.FC = () => {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastEventName, setLastEventName] = useState<string | null>(null);

  useEffect(() => {
    setEvents(getEventHistory());

    const unsubscribe = subscribeToEvents((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 30)]);
      setLastEventName(newEvent.eventName);
      setTimeout(() => setLastEventName(null), 3000);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-80">
      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-white border border-surfaceBorder hover:border-brand-400 shadow-card transition text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-800">
            Analytics Telemetry Hub
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-brand-700 font-mono font-bold">
            {events.length}
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          {lastEventName && (
            <span className="text-[10px] text-emerald-700 font-mono font-bold animate-pulse">
              ⚡ {lastEventName}
            </span>
          )}
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Drawer */}
      {isOpen && (
        <div className="mt-2 rounded-2xl bg-white border border-surfaceBorder p-4 shadow-elevated space-y-3 max-h-96 overflow-y-auto animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-surfaceBorder text-xs text-slate-600">
            <span className="font-bold text-slate-800">Live Dispatched Triggers</span>
            <button
              onClick={() => setEvents([])}
              className="text-[11px] text-slate-400 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>

          {events.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              No events fired yet. Click any CTA, WhatsApp button, or quote modal to see live GA4/Meta Pixel dispatch stream.
            </div>
          ) : (
            <div className="space-y-2">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-xl bg-surface border border-surfaceBorder text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono font-bold text-brand-700 text-[11px]">
                      {evt.eventName}
                    </span>
                    <span className="text-[10px] text-slate-400">{evt.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono border border-emerald-300">
                      {evt.channel}
                    </span>
                    {evt.payload?.value && (
                      <span className="text-[10px] text-slate-900 font-mono font-bold">
                        AED {evt.payload.value}
                      </span>
                    )}
                  </div>

                  {evt.payload && Object.keys(evt.payload).length > 0 && (
                    <pre className="text-[10px] text-slate-700 bg-slate-100 p-1.5 rounded font-mono overflow-x-auto border border-slate-200">
                      {JSON.stringify(evt.payload, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
