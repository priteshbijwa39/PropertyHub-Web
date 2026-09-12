import type { Property } from "../types/property";

export const getPropertyReference = (property: Pick<Property, "_id" | "propertyNumber" | "propertyCode">) => {
  if (property.propertyNumber !== undefined) {
    return String(property.propertyNumber).startsWith("PH-")
      ? String(property.propertyNumber)
      : `PH-${property.propertyNumber}`;
  }

  if (property.propertyCode) {
    return property.propertyCode.startsWith("PH-")
      ? property.propertyCode
      : `PH-${property.propertyCode}`;
  }

  return `PH-${property._id.slice(-6).toUpperCase()}`;
};
