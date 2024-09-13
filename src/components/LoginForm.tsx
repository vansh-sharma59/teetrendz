"use client";

import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { signIn } from "next-auth/react";

function SigninForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    try {
      setLoading(true);
      signIn("credentials", {
        ...data,
        callbackUrl: "/configure/upload",
      });
    } catch (error) {
      setLoading(false);
      console.log("Error logining in", error);
    }
  };

  const { pending } = useFormStatus();
  return (
    <div className="xl:w-1/4 md:w-1/2">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            LogIn
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to log in to your account
          </CardDescription>
          <CardDescription className="text-left pt-5">
            <span className="block">
              <span className="font-bold">Demo acc:-</span> demouser@gmail.com
            </span>
            <span className="block">
              <span className="font-bold">Password:-</span> Pass123
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="johndoe@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={pending}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm">
        Don't have an account?
        <Link className="underline ml-2" href="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SigninForm;
