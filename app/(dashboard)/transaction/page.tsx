/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Button from "@/components/Button";
import CardHistory from "@/components/CardHistory";
import UserInfo from "@/components/UserInfo";
import { getHistory } from "@/utils/historyUtils";
import React, { useEffect, useState } from "react";

interface TransactionRecord {
  invoice_number: string; // Nomor invoice
  transaction_type: string; // Jenis transaksi, misalnya "TOPUP"
  description: string; // Deskripsi transaksi, misalnya "Top Up balance"
  total_amount: number; // Total nominal transaksi
  created_on: string; // Tanggal transaksi dalam format ISO 8601
}

interface HistoryData {
  offset: number; // Posisi offset data
  limit: number; // Batas jumlah data
  records: TransactionRecord[]; // Array transaksi
}

interface HistoryResponse {
  status: number; // Status dari response, misalnya 0 untuk sukses
  message: string; // Pesan status, misalnya "Get History Berhasil"
  data: HistoryData;
}

const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  const getHistoryData = async () => {
    try {
      const res = await getHistory();
      console.log("history data-->", res.records);
      if (res.records !== 0) {
        setTransactions(res.records);
      } else {
        console.log("error", res.message);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getHistoryData();
  }, []);

  return (
    <div className="m-6 mx-[10%] min-h-screen">
      {/* Top section */}
      <UserInfo />
      <div className="mt-10">
        <div className="font-semibold text-md mb-6">Semua Transaksi</div>
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <CardHistory
                key={index}
                type_transaksi={transaction.transaction_type}
                nominal={transaction.total_amount}
                date={new Date(transaction.created_on).toLocaleString()} 
                transaksi={transaction.description}
              />
            ))
          ) : (
            <div className="text-slate-400 text-center">
              Belum ada transaksi.
            </div>
          )}
        </div>
        {transactions.length > 4 && (
          <div className="flex justify-center">
            <button className="text-red-500 font-bold bg-slate-100 rounded-md p-2 text-sm">
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
