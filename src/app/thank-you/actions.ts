"use server";

import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/db";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) {
    throw new Error("You need to be logged in");
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user!.email!,
    },
  });

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: user?.id,
    },
    include: {
      BillingAddress: true,
      ShippingAddress: true,
      configuration: true,
      user: true,
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
