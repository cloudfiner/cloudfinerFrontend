import step5 from "@/assets/pointtoawsaccount.png";

const Step6Account = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Choose AWS Account</h2>

    <img src={step5} className="rounded-xl border border-gray-700" />

    <p className="text-gray-400 text-sm">
      Select "Another AWS account".
    </p>
  </div>
);

export default Step6Account;