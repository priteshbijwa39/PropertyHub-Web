import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PropertyCard from "../../components/property/PropertyCard";
import {
  getAllPropertiesApi,deletePropertyApi,
  type Property,
} from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import { useAuthStore } from "../../store/authStore";

const MyProperties = () => {
  const user = useAuthStore((state) => state?.user);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);


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
        error instanceof Error ? error.message : "Failed to load properties",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

const handleDelete = async (propertyId: string) => {
  try {
    const response = await deletePropertyApi(propertyId);

    toast.success(response.message || "Property deleted successfully");

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
        <div>
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
        <div className="properties-loading">Loading properties...</div>
      ) : properties.length === 0 ? (
        <div className="properties-empty">
          <h2>No Properties Found</h2>

          <p>You haven't added any properties yet.</p>
        </div>
      ) : (
        <section className="my-property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              showActions
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </DashboardLayout>
  );
};

export default MyProperties;
