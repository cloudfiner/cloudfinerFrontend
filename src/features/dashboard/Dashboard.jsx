


import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../shared/Sidebar";

import "../../style/Dashboard.css";
import OptimizationSection from "./componant/OptimizationSection";
import BudgetSection from "./componant/BudgetSection";
import BottomSection from "./componant/BottomSection";
import StatsSection from "./componant/StatsSection";
import DashboardHeader from "./componant/DashboardHeader";
import AlertPage from "../cloud/alert/AlertPage";
import BudgetInput from "./componant/BudgetInput";

import { useCostData } from "@/hooks/useCostData";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {

  const navigate = useNavigate();

  const [currency, setCurrency] = useState("INR");
  const [days, setDays] = useState(30);

  const { token } = useAuth();
  const isDemo = !token;

  const symbol = currency === "USD" ? "$" : "₹";

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCostData(currency, days);

  // =========================
  // SAFE DATA (no crash)
  // =========================
  const safeData = data || {
    totalCost: 0,
    percentageChange: 0,
    insights: [],
    dailyData: [],
    monthlyBudget: 0,
    potentialSavings: 0,
  };

  const totalCost = safeData.totalCost;
  const growth = safeData.percentageChange;
  const insights = safeData.insights;
  const monthlyBudget = safeData.monthlyBudget;
  const potentialSavings = safeData.potentialSavings;

  // =========================
  // SERVICE BREAKDOWN (memo)
  // =========================
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

      <div className="flex-1 p-12 space-y-12">

        <DashboardHeader
          currency={currency}
          setCurrency={setCurrency}
          days={days}
          setDays={setDays}
        />

        {/* Initial lightweight loader only if no data */}
        {!data && isLoading && (
          <div className="text-center text-gray-400">
            Loading dashboard...
          </div>
        )}

        {/* Background refresh indicator */}
        {data && isFetching && (
          <div className="text-sm text-gray-400">
            Updating data...
          </div>
        )}

        {/* MAIN CONTENT */}
        {data && (
          <>
            <BudgetInput onSaved={refetch} />

            <StatsSection
              totalCost={totalCost}
              growth={growth}
              symbol={symbol}
              monthlyBudget={monthlyBudget}
              potentialSavings={potentialSavings}
              isDemo={isDemo}
            />

            <OptimizationSection data={safeData} />

            <AlertPage />

            <BudgetSection
              totalCost={totalCost}
              symbol={symbol}
              monthlyBudget={monthlyBudget}
            />

            <BottomSection
              services={serviceList}
              recommendations={insights}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;