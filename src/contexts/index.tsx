import React from "react";
import ToastProvider from "./toast/toast";

interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      <ToastProvider>{children}</ToastProvider>
    </>
  );
}
