// AwsPolicyBox.jsx

const AwsPolicyBox = ({ policy }) => {

  const copyPolicy = () => {
    navigator.clipboard.writeText(policy);
    alert("Policy copied ✅");
  };

  return (
    <div className="bg-[#1a1133] p-6 rounded-xl space-y-4 border border-purple-700">

      <h2 className="text-xl font-semibold">📄 Trust Policy</h2>

      <textarea
        value={policy}
        readOnly
        className="w-full h-40 p-3 bg-black text-green-400 rounded"
      />

      <button onClick={copyPolicy} className="btn-soft">
        📋 Copy Policy
      </button>
    </div>
  );
};

export default AwsPolicyBox;