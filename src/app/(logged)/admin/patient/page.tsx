"use client";
import Loading from "@/components/Icons/Loading";
import CreatePatientModal from "@/components/patient/CreatePatientModal";
import { useModal } from "@/hooks/useModal";
import { formatDateTime, formatDob } from "@/lib/dateTime";
import { useGetPatients } from "@/tanstackquery/patients";
import { Patient } from "@prisma/client";
import React, { useState } from "react";

const Page = () => {
  const { data, isPending } = useGetPatients();
  //  use hook useModal
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { modal, openModal, closeModal } = useModal({
    CreatePatientModal: false,
  });
  return (
    <div className="space-y-5 min-h-screen container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        QUẢN LÝ BỆNH NHÂN
      </h1>
      <div>
        <button
          className="btn"
          onClick={() => {
            setSelectedPatient(null);
            openModal("CreatePatientModal");
          }}
        >
          Thêm bệnh nhân
        </button>
      </div>
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
                    HỌ TÊN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NGÀY SINH
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CCCD
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GIỚI TÍNH
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MÃ SỐ BHYT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ĐỊA CHỈ
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((patient, index: any) => {
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
                        <td className="px-6 py-3">{patient.fullName}</td>
                        <td className="px-6 py-3">
                          {formatDob(patient?.dob || new Date())}
                        </td>
                        <td className="px-6 py-3">{patient?.citizenId}</td>
                        <td className="px-6 py-3">{patient.gender}</td>
                        <td className="px-6 py-3">
                          {patient?.healthInsuranceId}
                        </td>
                        <td className="px-6 py-3">{patient.address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CreatePatientModal
        handleCloseModal={() => closeModal("CreatePatientModal")}
        isModalOpen={modal.CreatePatientModal}
      />
    </div>
  );
};

export default Page;
