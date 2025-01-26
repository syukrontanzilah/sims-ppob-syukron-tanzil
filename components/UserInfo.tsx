/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getBalance } from "@/utils/balanceUtils";
import { getProfile } from "@/utils/profileUtils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface UserDataProfile {
    status: number;
    message: string;
    data: UserData;
  }

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

interface BalanceData {
  balance: number;
}

const UserInfo = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [dataBalance, setDataBalance] = useState<BalanceData | null>();
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const getProfileData = async () => {
    try {
      const res = await getProfile();
      // console.log("profile data", res);
      setData(res);
    } catch (error) {
      console.error("error ambil data!", error);
    } finally {
    }
  };

  const getBalanceData = async () => {
    try {
      const res = await getBalance();
      // console.log("data balance-->", res);
      setDataBalance(res);
    } catch (error) {
      console.error("error ambil data!", error);
    } finally {
    }
  };

  useEffect(() => {
    getProfileData();
    getBalanceData();
  }, []);

   const formatBalance = (balance: number) => {
    if (isNaN(balance)) return "Rp. -";
    return balance
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace("IDR", "Rp.")
      .replace(/(\,00)/, "");
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="border h-10 w-10 rounded-full">
            
            <Image
              src={data?.profile_image && data?.profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null" 
                ? data?.profile_image 
                : "/image/profile.png"}

              width={40}
              height={40}
              className="object-cover"
              alt="user"
            />
          </div>
          <h4 className="text-slate-500 mt-2 font-semibold">Selamat datang,</h4>
          <h3 className="text-slate-700 font-bold text-2xl mb-2">
            {data?.first_name || "-"} {data?.last_name}
          </h3>
        </div>
        <div className="bg-red-500 rounded-xl w-[50%] text-white/90 gap-2 flex flex-col justify-center px-6">
          <div className="text-white/80 text-xs font-semibold">Saldo anda</div>
          <div className="font-semibold text-xl">
            {showBalance && dataBalance?.balance !== undefined
              ? formatBalance(dataBalance.balance)
              : "Rp ******"}
          </div>
          <div
            className="text-white/70 text-xs flex items-center cursor-pointer"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <>
                Sembunyikan Saldo <IoEyeOffOutline className="ml-1" />
              </>
            ) : (
              <>
                Lihat Saldo <IoEyeOutline className="ml-1" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
