import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20 hover:from-blue-800 hover:via-blue-700 hover:to-blue-600",

    secondary:
      "bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 text-white shadow-md shadow-gray-500/20 hover:from-gray-700 hover:via-gray-600 hover:to-gray-500",

    outline:
      "border border-blue-600 bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100 text-blue-700 hover:from-blue-300 hover:via-blue-200 hover:to-blue-100",

    danger:
      "bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-md shadow-red-500/20 hover:from-red-800 hover:via-red-700 hover:to-red-600",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        w-auto
        min-h-10
        items-center
        justify-center
        whitespace-nowrap
        rounded-md
        px-4
        py-2
        text-sm
        font-semibold
        leading-5
        transition-all
        duration-200
        active:scale-[0.98]
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;