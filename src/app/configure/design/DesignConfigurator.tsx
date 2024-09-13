"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/HandleComponent";
import { useRef, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { RadioGroup } from "@headlessui/react";
import { COLORS, MATERIALS, SIZES } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/config/product";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as _saveConfig, SaveConfigArgs } from "./actions";
import { useRouter } from "next/navigation";

interface DesignConfigurationProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfigurationProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    material: (typeof MATERIALS.options)[number];
    size: (typeof SIZES.options)[number];
  }>({
    color: COLORS[0],
    material: MATERIALS.options[0],
    size: SIZES.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 300,
    y: 240,
  });

  const printRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  async function saveConfiguration() {
    try {
      const {
        left: printLeft,
        top: printTop,
        width,
        height,
      } = printRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = printLeft - containerLeft;
      const topOffset = printTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (err) {
      toast({
        title: "Error",
        description: "There was am error saving your design. Please try again.",
        variant: "destructive",
      });
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 lg:p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-[27rem] bg-opacity-50 aspect-[582/648]">
          <div
            ref={printRef}
            className="border-2 text-white border-dashed border-green-700 h-[18rem] w-[12rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-50 pointer-events-none flex flex-col-reverse"
          >
            <div className="bg-green-700 text-white">Print Area</div>
          </div>
          <AspectRatio
            ratio={582 / 648}
            className="pointer-events-none relative z-10 aspect-[582/648] w-full"
          >
            <NextImage
              fill
              alt="T-shirt image"
              src={`/${options.color.src}`}
              className="pointer-events-none z-10 select-none"
            />
          </AspectRatio>
          <div className="inset-0 shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
        </div>

        <Rnd
          className="absolute z-20 border-[3px] border-primary"
          default={{
            x: 300,
            y: 240,
            width: imageDimensions.width / 4,
            height: imageDimensions.height / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your t-shirt
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: active || checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                {[MATERIALS].map((item) => (
                  <RadioGroup
                    key={item.name}
                    value={options.material}
                    onChange={(val) =>
                      setOptions((prev) => ({ ...prev, material: val }))
                    }
                  >
                    <Label>Material</Label>
                    <div className="mt-3 space-y-4">
                      {item.options.map((material) => (
                        <RadioGroup.Option
                          key={material.value}
                          value={material}
                          className={({ active, checked }) =>
                            cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              {
                                "border-primary": active || checked,
                              }
                            )
                          }
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label
                                className="font-medium text-gray-900"
                                as="span"
                              >
                                {material.label}
                              </RadioGroup.Label>
                            </span>
                          </span>

                          <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                          >
                            <span className="font-medium text-gray-900">
                              {formatPrice(material.price)}
                            </span>
                          </RadioGroup.Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}

                <RadioGroup
                  value={options.size}
                  onChange={(val) =>
                    setOptions((prev) => ({ ...prev, size: val }))
                  }
                >
                  <Label>Sizes: {options.size.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {SIZES.options.map((size) => (
                      <RadioGroup.Option
                        key={size.value}
                        value={size}
                        className={({ active, checked }) =>
                          cn(
                            "relative font-medium h-10 w-10 -m-0.5  flex cursor-pointer items-center justify-center rounded-md p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2  border-black border-opacity-10",
                            {
                              [`border-primary`]: active || checked,
                            }
                          )
                        }
                      >
                        {size.label}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  BASE_PRICE + options.material.price + options.size.price
                )}
              </p>
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={() => {
                  saveConfig({
                    color: options.color.value,
                    material: options.material.value,
                    size: options.size.value,
                    configId: configId,
                  });
                }}
                size="sm"
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
