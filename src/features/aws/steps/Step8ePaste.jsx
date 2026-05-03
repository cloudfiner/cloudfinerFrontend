import { useState } from "react";
import { useNotification } from "@/features/notifications/useNotification";
import jsonImg from "@/assets/pointingToPolicyEditor.png";

const STATIC_POLICY = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:GetCostAndUsage",
        "ce:GetDimensionValues",
        "ce:GetCostForecast",
        "ce:GetReservationUtilization",
        "ce:GetSavingsPlansUtilization"
      ],
      "Resource": "*"
    }
  ]
}`;

const Step8ePaste = () => {

  const [copied, setCopied] = useState(false);
  const { addToast } = useNotification();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(STATIC_POLICY);

      setCopied(true);

      addToast?.({
        message: "Policy copied!",
        priority: "success"
      });

      setTimeout(() => setCopied(false), 2000);

    } catch (err) {
      addToast?.({
        message: "Copy failed",
        priority: "error"
      });
    }
  };

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-semibold">
       copy the policy give below in the policy editor
      </h2>
      <p>Delete existing content and replace it with the copied policy</p>

      

      {/* Image */}
      <div className="mt-2">
        <img
          src={jsonImg}
          alt="Pointing to JSON tab"
          className="rounded-lg border border-gray-700 shadow-md"
        />
      </div>

      <button
        onClick={handleCopy}
        className={`px-3 py-1 text-sm rounded border transition
          ${copied 
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-blue-500/10 border-blue-500/20 text-blue-400"
          }`}
      >
        {copied ? "Copied " : "Copy Policy"}
      </button>

      <div className="bg-black/40 p-3 rounded text-xs text-gray-300 max-h-52 overflow-auto whitespace-pre-wrap">
        {STATIC_POLICY}
      </div>

      <p >
        After coping policy, click <b>Next</b> 
      </p>

    </div>
  );
};

export default Step8ePaste;