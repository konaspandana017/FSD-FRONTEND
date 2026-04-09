import React from 'react';
import Hero from '../Hero';
import Features from '../Features';
import HowItWorks from '../HowItWorks';
import Testimonials from '../Testimonials';
import CTAStrip from '../CTAStrip';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTAStrip />
      <Footer />
    </>
  );
}

export default Home;
