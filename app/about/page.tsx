'use client';

import Image from 'next/image';
import Link from 'next/link';
import StarCloud from '@/components/StarCloud';
import NetworkAnimation from '@/components/Networkanimation';
import ScheduleCallSection from '@/components/ScheduleCallSection';
import FlipCard from '@/components/FlipCard';


export default function AboutPage() {
  return (
    <main className="bg-black text-white">

      {/* ================= HERO SECTION ================= */}
<section className="relative w-full py-32 overflow-hidden border-b border-white/10">

  {/* Network Background */}
  <div className="absolute inset-0 z-0">
    <NetworkAnimation
      nodeColor="#6366f1"
connectionColor="#a855f7"
nodeOpacity={0.7}
connectionOpacity={0.2}
nodeCount={45}

      connectionDistance={140}
      animationSpeed={1}
      mouseAttractionStrength={0.8}
      className="w-full h-full"
    />
  </div>

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/75 z-10" />

  {/* Content */}
  <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-12 text-center">

    <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300">
      About Us
    </span>

    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
      We design brands <br />
      that move people
    </h1>

    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
      We combine strategy, design, and technology to help ambitious
      brands stand out & create meaningful digital experiences
    </p>

  </div>
</section>

      {/* ================= STORY SECTION ================= */}
      {/* ================= STORY SECTION ================= */}
<section className="relative py-32 border-b border-white/10 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -left-40 top-20 w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">

    {/* Left Content */}
    <div>
      <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300 backdrop-blur">
        Our Journey
      </span>

      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
        From idea to impact
      </h2>

      <p className="text-gray-400 leading-relaxed mb-6 text-lg">
        Founded with a vision to merge creativity and technology,
        we started as a small design studio focused on building
        high-performance digital products.
      </p>

      <p className="text-gray-400 leading-relaxed text-lg">
        Today, we help startups and enterprises integrate AI,
        automation, and scalable web solutions to drive
        measurable growth.
      </p>
    </div>

    {/* Right Image */}
    <div className="relative group">
      <div className="
        relative w-full h-[420px]
        rounded-2xl overflow-hidden
        border border-white/10
        shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        transition-all duration-500
        group-hover:-translate-y-2
        group-hover:border-orange-500/40
      ">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
          alt="Team working"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>

  </div>
</section>


      {/* ================= VALUES SECTION ================= */}
      <section className="relative py-32 border-b border-white/10 overflow-hidden">

  {/* Subtle background glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-3xl rounded-full" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

    {/* Heading */}
    <div className="text-center mb-24">
      <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300 backdrop-blur">
        Our Values
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        What Drives Us
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Our approach blends strategy, design, and AI automation
        to build future-ready businesses.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10">

      {[
        {
          title: "Innovation First",
          desc: "We embrace AI and emerging tech to build smarter, faster systems.",
          icon: "🚀",
        },
        {
          title: "Design With Purpose",
          desc: "Every interface we create is user-centered and conversion-driven.",
          icon: "🎯",
        },
        {
          title: "Scalable Systems",
          desc: "From startups to enterprises, we design solutions built to grow.",
          icon: "⚡",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="
            group relative
            p-10 rounded-2xl
            bg-neutral-900/70 backdrop-blur-xl
            border border-white/10
            transition-all duration-500
            hover:-translate-y-3
            hover:border-orange-500/40
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
          "
        >
          {/* Accent Top Border */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-t-2xl" />

          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl mb-6 group-hover:bg-orange-500/20 transition">
            {item.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-400 transition">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}

    </div>

  </div>
</section>



      {/* ================= TEAM SECTION ================= */}
{/* ================= TEAM SECTION ================= */}
<section className="relative py-32 border-b border-white/10 overflow-hidden">

  {/* Glow background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">

    {/* Heading */}
    <div className="mb-20">
      <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300 backdrop-blur">
        Our Team
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-white">
        Meet the minds behind the work
      </h2>
    </div>

    {/* Cards */}
    <div className="flex flex-wrap justify-center gap-16">

      {[
        {
          name: "Alex Morgan",
          role: "Founder & Strategist",
          image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
          description:
            "Leads strategy, product vision, and AI-driven digital transformation initiatives.",
        },
        {
          name: "Sophia Lee",
          role: "Product Designer",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
          description:
            "Designs intuitive user experiences focused on clarity, usability, and performance.",
        },
        {
          name: "Daniel Cruz",
          role: "AI Engineer",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
          description:
            "Builds scalable AI automation systems that streamline workflows and growth.",
        },
      ].map((member, index) => (
        <div
          key={index}
          className="transition-all duration-500 hover:-translate-y-3"
        >
          <FlipCard
            image={member.image}
            title={member.name}
            subtitle={member.role}
            description={member.description}
            rotate="y"
          />
        </div>
      ))}

    </div>

  </div>
</section>


      {/* ================= CTA SECTION ================= */}
      <ScheduleCallSection />

    </main>
  );
}
