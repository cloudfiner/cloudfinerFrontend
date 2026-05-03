




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAccessToken } from "@/lib/authService";
// import confetti from "canvas-confetti";
// import { motion, AnimatePresence } from "framer-motion";

// // steps
// import Step1Intro from "./steps/Step1Intro";
// import Step2Console from "./steps/Step2Console";
// import Step3IAM from "./steps/Step3IAM";
// import Step4Roles from "./steps/Step4Roles";
// import Step5CreateRole from "./steps/Step5CreateRole";
// import Step6Account from "./steps/Step6Account";
// import Step7Credentials from "./steps/Step7Credentials";
// import Step8Policy from "./steps/Step8Policy";
// import Step8AlternatePolicy from "./steps/Step8AlternatePolicy";

// // advanced steps
// import Step8aIAM from "./steps/Step8aIAM";
// import Step8bPolicies from "./steps/Step8bPolicies";
// import Step8cCreatePolicy from "./steps/Step8cCreatePolicy";
// import Step8dJson from "./steps/Step8dJson";
// import Step8ePaste from "./steps/Step8ePaste";
// import Step8fPolicyName from "./steps/Step8fPolicyName";

// import Step9RoleName from "./steps/Step9RoleName";
// import Step10SelectRole from "./steps/Step10SelectRole";
// import Step11Arn from "./steps/Step11Arn";

// const API_BASE = "http://localhost:8080";

// const AwsConnectPage = () => {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [externalId, setExternalId] = useState("");
//   const [accountId, setAccountId] = useState("");
//   const [policy, setPolicy] = useState("");
//   const [roleArn, setRoleArn] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showPolicy, setShowPolicy] = useState(false);
//   const [showAdvancedPolicySteps, setShowAdvancedPolicySteps] = useState(false);
//   const [restartFromRoles, setRestartFromRoles] = useState(false);

//   const totalSteps = showAdvancedPolicySteps ? 17 : 11;
//   const isStep8f = showAdvancedPolicySteps && step === 14;

//   // 🔥 RESET safely (NO setState in render)
//   useEffect(() => {
//     if (step === 9 && restartFromRoles) {
//       setRestartFromRoles(false);
//     }
//   }, [step]);

//   useEffect(() => {
//     fetchSetup();
//   }, [token]);
// const fetchSetup = async () => {
//   if (!token) return;

//   try {
//     setLoadingSetup(true);

//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

//     const res = await fetch(`${API_BASE}/api/aws/setup`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       signal: controller.signal
//     });

//     clearTimeout(timeout);

//     if (!res.ok) {
//       const errorText = await res.text();

//       console.error("Setup API failed:", res.status, errorText);

//       // Optional: user-friendly error
//       throw new Error("Failed to load AWS setup");
//     }

//     const data = await res.json();

//     // 🔒 Safe state update
//     setExternalId(data?.externalId ?? "");
//     setAccountId(data?.accountId ?? "");
//     setPolicy(data?.policy ?? "");

//   } catch (err) {
//     if (err.name === "AbortError") {
//       console.error("Request timeout");
//     } else {
//       console.error("Setup fetch error:", err.message);
//     }

//     // Optional: show toast
//     // toast.error("Unable to load setup");

//   } finally {
//     setLoadingSetup(false);
//   }
// };

//   const copy = (text) => navigator.clipboard.writeText(text);

//   const connectAws = async () => {
//     try {
//       setLoading(true);

//       const token = getAccessToken();
//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       const res = await fetch(`${API_BASE}/api/aws/connect`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ roleArn })
//       });

//       if (!res.ok) {
//         alert("Connection failed");
//         return;
//       }

//       confetti({ particleCount: 120, spread: 100 });

//       setTimeout(() => navigate("/dashboard"), 1500);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => setStep((prev) => prev + 1);

//   const prevStep = () => {
//     if (step === 1) navigate("/dashboard");
//     else setStep((prev) => Math.max(prev - 1, 1));
//   };

//   const renderStep = () => {
//     const props = {
//       accountId,
//       externalId,
//       policy,
//       copy,
//       roleArn,
//       setRoleArn,
//       showPolicy,
//       setShowPolicy
//     };

//     // ===== ADVANCED FLOW =====
//     if (showAdvancedPolicySteps) {
//       switch (step) {
//         case 9: return <Step8aIAM />;
//         case 10: return <Step8bPolicies />;
//         case 11: return <Step8cCreatePolicy />;
//         case 12: return <Step8dJson />;
//         case 13: return <Step8ePaste {...props} />;

//         case 14:
//           return (
//             <Step8fPolicyName
//               onPolicyCreated={() => {
//                 setShowAdvancedPolicySteps(false);
//                 setRestartFromRoles(true);
//                 setStep(4);
//               }}
//             />
//           );

//         default:
//           return <div>Invalid Step</div>;
//       }
//     }

//     // ===== NORMAL FLOW =====
//     switch (step) {
//       case 1: return <Step1Intro />;
//       case 2: return <Step2Console />;
//       case 3: return <Step3IAM />;
//       case 4: return <Step4Roles />;
//       case 5: return <Step5CreateRole />;
//       case 6: return <Step6Account />;
//       case 7: return <Step7Credentials {...props} />;

//       case 8:
//         return restartFromRoles ? (
//           <Step8AlternatePolicy />
//         ) : (
//           <Step8Policy
//             onNeedHelp={() => {
//               setShowAdvancedPolicySteps(true);
//               setStep(9);
//             }}
//           />
//         );

//       case 9: return <Step9RoleName />;
//       case 10: return <Step10SelectRole />;
//       case 11: return <Step11Arn {...props} />;

//       default:
//         return <div>Invalid Step</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white px-4">

//       <div className="w-full max-w-3xl mb-6">
//         <div className="w-full bg-gray-800 h-1 rounded">
//           <div
//             className="h-1 bg-blue-500 transition-all duration-500"
//             style={{ width: `${(step / totalSteps) * 100}%` }}
//           />
//         </div>
//         <p className="text-xs text-gray-400 mt-2 text-center">
//           Step {step} of {totalSteps}
//         </p>
//       </div>

//       <div className="w-full max-w-3xl">
//         <div className="soft-card border border-gray-700/50 bg-white/5 backdrop-blur p-8 rounded-2xl min-h-[420px] flex flex-col justify-between">

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={step}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -40 }}
//               transition={{ duration: 0.3 }}
//             >
//               {renderStep()}
//             </motion.div>
//           </AnimatePresence>

//           <div className="flex justify-between mt-8">
//             <button
//               onClick={prevStep}
//               className="px-4 py-2 text-sm border border-gray-700 rounded-xl text-gray-400 hover:bg-white/5 transition"
//             >
//               ← Back
//             </button>

//             {isStep8f ? (
//               <button
//                 onClick={() => {
//                   setShowAdvancedPolicySteps(false);
//                   setRestartFromRoles(true);
//                   setStep(4);
//                 }}
//                 className="px-4 py-2 text-sm rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
//               >
//                 Continue →
//               </button>
//             ) : step === totalSteps ? (
//               <button
//                 onClick={connectAws}
//                 className="px-4 py-2 text-sm rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400"
//               >
//                 {loading ? "Connecting..." : "Finish"}
//               </button>
//             ) : (
//               <button
//                 onClick={nextStep}
//                 className="px-4 py-2 text-sm rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400"
//               >
//                 Next →
//               </button>
//             )}
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default AwsConnectPage;











import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

// steps
import Step1Intro from "./steps/Step1Intro";
import Step2Console from "./steps/Step2Console";
import Step3IAM from "./steps/Step3IAM";
import Step4Roles from "./steps/Step4Roles";
import Step5CreateRole from "./steps/Step5CreateRole";
import Step6Account from "./steps/Step6Account";
import Step7Credentials from "./steps/Step7Credentials";
import Step8Policy from "./steps/Step8Policy";
import Step8AlternatePolicy from "./steps/Step8AlternatePolicy";

// advanced
import Step8aIAM from "./steps/Step8aIAM";
import Step8bPolicies from "./steps/Step8bPolicies";
import Step8cCreatePolicy from "./steps/Step8cCreatePolicy";
import Step8dJson from "./steps/Step8dJson";
import Step8ePaste from "./steps/Step8ePaste";
import Step8fPolicyName from "./steps/Step8fPolicyName";

import Step9RoleName from "./steps/Step9RoleName";
import Step10SelectRole from "./steps/Step10SelectRole";
import Step11Arn from "./steps/Step11Arn";

const API_BASE = "http://localhost:8080";

const AwsConnectPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // ✅ FIXED

  const [step, setStep] = useState(1);
  const [externalId, setExternalId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [policy, setPolicy] = useState("");
  const [roleArn, setRoleArn] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingSetup, setLoadingSetup] = useState(false); // ✅ FIXED

  const [showPolicy, setShowPolicy] = useState(false);
  const [showAdvancedPolicySteps, setShowAdvancedPolicySteps] = useState(false);
  const [restartFromRoles, setRestartFromRoles] = useState(false);

  const totalSteps = showAdvancedPolicySteps ? 17 : 11;
  const isStep8f = showAdvancedPolicySteps && step === 14;

  // reset fix
  useEffect(() => {
    if (step === 9 && restartFromRoles) {
      setRestartFromRoles(false);
    }
  }, [step]);

  // 🔥 AUTO FETCH (TOKEN BASED)
  useEffect(() => {
    if (!token) return;
    fetchSetup();
  }, [token]);

  // 🔥 PRODUCTION FETCH
  const fetchSetup = async () => {
    try {
      setLoadingSetup(true);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${API_BASE}/api/aws/setup`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error("Setup API failed");
      }

      const data = await res.json();

      setExternalId(data?.externalId ?? "");
      setAccountId(data?.accountId ?? "");
      setPolicy(data?.policy ?? "");

    } catch (err) {
      console.error("Setup Error:", err.message);
    } finally {
      setLoadingSetup(false);
    }
  };

  const copy = (text) => navigator.clipboard.writeText(text);

  const connectAws = async () => {
    try {
      setLoading(true);

      if (!token) {
        alert("Login required");
        return;
      }

      const res = await fetch(`${API_BASE}/api/aws/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ roleArn })
      });

      if (!res.ok) throw new Error("Connection failed");

      confetti({ particleCount: 120, spread: 100 });

      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      console.error(err);
      alert("AWS connection failed");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => {
    if (step === 1) navigate("/dashboard");
    else setStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    const props = {
      accountId,
      externalId,
      policy,
      copy,
      roleArn,
      setRoleArn,
      showPolicy,
      setShowPolicy
    };

    if (showAdvancedPolicySteps) {
      switch (step) {
        case 9: return <Step8aIAM />;
        case 10: return <Step8bPolicies />;
        case 11: return <Step8cCreatePolicy />;
        case 12: return <Step8dJson />;
        case 13: return <Step8ePaste {...props} />;
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
        default: return <div>Invalid Step</div>;
      }
    }

    switch (step) {
      case 1: return <Step1Intro />;
      case 2: return <Step2Console />;
      case 3: return <Step3IAM />;
      case 4: return <Step4Roles />;
      case 5: return <Step5CreateRole />;
      case 6: return <Step6Account />;
      case 7: return <Step7Credentials {...props} />;
      case 8:
        return restartFromRoles
          ? <Step8AlternatePolicy />
          : <Step8Policy onNeedHelp={() => {
              setShowAdvancedPolicySteps(true);
              setStep(9);
            }} />;
      case 9: return <Step9RoleName />;
      case 10: return <Step10SelectRole />;
      case 11: return <Step11Arn {...props} />;
      default: return <div>Invalid Step</div>;
    }
  };

  if (loadingSetup) {
    return <div className="text-white text-center mt-20">Loading AWS Setup...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-3xl mb-6">
        <div className="w-full bg-gray-800 h-1 rounded">
          <div
            className="h-1 bg-blue-500 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Step {step} of {totalSteps}
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="soft-card border border-gray-700/50 bg-white/5 backdrop-blur p-8 rounded-2xl min-h-[420px] flex flex-col justify-between">

          <AnimatePresence mode="wait">
            <motion.div key={step}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <button onClick={prevStep}>← Back</button>

            {step === totalSteps ? (
              <button onClick={connectAws}>
                {loading ? "Connecting..." : "Finish"}
              </button>
            ) : (
              <button onClick={nextStep}>Next →</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AwsConnectPage;