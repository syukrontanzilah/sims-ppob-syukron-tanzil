/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import FormInput from "@/components/FormInput";
import UserInfo from "@/components/UserInfo";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Service } from "../../dashboard/page";
import { getService } from "@/utils/serviceUtils";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ServicesTransaction = () => {
  const router = useRouter();
  const { service_code } = useParams();
  const [serviceData, setServiceData] = useState<Service | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const fetchServiceDetail = async () => {
    try {
      const res = await getService();
      const serviceDetail = res.find(
        (service: Service) => service.service_code === service_code
      );
      setServiceData(serviceDetail);
      if (serviceDetail?.service_tariff) {
        setInputValue(serviceDetail.service_tariff.toString());
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error!:", error);
    }
  };

  useEffect(() => {
    fetchServiceDetail();
  }, [service_code]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = Number(value);

    if (numericValue >= 0) {
      setInputValue(value);
      // setIsButtonDisabled(value.length <= 4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) return;

    try {
      setLoading(true);
      setResponseMessage("");

      const requestBody = {
        service_code: service_code,
        amount: Number(inputValue),
      };

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
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal process transaksi");
      }

      const res = await response.json();
      console.log("res", res);
      // setResponseMessage("Transaksi berhasil!");
      if ((res.message = "Transaksi berhasil")) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Transaksi berhasil!");
          router.push("/transaction");
        }, 2000);
      } else {
        toast.error("Terjadi kesalahan saat transaksi");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Terjadi kesalahan atau Saldo anda tidak mencukupi.");
      setLoading(false);
    } finally {
    }
  };

  return (
    <div className="m-6 mx-[10%] min-h-screen">
      <UserInfo />
      <div className="mt-10">
        <div className="text-sm text-slate-500 mb-2">Pembayaran</div>
        <div className="flex gap-1 items-center mb-5">
          {serviceData?.service_icon && (
            <Image
              src={serviceData.service_icon}
              alt="pembayaran"
              width={25}
              height={25}
            />
          )}
          <div className="font-bold text-slate-700">
            {serviceData?.service_name || "-"}
          </div>
        </div>
        <FormInput
          placeholder="0"
          type="number"
          name="top_up_amount"
          value={inputValue}
          readOnly
          onChange={handleInputChange}
          required
          className="font-bold text-slate-600 focus:ring-gray-200 focus:border-gray-200"
        />
        <button
          className={`rounded-md w-full text-white text-sm font-bold py-2 bg-red-500`}
          onClick={handleSubmit}
          disabled={isButtonDisabled || loading}
        >
          {loading ? (
            <span className="inline-block w-[14px] h-[14px] border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          ) : (
            "Bayar"
          )}
        </button>
        {responseMessage && (
          <div className="mt-4 text-center text-sm font-medium text-red-600">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesTransaction;
