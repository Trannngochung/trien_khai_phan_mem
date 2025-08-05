"use client";
import AppointmentTable from "@/components/user/home/AppointmentTable";
import CreateAppointmentModal from "@/components/user/home/CreateAppointmentModal";
import { Appointment } from "@/types/type";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [modal, setModal] = useState({ CreateAppointmentModal: false });
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const _handleOpenModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: true }));
  };
  const _handleCloseModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: false }));
  };
  return (
    <>
      <div className="space-y-5 container">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
          DỊCH VỤ
        </h1>
        <div className="grid grid-cols-3 gap-10 justify-center">
          {/* <a className="btn" href="#">
          <span className="text-sm font-medium">
            Thêm, chỉnh sửa thông tin cá nhân
          </span>
        </a> */}
          <button
            className="btn"
            onClick={() => _handleOpenModal("CreateAppointmentModal")}
          >
            <span className="text-sm font-medium">
              Đăng kí lịch khám chữa bệnh
            </span>
          </button>
          <Link className="btn text-white" href="/user/medical-records">
            Xem hồ sơ bệnh án (sổ khám bệnh)
          </Link>
          <Link className="btn text-white" href="/user/bills">
            Xem hóa đơn
          </Link>
        </div>
        <AppointmentTable />
      </div>
      <CreateAppointmentModal
        isModalOpen={modal.CreateAppointmentModal}
        handleCloseModal={() => _handleCloseModal("CreateAppointmentModal")}
        selectedAppointment={selectedAppointment}
      />
    </>
  );
};

export default Page;
