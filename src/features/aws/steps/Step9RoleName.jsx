import step8img from "@/assets/pointToAddRole.png";

const Step9RoleName = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Enter Your Role Name</h2>

    <img src={step8img} className="rounded-xl border border-gray-700" />

    <p className="text-gray-400 text-sm">
      Example: <b>cloudCostRole</b>
    </p>
  </div>
);

export default Step9RoleName;