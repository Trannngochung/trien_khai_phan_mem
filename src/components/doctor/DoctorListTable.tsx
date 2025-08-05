"use client";
import { useDeleteDoctor, useGetDoctors } from "@/tanstackquery/doctor";
import { Department } from "@prisma/client";
import React, { useState } from "react";
import Loading from "../Icons/Loading";
import useAuthStore from "@/store/store";
import CreateDoctorModal from "./modal/createDoctorModal";
import { ICreateDoctor } from "@/app/api/doctors/route";
import Image from "next/image";
import { ICreateAccount } from "@/tanstackquery/account";
import { Doctor } from "@/types/type";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "react-toastify";
const departmentName = {
  KHOA_NOI_TONG_QUAT: "Khoa nội tổng quát",
  KHOA_NGOAI: "Khoa ngoại",
  KHOA_NHI: "Khoa nhi",
  KHOA_HOI_SUC_CAP_CUU: "Khoa hồi sức cứu",
};
const convertBytesToBase64 = (bytes: any) => {
  if (!bytes) return "";
  // Nếu bytes là object kiểu {0: ..., 1: ..., 2: ...}, ta cần chuyển thành Uint8Array
  if (typeof bytes === "object" && !Buffer.isBuffer(bytes)) {
    bytes = Object.values(bytes); // Lấy tất cả giá trị số trong object
  }

  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;
};

const DoctorListTable = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | "">(
    ""
  );
  const [modal, setModal] = useState({ CreateDoctorModal: false });
  const deleteDoctor = useDeleteDoctor();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const _handleOpenModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: true }));
  };
  const _handleCloseModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: false }));
  };
  const { role } = useAuthStore();
  const { data: doctors, isPending } = useGetDoctors({
    department: selectedDepartment || undefined,
  });

  const _handleDeleteDoctor = (id: number) => {
    deleteDoctor.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Đã xóa bác sĩ thành công");
      },
      onError: (error) => {
        toast.error("Đã xóa bác sĩ thất bại");
      },
    });
  };
  return (
    <div className="px-10 rounded-lg">
      <div className="form-group">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Lọc theo khoa
        </label>
        <select
          onChange={(e) => setSelectedDepartment(e.target.value as Department)}
          className=" px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        >
          <option value={""}>Chọn khoa</option>
          <option value="KHOA_NOI_TONG_QUAT">Khoa nội tổng quát</option>
          <option value="KHOA_NGOAI">Khoa ngoại</option>
          <option value="KHOA_NHI">Khoa nhi</option>
          {/* Add doctor options here */}
        </select>
      </div>
      {role == "ADMIN" && (
        <div>
          <button
            className="btn"
            onClick={() => {
              setSelectedDoctor(null);
              _handleOpenModal("CreateDoctorModal");
            }}
          >
            Thêm bác sĩ
          </button>
        </div>
      )}
      <div className="overflow-x-auto mt-2">
        {isPending && <Loading />}
        {!isPending && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  TÊN BÁC SĨ
                </th>
                <th scope="col" className="px-6 py-3">
                  Ảnh đại diện
                </th>
                <th scope="col" className="px-6 py-3">
                  KHOA
                </th>
                {role !== "PATIENT" && (
                  <>
                    <th scope="col" className="px-6 py-3">
                      TÀI KHOẢN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      MẬT KHẨU
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TÙY CHỌN
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {doctors &&
                doctors.map((doctor, idx) => {
                  return (
                    <tr
                      key={idx}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-6 py-4">{doctor.fullName}</td>
                      <td className="px-6 py-4">
                        {doctor.avatar && (
                          <Image
                            alt=""
                            src={doctor.avatar}
                            width={100}
                            height={100}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {
                          departmentName[
                            doctor.department as keyof typeof departmentName
                          ]
                        }
                      </td>
                      {role !== "PATIENT" && (
                        <>
                          <td className="px-6 py-4">{doctor?.account?.username}</td>
                          <td className="px-6 py-4">{doctor?.account?.password}</td>
                          <td className="px-6 py-4 space-x-2">
                            {role == "ADMIN" && (
                              <>
                                <button
                                  className="btn"
                                  onClick={() => {
                                    setSelectedDoctor(doctor);
                                    _handleOpenModal("CreateDoctorModal");
                                  }}
                                >
                                  Sửa
                                </button>
                              </>
                            )}
                            {role == "ADMIN" && (
                              <Popover>
                                <PopoverTrigger className="btn">Xóa</PopoverTrigger>
                                <PopoverContent className="w-80 space-y-2">
                                  <p className="text-lg font-bold">
                                    Xác nhận xóa bác sĩ {doctor.fullName}?
                                  </p>
                                  <button
                                    className="btn mx-auto block w-full"
                                    onClick={() => {
                                      _handleDeleteDoctor(doctor.id as number);
                                    }}
                                  >
                                    {deleteDoctor.isPending ? "Đang xóa..." : "Xóa"}
                                  </button>
                                </PopoverContent>
                              </Popover>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <CreateDoctorModal
        isModalOpen={modal.CreateDoctorModal}
        handleCloseModal={() => _handleCloseModal("CreateDoctorModal")}
        selectedDoctor={selectedDoctor}
      />
    </div>
  );
};

export default DoctorListTable;
