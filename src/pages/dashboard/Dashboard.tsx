import Button from "../../components/common/Button";
import { useAuthStore } from "../../store/authStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import { useEffect, useState } from "react";
import {
  getAllPropertiesApi,
  type Property,
} from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import { useFavoriteStore } from "../../store/favoriteStore";
import PropertyTypeChart from "../../components/property/PropertyTypeChart";
import { Link } from "react-router";

const Dashboard = () => {
  const user = useAuthStore((state) => state?.user);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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

  const totalProperties = properties.length;
  const myProperties = properties.filter(
    (property) => property?.owner === user?.id,
  ).length;
  const { favorites } = useFavoriteStore();
  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
  // const totalPropertyValue = properties.reduce(
  //   (total, property) => total + property.price,
  //   0,
  // );
  // const averagePropertyPrice =
  //   properties.length > 0 ? totalPropertyValue / properties.length : 0;
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
    <DashboardLayout>
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
        </div>

        {/* <div className="dashboard-header-actions">
          <input
            type="text"
            placeholder="Search properties..."
            className="dashboard-search"
          />

          <button className="header-icon" type="button">
            ♧
          </button>

          <button className="header-icon" type="button">
            ♡
          </button>
        </div> */}
      </header>

      <div className="dashboard-welcome">
        <h2>Welcome back, {user?.name}! 👋</h2>
        <p>Here's what's happening with your properties today.</p>
      </div>
      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-card-label">Total Properties</span>

          <strong>{loading ? "..." : totalProperties}</strong>

          <small>All properties listed on PropertyHub</small>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">My Properties</span>

          <strong>{loading ? "..." : myProperties}</strong>

          <small>Properties added by you</small>
        </div>

        <div className="stat-card">
          <span className="stat-card-label">My Favorites</span>

          <strong>{favorites.length}</strong>

          <small>Properties saved by you</small>
        </div>

        {/* <div className="stat-card">
          <span>Total Views</span>
          <strong>1,245</strong>
          <small>↗ 10% from last month</small>
        </div>

        <div className="stat-card">
          <span>Total Inquiries</span>
          <strong>56</strong>
          <small>↗ 8% from last month</small>
        </div> */}
      </section>

      <div className="property-price-range">
        <div className="property-price-range-header">
          <div>
            <span>Property Price Range</span>
            <strong>Available Properties</strong>
          </div>

          <span>{properties.length} Properties</span>
        </div>

        <div className="property-price-range-values">
          <div>
            <small>Minimum</small>
            <strong>
              {loading ? "..." : formatIndianCurrency(minimumPropertyPrice)}
            </strong>
          </div>

          <div className="price-range-line">
            <span />
          </div>

          <div>
            <small>Maximum</small>
            <strong>
              {loading ? "..." : formatIndianCurrency(maximumPropertyPrice)}
            </strong>
          </div>
        </div>
      </div>

      <section className="dashboard-chart-section">
        <PropertyTypeChart properties={properties} />
      </section>

      <section className="recent-properties">
        <div className="section-header">
          <div>
            <h2>Recent Properties</h2>
            <p>Recently added properties</p>
          </div>

          {/* <Link to="/properties">View All</Link> */}
        </div>

        <div className="property-grid">
          {recentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
