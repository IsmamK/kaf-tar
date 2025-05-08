import React, { useRef } from 'react';
import Contact1 from '../components/contact_components/Contact1';
import Contact2 from '../components/contact_components/Contact2';
import StechBanner from '../components/home_components/StechBanner';
import ServiceCard from '../components/service_components/ServiceCard';

const Contact = () => {
  const contact2Ref = useRef(null); // Create a ref for Contact2

  // Function to handle scroll to Contact2
  const scrollToContact2 = () => {
    if (contact2Ref.current) {
      contact2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className='contact1'>
        <Contact1 bgColor="white" textColor="black" onScrollToContact2={scrollToContact2} />
      </div>
      <StechBanner />
      <div className='contact2' ref={contact2Ref} > {/* Added padding for visibility */}
  <Contact2 bgColor="white" textColor="black" />
</div>

    </div>
  );
};

export default Contact;
