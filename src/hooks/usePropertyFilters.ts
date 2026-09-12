import { useCallback, useMemo, useState } from "react";
import type { Property } from "../types/property";
import { getPropertyReference } from "../utils/propertyReference";

export interface PropertyFiltersState {
  search: string;
  listingType: string;
  propertyCategory: string;
  propertyType: string;
  priceRange: string;
}

const INITIAL_FILTERS: PropertyFiltersState = {
  search: "",
  listingType: "all",
  propertyCategory: "all",
  propertyType: "all",
  priceRange: "all",
};

export const usePropertyFilters = (properties: Property[]) => {
  const [filters, setFilters] = useState<PropertyFiltersState>(INITIAL_FILTERS);

  const updateFilter = useCallback(
    (key: keyof PropertyFiltersState, value: string) => {
      setFilters((previous) => ({
        ...previous,
        [key]: value,
      }));
    },
    [],
  );

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filterOptions = useMemo(() => {
    const unique = (values: string[]) =>
      Array.from(new Set(values.filter(Boolean))).sort();

    return {
      propertyTypes: unique(
        properties.map((property) => property.propertyType),
      ),

      propertyCategories: unique(
        properties.map((property) => property.propertyCategory),
      ),

      listingTypes: unique(properties.map((property) => property.listingType)),
    };
  }, [properties]);

  const filteredProperties = useMemo(() => {
    const searchValue = filters.search.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesSearch =
        !searchValue ||
        getPropertyReference(property).toLowerCase().includes(searchValue) ||
        property.title?.toLowerCase().includes(searchValue) ||
        property.description?.toLowerCase().includes(searchValue) ||
        property.propertyType?.toLowerCase().includes(searchValue) ||
        property.propertyCategory?.toLowerCase().includes(searchValue) ||
        property.location?.toLowerCase().includes(searchValue) ||
        property.city?.toLowerCase().includes(searchValue) ||
        property.state?.toLowerCase().includes(searchValue);

      const matchesListingType =
        filters.listingType === "all" ||
        property.listingType === filters.listingType;

      const matchesCategory =
        filters.propertyCategory === "all" ||
        property.propertyCategory === filters.propertyCategory;

      const matchesPropertyType =
        filters.propertyType === "all" ||
        property.propertyType === filters.propertyType;

      let matchesPrice = true;

      if (filters.priceRange === "below-50") {
        matchesPrice = property.price < 5000000;
      }

      if (filters.priceRange === "50-100") {
        matchesPrice = property.price >= 5000000 && property.price <= 10000000;
      }

      if (filters.priceRange === "above-100") {
        matchesPrice = property.price > 10000000;
      }

      return (
        matchesSearch &&
        matchesListingType &&
        matchesCategory &&
        matchesPropertyType &&
        matchesPrice
      );
    });
  }, [properties, filters]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.listingType !== "all" ||
    filters.propertyCategory !== "all" ||
    filters.propertyType !== "all" ||
    filters.priceRange !== "all";

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    filterOptions,
    hasActiveFilters,
  };
};
