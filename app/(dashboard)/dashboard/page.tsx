/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CardBanner from "@/components/CardBanner";
import CardLayanan from "@/components/CardLayanan";
import UserInfo from "@/components/UserInfo";
import { getBalance } from "@/utils/balanceUtils";
import { getBanner } from "@/utils/bannerUtils";
import { getProfile } from "@/utils/profileUtils";
import { getService } from "@/utils/serviceUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServiceResponse {
  data: Service[];
}

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface BannerResponse {
  status: number;
  message: string;
  data: Banner[];
}

const Dashboard = () => {
  const router = useRouter()
  const [dataservices, setDataServices] = useState<Service[]>([]);
  const [dataBanner, setDataBanner] = useState<Banner[]>([]);

  const getServicesData = async () => {
    try {
      const res = await getService();
      // console.log("service data-->", res);
      setDataServices(res);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getBannerData = async () => {
    try {
      const res = await getBanner();
      // console.log("data banner", res);
      setDataBanner(res);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getServicesData();
    getBannerData();
  }, []);

  return (
    <div className="m-6 mx-[10%] min-h-screen">
      {/* Top section */}
      <UserInfo />

      {/* List menu layanan */}
      <div className="flex justify-between mt-10">
        {dataservices.map((item, i) => (
          <CardLayanan
            onClick={()=> router.push(`/service/${item.service_code}`)}
            key={i}
            title={item.service_name}
            image={item.service_icon}
          />
        ))}
      </div>

      {/* List banner */}
      <div className="mt-10 mb-4 text-slate-600 text-sm font-semibold">
        Temukan Promo menarik
      </div>
      <div className="flex gap-5">
        {dataBanner.map((item, i) => {
          return (
            <CardBanner
              title={item.banner_name}
              image={item.banner_image}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
