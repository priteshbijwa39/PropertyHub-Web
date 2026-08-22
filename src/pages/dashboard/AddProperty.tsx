import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { toast } from "../../components/common/Toast";
import { addProperty } from "../../services/propertyService";

interface PropertyForm {
  title: string;
  type: string;
  price: string;
  location: string;
  city: string;
  state: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
}

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PropertyForm>({
    title: "",
    type: "",
    price: "",
    location: "",
    city: "",
    state: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  });

  // const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof PropertyForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setImages(Array.from(event.target.files));
  //   }
  // };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      // console.log("Property Data:", formData);
      // console.log("Property Images:", images);

      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        propertyType: formData.type,
        location: formData.location,
        // city: formData.city,
        // state: formData.state,
        area: Number(formData.area),
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        // images,
      };

      const response = await addProperty(payload);

      console.log("Add Property Response:", response);

      toast.success("Property added successfully!");
      setTimeout(() => {
        navigate("/my-properties");
      }, 1000);
    } catch (error) {
      console.error("Add Property Error:", error);

      toast.error("Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="add-property-header">
        <div>
          <h1>Add New Property</h1>
          <p>Add details of your new property</p>
        </div>
      </div>

      <form className="add-property-form" onSubmit={handleSubmit}>
        <div className="property-form-grid">
          <Input
            label="Property Title"
            type="text"
            name="title"
            value={formData.title}
            placeholder="e.g. Luxury 3 BHK Apartment in Indore"
            required
            onChange={(event) => handleChange("title", event.target.value)}
          />

          <div className="form-field">
            <label htmlFor="type">
              Property Type <span>*</span>
            </label>

            <select
              id="type"
              value={formData.type}
              onChange={(event) => handleChange("type", event.target.value)}
              required
            >
              <option value="">Select property type</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
               {/* <option value="Land">Land</option> */}
            </select>
          </div>

          <Input
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            placeholder="e.g. 5000000"
            required
            onChange={(event) => handleChange("price", event.target.value)}
          />

          <Input
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            placeholder="e.g. Vijay Nagar"
            required
            onChange={(event) => handleChange("location", event.target.value)}
          />

          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            placeholder="e.g. Indore"
            required
            onChange={(event) => handleChange("city", event.target.value)}
          />

          <div className="form-field">
            <label htmlFor="state">
              State <span>*</span>
            </label>

            <select
              id="state"
              value={formData.state}
              onChange={(event) => handleChange("state", event.target.value)}
              required
            >
              <option value="">Select state</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              {/* <option value="Maharashtra">Maharashtra</option>
              <option value="Rajasthan">Rajasthan</option> */}
            </select>
          </div>

          <Input
            label="Area (sqft)"
            type="number"
            name="area"
            value={formData.area}
            placeholder="e.g. 1500"
            required
            onChange={(event) => handleChange("area", event.target.value)}
          />

          <div className="form-field">
            <label htmlFor="bedrooms">Bedrooms</label>

            <select
              id="bedrooms"
              value={formData.bedrooms}
              onChange={(event) => handleChange("bedrooms", event.target.value)}
            >
              <option value="">Select bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
                <option value="4">5 Bedrooms</option>
                  <option value="4">6 Bedrooms</option>
                 
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="bathrooms">Bathrooms</label>

            <select
              id="bathrooms"
              value={formData.bathrooms}
              onChange={(event) =>
                handleChange("bathrooms", event.target.value)
              }
            >
              <option value="">Select bathrooms</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4 Bathrooms</option>
             
            </select>
          </div>
        </div>

        <div className="form-field description-field">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Describe the property, amenities, nearby facilities, and other important details..."
            rows={4}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
          />
        </div>

        {/* <div className="image-upload-field">
          <label>
            Property Images <span>*</span>
          </label>

          <label htmlFor="property-images" className="image-upload-box">
            <div className="upload-icon">♧</div>
            <strong>Click to upload images</strong>
            <span>or drag and drop</span>
          </label>

          <input
            id="property-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          {images.length > 0 && (
            <p className="selected-images">{images.length} image(s) selected</p>
          )}
        </div> */}

        <div className="add-property-actions">
          <Link to="/dashboard" className="cancel-button">
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
