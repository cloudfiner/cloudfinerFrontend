import alternatePolicyImg from "@/assets/alternatepolicy.png";

const Step8AlternatePolicy = () => {

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-semibold">
        Attach Your Custom Policy
      </h2>

      <p className="text-sm text-gray-400">
        Search your custom policy (e.g. <b>CloudCostViewer</b>), 
        <b> tick the checkbox</b>, then click <b>Next</b>.
      </p>

      <div className="mt-2">
        <img
          src={alternatePolicyImg}
          alt="Select Custom Policy"
          className="rounded-lg border border-gray-700 shadow-md w-full max-h-[400px] object-contain"
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs p-3 rounded">
        Select the checkbox on the left side of your policy before clicking Next.
      </div>

    </div>
  );
};

export default Step8AlternatePolicy;