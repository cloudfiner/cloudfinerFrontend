import { useState, useEffect } from "react";
import { useNotification } from "@/features/notifications/useNotification";
import step6 from "@/assets/pointtoaccointid.png";

const Step7Credentials = ({
  accountId,
  externalId,
  policy,
  showPolicy,
  setShowPolicy
}) => {

  const { addToast } = useNotification();

  const [copiedField, setCopiedField] = useState(null);

  const safeShowPolicy = showPolicy ?? false;
  const safeSetShowPolicy = setShowPolicy ?? (() => {});

  const handleCopy = async (text, label, field) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedField(field);

      addToast({
        message: `${label} copied!`,
        priority: "success"
      });

    } catch {
      addToast({
        message: "Copy failed",
        priority: "error"
      });
    }
  };

  // ✅ AUTO RESET (stable)
  useEffect(() => {
    if (!copiedField) return;

    const timer = setTimeout(() => {
      setCopiedField(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copiedField]);

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-semibold">
        Choose Another Aws Account
      
      </h2>
     <p>
       copy and Paste Account ID & External ID Given Below
     </p>
      <img
        src={step6}
        alt="Account ID and External ID"
        className="rounded-xl border border-gray-700"
      />

      {/* Account ID */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 w-28">
          Account ID:
        </span>

        <div className="flex-1 flex items-center justify-between bg-gray-900 px-3 py-2 rounded-xl text-sm">
          <span className="truncate">{accountId}</span>

          <button
            onClick={() => handleCopy(accountId, "Account ID", "account")}
            className={`ml-3 text-xs px-2 py-1 rounded border transition
              ${
                copiedField === "account"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "text-blue-400 border-blue-400/30 hover:bg-blue-500/10"
              }`}
          >
            {copiedField === "account" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* External ID */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 w-28">
          External ID:
        </span>

        <div className="flex-1 flex items-center justify-between bg-gray-900 px-3 py-2 rounded-xl text-sm">
          <span className="truncate">{externalId}</span>

          <button
            onClick={() => handleCopy(externalId, "External ID", "external")}
            className={`ml-3 text-xs px-2 py-1 rounded border transition
              ${
                copiedField === "external"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "text-blue-400 border-blue-400/30 hover:bg-blue-500/10"
              }`}
          >
            {copiedField === "external" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Toggle Policy */}
      <button
        onClick={() => safeSetShowPolicy(prev => !prev)}
        className="text-sm text-gray-400 hover:text-gray-300"
      >
        {safeShowPolicy ? "Hide Policy ▲" : "Show Policy ▼"}
      </button>

      {safeShowPolicy && (
        <div className="bg-gray-900 p-3 rounded-xl text-xs overflow-auto max-h-48">
          <pre>{policy}</pre>

          <button
            onClick={() => handleCopy(policy, "Policy", "policy")}
            className={`mt-2 text-xs px-2 py-1 rounded border transition
              ${
                copiedField === "policy"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "text-blue-400 border-blue-400/30 hover:bg-blue-500/10"
              }`}
          >
            {copiedField === "policy" ? "Copied" : "Copy Policy"}
          </button>
        </div>
      )}

    </div>
  );
};

export default Step7Credentials;