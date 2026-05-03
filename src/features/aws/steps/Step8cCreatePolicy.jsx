import createPolicyImg from "@/assets/pointingToCreatePolicy.png";

const Step8cCreatePolicy = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Create Policy</h2>

    <p className="text-sm text-gray-400">
      Click the <b>Create policy</b> button on the top right.
    </p>

    {/* Image */}
    <div className="mt-4">
      <img
        src={createPolicyImg}
        alt="Pointing to Create Policy"
        className="rounded-lg border border-gray-700 shadow-md"
      />
    </div>
  </div>
);

export default Step8cCreatePolicy;