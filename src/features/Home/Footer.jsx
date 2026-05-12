import { FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = ({ setShowContact }) => {

  const scrollToSection = (id) => {

    const el = document.getElementById(id);

    if (!el) return;

    const navbarHeight = 120;

    const targetY =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="bg-[#0a0a0f] border-t border-white/10 pt-16 pb-10 px-8"
    >

      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-12 gap-12">

          {/* LEFT SECTION */}
          <div className="md:col-span-8">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-4">

              <img
                src="/cloudfinerlogo.png"
                alt="CloudFiner Logo"
                className="w-10 h-10 object-contain"
              />

              <span className="text-2xl font-bold text-purple-400">
                CloudFiner
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-400 max-w-md leading-relaxed">
              Helping startups, developers, and students optimize
              their cloud costs with AI-powered insights.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-10">

              <p className="text-sm text-gray-500 mb-4">
                Follow us
              </p>

              <div className="flex items-center gap-6 flex-wrap">

                {/* X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                    <RiTwitterXFill />
                  </div>

                  <span className="text-gray-400 group-hover:text-white transition">
                    X
                  </span>
                </a>

                {/* TELEGRAM */}
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                    <FaTelegramPlane />
                  </div>

                  <span className="text-gray-400 group-hover:text-white transition">
                    Telegram
                  </span>
                </a>

                {/* LINKEDIN */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                    <FaLinkedin />
                  </div>

                  <span className="text-gray-400 group-hover:text-white transition">
                    LinkedIn
                  </span>
                </a>

              </div>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-4">

            <h4 className="font-semibold text-lg mb-6 text-white">
              Quick Links
            </h4>

            <div className="space-y-3 text-gray-400">

              {/* FEATURES */}
              <button
                onClick={() => scrollToSection("features")}
                className="block hover:text-white transition"
              >
                Features
              </button>

              {/* ABOUT */}
              <button
                onClick={() => scrollToSection("about")}
                className="block hover:text-white transition"
              >
                About
              </button>

              {/* CONTACT */}
              <button
                onClick={() => {

                  setShowContact(true);

                  setTimeout(() => {
                    scrollToSection("contact");
                  }, 100);

                }}
                className="block hover:text-white transition"
              >
                Contact Us
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © 2026 CloudFiner. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;