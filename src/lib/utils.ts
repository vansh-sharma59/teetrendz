import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(price);
};

export function constructMetadata({
  title = "Teetrendz - custom high quality tshirts",
  description = "Create custom high qualiy tshirts with Teetrendz",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // images: [{ url: image }],
    },
    icons,
    metadataBase: new URL("https://teetrendz.vercel.app/"),
  };
}
