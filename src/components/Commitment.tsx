import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

function Commitment() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center pb-12 text-balance tracking-tight font-bold text-5xl md:text-6xl text-gray-900">
        Our <span className="text-green-600">Eco-Friendly</span> Commitment
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="w-[17rem] h-[25rem] lg:w-[22rem] lg:h-[30rem] relative m-auto">
            <Image
              src="/commitment-girl.jpg"
              alt="Eco-Friendly Printing Process"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-green-600">
            Sustainable from Start to Finish
          </h3>
          <p className="text-gray-900-600 text-lg">
            Our eco-conscious approach ensures that every step of our process is
            as green as possible:
          </p>
          <ul className="list-disc list-inside text-gray-900 space-y-2 text-lg">
            <li>Organic and recycled cotton blends</li>
            <li>Water-based, non-toxic inks</li>
            <li>Solar-powered printing facility</li>
            <li>Plastic-free packaging</li>
            <li>Carbon-neutral shipping options</li>
          </ul>
          <Link
            href="/configure/upload"
            className={buttonVariants({
              size: "sm",
            })}
          >
            Learn More About Our Process
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Commitment;
