/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { setBanners } from "@/app/store/slices/bannerSlice";
import { setServices } from "@/app/store/slices/servicesSlice";
import { RootState } from "@/app/store/store";
import CardBanner from "@/components/CardBanner";
import CardLayanan from "@/components/CardLayanan";
import UserInfo from "@/components/UserInfo";
import { getBanner } from "@/utils/bannerUtils";
import { getService } from "@/utils/serviceUtils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux"


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
  const router = useRouter();
  const dispatch = useDispatch();
  const dataservices = useSelector((state: RootState) => state.services.services);
  const dataBanner = useSelector((state: RootState)=> state.banner.banners)

  const getServicesData = async () => {
    try {
      const res = await getService();
      dispatch(setServices(res));
    } catch (error) {
      console.error("error", error);
    }
  };

  const getBannerData = async () => {
    try {
      const res = await getBanner();
      dispatch(setBanners(res));
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
      <div className="flex justify-between mt-10 flex-wrap gap-2 lg:gap-0">
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
      <div className="flex gap-5 flex-wrap lg:flex-nowrap">
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
