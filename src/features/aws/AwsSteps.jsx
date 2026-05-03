// src/features/cloud/aws/AwsSteps.jsx

const AwsSteps = () => {
  return (
    <div className="space-y-6">

      {/* Step 1 */}
      <div className="soft-card p-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Step 1</p>
          <h3 className="text-lg font-semibold">Open AWS Console</h3>
          <p className="text-xs text-gray-500">
            Login to your AWS account
          </p>
        </div>

        <a
          href="https://console.aws.amazon.com/iam/home#/roles"
          target="_blank"
          className="btn-primary"
        >
          Open AWS
        </a>
      </div>

      {/* Step 2 */}
      <div className="soft-card p-6 space-y-3">
        <p className="text-xs text-gray-400">Step 2</p>
        <h3 className="text-lg font-semibold">Create Role</h3>

        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Click IAM</li>
          <li>• Click Roles</li>
          <li>• Click Create Role</li>
          <li>• Select "Another AWS Account"</li>
          <li>• Paste External ID (shown below)</li>
          <li>• Attach ReadOnlyAccess policy</li>
        </ul>
      </div>

    </div>
  );
};

export default AwsSteps;