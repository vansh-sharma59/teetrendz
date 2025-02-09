"use client";
import Banner from "@/components/Banner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Testimonials from "@/components/Testimonials";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  // const { getUser, isAuthenticated } = getKindeServerSession();
  // const user = await getUser();
  // const authenticated = await isAuthenticated();
  // console.log("this is kinde user",user)
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:gap-x-0 xl:gap-x-8 lg:pt-24 lg:pb-24">
          <div className="lg:grid lg:grid-cols-3">
            <div className="mx-auto text-center lg:col-span-2 lg:text-left">
              <h1 className="relative w-fit mt-16 tracking-tight text-balance font-bold text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Create The Perfect Custom{" "}
                <span className="text-green-600">Printed t-shirt</span>
              </h1>
              <p className="mt-8 mx-auto text-lg lg:pr-40 max-w-prose tracking-tight text-center lg:mx-0 lg:text-left text-balance md:text-wrap">
                We believe that every{" "}
                <span className="font-bold">t-shirt tells a story</span>. That's
                why we've made it our mission to transform your memories,
                favorite photos into wearable works of art.
              </p>
              <ul className="mt-8 mb-16 space-y-2 text-left font-medium flex flex-col items-center lg:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />2 year
                    print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Free home delivery
                  </li>
                </div>
              </ul>
            </div>
            <div className="relative w-[17rem] mt-12 mx-auto lg:mx-0 lg:mt-0 col-span-full lg:col-span-1 lg:w-[18rem] flex items-center">
              <div>
                <img
                  src="/hero-img5.jpg"
                  className="rounded-3xl"
                  alt="hero section img"
                />
                <img
                  src="/your-image.png"
                  className="absolute hidden lg:block top-32 z-10 -right-16 lg:w-[12rem]"
                  alt="hero section img"
                />
                <img
                  src="/hero-img3.png"
                  className="absolute hidden lg:block z-10 top-32 -left-20"
                  alt="hero section img"
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-100 py-20">
        <MaxWidthWrapper>
          <Testimonials />
        </MaxWidthWrapper>
      </section>

      <section className="py-20 bg-slate-50">
        <MaxWidthWrapper>
          <Banner />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
