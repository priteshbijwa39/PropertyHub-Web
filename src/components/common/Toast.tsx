import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastData {
  message: string;
  type: ToastType;
}

let showToastHandler: ((toast: ToastData) => void) | null = null;

export const toast = {
  success: (message: string) => {
    showToastHandler?.({
      message,
      type: "success",
    });
  },

  error: (message: string) => {
    showToastHandler?.({
      message,
      type: "error",
    });
  },

  warning: (message: string) => {
    showToastHandler?.({
      message,
      type: "warning",
    });
  },

  info: (message: string) => {
    showToastHandler?.({
      message,
      type: "info",
    });
  },
};

const Toast = () => {
  const [toastData, setToastData] = useState<ToastData | null>(null);

  useEffect(() => {
    showToastHandler = setToastData;

    return () => {
      showToastHandler = null;
    };
  }, []);

  useEffect(() => {
    if (!toastData) return;

    const timer = setTimeout(() => {
      setToastData(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastData]);

  if (!toastData) {
    return null;
  }

  return (
    <div className={`toast toast-${toastData.type}`}>
      <div className="toast-message">{toastData.message}</div>
      <div className="toast-line" />
    </div>
  );
};

export default Toast;