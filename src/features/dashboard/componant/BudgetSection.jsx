const BudgetSection = ({ totalCost, symbol }) => {
  return (
    <div className="soft-card">

      <p className="card-label mb-4">Budget Usage</p>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <h2 className="card-value mt-4">
        {symbol}{totalCost.toLocaleString()}
      </h2>

    </div>
  );
};

export default BudgetSection;