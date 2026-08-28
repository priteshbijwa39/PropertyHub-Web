
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Property } from "../../types/property";

interface PropertyTypeChartProps {
  properties: Property[];
}

interface PropertyTypeData {
  type: string;
  count: number;
}

const PropertyTypeChart = ({
  properties,
}: PropertyTypeChartProps) => {
  const propertyTypeData = properties.reduce<PropertyTypeData[]>(
    (accumulator, property) => {
      const type = property.propertyType || "Other";

      const existingType = accumulator.find(
        (item) => item.type === type,
      );

      if (existingType) {
        existingType.count += 1;
      } else {
        accumulator.push({
          type,
          count: 1,
        });
      }

      return accumulator;
    },
    [],
  );

  return (
    <div className="w-full rounded-2xl border border-(--color-gray-200) bg-(--color-white) p-5 sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-(--color-gray-900)">
            Property Type Overview
          </h2>

          <p className="mt-1 text-sm text-(--color-gray-500)">
            Properties by type
          </p>
        </div>
      </div>

      {/* Empty State */}
      {propertyTypeData.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center text-center text-sm text-(--color-gray-500)">
          No property data available.
        </div>
      ) : (
        /* Chart */
        <div className="h-[320px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={propertyTypeData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="type"
                tick={{
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(37, 99, 235, 0.05)",
                }}
              />

              <Bar
                dataKey="count"
                name="Properties"
                radius={[6, 6, 0, 0]}
                barSize={45}
                fill="var(--color-primary)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PropertyTypeChart;

