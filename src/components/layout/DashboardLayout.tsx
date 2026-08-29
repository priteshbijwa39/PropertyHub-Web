import { type ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showProfile?: boolean;
}

const DashboardLayout = ({
  children,
  title,
  subtitle,
  showProfile = true,
}: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateLayout = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);

      if (mobile) {
        setIsSidebarCollapsed(true);
        setIsMobileSidebarOpen(false);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  const sidebarWidth = isSidebarCollapsed ? "72px" : "240px";

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
        isOpen={!isMobile || isMobileSidebarOpen}
        onToggle={() => {
          if (isMobile) {
            setIsMobileSidebarOpen((prev) => !prev);
            return;
          }

          setIsSidebarCollapsed((prev) => !prev);
        }}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {isMobile && isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close mobile menu"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40"
        />
      )}

      <div
        className="min-h-screen transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : sidebarWidth,
        }}
      >
        <Topbar
          title={title}
          subtitle={subtitle}
          showProfile={showProfile}
          isMobile={isMobile}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <section className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
