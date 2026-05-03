import "@/style/OptimizationSection.css";

const OptimizationSection = ({ data }) => {

  const savings = data?.potentialSavings || 0;
  const budget = data?.monthlyBudget || 0;
  const insights = data?.insights || [];

  return (
    <div className="grid md:grid-cols-2 gap-8">

      {/* SAVINGS CARD */}
      <div className="premium-card">

        <div className="card-header">
          <p>Optimization Available</p>
          <span className="pulse-dot"></span>
        </div>

        <h2 className="card-value">
          {savings > 0
            ? `₹${Math.round(savings).toLocaleString()}`
            : "--"}
        </h2>

        <p className="card-sub">
          Potential monthly savings
        </p>

        <p className="card-budget">
          Budget: ₹{Math.round(budget).toLocaleString()}
        </p>

        <button className="card-btn">
          Review →
        </button>

      </div>

      {/* INSIGHTS CARD */}
      <div className="premium-card alert">

        {insights.length > 0 ? (
          insights.slice(0, 2).map((item, index) => (
            <div key={index} className="insight-item">

              <p
                className={`insight-type ${
                  item.type === "CRITICAL"
                    ? "red"
                    : item.type === "WARNING"
                    ? "yellow"
                    : "blue"
                }`}
              >
                {item.type || "INFO"}
              </p>

              <p className="insight-text">
                {item.message}
              </p>

            </div>
          ))
        ) : (
          <p className="empty">No insights available</p>
        )}

      </div>

    </div>
  );
};

export default OptimizationSection;