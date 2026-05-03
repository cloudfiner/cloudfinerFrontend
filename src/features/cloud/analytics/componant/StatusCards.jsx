// const StatusCards = ({ growth }) => {

//   const health = Math.max(40, 100 - growth * 5);

//   return (
//     <div className="flex gap-6">

//       <div className="soft-card flex-1 card-hover">
//         🟢 WhatsApp Alerts Connected
//         <div className="text-sm text-gray-400">Last alert: 2 min ago</div>
//       </div>

//       <div className="soft-card flex-1 card-hover">
//         💡 Cloud Health Score
//         <div className="text-2xl mt-2">{health.toFixed(0)}/100</div>
//       </div>

//     </div>
//   );
// };

// export default StatusCards;



const StatusCards = ({ growth }) => {

  const health = Math.max(40, 100 - growth * 5);

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="soft-card card-hover flex-between">
        <div>
          <div className="text-sm text-gray-400">Alerts</div>
          <div className="text-lg">🟢 Telegram Connected</div>
          <div className="text-xs text-gray-500 mt-1">
            Last alert: 2 min ago
          </div>
        </div>

        <div className="text-3xl">📡</div>
      </div>

      <div className="soft-card card-hover flex-between">
        <div>
          <div className="text-sm text-gray-400">Cloud Health</div>
          <div className="text-2xl mt-1">{health.toFixed(0)}/100</div>
        </div>

        <div className="text-3xl">💡</div>
      </div>

    </div>
  );
};

export default StatusCards;