import {type ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="dashboard-page">
      <DashboardSidebar />

      <section className="dashboard-content">
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;