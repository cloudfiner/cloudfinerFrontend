import menuImg from "@/assets/pointingToMenuBar.png";

const Step8aIAM = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">click to menu</h2>

    <p className="text-sm text-gray-400">
      This is where we manage roles and policies.
    </p>

    {/* Image */}
    <div className="mt-4">
      <img
        src={menuImg}
        alt="Pointing to Menu Bar"
        className="rounded-lg border border-gray-700 shadow-md"
      />
    </div>
  </div>
);

export default Step8aIAM;