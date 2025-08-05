import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Appointment, Doctor, Medicine } from "@/types/type";
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
import { useCreateMedicine, useUpdateMedicine } from "@/tanstackquery/medicine";
import { ICreateMedicine } from "@/app/api/medicine/route";
import { Unit } from "@prisma/client";

type Props = {
  selectedMedicine: Medicine | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CreateMedidineModal = ({
  selectedMedicine,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const createMedicine = useCreateMedicine();
  const updateMedicine = useUpdateMedicine();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<Medicine>({
    defaultValues: {},
  });

  const onSubmit = async (data: Medicine) => {
    console.log("data:", data);
    if (selectedMedicine) {
      try {
        await updateMedicine.mutateAsync(
          {
            ...data,
          },
          {
            onSuccess(response) {
              toast.success(`Đã cập nhật thuốc thành công!`);
              handleCloseModal();
            },
            onError() {
              toast.error("Đã xảy ra lỗi khi cập nhật thuốc!");
            },
          }
        );
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi cập nhật thuốc!");
      }
    } else {
      try {
        await createMedicine.mutateAsync({
          ...data,
        });
        toast.success(`Đã tạo thuốc thành công!`);
        handleCloseModal();
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tạo thuốc!");
      }
    }
  };
  useEffect(() => {
    if (!selectedMedicine) {
      reset();
    }
    if (selectedMedicine) {
      setValue("id", selectedMedicine.id);
      setValue("name", selectedMedicine.name);
      setValue("unit", selectedMedicine.unit as any);
      setValue("price", selectedMedicine.price);
      setValue("stock", selectedMedicine.stock);
      setValue("note", selectedMedicine.note as string);
      setValue("importedPharmacy", selectedMedicine.importedPharmacy);
    }
  }, [selectedMedicine]);

  return (
    <>
      <Modal
        centered
        title={selectedMedicine ? "Cập nhật thuốc" : "Tạo thuốc"}
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
              : `${selectedMedicine ? "Cập nhật" : "Tạo"} thuốc`}
          </button>,
        ]}
        width={800}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tên thuốc
            </label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Đơn vị
            </label>
            <select {...register("unit", { required: true })}>
              <option value="PILL">Viên</option>
              <option value="BOTTLE">Chai</option>
              <option value="CAPSULE">Viên nén</option>
              <option value="INJECTION">Tiêm</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Giá mỗi đơn vị
            </label>
            <input
              {...register("price", { required: true })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Số lượng
            </label>
            <input
              {...register("stock", { required: true })}
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
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Nguồn thuốc
            </label>
            <input
              {...register("importedPharmacy")}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateMedidineModal;
