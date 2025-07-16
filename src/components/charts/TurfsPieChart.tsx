import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6366f1", "#14b8a6"];

const TurfPieChart = () => {
  const data = useSelector((state: RootState) => state.analytics.distributionStats);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-4 w-full text-center text-gray-500">
        No booking distribution data available.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Booking Distribution per Turf</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="bookingCount"
            nameKey="turfName"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TurfPieChart;
