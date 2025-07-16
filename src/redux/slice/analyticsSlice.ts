// src/redux/slices/analyticsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MonthlyStat {
  month: string;
  bookingCount: number;
  totalEarnings: number;
}

interface DistributionStat {
  turfName: string;
  bookingCount: number;
}

interface AnalyticsState {
  monthlyStats: MonthlyStat[];
  distributionStats: DistributionStat[];
}

const initialState: AnalyticsState = {
  monthlyStats: [],
  distributionStats: [],
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setMonthlyStats(state, action: PayloadAction<MonthlyStat[]>) {
      state.monthlyStats = action.payload;
    },
    setDistributionStats(state, action: PayloadAction<DistributionStat[]>) {
      state.distributionStats = action.payload;
    },
  },
});

export const { setMonthlyStats, setDistributionStats } = analyticsSlice.actions;
export default analyticsSlice.reducer;
