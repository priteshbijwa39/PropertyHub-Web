import { useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  icon,
  onChange,
  className = "",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium leading-5 text-gray-900"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-600">*</span>
          )}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative w-full">
        {/* Left Icon */}
        {icon && (
          <span
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              z-10
              flex
              -translate-y-1/2
              items-center
              justify-center
              text-gray-400
            "
          >
            {icon}
          </span>
        )}

        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={`
            min-h-10
            w-full
            rounded-lg
            border
            bg-white
            py-2.5
            text-sm
            font-normal
            leading-5
            text-gray-900
            outline-none
            transition-all
            duration-200
            placeholder:text-gray-400
            hover:border-gray-400
            focus:border-blue-600
            focus:ring-3
            focus:ring-blue-100
            disabled:cursor-not-allowed
            disabled:border-gray-200
            disabled:bg-gray-100
            disabled:text-gray-400

            ${icon ? "pl-10" : "px-4"}

            ${isPassword ? "pr-12" : "pr-4"}

            ${
              error
                ? "border-red-600 focus:border-red-600 focus:ring-red-100"
                : "border-gray-300"
            }

            ${className}
          `}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            className="
              absolute
              right-3
              top-1/2
              flex
              h-7
              w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-md
              bg-transparent
              p-0
              text-gray-500
              transition-colors
              duration-200
              hover:bg-gray-100
              hover:text-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {showPassword ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <span className="text-xs font-normal leading-4 text-red-600">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;