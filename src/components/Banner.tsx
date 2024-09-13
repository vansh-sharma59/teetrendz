import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

function Banner() {
  return (
    <div>
      <h1 className="text-center pb-12 text-balance tracking-tight font-bold text-5xl md:text-6xl text-gray-900">
        T-shirt printing made <span className="text-green-600"> easy </span>
      </h1>
      <div className="lg:grid lg:grid-cols-3 lg:gap-5">
        <div className="relative">
          <div className="m-6">
            <div className="relative w-[12rem] h-[12rem] m-auto">
              <Image
                src="/banner-1-step-1.png"
                fill
                alt="user"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="text-center my-11">
              <p className="font-bold">Step 1</p>
              <p className="font-semibold">Add image</p>
              <p>Upload image you want to be printed.</p>
            </div>
          </div>
          <img
            src="/arrow.png"
            alt="arrow"
            className="hidden lg:block absolute top-[30%] -right-16"
          />
        </div>
        <div className="relative">
          <div className="m-6">
            <div className="relative w-[12rem] h-[12rem] m-auto">
              <Image
                src="/banner-1-step-2.png"
                fill
                alt="user"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="text-center my-11">
              <p className="font-bold">Step 2</p>
              <p className="font-semibold">Customize design</p>
              <p>Customize image to your liking.</p>
            </div>
          </div>
          <img
            src="/arrow-2.png"
            alt="arrow"
            className="hidden lg:block absolute top-[27%] -right-16"
          />
        </div>
        <div>
          <div className="m-6">
            <div className="relative w-[12rem] h-[12rem] m-auto">
              <Image
                src="/banner-1-step-3.png"
                fill
                alt="user"
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="text-center my-11">
              <p className="font-bold">Step 3</p>
              <p className="font-semibold">Summary</p>
              <p>Review your final design.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/configure/upload"
          className={buttonVariants({
            size: "sm",
          })}
        >
          Create Tshirt
          <ArrowRight className="ml-1.5 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

export default Banner;
