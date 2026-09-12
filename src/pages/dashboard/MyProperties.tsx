import { useEffect, useState } from "react";
import { Link } from "react-router";

import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import PropertyFilters from "../../components/property/PropertyFilters";

import {
  getAllPropertiesApi,
  deletePropertyApi
} from "../../services/propertyService";

import { toast } from "../../components/common/Toast";
import { useAuthStore } from "../../store/authStore";

import { usePropertyFilters } from "../../hooks/usePropertyFilters";
import type { Property } from "../../types/property";

const MyProperties = () => {
  const user = useAuthStore(
    (state) => state?.user
  );

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

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

      const userId = user?.id;

      const response =
        await getAllPropertiesApi();

      const myProperties =
        response.properties.filter(
          (property) =>
            property?.owner === userId
        );

      setProperties(myProperties);
    } catch (error) {
      console.error(
        "Get Properties Error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load properties"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProperties();
    }
  }, [user?.id]);

  const handleDelete = async (
    propertyId: string
  ) => {
    try {
      const response =
        await deletePropertyApi(
          propertyId
        );

      toast.success(
        response.message ||
          "Property deleted successfully"
      );

      setProperties(
        (previousProperties) =>
          previousProperties.filter(
            (property) =>
              property._id !== propertyId
          )
      );
    } catch (error) {
      console.error(
        "Delete Property Error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete property"
      );
    }
  };

  return (
  <DashboardLayout
  title="My Properties"
  subtitle="Manage and track all your properties"
>
  <div className="w-full">
    {/* Header */}
    {/* <header className="mb-6 flex items-center justify-end">
      <Link to="/add-property" className="no-underline">
        <Button type="button" variant="primary">
          + Add Property
        </Button>
      </Link>
    </header> */}

    {loading ? (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-gray-500">
        Loading properties...
      </div>
    ) : (
      <section className="w-full">
        <PropertyFilters
          filters={filters}
          filterOptions={filterOptions}
          updateFilter={updateFilter}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {filteredProperties.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <div className="mb-4 flex h-15 w-15 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🏠
            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No Properties Found
            </h3>

            <p className="mb-6 max-w-[420px] text-sm leading-6 text-gray-500">
              {hasActiveFilters
                ? "Try changing your search or filters to find more properties."
                : "You haven't added any properties yet."}
            </p>

            {hasActiveFilters ? (
              <Button
                type="button"
                variant="primary"
                onClick={resetFilters}
              >
                Clear Filters
              </Button>
            ) : (
              <Link to="/add-property">
                <Button type="button" variant="primary">
                  Add Your First Property
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
  </div>
</DashboardLayout>
  );
};

export default MyProperties;