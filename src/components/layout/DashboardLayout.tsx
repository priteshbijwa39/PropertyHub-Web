import { type ReactNode, useState } from "react";
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

  const sidebarWidth = isSidebarCollapsed ? "72px" : "240px";

  return (
    <main className="min-h-screen bg-(--color-background)">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content */}
      <div
        className="min-h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
        }}
      >
        {/* Topbar */}
        <Topbar title={title} subtitle={subtitle} showProfile={showProfile} />

        {/* Page Content */}
        <section className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
