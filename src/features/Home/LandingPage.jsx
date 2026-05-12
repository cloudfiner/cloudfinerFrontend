import { useState } from "react";

import Navbar from './Navbar';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import AudienceSection from './AudienceSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';
import Features from './Features';
import ContactSection from "./ContactSection";

const LandingPage = () => {

  // CONTACT FORM STATE
  const [showContact, setShowContact] = useState(false);

  return (

    <div className="bg-gradient-to-br from-[#0f0a1f] via-[#1a1133] to-[#0f0a1f] text-white min-h-screen overflow-hidden">

      <Navbar />

      <Hero />

      <ProblemSection />

      <Features />

      <AudienceSection />

      <TestimonialsSection />

      <CTASection />

      {/* CONTACT SECTION */}
      {
        showContact && (
          <ContactSection />
        )
      }

      {/* FOOTER */}
      <Footer setShowContact={setShowContact} />

    </div>

  );
};

export default LandingPage;