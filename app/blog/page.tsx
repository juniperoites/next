import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/store";
import { FileText, Clock, User, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & UAE Property Maintenance Guides | Al-Safwa UAE",
  description: "Expert guides on AC maintenance, thermal leak detection, DEWA bill reduction, and home care in UAE desert climate.",
};

export default async function BlogIndexPage() {
  const blogs = await getBlogPosts();

  return (
    <div className="min-h-screen bg-surface pb-20">
      <section className="py-14 bg-white border-b border-surfaceBorder text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Expert Technical Insights</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            UAE Home Maintenance Guides & Tips
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Practical advice from our DEWA-certified engineers on keeping your home efficient, safe, and cool.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="clean-card rounded-3xl overflow-hidden bg-white flex flex-col justify-between group"
            >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-brand-700 font-bold mb-2">
                    <span className="bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{blog.readTime}</span>
                  </div>

                  <h2 className="font-heading font-extrabold text-slate-900 text-lg leading-snug group-hover:text-brand-600 transition">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surfaceBorder flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{blog.publishedDate}</span>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-brand-600 font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
