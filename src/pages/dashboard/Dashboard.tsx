import Button from "../../components/common/Button";
import { useAuthStore } from "../../store/authStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import { useEffect, useState } from "react";
import { getAllPropertiesApi,type Property } from "../../services/propertyService";
import { toast } from "../../components/common/Toast";


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

  // Total properties
  const totalProperties = properties.length;

  // Properties created by logged-in user
  const myProperties = properties.filter(
    (property) => property?.owner === user?.id,
  ).length;

  return (
    <DashboardLayout>
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-header-actions">
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
        </div>
      </header>

      <div className="dashboard-welcome">
        <h2>Welcome back, {user?.name}! 👋</h2>
        <p>Here's what's happening with your properties today.</p>
      </div>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span>Total Properties</span>
          <strong>{loading ? "..." : totalProperties}</strong>
          <small>↗ 12% from last month</small>
        </div>

        <div className="stat-card">
          <span>My Properties</span>
         <strong>{loading ? "..." : myProperties}</strong>
          <small>↗ 2 from last month</small>
        </div>

        <div className="stat-card">
          <span>Total Views</span>
          <strong>1,245</strong>
          <small>↗ 10% from last month</small>
        </div>

        <div className="stat-card">
          <span>Total Inquiries</span>
          <strong>56</strong>
          <small>↗ 8% from last month</small>
        </div>
      </section>

      <section className="properties-section">
        <div className="properties-heading">
          <div>
            <h2>All Properties</h2>
          </div>
        </div>

        <div className="property-filters">
          <input
            type="text"
            placeholder="Search properties..."
            className="property-filter-search"
          />

          <select>
            <option>All Type</option>
            <option>Villa</option>
            <option>House</option>
            <option>Apartment</option>
          </select>

          <select>
            <option>All Location</option>
            <option>Indore</option>
            <option>Bhopal</option>
          </select>

          <select>
            <option>Price Range</option>
            <option>Below ₹50L</option>
            <option>₹50L - ₹1Cr</option>
            <option>Above ₹1Cr</option>
          </select>

          <Button type="button" variant="primary">
            Search
          </Button>
        </div>

        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
