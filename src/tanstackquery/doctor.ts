import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ICreateDoctor } from "@/app/api/doctors/route";
import { Doctor } from "@/types/type";

export const useGetDoctors = (params?: {
  fullName?: string;
  specialization?: string;
  department?: string;
  phone?: string;
}) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: async () => {
      const { data } = await axios.get<Doctor[]>("/api/doctors", {
        params: {
          fullName: params?.fullName,
          specialization: params?.specialization,
          department: params?.department,
          phone: params?.phone,
        },
      });
      return data;
    },
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doctor: ICreateDoctor) => {
      const { data } = await axios.post("/api/doctors", doctor);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

// Update doctor
export interface IUpdateDoctor {
  id: number;
  doctor: ICreateDoctor;
}
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, doctor }: IUpdateDoctor) => {
      const { data } = await axios.put(`/api/doctors/${id}`, doctor);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

// useDeleteDoctor
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await axios.delete(`/api/doctors/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};
