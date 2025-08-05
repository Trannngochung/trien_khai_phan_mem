import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import { Appointment } from "@/types/type";
import { Modal, Form, DatePicker, Select } from "antd";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/store";
import { useGetDoctors } from "@/tanstackquery/doctor";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  selectedAppointment: Appointment | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CreateAppointmentModal = ({
  selectedAppointment,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const updateAppointment = useUpdateAppointment();
  const addAppointment = useCreateAppointment();
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);
  const [isDoctor, setIsDoctor] = useState(false);
  const { data: doctors } = useGetDoctors({
    department: isDoctor ? selectedDepartment : undefined,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<AppointmentParams>({
    defaultValues: {
      status: "NOTCOMFIRM",
      appointmentDate: new Date(),
      symptoms: "",
      doctorId: undefined,
      patientId: profile?.id,
    },
  });

  const onSubmit = async (data: AppointmentParams) => {
    if (isDoctor && !data.doctorId) return toast.error("Vui lòng chọn bác sĩ");
    setLoading(true);
    try {
      if (selectedAppointment) {
        await updateAppointment.mutateAsync(
          {
            id: Number(selectedAppointment?.id),
            appointment: {
              ...data,
              patientId: selectedAppointment?.patientId,
              doctorId: isDoctor ? data.doctorId : undefined,
            },
          },
          {
            onSuccess(response) {
              toast.success("Đã sửa lịch hẹn thành công!");
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi cập nhật lịch hẹn!");
            },
          }
        );
      } else {
        await addAppointment.mutateAsync(
          {
            ...data,
          },
          {
            onSuccess(response) {
              toast.success("Tạo lịch hẹn thành công!");
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi tạo lịch hẹn!");
            },
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        centered
        title={selectedAppointment ? "Sửa lịch khám" : "Đặt lịch khám"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit(onSubmit)}
        confirmLoading={loading}
        width={800}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Chọn ngày giờ khám
            </label>
            <input
              type="datetime-local"
              {...register("appointmentDate", {
                required: "Vui lòng chọn ngày hẹn",
              })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              {...register("status", { required: "Vui lòng chọn trạng thái" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="NOTCOMFIRM">Chưa xác nhận</option>
              <option value="CONFIRMED">Đã xác nhận</option>
              <option value="CANCELED">Đã hủy</option>
            </select>
          </div> */}

          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Mô tả triệu chứng bệnh (ví dụ: đau họng, ho, sốt, ...)
            </label>
            <input
              {...register("symptoms", {
                required: "Vui lòng nhập triệu chứng",
              })}
              placeholder="Nhập các triệu chứng bạn đang gặp phải"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="flex items-center space-x-2 gap-1">
            <input
              type="checkbox"
              onChange={() => setIsDoctor(!isDoctor)}
              checked={isDoctor}
            />
            <label className="block text-sm font-medium m-0 text-gray-700">
              Chọn bác sĩ khám (nếu bỏ trống nhân viên sẽ chọn)
            </label>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Khoa
            </label>
            <select
              disabled={!isDoctor}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value={undefined}>Chọn khoa</option>
              <option value="KHOA_NOI_TONG_QUAT">Khoa nội tổng quát</option>
              <option value="KHOA_NGOAI">Khoa ngoại</option>
              <option value="KHOA_NHI">Khoa nhi</option>
              {/* Add doctor options here */}
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Bác sĩ
            </label>
            <select
              disabled={!isDoctor}
              {...register("doctorId")}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value={""}>Chọn bác sĩ muốn khám</option>
              {doctors?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName} - {doctor.department}
                </option>
              ))}
              {/* Add doctor options here */}
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateAppointmentModal;
