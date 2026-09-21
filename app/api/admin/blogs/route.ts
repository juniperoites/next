import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/store";

export async function GET() {
  const blogs = await getBlogPosts();
  return NextResponse.json({ success: true, blogs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ success: false, error: "Title and slug are required" }, { status: 400 });
    }
    const saved = await saveBlogPost(body);

    // Instant ISR Cache Invalidation
    try {
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath(`/blog/${saved.slug}`);
      revalidatePath("/admin");
    } catch (cacheErr) {
      console.warn("revalidatePath warning:", cacheErr);
    }

    return NextResponse.json({ success: true, message: "Blog post saved", blog: saved });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    await deleteBlogPost(id);

    // Instant ISR Cache Invalidation
    try {
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (cacheErr) {
      console.warn("revalidatePath warning:", cacheErr);
    }

    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}
