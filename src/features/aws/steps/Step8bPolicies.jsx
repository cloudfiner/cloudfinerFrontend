import customPoliciesImg from "@/assets/pointingToCustomPolicies.png";

const Step8bPolicies = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Go to Policies</h2>

    <p className="text-sm text-gray-400">
      click on <b>Policies</b> in sidebar.
    </p>

    {/* Image */}
    <div className="mt-4">
      <img
        src={customPoliciesImg}
        alt="Pointing to Custom Policies"
        className="rounded-lg border border-gray-700 shadow-md"
      />
    </div>
  </div>
);

export default Step8bPolicies;