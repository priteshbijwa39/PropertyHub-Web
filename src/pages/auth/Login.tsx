import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useAuthStore } from "../../store/authStore";
import { loginApi } from "../../services/authService";
import { toast } from "../../components/common/Toast";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const REMEMBERED_EMAIL_KEY = "propertyhub_remembered_email";

const Login = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);

    if (rememberedEmail) {
      setFormData((previous) => ({
        ...previous,
        email: rememberedEmail,
      }));

      setRememberMe(true);
    }
  }, []);

  const handleChange = (field: keyof LoginForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);

    if (!checked) {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });

      return;
    }

    try {
      setLoading(true);

      const response = await loginApi({
        email: formData.email,
        password: formData.password,
      });

      if (rememberMe) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, formData.email);
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      setAuth(response.user, response.token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed Error: " + (error as Error).message);
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
              <h1>Welcome Back! 👋</h1>

              <p>Login to manage your properties</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <Input
                label="Email"
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

              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      handleRememberMeChange(event.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>

                {/* <Link to="/forgot-password" className="forgot-password" >
                  Forgot Password?
                </Link> */}
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="login-button"
              >
                Login
              </Button>
            </form>

            <p className="signup-link">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>

        <div className="login-image-section">
          <div className="login-overlay">
            <h2>Find Your Dream Property</h2>

            <p>
              Discover properties that match your lifestyle and make your next
              move with PropertyHub.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
