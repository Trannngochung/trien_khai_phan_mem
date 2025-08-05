// prescription query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreatePrescription } from "../app/api/prescriptions/route";
import axios from "axios";

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (prescription: ICreatePrescription) => {
      const { data } = await axios.post("/api/prescriptions", prescription);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicalRecords"] });
    },
  });
};
