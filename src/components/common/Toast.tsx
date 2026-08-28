import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastData {
  message: string;
  type: ToastType;
}

let showToastHandler: ((toast: ToastData) => void) | null = null;

export const toast = {
  success: (message: string) => {
    showToastHandler?.({ message, type: "success" });
  },

  error: (message: string) => {
    showToastHandler?.({ message, type: "error" });
  },

  warning: (message: string) => {
    showToastHandler?.({ message, type: "warning" });
  },

  info: (message: string) => {
    showToastHandler?.({ message, type: "info" });
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

  if (!toastData) return null;

  const handleClose = () => {
    setToastData(null);
  };

  const lineColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-blue-600",
  };

  return (
    <div
      className="
        fixed
        right-6
        top-6
        z-50
        w-[360px]
        max-w-[calc(100vw-32px)]
        overflow-hidden
        rounded-lg
        bg-white
        text-sm
        font-medium
        text-gray-900
        shadow-lg
        ring-1
        ring-black/5
        animate-[toast-slide-in_0.3s_ease]
      "
    >
      {/* Toast Content */}
      <div className="flex min-h-[56px] items-center gap-3 px-4 py-3">
        {/* Message */}
        <p className="min-w-0 flex-1 leading-5 break-words">
          {toastData.message}
        </p>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close notification"
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            text-gray-400
            transition-colors
            hover:bg-gray-100
            hover:text-gray-700
          "
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Bottom Line */}
      <div
        className={`h-1 w-full ${lineColors[toastData.type]}`}
      />
    </div>
  );
};

export default Toast;