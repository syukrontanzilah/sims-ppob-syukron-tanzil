/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Button from "@/components/Button";
import CardHistory from "@/components/CardHistory";
import UserInfo from "@/components/UserInfo";
import { getHistory } from "@/utils/historyUtils";
import React, { useEffect, useState } from "react";

interface TransactionRecord {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

interface HistoryData {
  offset: number;
  limit: number;
  records: TransactionRecord[];
}

interface HistoryResponse {
  status: number;
  message: string;
  data: HistoryData;
}

const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(false);

  const getHistoryData = async (currentOffset: number) => {
    try {
      const res = await getHistory(currentOffset, limit);
      // console.log("history data-->", res);

      if (res.data.records.length > 0) {

        const newRecords = res.data.records.filter(
          (record: any) =>
            !transactions.some(
              (item) => item.invoice_number === record.invoice_number
            )
        );
        const updatedTransactions = [...transactions, ...newRecords];
        setTransactions(updatedTransactions);

        setHasMore(res.data.records.length === limit);

      } else {
        console.log("error", res.message);
        setHasMore(false);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getHistoryData(0);
  }, []);

  const handleShowMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    getHistoryData(newOffset);
  };

  return (
    <div className="m-6 mx-[10%] min-h-screen">
      {/* Top section */}
      <UserInfo />
      <div className="mt-10">
        <div className="font-semibold text-md mb-6">Semua Transaksi</div>
        <div>
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <CardHistory
                key={item.invoice_number}
                type_transaksi={item.transaction_type}
                nominal={item.total_amount}
                date={new Date(item.created_on).toLocaleString()}
                transaksi={item.description}
              />
            ))
          ) : (
            <div className="text-slate-400 text-center mt-10">
              Belum ada transaksi.
            </div>
          )}
        </div>
        {hasMore && (
          <div className="flex justify-center">
            <button
              className="text-red-500 font-bold bg-slate-100 rounded-md p-2 text-sm"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
