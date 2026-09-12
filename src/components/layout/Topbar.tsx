import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router";
import { House, Menu } from "lucide-react";
import LanguageSelector from "../common/LanguageSelector";
import { translate, useLanguageStore, type TranslationKey } from "../../store/languageStore";

interface TopbarProps {
 title: string;
 subtitle?: string;
 showProfile?: boolean;
 onOpenSidebar?: () => void;
}

const Topbar = ({
 title,
 subtitle,
 showProfile = true,
 onOpenSidebar,
}: TopbarProps) => {
 const navigate = useNavigate();
 const user = useAuthStore((state) => state?.user);
 const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
 const language = useLanguageStore((state) => state.language);
 const titleKeys: Record<string, TranslationKey> = {
   Dashboard: "dashboard",
   "All Properties": "allProperties",
   "My Properties": "myProperties",
   "Add Property": "addProperty",
   Favorites: "favorites",
   Profile: "profile",
   "Property Details": "properties",
 };

 return (
   <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between gap-3 border-b border-[var(--color-gray-200)] bg-white/90 px-4 backdrop-blur-md sm:px-6">
     <div className="flex min-w-0 items-center gap-3">
       {onOpenSidebar && (
         <button
           type="button"
           onClick={onOpenSidebar}
           aria-label="Toggle sidebar"
           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--color-gray-200)] bg-white text-[var(--color-primary)] shadow-sm transition hover:bg-[var(--color-primary)] hover:text-white"
         >
           <Menu size={18} strokeWidth={2} />
         </button>
       )}

       <Link
         to="/dashboard"
         aria-label="Go to PropertyHub dashboard"
         className="flex shrink-0 items-center gap-1.5 text-lg font-semibold text-[var(--color-primary)] sm:text-xl"
       >
         <House size={23} strokeWidth={2} />
         <span>
           Property<span className="text-[var(--color-secondary-dark)]">Hub</span>
         </span>
       </Link>

       {title && (
         <>
           <span className="hidden h-7 w-px shrink-0 bg-[var(--color-gray-200)] sm:block" />

           <div className="min-w-0">
             <h1 className="truncate text-base font-semibold text-[var(--color-black)] sm:text-lg">
               {titleKeys[title] ? translate(language, titleKeys[title]) : title}
             </h1>

             {subtitle && (
               <p className="mt-0.5 hidden truncate text-xs text-[var(--color-gray-500)] sm:block">
                 {subtitle}
               </p>
             )}
           </div>
         </>
       )}
     </div>
     <div className="flex shrink-0 items-center gap-3">
       <LanguageSelector compact />
       {showProfile && isAuthenticated ? (
         <button
           type="button"
           onClick={() => navigate("/profile")}
           aria-label="Go to profile"
           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary-dark)] text-xs font-bold text-black transition hover:opacity-90"
         >
           {user?.name?.charAt(0)?.toUpperCase() || "U"}
         </button>
       ) : !isAuthenticated ? (
         <Link to="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
           {translate(language, "login")}
         </Link>
       ) : null}
     </div>

   </header>
 );
};

export default Topbar;
