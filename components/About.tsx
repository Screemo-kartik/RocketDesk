import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-black py-24 border-t border-white/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">

        {/* Pill */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300 backdrop-blur">
            About Us
          </span>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-10 items-center">

          {/* Left content */}
          <div className="text-center md:text-left">

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug max-w-2xl mx-auto md:mx-0">
              <span className="block">
                Unforgettable, Websites, Brands &
              </span>
              <span className="block">
                Visuals for Bold Visionaries.
              </span>
            </h2>

            <p className="mt-6 text-gray-400 text-[15px] leading-relaxed max-w-xl mx-auto md:mx-0">
              We’re not your typical design agency. Founded in 2014, we’re a
              collective of designers, developers, and strategists who believe
              great digital experiences should be beautiful, functional, and
              human-centered. From startups to global brands, we help ambitious
              businesses stand out.
            </p>

            {/* Button */}
            <Link
              href="/about"
              className="
                inline-block mt-8
                px-6 py-3
                text-[16px] font-medium text-white
                border border-white/30 rounded-md
                bg-orange-500 hover:bg-orange-600
                transition duration-300
              "
            >
              Know More About Us
            </Link>
          </div>

          {/* Right image */}
          <div className="relative w-full max-w-md md:max-w-none mx-auto">
            <Image
              src="/images/about.png"
              alt="Team working together"
              width={461}
              height={200}
              className="w-full h-auto rounded-3xl object-cover shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
