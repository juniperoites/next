"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Key,
  Building,
} from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both Admin ID and Password");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid Admin credentials");
        setIsLoading(false);
        return;
      }

      // Save token in localStorage for persistent client state
      if (typeof window !== "undefined") {
        localStorage.setItem("alsafwa_admin_user", JSON.stringify(data.user));
      }

      onLoginSuccess(data.user);
    } catch (err: any) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-surfaceBorder px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-surfaceHover border border-surfaceBorder text-xs font-semibold text-slate-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Website</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Secure UAE Server • 256-Bit SSL
          </span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="clean-card rounded-3xl bg-white p-6 sm:p-10 border border-surfaceBorder shadow-xl relative overflow-hidden">
            {/* Top Accent Pill */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </div>

            <div className="text-center space-y-1.5 mb-8">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Al-Safwa Admin Portal
              </h1>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Authorized Operations & Technician Dispatch Console. Enter your credentials to access.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Admin ID / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="admin or admin@alsafwa.ae"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-surface border border-surfaceBorder text-slate-900 focus:outline-none focus:border-brand-500 transition font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-surface border border-surfaceBorder text-slate-900 focus:outline-none focus:border-brand-500 transition font-medium font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Control Room</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Helper */}
            <div className="mt-8 pt-6 border-t border-surfaceBorder">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
                Default Access Credentials
              </div>
              <div className="p-3 rounded-2xl bg-surface border border-surfaceBorder flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div>
                    <span className="text-slate-500 font-semibold">ID: </span>
                    <code className="text-slate-900 font-bold bg-white px-1.5 py-0.5 rounded border border-surfaceBorder">
                      admin
                    </code>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Pass: </span>
                    <code className="text-slate-900 font-bold bg-white px-1.5 py-0.5 rounded border border-surfaceBorder">
                      admin123
                    </code>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickFill("admin", "admin123")}
                  className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-[11px] border border-brand-200 transition flex items-center gap-1"
                >
                  <Key className="w-3 h-3" />
                  <span>Auto-Fill</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surfaceBorder px-4 py-3 text-center text-xs text-slate-400">
        © 2026 Al-Safwa Technical Services & Facility Management L.L.C. • Dubai, UAE
      </footer>
    </div>
  );
};
