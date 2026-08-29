import { Link, useNavigate } from "react-router";
import Button from "../common/Button";
import { toggleFavorite } from "../../services/propertyService";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../common/Toast";
import type { Property } from "../../types/property";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  showActions?: boolean;
  onDelete?: (propertyId: string) => void;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const PropertyCard = ({
  property,
  showActions = false,
  onDelete,
  onFavoriteChange,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [favorite, setFavorite] = useState(
    property?.isFavorite || false
  );

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const handleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (favoriteLoading) return;
    if (!isAuthenticated) {
      toast.error("Please login to save favorite properties.");
      navigate("/login");
      return;
    }

    try {
      setFavoriteLoading(true);

      const response = await toggleFavorite(property._id);

      toast.success(response.message);

      setFavorite(response.isFavorite);

      onFavoriteChange?.(response.isFavorite);
    } catch (error) {
      toast.error("Failed to toggle favorite");
      console.error("Failed to toggle favorite:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <Link
        to={`/properties/${property._id}`}
        className="block text-inherit no-underline"
      >
        {/* Image */}
        <div className="relative h-[190px] w-full overflow-hidden bg-gray-100">
          <img
            src={
              property.images?.[0] ||
              "/assets/images/login-property.jpg"
            }
            alt={property.title}
            className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {/* Dark image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* Listing Type */}
          {property.listingType && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
              {property.listingType}
            </span>
          )}

          {/* Favorite */}
         <button
  type="button"
  disabled={favoriteLoading}
  onClick={handleFavorite}
  aria-label={
    favorite
      ? "Remove from favorites"
      : "Add to favorites"
  }
  className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-200 ${
    favorite
      ? "text-red-500 hover:scale-110"
      : "text-gray-500 hover:scale-110 hover:text-red-500"
  } ${
    favoriteLoading
      ? "cursor-not-allowed opacity-60"
      : "cursor-pointer"
  }`}
>
  <Heart
    size={15}
    strokeWidth={1}
    fill={favorite ? "currentColor" : "none"}
  />
</button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h2 className="line-clamp-2 text-base font-semibold leading-6 text-gray-900">
            {property.title}
          </h2>

          {/* Category & Type */}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
            {property.propertyType && (
              <span>{property.propertyType}</span>
            )}

            {property.propertyCategory && (
              <>
                <span className="text-gray-300">•</span>
                <span>{property.propertyCategory}</span>
              </>
            )}
          </div>

          {/* Location */}
          <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-600">
            <span className="shrink-0">📍</span>

            <div className="flex min-w-0 flex-col gap-0.5">
              <span>
                {property.location}, {property.city}
              </span>

              {property.state && (
                <small className="text-[11px] text-gray-400">
                  {property.state}
                </small>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="mt-3.5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
            {property.bedrooms !== undefined && (
              <span className="whitespace-nowrap">
                🛏 {property.bedrooms}{" "}
                {property.bedrooms === 1 ? "Bed" : "Beds"}
              </span>
            )}

            {property.bathrooms !== undefined && (
              <span className="whitespace-nowrap">
                🛁 {property.bathrooms}{" "}
                {property.bathrooms === 1
                  ? "Bath"
                  : "Baths"}
              </span>
            )}

            <span className="whitespace-nowrap">
              □ {property.area.toLocaleString("en-IN")} sqft
            </span>
          </div>
        </div>
      </Link>

      {/* Owner Actions */}
      {showActions && (
        <div className="grid grid-cols-2 gap-2 px-5 pb-5">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate(`/edit-property/${property._id}`)
            }
          >
            Edit
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() =>
              onDelete?.(property._id)
            }
          >
            Delete
          </Button>
        </div>
      )}
    </article>
  );
};

export default PropertyCard;