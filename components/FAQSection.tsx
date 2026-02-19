'use client';
import Link from "next/link";
import FAQAccordion from '@/components/Faqaccordion';
import StarCloud from '@/components/StarCloud';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects take 2–4 weeks depending on scope, number of revisions, and communication speed.',
  },
  {
    question: 'Do you work with startups or only large brands?',
    answer:
      'We work with both — from early-stage startups to established global brands. The process adapts to your needs.',
  },
  {
    question: 'What’s included in your design packages?',
    answer:
      'Each package includes strategy, wireframes, high-fidelity design, responsive layouts, and all final assets ready for development.',
  },
  {
    question: 'Do you provide development services too?',
    answer:
      'Yes. We offer full Framer development so your design turns into a fast, polished, and fully responsive website.',
  },
  {
    question: 'How do we start a project?',
    answer:
      'Just share your project details through the contact form. We’ll follow up with timelines, pricing, and next steps.',
  },
];

export default function FAQSection() {
  return (
    <section className="relative w-full bg-black py-32 border-t border-white/10 overflow-hidden">
      
      {/* ⭐ STAR BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarCloud
          starCount={180}
          starSize={1.5}
          baseSpeed={0.35}
          starColor="#ffffff"
        />
      </div>

      {/* 🌟 CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">

        {/* Pill label */}
        <span className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full border border-white/10 text-gray-300 backdrop-blur">
          FAQs
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          We’ve Got the Answers <br />
          You’re Looking For
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          Quick answers to your AI automation questions.
        </p>

        {/* FAQ Accordion */}
        <FAQAccordion faqs={faqs} />
        <div className="mt-16 text-center">
  <p className="text-gray-400 text-sm mb-6">
    Still have questions?
  </p>

  <Link
    href="/contact"
    className="
      bg-orange-500 hover:bg-orange-600
      text-white px-6 py-3
      rounded-md text-[16px] font-medium transition
      inline-block
    "
  >
    Discuss your ideas
  </Link>
</div>
      </div>
      
    </section>
  );
}
