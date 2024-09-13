import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature");

    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Email not found");
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }

      const billingaddress = session.customer_details!.address;
      const shippingaddress = session.shipping_details!.address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          ShippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingaddress!.city!,
              country: shippingaddress!.country!,
              postalCode: shippingaddress!.postal_code!,
              street: shippingaddress!.line1!,
              state: shippingaddress!.state!,
            },
          },
          BillingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingaddress!.city!,
              country: billingaddress!.country!,
              postalCode: billingaddress!.postal_code!,
              street: billingaddress!.line1!,
              state: billingaddress!.state!,
            },
          },
        },
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
