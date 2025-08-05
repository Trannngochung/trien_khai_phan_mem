"use client";
import Link from "next/link";
import React from "react";
import { useRegister } from "@/tanstackquery/account";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePatient } from "@/tanstackquery/patients";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
    ),
  confirmPassword: z.string(),
  fullName: z.string(),
  phone: z.string(),
  address: z.string(),
  gender: z.string(),
  dob: z.string(),
  citizenId: z.string(),
  healthInsuranceId: z.string(),
});

type FormData = z.infer<typeof userSchema>;
interface Props {
  isModal?: boolean;
}
const Signup = ({ isModal = false }: Props) => {
  const router = useRouter();
  const registerMutation = useRegister();
  const createPatient = useCreatePatient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });


const [otpSent, setOtpSent] = React.useState(false);
const [otpInput, setOtpInput] = React.useState<string[]>(new Array(6).fill(""));
const [formData, setFormData] = React.useState<FormData | null>(null);
const [showOtpModal, setShowOtpModal] = React.useState(false);  
const [isVerifying, setIsVerifying] = React.useState(false);   


const sendOTP = async () => {
  const email = formData?.email || getValues("email");
  if (!email) {
    toast.error("Vui lòng nhập email trước!");
    return;
  }
  try {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setOtpSent(true);
      toast.success("Mã OTP đã được gửi tới email.");
    } else {
      toast.error("Gửi OTP thất bại: " + (data.error || "Lỗi không xác định"));
    }
  } catch {
    toast.error("Lỗi gửi OTP, vui lòng thử lại.");
  }
};

const handleChangeOtp = (index: number, value: string) => {
  if (!/^\d?$/.test(value)) return; // chỉ cho nhập 0 hoặc 1 chữ số

  const newOtp = [...otpInput];
  newOtp[index] = value;
  setOtpInput(newOtp);

  if (value) {
    // Nếu nhập số, chuyển focus sang ô tiếp theo nếu có
    if (index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  } else {
    // Nếu xóa ô này, chuyển focus về ô trước nếu có
    if (index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  }
};



const verifyOTP = async () => {
  const email = formData?.email || getValues("email");
  const otp = otpInput.join("");
  if (otp.length < 6) {
    toast.error("Vui lòng nhập đủ 6 số OTP!");
    return false;
  }
  try {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    return data.valid;
  } catch {
    return false;
  }
};

const onSubmit = (data: FormData) => {
  if (data.password !== data.confirmPassword) {
    toast.error("Mật khẩu không khớp!");
    return;
  }
  setFormData(data);
  setShowOtpModal(true); // bật modal lên cho người dùng gửi OTP
};

const handleVerifyOtp = async () => {
  if (!formData) return;
  setIsVerifying(true);
  const valid = await verifyOTP();
  setIsVerifying(false);

  if (!valid) {
    toast.error("Mã OTP không hợp lệ hoặc đã hết hạn!");
    return;
  }

  // Gửi request đăng ký tài khoản và tạo patient
  try {
    const registerData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "PATIENT" as const,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      gender: formData.gender,
      dob: new Date(formData.dob).toISOString(),
      citizenId: formData.citizenId,
      healthInsuranceId: formData.healthInsuranceId || null,
    };

    const register = await registerMutation.mutateAsync(registerData);
    await createPatient.mutateAsync({
      ...registerData,
      accountId: register?.id,
    });

    toast.success("Đăng ký thành công!");
    setShowOtpModal(false);
    router.push("/login");
  } catch {
    toast.error("Đăng ký thất bại.");
  }
};



  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      {!isModal && (
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
        </a>
      )}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {!isModal && (
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng kí tài khoản
            </h1>
          )}
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên tài khoản <span className="text-red-500">*</span>
              </label>
              <input
                {...register("username")}
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nhập lại mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>




{showOtpModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[320px] relative">
      <button
        onClick={() => setShowOtpModal(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 font-bold text-xl"
      >
        ×
      </button>

      <h3 className="text-lg font-semibold mb-4 text-center">
        Nhập mã OTP
      </h3>

      <div className="flex justify-between mb-4">
        {otpInput.map((num, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-10 h-10 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={num}
            onChange={(e) => handleChangeOtp(idx, e.target.value)}
            id={`otp-${idx}`}
          />
        ))}
      </div>

      <button
        onClick={handleVerifyOtp}
        disabled={isVerifying}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-3 disabled:opacity-50"
      >
        {isVerifying ? "Đang xác minh..." : "Xác minh OTP"}
      </button>

      <div className="text-center text-gray-500 text-sm">
        {otpSent ? (
          <span
            onClick={sendOTP}
            className="cursor-pointer underline hover:text-gray-700"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendOTP();
            }}
          >
            Gửi lại mã OTP
          </span>
        ) : (
          <span
            onClick={sendOTP}
            className="cursor-pointer underline hover:text-gray-700"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendOTP();
            }}
          >
            Gửi mã OTP
          </span>
        )}
      </div>
    </div>
  </div>
)}





            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                {...register("fullName")}
                type="text"
                id="fullName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="citizenId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số CCCD <span className="text-red-500">*</span>
              </label>
              <input
                {...register("citizenId")}
                type="text"
                id="citizenId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.citizenId && (
                <p className="text-red-500 text-sm">
                  {errors.citizenId.message}
                </p>
              )}
            </div>
            {/* healthInsurance */}
            <div>
              <label
                htmlFor="healthInsuranceId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số thẻ bảo hiểm (không bắt buộc)
              </label>
              <input
                {...register("healthInsuranceId")}
                type="text"
                id="healthInsuranceId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.healthInsuranceId && (
                <p className="text-red-500 text-sm">
                  {errors.healthInsuranceId.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                {...register("address")}
                type="text"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Giới tính <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender")}
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                {...register("dob")}
                type="date"
                id="dob"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Đang tạo..."
                : isModal
                ? "Tạo thông tin bệnh nhân"
                : "Tạo tài khoản"}
            </button>
            {!isModal && (
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;





// "use client";
// import Link from "next/link";
// import React from "react";
// import { useRegister } from "@/tanstackquery/account";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCreatePatient } from "@/tanstackquery/patients";

// const userSchema = z.object({
//   username: z.string(),
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
//     .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
//     .regex(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
//     ),
//   confirmPassword: z.string(),
//   fullName: z.string(),
//   phone: z.string(),
//   address: z.string(),
//   gender: z.string(),
//   dob: z.string(),
//   citizenId: z.string(),
//   healthInsuranceId: z.string(),
// });

// type FormData = z.infer<typeof userSchema>;
// interface Props {
//   isModal?: boolean;
// }
// const Signup = ({ isModal = false }: Props) => {
//   const router = useRouter();
//   const registerMutation = useRegister();
//   const createPatient = useCreatePatient();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(userSchema),
//   });

//   const onSubmit = async (data: FormData) => {
//     if (data.password !== data.confirmPassword) {
//       toast.error("Mật khẩu không khớp!");
//       return;
//     }

//     const registerData = {
//       username: data.username,
//       email: data.email,
//       password: data.password,
//       role: "PATIENT" as const,
//       fullName: data.fullName,
//       phone: data.phone,
//       address: data.address,
//       gender: data.gender,
//       dob: new Date(data.dob).toISOString(),
//       citizenId: data.citizenId,
//       healthInsuranceId: data.healthInsuranceId || null,
//     };
//     try {
//       const register = await registerMutation.mutateAsync(registerData);
//       const patient = await createPatient.mutateAsync({
//         ...registerData,
//         accountId: register?.id,
//       });
//       toast.success("Đăng kí thành công!");
//       if (!isModal) return router.push("/login");
//     } catch (error) {
//       toast.error("Đăng kí thất bại!");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
//       {!isModal && (
//         <a
//           href="#"
//           className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
//         >
//           <img
//             className="w-8 h-8 mr-2"
//             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
//             alt="logo"
//           />
//         </a>
//       )}
//       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//           {!isModal && (
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Đăng kí tài khoản
//             </h1>
//           )}
//           <form
//             className="space-y-4 md:space-y-6"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Tên tài khoản <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("username")}
//                 id="username"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="name@company.com"
//                 required
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Mật khẩu <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("password")}
//                 type="password"
//                 id="password"
//                 placeholder="••••••••"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Nhập lại mật khẩu <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("confirmPassword")}
//                 type="password"
//                 id="confirmPassword"
//                 placeholder="••••••••"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("email")}
//                 type="email"
//                 id="email"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor="fullName"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Họ và tên <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("fullName")}
//                 type="text"
//                 id="fullName"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="citizenId"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Số CCCD <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("citizenId")}
//                 type="text"
//                 id="citizenId"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.citizenId && (
//                 <p className="text-red-500 text-sm">
//                   {errors.citizenId.message}
//                 </p>
//               )}
//             </div>
//             {/* healthInsurance */}
//             <div>
//               <label
//                 htmlFor="healthInsuranceId"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Số thẻ bảo hiểm (không bắt buộc)
//               </label>
//               <input
//                 {...register("healthInsuranceId")}
//                 type="text"
//                 id="healthInsuranceId"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               />
//               {errors.healthInsuranceId && (
//                 <p className="text-red-500 text-sm">
//                   {errors.healthInsuranceId.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Số điện thoại <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("phone")}
//                 type="tel"
//                 id="phone"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm">{errors.phone.message}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="address"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Địa chỉ <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("address")}
//                 type="text"
//                 id="address"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.address && (
//                 <p className="text-red-500 text-sm">{errors.address.message}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="gender"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Giới tính <span className="text-red-500">*</span>
//               </label>
//               <select
//                 {...register("gender")}
//                 id="gender"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               >
//                 <option value="Nam">Nam</option>
//                 <option value="Nữ">Nữ</option>
//                 <option value="Khác">Khác</option>
//               </select>
//               {errors.gender && (
//                 <p className="text-red-500 text-sm">{errors.gender.message}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="dob"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Date of Birth <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("dob")}
//                 type="date"
//                 id="dob"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//               {errors.dob && (
//                 <p className="text-red-500 text-sm">{errors.dob.message}</p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               disabled={registerMutation.isPending}
//             >
//               {registerMutation.isPending
//                 ? "Đang tạo..."
//                 : isModal
//                 ? "Tạo thông tin bệnh nhân"
//                 : "Tạo tài khoản"}
//             </button>
//             {!isModal && (
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   Login here
//                 </Link>
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
