import { House, Phone } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-gray-200)] bg-white px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 text-xs text-[var(--color-gray-500)] sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)]"
        >
          <House size={15} strokeWidth={2} />
          <span>
            Property<span className="text-[var(--color-secondary-dark)]">Hub</span>
          </span>
        </Link>

        <p>Find, manage, and discover properties with confidence.</p>

        <a
          href="tel:9617965515"
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:underline"
        >
          <Phone size={14} strokeWidth={2} />
          Questions? Call us
        </a>

        <p>© {new Date().getFullYear()} PropertyHub</p>
      </div>
    </footer>
  );
};

export default Footer;
