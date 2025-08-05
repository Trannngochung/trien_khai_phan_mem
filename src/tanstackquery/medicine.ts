// medicine query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateMedicine } from "../app/api/medicine/route";
import axios from "axios";
import { Medicine } from "@/types/type";

export const useGetAllMedicine = () => {
  return useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      // axios
      const { data } = await axios.get<Medicine[]>("/api/medicine");
      return data;
    },
  });
};

export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (medicine: Medicine) => {
      const response = await axios.post("/api/medicine", medicine);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });
};
// use update medicine
export interface IUpdateMedicine extends ICreateMedicine {
  id: number;
}
export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (medicine: Medicine) => {
      const response = await axios.put(
        `/api/medicine/${medicine.id}`,
        medicine
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });
};
// use delete medicine
export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`/api/medicine/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });
};
