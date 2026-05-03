// const StatsSection = ({ totalCost, growth, symbol, monthlyBudget, potentialSavings }) => {

//   const budget = monthlyBudget || 0;
//   const savings = potentialSavings || 0;

//   // 🔥 remaining budget
//   const remaining = budget - totalCost;

//   return (
//     <div className="grid md:grid-cols-3 gap-8">

//       {/* 🔥 TOTAL SPEND */}
//       <div className="soft-card">
//         <p className="card-label">Total Spend</p>

//         <h2 className="card-value">
//           {symbol}{Math.round(totalCost || 0).toLocaleString()}
//         </h2>

//         <p className="text-green-400 text-sm mt-2">
//           +{growth || 0}% vs last period
//         </p>
//       </div>

//       {/* 🔥 MONTHLY BUDGET */}
//       <div className="soft-card">
//         <p className="card-label">Monthly Budget</p>

//         <h2 className="card-value">
//           {symbol}{Math.round(budget).toLocaleString()}
//         </h2>

//         <p className="text-gray-400 text-sm mt-2">
//           {symbol}{Math.round(remaining).toLocaleString()} remaining
//         </p>
//       </div>

//       {/* 🔥 SAVINGS */}
//       <div className="soft-card">
//         <p className="card-label">Potential Savings</p>

//         <h2 className="card-value text-purple-400">
//           {savings > 0
//             ? `${symbol}${Math.round(savings).toLocaleString()}`
//             : "--"}
//         </h2>

//         <p className="text-gray-400 text-sm mt-2">
//           Smart optimization detected
//         </p>
//       </div>

//     </div>
//   );
// };

// export default StatsSection;















const StatsSection = ({
  totalCost,
  growth,
  symbol,
  monthlyBudget,
  potentialSavings,
  isDemo // 🔥 NEW PROP
}) => {

  const budget = monthlyBudget || 0;
  const savings = potentialSavings || 0;
  const remaining = budget - totalCost;

  return (
    <div className="grid md:grid-cols-3 gap-8">

      {/* 🔥 TOTAL SPEND */}
      <div className="soft-card relative">
        <p className="card-label">Total Spend</p>

        {isDemo && (
          <span className="absolute top-3 right-3 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
            Demo
          </span>
        )}

        <h2 className="card-value">
          {symbol}{Math.round(totalCost || 0).toLocaleString()}
        </h2>

        <p className="text-green-400 text-sm mt-2">
          +{growth || 0}% vs last period
        </p>
      </div>

      {/* 🔥 MONTHLY BUDGET */}
      <div className="soft-card relative">
        <p className="card-label">Monthly Budget</p>

        {isDemo && (
          <span className="absolute top-3 right-3 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
            Demo
          </span>
        )}

        <h2 className="card-value">
          {symbol}{Math.round(budget).toLocaleString()}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          {symbol}{Math.round(remaining).toLocaleString()} remaining
        </p>
      </div>

      {/* 🔥 SAVINGS */}
      <div className="soft-card relative">
        <p className="card-label">Potential Savings</p>

        {isDemo && (
          <span className="absolute top-3 right-3 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
            Demo
          </span>
        )}

        <h2 className="card-value text-purple-400">
          {savings > 0
            ? `${symbol}${Math.round(savings).toLocaleString()}`
            : "--"}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          {isDemo ? "Sample optimization data" : "Smart optimization detected"}
        </p>
      </div>

    </div>
  );
};

export default StatsSection;