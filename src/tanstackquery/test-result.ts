import { MedicalRecord } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface CreateTestResultParams {
  testName: string;
  testType: string;
  result: string;
  interpretation: string;
  note: string;
  totalCost: number;
  patientId: number;
  doctorId: number;
  billId: number;
  testDate: Date;
}
// create test result
export const useCreateTestResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testResult: CreateTestResultParams) => {
      const { data } = await axios.post("/api/test-result", testResult);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testResults"] });
      queryClient.invalidateQueries({ queryKey: ["medicalRecords"] });
    },
  });
};
