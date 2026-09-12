export type ListingType = "Sale" | "Rent" | "Lease";

export type PropertyCategory =
  | "Residential"
  | "Commercial"
  | "Land"
  | "Hospitality";

export interface PropertyOwner {
  _id: string;
  name: string;
  email: string;
  mobileNumber?: string;
}

export interface Property {
  _id: string;
  propertyNumber?: string | number;
  propertyCode?: string;
  title: string;
  description: string;
  price: number;
  listingType: string;
  propertyCategory: string;
  propertyType: string;
  location: string;
  city: string;
  state: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
  owner: string | {
    _id: string;
    name: string;
    email?: string;
    mobileNumber?: string;
  };
  isFavorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
}