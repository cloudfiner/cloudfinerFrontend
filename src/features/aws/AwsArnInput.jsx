// src/features/cloud/aws/AwsArnInput.jsx

import { useState } from "react";
import { connectAws } from "./AwsService";

const AwsArnInput = () => {
  const [roleArn, setRoleArn] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleConnect = async () => {
    try {
      setLoading(true);

      const res = await connectAws(roleArn);

      setSuccess(res.message || "Connected Successfully");
    } catch (err) {
      alert("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="soft-card p-6 space-y-4">

      <h3 className="text-lg font-semibold">Paste Role ARN</h3>

      <input
        value={roleArn}
        onChange={(e) => setRoleArn(e.target.value)}
        placeholder="arn:aws:iam::123456789012:role/your-role"
        className="w-full p-3 bg-black/40 border border-gray-700 rounded-xl"
      />

      <button
        onClick={handleConnect}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Connecting..." : "Connect AWS"}
      </button>

      {success && (
        <p className="text-green-400 text-sm">{success}</p>
      )}
    </div>
  );
};

export default AwsArnInput;