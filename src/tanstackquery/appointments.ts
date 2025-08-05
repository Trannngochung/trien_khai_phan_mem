import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Appointment } from "@/types/type";
import axios from "axios";

// Get all appointments
export const useGetAppointments = (params?: {
  patientId?: number;
  doctorId?: number;
  status?: "NOTCOMFIRM" | "CONFIRMED" | "CANCELED";
}) => {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: async () => {
      const { data } = await axios.get<Appointment[]>("/api/appointments", {
        params: {
          patientId: params?.patientId,
          doctorId: params?.doctorId,
          status: params?.status,
        },
      });
      return data;
    },
    refetchInterval: 10000, // Refetch data every 10 seconds (10000ms)
  });
};

// Create new appointment
export interface AppointmentParams {
  id?: number;
  patientId: number;
  doctorId?: number;
  appointmentDate: Date;
  status: "NOTCOMFIRM" | "CONFIRMED" | "CANCELED";
  symptoms: string;
}
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: AppointmentParams) => {
      const { data } = await axios.post("/api/appointments", appointment);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch appointments query
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

// Update appointment
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      appointment,
    }: {
      id: number;
      appointment: Partial<Appointment>;
    }) => {
      const { data } = await axios.put(
        `/api/appointments?id=${id}`,
        appointment
      );
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch appointments query
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

// Delete appointment
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/appointments?id=${id}`);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch appointments query
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
