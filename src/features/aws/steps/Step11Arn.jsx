import step10img from "@/assets/pointToAddArn.png";

const Step11Arn = ({ roleArn, setRoleArn }) => (
  <div className="space-y-4">

    <h2 className="text-lg font-semibold">Copy Arn and Paste in the field given below</h2>

    <img src={step10img} className="rounded-xl border border-gray-700" />

    <input
      value={roleArn}
      onChange={(e) => setRoleArn(e.target.value)}
      placeholder="arn:aws:iam::123456789012:role/your-role"
      className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-xl text-sm"
    />

  </div>
);

export default Step11Arn;