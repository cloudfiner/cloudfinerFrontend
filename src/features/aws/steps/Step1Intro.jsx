import { motion } from "framer-motion";

const Step1Intro = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center space-y-6"
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Connect AWS Account
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          Track your AWS costs and unlock smart optimization insights.
        </p>

        {/* Security */}
        <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span>Read-only access. No changes to your AWS resources.</span>
        </div>

        {/* Highlight line */}
        <div className="flex justify-center">
          <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 backdrop-blur-sm">
            <p className="text-sm font-semibold text-purple-400 tracking-wide">
              Takes less than 2 minutes to setup
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step1Intro;