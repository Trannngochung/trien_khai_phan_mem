import {
  AppointmentParams,
  useCreateAppointment,
  useUpdateAppointment,
} from "@/tanstackquery/appointments";
import { RefObject, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appointment, MedicalRecord } from "@/types/type";
import { Modal, Form, DatePicker, Select, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import useAuthStore from "@/store/store";
import { useGetDoctors } from "@/tanstackquery/doctor";
import {
  CreateTestResultParams,
  useCreateTestResult,
} from "@/tanstackquery/test-result";
import { ICreatePrescription, IMedicine } from "@/app/api/prescriptions/route";
import { formatDateTime } from "@/lib/dateTime";
import { useGetAllMedicine } from "@/tanstackquery/medicine";
import { useCreatePrescription } from "@/tanstackquery/prescription";
import { Unit } from "@prisma/client";
type Props = {
  selectedMedicalRecord: MedicalRecord | undefined;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

interface IMedicineForm {
  medicineId: number;
  name: string;
  unit: Unit;
  price: number;
  quantity: number;
  note: string;
  totalCost: number;
}
const CreatePrescriptionModal = ({
  selectedMedicalRecord,
  handleCloseModal,
  isModalOpen,
}: Props) => {
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { data: dataMedicines } = useGetAllMedicine();
  const createPrescription = useCreatePrescription();
  const [listMedicine, setListMedicine] = useState<IMedicineForm[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<ICreatePrescription>({
    defaultValues: {
      doctorId: profile?.id,
      patientId: selectedMedicalRecord?.patientId,
      billId: selectedMedicalRecord?.bill.id,
      createdAt: new Date(),
      note: "",
      totalCost: 1,
      medicines: [],
    },
  });
  useEffect(() => {
    if (!selectedMedicalRecord) return;
    setValue("patientId", selectedMedicalRecord?.patientId);
    setValue("doctorId", selectedMedicalRecord?.doctorId);
    setValue("billId", selectedMedicalRecord?.bill.id as number);
  }, [selectedMedicalRecord]);
  const onSubmit = async (data: ICreatePrescription) => {
    if (
      listMedicine.length > 0 &&
      listMedicine.some((medicine) => medicine.name === "")
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin thuốc!");
      return;
    }
    const medicines: IMedicine[] = listMedicine.map((medicine) => ({
      id: medicine.medicineId,
      name: medicine.name,
      quantity: medicine.quantity,
      note: medicine.note,
      unit: medicine.unit,
      price: medicine.price,
      createdAt: new Date(),
    }));
    console.log("listMedicine:", listMedicine);
    data.medicines = medicines;
    data.totalCost = listMedicine.reduce(
      (acc, medicine) => acc + medicine.totalCost,
      0
    );
    console.log("data:", data);

    setLoading(true);
    try {
      await createPrescription.mutateAsync(data, {
        onSuccess(response) {
          toast.success("Đã tạo đơn thuốc thành công!");
          handleCloseModal();
        },
        onError() {
          toast.error("Đã xảy ra lỗi khi tạo đơn thuốc!");
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
        width={1300}
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
            Tạo đơn thuốc
          </Button>,
        ]}
      >
        <form className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tên bệnh nhân
            </label>
            <input
              disabled
              type="text"
              value={selectedMedicalRecord?.patient.fullName}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Bác sĩ kê đơn
            </label>
            <input
              disabled
              type="text"
              value={selectedMedicalRecord?.doctor.fullName}
              className="w-full px-4 py-2.5 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ngày kê đơn
            </label>
            <input
              type="datetime-local"
              {...register("createdAt", {
                required: "Vui lòng nhập ngày kê đơn",
              })}
              placeholder="Nhập ngày kê đơn"
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
              Danh sách thuốc
            </label>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                setListMedicine([
                  ...listMedicine,
                  {
                    name: "",
                    unit: "PILL",
                    price: 1,
                    quantity: 1,
                    note: "",
                    totalCost: 1,
                    medicineId: 0,
                  },
                ])
              }
            >
              Thêm thuốc
            </button>
            <div className="space-y-3 mt-5">
              {dataMedicines &&
                listMedicine.length > 0 &&
                listMedicine.map((medicine, index) => (
                  <div
                    className="p-2 border border-gray-300 rounded-lg flex gap-3 items-end"
                    key={index}
                  >
                    <div className="flex flex-col">
                      <label>Tên thuốc</label>
                      <select
                        className="p-1"
                        name="name"
                        value={medicine.name}
                        onChange={(e) => {
                          // if medicine name have in listMedicine, toast warning and set value to ""
                          if (
                            listMedicine.some(
                              (medicine) => medicine.name === e.target.value
                            ) &&
                            e.target.value !== ""
                          ) {
                            toast.warning("Thuốc đã tồn tại!");
                            setListMedicine(
                              listMedicine.map((medicine, i) =>
                                i === index
                                  ? {
                                      ...medicine,
                                      name: "",
                                      medicineId: 0,
                                    }
                                  : medicine
                              )
                            );
                            return;
                          }
                          const medicineID = dataMedicines?.find(
                            (medicine) => medicine.name === e.target.value
                          )?.id;
                          const unit = dataMedicines?.find(
                            (medicine) => medicine.name === e.target.value
                          )?.unit;
                          const price = dataMedicines?.find(
                            (medicine) => medicine.name === e.target.value
                          )?.price;
                          const totalCost = price! * medicine.quantity;
                          setListMedicine(
                            listMedicine.map((medicine, i) =>
                              i === index
                                ? {
                                    ...medicine,
                                    name: e.target.value,
                                    medicineId: medicineID as number,
                                    unit: unit as Unit,
                                    price: price as number,
                                    totalCost: totalCost,
                                  }
                                : medicine
                            )
                          );
                        }}
                      >
                        <option value={""}>Chọn thuốc</option>
                        {dataMedicines?.map((medicine) => (
                          <option key={medicine.id} value={medicine.name}>
                            {medicine.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label>Dơn vị</label>
                      <input disabled type="text" value={medicine.unit} />
                    </div>
                    <div className="flex flex-col">
                      <label>Số lượng</label>
                      <input
                        type="number"
                        value={medicine.quantity}
                        onChange={(e) => {
                          // set total cost = price * quantity
                          setListMedicine(
                            listMedicine.map((medicine, i) =>
                              i === index
                                ? {
                                    ...medicine,
                                    quantity: Number(e.target.value),
                                    totalCost:
                                      Number(e.target.value) * medicine.price,
                                  }
                                : medicine
                            )
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Đơn giá</label>
                      <input disabled type="text" value={medicine.price} />
                    </div>
                    <div className="flex flex-col">
                      <label>Tổng tiền</label>
                      <input disabled type="text" value={medicine.totalCost} />
                    </div>
                    <div className="flex flex-col">
                      <label>Ghi chú</label>
                      <input
                        type="text"
                        value={medicine.note}
                        onChange={(e) => {
                          setListMedicine(
                            listMedicine.map((medicine, i) =>
                              i === index
                                ? { ...medicine, note: e.target.value }
                                : medicine
                            )
                          );
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg h-fit"
                      onClick={() =>
                        setListMedicine(
                          listMedicine.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Xóa
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreatePrescriptionModal;
