import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useAuthStore } from "../../store/authStore";
import { loginApi } from "../../services/authService";
import { toast } from "../../components/common/Toast";
import { Lock, Mail } from "lucide-react";
import LanguageSelector from "../../components/common/LanguageSelector";
import { translate, useLanguageStore } from "../../store/languageStore";

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
  const language = useLanguageStore((state) => state.language);

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

      toast.success(translate(language, "loginSuccessful"));

      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-(--color-background)">
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left - Login Form */}
        <div className="flex min-h-screen items-center justify-center bg-(--color-white) px-6 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-[440px]">
            {/* Brand */}
            <div className="mb-10 flex items-start justify-between gap-4 text-2xl font-bold sm:mb-12">
              <div>
                <span className="text-(--color-primary)">Property</span>
                <span className="text-(--color-secondary-dark)">Hub</span>
              </div>
              <LanguageSelector compact />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-(--color-black) sm:text-4xl">
                {translate(language, "welcome")}
              </h1>

              <p className="text-base text-(--color-gray-500)">
                {translate(language, "loginToManage")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                label={translate(language, "email")}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                required
                error={errors.email}
                icon={<Mail size={18} />}
                onChange={(event) => handleChange("email", event.target.value)}
              />

              <Input
                label={translate(language, "password")}
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                required
                error={errors.password}
                icon={<Lock size={18} />}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
              />

              {/* Login Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-(--color-gray-700)">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      handleRememberMeChange(event.target.checked)
                    }
                    className="h-4 w-4 accent-(--color-primary)"
                  />

                  <span>{translate(language, "rememberMe")}</span>
                </label>

                {/* Forgot Password */}

                {/* <Link
              to="/forgot-password"
              // to="/reset-password"
              className="text-sm text-(--color-primary) hover:underline"
            >
              Forgot Password?
            </Link> */}
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full"
              >
                {translate(language, "login")}
              </Button>
            </form>

            {/* Signup Link */}
            <p className="mt-8 text-center text-sm text-(--color-gray-500)">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-(--color-primary) hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Image */}

        <div
          className="relative hidden min-h-screen overflow-hidden bg-cover bg-center md:block"
          style={{
            backgroundImage: "url('/assets/images/login-property.jpg')",
          }}
        >
          {/* Blue Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/55 to-blue-600/25" />

          {/* Bottom Blue Shadow */}
          <div className="absolute inset-x-0 bottom-0 flex min-h-[45%] flex-col justify-end bg-gradient-to-t from-blue-950/95 via-blue-900/55 to-transparent p-8 text-white lg:p-16">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Find Your Dream Property
            </h2>

            <p className="max-w-[520px] text-lg leading-7 text-blue-50/90">
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
