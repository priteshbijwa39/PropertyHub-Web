import { type ReactNode, useState } from "react";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { getFavoriteProperties } from "../../services/propertyService";
import { useAuthStore } from "../../store/authStore";
import { useFavoriteStore } from "../../store/favoriteStore";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setFavoriteIds = useFavoriteStore((state) => state.setFavoriteIds);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavoriteIds([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        const favorites = await getFavoriteProperties();
        setFavoriteIds(favorites.map((property) => property._id));
      } catch (error) {
        console.error("Failed to load favorite properties:", error);
      }
    };

    loadFavorites();
  }, [isAuthenticated, setFavoriteIds]);

  return (
    <main className="flex min-h-screen flex-col bg-(--color-background)">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40"
        />
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar
          title={title}
          subtitle={subtitle}
          showProfile={showProfile}
          onOpenSidebar={() => setIsSidebarOpen((previous) => !previous)}
        />

        <section className="w-full flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default DashboardLayout;
