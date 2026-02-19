'use client';

import { cn } from "@/app/lib/utils";
import { useState } from "react";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const rotationClass = {
    x: {
      hover: "group-hover:[transform:rotateX(180deg)]",
      active: "[transform:rotateX(180deg)]",
    },
    y: {
      hover: "group-hover:[transform:rotateY(180deg)]",
      active: "[transform:rotateY(180deg)]",
    },
  };

  const rotation = rotationClass[rotate];

  return (
    <div
      className={cn(
        "group h-72 w-56 [perspective:1000px] cursor-pointer",
        className
      )}
      onClick={() => setFlipped(!flipped)} // ✅ Tap to flip on mobile
      {...props}
    >
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
          rotation.hover,
          flipped && rotation.active
        )}
      >
        {/* FRONT */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
          />
          <div className="absolute bottom-4 left-4 text-xl font-bold text-white">
            {title}
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-black/80 p-4 text-slate-200 [backface-visibility:hidden]",
            rotation.active
          )}
        >
          <div className="flex min-h-full flex-col gap-2">
            <h1 className="text-xl font-bold text-white">
              {subtitle}
            </h1>
            <p className="mt-1 border-t border-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
