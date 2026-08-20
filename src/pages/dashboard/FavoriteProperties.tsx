import { Link } from "react-router";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import { useFavoriteStore } from "../../store/favoriteStore";

const FavoriteProperties = () => {
  const { favorites } = useFavoriteStore();

  return (
    <DashboardLayout>
      <div className="favorite-properties-page">
        <div className="favorite-properties-header">
          <div>
            <h1>My Favorites</h1>
            <p>
              Properties you have saved for later.
            </p>
          </div>

          <span className="favorite-count">
            {favorites.length}{" "}
            {favorites.length === 1
              ? "Property"
              : "Properties"}
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="favorite-empty-state">
            <div className="favorite-empty-icon">
              ♡
            </div>

            <h2>No Favorite Properties</h2>

            <p>
              You haven't liked any properties yet.
              Start exploring properties and save your
              favorites here.
            </p>

            <Link
              to="/dashboard"
              className="favorite-browse-button"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="property-grid">
            {favorites.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FavoriteProperties;