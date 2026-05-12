


import { useState, useMemo } from "react";
import Sidebar from "../../../shared/Sidebar";

import StatusCards from "./componant/StatusCards";
import StatsCards from "./componant/StatsCards";
import CostChart from "./componant/CostChart";
import AIInsights from "./componant/AIInsights";
import AnalyticsHeader from "./componant/AnalyticsHeader";
import TelegramPreview from "./componant/TelegramPreview";

import { useCostData } from "@/hooks/useCostData";
import { useAuth } from "@/context/AuthContext";

const Analytics = () => {

  const [currency, setCurrency] = useState("INR");
  const [days, setDays] = useState(7);

  const { token } = useAuth();
  const isDemo = !token;

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useCostData(currency, days);

  // =========================
  // SAFE DATA
  // =========================
  const safeData = data || {
    totalCost: 0,
    percentageChange: 0,
    insights: [],
    dailyData: [],
  };

  const totalCost = safeData.totalCost;
  const growth = safeData.percentageChange;
  const insights = safeData.insights;

  const displayCost = totalCost;

  // =========================
  // CHART DATA
  // =========================
  const chartData = useMemo(() => {
    return (safeData.dailyData || []).map((day) => {
      let total = 0;

      (day.services || []).forEach((s) => {
        total += Number(s.cost) || 0;
      });

      return {
        date: day.date,
        totalCost: Number(total.toFixed(2)),
      };
    });
  }, [safeData.dailyData]);

  // =========================
  // SERVICE BREAKDOWN
  // =========================
  const services = useMemo(() => {
    const map = {};

    (safeData.dailyData || []).forEach((day) => {
      (day.services || []).forEach((s) => {
        const cost = Number(s.cost) || 0;
        map[s.service] = (map[s.service] || 0) + cost;
      });
    });

    return Object.keys(map).map((k) => ({
      name: k,
      value: Number(map[k].toFixed(2)),
    }));
  }, [safeData.dailyData]);

  const isLowUsage =
    chartData.length > 0 && chartData.every((d) => d.totalCost < 1);

  // =========================
  // ERROR STATE
  // =========================
  if (error) {
    return (
      <div className="app-bg flex min-h-screen text-red-400 items-center justify-center">
        {error.message}
      </div>
    );
  }

  // =========================
  // MAIN UI (NO BLOCKING)
  // =========================
  return (
    <div className="app-bg flex min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-12 space-y-10">

        <AnalyticsHeader
          currency={currency}
          setCurrency={setCurrency}
          days={days}
          setDays={setDays}
        />

        <StatusCards growth={growth} />

        {/* Initial lightweight loader (only when no data) */}
        {!data && isLoading && (
          <div className="space-y-4">
            <div className="h-24 bg-white/5 rounded-xl animate-pulse"></div>
            <div className="h-72 bg-white/5 rounded-xl animate-pulse"></div>
          </div>
        )}

        {/* Background refresh indicator */}
        {data && isFetching && (
          <div className="text-sm text-gray-400">Refreshing...</div>
        )}

        {/* MAIN CONTENT */}
        {data && (
          <>
            <StatsCards
              displayCost={displayCost}
              growth={growth}
              services={services}
              isDemo={isDemo}
            />

            <CostChart data={chartData} />

            {isLowUsage && (
              <p className="text-center text-gray-400 text-sm mt-4">
                No significant usage detected
              </p>
            )}

            <AIInsights insights={insights} />

            <TelegramPreview />
          </>
        )}

      </div>
    </div>
  );
};

export default Analytics;