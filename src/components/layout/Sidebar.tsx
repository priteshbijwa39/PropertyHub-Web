import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { LogOut } from "lucide-react";
import Button from "../common/Button";
import { NAV_ITEMS } from "../../utils/constants";
import { translate, useLanguageStore, type TranslationKey } from "../../store/languageStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({
  isOpen,
  onClose,
}: SidebarProps) => {
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const language = useLanguageStore((state) => state.language);

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navLabels: Record<string, TranslationKey> = {
    Dashboard: "dashboard",
    "All Properties": "allProperties",
    "My Properties": "myProperties",
    "Add Property": "addProperty",
    Favorites: "favorites",
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    onClose();
    navigate("/dashboard");
  };

  const sidebarClassName = `fixed left-0 top-[72px] z-40 flex h-[calc(100vh-72px)] w-[85vw] max-w-[280px] flex-col bg-(--color-primary) text-white shadow-2xl transition-transform duration-300 sm:w-60 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
   <>
     <aside
       className={sidebarClassName}
       style={{
         background: `linear-gradient(
           160deg,
           var(--color-primary) 0%,
           color-mix(in srgb, var(--color-primary) 90%, black) 50%,
           color-mix(in srgb, var(--color-primary) 50%, black) 100%
         )`,
       }}
     >
       <nav className="flex flex-1 flex-col py-5">
         <div className="flex flex-col gap-2 px-5">
           {NAV_ITEMS.filter(({ requiresAuth }) => !requiresAuth || isAuthenticated).map(({ label, href, icon: Icon }) => (
             <NavLink
               key={href}
               to={href}
               className={({ isActive }) =>
                 `flex min-h-11 items-center gap-3 rounded-lg px-4 text-sm transition-all duration-200 ${
                   isActive
                     ? "bg-white text-(--color-primary)! shadow-sm"
                     : "text-white/90 hover:bg-white/10 hover:text-white"
                 }`
               }
             >
               <Icon size={20} strokeWidth={2} className="shrink-0" />

               <span className="whitespace-nowrap">
                 {translate(language, navLabels[label])}
               </span>
             </NavLink>
           ))}
         </div>
       </nav>

       <div className="border-t border-white/10 px-4! py-4!">
         {isAuthenticated ? (
           <button
             type="button"
             className="flex min-h-11 w-full items-center gap-3 rounded-lg px-4 text-sm text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
             onClick={() => setShowLogoutModal(true)}
           >
             <LogOut size={20} strokeWidth={2} className="shrink-0" />

             <span className="whitespace-nowrap">
               {translate(language, "logout")}
             </span>
           </button>
         ) : (
           <NavLink
             to="/login"
             className="flex min-h-11 w-full items-center justify-center rounded-lg px-4 text-sm text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
           >
             {translate(language, "login")}
           </NavLink>
         )}
       </div>
     </aside>

     {showLogoutModal && (
       <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
         onClick={() => setShowLogoutModal(false)}
       >
         <div
           className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
           onClick={(event) => event.stopPropagation()}
         >
           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-danger-light) text-(--color-danger)">
             <LogOut size={24} />
           </div>

           <div className="mt-4 text-center">
             <h2 className="text-xl font-semibold text-black">
               {translate(language, "logout")}?
             </h2>

             <p className="mt-2 text-sm text-gray-500">
               Are you sure you want to logout?
             </p>
           </div>

           <div className="mt-6 flex gap-3 justify-between">
             <Button
               type="button"
               variant="outline"
               children="Cancel"
               className="w-full"
               onClick={() => setShowLogoutModal(false)}
             />

             <Button
               type="button"
               variant="danger"
               children={translate(language, "logout")}
               className="w-full"
               onClick={handleLogout}
             />
           </div>
         </div>
       </div>
     )}
   </>
  );
};

export default Sidebar;
