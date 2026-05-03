import jsonImg from "@/assets/pointingToJson.png";

const Step8dPaste = () => {
  return (
    <div className="space-y-5">

      <h2 className="text-lg font-semibold">
        Click JSON Tab
      </h2>

      <p className="text-sm text-gray-400">
        Click on the <b>JSON</b> tab to switch to the policy editor view.
      </p>

      {/* Image */}
      <div className="mt-2">
        <img
          src={jsonImg}
          alt="Pointing to JSON tab"
          className="rounded-lg border border-gray-700 shadow-md"
        />
      </div>

      <p className="text-xs text-gray-500">
        After clicking JSON, go to the next step.
      </p>

    </div>
  );
};

export default Step8dPaste;