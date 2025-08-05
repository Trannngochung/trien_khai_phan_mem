import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Appointment, Doctor } from "@/types/type";
import { Modal, Form, DatePicker, Select } from "antd";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/store";
import {
  useCreateDoctor,
  useGetDoctors,
  useUpdateDoctor,
} from "@/tanstackquery/doctor";
import { formatDateTime } from "@/lib/dateTime";
import {
  CreateMedicalRecordParams,
  useCreateMedicalRecord,
} from "@/tanstackquery/medicalRecord";
import { ICreateDoctor } from "@/app/api/doctors/route";
import { ICreateAccount, useRegister } from "@/tanstackquery/account";
import { Department } from "@prisma/client";

type Props = {
  selectedDoctor: Doctor | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};
const convertToBase64 = (file: any) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const CreateDoctorModal = ({
  selectedDoctor,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const createAccount = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<ICreateDoctor & ICreateAccount>({
    defaultValues: {},
  });

  const onSubmit = async (data: ICreateDoctor & ICreateAccount) => {
    if (typeof data.avatar === "object") {
      const file = data.avatar?.[0];
      if (file) {
        data.avatar = await convertToBase64(file);
      }
    }
    if (selectedDoctor) {
      try {
        await updateDoctor.mutateAsync(
          {
            id: Number(selectedDoctor.id!),
            doctor: {
              ...data,
            },
          },
          {
            onSuccess(response) {
              toast.success(`Đã cập nhật bác sĩ thành công!`);
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi cập nhật bác sĩ!");
            },
          }
        );
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tạo bác sĩ!");
      }
    } else {
      try {
        const account = await createAccount.mutateAsync({
          ...data,
          role: "DOCTOR",
        });
        await createDoctor.mutateAsync(
          {
            ...data,
            accountId: account.id,
          },
          {
            onSuccess(response) {
              toast.success(`Đã tạo bác sĩ thành công!`);
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi tạo bác sĩ!");
            },
          }
        );
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tạo bác sĩ!");
      }
    }
  };
  useEffect(() => {
    if (!selectedDoctor) {
      reset();
    }
    if (selectedDoctor) {
      setValue("userId", selectedDoctor.userId);
      setValue("fullName", selectedDoctor.fullName as string);
      setValue("specialization", selectedDoctor.specialization as string);
      setValue("phone", selectedDoctor.phone as string);
      setValue("department", selectedDoctor.department as Department);
      setValue("avatar", selectedDoctor.avatar as string);
      setValue("username", selectedDoctor.account?.username as string);
      setValue("password", selectedDoctor.account?.password as string);
    }
  }, [selectedDoctor]);

  return (
    <>
      <Modal
        centered
        title={selectedDoctor ? "Cập nhật bác sĩ" : "Tạo bác sĩ"}
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
            {loading
              ? "Đang xử lý..."
              : `${selectedDoctor ? "Cập nhật" : "Tạo"} bác sĩ`}
          </button>,
        ]}
        width={800}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Họ tên bác sĩ
            </label>
            <input
              {...register("fullName", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Mã bác sĩ
            </label>
            <input
              {...register("userId")}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Phòng ban
            </label>
            <select
              {...register("department", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="KHOA_NOI_TONG_QUAT">Khoa nội tổng quát</option>
              <option value="KHOA_NGOAI">Khoa ngoại</option>
              <option value="KHOA_NHI">Khoa nhi</option>
              <option value="KHOA_HOI_SUC_CAP_CUU">Khoa hồi sức cứu</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Số điện thoại
            </label>
            <input
              {...register("phone", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tài khoản
            </label>
            <input
              disabled={!!selectedDoctor}
              {...register("username", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Mật khẩu
            </label>
            <input
              disabled={!!selectedDoctor}
              {...register("password", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ảnh đại diện
            </label>
            <input
              type="file"
              {...register("avatar", { required: !selectedDoctor })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateDoctorModal;
