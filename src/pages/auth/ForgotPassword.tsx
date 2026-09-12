import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validateEmail } from "../../utils/validation";
import { toast } from "../../components/common/Toast";
import Footer from "../../components/layout/Footer";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(formData.email);

    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      //   await forgotPasswordApi({
      //     email: formData.email,
      //   });

      setSuccess(true);

      toast.success("Password reset link sent to your email.");
    } catch (error) {
      console.error("Forgot Password Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to send reset link",
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

            {!success ? (
              <>
                {/* Heading */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Forgot Password?
                  </h1>

                  <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                    Don't worry, it happens. Enter your email address and we'll
                    send you a secure password reset link.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    required
                    error={error}
                    onChange={(event) => {
                      setFormData({
                        email: event.target.value,
                      });

                      setError("");
                    }}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="w-full"
                  >
                    Send Reset Link
                  </Button>
                </form>

                {/* Security Message */}
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                  <span className="mt-0.5 text-sm">🔒</span>

                  <p className="text-xs leading-5 text-blue-700">
                    Your account security is important to us. We'll never ask
                    for your password through email.
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
                  📧
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                  Check Your Email
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  If an account exists with{" "}
                  <strong className="font-semibold text-gray-900">
                    {formData.email}
                  </strong>
                  , we've sent a password reset link.
                </p>

                <p className="mt-4 text-xs text-gray-400">
                  Please check your inbox and spam folder.
                </p>
              </div>
            )}

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
              <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                🏠 PropertyHub
              </div>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                Secure Your
                <br />
                PropertyHub Account
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
                Reset your password securely and get back to managing your
                properties with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ForgotPassword;
