
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111118] p-2 rounded-lg border border-white/10">
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-purple-400 text-sm">
          ₹ {payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const CostChart = ({ data }) => {
  return (
    <div className="soft-card">

      <h3 className="mb-4 text-lg text-white">
        Cost Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#222" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="totalCost"
            stroke="#a855f7"
            strokeWidth={3}
            dot={false}
            style={{ filter: "drop-shadow(0px 0px 12px #a855f7)" }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default CostChart;