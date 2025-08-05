import { create } from "zustand";
import { clearCookie, getProfile, getRole, getUsername } from "@/lib/cookie";
import { Patient } from "@/types/type";

export interface AuthState {
  role: string | null;
  profile: Patient | null;
  userName: string | null;
  clearCookieStore: () => void;
  setCookieStore: ({ role, profile, userName }: AuthParams) => void;
}
interface AuthParams {
  role: string;
  profile: object;
  userName: string;
}
const useAuthStore = create<AuthState>((set) => ({
  role: getRole(), // Lấy giá trị từ cookie khi khởi tạo
  profile: getProfile(),
  userName: getUsername(),
  clearCookieStore: () => {
    clearCookie();
    set({ role: null, profile: null, userName: null });
  },
  setCookieStore: ({ role, profile, userName }) => {
    set({ role, profile, userName });
  },
}));

export default useAuthStore;
