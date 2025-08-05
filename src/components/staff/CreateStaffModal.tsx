import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Appointment, Staff } from "@/types/type";
import { Modal, Form, DatePicker, Select, Input } from "antd";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/store";
import { useGetDoctors } from "@/tanstackquery/doctor";
import { formatDateInput, formatDateTime } from "@/lib/dateTime";
import {
  CreateMedicalRecordParams,
  useCreateMedicalRecord,
} from "@/tanstackquery/medicalRecord";
import Signup from "../signup/Signup";
import { ICreateAccount, useRegister } from "@/tanstackquery/account";
import {
  ICreateStaff,
  useCreateStaff,
  useUpdateStaff,
} from "@/tanstackquery/staff";

type Props = {
  selectedStaff: Staff | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CreateStaffModal = ({
  handleCloseModal,
  isModalOpen,
  selectedStaff,
}: Props) => {
  const createAccount = useRegister();
  const updateStaff = useUpdateStaff();
  const createStaff = useCreateStaff();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<ICreateStaff & ICreateAccount>({
    defaultValues: { role: "STAFF" },
  });
  useEffect(() => {
    if (!selectedStaff) {
      reset();
    } else {
      setValue("fullName", selectedStaff.fullName);
      setValue("dob", formatDateInput(selectedStaff.dob || new Date()) as any);
      setValue("gender", selectedStaff.gender);
      setValue("position", selectedStaff.position);
      setValue("phone", selectedStaff.phone);
      setValue("department", selectedStaff.department);
      setValue("username", selectedStaff.account?.username || "");
      setValue("password", selectedStaff.account?.password || "");
      setValue("accountId", selectedStaff.account?.id as number);
    }
  }, [selectedStaff]);
  const onSubmit = async (data: ICreateStaff & ICreateAccount) => {
    if (selectedStaff) {
      try {
        await updateStaff.mutateAsync(
          {
            id: Number(selectedStaff.id!),
            body: {
              ...data,
            },
          },
          {
            onSuccess(response) {
              toast.success(`Đã cập nhật nhân viên thành công!`);
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi cập nhật nhân viên!");
            },
          }
        );
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi cập nhật nhân viên!");
      }
    } else {
      try {
        const account = await createAccount.mutateAsync({
          ...data,
        });
        await createStaff.mutateAsync(
          {
            ...data,
            accountId: account.id,
          },
          {
            onSuccess(response) {
              toast.success(`Đã tạo nhân viên thành công!`);
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi tạo nhân viên!");
            },
          }
        );
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tạo nhân viên!");
      }
    }
  };
  return (
    <>
      <Modal
        centered
        title={"Thêm nhân viên"}
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
            disabled={createAccount.isPending || createStaff.isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {createAccount.isPending || createStaff.isPending
              ? "Đang xử lý..."
              : `${selectedStaff ? "Cập nhật" : "Tạo"} nhân viên`}
          </button>,
        ]}
        width={800}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Họ tên nhân viên
            </label>
            <input
              {...register("fullName", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ngày sinh
            </label>
            <input type="date" {...register("dob", { required: true })} />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Giới tính
            </label>
            <select
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              {...register("gender", { required: true })}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Vị trí
            </label>
            <select
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              {...register("position", { required: true })}
            >
              <option value="Nhân viên lễ tân">Nhân viên lễ tân</option>
              <option value="Nhân viên kế toán">Nhân viên kế toán</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Số điện thoại
            </label>
            <input
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              {...register("phone", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Phòng ban
            </label>
            <input
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              {...register("department", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tài khoản
            </label>
            <input
              disabled={!!selectedStaff}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              {...register("username", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Mật khẩu
            </label>
            <input
              disabled={!!selectedStaff}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              {...register("password", { required: true })}
            />
          </div>
          <div className="form-group"></div>
        </form>
      </Modal>
    </>
  );
};

export default CreateStaffModal;
