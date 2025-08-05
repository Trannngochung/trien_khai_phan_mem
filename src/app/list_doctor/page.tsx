import DoctorListTable from "@/components/doctor/DoctorListTable";
import React from "react";

const Page = () => {
  return (
    <div className="container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        Danh Sách bác sĩ
      </h1>
      <DoctorListTable />
    </div>
  );
};

export default Page;
