


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "@/lib/authService";

import Navbar from './Navbar';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import AudienceSection from './AudienceSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';
import Features from './Features';

const LandingPage = () => {
  
  return (
    <div className="bg-gradient-to-br from-[#0f0a1f] via-[#1a1133] to-[#0f0a1f] text-white min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <ProblemSection />
      <Features />
      <AudienceSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};
export default LandingPage;
