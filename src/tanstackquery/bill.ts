// useGetBills
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BillStatus } from "@prisma/client";
import { Bill } from "@/types/type";

export const useGetBills = ({
  status,
  patientId,
}: {
  status?: BillStatus | null;
  patientId?: number | null;
}) => {
  return useQuery({
    queryKey: ["bills", status],
    queryFn: async () => {
      const { data } = await axios.get<Bill[]>("/api/bills", {
        params: { status, patientId },
      });
      return data;
    },
  });
};

export const useUpdateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Bill }) =>
      await axios.put(`/api/bills/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
