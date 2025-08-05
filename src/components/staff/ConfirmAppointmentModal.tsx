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

type Props = {
  selectedAppointment: Appointment | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const ConfirmAppointmentModal = ({
  selectedAppointment,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const updateAppointment = useUpdateAppointment();
  const { data: doctors } = useGetDoctors();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<AppointmentParams>({
    defaultValues: {
      status: "NOTCOMFIRM",
      appointmentDate: new Date(),
      symptoms: "",
      doctorId: undefined,
      patientId: profile?.id,
    },
  });

  // Set form values when selectedAppointment changes
  useEffect(() => {
    if (selectedAppointment) {
      setValue("status", selectedAppointment.status);
      setValue(
        "appointmentDate",
        new Date(selectedAppointment.appointmentDate)
      );
      setValue("symptoms", selectedAppointment.symptoms);
      setValue("doctorId", selectedAppointment.doctorId);
      setValue("patientId", selectedAppointment.patientId);
      setValue("id", selectedAppointment.id);
    }
  }, [selectedAppointment, setValue]);

  const onSubmit = async (
    data: AppointmentParams,
    type: "confirm" | "cancel"
  ) => {
    if ((!data.doctorId || String(data.doctorId) == "") && type == "confirm")
      return toast.error("Vui lòng chọn bác sĩ khám!");
    setLoading(true);
    try {
      await updateAppointment.mutateAsync(
        {
          id: Number(selectedAppointment?.id),
          appointment: {
            ...data,
            status: type == "confirm" ? "CONFIRMED" : "CANCELED",
          },
        },
        {
          onSuccess(response) {
            toast.success(
              `Đã ${
                type == "confirm" ? "xác nhận" : "hủy"
              } lịch hẹn thành công!`
            );
            handleCloseModal();
          },
          onError() {
            toast.error("Đã xảy ra lỗi khi cập nhật lịch hẹn!");
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        centered
        title={selectedAppointment ? "Xác nhận lịch khám" : "Đặt lịch khám"}
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
            onClick={handleSubmit((data) => onSubmit(data, "cancel"))}
            disabled={loading}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "Hủy lịch khám"}
          </button>,
          <button
            key="submit"
            onClick={handleSubmit((data) => onSubmit(data, "confirm"))}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "Xác nhận lịch khám"}
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
              Mô tả triệu chứng bệnh (ví dụ: đau họng, ho, sốt, ...)
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
              Bác sĩ
            </label>
            {doctors && (
              <select
                {...register("doctorId")}
                defaultValue={selectedAppointment?.doctorId}
                className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value={""}>Chưa chọn</option>
                {doctors?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullName} - {doctor.specialization} -{" "}
                    {doctor.department}
                  </option>
                ))}
              </select>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ConfirmAppointmentModal;
