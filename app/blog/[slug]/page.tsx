import { blogPosts } from "../blogData";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ---------------- SEO META ---------------- */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog | XTRACT",
    };
  }

  return {
    title: `${post.title} | XTRACT`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

/* ---------------- PAGE ---------------- */
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* FEATURED IMAGE HEADER */}
      <section className="relative h-[55vh] overflow-hidden border-b border-white/10">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center max-w-4xl px-6">
          <span className="text-xs tracking-widest uppercase text-orange-400">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl md:text-5xl font-bold">
            {post.title}
          </h1>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <article className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
          {post.content}
        </p>
      </article>

      {/* RELATED ARTICLES */}
      <section className="border-t border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl font-bold mb-10">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`}>
                <div className="bg-neutral-900 border border-white/10 rounded-xl p-5 hover:border-orange-500/40 transition">
                  <h3 className="text-white font-semibold hover:text-orange-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-3">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
