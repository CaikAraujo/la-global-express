import React from 'react';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import Plans from '../components/Plans';
import SwissSection from '../components/SwissSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import AppDownload from '../components/AppDownload';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <Plans />
      <SwissSection />
      <Testimonials />
      <AppDownload />
    </>
  );
};

export default Home;