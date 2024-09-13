"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import { ArrowRight } from "lucide-react";

export default function NavLinks({
  isAdmin,
  user,
}: {
  isAdmin: boolean;
  user: boolean;
}) {
  isAdmin = isAdmin;
  user = user;
  return (
    <div className="flex h-14 text-xl items-center justify-between border-b border-zinc-200">
      <Link href="/" className="flex z-40 font-semibold">
        Tee<span className="text-green-600">trendz</span>
      </Link>
      <div className="h-full flex items-center space-x-4">
        {user ? (
          <>
            <span
              className={
                "cursor-pointer " +
                buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })
              }
              onClick={() => signOut()}
            >
              Logout
            </span>
            {isAdmin ? (
              <Link
                href="/dashboard"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                Dashboard ✨
              </Link>
            ) : null}
            <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
            >
              Create Tshirt
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/signup"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Sign up
            </Link>

            <Link
              href="/auth/login"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Login
            </Link>

            <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
            >
              Create Tshirt
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
