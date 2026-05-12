import { useState, useMemo } from "react";

import "../../style/Dashboard.css";

import Sidebar from "../../shared/Sidebar";

import OptimizationSection from "./componant/OptimizationSection";
import BudgetSection from "./componant/BudgetSection";
import BottomSection from "./componant/BottomSection";
import StatsSection from "./componant/StatsSection";
import DashboardHeader from "./componant/DashboardHeader";

import { useCostData } from "@/hooks/useCostData";

const DemoDashboard = () => {

  const [currency, setCurrency] = useState("INR");
  const [days, setDays] = useState(30);

  const symbol = currency === "USD" ? "$" : "₹";

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useCostData(currency, days);

  const safeData = data || {
    totalCost: 0,
    percentageChange: 0,
    insights: [],
    dailyData: [],
    monthlyBudget: 0,
    potentialSavings: 0,
  };

  const serviceList = useMemo(() => {

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

  if (error) {
    return (
      <div className="app-bg min-h-screen flex items-center justify-center text-red-400">
        {error.message}
      </div>
    );
  }

  return (
    <div className="app-bg flex min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-12">

        <DashboardHeader
          currency={currency}
          setCurrency={setCurrency}
          days={days}
          setDays={setDays}
        />

        {!data && isLoading && (
          <div className="text-center text-gray-400 mt-10">
            Loading demo dashboard...
          </div>
        )}

        {data && isFetching && (
          <div className="text-sm text-gray-400 mt-4">
            Updating demo...
          </div>
        )}

        {data && (
          <div className="space-y-12 mt-8">

            <StatsSection
              totalCost={safeData.totalCost}
              growth={safeData.percentageChange}
              symbol={symbol}
              monthlyBudget={safeData.monthlyBudget}
              potentialSavings={safeData.potentialSavings}
              isDemo={true}
            />

            <OptimizationSection data={safeData} />

            <BudgetSection
              totalCost={safeData.totalCost}
              symbol={symbol}
              monthlyBudget={safeData.monthlyBudget}
            />

            <BottomSection
              services={serviceList}
              recommendations={safeData.insights}
            />

          </div>
        )}

      </div>
    </div>
  );
};

export default DemoDashboard;