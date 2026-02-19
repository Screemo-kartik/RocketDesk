import Link from "next/link";

export default function ShimmerButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center justify-center px-4 py-2 text-[14px] font-medium text-white rounded-md bg-blue border border-white/20 overflow-hidden group"
    >
      {/* Shimmer line */}
      <span className="pointer-events-none absolute inset-0">
        <span
          className="
            absolute
            left-[-120%]
            top-0
            h-full
            w-full
            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
            animate-shimmer-line
            transition-all
            duration-700
            ease-in-out
          "
        />
      </span>

      {/* Text */}
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
