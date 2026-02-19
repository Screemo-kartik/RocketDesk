'use client';

import CosmicParticles from '@/components/Cosmicparticles';
import Link from 'next/link';

const projects = [
  {
    title: "Wowsly — Event Management Platform",
    description:
      "An all-in-one event platform for websites, QR invites, RSVPs, ticketing, and contactless check-ins. Built to scale from small gatherings to enterprise mega-events.",
    tech: "SaaS • Platform • Event Tech",
    url: "https://wowsly.com",
    featured: true,
  },
  {
    title: "ZVerse — Video Content Portfolio",
    description:
      "Portfolio platform helping coaches grow through educational video content and professional production workflows.",
    tech: "Portfolio • Wix • Video",
    url: "https://zversefreelancingg.wixsite.com/zverse",
  },
  {
    title: "Travel App — React Travel Platform",
    description:
      "A modern travel app built with React & deployed on Vercel for exploring destinations and planning trips.",
    tech: "React • Vercel • Web App",
    url: "https://travel-puce-beta.vercel.app",
  },
  {
    title: "FitZone — Fitness Website",
    description:
      "High-energy fitness website showcasing programs, trainers, and memberships with conversion-focused UX.",
    tech: "Webflow • Design",
    url: "https://fitzone-28b3a7.webflow.io",
  },
  {
    title: "Cafune — Café Website",
    description:
      "Premium café experience combining storytelling, ambience and modern digital presentation.",
    tech: "Webflow • Branding",
    url: "https://cafune-9605f8.webflow.io",
  },
];

export default function ProjectsPage() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <main className="relative bg-black text-white overflow-hidden">

      {/* Cosmic Background */}
      <div className="absolute inset-0 z-0">
        <CosmicParticles
          particleCount={400}
          speed={0.08}
          colors={['#ffffff', '#f97316']}
          blurFactor={1.8}
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 py-32 border-b border-white/10 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300">
            Projects
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Work that drives <br /> real impact
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Real projects where strategy, design, and technology come together.
          </p>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      {featured && (
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Link href={featured.url} target="_blank">
              <div className="
                group relative overflow-hidden
                rounded-3xl border border-white/10
                bg-neutral-900/80 backdrop-blur-xl
                p-10 md:p-14
                transition-all duration-500
                hover:-translate-y-2
                hover:border-orange-500/40
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.65)]
              ">
                {/* Glow sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" />

                <p className="text-xs uppercase tracking-widest text-orange-400 mb-4">
                  Featured Case Study
                </p>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-orange-400 transition">
                  {featured.title}
                </h2>

                <p className="text-gray-400 text-lg max-w-3xl mb-8">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.tech.split(' • ').map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full border border-white/20 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-orange-400 text-sm">
                  View Live Website ↗
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* PROJECT GRID */}
      <section className="relative z-10 pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid md:grid-cols-2 gap-8">

            {others.map((project, index) => (
              <Link
                key={index}
                href={project.url}
                target="_blank"
                className="group block"
              >
                <div className="
                  relative overflow-hidden
                  rounded-2xl border border-white/10
                  bg-neutral-900/80 backdrop-blur-xl
                  p-8 h-[320px]
                  flex flex-col justify-between
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-orange-500/40
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                ">

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-orange-500/5" />

                  <h3 className="text-2xl font-semibold group-hover:text-orange-400 transition">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mt-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tech.split(' • ').map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full border border-white/20 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-sm text-gray-500 group-hover:text-orange-400 transition mt-6">
                    View Live Website ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
