"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Logout() {
  return (
    <Link
      href="/auth/login"
      className={buttonVariants({
        size: "sm",
        variant: "ghost",
      })}
    >
      Login
    </Link>
  );
}
