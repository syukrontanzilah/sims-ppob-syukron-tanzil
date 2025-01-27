/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { register } from "@/utils/registerUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("")

    if (!validateEmail(formData.email)) {
      setErrorMessage("Format email tidak valid.");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage("Password harus memiliki minimal 8 karakter.");
      setLoading(false);
      return;
    }

    try {
      const response = await register(formData);
      if (response.message = "Registrasi berhasil silahkan login") {
        setTimeout(() => {
          setLoading(false);
          toast.success(`${response.message}!`)
          router.replace('/login')
        }, 2000);
      }
      else {
        setErrorMessage("Opps ada yang salah!")
        setLoading(false)
      }
    } catch (error) {
      console.error("Error", error);
      setLoading(false);
      setErrorMessage("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <div className="register flex min-h-screen">
      <div className="left-login w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="xl:w-[60%] md:w-[100%]">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image width={20} height={20} src={"/icon/Logo.png"} alt="logo" />
            <div className="font-bold text-xl text-slate-700 ">SIMS PPOB</div>
          </div>
          <div className="text-center font-bold text-xl mb-6 text-slate-700">
            Lengkapi data untuk membuat akun
          </div>
          <div>
            <form onSubmit={handleSubmit} action="" className="flex flex-col">
              <FormInput
                placeholder="Masukkan email anda"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <FormInput
                placeholder="Nama depan"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              <FormInput
                placeholder="Nama belakang"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              <FormInput
                placeholder="Buat password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                isInputPassword
                required
              />

              <Button type="submit" title={loading? "Loading...": "Registrasi"} className="mt-4" />
            </form>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm text-center mt-2">
              {errorMessage}
            </div>
          )}
          <div className="text-center text-xs mt-6">
            Sudah punya akun? Login{" "}
            <span className="text-red-600 font-bold">
              <a href="/login">di sini</a>
            </span>{" "}
          </div>
        </div>
      </div>

      <div className="right-login hidden md:w-1/2 md:flex">
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

export default Register;
