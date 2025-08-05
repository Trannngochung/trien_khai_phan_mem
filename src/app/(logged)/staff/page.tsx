import AppointmentTableStaff from "@/components/staff/AppointmentTableStaff";
import React from "react";

const page = () => {
  return (
    <div className="space-y-5 container">
      {/* <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        Trang Chủ
      </h1> */}
      {/* <div className="grid grid-cols-3 gap-10 justify-center">
        <a className="btn" href="#">
          <span className="text-sm font-medium">
            Thêm, chỉnh sửa thông tin cá nhân
          </span>
        </a>
        <button
          className="btn"
          // onClick={() => _handleOpenModal("CreateAppointmentModal")}
        >
          <span className="text-sm font-medium">
            Đăng kí lịch khám chữa bệnh
          </span>
        </button>
        <button
          className="btn"
          // onClick={() => _handleOpenModal("CreateAppointmentModal")}
        >
          <span className="text-sm font-medium">Xem hồ sơ bệnh án</span>
        </button>
        <button
          className="btn"
          // onClick={() => _handleOpenModal("CreateAppointmentModal")}
        >
          <span className="text-sm font-medium">Xem hóa đơn đã thanh toán</span>
        </button>
      </div> */}
      <AppointmentTableStaff />
    </div>
  );
};

export default page;
