import { motion } from "framer-motion";

const features = [
  {
    title: "Real-time Cost Tracking",
    desc: "Monitor your cloud spending live. See exactly where your money goes.",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
    icon: "📈",
  },
  {
    title: "Budget Alerts",
    desc: "Get notified before you overspend. Stay in control of your budget.",
    color: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/30",
    icon: "🚨",
  },
{
  title: "Telegram Alerts",
  desc: "Receive instant cloud cost updates directly on Telegram anytime.",
  color: "from-sky-500 to-blue-500",
  glow: "shadow-sky-500/30",
  icon: "📨",
},
  {
    title: "Simple Insights",
    desc: "Understand your cloud bill in simple language without complexity.",
    color: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/30",
    icon: "🧠",
  },
  {
    title: "Demo Dashboard",
    desc: "Try the product instantly without login and explore features.",
    color: "from-indigo-500 to-violet-500",
    glow: "shadow-indigo-500/30",
    icon: "⚡",
  },
  {
    title: "Daily Summary",
    desc: "Get daily reports of your cloud usage and spending trends.",
    color: "from-teal-500 to-cyan-500",
    glow: "shadow-teal-500/30",
    icon: "📊",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-28 px-6 scroll-mt-[140px]">

      {/* 🔥 Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-6">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Optimize Cloud Costs
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Powerful features designed for startups, developers, and students.
        </p>
      </div>

      {/* 🔥 Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {features.map((f, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`
              relative p-8 rounded-2xl
              bg-gradient-to-br from-white/5 to-white/0
              border border-white/10
              backdrop-blur-lg
              shadow-xl ${f.glow}
              transition-all duration-300
            `}
          >

            {/* Glow border */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-300 blur-xl bg-gradient-to-r ${f.color}`} />

            {/* Icon */}
            <div
              className={`
                w-14 h-14 mb-6 rounded-xl flex items-center justify-center text-2xl
                bg-gradient-to-br ${f.color}
                shadow-lg
              `}
            >
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3">
              {f.title}
            </h3>

            {/* Desc */}
            <p className="text-gray-400 leading-relaxed">
              {f.desc}
            </p>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Features;