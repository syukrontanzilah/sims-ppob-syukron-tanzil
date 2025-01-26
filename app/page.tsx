"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { redirect} from "next/navigation";
import LoadingFull from "@/components/LoadingFull";

export default function Home() {

  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      redirect('/dashboard')
    } else {
      redirect('/login')
    }
  }, []);

  return (
    <div>
      <LoadingFull/>
    </div>
  );
}
