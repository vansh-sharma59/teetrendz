import { NextResponse } from "next/server";
import { db } from "@/db";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing name, email or password", { status: 400 });
  }

  const exists = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exists) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  console.log(user);

  return NextResponse.json(
    {
      message: "User created",
    },
    { status: 200 }
  );
}
