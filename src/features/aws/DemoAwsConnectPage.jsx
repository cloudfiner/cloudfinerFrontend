import { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// Steps
import Step1Intro from "./steps/Step1Intro";
import Step2Console from "./steps/Step2Console";
import Step3IAM from "./steps/Step3IAM";
import Step4Roles from "./steps/Step4Roles";
import Step5CreateRole from "./steps/Step5CreateRole";
import Step6Account from "./steps/Step6Account";
import Step7Credentials from "./steps/Step7Credentials";
import Step8Policy from "./steps/Step8Policy";
import Step8AlternatePolicy from "./steps/Step8AlternatePolicy";

import Step8aIAM from "./steps/Step8aIAM";
import Step8bPolicies from "./steps/Step8bPolicies";
import Step8cCreatePolicy from "./steps/Step8cCreatePolicy";
import Step8dJson from "./steps/Step8dJson";
import Step8ePaste from "./steps/Step8ePaste";
import Step8fPolicyName from "./steps/Step8fPolicyName";

import Step9RoleName from "./steps/Step9RoleName";
import Step10SelectRole from "./steps/Step10SelectRole";
import Step11Arn from "./steps/Step11Arn";

const DemoAwsConnectPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Demo Data
  const accountId = "123456789012";
  const externalId = "demo-external-id-12345";

  const policy = `{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Effect":"Allow",
      "Action":[
        "ce:GetCostAndUsage",
        "ce:GetCostForecast"
      ],
      "Resource":"*"
    }
  ]
}`;

  const [roleArn, setRoleArn] = useState("");
  const [showPolicy, setShowPolicy] = useState(false);

  const [showAdvancedPolicySteps, setShowAdvancedPolicySteps] =
    useState(false);

  const [restartFromRoles, setRestartFromRoles] =
    useState(false);

  const totalSteps = showAdvancedPolicySteps ? 17 : 11;

  const nextStep = () => setStep((s) => s + 1);

  const prevStep = () => {
    if (step === 1) {
      navigate("/demo");
    } else {
      setStep((s) => s - 1);
    }
  };

  const finishDemo = () => {
    confetti({
      particleCount: 150,
      spread: 100,
    });

    alert(
      "Demo Completed!\n\nTo connect your real AWS account, please Sign Up and Login."
    );

    navigate("/demo");
  };

  const props = {
    accountId,
    externalId,
    policy,
    roleArn,
    setRoleArn,
    showPolicy,
    setShowPolicy,
  };

  const renderStep = () => {
    if (showAdvancedPolicySteps) {
      switch (step) {
        case 9:
          return <Step8aIAM />;

        case 10:
          return <Step8bPolicies />;

        case 11:
          return <Step8cCreatePolicy />;

        case 12:
          return <Step8dJson />;

        case 13:
          return <Step8ePaste />;

        case 14:
          return (
            <Step8fPolicyName
              onPolicyCreated={() => {
                setShowAdvancedPolicySteps(false);
                setRestartFromRoles(true);
                setStep(4);
              }}
            />
          );

        default:
          return <div>Invalid Step</div>;
      }
    }

    switch (step) {
      case 1:
        return <Step1Intro />;

      case 2:
        return <Step2Console />;

      case 3:
        return <Step3IAM />;

      case 4:
        return <Step4Roles />;

      case 5:
        return <Step5CreateRole />;

      case 6:
        return <Step6Account />;

      case 7:
        return <Step7Credentials {...props} />;

      case 8:
        return restartFromRoles ? (
          <Step8AlternatePolicy />
        ) : (
          <Step8Policy
            onNeedHelp={() => {
              setShowAdvancedPolicySteps(true);
              setStep(9);
            }}
          />
        );

      case 9:
        return <Step9RoleName />;

      case 10:
        return <Step10SelectRole />;

      case 11:
        return <Step11Arn {...props} />;

      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white px-4">

      <div className="w-full max-w-3xl mb-6">
        <div className="w-full bg-gray-800 h-1 rounded">
          <div
            className="h-1 bg-blue-500 transition-all duration-500"
            style={{
              width: `${(step / totalSteps) * 100}%`,
            }}
          />
        </div>

        <p className="text-xs text-gray-400 mt-2 text-center">
          Step {step} of {totalSteps}
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="soft-card border border-gray-700/50 bg-white/5 backdrop-blur p-8 rounded-2xl min-h-[420px] flex flex-col justify-between">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">

            <button
              onClick={prevStep}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              ← Back
            </button>

            {step === totalSteps ? (
              <button
                onClick={finishDemo}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
              >
                Finish Demo
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
              >
                Next →
              </button>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default DemoAwsConnectPage;