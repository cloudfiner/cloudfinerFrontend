



const AnalyticsHeader = ({ currency, setCurrency, days, setDays }) => {
  return (
    <div className="flex-between">

      <div>
        <h1 className="heading-gradient">Analytics</h1>
        <p className="text-muted text-sm">Smart cloud cost insights</p>
      </div>

      <div className="flex gap-3 items-center">

        <div className="pill">
          <button
            onClick={() => setCurrency("INR")}
            className={currency === "INR" ? "pill-active" : ""}
          >
            ₹
          </button>

          <button
            onClick={() => setCurrency("USD")}
            className={currency === "USD" ? "pill-active" : ""}
          >
            $
          </button>
        </div>

        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="dropdown"
        >
          <option value={1}>1d</option>
          <option value={7}>7d</option>
          <option value={30}>30d</option>
          <option value={90}>90d</option>
        </select>

      </div>
    </div>
  );
};

export default AnalyticsHeader;