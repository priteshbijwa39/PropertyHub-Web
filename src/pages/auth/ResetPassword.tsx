import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validatePassword } from "../../utils/validation";
import { resetPasswordApi } from "../../services/authService";
import { toast } from "../../components/common/Toast";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordError = validatePassword(formData.password);

    let confirmPasswordError = "";

    if (formData.password !== formData.confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
      });

      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token.");

      return;
    }

    try {
      setLoading(true);

      await resetPasswordApi({
        token,
        password: formData.password,
      });

      toast.success("Password reset successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Reset Password Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to reset password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-brand">
              <span className="brand-property">Property</span>

              <span className="brand-hub">Hub</span>
            </div>

            <div className="login-heading">
              <h1>Reset Password 🔐</h1>

              <p>Create a new password for your PropertyHub account.</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <Input
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter new password"
                required
                error={errors.password}
                onChange={(event) => {
                  setFormData((previous) => ({
                    ...previous,
                    password: event.target.value,
                  }));

                  setErrors((previous) => ({
                    ...previous,
                    password: "",
                  }));
                }}
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm new password"
                required
                error={errors.confirmPassword}
                onChange={(event) => {
                  setFormData((previous) => ({
                    ...previous,
                    confirmPassword: event.target.value,
                  }));

                  setErrors((previous) => ({
                    ...previous,
                    confirmPassword: "",
                  }));
                }}
              />

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="login-button"
              >
                Reset Password
              </Button>
            </form>

            <p className="signup-link">
              Remember your password? <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>

        <div className="login-image-section">
          <div className="login-overlay">
            <h2>Welcome Back to PropertyHub</h2>

            <p>
              Create a secure new password and continue managing your
              properties.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
