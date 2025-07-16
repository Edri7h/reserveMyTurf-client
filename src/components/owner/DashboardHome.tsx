import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../../lib/axios"; // Adjust relative path if needed
import { setMonthlyStats, setDistributionStats } from "../../redux/slice/analyticsSlice";
import { toast } from "sonner";
import MonthlyLineChart from "../charts/MontlyLinearChart";
import TurfPieChart from "../charts/TurfsPieChart";

const DashboardHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [monthlyRes, distRes] = await Promise.all([
          axiosClient.get("/api/owner/analytics/monthly"),
          axiosClient.get("/api/owner/analytics/distribution"),
        ]);

        dispatch(setMonthlyStats(monthlyRes.data.data));
        dispatch(setDistributionStats(distRes.data.data));
      } catch (error) {
        toast.error("Failed to fetch analytics");
        console.error(error);
      }
    };

    fetchAnalytics();
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyLineChart />
        <TurfPieChart />
      </div>
    </div>
  );
};

export default DashboardHome;
