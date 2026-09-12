import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validatePassword } from "../../utils/validation";
import { resetPasswordApi } from "../../services/authService";
import { toast } from "../../components/common/Toast";
import Footer from "../../components/layout/Footer";

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
    <main className="flex min-h-screen flex-col bg-gray-50">
      <section className="mx-auto flex w-full flex-1 max-w-7xl">
        {/* Left - Form Section */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md">
            {/* Brand */}
            <div className="mb-10 text-center lg:text-left">
              <Link
                to="/"
                className="inline-flex items-center text-3xl font-extrabold tracking-tight no-underline"
              >
                <span className="text-gray-900">Property</span>

                <span className="text-blue-600">Hub</span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                🔐
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Reset Password
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Create a new password for your PropertyHub account. Make sure
                it's strong and secure.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Password Security Info */}
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                <span className="mt-0.5 text-sm">🛡️</span>

                <div>
                  <p className="text-xs font-semibold text-blue-800">
                    Keep your password secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Use a strong password that you don't use anywhere else.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full"
              >
                Reset Password
              </Button>
            </form>

            {/* Back to Login */}
            <p className="mt-8 text-center text-sm text-gray-500 lg:text-left">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Image Section */}
        <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
          <img
            src="/assets/images/login-property.jpg"
            alt="Modern property"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/70 to-blue-700/40" />

          {/* Content */}
          <div className="relative flex h-full items-end p-12 xl:p-16">
            <div className="max-w-lg text-white">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <span>🔒</span>
                <span>Secure Account</span>
              </div>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                Protect Your
                <br />
                PropertyHub Account
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
                Create a strong new password and keep your property information
                safe and secure.
              </p>

              {/* Security Points */}
              <div className="mt-8 space-y-3 text-sm text-blue-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    ✓
                  </span>
                  Secure password reset
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    ✓
                  </span>
                  Protect your property data
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    ✓
                  </span>
                  Get back to your account securely
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ResetPassword;
