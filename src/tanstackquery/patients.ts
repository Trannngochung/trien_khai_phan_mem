import { Patient } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ICreateAccount } from "./account";

export const useGetPatients = (params?: {}) => {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: async () => {
      const { data } = await axios.get<Patient[]>("/api/patients", {
        params: {},
      });
      return data;
    },
    refetchInterval: 10000, // Refetch data every 10 seconds (10000ms)
  });
};

export interface ICreatePatient {
  fullName: string;
  dob?: string;
  gender?: string;
  phone: string;
  address?: string;
  specialization?: string;
  department?: string;
  position?: string;
  accountId: string;
}
// Register mutation hook
export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (registerData: ICreatePatient) => {
      try {
        const { data } = await axios.post("/api/patients", registerData);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Registration failed"
          );
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
