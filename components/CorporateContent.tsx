import React from 'react';
import Hero from '../components/corporate/Hero';
import TrustedBy from '../components/corporate/TrustedBy';
import Services from '../components/corporate/Services';
import OfficeHospitality from '../components/corporate/OfficeHospitality';
import Methodology from '../components/corporate/Methodology';
import ESGSection from '../components/corporate/ESGSection';
import CTA from '../components/corporate/CTA';

const Corporate: React.FC = () => {
   return (
      <div className="font-manrope text-brand-text bg-white">
         <Hero />
         <TrustedBy />
         <Services />
         <OfficeHospitality />
         <Methodology />
         <ESGSection />
         <CTA />
      </div>
   );
};

export default Corporate;