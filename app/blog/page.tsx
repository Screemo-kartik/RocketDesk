'use client';

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./blogData";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <section className="relative w-full bg-black min-h-screen py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center">
          Blog & Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group cursor-pointer bg-neutral-900/80 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-orange-500/40"
              >
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400">
                  {post.category}
                </span>

                <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition">
                  {post.title}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
