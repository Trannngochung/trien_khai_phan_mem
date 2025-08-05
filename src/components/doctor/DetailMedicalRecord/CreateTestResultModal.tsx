import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appointment, MedicalRecord } from "@/types/type";
import { Modal, Form, DatePicker, Select, Button } from "antd";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/store";
import { useGetDoctors } from "@/tanstackquery/doctor";
import {
  CreateTestResultParams,
  useCreateTestResult,
} from "@/tanstackquery/test-result";

type Props = {
  selectedMedicalRecord: MedicalRecord | undefined;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CreateTestResultModal = ({
  selectedMedicalRecord,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const addTestResult = useCreateTestResult();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<CreateTestResultParams>({
    defaultValues: {
      testName: "",
      testType: "",
      result: "",
      interpretation: "",
      note: "",
      totalCost: 0,
      testDate: new Date(),
    },
  });
  useEffect(() => {
    if (!selectedMedicalRecord) return;
    setValue("patientId", selectedMedicalRecord?.patientId);
    setValue("doctorId", selectedMedicalRecord?.doctorId);
    setValue("billId", selectedMedicalRecord?.bill.id as number);
  }, [selectedMedicalRecord]);
  const onSubmit = async (data: CreateTestResultParams) => {
    setLoading(true);
    try {
      await addTestResult.mutateAsync(data, {
        onSuccess(response) {
          toast.success("Đã tạo phiếu xét nghiệm thành công!");
          handleCloseModal();
        },
        onError() {
          toast.error("Đã xảy ra lỗi khi tạo phiếu xét nghiệm!");
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        centered
        title={"Thêm kết quả xét nghiệm"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit(onSubmit)}
        confirmLoading={loading}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Tạo phiếu xét nghiệm
          </Button>,
        ]}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tên xét nghiệm
            </label>
            <input
              type="text"
              {...register("testName", {
                required: "Vui lòng nhập tên xét nghiệm",
              })}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Loại xét nghiệm
            </label>
            <input
              {...register("testType", {
                required: "Vui lòng nhập loại xét nghiệm",
              })}
              placeholder="Nhập loại xét nghiệm"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ngày xét nghiệm
            </label>
            <input
              type="datetime-local"
              {...register("testDate", {
                required: "Vui lòng nhập ngày xét nghiệm",
              })}
              placeholder="Nhập ngày xét nghiệm"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Kết quả
            </label>
            <input
              {...register("result", {
                required: "Vui lòng nhập kết quả",
              })}
              placeholder="Nhập kết quả"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Nhận xét
            </label>
            <input
              {...register("interpretation", {
                // required: "Vui lòng nhập nhận xét",
              })}
              placeholder="Nhập nhận xét"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ghi chú
            </label>
            <input
              {...register("note", {
                // required: "Vui lòng nhập ghi chú",
              })}
              placeholder="Nhập ghi chú"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Chi phí
            </label>
            <input
              {...register("totalCost", {
                required: "Vui lòng nhập chi phí",
              })}
              placeholder="Nhập chi phí"
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateTestResultModal;
