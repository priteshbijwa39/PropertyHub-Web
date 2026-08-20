import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Property } from "../../services/propertyService";

interface PropertyTypeChartProps {
  properties: Property[];
}

const PropertyTypeChart = ({
  properties,
}: PropertyTypeChartProps) => {
  const propertyTypeData = properties.reduce(
    (acc, property) => {
      const type = property.propertyType || "Other";

      const existing = acc.find(
        (item) => item.type === type
      );

      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          type,
          count: 1,
        });
      }

      return acc;
    },
    [] as { type: string; count: number }[]
  );

  return (
    <div className="dashboard-chart-card">
      <div className="dashboard-chart-header">
        <div>
          <h2>Property Type Overview</h2>
          <p>Properties by type</p>
        </div>
      </div>

      {propertyTypeData.length === 0 ? (
        <div className="dashboard-chart-empty">
          No property data available.
        </div>
      ) : (
        <div className="dashboard-chart-wrapper">
          <ResponsiveContainer
            width="100%"
            height={320}
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
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(37, 99, 235, 0.05)" }}
              />

              <Bar
                dataKey="count"
                name="Properties"
                radius={[6, 6, 0, 0]}
                barSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PropertyTypeChart;