import {
  LineChart, Line, XAxis, YAxis, Tooltip
} from "recharts";

const CostChart = ({ data }) => {

  return (
    <div className="bg-white/5 p-4 rounded-xl">

      <h2 className="mb-3">Cost Analytics</h2>

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cost" />
      </LineChart>

    </div>
  );
};

export default CostChart;