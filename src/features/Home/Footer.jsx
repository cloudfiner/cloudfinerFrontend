const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10 pt-16 pb-10 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left - Brand & Description */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center text-lg">
                ☁️
              </div>
              <span className="text-2xl font-bold text-purple-400">CloudFiner</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Helping startups, developers, and students optimize their cloud costs 
              with AI-powered insights.
            </p>

            {/* Social Links - Improved Style */}
            <div className="mt-10">
              <p className="text-sm text-gray-500 mb-4">Follow us</p>
              <div className="flex items-center gap-6">
                {/* X (Twitter) */}
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-purple-400 transition-colors"
                >
                  <div className="w-9 h-9 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                    𝕏
                  </div>
                  <span className="text-gray-400 group-hover:text-white">X</span>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-purple-400 transition-colors"
                >
                  <div className="w-9 h-9 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                    <span className="text-xl">🐙</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-white">GitHub</span>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-purple-400 transition-colors"
                >
                  <div className="w-9 h-9 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                    <span className="text-xl">in</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-white">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-lg mb-6 text-white">Product</h4>
            <div className="space-y-3 text-gray-400">
              <a href="#" className="block hover:text-white transition">Features</a>
              <a href="#" className="block hover:text-white transition">Pricing</a>
              <a href="#" className="block hover:text-white transition">Use Cases</a>
              <a href="#" className="block hover:text-white transition">Roadmap</a>
            </div>
          </div>

          {/* Company Links */}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
            <div className="space-y-3 text-gray-400">
              <a href="#" className="block hover:text-white transition">About</a>
              <a href="#" className="block hover:text-white transition">Blog</a>
              <a href="#" className="block hover:text-white transition">Careers</a>
              <a href="#" className="block hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 CloudFiner. All rights reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;