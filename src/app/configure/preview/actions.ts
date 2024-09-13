"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { db } from "@/db";
import { Order, TshirtMaterial, TshirtSize } from "@prisma/client";
import { AuthOptions, getServerSession } from "next-auth";
import { stripe } from "@/lib/stripe";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    throw new Error("You need to be logged in");
  }

  // const user = session.user
  const user = await db.user.findUnique({
    where: {
      email: session.user!.email!,
    },
  });

  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const { material, size } = configuration;

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

  let price = BASE_PRICE;

  price += checkMaterialPrice(material!);
  price += checkSizePrice(size!);
  price = price * 100;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user!.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user!.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom T-Shirt",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "inr",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["IN"] },
    metadata: {
      userId: user!.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
