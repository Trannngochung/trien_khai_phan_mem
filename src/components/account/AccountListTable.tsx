"use client";
import React, { useState } from "react";
import {
  ICreateAccount,
  useDeleteAccount,
  useGetAllAccounts,
  useUpdateAccount,
} from "@/tanstackquery/account";
import Loading from "../Icons/Loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";

import { z } from "zod"; 


const AccountListTable = () => {
  const { data, isPending } = useGetAllAccounts();
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();
  const [password, setPassword] = useState("");
  const _handleChangePassword = async (id: number, account: ICreateAccount) => {
    await updateAccount.mutateAsync(
      { id, account },
      {
        onSuccess: () => {
          toast.success("Đổi mật khẩu thành công");
        },
        onError: (error) => {
          toast.error("Đổi mật khẩu thất bại");
        },
      }
    );
  };
  const _handleDeleteAccount = async (id: number) => {
    await deleteAccount.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Đã xóa tài khoản thành công!");
      },
      onError: (error) => {
        toast.error("Đã xóa tài khoản thất bại");
      },
    });
  };
  return (
    <div className="px-10 rounded-lg">
      <div className="overflow-x-auto mt-2">
        {isPending && <Loading />}
        {!isPending && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  TÊN NGƯỜI DÙNG
                </th>
                <th scope="col" className="px-6 py-3">
                  MẬT KHẨU
                </th>
                <th scope="col" className="px-6 py-3">
                  EMAIL
                </th>
                <th scope="col" className="px-6 py-3">
                  VAI TRÒ
                </th>
                <th scope="col" className="px-6 py-3">
                  TÙY CHỌN
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((account, idx) => {
                  return (
                    <tr
                      key={idx}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-6 py-4">{account.username}</td>

                      <td className="px-6 py-4">{account.password}</td>
                      <td className="px-6 py-4">{account.email}</td>
                      <td className="px-6 py-4">{account.role}</td>
                      <td className="px-6 py-4 space-x-2">
                        <div className="flex gap-2 flex-col justify-center items-center">
                        <Popover>
                          <PopoverTrigger className="btn">
                            Đổi mật khẩu
                          </PopoverTrigger>
                          <PopoverContent className="space-y-2">
                            <label htmlFor="password">Mật khẩu mới</label>
                            <input
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="btn"
                              onClick={() => {
                                const userSchema = z.object({
                                  password: z
                                    .string()
                                    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
                                    .regex(
                                      /[A-Z]/,
                                      "Mật khẩu phải chứa ít nhất 1 chữ hoa"
                                    )
                                    .regex(
                                      /[!@#$%^&*(),.?":{}|<>]/,
                                      "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
                                    ),
                                });
                                const result = userSchema.safeParse({
                                  password,
                                });

                                if (!result.success) {
                                  const errors = result.error.format();
                                  Object.values(
                                    errors.password?._errors || []
                                  ).forEach((errMsg) => {
                                    toast.error(errMsg);
                                  });
                                  return;
                                }
                                _handleChangePassword(Number(account.id), {
                                  ...account,
                                  password,
                                });
                              }}
                            >
                              {updateAccount.isPending
                                ? "Đang đổi mật khẩu..."
                                : "Đổi mật khẩu"}
                            </button>
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger className="btn">
                            Xóa tài khoản
                          </PopoverTrigger>
                          <PopoverContent className="space-y-2">
                            <label htmlFor="password">
                              Bạn có chắc chắn muốn xóa tài khoản này không?
                            </label>
                            <button
                              className="btn"
                              onClick={() => {
                                _handleDeleteAccount(Number(account.id));
                              }}
                            >
                              {deleteAccount.isPending
                                ? "Đang xóa..."
                                : "Xóa tài khoản"}
                            </button>
                          </PopoverContent>
                        </Popover>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AccountListTable;
