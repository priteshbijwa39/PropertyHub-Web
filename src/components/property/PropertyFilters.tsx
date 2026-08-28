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
    cities: string[];
    states: string[];
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
  const categoryPropertyTypes =
    filters.propertyCategory !== "all" &&
    filters.propertyCategory in PROPERTY_TYPES
      ? PROPERTY_TYPES[
          filters.propertyCategory as keyof typeof PROPERTY_TYPES
        ]
      : filterOptions.propertyTypes;

  const propertyTypes = Array.from(
    new Set(categoryPropertyTypes)
  );

  const handleCategoryChange = (value: string) => {
    updateFilter("propertyCategory", value);
    updateFilter("propertyType", "all");
  };

  const selectClassName =
    "h-[42px] w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 hover:border-gray-400";

  const labelClassName =
    "mb-1.5 text-xs font-semibold text-gray-700";

  return (
    <div className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Search */}
      <div className="relative mb-5 w-full">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search by title, location, city, type..."
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
          className="h-[46px] w-full rounded-lg border border-gray-300 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />

        {filters.search && (
          <button
            type="button"
            onClick={() => updateFilter("search", "")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
          >
            ×
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Listing */}
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

        {/* Category */}
        <div className="flex flex-col">
          <label
            htmlFor="propertyCategory"
            className={labelClassName}
          >
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

        {/* Property Type */}
        <div className="flex flex-col">
          <label
            htmlFor="propertyType"
            className={labelClassName}
          >
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

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className={labelClassName}>
            City
          </label>

          <select
            id="city"
            value={filters.city}
            onChange={(event) =>
              updateFilter("city", event.target.value)
            }
            className={selectClassName}
          >
            <option value="all">All Cities</option>

            {filterOptions.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label htmlFor="state" className={labelClassName}>
            State
          </label>

          <select
            id="state"
            value={filters.state}
            onChange={(event) =>
              updateFilter("state", event.target.value)
            }
            className={selectClassName}
          >
            <option value="all">All States</option>

            {filterOptions.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
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

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
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