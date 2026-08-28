import { useMemo, useState } from "react";
import type { Property } from "../types/property";


export interface PropertyFiltersState {
  search: string;
  listingType: string;
  propertyCategory: string;
  propertyType: string;
  city: string;
  state: string;
  priceRange: string;
}

const INITIAL_FILTERS: PropertyFiltersState = {
  search: "",
  listingType: "all",
  propertyCategory: "all",
  propertyType: "all",
  city: "all",
  state: "all",
  priceRange: "all",
};

export const usePropertyFilters = (
  properties: Property[]
) => {
  const [filters, setFilters] =
    useState<PropertyFiltersState>(
      INITIAL_FILTERS
    );

  const updateFilter = (
    key: keyof PropertyFiltersState,
    value: string
  ) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  /**
   * Unique filter options
   */
  const filterOptions = useMemo(() => {
    const unique = (values: string[]) =>
      Array.from(
        new Set(values.filter(Boolean))
      ).sort();

    return {
      cities: unique(
        properties.map(
          (property) => property.city
        )
      ),

      states: unique(
        properties.map(
          (property) => property.state
        )
      ),

      propertyTypes: unique(
        properties.map(
          (property) => property.propertyType
        )
      ),

      propertyCategories: unique(
        properties.map(
          (property) =>
            property.propertyCategory
        )
      ),

      listingTypes: unique(
        properties.map(
          (property) => property.listingType
        )
      ),
    };
  }, [properties]);

  /**
   * Apply filters
   */
  const filteredProperties = useMemo(() => {
    const searchValue =
      filters.search.trim().toLowerCase();

    return properties.filter((property) => {
      /**
       * Search
       *
       * Search across:
       * title
       * description
       * property type
       * category
       * location
       * city
       * state
       */
      const matchesSearch =
        !searchValue ||
        property.title
          ?.toLowerCase()
          .includes(searchValue) ||
        property.description
          ?.toLowerCase()
          .includes(searchValue) ||
        property.propertyType
          ?.toLowerCase()
          .includes(searchValue) ||
        property.propertyCategory
          ?.toLowerCase()
          .includes(searchValue) ||
        property.location
          ?.toLowerCase()
          .includes(searchValue) ||
        property.city
          ?.toLowerCase()
          .includes(searchValue) ||
        property.state
          ?.toLowerCase()
          .includes(searchValue);

      /**
       * Listing Type
       */
      const matchesListingType =
        filters.listingType === "all" ||
        property.listingType ===
          filters.listingType;

      /**
       * Property Category
       */
      const matchesCategory =
        filters.propertyCategory === "all" ||
        property.propertyCategory ===
          filters.propertyCategory;

      /**
       * Property Type
       */
      const matchesPropertyType =
        filters.propertyType === "all" ||
        property.propertyType ===
          filters.propertyType;

      /**
       * City
       */
      const matchesCity =
        filters.city === "all" ||
        property.city === filters.city;

      /**
       * State
       */
      const matchesState =
        filters.state === "all" ||
        property.state === filters.state;

      /**
       * Price
       */
      let matchesPrice = true;

      if (filters.priceRange === "below-50") {
        matchesPrice =
          property.price < 5000000;
      }

      if (filters.priceRange === "50-100") {
        matchesPrice =
          property.price >= 5000000 &&
          property.price <= 10000000;
      }

      if (filters.priceRange === "above-100") {
        matchesPrice =
          property.price > 10000000;
      }

      return (
        matchesSearch &&
        matchesListingType &&
        matchesCategory &&
        matchesPropertyType &&
        matchesCity &&
        matchesState &&
        matchesPrice
      );
    });
  }, [properties, filters]);

  /**
   * Check whether filters are active
   */
  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.listingType !== "all" ||
    filters.propertyCategory !== "all" ||
    filters.propertyType !== "all" ||
    filters.city !== "all" ||
    filters.state !== "all" ||
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