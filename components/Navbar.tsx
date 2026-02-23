
'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import ShimmerButton from "./ShimmerButton";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    setIsOpen(false); // close mobile menu

    if (pathname !== "/") {
      router.push("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 400);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    setIsOpen(false); // close mobile menu

    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="w-full bg-black border-b border-white/10 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-16 w-full">

          {/* Logo - Click to scroll to top */}
         <button
  onClick={scrollToTop}
  className="
    flex items-center gap-2
    group
    transition-all duration-300
    hover:opacity-90
  "
>
  <Image
    src="/images/rocketdesksvg.svg"
    alt="RocketDesk Logo"
    width={34}
    height={34}
    priority
    className="
      object-contain
      transition-transform duration-300
      group-hover:scale-105
    "
  />

  <span
  className="
    font-clash
    text-white
    font-semibold
    tracking-wide
    text-[15px] md:text-[16px]
    leading-none
    select-none
    transition-colors duration-300
    group-hover:text-orange-400
    letter-spacing: 0.08em;
    font-weight: 600;

  "
>
  ROCKETDESK
</span>

</button>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-[14px] text-gray-300">

            <button 
              onClick={scrollToTop}
              className="hover:text-white transition"
            >
              Home
            </button>

            <Link href="/about" className="hover:text-white transition">
              About
            </Link>

            <Link href="/projects" className="hover:text-white transition">
              Projects
            </Link>

            <Link href="/blog" className="hover:text-white transition">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>

          <ShimmerButton
  href="https://calendly.com/monsterkartik07/30min"
  //target="_blank"
  //rel="noopener noreferrer"
>
  Book a call
</ShimmerButton>

          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>

        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black border-t border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-gray-300 text-sm">

          <button onClick={scrollToTop} className="hover:text-white transition">
            Home
          </button>

          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>

          <Link href="/projects" onClick={() => setIsOpen(false)}>
            Projects
          </Link>

          <Link href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>

          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <ShimmerButton href="https://calendly.com/monsterkartik07/30min"> 
            Book a call
          </ShimmerButton>
        </div>
      </div>
    </header>
  );
}