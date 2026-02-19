'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DepthDeckCarousel, {
  CarouselCard,
} from "@/components/Depthdeckcarousel";

const projectImages: CarouselCard[] = [
  {
    src: "/images/book.png",
    alt: "Nova Studio project",
  },
  {
    src: "/images/cafune.png",
    alt: "Haven Living project",
  },
  {
    src: "/images/fitness.png",
    alt: "Creative workspace",
  },
  {
    src: "/images/travel.png",
    alt: "Product design project",
  },
  {
    src: "/images/qrm.png",
    alt: "Product design project",
  },
  

];

export default function Projects() {
  const router = useRouter();
  return (
    <section
      id="projects"
      className="w-full bg-black py-32 border-t border-white/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="relative text-center mb-20">
         <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300 backdrop-blur">
          Featured Projects
        </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Refined projects <br />
            with purpose
          </h2>

          <span className="hidden md:block absolute right-130 top-46 text-orange-400 text-sm italic">
            Where ideas take shape
          </span>
        </div>

        {/* Carousel */}
        <DepthDeckCarousel
          cards={projectImages}
          aspectRatio="3:4"
          autoPlay
          autoPlayIntervalSeconds={4}
          showNavigation
          showPagination
          primaryColor="#ffffff"
          borderRadius={32}
          shadowStrength={1.2}
          onCardClick={() => router.push("/projects")}
          navButtonBackground="rgba(255,255,255,0.08)"
          navButtonBackgroundHover="#000000"
          navButtonBorderColor="rgba(255,255,255,0.15)"
          navButtonIconColor="rgba(255,255,255,0.8)"
          navButtonIconColorHover="#ffffff"
        />

        {/* 🔥 View All Projects Button */}
        <div className="mt-20 text-center">
          <Link
            href="/projects"
            className="
              inline-block
              px-8 py-3
              text-[16px] font-medium
              text-white
              border border-white/20
              rounded-full
              bg-orange-500
              hover:bg-orange-600
              hover:text-black
              transition-all duration-300

            "
          >
            View All Projects
          </Link>

          <p className="mt-4 text-gray-500 text-sm">
            Explore our complete portfolio
          </p>
        </div>

      </div>
    </section>
  );
}
