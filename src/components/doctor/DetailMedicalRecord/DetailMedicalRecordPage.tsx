"use client";
import { useGetMedicalRecordById } from "@/tanstackquery/medicalRecord";
import React, { useState } from "react";
import CreateTestResultModal from "./CreateTestResultModal";
import Loading from "@/components/Icons/Loading";
import { formatDateTime } from "@/lib/dateTime";
import CreatePrescriptionModal from "./CreatePrescriptionModal";
import useAuthStore from "@/store/store";

interface Props {
  medicalRecordID: string;
}
const DetailMedicalRecordPage = ({ medicalRecordID }: Props) => {
  const { role } = useAuthStore();
  const { data, isPending } = useGetMedicalRecordById(Number(medicalRecordID));
  const [modal, setModal] = useState({
    CreateTestResultModal: false,
    CreatePrescriptionModal: false,
  });
  const _handleOpenModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: true }));
  };
  const _handleCloseModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: false }));
  };
  return (
    <>
      <div className="space-y-5 container">
        <h1 className="text-center">
          Sổ khám bệnh của bệnh nhân: {data?.patient.fullName}
        </h1>
        {role == "DOCTOR" && (
          <div className="flex justify-center gap-5">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => _handleOpenModal("CreateTestResultModal")}
            >
              Tạo phiếu xét nghiệm
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => _handleOpenModal("CreatePrescriptionModal")}
            >
              Tạo đơn thuốc
            </button>
          </div>
        )}

        {!isPending ? (
          <div className="grid grid-cols-2 gap-5 justify-center justify-items-center items-start">
            <ul className="bg-white shadow-md rounded-lg p-2 border border-gray-200 w-full max-w-md">
              <li className="flex justify-center items-center py-2 border-b last:border-none">
                <span className="text-xl text-gray-900 font-bold">
                  Thông tin bệnh nhân
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">
                  Họ tên bệnh nhân:
                </span>
                <span className="text-gray-500 font-medium">
                  {data?.patient.fullName}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">Ngày sinh:</span>
                <span className="text-gray-500 font-medium">
                  {new Date(data?.patient.dob!).toLocaleDateString("vi-VN")}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">Địa chỉ:</span>
                <span className="text-gray-500 font-medium">
                  {data?.patient.address}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">
                  Số điện thoại:
                </span>
                <span className="text-gray-500 font-medium">
                  {data?.patient.phone}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">Giới tính:</span>
                <span className="text-gray-500 font-medium">
                  {data?.patient.gender}
                </span>
              </li>
            </ul>

            <ul className="bg-white shadow-md rounded-lg p-2 border border-gray-200 w-full max-w-md">
              <li className="flex justify-center items-center py-2 border-b last:border-none">
                <span className="text-xl text-gray-900 font-bold">
                  Thông tin bệnh
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">
                  Triệu chứng:
                </span>
                <span className="text-gray-500 font-medium">
                  {data?.symptoms}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">Chẩn đoán:</span>
                <span className="text-gray-500 font-medium">
                  {data?.diagnosis}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b last:border-none">
                <span className="text-gray-900 font-semibold">Ghi chú:</span>
                <span className="text-gray-500 font-medium">{data?.note}</span>
              </li>
            </ul>
            <ul className="bg-white shadow-md rounded-lg p-2 border border-gray-200 w-full max-w-md space-y-4">
              <li className="flex justify-center items-center py-2 border-b last:border-none">
                <span className="text-xl text-gray-900 font-bold">
                  Xét nghiệm
                </span>
              </li>
              {data?.bill?.testResults &&
                data?.bill?.testResults?.length > 0 &&
                data?.bill?.testResults.map((test, index) => (
                  <ul
                    key={index}
                    className="bg-white shadow-lg rounded-xl p-4 border border-gray-300 w-full max-w-lg"
                  >
                    {/* Tiêu đề */}
                    <li className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="text-xl text-gray-900 font-bold">
                        Phiếu xét nghiệm {index + 1}
                      </span>
                      <span className="text-sm text-gray-500">
                        Ngày: {formatDateTime(test.testDate)}
                      </span>
                    </li>

                    {/* Dữ liệu xét nghiệm */}
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">
                        Tên xét nghiệm:
                      </span>
                      <span className="text-gray-500">{test.testName}</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">
                        Loại xét nghiệm:
                      </span>
                      <span className="text-gray-500">{test.testType}</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">
                        Kết quả:
                      </span>
                      <span className="text-gray-500">{test.result}</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">
                        Diễn giải (Nhận xét):
                      </span>
                      <span className="text-gray-500">
                        {test.interpretation}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">
                        Ghi chú:
                      </span>
                      <span className="text-gray-500">{test.note}</span>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <span className="text-gray-700 font-semibold">
                        Tổng chi phí:
                      </span>
                      <span className="text-gray-900 font-bold">
                        {test.totalCost} VND
                      </span>
                    </li>
                  </ul>
                ))}
            </ul>
            <ul className="bg-white shadow-md rounded-lg p-2 border border-gray-200 w-full max-w-md space-y-4">
              <li className="flex justify-center items-center py-2 border-b last:border-none">
                <span className="text-xl text-gray-900 font-bold">
                  Đơn thuốc
                </span>
              </li>
              {data?.bill?.prescriptions &&
                data?.bill?.prescriptions?.length > 0 &&
                data?.bill?.prescriptions.map((prescription, index) => (
                  <ul
                    key={index}
                    className="bg-white shadow-lg rounded-xl p-4 border border-gray-300 w-full max-w-lg"
                  >
                    {/* Tiêu đề */}
                    <li className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="text-xl text-gray-900 font-bold">
                        Đơn thuốc {index + 1}
                      </span>
                      <span className="text-sm text-gray-500">
                        Ngày: {formatDateTime(prescription.createdAt)}
                      </span>
                    </li>

                    {/* Dữ liệu xét nghiệm */}

                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">
                        Ghi chú:
                      </span>
                      <span className="text-gray-500">{prescription.note}</span>
                    </li>

                    {/* render prescription medicines */}
                    {prescription.prescriptionMedicines.map(
                      (medicine, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-200"
                        >
                          <span className="text-gray-500 font-medium"></span>
                          <span className="text-gray-500">
                            {medicine.quantity} {medicine.medicine.unit}{" "}
                            {medicine.medicine.name}
                          </span>
                        </li>
                      )
                    )}
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-900 font-bold">
                        Tổng chi phí:
                      </span>
                      <span className="text-gray-900 font-bold">
                        {prescription.totalCost} VND
                      </span>
                    </li>
                  </ul>
                ))}
            </ul>
          </div>
        ) : (
          <Loading />
        )}
        <CreateTestResultModal
          selectedMedicalRecord={data}
          isModalOpen={modal.CreateTestResultModal}
          handleCloseModal={() => _handleCloseModal("CreateTestResultModal")}
        />
        <CreatePrescriptionModal
          selectedMedicalRecord={data}
          isModalOpen={modal.CreatePrescriptionModal}
          handleCloseModal={() => _handleCloseModal("CreatePrescriptionModal")}
        />
      </div>
    </>
  );
};

export default DetailMedicalRecordPage;
