import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { toast } from "../../components/common/Toast";
import {
  getPropertyByIdApi,
  updateProperty,
} from "../../services/propertyService";
import {
  BATHROOM_TYPES,
  BEDROOM_TYPES,
  PROPERTY_TYPES,
} from "../../utils/propertyData";
import type { Property } from "../../types/property";

interface PropertyForm {
  title: string;
  listingType: string;
  propertyCategory: string;
  propertyType: string;
  price: string;
  location: string;
  city: string;
  state: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
}

const EditProperties = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PropertyForm>({
    title: "",
    listingType: "",
    propertyCategory: "",
    propertyType: "",
    price: "",
    location: "",
    city: "",
    state: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        toast.error("Property ID is missing");
        setFetchError(true);
        setFetching(false);
        return;
      }

      try {
        setFetching(true);
        setFetchError(false);

        const response = await getPropertyByIdApi(id);
        const property: Property | undefined = response?.property;

        if (!property) {
          throw new Error("Property details were not returned by the server.");
        }

        setFormData({
          title: property.title ?? "",
          listingType: property.listingType ?? "",
          propertyCategory: property.propertyCategory ?? "",
          propertyType: property.propertyType ?? "",
          price: property.price?.toString() ?? "",
          location: property.location ?? "",
          city: property.city ?? "",
          state: property.state ?? "",
          area: property.area?.toString() ?? "",
          bedrooms: property.bedrooms?.toString() ?? "",
          bathrooms: property.bathrooms?.toString() ?? "",
          description: property.description ?? "",
        });
      } catch (error) {
        console.error("Get Property Error:", error);

        setFetchError(true);
        toast.error("Failed to load property details.");
      } finally {
        setFetching(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (field: keyof PropertyForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      propertyCategory: value,
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
    }));
  };

  const handlePropertyTypeChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      propertyType: value,
      bedrooms: "",
      bathrooms: "",
    }));
  };

  const showBedrooms = BEDROOM_TYPES.includes(
    formData.propertyType as (typeof BEDROOM_TYPES)[number],
  );

  const showBathrooms = BATHROOM_TYPES.includes(
    formData.propertyType as (typeof BATHROOM_TYPES)[number],
  );

  const availablePropertyTypes =
    formData.propertyCategory &&
    formData.propertyCategory in PROPERTY_TYPES
      ? PROPERTY_TYPES[
          formData.propertyCategory as keyof typeof PROPERTY_TYPES
        ]
      : [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      toast.error("Property ID is missing");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),

        listingType: formData.listingType,

        propertyCategory: formData.propertyCategory,
        propertyType: formData.propertyType,

        price: Number(formData.price),

        location: formData.location.trim(),
        city: formData.city.trim(),
        state: formData.state,

        area: Number(formData.area),

        bedrooms:
          showBedrooms && formData.bedrooms
            ? Number(formData.bedrooms)
            : undefined,

        bathrooms:
          showBathrooms && formData.bathrooms
            ? Number(formData.bathrooms)
            : undefined,
      };

      const response = await updateProperty(id, payload);

      console.log("Update Property Response:", response);

      toast.success("Property updated successfully!");

      // Navigate if required
      // navigate("/my-properties");
    } catch (error) {
      console.error("Update Property Error:", error);

      toast.error("Failed to update property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <DashboardLayout
        title="Edit Property"
        subtitle="Update your property details"
      >
        <div className="flex min-h-[300px] items-center justify-center text-sm text-gray-500">
          Loading property details...
        </div>
      </DashboardLayout>
    );
  }

  if (fetchError) {
    return (
      <DashboardLayout
        title="Edit Property"
        subtitle="Update your property details"
      >
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Property details unavailable
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            We could not load this property for editing.
          </p>
          <Link
            to="/my-properties"
            className="mt-5 rounded-lg bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white"
          >
            Back to My Properties
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
<DashboardLayout
  title="Edit Property"
  subtitle="Update your property details"
>
  <button
    type="button"
    onClick={() => {
      if (window.history.length > 1) {
        navigate(-1);
        return;
      }

      navigate("/my-properties");
    }}
    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) transition hover:opacity-75"
  >
    <ArrowLeft size={17} />
    Back to properties
  </button>

  <div className="w-full">

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
    >
      {/* Property Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Property Title */}
        <Input
          label="Property Title"
          type="text"
          name="title"
          value={formData.title}
          placeholder="e.g. Luxury 3 BHK Apartment in Indore"
          required
          onChange={(event) =>
            handleChange("title", event.target.value)
          }
        />

        {/* Listing Type */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="listingType"
            className="text-xs font-semibold text-gray-700"
          >
            Listing Type <span className="text-red-500">*</span>
          </label>

          <select
            id="listingType"
            value={formData.listingType}
            onChange={(event) =>
              handleChange(
                "listingType",
                event.target.value
              )
            }
            required
            className="h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
          >
            <option value="">
              Select listing type
            </option>

            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
            <option value="Lease">Lease</option>
          </select>
        </div>

        {/* Property Category */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="propertyCategory"
            className="text-xs font-semibold text-gray-700"
          >
            Property Category{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            id="propertyCategory"
            value={formData.propertyCategory}
            onChange={(event) =>
              handleCategoryChange(event.target.value)
            }
            required
            className="h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
          >
            <option value="">
              Select property category
            </option>

            <option value="Residential">
              Residential
            </option>

            <option value="Commercial">
              Commercial
            </option>

            <option value="Land">Land</option>

            <option value="Hospitality">
              Hospitality
            </option>
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="propertyType"
            className="text-xs font-semibold text-gray-700"
          >
            Property Type{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            id="propertyType"
            value={formData.propertyType}
            onChange={(event) =>
              handlePropertyTypeChange(
                event.target.value
              )
            }
            disabled={!formData.propertyCategory}
            required
            className="h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">
              {formData.propertyCategory
                ? "Select property type"
                : "Select category first"}
            </option>

            {availablePropertyTypes.map(
              (propertyType) => (
                <option
                  key={propertyType}
                  value={propertyType}
                >
                  {propertyType}
                </option>
              )
            )}
          </select>
        </div>

        {/* Price */}
        <Input
          label={
            formData.listingType === "Rent"
              ? "Rent Amount"
              : formData.listingType === "Lease"
                ? "Lease Amount"
                : "Price"
          }
          type="number"
          name="price"
          value={formData.price}
          placeholder="e.g. 5000000"
          required
          min="0"
          onChange={(event) =>
            handleChange("price", event.target.value)
          }
        />

        {/* Location */}
        <Input
          label="Location / Locality"
          type="text"
          name="location"
          value={formData.location}
          placeholder="e.g. Vijay Nagar"
          required
          onChange={(event) =>
            handleChange(
              "location",
              event.target.value
            )
          }
        />

        {/* City */}
        <Input
          label="City"
          type="text"
          name="city"
          value={formData.city}
          placeholder="e.g. Indore"
          required
          onChange={(event) =>
            handleChange("city", event.target.value)
          }
        />

        {/* State */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="state"
            className="text-xs font-semibold text-gray-700"
          >
            State <span className="text-red-500">*</span>
          </label>

          <select
            id="state"
            value={formData.state}
            onChange={(event) =>
              handleChange(
                "state",
                event.target.value
              )
            }
            required
            className="h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
          >
            <option value="">Select state</option>

            <option value="Madhya Pradesh">
              Madhya Pradesh
            </option>
          </select>
        </div>

        {/* Area */}
        <Input
          label="Area (sq ft)"
          type="number"
          name="area"
          value={formData.area}
          placeholder="e.g. 1500"
          required
          min="0"
          onChange={(event) =>
            handleChange("area", event.target.value)
          }
        />

        {/* Bedrooms */}
        {showBedrooms && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="bedrooms"
              className="text-xs font-semibold text-gray-700"
            >
              Bedrooms{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              id="bedrooms"
              value={formData.bedrooms}
              onChange={(event) =>
                handleChange(
                  "bedrooms",
                  event.target.value
                )
              }
              required
              className="h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            >
              <option value="">
                Select bedrooms
              </option>

              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5 Bedrooms</option>
              <option value="6">6 Bedrooms</option>
              <option value="7">7 Bedrooms</option>
              <option value="8">8 Bedrooms</option>
            </select>
          </div>
        )}

        {/* Bathrooms */}
        {showBathrooms && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="bathrooms"
              className="text-xs font-semibold text-gray-700"
            >
              Bathrooms{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              id="bathrooms"
              value={formData.bathrooms}
              onChange={(event) =>
                handleChange(
                  "bathrooms",
                  event.target.value
                )
              }
              required
              className="h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            >
              <option value="">
                Select bathrooms
              </option>

              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4 Bathrooms</option>
              <option value="5">5 Bathrooms</option>
              <option value="6">6 Bathrooms</option>
              <option value="7">7 Bathrooms</option>
              <option value="8">8 Bathrooms</option>
            </select>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mt-5 flex flex-col gap-1.5">
        <label
          htmlFor="description"
          className="text-xs font-semibold text-gray-700"
        >
          Description{" "}
          <span className="text-red-500">*</span>
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="Describe the property, amenities, nearby facilities, and other important details..."
          rows={5}
          required
          onChange={(event) =>
            handleChange(
              "description",
              event.target.value
            )
          }
          className="w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        <Link
          to="/my-properties"
          className="flex h-[42px] min-w-[140px] items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-semibold text-gray-700 no-underline transition hover:bg-gray-50"
        >
          Cancel
        </Link>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          Update Property
        </Button>
      </div>
    </form>
  </div>
</DashboardLayout>
  );
};

export default EditProperties;