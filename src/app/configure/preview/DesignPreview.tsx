"use client";

import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { Configuration, TshirtMaterial, TshirtSize } from "@prisma/client";
import Tshirt from "@/components/Tshirt";
import { MATERIALS, SIZES } from "@/validators/option-validator";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true), []);

  const { material, size } = configuration;

  function checkSizePrice(size: TshirtSize) {
    switch (size) {
      case "s":
        return PRODUCT_PRICES.sizes.s;
      case "m":
        return PRODUCT_PRICES.sizes.m;
      case "l":
        return PRODUCT_PRICES.sizes.l;
      case "xl":
        return PRODUCT_PRICES.sizes.xl;
      case "xxl":
        return PRODUCT_PRICES.sizes.xxl;
      default:
        return 0;
    }
  }

  function checkMaterialPrice(material: TshirtMaterial) {
    switch (material) {
      case "cotton":
        return PRODUCT_PRICES.material.cotton;
      case "linen":
        return PRODUCT_PRICES.material.linen;
      case "silk":
        return PRODUCT_PRICES.material.silk;
      default:
        return 0;
    }
  }

  let totalPrice = BASE_PRICE;
  if (material !== "cotton") {
    totalPrice += checkMaterialPrice(material!);
  }

  if (size !== "s") {
    totalPrice += checkSizePrice(size!);
  }

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Failed to create checkout session");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description:
          "There was an error creating your checkout session. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 300, spread: 150 }}
        />
      </div>

      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Tshirt
            imgSrc={configuration.croppedImageUrl!}
            color={configuration.color!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            YOUR CUSTOM T-SHIRT
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Soft and Skin friendly fabric</li>
                <li>Eye-chaching and colorful design</li>
                <li>Packaging made from recycled materials</li>
                <li>Resistant to fading, shrinking and tearing</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">There's more</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Machine washable and low-maintenance</li>
                <li>Good value for the quality and design</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE)}
                  </p>
                </div>
                {material === "cotton" ? null : (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">{`${material
                      ?.charAt(0)
                      .toUpperCase()}${material?.slice(1)} Material`}</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(
                        checkMaterialPrice(material as TshirtMaterial)
                      )}
                    </p>
                  </div>
                )}

                {size === "s" ? null : (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">{`Size ${size
                      ?.charAt(0)
                      .toUpperCase()}${size?.slice(1)}`}</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(checkSizePrice(size as TshirtSize))}
                    </p>
                  </div>
                )}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="default">Check out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Important message</AlertDialogTitle>
                    <AlertDialogDescription>
                      Kindly use random information and demo{" "}
                      <span className="font-bold">
                        {" "}
                        card number 4242 4242 4242 4242{" "}
                      </span>{" "}
                      on next step.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        createPaymentSession({ configId: configuration.id })
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DesignPreview;
