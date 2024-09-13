// bg-zinc-900 border-zinc-900
//bg-brown border-brown
// bg-green-400 border-green-400

import { PRODUCT_PRICES } from "@/config/product";

export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-900", src: "tshirt1.png" },
  { label: "Brown", value: "brown", tw: "brown", src: "tshirt2.png" },
  { label: "Green", value: "green", tw: "green-400", src: "tshirt3.png" },
] as const;

export const MATERIALS = {
  name: "materials",
  options: [
    { label: "Cotton", value: "cotton", price: PRODUCT_PRICES.material.cotton },
    { label: "Linen", value: "linen", price: PRODUCT_PRICES.material.linen },
    { label: "Silk", value: "silk", price: PRODUCT_PRICES.material.silk },
  ],
} as const;

export const SIZES = {
  name: "sizes",
  options: [
    { label: "S", value: "s", price: PRODUCT_PRICES.sizes.s },
    { label: "M", value: "m", price: PRODUCT_PRICES.sizes.m },
    { label: "L", value: "l", price: PRODUCT_PRICES.sizes.l },
    { label: "XL", value: "xl", price: PRODUCT_PRICES.sizes.xl },
    { label: "XXL", value: "xxl", price: PRODUCT_PRICES.sizes.xxl },
  ],
} as const;
