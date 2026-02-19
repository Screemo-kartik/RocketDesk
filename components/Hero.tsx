'use client';

import Link from "next/link";
import DotOrbit from "@/components/DotOrbit";
import { useRouter, usePathname } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (id: string) => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* DotOrbit background */}
      <div className="absolute inset-0 z-0">
        <DotOrbit
          mode="drift"
          interaction="repel"
          tracking="global"
          density={1}
          speed={0.6}
          dotSize={2}
          linkDistance={140}
          background="#000000"
          dotColor="#ffffff"
          lineColor="#8a8a8a"
          opacity={0.9}
          alpha={1.4}
          interactionRadius={160}
          interactionStrength={18}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen w-full items-center justify-center text-center px-4">
        <div className="max-w-4xl w-full px-2 sm:px-6 md:px-12">

          {/* Heading */}
          <h1
            className="
              text-white font-bold leading-tight tracking-tight
              text-10xl sm:text-5xl md:text-6xl lg:text-7xl
            "
          >
            We design brands <br />
            that move <span className="text-orange-500">people</span>
          </h1>

          {/* Subtext (RESPONSIVE FIX) */}
          <p className="mt-6 mx-auto  text-gray-300 text-[16px] leading-relaxed">
            <span className="hidden md:inline">
              We combine strategy, design, and technology to help ambitious
            </span>
            <span className="md:hidden">
              We combine strategy, design, and technology to help ambitious
            </span>
            <br />
            brands stand out & create meaningful digital experiences.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="
                bg-orange-500 hover:bg-orange-600
                text-white px-6 py-3
                rounded-md text-[16px] font-medium transition
                w-full sm:w-auto
              "
            >
              Discuss your ideas
            </Link>

            <button
              onClick={() => handleScroll("services")}
              className="
                border border-white/30 text-white
                px-6 py-3 rounded-md
                text-[16px] font-medium
                hover:bg-white hover:text-black
                transition
                w-full sm:w-auto
              "
            >
              View services
            </button>
          </div>

          {/* Helper text */}
          <p className="mt-10 text-orange-400 text-[13px] italic tracking-wide">
            Schedule a free call now
          </p>
        </div>
      </div>
    </section>
  );
}
