import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import {
  getAllPropertiesApi,
  deletePropertyApi,
  type Property,
} from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import { useAuthStore } from "../../store/authStore";

const MyProperties = () => {
  const user = useAuthStore((state) => state?.user);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [location, setLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const userId = user?.id;
      const response = await getAllPropertiesApi();
      const myProperties = response.properties.filter(
        (property) => property?.owner === userId,
      );
      setProperties(myProperties);
    } catch (error) {
      console.error("Get Properties Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load properties",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /**
   * Get unique property types
   */
  const propertyTypes = useMemo(() => {
    return Array.from(
      new Set(
        properties
          .map((property) => property.propertyType)
          .filter(Boolean),
      ),
    );
  }, [properties]);

  /**
   * Get unique locations
   */
  const locations = useMemo(() => {
    return Array.from(
      new Set(
        properties
          .map((property) => property.city)
          .filter(Boolean),
      ),
    );
  }, [properties]);

  /**
   * Apply filters
   */
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchValue = search.trim().toLowerCase();

      // Search
      const matchesSearch =
        !searchValue ||
        property.title?.toLowerCase().includes(searchValue) ||
        property.description
          ?.toLowerCase()
          .includes(searchValue) ||
        property.location
          ?.toLowerCase()
          .includes(searchValue) ||
        property.city
          ?.toLowerCase()
          .includes(searchValue);

      // Property Type
      const matchesType =
        propertyType === "all" ||
        property.propertyType === propertyType;

      // Location
      const matchesLocation =
        location === "all" ||
        property.city === location;

      // Price
      let matchesPrice = true;

      if (priceRange === "below-50") {
        matchesPrice = property.price < 5000000;
      }

      if (priceRange === "50-100") {
        matchesPrice =
          property.price >= 5000000 &&
          property.price <= 10000000;
      }

      if (priceRange === "above-100") {
        matchesPrice = property.price > 10000000;
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesPrice
      );
    });
  }, [
    properties,
    search,
    propertyType,
    location,
    priceRange,
  ]);

  /**
   * Reset all filters
   */
  const handleResetFilters = () => {
    setSearch("");
    setPropertyType("all");
    setLocation("all");
    setPriceRange("all");
  };

  /**
   * Check whether any filter is active
   */
  const hasActiveFilters =
    search.trim() !== "" ||
    propertyType !== "all" ||
    location !== "all" ||
    priceRange !== "all";

  /**
   * Delete Property
   */
  const handleDelete = async (propertyId: string) => {
    try {
      const response = await deletePropertyApi(propertyId);

      toast.success(
        response.message || "Property deleted successfully",
      );

      // Remove deleted property from UI
      setProperties((previousProperties) =>
        previousProperties.filter(
          (property) => property._id !== propertyId,
        ),
      );
    } catch (error) {
      console.error("Delete Property Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete property",
      );
    }
  };

  return (
    <DashboardLayout>
      <header className="my-properties-header">
        <div className="my-properties-title">
          <h1>My Properties</h1>
          <p>Manage all your properties</p>
        </div>

        <Link to="/add-property">
          <Button type="button" variant="primary">
            + Add Property
          </Button>
        </Link>
      </header>

      {loading ? (
        <div className="properties-loading">
          Loading properties...
        </div>
      ) : (
        <section className="properties-toolbar">
          {/* Heading */}
       <div className="properties-toolbar">
        <p className="properties-count">
          {filteredProperties.length}{" "}
          {filteredProperties.length === 1
            ? "property"
            : "properties"}{" "}
          found
        </p>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={handleResetFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

          {/* Filters */}
          <div className="property-filters">
            {/* Search */}
            <input
              type="text"
              placeholder="Search properties..."
              className="property-filter-search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {/* Property Type */}
            <select
              value={propertyType}
              onChange={(event) =>
                setPropertyType(event.target.value)
              }
            >
              <option value="all">All Types</option>

              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Location */}
            <select
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
            >
              <option value="all">All Locations</option>

              {locations.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Price */}
            <select
              value={priceRange}
              onChange={(event) =>
                setPriceRange(event.target.value)
              }
            >
              <option value="all">All Prices</option>

              <option value="below-50">
                Below ₹50 Lakh
              </option>

              <option value="50-100">
                ₹50 Lakh - ₹1 Cr
              </option>

              <option value="above-100">
                Above ₹1 Cr
              </option>
            </select>
          </div>

          {/* Properties */}
          {filteredProperties.length === 0 ? (
            <div className="properties-empty">
              <div className="properties-empty-icon">
                🏠
              </div>

              <h3>No Properties Found</h3>

              <p>
                {hasActiveFilters
                  ? "Try changing your search or filters to find more properties."
                  : "You haven't added any properties yet."}
              </p>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleResetFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  showActions
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </DashboardLayout>
  );
};

export default MyProperties;