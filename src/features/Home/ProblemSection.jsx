const ProblemSection = () => {
  return (
    <section className="px-6 py-20 bg-[#111118]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">
          Why Cloud Costs Go <span className="text-orange-400">Out of Control</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Most teams overspend by 30-40% on cloud infrastructure.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 hover:border-purple-500 transition-all">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">👁️</div>
            <h3 className="text-2xl font-semibold mb-3">No Visibility</h3>
            <p className="text-gray-400">
              Cloud bills are confusing. You don't know where your money goes until it's too late.
            </p>
          </div>

          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 hover:border-purple-500 transition-all">
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">💸</div>
            <h3 className="text-2xl font-semibold mb-3">Hidden Charges</h3>
            <p className="text-gray-400">
              Unexpected costs from data transfer, storage, and services you forgot to turn off.
            </p>
          </div>

          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 hover:border-purple-500 transition-all">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">📦</div>
            <h3 className="text-2xl font-semibold mb-3">Over-provisioned Services</h3>
            <p className="text-gray-400">
              Paying for resources you don't use. Idle instances drain your budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;