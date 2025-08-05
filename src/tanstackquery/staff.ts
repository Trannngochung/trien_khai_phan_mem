import { Patient, Staff } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetStaffs = (params?: {}) => {
  return useQuery({
    queryKey: ["staffs", params],
    queryFn: async () => {
      const { data } = await axios.get<Staff[]>("/api/staff", {
        params: {},
      });
      return data;
    },
    refetchInterval: 10000, // Refetch data every 10 seconds (10000ms)
  });
};

// create staff
// interface ICreateStaff {
//   accountId: number;
//   dob: Date;
//   gender: string;
//   fullName: string;
//   position: string;
//   phone: string;
//   department: string;
// }
export interface ICreateStaff
  extends Pick<
    Staff,
    | "accountId"
    | "dob"
    | "gender"
    | "fullName"
    | "position"
    | "phone"
    | "department"
  > {}
export const useCreateStaff = (params?: {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: ICreateStaff) => {
      const { data } = await axios.post("/api/staff", body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// update staff
export const useUpdateStaff = (params?: {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: ICreateStaff }) => {
      const { data } = await axios.put(`/api/staff/${id}`, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// useDeleteStaff
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await axios.delete(`/api/staff/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};
