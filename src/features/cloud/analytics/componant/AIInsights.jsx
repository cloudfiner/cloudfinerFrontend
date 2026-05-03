const AIInsights = ({ insights }) => {
  return (
    <div className="soft-card">

      <h3 className="mb-4 text-lg"> AI Insights</h3>

      {insights.map((ins, i) => (
        <div
          key={i}
          className="bg-purple-500/10 border border-purple-400/30 p-3 rounded-lg mb-2"
        >
          <p>💡 {ins.message}</p>
          <p className="text-sm text-gray-400">{ins.type}</p>
          <p className="text-sm text-gray-500">{ins.service}</p>
        </div>
      ))}

    </div>
  );
};

export default AIInsights;