import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { toast } from "../../components/common/Toast";
import { addProperty } from "../../services/propertyService";
import {
  BATHROOM_TYPES,
  BEDROOM_TYPES,
  PROPERTY_TYPES,
} from "../../utils/propertyData";
import type { ListingType, PropertyCategory } from "../../types/property";

interface AddPropertyFormData {
  title: string;
  description: string;
  listingType: ListingType;
  propertyCategory: PropertyCategory;
  propertyType: string;
  price: string;
  location: string;
  city: string;
  state: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
}
const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AddPropertyFormData>({
    title: "",
    description: "",
    listingType: "Sale",
    propertyCategory: "Residential",
    propertyType: "",
    price: "",
    location: "",
    city: "",
    state: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AddPropertyFormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleCategoryChange = (value: PropertyCategory) => {
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
    formData.propertyCategory && formData.propertyCategory in PROPERTY_TYPES
      ? PROPERTY_TYPES[formData.propertyCategory as keyof typeof PROPERTY_TYPES]
      : [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      await addProperty(payload);

      toast.success("Property added successfully!");

      setTimeout(() => {
        navigate("/my-properties");
      }, 500);
    } catch (error) {
      console.error("Add Property Error:", error);

      toast.error(
        "Failed to add property. Please check the details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Add New Property"
      subtitle="Add details of your new property"
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      >
        {/* Property Fields */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {/* Property Title */}
          <Input
            label="Property Title"
            type="text"
            name="title"
            value={formData.title}
            placeholder="e.g. Luxury 3 BHK Apartment in Indore"
            required
            onChange={(event) => handleChange("title", event.target.value)}
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
                handleChange("listingType", event.target.value)
              }
              required
              className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
            >
              <option value="">Select listing type</option>
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
              Property Category <span className="text-red-500">*</span>
            </label>

            <select
              id="propertyCategory"
              value={formData.propertyCategory}
              onChange={(event) =>
                handleCategoryChange(event.target.value as PropertyCategory)
              }
              required
              className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
            >
              <option value="">Select property category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
              <option value="Hospitality">Hospitality</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="propertyType"
              className="text-xs font-semibold text-gray-700"
            >
              Property Type <span className="text-red-500">*</span>
            </label>

            <select
              id="propertyType"
              value={formData.propertyType}
              onChange={(event) => handlePropertyTypeChange(event.target.value)}
              disabled={!formData.propertyCategory}
              required
              className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
            >
              <option value="">
                {formData.propertyCategory
                  ? "Select property type"
                  : "Select category first"}
              </option>

              {availablePropertyTypes.map((propertyType) => (
                <option key={propertyType} value={propertyType}>
                  {propertyType}
                </option>
              ))}
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
            onChange={(event) => handleChange("price", event.target.value)}
          />

          {/* Location */}
          <Input
            label="Location / Locality"
            type="text"
            name="location"
            value={formData.location}
            placeholder="e.g. Vijay Nagar"
            required
            onChange={(event) => handleChange("location", event.target.value)}
          />

          {/* City */}
          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            placeholder="e.g. Indore"
            required
            onChange={(event) => handleChange("city", event.target.value)}
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
              onChange={(event) => handleChange("state", event.target.value)}
              required
              className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
            >
              <option value="">Select state</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
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
            onChange={(event) => handleChange("area", event.target.value)}
          />

          {/* Bedrooms */}
          {showBedrooms && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="bedrooms"
                className="text-xs font-semibold text-gray-700"
              >
                Bedrooms <span className="text-red-500">*</span>
              </label>

              <select
                id="bedrooms"
                value={formData.bedrooms}
                onChange={(event) =>
                  handleChange("bedrooms", event.target.value)
                }
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
              >
                <option value="">Select bedrooms</option>

                {Array.from({ length: 8 }, (_, index) => index + 1).map(
                  (number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "Bedroom" : "Bedrooms"}
                    </option>
                  ),
                )}
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
                Bathrooms <span className="text-red-500">*</span>
              </label>

              <select
                id="bathrooms"
                value={formData.bathrooms}
                onChange={(event) =>
                  handleChange("bathrooms", event.target.value)
                }
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
              >
                <option value="">Select bathrooms</option>

                {Array.from({ length: 8 }, (_, index) => index + 1).map(
                  (number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "Bathroom" : "Bathrooms"}
                    </option>
                  ),
                )}
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
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Describe the property, amenities, nearby facilities, and other important details..."
            rows={5}
            required
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            className="w-full resize-y rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            to="/dashboard"
            className="flex h-11 items-center justify-center rounded-md border border-gray-300 px-6 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </Link>

          <Button type="submit" variant="primary" loading={loading}>
            Add Property
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AddProperty;
