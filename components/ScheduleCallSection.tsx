'use client';

import Link from "next/link";

export default function ScheduleCallSection() {
  return (
    <section className="w-full bg-black py-24 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* OUTER CONTAINER */}
        <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">

         
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">
                Let’s build something great
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
  Ready to start <br />
  <span className="whitespace-nowrap">
    your next project?
  </span>
</h2>

              <Link
                href="/contact"
                className="
                  inline-block
                  bg-orange-500 hover:bg-orange-600
                  text-white px-6 py-2.5
                  rounded-lg text-sm font-medium
                  transition
                  shadow-[0_8px_20px_rgba(249,115,22,0.25)]
                "
              >
                Get started
              </Link>
            </div>

            {/* RIGHT BOOKING CARD */}
            <div className="flex justify-center md:justify-end">
              <div className="
                bg-black
                border border-white/10
                rounded-2xl
                p-6
                w-full max-w-sm
                shadow-[0_15px_35px_rgba(0,0,0,0.7)]
              ">

                <p className="text-xs tracking-widest uppercase text-gray-400 mb-5">
                  ● Available for project
                </p>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-neutral-700" />
                  <span className="text-gray-500">+</span>
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-xs font-medium">
                    You
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Quick 15-minute call
                </h3>

                <p className="text-gray-400 text-sm mb-5">
                  Pick a time that works for you.
                </p>

                <Link
                  href="https://calendly.com/monsterkartik07/30min"
                  className="
                    block text-center
                    bg-orange-500 hover:bg-orange-600
                    text-white py-2.5
                    rounded-lg font-medium
                    text-sm
                    transition
                  "
                >
                  Book a free call
                </Link>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
