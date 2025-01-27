/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import {
  getProfile,
  updateImageProfile,
  updateProfile,
} from "@/utils/profileUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import Cookies from "js-cookie";
import { logout } from "@/utils/loginUtils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserDataProfile {
  status: number;
  message: string;
  data: UserData;
}

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: File | null;
}

interface BalanceData {
  balance: number;
}

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingFoto, setIsSubmittingFoto] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    profile_image: null as File | null,
  });

  const getProfileData = async () => {
    try {
      const res = await getProfile();
      // console.log("profile data", res);
      setData(res);
      if (res) {
        setFormData({
          email: res?.email,
          first_name: res?.first_name,
          last_name: res?.last_name,
          profile_image: res?.profile_image,
        });
      }
    } catch (error) {
      console.error("error!", error);
    } finally {
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      profile_image: file,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log("form data", formData);
    try {
      const res = await updateProfile(formData);
      // console.log("response update profile", res);

      if (res.message === "Sukses") {
        setTimeout(() => {
          setIsSubmitting(false);
          toast.success("Update data profile berhasil!");
        }, 1000);
        await getProfileData();
      } else {
        toast.error(`Ops, ${res.message}`);
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error update:", error);
      setIsSubmitting(false);
    } finally {
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFoto(true);

    if (!formData.profile_image) {
      console.error("Tidak ada image untuk diuplod");
      return;
    }
    try {
      const submissionData = new FormData();
      submissionData.append("file", formData.profile_image);

      const user = Cookies.get("user");
      if (!user) {
        return;
      }
      const dataToken = JSON.parse(user);
      const token = dataToken.data.token;
      if (!token) {
        return;
      }

      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        {
          method: "PUT",
          body: submissionData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("hasil result upload", result);
      if ((result.message = "Update Profile Image berhasil")) {
        setTimeout(() => {
          setIsSubmittingFoto(false);
          toast.success("Update Foto berhasil!");
        }, 1000);
        await getProfileData();
      } else {
        toast.error(`Ops, ${result.message}!`);
        setIsSubmittingFoto(false)
      }
    } catch (error) {
      console.error("Error update:", error);
      setIsSubmittingFoto(false);
    } finally {
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="m-6 mx-[10%]">
      <form className=" flex flex-col items-center" action="">
        <div className="flex flex-col justify-center items-center w-28 h-28 bg-gray-50 rounded-full border">
          {formData.profile_image &&
            (typeof formData.profile_image === "object" ? (
              <img
                src={URL.createObjectURL(formData.profile_image)}
                alt="Uploaded foto"
                className="w-28 h-28 object-cover border border-gray-300 rounded-full"
              />
            ) : (
              <img
                src={
                  formData?.profile_image &&
                  formData?.profile_image !==
                    "https://minio.nutech-integrasi.com/take-home-test/null"
                    ? typeof formData.profile_image === "string"
                      ? formData.profile_image
                      : "/image/profile.png"
                    : "/image/profile.png"
                }
                alt="Photo profile"
                className="w-28 h-28 object-cover border border-gray-300 rounded-full"
              />
            ))}

          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-white border border-slate-400 text-red-500 rounded-full hover:bg-red-100 transition-all text-xl p-2 absolute ml-24 mt-20"
          >
            <HiPencil />
          </label>
        </div>

        <div className="font-bold text-xl my-4 h-7">
          {" "}
          {data?.first_name || ""} {data?.last_name}
        </div>

        <div className=" w-[40%]">
          <FormInput
            placeholder="Email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            name="email"
            disabled
          />
          <FormInput
            placeholder="Nama depan"
            label="Nama Depan"
            value={formData.first_name}
            onChange={handleInputChange}
            type="text"
            name="first_name"
          />
          <FormInput
            placeholder="Nama belakang"
            label="Nama Belakang"
            value={formData.last_name}
            onChange={handleInputChange}
            type="text"
            name="last_name"
          />
        </div>
        <div className="flex w-[40%] gap-4 mb-2">
          <button
            onClick={handleFormSubmit}
            type="submit"
            className="bg-white border w-full rounded-md text-sm font-bold text-red-500 border-red-500 p-2 mb-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-[14px] h-[14px] border-2 border-t-transparent border-red-500 rounded-full animate-spin"></span>
            ) : (
              "Update Profile"
            )}
          </button>
          <button
            className="bg-white border w-full rounded-md text-sm font-bold text-red-500 border-red-500 p-2 mb-2"
            onClick={handleImageSubmit}
          >
            {isSubmittingFoto ? (
              <span className="inline-block w-[14px] h-[14px] border-2 border-t-transparent border-red-500 rounded-full animate-spin"></span>
            ) : (
              "Update Foto"
            )}
          </button>
        </div>

        <button 
        onClick={() => {
          setIsLoadingLogout(true)  
          logout();
          router.replace("/login");       
        }}
        className=" border rounded-md text-sm font-bold text-white bg-red-500 p-2 mb-2 w-[40%] flex items-center justify-center">
            {isLoadingLogout? "Loading..." : "Logout"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
