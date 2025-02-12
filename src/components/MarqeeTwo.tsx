import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function MarqueeTwo() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const duration = 70; // Adjust to control speed

    gsap.to(marquee, {
      x: `-${marquee.scrollWidth / 2}px`, // Move by half the total width
      duration: duration,
      repeat: -1,
      ease: "none",
    });
  });

  return (
    <div
      className="relative overflow-hidden bg-slate-900 py-[1rem] whitespace-nowrap"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      }}
    >
      <div
        ref={marqueeRef}
        className="flex space-x-8 w-max"
        style={{ willChange: "transform" }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {[...Array(10)].map((_, index) => (
              <span
                key={index}
                className="text-white text-3xl md:text-4xl lg:text-8xl font-bold uppercase"
              >
                Stand Out with Unique Designs
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MarqueeTwo;
