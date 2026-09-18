import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/store";
import { ArrowLeft, Clock, User, Calendar, Share2, Sparkles, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";
import { BUSINESS_SETTINGS } from "@/lib/data";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogPosts();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogPostBySlug(params.slug);
  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: `${blog.title} | Al-Safwa UAE`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${SITE_CONFIG.domain}/blog/${blog.slug}`,
      type: "article",
    },
  };
}

export default async function SingleBlogPostPage({ params }: PageProps) {
  const blog = await getBlogPostBySlug(params.slug);
  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-surfaceBorder py-3 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600 transition">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">{blog.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-brand-700 font-bold hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </Link>

        <div className="clean-card rounded-3xl overflow-hidden bg-white p-6 sm:p-10 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              {blog.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <User className="w-3.5 h-3.5 text-brand-600" /> {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {blog.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {blog.readTime}
              </span>
            </div>
          </div>

          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-2xl shadow-subtle"
          />

          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4 pt-2">
            <p className="text-lg font-medium text-slate-900 leading-relaxed">
              {blog.excerpt}
            </p>
            <p>{blog.content}</p>
          </div>

          {/* Bottom CTA in article */}
          <div className="mt-8 p-6 rounded-2xl bg-surface border border-surfaceBorder flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Need Professional Assistance with Your Villa or AC?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our technicians are stationed across Dubai & Abu Dhabi for 24/7 rapid dispatch.
              </p>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=Hello%20Al-Safwa%2C%20I%20read%20your%20guide%20on%20${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
