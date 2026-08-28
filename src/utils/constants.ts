import { Building, Heart, Home, LayoutDashboard, PlusCircle } from "lucide-react";

export const APP_NAME = "PropertyHub";

export const PROPERTY_TYPES = [
  "House",
  "Villa",
  "Apartment",
  "Flat",
  "Plot",
  "Land",
  "Commercial",
  "Office",
  "Shop",
  "Other",
] as const;

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROPERTIES: "/dashboard/properties",
  PROPERTY_DETAILS: "/dashboard/property",
  ADD_PROPERTY: "/dashboard/add-property",
  EDIT_PROPERTY: "/dashboard/edit-property",
  MY_PROPERTIES: "/dashboard/my-properties",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "propertyhub_token",
  USER: "propertyhub_user",
} as const;

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;


export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "All Properties",
    href: "/all-properties",
    icon: Building,
  },
  {
    label: "My Properties",
    href: "/my-properties",
    icon: Home,
  },
  {
    label: "Add Property",
    href: "/add-property",
    icon: PlusCircle,
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
];