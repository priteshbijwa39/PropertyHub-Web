import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validateEmail, validatePassword } from "../../utils/validation";
import { signupApi } from "../../services/authService";
import { toast } from "../../components/common/Toast";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof SignupForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: SignupErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    const emailError = validateEmail(formData.email);

    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      // API integration will be added here.
      console.log("Signup Data:", formData);

      const payload = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await signupApi(payload);

      navigate("/login");
    } catch (error) {
      console.error("Signup failed:-->", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <section className="signup-container">
        <div className="signup-form-section">
          <div className="signup-form-wrapper">
            <div className="signup-brand">
              <span className="brand-property">Property</span>
              <span className="brand-hub">Hub</span>
            </div>

            <div className="signup-heading">
              <h1>Create Account ✨</h1>
              <p>Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                placeholder="Enter your username"
                required
                error={errors.username}
                onChange={(event) =>
                  handleChange("username", event.target.value)
                }
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                required
                error={errors.email}
                onChange={(event) => handleChange("email", event.target.value)}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                required
                error={errors.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                required
                error={errors.confirmPassword}
                onChange={(event) =>
                  handleChange("confirmPassword", event.target.value)
                }
              />

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="signup-button"
              >
                Sign Up
              </Button>
            </form>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

        <div className="signup-image-section" />
      </section>
    </main>
  );
};

export default Signup;
