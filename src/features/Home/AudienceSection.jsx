


const AudienceSection = () => {
  return (
   <section id="about" className="px-6 py-20 bg-[#111118]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Built For <span className="text-purple-400">People Like You</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-all">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-2xl font-semibold mb-3">Startup Founders</h3>
            <p className="text-gray-400">
              Keep your burn rate low. Every dollar saved extends your runway.
            </p>
          </div>

          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-all">
            <div className="text-5xl mb-6">💻</div>
            <h3 className="text-2xl font-semibold mb-3">Developers</h3>
            <p className="text-gray-400">
              Focus on building, not managing bills.
            </p>
          </div>

          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 hover:border-pink-500 transition-all">
            <div className="text-5xl mb-6">🎓</div>
            <h3 className="text-2xl font-semibold mb-3">Students Learning AWS</h3>
            <p className="text-gray-400">
              Learn cloud without fear. Avoid surprise charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;

