/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import UserInfo from "@/components/UserInfo";
import { postTopUp } from "@/utils/topupUtils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Topup = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null); 
  const [topUpData, setTopUpData] = useState({
    top_up_amount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const validateNominal = (value: string) => {
    const numericValue = parseInt(value, 10);
    return numericValue >= 10000 && numericValue <= 1000000;
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.preventDefault();

    const valueAsString = value.toString();
    setInputValue(valueAsString);
    setTopUpData((prevState) => ({
      ...prevState,
      top_up_amount: value,
    }));
    setSelectedAmount(value);
    setIsButtonDisabled(!validateNominal(valueAsString));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (numericValue >= 0) {
      setInputValue(value);
      setTopUpData((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
      setSelectedAmount(null);
    }
    setIsButtonDisabled(!validateNominal(value));
  };

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("topupdata data", topUpData);
    setLoading(true);

    if (topUpData.top_up_amount <= 0 || isNaN(topUpData.top_up_amount)) {
      console.error("Nominal top up tidak valid");
      setLoading(false);
      return;
    }

    // console.log("form data", topUpData);

    try {
      const res = await postTopUp(topUpData);
      // console.log("response topup", res);

      if ((res.message = "Top Up Balance berhasil")) {
        setTimeout(() => {
          setLoading(false);
          toast.success('Topup berhasil!')
          router.push('/transaction')
        }, 2000);
      } else {
        toast.error('Terjadi kesalahan saat topup')
      }
    } catch (error) {
      console.error("Error!:", error);
      setLoading(false);
    } finally {
    }
  };

  const formatCurrency = (value: number): string => {
    return `Rp${value.toLocaleString("id-ID")}`;
  };

  return (
    <div className="m-6 mx-[10%] min-h-screen">
      {/* Top section */}
      <UserInfo />
      <div className="mt-10">
        <div className="mb-6">
          <h4 className="text-sm text-slate-600">Silahkan masukkan</h4>
          <h2 className="text-xl font-bold text-slate-700">Nominal Top Up</h2>
        </div>

        <form action="" className="flex gap-6 items-center">
          <div className="w-full">
            <FormInput
              placeholder="Nominal Min. Rp.10.000 Max. Rp.1000.000"
              type="number"
              name="top_up_amount"
              value={inputValue}
              onChange={handleInputChange}
              required
              className="font-bold text-lg"
            />

            {/* /> */}
            <button
              className={`rounded-md w-full text-white text-sm font-bold py-2 ${
                isButtonDisabled ? "bg-gray-400" :
                loading? "bg-red-300" :
                "bg-red-500"
              }`}
              onClick={handleTopUp}
              disabled={isButtonDisabled || loading}
            >
              {loading ? (
                <span className="inline-block w-[14px] h-[14px] border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                // "Processing..."
              ) : (
                "Top Up"
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
              <button
                className={`border-gray-200 border bg-gray-100 h-10 px-12 rounded-md font-semibold flex justify-center text-sm ring-offset-red-500  ring-red-300 items-center text-slate-700 transition-all ${selectedAmount === amount ? "border-red-500" : ""}`}
                onClick={(e) => handleButtonClick(e, amount)}
                key={amount}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Topup;
