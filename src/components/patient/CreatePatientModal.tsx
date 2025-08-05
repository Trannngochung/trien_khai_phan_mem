import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Appointment } from "@/types/type";
import { Modal, Form, DatePicker, Select } from "antd";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/store";
import { useGetDoctors } from "@/tanstackquery/doctor";
import { formatDateTime } from "@/lib/dateTime";
import {
  CreateMedicalRecordParams,
  useCreateMedicalRecord,
} from "@/tanstackquery/medicalRecord";
import Signup from "../signup/Signup";

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CreatePatientModal = ({ handleCloseModal, isModalOpen }: Props) => {
  return (
    <>
      <Modal
        centered
        title={"Thêm bệnh nhân"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <button
            key="cancel"
            onClick={handleCloseModal}
            className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Quay lại
          </button>,
        ]}
        width={800}
      >
        <Signup isModal={true} />
      </Modal>
    </>
  );
};

export default CreatePatientModal;
