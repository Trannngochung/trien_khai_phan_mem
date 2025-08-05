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

type Props = {
  selectedAppointment: Appointment | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CreateMedicalRecordModal = ({
  selectedAppointment,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const createMedicalRecord = useCreateMedicalRecord();
  const { data: doctors } = useGetDoctors();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<CreateMedicalRecordParams>({
    defaultValues: {},
  });

  const onSubmit = async (data: CreateMedicalRecordParams) => {
    setLoading(true);
    try {
      await createMedicalRecord.mutateAsync(
        {
          ...data,
        },
        {
          onSuccess(response) {
            toast.success(`Đã tạo sổ khám bệnh thành công!`);
            handleCloseModal();
          },
          onError() {
            toast.error("Đã xảy ra lỗi khi tạo sổ khám bệnh!");
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedAppointment) {
      setValue("doctorId", selectedAppointment.doctorId!);
      setValue("patientId", selectedAppointment.patientId);
      setValue("appointmentId", selectedAppointment.id!);
      setValue("symptoms", selectedAppointment.symptoms);
    }
  }, [selectedAppointment]);

  return (
    <>
      <Modal
        centered
        title={"Tạo sổ khám bệnh"}
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

          <button
            key="submit"
            onClick={handleSubmit((data) => onSubmit(data))}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "Tạo sổ khám bệnh"}
          </button>,
        ]}
        width={800}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tên bệnh nhân
            </label>
            <input
              value={selectedAppointment?.patient.fullName}
              disabled
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Bác sĩ khám
            </label>
            <input
              value={selectedAppointment?.doctor?.fullName}
              disabled
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ngày giờ khám
            </label>
            <input
              value={formatDateTime(selectedAppointment?.appointmentDate!)}
              disabled
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Triệu chứng bệnh (ví dụ: đau họng, ho, sốt, ...)
            </label>
            <input
              disabled
              value={selectedAppointment?.symptoms}
              placeholder="Nhập các triệu chứng bạn đang gặp phải"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Chẩn đoán
            </label>
            <input
              {...register("diagnosis")}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ghi chú
            </label>
            <input
              {...register("note")}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateMedicalRecordModal;
