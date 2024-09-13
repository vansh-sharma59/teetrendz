import { cn } from "@/lib/utils";
import { COLORS } from "@/validators/option-validator";
import { HTMLAttributes } from "react";

interface TshirtProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  color: string;
}

const Tshirt = ({ imgSrc, color, className, ...props }: TshirtProps) => {
  const tshirt = COLORS.find((tshirt) => tshirt.value === color)?.src;
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        src={`/${tshirt}`}
        className="pointer-events-none select-none"
        alt="tshirt image"
      />

      <div className="absolute inset-0">
        <img
          className="h-[60%] w-[45%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-50"
          src={imgSrc}
          alt="overlaying tshirt image"
        />
      </div>
    </div>
  );
};

export default Tshirt;
