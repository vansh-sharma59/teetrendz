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
import { RegisterSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignupForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", data);
      console.log("Registration Successful", response);
      router.push("/auth/login");
    } catch (error) {
      setLoading(false);
      console.log("Registration Failed", error);
    }
  };

  const { pending } = useFormStatus();
  return (
    <div className="xl:w-1/4 md:w-1/2">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create a new account
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
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
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm">
        Have an account?
        <Link className="underline ml-2" href="/auth/login">
          LogIn
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
