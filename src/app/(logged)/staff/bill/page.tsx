import BillTable from "@/components/staff/bill/BillTable";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-5 font-bold">
        Danh sách hóa đơn
      </h2>
      <BillTable />
    </div>
  );
};

export default Page;
