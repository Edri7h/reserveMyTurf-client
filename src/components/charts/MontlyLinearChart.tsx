// components/charts/MonthlyLineChart.tsx
// "use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyLineChart = () => {
  const data = useSelector((state: RootState) => state.analytics.monthlyStats);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-4 w-full text-center text-gray-500">
        No booking distribution data available.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Monthly Bookings & Earnings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="bookingCount"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Bookings"
          />
          <Line
            type="monotone"
            dataKey="totalEarnings"
            stroke="#8b5cf6"
            strokeWidth={2}
            name="Earnings"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyLineChart;
