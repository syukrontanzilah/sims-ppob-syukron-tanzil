import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

interface CardHistoryProps {
  nominal: number;
  date: string;
  transaksi: string;
  type_transaksi: string;
}

const CardHistory: React.FC<CardHistoryProps> = ({
  nominal,
  date,
  transaksi,
  type_transaksi,
}) => {
  const formatBalance = (balance: number) => {
    if (isNaN(balance)) return "Rp. -";
    return balance
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace("IDR", "Rp.")
      .replace(/(\,00)/, "");
  };
  return (
    <div className="shadow-sm flex justify-between rounded-md p-4 items-center border-gray-200 border mb-4">
      <div>
        <div className="flex items-center gap-1">
          {type_transaksi === "TOPUP" ? (
            <FaPlus fontSize={12} className="text-green-500" />
          ) : (
            <FaMinus fontSize={12} className="text-red-500" />
          )}
          <div
            className={`font-bold text-lg ${
              type_transaksi === "TOPUP" ? "text-green-500" : "text-red-500"
            }`}
          >
          {formatBalance(nominal)}
          </div>
        </div>
        <div className="text-xs text-slate-400">{date}</div>
      </div>

      <div className="text-xs text-slate-500 font-bold">{transaksi}</div>
    </div>
  );
};

export default CardHistory;
