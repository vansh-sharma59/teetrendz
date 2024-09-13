import { Star } from "lucide-react";
import Image from "next/image";

function Testimonials() {
  return (
    <div>
      <h1 className="text-green-600 text-center my-5 font-semibold">
        3490+ happy customers
      </h1>
      <h1 className="text-center pb-12 text-balance tracking-tight font-bold text-5xl md:text-6xl text-gray-900">
        Don't just take our words
      </h1>
      <div className="lg:flex lg:gap-8">
        <div className="md:flex">
          <div className="m-6">
            <div className="relative w-[12rem] h-[12rem] m-auto md:h-[14rem]">
              <Image
                src="/user-1.png"
                fill
                alt="user"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="max-w-[30rem] text-center m-auto lg:text-left">
            <div className="flex gap-0.5 justify-center lg:justify-start">
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
            </div>
            <div className="pt-6 md:pt-4">
              <p>
                "Wow! I can't express how thrilled I am with the quality of the
                printed t-shirts I received. Not only the designs absolutely
                stunning, but{" "}
                <span className="p-0.5 bg-slate-800 text-white">
                  {" "}
                  the fabric is so comfortable to wear.{" "}
                </span>{" "}
                I loved it."
              </p>
              <p className="font-bold mt-3"> -Devon Lane</p>
            </div>
          </div>
        </div>
        <div className="mt-[4rem] md:mt-0 md:flex ">
          <div className="m-6">
            <div className="relative w-[12rem] h-[12rem] m-auto md:h-[14rem]">
              <Image
                src="/user-2.png"
                fill
                alt="user"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="max-w-[30rem] text-center m-auto lg:text-left">
            <div className="flex gap-0.5 justify-center lg:justify-start">
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
            </div>
            <div className="pt-6 md:pt-4">
              <p>
                I stumbled upon TeeTrendz while searching for custom t-shirts,
                and I'm so glad I did!{" "}
                <span className="p-0.5 bg-slate-800 text-white">
                  The prints are vibrant and the shirts are durable.{" "}
                </span>{" "}
                I'll defenitely be a repeat customer.
              </p>
              <p className="font-bold mt-3"> -Jenny Wilson</p>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default Testimonials;
