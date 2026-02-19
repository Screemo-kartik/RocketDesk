'use client';

import Link from "next/link";
import StarCloud from "@/components/StarCloud";

const services = [
  {
    title: "Branding & Identity",
    description:
      "From concept to prototype, we create user-centered interfaces that balance beauty with performance, ensuring every interaction feels effortless.",
    tags: ["IDENTITY", "POSITIONING", "VOICE"],
    icon: "🎨",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive, user-centered interfaces that blend clarity, beauty, and effortless interaction.",
    tags: ["WEB", "PRODUCT", "APP"],
    icon: "✏️",
  },
  {
    title: "Web Development",
    description:
      "We build fast, scalable, and fully responsive websites that perform beautifully — whether it’s a simple portfolio or a full digital platform.",
    tags: ["FRONT-END", "CMS", "PERFORMANCE"],
    icon: "💻",
  },
  {
    title: "No-Code Development",
    description:
      "Launch faster with no-code tools that allow rapid iteration, easy updates, and scalable digital products without heavy engineering.",
    tags: ["FRAMER", "WEBFLOW", "AUTOMATION"],
    icon: "⚡",
  },
];

export default function Services() {
  return (
    <section  id="services" className="relative w-full py-28 border-t border-white/10 overflow-hidden">
      
      
      {/* StarCloud background */}
      <div className="absolute inset-0 z-0">
        <StarCloud
          starCount={120}
          starSize={1.5}
          cloudSize={1000}
          baseSpeed={0.4}
          variant="desktop"
        />
      </div>
      

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Pill Label */}
<div className="flex justify-center mb-16">
  <span className="
    inline-block
    px-4 py-1.5
    text-xs tracking-widest uppercase
    rounded-full
    border border-white/10
    text-gray-300
    backdrop-blur
    bg-white/5
  ">
    Our Services
  </span>
</div>

        

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">

          {/* LEFT CONTENT */}
          {/* LEFT CONTENT */}
<div className="lg:sticky lg:top-32">
  <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
    What we do
  </p>

  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
    Services built <br />
    to drive impact
  </h2>

  <Link
    href="/contact"
    className="
      inline-block mt-8
      bg-orange-500 hover:bg-orange-600
      text-white px-6 py-3
      rounded-md text-[16px] font-medium
      transition
    "
  >
    Discuss your ideas
  </Link>

  <p className="mt-3 mb-10 lg:mb-0 text-orange-400 text-[13px] italic">
    Let’s get started
  </p>
</div>


          {/* RIGHT CARDS */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="
                  bg-neutral-900/90 backdrop-blur
                  border border-white/10
                  rounded-2xl p-6
                  hover:border-white/20 transition
                "
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <span className="text-xl">{service.icon}</span>
                </div>

                <p className="mt-4 text-gray-400 text-[15px] leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="
                        px-3 py-1
                        text-[11px] tracking-wider
                        rounded-full
                        border border-white/20
                        text-gray-300
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
