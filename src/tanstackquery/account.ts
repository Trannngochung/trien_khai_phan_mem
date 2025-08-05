import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Account } from "@/types/type";

interface LoginCredentials {
  username: string;
  password: string;
}

export interface ICreateAccount {
  username: string;
  password: string;
  role: "PATIENT" | "DOCTOR" | "STAFF" | "ADMIN";
  email?: string;
}

// Login mutation hook
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const { data } = await axios.post("/api/login", credentials);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw error;
      }
    },
  });
};

// Register mutation hook
export const useRegister = () => {
  return useMutation({
    mutationFn: async (registerData: ICreateAccount) => {
      try {
        const { data } = await axios.post("/api/accounts", registerData);
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
  });
};

// update account
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      account,
    }: {
      id: number;
      account: ICreateAccount;
    }) => {
      const { data } = await axios.put(`/api/accounts/${id}`, account);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

// get all accounts
export const useGetAllAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await axios.get<Account[]>("/api/accounts");
      return data;
    },
  });
};

// delete account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await axios.delete(`/api/accounts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
