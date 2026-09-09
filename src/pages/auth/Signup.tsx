import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { validateEmail, validatePassword } from "../../utils/validation";
import { signupApi } from "../../services/authService";
import { toast } from "../../components/common/Toast";
import { Lock, Mail, Phone, User } from "lucide-react";
import LanguageSelector from "../../components/common/LanguageSelector";

interface SignupForm {
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}

interface SignupErrors {
  username?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    email: "",
    mobileNumber: "",
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
    // Mobile number validation
    const mobileNumber = formData.mobileNumber.trim();

    if (!mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
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
        mobileNumber: formData.mobileNumber.trim(),
        password: formData.password,
      };

      await signupApi(payload);

      navigate("/login");
    } catch (error) {
      console.error("Signup failed:-->", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create account",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-(--color-background)">
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left - Signup Form */}
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
                Create Account
              </h1>

              <p className="text-base text-(--color-gray-500)">
                Sign up to get started
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                placeholder="Enter your username"
                required
                error={errors.username}
                icon={<User size={18} />}
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
                icon={<Mail size={18} />}
                onChange={(event) => handleChange("email", event.target.value)}
              />

              {/* Mobile Number */}
              <Input
                label="Mobile Number"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                placeholder="Enter 10-digit mobile number"
                required
                error={errors.mobileNumber}
                maxLength={10}
                icon={<Phone size={18} />}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");

                  handleChange("mobileNumber", value);
                }}
              />

              <Input
                label="Password"
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

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                required
                error={errors.confirmPassword}
                icon={<Lock size={18} />}
                onChange={(event) =>
                  handleChange("confirmPassword", event.target.value)
                }
              />

              {/* Signup Button */}
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full"
              >
                Sign Up
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-(--color-gray-500)">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-(--color-primary)! hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Image */}

        <div
          className="relative hidden min-h-screen overflow-hidden bg-cover bg-center md:block"
          style={{
            backgroundImage: "url('/assets/images/signup-house.jpg')",
          }}
        >
          {/* Blue Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/75 via-blue-900/40 to-blue-600/15" />

          {/* Bottom Blue Shadow */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-950/80 via-blue-900/30 to-transparent" />

          {/* Optional Signup Content */}
          <div className="relative flex min-h-screen items-end p-8 lg:p-16">
            <div className="max-w-lg text-white">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <span>🏠</span>
                <span>PropertyHub</span>
              </div>

              <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
                Start Your Property
                <br />
                Journey Today
              </h2>

              <p className="mt-4 max-w-md text-base leading-7 text-blue-50/90">
                Create your PropertyHub account and discover, manage, and
                connect with properties effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
