/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetchBalance } from "@/app/store/slices/balanceSlice";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import DotDotDot from "./DotDotDot";

const UserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.data);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const profileLoading = useSelector((state: RootState) => state.profile.loading);
  const balanceLoading = useSelector((state: RootState) => state.balance.loading);
  const [showBalance, setShowBalance] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const formatBalance = (balance: number | null | undefined) => {
    if (!balance || isNaN(balance)) return "Rp. 0";
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
              src={
                profile?.profile_image &&
                profile?.profile_image !==
                  "https://minio.nutech-integrasi.com/take-home-test/null"
                  ? profile?.profile_image
                  : "/image/profile.png"
              }
              width={40}
              height={40}
              className="object-cover"
              alt="user"
            />
          </div>
          <h4 className="text-slate-500 mt-2 font-semibold">Selamat datang 👋🏻</h4>
          <h3 className="text-slate-700 font-bold text-2xl mb-2">
            {profile?.first_name || "-"} {profile?.last_name}
          </h3>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-xl w-[50%] text-white/90 gap-2 flex flex-col justify-center px-6">
          <div className="text-white/80 text-xs font-semibold">Saldo anda</div>
          <div className="font-semibold text-xl">
            {showBalance && balance !== undefined
              ? formatBalance(balance)
              : <div className="flex items-center">Rp<DotDotDot/></div>}
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
