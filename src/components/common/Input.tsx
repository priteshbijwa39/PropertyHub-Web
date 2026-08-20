import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
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
  onChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${isPassword ? "password-input" : ""} ${
            error ? "input-error" : ""
          }`}
          onChange={onChange}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;