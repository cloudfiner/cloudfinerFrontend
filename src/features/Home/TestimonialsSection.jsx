const TestimonialsSection = () => {
  return (
    <section className="px-6 py-20 bg-[#111118]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Loved by <span className="text-yellow-400">Developers & Founders</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 text-left">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <p className="italic text-gray-300 mb-6">"CloudFiner saved us ₹10,000 in the first month. Found idle instances we forgot about."</p>
            <p className="font-semibold">Priya Sharma</p>
            <p className="text-sm text-gray-500">Founder, TechStart</p>
          </div>

          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 text-left">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <p className="italic text-gray-300 mb-6">"Perfect for beginners! Now I know exactly what I'm paying for."</p>
            <p className="font-semibold">Arjun Patel</p>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>

          <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 text-left">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <p className="italic text-gray-300 mb-6">"The alerts saved me from a ₹500 mistake while learning AWS!"</p>
            <p className="font-semibold">Neha Gupta</p>
            <p className="text-sm text-gray-500">CS Student, IIT Delhi</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;