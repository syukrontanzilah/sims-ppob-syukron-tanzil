/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const user = Cookies.get("user");
    // console.log("data user", user);
    if (!user) {
      redirect("/login");
    }
    const dataToken = JSON.parse(user);
    // console.log("data token-->", dataToken.data.token);
  }, []);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
