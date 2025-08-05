"use client";
import Loading from "@/components/Icons/Loading";
import { formatDateTime, formatDateTimeBill } from "@/lib/dateTime";
import { useGetBills } from "@/tanstackquery/bill";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Roboto.js";
type Invoice = {
  id: number;
  patientId: number;
  doctorId: number;
  medicalRecordId: number;
  totalCost: string;
  status: string;
  createdAt: string;
  paidAt: string;
  patient: {
    id: number;
    fullName: string;
  };
  prescriptions: { id: number }[];
  testResults: { id: number }[];
};

const Page = () => {
  const { data, isPending } = useGetBills({ status:"PAID"});

  const [typeFilter, setTypeFilter] = useState<"DAY" | "MONTH">("DAY");
  const [listBill, setListBill] = useState<any>([]);
  useEffect(() => {
    if (!data) return;
    const invoices: Invoice[] = [
      {
        id: 1,
        patientId: 1,
        doctorId: 2,
        medicalRecordId: 1,
        totalCost: "266000",
        status: "PAID",
        createdAt: "2025-03-21T02:42:26.592Z",
        paidAt: "2025-03-21T02:43:59.943Z",
        patient: {
          id: 1,
          fullName: "Nguyễn Văn An",
        },
        prescriptions: [{ id: 1 }],
        testResults: [{ id: 1 }, { id: 2 }],
      },
      {
        id: 2,
        patientId: 2,
        doctorId: 3,
        medicalRecordId: 2,
        totalCost: "150000",
        status: "PAID",
        createdAt: "2025-03-21T10:15:00.000Z",
        paidAt: "2025-03-21T11:30:00.000Z",
        patient: {
          id: 2,
          fullName: "Trần Thị Bích",
        },
        prescriptions: [{ id: 2 }, { id: 3 }],
        testResults: [{ id: 3 }],
      },
      {
        id: 3,
        patientId: 3,
        doctorId: 1,
        medicalRecordId: 3,
        totalCost: "180000",
        status: "PAID",
        createdAt: "2025-03-22T08:00:00.000Z",
        paidAt: "2025-03-22T09:15:00.000Z",
        patient: {
          id: 3,
          fullName: "Lê Văn Hùng",
        },
        prescriptions: [{ id: 4 }],
        testResults: [],
      },
      {
        id: 4,
        patientId: 1,
        doctorId: 4,
        medicalRecordId: 4,
        totalCost: "220000",
        status: "PAID",
        createdAt: "2025-03-22T14:30:00.000Z",
        paidAt: "2025-03-22T15:45:00.000Z",
        patient: {
          id: 1,
          fullName: "Nguyễn Văn An",
        },
        prescriptions: [{ id: 5 }],
        testResults: [{ id: 4 }, { id: 5 }],
      },
      {
        id: 5,
        patientId: 4,
        doctorId: 5,
        medicalRecordId: 5,
        totalCost: "50000",
        status: "PAID",
        createdAt: "2025-03-23T12:00:00.000Z",
        paidAt: "2025-03-23T12:45:00.000Z",
        patient: {
          id: 4,
          fullName: "Phạm Minh Tuấn",
        },
        prescriptions: [],
        testResults: [{ id: 6 }],
      },
    ];

    type SummaryByDay = Record<
      string,
      {
        totalRevenue: number;
        totalPatients: Set<number>;
        totalPrescriptions: number;
        totalTestResults: number;
      }
    >;

    const summaryByDay = data.reduce<SummaryByDay>((acc, invoice) => {
      const date = String(invoice.paidAt).split("T")[0]; // Lấy ngày (YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = {
          totalRevenue: 0,
          totalPatients: new Set(),
          totalPrescriptions: 0,
          totalTestResults: 0,
        };
      }

      acc[date].totalRevenue += Number(invoice.totalCost);
      acc[date].totalPatients.add(invoice.patientId);
      acc[date].totalPrescriptions += invoice?.prescriptions?.length ?? 0;
      acc[date].totalTestResults += invoice?.testResults?.length ?? 0;

      return acc;
    }, {} as SummaryByDay);

    // Chuyển đổi kết quả sang dạng mảng (nếu cần)
    const result = Object.entries(summaryByDay).map(([date, data]) => ({
      date,
      totalRevenue: data.totalRevenue,
      totalPatients: data.totalPatients.size,
      totalPrescriptions: data.totalPrescriptions,
      totalTestResults: data.totalTestResults,
    }));

    setListBill(result);
  }, [data]);
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFont("Roboto-VariableFont_wdth,wght");

    // Thêm tiêu đề
    doc.text("BÁO CÁO DOANH THU", 20, 10);

    // Dữ liệu bảng
    const tableColumn = [
      "STT",
      "NGAY",
      "DOANH THU",
      "BENH NHAN",
      "PHIEU XET NGHIEM",
      "DON THUOC",
    ];

    const tableRows = listBill.map((bill: any, index: number) => [
      index + 1,
      bill.date,
      bill.totalRevenue,
      bill.totalPatients,
      bill.totalTestResults,
      bill.totalPrescriptions,
    ]);

    // Sử dụng autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 5, font: "Roboto-VariableFont_wdth,wght" },
    });

    // Xuất file PDF
    doc.save("Bao-cao-doanh-thu.pdf");
  };
  return (
    <div className="space-y-5 min-h-screen container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        DOANH THU
      </h1>
      <button className="btn" onClick={generatePDF}>
        Xuất báo cáo
      </button>
      {typeFilter == "DAY" && (
        <div className="px-10 rounded-lg">
          {/* <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Lọc theo tháng
            </label>
            <select className=" px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
              <option value={""}>tất cả</option>
              <option value="KHOA_NOI_TONG_QUAT">Khoa nội tổng quát</option>
              <option value="KHOA_NGOAI">Khoa ngoại</option>
              <option value="KHOA_NHI">Khoa nhi</option>
              
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Lọc theo năm
            </label>
            <select className=" px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
              <option value={""}>2025</option>
              <option value="KHOA_NOI_TONG_QUAT">Khoa nội tổng quát</option>
              <option value="KHOA_NGOAI">Khoa ngoại</option>
              <option value="KHOA_NHI">Khoa nhi</option>
             
            </select>
          </div> */}

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
                      NGÀY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DOANH THU
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TỔNG SỐ BỆNH NHÂN KHÁM
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TỔNG PHIẾU XÉT NGHIỆM
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TỔNG ĐƠN THUỐC
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listBill.map((bill: any, index: any) => {
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
                        <td className="px-6 py-3">
                          {formatDateTimeBill(bill?.date)}
                        </td>
                        <td className="px-6 py-3">{bill.totalRevenue}</td>
                        <td className="px-6 py-3">{bill.totalPatients}</td>
                        <td className="px-6 py-3">{bill.totalTestResults}</td>
                        <td className="px-6 py-3">{bill.totalPrescriptions}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
