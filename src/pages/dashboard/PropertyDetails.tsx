import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getPropertyByIdApi } from "../../services/propertyService";
import { toast } from "../../components/common/Toast";
import { BATHROOM_TYPES, BEDROOM_TYPES } from "../../utils/propertyData";
import type { Property } from "../../types/property";
import { getTimeAgo } from "../../utils/helpers";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { getPropertyReference } from "../../utils/propertyReference";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProperty = async () => {
    if (!id) {
      toast.error("Property ID not found");
      setLoading(false);
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
      <DashboardLayout title="">
        <div className="properties-loading">Loading property...</div>
      </DashboardLayout>
    );
  }

  if (!property) {
    return (
      <DashboardLayout title="Property Details">
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

  /*
   * Show bedrooms/bathrooms only for property types
   * that require these fields.
   */
  const showBedrooms = BEDROOM_TYPES.includes(
    property.propertyType as (typeof BEDROOM_TYPES)[number],
  );

  const showBathrooms = BATHROOM_TYPES.includes(
    property.propertyType as (typeof BATHROOM_TYPES)[number],
  );

  // const owner =
  //   typeof property.owner === "object" && property.owner !== null
  //     ? property.owner
  //     : null;
  const handleContactOwner = () => {
    // if (!owner?.mobileNumber) {
    //   toast.error("Owner mobile number is not available.");
    //   return;
    // }

    window.location.href = `tel:${"961-796-5515"}`;
  };
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/dashboard");
  };

  return (
  <DashboardLayout title="Property Details">
  <button
    type="button"
    onClick={handleBack}
    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition hover:opacity-75"
  >
    <ArrowLeft size={17} />
    Back to properties
  </button>

  {/* Main Property Card */}
  <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:grid-cols-[1.4fr_1fr] lg:p-6">
    {/* Property Gallery */}
    <div className="min-w-0">
      <img
        src={
          property.images?.[0] ||
          "/assets/images/login-property.jpg"
        }
        alt={property.title}
        className="h-[330px] w-full rounded-lg object-cover"
      />

      {property.images && property.images.length > 0 && (
        <div className="mt-2.5 grid grid-cols-4 gap-2.5">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property view ${index + 1}`}
              className="h-[70px] w-full cursor-pointer rounded-md object-cover transition-opacity hover:opacity-80"
            />
          ))}
        </div>
      )}
    </div>

    {/* Property Summary */}
    <div className="flex flex-col justify-center">
      <div className="flex flex-col">
        <span className="mb-2 w-fit rounded-md bg-(--color-primary-light) px-2.5 py-1 text-xs font-semibold tracking-wide text-(--color-primary)">
          Property ID: {getPropertyReference(property)}
        </span>

        <h1 className="text-2xl font-bold text-gray-900">
          {property.title}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          ◉ {property.location}
          {property.city && `, ${property.city}`}
          {property.state && `, ${property.state}`}
        </p>
         {property.createdAt && (
    <p className="mt-1 text-xs text-gray-400">
      Listed {getTimeAgo(property.createdAt)}
    </p>
  )}
      </div>

      {/* Price */}
      <strong className="mt-6 text-xl font-bold text-(--color-primary)">
        ₹ {property.price.toLocaleString("en-IN")}
      </strong>

      {/* Property Basic Information */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
        {/* Listing Type */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-500">
            Listing Type
          </span>

          <strong className="text-sm text-gray-900">
            {property.listingType || "N/A"}
          </strong>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-500">
            Category
          </span>

          <strong className="text-sm text-gray-900">
            {property.propertyCategory || "N/A"}
          </strong>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-500">
            Property Type
          </span>

          <strong className="text-sm text-gray-900">
            {property.propertyType || "N/A"}
          </strong>
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-500">
            Area
          </span>

          <strong className="text-sm text-gray-900">
            {property.area?.toLocaleString("en-IN")} sqft
          </strong>
        </div>

        {/* Bedrooms */}
        {showBedrooms && property.bedrooms != null && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-500">
              Bedrooms
            </span>

            <strong className="text-sm text-gray-900">
              {property.bedrooms}{" "}
              {property.bedrooms === 1
                ? "Bedroom"
                : "Bedrooms"}
            </strong>
          </div>
        )}

        {/* Bathrooms */}
        {showBathrooms && property.bathrooms != null && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-500">
              Bathrooms
            </span>

            <strong className="text-sm text-gray-900">
              {property.bathrooms}{" "}
              {property.bathrooms === 1
                ? "Bathroom"
                : "Bathrooms"}
            </strong>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Property Description */}
  <div className="mt-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
    <h2 className="text-base font-bold text-gray-900">
      Property Description
    </h2>

    <p className="mt-2.5 max-w-[900px] text-sm leading-7 text-gray-500">
      {property.description || "No description available."}
    </p>
  </div>

  {/* Contact Owner */}
  <div className="mt-4 flex flex-col gap-6 rounded-xl bg-white p-5 shadow-sm md:p-6 lg:flex-row lg:items-center lg:justify-between">
    {/* Contact CTA */}
    <div>
      <h2 className="text-base font-bold text-gray-900">
        Interested in this property?
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Contact the broker to get more information, check availability, discuss pricing, or schedule a site visit.
      </p>

      <p className="mt-2 text-xs font-medium text-(--color-primary)">
        Mention {getPropertyReference(property)} when you call.
      </p>

      <Button
        type="button"
        variant="primary"
        onClick={handleContactOwner}
        className="mt-4 min-w-[160px]"
      >
        Call Broker
      </Button>
    </div>

    {/* Owner Details */}
    <div className="w-full rounded-lg border border-gray-100 bg-gray-50 p-4 lg:w-auto lg:min-w-[280px]">
      {/* {owner ? ( */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-900">
            {/* {owner.name || "Property Owner"} */}
              {"Shailesh bijwa"}
          </h3>

          {/* {owner.email && ( */}
            <p className="mt-1 text-sm text-gray-500">
              {/* {owner.email} */}
              {"shaileshbijwa@gmail.com"}
            </p>
          {/* )} */}

          {/* {owner.mobileNumber && ( */}
            <p className="mt-1 text-sm text-gray-500">
              {/* {owner.mobileNumber} */}
              {"961-796-5515"}
            </p>
          {/* )} */}
        </div>
      {/* ) : (
        <p className="text-sm text-gray-500">
          Owner details are not available.
        </p>
      )} */}
    </div>
  </div>
</DashboardLayout>
  );
};

export default PropertyDetails;
