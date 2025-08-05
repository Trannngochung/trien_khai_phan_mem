"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

const Provider = ({ children }: any) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </>
  );
};

export default Provider;
