import { Link } from "react-router";
import Button from "../common/Button";
import type { Property } from "../../services/propertyService";

interface PropertyCardProps {
  property: Property;
  showActions?: boolean;
  onDelete?: (propertyId: string) => void;
}

const PropertyCard = ({
  property,
  showActions = false,
  onDelete,
}: PropertyCardProps) => {
  return (
    <article className="my-property-card">
      <Link
        to={`/properties/${property._id}`}
        className="my-property-card-link"
      >
        <div className="my-property-image-wrapper">
          <img
            src={
              property.images?.[0] ||
              "/assets/images/login-property.jpg"
            }
            alt={property.title}
            className="my-property-image"
          />

          <button
            type="button"
            className="my-property-favorite"
            onClick={(event) => event.preventDefault()}
          >
            ♡
          </button>
        </div>

        <div className="my-property-content">
          <h2>{property.title}</h2>

          <strong className="my-property-price">
            ₹ {property.price.toLocaleString("en-IN")}
          </strong>

          <p className="my-property-location">
            ◉ {property.location}, {property.city}
          </p>

          <div className="my-property-meta">
            <span>♧ {property.bedrooms ?? 0} Beds</span>

            <span>♢ {property.bathrooms ?? 0} Baths</span>

            <span>□ {property.area} sqft</span>
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="my-property-actions">
          <Link
            to={`/properties/${property._id}/edit`}
            onClick={(event) => event.stopPropagation()}
          >
            <Button type="button" variant="outline">
              Edit
            </Button>
          </Link>

          <Button
            type="button"
            variant="danger"
            onClick={() => onDelete?.(property._id)}
          >
            Delete
          </Button>
        </div>
      )}
    </article>
  );
};

export default PropertyCard;