"use client";
import { useGetMedicalRecords } from "@/tanstackquery/medicalRecord";
import React from "react";
import Loading from "../Icons/Loading";
import { formatDateTime } from "@/lib/dateTime";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const MedicalRecordTable = () => {
  const { data: medicalRecords, isPending } = useGetMedicalRecords({});
  const router = useRouter();
  const pathname = usePathname();
  console.log(medicalRecords);
  return (
    <div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-5 font-bold">
        Danh sách sổ khám bệnh
      </h2>
      {isPending && <Loading />}
      {!isPending && (
        <div className="relative overflow-x-auto px-10 rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  BỆNH NHÂN
                </th>
                <th scope="col" className="px-6 py-3">
                  Bác sĩ khám
                </th>
                <th scope="col" className="px-6 py-3">
                  TRIỆU CHỨNG
                </th>
                <th scope="col" className="px-6 py-3">
                  CHUẨN ĐOÁN
                </th>
                <th scope="col" className="px-6 py-3">
                  GHI CHÚ
                </th>
                <th scope="col" className="px-6 py-3">
                  THỜI GIAN TẠO SỔ
                </th>
                <th scope="col" className="px-6 py-3">
                  TRẠNG THÁI
                </th>
                <th scope="col" className="px-6 py-3">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords &&
                medicalRecords.map((medicalRecord, idx) => {
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
                      <td className="px-6 py-4">
                        {medicalRecord.patient.fullName}
                      </td>
                      <td className="px-6 py-4">
                        {medicalRecord.doctor.fullName}
                      </td>{" "}
                      {/* triệu trứng */}
                      <td className="px-6 py-4">{medicalRecord.symptoms}</td>
                      {/* chuẩn đoán */}
                      <td className="px-6 py-4">{medicalRecord.diagnosis}</td>
                      <td className="px-6 py-4">{medicalRecord.note}</td>
                      <td className="px-6 py-4">
                        {formatDateTime(medicalRecord.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        {medicalRecord.bill.status == "PENDING"
                          ? "Chưa thanh toán"
                          : medicalRecord.bill.status == "PAID"
                          ? "Đã thanh toán"
                          : "Đã hủy"}
                      </td>
                      <td className="px-6 py-4">
                        {medicalRecord.bill.status == "PENDING" && (
                          <button
                            onClick={() =>
                              router.push(`${pathname}/${medicalRecord.id}`)
                            }
                            className="p-2 rounded-sm inline-block"
                          >
                            Cập nhật sổ khám bệnh
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordTable;
