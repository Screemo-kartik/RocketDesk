'use client';

import Link from 'next/link';
import Image from 'next/image';
import SocialMediaCard, {
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  FacebookIcon,
} from '@/components/Socialmediacard';

export default function Footer() {
  const socialLinks = [
    { icon: <InstagramIcon />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <XIcon />, href: 'https://x.com', label: 'X' },
    { icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* MAIN GRID — matches reference proportions */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-14 md:gap-20 items-start">

          {/* LEFT COLUMN (Brand + Newsletter) */}
          <div className="space-y-8">

            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/rocketdesksvg.svg"
                alt="RocketDesk Logo"
                width={36}
                height={36}
                priority
                className="object-contain"
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
            </Link>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm">
              Crafting digital solutions that move your business forward.
            </p>

            {/* Newsletter */}
            <div className="space-y-4">
              <p className="text-white font-medium text-lg">
                Updates that keep you ahead
              </p>

              <div className="flex items-center gap-3 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition"
                />
                <button
                  className="
                    px-5 py-3 rounded-lg
                    bg-orange-500 hover:bg-orange-600
                    text-white font-semibold
                    transition
                  "
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN (Quick Links) */}
          <div className="space-y-6">
            <h4 className="text-medium tracking-[0.2em] uppercase text-gray-500 font-semibold">
              Quick Links
            </h4>

            <ul className="space-y-3 text-medium text-gray-300">
              <li><Link href="/" className="text-orange-400 hover:text-orange-300 transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">About us</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-white transition">Projects</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact us</Link></li>
            </ul>
          </div>

          {/* RIGHT COLUMN (Contact + Social) */}
          <div className="space-y-8">

            <div>
              <h4 className="text-medium tracking-[0.2em] uppercase text-gray-500 font-semibold mb-5">
                Get in touch
              </h4>

              <ul className="space-y-3 text-gray-300 text-medium leading-relaxed">
                <li>+91 82118 757241</li>
                <li>hello@rocketdesk.in</li>
                <li>
                  Dehradun, India <br />
                  Remote Worldwide
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">
                Follow us on
              </h5>
              <div className=" gap-2 justify-start md:justify-start  ml-[-16px]">
              <SocialMediaCard
                links={socialLinks}
                fillColor="rgb(15,15,15)"
                borderColor="rgba(255,255,255,0.15)"
                borderWidth={1}
              />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            Copyright © 2026 RocketDesk. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
