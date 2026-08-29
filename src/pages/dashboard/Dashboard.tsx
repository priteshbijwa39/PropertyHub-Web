import { useAuthStore } from "../../store/authStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import { useEffect, useState } from "react";
import { getAllPropertiesApi } from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import { useFavoriteStore } from "../../store/favoriteStore";
import PropertyTypeChart from "../../components/property/PropertyTypeChart";
import type { Property } from "../../types/property";
import { Link } from "react-router";
const Dashboard = () => {
  const user = useAuthStore((state) => state?.user);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const favoriteCount = useFavoriteStore((state) => state.favoriteCount);
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getAllPropertiesApi();
      const safeProperties = Array.isArray(response?.properties)
        ? response.properties
        : [];

      setProperties(safeProperties);
    } catch (error) {
      console.error("Get Properties Error:", error);
      setProperties([]);
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

  const totalProperties = properties.length;
  const myProperties = user
    ? properties.filter((property) => property?.owner === user.id).length
    : 0;
  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 5);

  const propertyPrices = properties.map((property) => property.price);

  const minimumPropertyPrice =
    propertyPrices.length > 0 ? Math.min(...propertyPrices) : 0;

  const maximumPropertyPrice =
    propertyPrices.length > 0 ? Math.max(...propertyPrices) : 0;

  const formatIndianCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    }

    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(2)} Lakh`;
    }

    return `₹ ${value.toLocaleString("en-IN")}`;
  };

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Overview of your property management"
    >
      {/* Welcome */}
      <div className="mt-2 overflow-hidden rounded-2xl bg-[linear-gradient(to_right,var(--color-primary),#1e40af)] px-6 py-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-lg font-bold text-white! sm:text-xl">
              {user ? `Welcome , ${user.name}!` : "Explore PropertyHub"}
            </h2>

            <p className="mt-1 text-sm text-white/80">
              {user
                ? "Here's what's happening with your properties today."
                : "Discover properties that match your lifestyle and budget."}
            </p>
          </div>

          {/* Browse Button */}
          <Link
            to="/all-properties"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-(--color-primary) shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
          >
            Browse
          </Link>
        </div>
      </div>
      {/* Stats */}
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Total Properties */}
        <div className="rounded-lg border border-(--color-gray-100) bg-(--color-white) p-5 shadow-(--shadow-sm)">
          <span className="block text-xs text-(--color-gray-500)">
            Total Properties
          </span>

          <strong className="mt-1 block text-2xl font-bold text-(--color-gray-900)">
            {loading ? "..." : totalProperties}
          </strong>

          <small className="text-[10px] text-green-600">
            All properties listed on PropertyHub
          </small>
        </div>

        {/* My Properties */}
        <div className="rounded-lg border border-(--color-gray-100) bg-(--color-white) p-5 shadow-(--shadow-sm)">
          <span className="block text-xs text-(--color-gray-500)">
            My Properties
          </span>

          <strong className="mt-1 block text-2xl font-bold text-(--color-gray-900)">
            {loading ? "..." : myProperties}
          </strong>

          <small className="text-[10px] text-green-600">
            Properties added by you
          </small>
        </div>

        {/* Favorites */}
        <div className="rounded-lg border border-(--color-gray-100) bg-(--color-white) p-5 shadow-(--shadow-sm)">
          <span className="block text-xs text-(--color-gray-500)">
            My Favorites
          </span>

          <strong className="mt-1 block text-2xl font-bold text-(--color-gray-900)">
            {favoriteCount}
          </strong>

          <small className="text-[10px] text-green-600">
            Properties saved by you
          </small>
        </div>
      </section>

      {/* Property Price Range */}
      <section className="mt-6 rounded-2xl border border-(--color-gray-200) bg-(--color-white) p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-(--color-gray-900)">
              Property Price Range
            </span>

            <strong className="text-[13px] font-normal text-(--color-gray-500)">
              Available Properties
            </strong>
          </div>

          <span className="shrink-0 rounded-full bg-(--color-gray-100) px-3 py-1.5 text-[13px] font-semibold text-(--color-gray-600)">
            {properties.length} Properties
          </span>
        </div>

        {/* Values */}
        <div className="mt-7 grid grid-cols-1 items-end gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5">
          {/* Minimum */}
          <div className="flex flex-col gap-1">
            <small className="text-xs text-(--color-gray-500)">Minimum</small>

            <strong className="text-xl font-bold text-(--color-gray-900)">
              {loading ? "..." : formatIndianCurrency(minimumPropertyPrice)}
            </strong>
          </div>

          {/* Range Line */}
          <div className="relative order-3 h-1.5 w-full rounded-full bg-(--color-gray-200) sm:order-none sm:mb-2">
            <span className="absolute inset-0 h-full rounded-full bg-(--color-primary)" />
          </div>

          {/* Maximum */}
          <div className="flex flex-col gap-1">
            <small className="text-xs text-(--color-gray-500)">Maximum</small>

            <strong className="text-xl font-bold text-(--color-gray-900)">
              {loading ? "..." : formatIndianCurrency(maximumPropertyPrice)}
            </strong>
          </div>
        </div>
      </section>

      {/* Property Type Chart */}
      <section className="mt-6 w-full">
        <PropertyTypeChart properties={properties} />
      </section>

      {/* Recent Properties */}
      <section className="mt-8 w-full">
        {/* Section Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-(--color-gray-900)">
              Recent Properties
            </h2>

            <p className="mt-1.5 text-sm text-(--color-gray-500)">
              Recently added properties
            </p>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
