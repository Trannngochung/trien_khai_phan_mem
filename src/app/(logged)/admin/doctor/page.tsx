import DoctorListTable from "@/components/doctor/DoctorListTable";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-5 container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        QUẢN LÝ BÁC SĨ
      </h1>
      <DoctorListTable />
    </div>
  );
};

export default Page;
