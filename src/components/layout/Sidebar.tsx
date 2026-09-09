import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { LogOut, Menu, X, House } from "lucide-react";
import Button from "../common/Button";
import { NAV_ITEMS } from "../../utils/constants";
import { translate, useLanguageStore, type TranslationKey } from "../../store/languageStore";

interface SidebarProps {
  isCollapsed: boolean;
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

const Sidebar = ({
  isCollapsed,
  isMobile = false,
  isOpen = true,
  onToggle,
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
   onClose?.();
   navigate("/dashboard");
  };

  const desktopSidebar = !isMobile
   ? `fixed left-0 top-0 z-40 flex h-screen flex-col bg-(--color-primary) text-white shadow-lg transition-all duration-300 ${
       isCollapsed ? "w-18" : "w-60"
     }`
   : `fixed left-0 top-0 z-40 flex h-screen w-[85vw] max-w-[280px] flex-col bg-(--color-primary) text-white shadow-2xl transition-transform duration-300 ${
       isOpen ? "translate-x-0" : "-translate-x-full"
     }`;

  return (
   <>
     <aside
       className={desktopSidebar}
       style={{
         background: `linear-gradient(
           160deg,
           var(--color-primary) 0%,
           color-mix(in srgb, var(--color-primary) 90%, black) 50%,
           color-mix(in srgb, var(--color-primary) 50%, black) 100%
         )`,
       }}
     >
       <div
         className={`flex h-18 items-center border-b border-white/10 ${
           isCollapsed ? "justify-center" : "justify-between px-4"
         } ${isMobile ? "px-4" : ""}`}
       >
         {!isCollapsed && !isMobile && (
           <div className="flex items-center gap-2">
             <House size={26} strokeWidth={2} className="shrink-0" />

             <strong className="whitespace-nowrap text-xl">
               Property
               <span className="text-(--color-secondary-dark)">Hub</span>
             </strong>
           </div>
         )}

         {isMobile && (
           <div className="flex items-center gap-2">
             <House size={26} strokeWidth={2} className="shrink-0" />
             <strong className="whitespace-nowrap text-lg">
               Property
               <span className="text-(--color-secondary-dark)">Hub</span>
             </strong>
           </div>
         )}

         <button
           type="button"
           onClick={onToggle}
           aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
           title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/80 transition-colors duration-200 hover:bg-white hover:text-(--color-primary)"
         >
           {isMobile ? <X size={22} strokeWidth={2} /> : isCollapsed ? <Menu size={22} strokeWidth={2} /> : <X size={22} strokeWidth={2} />}
         </button>
       </div>

       <nav className="flex flex-1 flex-col py-5">
         <div className="flex flex-col gap-2 px-5">
           {NAV_ITEMS.filter(({ requiresAuth }) => !requiresAuth || isAuthenticated).map(({ label, href, icon: Icon }) => (
             <NavLink
               key={href}
               to={href}
               onClick={isMobile ? onClose : undefined}
               title={isCollapsed ? translate(language, navLabels[label]) : undefined}
               className={({ isActive }) =>
                 `flex min-h-11 items-center rounded-lg text-sm transition-all duration-200 ${
                   isCollapsed && !isMobile ? "justify-center px-0" : "gap-3 px-4"
                 } ${
                   isActive
                     ? "bg-white text-(--color-primary)! shadow-sm"
                     : "text-white/90 hover:bg-white/10 hover:text-white"
                 }`
               }
             >
               <Icon size={20} strokeWidth={2} className="shrink-0" />

               {(!isCollapsed || isMobile) && (
                 <span className="whitespace-nowrap">
                   {translate(language, navLabels[label])}
                 </span>
               )}
             </NavLink>
           ))}
         </div>
       </nav>

       <div className="border-t border-white/10 px-4! py-4!">
         {isAuthenticated ? (
           <button
             type="button"
             title={isCollapsed ? translate(language, "logout") : undefined}
             className={`flex min-h-11 w-full items-center rounded-lg text-sm text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white ${
               isCollapsed && !isMobile ? "justify-center px-0" : "gap-3 px-4"
             }`}
             onClick={() => setShowLogoutModal(true)}
           >
             <LogOut size={20} strokeWidth={2} className="shrink-0" />

             {(!isCollapsed || isMobile) && (
               <span className="whitespace-nowrap">
                 {translate(language, "logout")}
               </span>
             )}
           </button>
         ) : (
           <NavLink
             to="/login"
             onClick={isMobile ? onClose : undefined}
             className={`flex min-h-11 w-full items-center rounded-lg text-sm text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white ${
               isCollapsed && !isMobile ? "justify-center px-0" : "justify-center px-4"
             }`}
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
