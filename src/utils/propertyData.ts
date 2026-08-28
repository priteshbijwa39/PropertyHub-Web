
export const PROPERTY_TYPES = {
  Residential: [
    "House",
    "Villa",
    "Apartment",
    "Penthouse",
    "Studio Apartment",
    "Duplex",
    "Builder Floor",
    "Farmhouse",
  ],
  Commercial: [
    "Shop",
    "Showroom",
    "Office Space",
    "Co-working Space",
    "Warehouse",
    "Industrial Shed",
  ],
  Land: [
    "Residential Plot",
    "Commercial Land",
    "Agricultural Land",
    "Industrial Land",
  ],
  Hospitality: [
    "Hotel / Resort",
    "Guest House",
    "Paying Guest",
  ],
} as const;

export const BEDROOM_TYPES = [
  "House",
  "Villa",
  "Apartment",
  "Penthouse",
  "Duplex",
  "Builder Floor",
  "Farmhouse",
];

export const BATHROOM_TYPES = [
  "House",
  "Villa",
  "Apartment",
  "Penthouse",
  "Studio Apartment",
  "Duplex",
  "Builder Floor",
  "Farmhouse",
];




export const PROPERTY_CATEGORIES = [
  "Residential",
  "Commercial",
  "Land",
  "Hospitality",
] as const;

export const LISTING_TYPES = [
  "Sale",
  "Rent",
  "Lease",
] as const;

export const PRICE_RANGES = [
  {
    value: "all",
    label: "All Prices",
  },
  {
    value: "below-50",
    label: "Below ₹50 Lakh",
    min: 0,
    max: 5000000,
  },
  {
    value: "50-100",
    label: "₹50 Lakh - ₹1 Cr",
    min: 5000000,
    max: 10000000,
  },
  {
    value: "above-100",
    label: "Above ₹1 Cr",
    min: 10000000,
  },
] as const;



