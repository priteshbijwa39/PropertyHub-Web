import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getPropertyByIdApi,
  type Property,
} from "../../services/propertyService";
import { toast } from "../../components/common/Toast";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProperty = async () => {
    if (!id) {
      toast.error("Property ID not found");
      return;
    }

    try {
      setLoading(true);

      const response = await getPropertyByIdApi(id);

      console.log("Property Details:", response);

      setProperty(response.property);
    } catch (error) {
      console.error("Get Property Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to load property",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="properties-loading">Loading property...</div>
      </DashboardLayout>
    );
  }

  if (!property) {
    return (
      <DashboardLayout>
        <div className="properties-empty">
          <h2>Property Not Found</h2>
          <p>The property you're looking for doesn't exist.</p>

          <Link to="/dashboard">
            <Button type="button" variant="primary">
              Back to Properties
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="property-details-top">
        <Link to="/dashboard" className="back-link">
          ← Back to Properties
        </Link>
      </div>

      <div className="property-details-card">
        <div className="property-gallery">
          <img
            src={property.images?.[0] || "/assets/images/login-property.jpg"}
            alt={property.title}
            className="property-main-image"
          />

          <div className="property-thumbnails">
            {property.images?.map((image, index) => (
              <img key={index} src={image} alt={`Property view ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="property-summary">
          <div className="property-title-row">
            <div>
              <h1>{property.title}</h1>

              <p className="property-location">
                ◉ {property.location}, {property.city}
              </p>
            </div>

            <strong className="property-details-price">
              ₹ {property.price.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="property-info">
            <div>
              <span>Bedrooms</span>
              <strong>{property.bedrooms ?? 0} Beds</strong>
            </div>

            <div>
              <span>Bathrooms</span>
              <strong>{property.bathrooms ?? 0} Baths</strong>
            </div>

            <div>
              <span>Area</span>
              <strong>{property.area} sqft</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="property-description-card">
        <h2>Property Description</h2>

        <p>{property.description || "No description available."}</p>
      </div>

      <div className="property-contact-card">
        <div>
          <h2>Interested in this property?</h2>
          <p>Contact the owner for more information.</p>
        </div>

        <Button type="button" variant="primary" disabled={true}>
          Contact Owner
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default PropertyDetails;

// import { Link, useParams } from "react-router";
// import Button from "../../components/common/Button";
// import DashboardLayout from "../../components/layout/DashboardLayout";

// const PropertyDetails = () => {
//   const { id } = useParams();

//   return (
//         <DashboardLayout>
//         <div className="property-details-top">
//           <Link to="/dashboard" className="back-link">
//             ← Back to Properties
//           </Link>
//         </div>

//         <div className="property-details-card">
//           <div className="property-gallery">
//             <img
//               src="/assets/images/login-property.jpg"
//               alt="3 BHK Luxury Villa"
//               className="property-main-image"
//             />

//             <div className="property-thumbnails">
//               <img
//                 src="/assets/images/login-property.jpg"
//                 alt="Property view 1"
//               />

//               <img
//                 src="/assets/images/login-property.jpg"
//                 alt="Property view 2"
//               />

//               <img
//                 src="/assets/images/login-property.jpg"
//                 alt="Property view 3"
//               />

//               <img
//                 src="/assets/images/login-property.jpg"
//                 alt="Property view 4"
//               />
//             </div>
//           </div>

//           <div className="property-summary">
//             <div className="property-title-row">
//               <div>
//                 <h1>3 BHK Luxury Villa</h1>
//                 <p className="property-location">
//                   ◉ Indore, Madhya Pradesh
//                 </p>
//               </div>

//               <strong className="property-details-price">
//                 ₹ 68,00,000
//               </strong>
//             </div>

//             <div className="property-info">
//               <div>
//                 <span>Bedrooms</span>
//                 <strong>3 Beds</strong>
//               </div>

//               <div>
//                 <span>Bathrooms</span>
//                 <strong>3 Baths</strong>
//               </div>

//               <div>
//                 <span>Area</span>
//                 <strong>1800 sqft</strong>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="property-description-card">
//           <h2>Property Description</h2>

//           <p>
//             Beautiful 3 BHK luxury villa with modern amenities,
//             spacious rooms, modular kitchen, garden and parking space.
//             Located in prime location of Indore.
//           </p>
//         </div>

//         <div className="property-contact-card">
//           <div>
//             <h2>Interested in this property?</h2>
//             <p>Contact the owner for more information.</p>
//           </div>

//           <Button type="button" variant="primary">
//             Contact Owner
//           </Button>
//         </div>

//     </DashboardLayout>
//   );
// };

// export default PropertyDetails;
