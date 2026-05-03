import React from "react";

import "@/style/BudgetSection.css"

const BottomSection = ({ services = [], recommendations = [] }) => {

  // 🛡️ Defensive safety
  const safeServices = Array.isArray(services) ? services : [];
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : [];

  return (
    <div className="grid md:grid-cols-2 gap-8">

      {/* SERVICE BREAKDOWN */}
      <div className="soft-card">
        <p className="card-label mb-4">Service Breakdown</p>

        {safeServices.length === 0 ? (
          <p className="text-gray-400 text-sm">No services</p>
        ) : (
          safeServices.map((s, i) => (
            <p key={s.name || i} className="text-gray-300 text-sm">
              {s.name} - ₹{Number(s.value || 0).toLocaleString()}
            </p>
          ))
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="soft-card">
        <p className="card-label mb-4">Recommendations</p>

        {safeRecommendations.length === 0 ? (
          <p className="text-gray-400 text-sm">No insights</p>
        ) : (
          safeRecommendations.map((r, i) => (
            <p key={i} className="text-gray-300 text-sm">
              {r?.message || "No message"}
            </p>
          ))
        )}
      </div>

    </div>
  );
};

export default BottomSection;