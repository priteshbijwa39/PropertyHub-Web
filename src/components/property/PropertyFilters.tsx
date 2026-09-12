import { useState } from "react";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from "lucide-react";

import {
  PROPERTY_CATEGORIES,
  PROPERTY_TYPES,
  LISTING_TYPES,
  PRICE_RANGES,
} from "../../utils/propertyData";

import type {
  PropertyFiltersState,
} from "../../hooks/usePropertyFilters";

interface PropertyFiltersProps {
  filters: PropertyFiltersState;

  filterOptions: {
    propertyTypes: string[];
    propertyCategories: string[];
    listingTypes: string[];
  };

  updateFilter: (
    key: keyof PropertyFiltersState,
    value: string
  ) => void;

  onReset: () => void;

  hasActiveFilters: boolean;
}

const PropertyFilters = ({
  filters,
  filterOptions,
  updateFilter,
  onReset,
  hasActiveFilters,
}: PropertyFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryPropertyTypes =
    filters.propertyCategory !== "all" &&
    filters.propertyCategory in PROPERTY_TYPES
      ? PROPERTY_TYPES[
          filters.propertyCategory as keyof typeof PROPERTY_TYPES
        ]
      : filterOptions.propertyTypes;

  const propertyTypes = Array.from(new Set(categoryPropertyTypes));

  const activeFilterCount = [
    filters.listingType !== "all",
    filters.propertyCategory !== "all",
    filters.propertyType !== "all",
    filters.priceRange !== "all",
  ].filter(Boolean).length;

  const handleCategoryChange = (value: string) => {
    updateFilter("propertyCategory", value);
    updateFilter("propertyType", "all");
  };

  const selectClassName =
    "h-9 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 hover:border-gray-400";

  const labelClassName =
    "mb-1 text-[11px] font-semibold text-gray-700";

  return (
    <div className="mb-4 w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by property name, location, or ID..."
              value={filters.search}
              onChange={(event) =>
                updateFilter("search", event.target.value)
              }
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />

            {filters.search && (
              <button
                type="button"
                onClick={() => updateFilter("search", "")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {isExpanded ? "Hide filters" : "Filters"}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
            <span className="rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
              {activeFilterCount} active
            </span>
            <span>Search and filters are active.</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col">
            <label htmlFor="listingType" className={labelClassName}>
              Listing
            </label>

            <select
              id="listingType"
              value={filters.listingType}
              onChange={(event) =>
                updateFilter("listingType", event.target.value)
              }
              className={selectClassName}
            >
              <option value="all">All Listings</option>

              {LISTING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="propertyCategory" className={labelClassName}>
              Category
            </label>

            <select
              id="propertyCategory"
              value={filters.propertyCategory}
              onChange={(event) =>
                handleCategoryChange(event.target.value)
              }
              className={selectClassName}
            >
              <option value="all">All Categories</option>

              {PROPERTY_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="propertyType" className={labelClassName}>
              Property Type
            </label>

            <select
              id="propertyType"
              value={filters.propertyType}
              onChange={(event) =>
                updateFilter("propertyType", event.target.value)
              }
              className={selectClassName}
            >
              <option value="all">All Types</option>

              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="priceRange" className={labelClassName}>
              Price
            </label>

            <select
              id="priceRange"
              value={filters.priceRange}
              onChange={(event) =>
                updateFilter("priceRange", event.target.value)
              }
              className={selectClassName}
            >
              {PRICE_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {hasActiveFilters && !isExpanded && (
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span>Filters are active</span>

          <button
            type="button"
            onClick={onReset}
            className="border-0 bg-transparent p-0 text-xs font-semibold text-blue-600 transition hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;