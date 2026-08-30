import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import Button from "../../components/common/Button";
import { getAllPropertiesApi } from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import PropertyFilters from "../../components/property/PropertyFilters";
import { Link } from "react-router";
import { usePropertyFilters } from "../../hooks/usePropertyFilters";
import type { Property } from "../../types/property";

const AllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    filterOptions,
    hasActiveFilters,
  } = usePropertyFilters(properties);
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await getAllPropertiesApi();

      setProperties(response.properties);
    } catch (error) {
      console.error("Get Properties Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to load properties",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
   <DashboardLayout
  title="All Properties"
  subtitle="Explore and find the perfect property for you."
>
  {loading ? (
    <div className="flex min-h-[300px] items-center justify-center text-sm text-gray-500">
      Loading properties...
    </div>
  ) : (
    <section className="w-full">
      {/* Filters */}
      <PropertyFilters
        filters={filters}
        filterOptions={filterOptions}
        updateFilter={updateFilter}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Property List */}
      {filteredProperties.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
          {/* Empty Icon */}
          <div className="mb-4 flex h-15 w-15 items-center justify-center rounded-full bg-gray-100 text-2xl">
            🏠
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900">
            No Properties Found
          </h3>

          {/* Description */}
          <p className="mt-2 max-w-[420px] text-sm leading-6 text-gray-500">
            {hasActiveFilters
              ? "Try changing your search or filters to find more properties."
              : "You haven't added any properties yet."}
          </p>

          {/* Action */}
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="primary"
              onClick={resetFilters}
              className="mt-5"
            >
              Clear Filters
            </Button>
          ) : (
            <Link to="/add-property" className="mt-5">
              <Button type="button" variant="primary">
                Add Your First Property
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
  
          {/* Property Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )}
</DashboardLayout>
  );
};

export default AllProperties;
