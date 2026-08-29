import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router";
interface TopbarProps {
  title: string;
  subtitle?: string;
   showProfile?: boolean;
}

const Topbar = ({ title, subtitle,  showProfile = true, }: TopbarProps) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state?.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between gap-4 border-b border-[var(--color-gray-200)] bg-white/90 px-4 backdrop-blur-md sm:px-6">
      {/* Title & Subtitle */}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold text-[var(--color-black)] sm:text-xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-0.5 hidden truncate text-sm text-[var(--color-gray-500)] sm:block">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Section */}
      {showProfile && isAuthenticated ? (
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          aria-label="Go to profile"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary-dark)] text-xs font-bold text-black transition hover:opacity-90"
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </button>
      </div>
      ) : !isAuthenticated ? (
        <div className="flex shrink-0 items-center gap-3 text-sm">
          <Link to="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-[var(--color-primary)] px-3 py-2 font-semibold text-white hover:opacity-90"
          >
            Sign up
          </Link>
        </div>
      ) : null}
    </header>
  );
};

export default Topbar;
