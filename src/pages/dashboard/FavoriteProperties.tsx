import { Link } from "react-router";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import { useEffect, useState } from "react";
import { getFavoriteProperties } from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import type { Property } from "../../types/property";
import { Heart } from "lucide-react";
import { useFavoriteStore } from "../../store/favoriteStore";

const FavoriteProperties = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
const setFavoriteCount = useFavoriteStore(
  (state) => state.setFavoriteCount,
);
  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const response = await getFavoriteProperties();
      const safeFavorites = Array.isArray(response) ? response : [];

      setFavorites(safeFavorites);
      setFavoriteCount(safeFavorites.length);
    } catch (error) {
      console.error("Failed to fetch favorite properties:", error);
      setFavorites([]);
      setFavoriteCount(0);
      toast.error("Failed to load favorite properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <DashboardLayout
      title="My Favorites"
      subtitle="Properties you have saved for later."
    >
      <div className="w-full">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-5">
          <span className="rounded-full bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-500">
            {favorites.length}{" "}
            {favorites.length === 1 ? "Property" : "Properties"}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm text-gray-500">
              Loading favorite properties...
            </p>
          </div>
        ) : favorites.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            {/* Icon */}
            <div className="mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Heart size={38} strokeWidth={1.8} />
            </div>

            {/* Heading */}
            <h2 className="mb-2 text-[22px] font-bold text-gray-900">
              No Favorite Properties
            </h2>

            {/* Description */}
            <p className="mb-6 max-w-112.5 text-sm leading-[1.6] text-gray-500">
              You haven't liked any properties yet. Start exploring properties
              and save your favorites here.
            </p>

            {/* Browse Button */}
            <Link
              to="/all-properties"
              className="inline-flex items-center justify-center rounded-lg bg-(--color-primary) px-5 py-2.75 font-semibold text-white! transition-opacity duration-200 hover:opacity-90"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          /* Properties */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onFavoriteChange={(isFavorite) => {
                  if (!isFavorite) {
                    setFavorites((prev) =>
                      prev.filter((item) => item._id !== property._id),
                    );
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FavoriteProperties;
