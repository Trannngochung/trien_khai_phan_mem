"use client";
import CreateDoctorModal from "@/components/doctor/modal/createDoctorModal";
import Loading from "@/components/Icons/Loading";
import CreateMedicineModal from "@/components/medicine/CreateMedicineModal";
import { formatDateTime, formatDob } from "@/lib/dateTime";
import { useDeleteMedicine, useGetAllMedicine } from "@/tanstackquery/medicine";

import { useGetStaffs } from "@/tanstackquery/staff";
import { Medicine } from "@/types/type";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModal } from "@/hooks/useModal";

const Page = () => {
  const { data, isPending } = useGetAllMedicine();
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const deleteMedicine = useDeleteMedicine();
  const { modal, openModal, closeModal } = useModal({
    CreateMedicineModal: false,
  });
  const _handleDeleteMedicine = async (id: number) => {
    await deleteMedicine.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Đã xóa thuốc thành công!");
      },
      onError: () => {
        toast.error("Đã xảy ra lỗi khi xóa thuốc!");
      },
    });
  };
  return (
    <div className="space-y-5 min-h-screen container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        QUẢN LÝ THUỐC
      </h1>
      <button
        className="btn"
        onClick={() => {
          setSelectedMedicine(null);
          openModal("CreateMedicineModal");
        }}
      >
        Thêm thuốc
      </button>
      <div className="px-10 rounded-lg">
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
                    TÊN THUỐC
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NGUỒN NHẬP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MÔ TẢ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GIÁ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SỐ LƯỢNG
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ĐƠN VỊ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TÙY CHỌN
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((medicine, index: any) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-3">{medicine.name}</td>
                        <td className="px-6 py-3">
                          {medicine.importedPharmacy}
                        </td>
                        <td className="px-6 py-3">{medicine.note}</td>
                        <td className="px-6 py-3">{medicine.price}</td>
                        <td className="px-6 py-3">{medicine.stock}</td>
                        <td className="px-6 py-3">{medicine.unit}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <button
                              className="btn"
                              onClick={() => {
                                setSelectedMedicine(medicine);
                                openModal("CreateMedicineModal");
                              }}
                            >
                              Sửa
                            </button>

                            <Popover>
                              <PopoverTrigger className="btn">
                                Xóa
                              </PopoverTrigger>
                              <PopoverContent className="w-80 space-y-2">
                                <p className="text-lg font-bold">
                                  Xác nhận xóa thuốc {medicine.name}?
                                </p>
                                <button
                                  className="btn mx-auto block w-full"
                                  onClick={() => {
                                    _handleDeleteMedicine(
                                      medicine.id as number
                                    );
                                  }}
                                >
                                  Xóa
                                </button>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CreateMedicineModal
        isModalOpen={modal.CreateMedicineModal}
        handleCloseModal={() => closeModal("CreateMedicineModal")}
        selectedMedicine={selectedMedicine}
      />
    </div>
  );
};

export default Page;
