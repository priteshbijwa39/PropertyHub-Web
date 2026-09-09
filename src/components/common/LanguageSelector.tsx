import { Languages } from "lucide-react";
import {
  LANGUAGES,
  isLanguageCode,
  useLanguageStore,
} from "../../store/languageStore";

interface LanguageSelectorProps {
  compact?: boolean;
}

const LanguageSelector = ({ compact = false }: LanguageSelectorProps) => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <label
      className={`flex items-center gap-2 rounded-lg border border-[var(--color-gray-200)] bg-white px-2.5 py-1.5 text-sm text-[var(--color-gray-700)] shadow-sm ${
        compact ? "w-fit" : ""
      }`}
    >
      <Languages size={17} aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select
        value={language}
        onChange={(event) => {
          if (isLanguageCode(event.target.value)) {
            setLanguage(event.target.value);
          }
        }}
        aria-label="Select language"
        className="max-w-[120px] cursor-pointer bg-transparent font-medium text-[var(--color-gray-800)]"
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
