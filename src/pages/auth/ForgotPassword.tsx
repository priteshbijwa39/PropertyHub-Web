import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validateEmail } from "../../utils/validation";
import { toast } from "../../components/common/Toast";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] =
    useState<ForgotPasswordForm>({
      email: "",
    });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const emailError = validateEmail(
      formData.email,
    );

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

      toast.success(
        "Password reset link sent to your email.",
      );
    } catch (error) {
      console.error(
        "Forgot Password Error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send reset link",
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
              <span className="brand-property">
                Property
              </span>

              <span className="brand-hub">
                Hub
              </span>
            </div>

            {!success ? (
              <>
                <div className="login-heading">
                  <h1>Forgot Password?</h1>

                  <p>
                    Enter your email and we'll send
                    you a password reset link.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="login-form"
                >
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
                    className="login-button"
                  >
                    Send Reset Link
                  </Button>
                </form>
              </>
            ) : (
              <div className="login-heading">
                <h1>Check Your Email 📧</h1>

                <p>
                  If an account exists with{" "}
                  <strong>{formData.email}</strong>,
                  we've sent a password reset link.
                </p>
              </div>
            )}

            <p className="signup-link">
              Remember your password?{" "}
              <Link to="/login">
                Back to Login
              </Link>
            </p>
          </div>
        </div>

        <div className="login-image-section">
          <div className="login-overlay">
            <h2>Secure Your PropertyHub Account</h2>

            <p>
              Reset your password securely and
              continue managing your properties.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;