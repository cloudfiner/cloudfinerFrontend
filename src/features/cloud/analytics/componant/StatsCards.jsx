// const StatsCards = ({ displayCost, growth, services }) => {
//   return (
//     <div className="grid md:grid-cols-3 gap-6">

//       <div className="soft-card card-hover">
//         <p>Total Cost</p>
//         <h2>₹ {displayCost.toFixed(0)}</h2>
//       </div>

//       <div className="soft-card card-hover">
//         <p>Growth</p>
//         <h2 className={growth>0 ? "text-red-400" : "text-green-400"}>
//           {growth.toFixed(2)}%
//         </h2>
//       </div>

//       <div className="soft-card card-hover">
//         <p>Top Service</p>
//         <h2>{services[0]?.name}</h2>
//       </div>

//     </div>
//   );
// };

// export default StatsCards;

const StatsCards = ({ displayCost, growth, services }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="soft-card card-hover">
        <p className="card-label">Total Cost</p>
        <h2 className="card-value">₹ {displayCost.toFixed(0)}</h2>
      </div>

      <div className="soft-card card-hover">
        <p className="card-label">Growth</p>
        <h2 className={`card-value ${growth > 0 ? "text-red-400" : "text-green-400"}`}>
          {growth.toFixed(2)}%
        </h2>
      </div>

      <div className="soft-card card-hover">
        <p className="card-label">Top Service</p>
        <h2 className="card-value">{services[0]?.name || "—"}</h2>
      </div>

    </div>
  );
};

export default StatsCards;