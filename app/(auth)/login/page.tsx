/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { login } from "@/utils/loginUtils";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await login(email, password);
      if (response) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Login berhasil!");
          router.replace("/dashboard");
        }, 2000);
      } else {
        setErrorMessage("Opps email atau password salah!");
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      redirect("/dashboard");
    }
  }, []);

  return (
    <div className="login flex min-h-screen">
      <div className="left-login w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="xl:w-[60%] md:w-[100%]">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image width={20} height={20} src={"/icon/Logo.png"} alt="logo" />
            <div className="font-bold text-xl text-slate-700 ">SIMS PPOB</div>
          </div>
          <div className="text-center font-bold text-xl mb-6 text-slate-700">
            Masuk atau buat akun untuk memulai
          </div>
          <div>
            <form onSubmit={handleSubmit} action="" className="flex flex-col">
              <FormInput
                placeholder="Masukkan email anda"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <FormInput
                placeholder="Masukkan password anda"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                isInputPassword
                required
              />
              <Button
                type="submit"
                title={loading ? "Loading.." : "Masuk"}
                className="mt-4"
              />
            </form>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm text-center mt-2">
              Opss Email atau Password Salah!
            </div>
          )}
          <div className="text-center text-xs mt-6">
            Belum punya akun? Registrasi{" "}
            <span className="text-red-600 font-bold">
              <a href="/register">di sini</a>
            </span>{" "}
          </div>
        </div>
      </div>

      <div className="right-login md:w-1/2 hidden md:flex">
        <Image
          width={100}
          height={100}
          src={"/image/Login.png"}
          alt="login"
          className="w-full h-screen"
        />
      </div>
    </div>
  );
};

export default Login;
