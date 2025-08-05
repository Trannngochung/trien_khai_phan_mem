"use client";
import { useGetBills, useUpdateBill } from "@/tanstackquery/bill";
import { Bill } from "@/types/type";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import { BillStatus } from "@prisma/client";
import useAuthStore from "@/store/store";
import Loading from "@/components/Icons/Loading";

const billStatus = {
  PENDING: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  CANCELLED: "Đã hủy",
};
const _totalCost = (bill: Bill) => {
  const totalCostPrescription = bill?.prescriptions?.reduce(
    (acc, prescription) => acc + Number(prescription.totalCost)!,
    0
  );
  const totalCostTest = bill?.testResults?.reduce(
    (acc, test) => acc + Number(test.totalCost)!,
    0
  );
  return (totalCostPrescription ?? 0) + (totalCostTest ?? 0);
};
const BillTable = () => {
  const { profile, role } = useAuthStore();

  const [filter, setFilter] = useState<{
    status: BillStatus | "ALL";
  }>({
    status: "ALL",
  });
  const { data: bills, isPending } = useGetBills({
    patientId: role == "PATIENT" ? profile?.id : undefined,
    status: filter.status == "ALL" ? undefined : filter.status,
  });
  // use update bill
  const updateBill = useUpdateBill();
  const _handleConfirmBill = async (bill: Bill, type: BillStatus) => {
    const data = {
      ...bill,
      status: type as BillStatus,
      paidAt: new Date(),
      totalCost: _totalCost(bill),
    };

    try {
      await updateBill.mutateAsync(
        { id: Number(bill.id), data },
        {
          onSuccess(response) {
            toast.success(
              `Đã ${type === "PAID" ? "thanh toán" : "hủy"} hóa đơn thành công!`
            );
          },
          onError() {
            toast.error(
              `Đã xảy ra lỗi khi ${
                type === "PAID" ? "thanh toán" : "hủy"
              } hóa đơn!`
            );
          },
        }
      );
    } finally {
    }
  };
  return (
    <>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-5 font-bold">
        Hóa Đơn
      </h2>
      <div className="flex items-center p-4 gap-2">
        <label className="m-0" htmlFor="status">
          Trạng thái:
        </label>
        <select
          id="status"
          className="p-2 border border-gray-300 rounded-md"
          value={filter.status}
          onChange={(e) =>
            setFilter({
              ...filter,
              status: e.target.value as BillStatus | "ALL",
            })
          }
        >
          <option value="ALL">Tất cả</option>
          <option value="PENDING">Chưa thanh toán</option>
          <option value="PAID">Đã thanh toán</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>

      {isPending && <Loading />}
      {!isPending && (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Mã Bill</th>
                <th className="p-3 border">Bệnh nhân</th>
                <th className="p-3 border">Bác sĩ</th>
                <th className="p-3 border">Chẩn đoán</th>
                <th className="p-3 border">Đơn thuốc</th>
                <th className="p-3 border">Xét nghiệm</th>
                <th className="p-3 border">Tổng tiền</th>
                <th className="p-3 border">Trạng thái</th>
                <th className="p-3 border">Ngày tạo</th>
                <th className="p-3 border">Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {bills &&
                bills.map((bill) => (
                  <tr key={bill.id} className="text-center border">
                    <td className="p-3 border">{bill.id}</td>
                    <td className="p-3 border">
                      {bill?.patient?.fullName} ({bill?.patient.gender})
                    </td>
                    <td className="p-3 border">
                      {bill?.doctor.fullName} - {bill?.doctor.specialization}
                    </td>
                    <td className="p-3 border">
                      {bill?.medicalRecord.diagnosis} (
                      {bill?.medicalRecord.symptoms})
                    </td>
                    <td className="p-3 border">
                      {bill?.prescriptions &&
                      bill?.prescriptions?.length > 0 ? (
                        <div>
                          {bill?.prescriptions.map((prescription, index) => (
                            <p key={index} className="block">
                              - Đơn thuốc {index + 1} ({prescription.totalCost}{" "}
                              VND)
                            </p>
                          ))}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3 border">
                      {bill?.testResults && bill?.testResults?.length > 0 ? (
                        <div>
                          {bill?.testResults.map((test, index) => (
                            <p key={index} className="block">
                              - {test.testName} ({test.totalCost} VND)
                            </p>
                          ))}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3 border">
                      <div>{_totalCost(bill)}</div>
                    </td>
                    <td
                      className={`p-3 border font-bold ${
                        bill?.status === "PENDING"
                          ? "text-yellow-500"
                          : bill?.status === "PAID"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {billStatus[bill?.status as keyof typeof billStatus]}
                    </td>
                    <td className="p-3 border">
                      {new Date(bill?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border space-y-2">
                      {bill?.status == "PENDING" && role == "STAFF" && (
                        <>
                          <Popover>
                            <PopoverTrigger className="btn">
                              Thanh toán
                            </PopoverTrigger>
                            <PopoverContent className="">
                              Xác nhận thanh toán hóa đơn?
                              <div className="flex gap-2 justify-center mt-2">
                                <button
                                  className="p-2"
                                  onClick={() =>
                                    _handleConfirmBill(bill, "PAID")
                                  }
                                >
                                  Xác nhận
                                </button>
                                <button className="p-2">Quay lại</button>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger className="btn">Hủy</PopoverTrigger>
                            <PopoverContent className="">
                              Xác nhận hủy hóa đơn?
                              <div className="flex gap-2 justify-center mt-2">
                                <button
                                  className="p-2"
                                  onClick={() =>
                                    _handleConfirmBill(bill, "CANCELLED")
                                  }
                                >
                                  Xác nhận
                                </button>
                                <button className="p-2">Quay lại</button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default BillTable;
