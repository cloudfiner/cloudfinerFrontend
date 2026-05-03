import policyNameImg from "@/assets/pointingToPolicyName.png";

const Step8fPolicyName = () => {

      const handleNext = () => {
    if (onPolicyCreated) {
      onPolicyCreated(); //  THIS IS THE FIX
    }
  };

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-semibold">
        Enter Policy Name
      </h2>

      <p>
        Enter a name for your policy name Eg: awsCostViewer  and then click <b>Create policy</b>.
      </p>

      {/* Image */}
      <div className="mt-2">
        <img
          src={policyNameImg}
          alt="Pointing to Policy Name input"
          className="rounded-lg border border-gray-700 shadow-md"
        />
      </div>

      <p className="text-xs text-gray-500">
        After entering the name, click <b>Create policy</b> to continue.
      </p>

    </div>
  );
};

export default Step8fPolicyName;