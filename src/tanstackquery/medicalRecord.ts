import { MedicalRecord } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface CreateMedicalRecordParams {
  diagnosis: string;
  symptoms: string;
  doctorId: number;
  patientId: number;
  appointmentId: number;
  note: string;
}
export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (medicalRecord: CreateMedicalRecordParams) => {
      const { data } = await axios.post("/api/medical-records", medicalRecord);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalRecords"] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useGetMedicalRecords = (params: { patientId?: number }) => {
  return useQuery({
    queryKey: ["medicalRecords", params.patientId],
    queryFn: async () => {
      const { data } = await axios.get<MedicalRecord[]>(
        "/api/medical-records",
        {
          params,
        }
      );
      return data;
    },
  });
};

export const useGetMedicalRecordById = (id: number) => {
  return useQuery({
    queryKey: ["medicalRecords", id],
    queryFn: async () => {
      const { data } = await axios.get<MedicalRecord>(
        `/api/medical-records/${id}`
      );
      return data;
    },
  });
};
