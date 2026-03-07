"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './page/navbar/page';
import Hero from './page/hero/page';
import About from './page/about/page';
import Facilities from './page/facilities/page';
import Zakat from './page/zakat/page';
import Donate from './page/donatesection/page';
import DonateSection from './page/banks/page';
import Footer from './page/footer/page';
import Report from './page/package/page';

export default function Page() {
  const [showBankModal, setShowBankModal] = useState(false);

  // Scroll lock — modal khulne par page freeze, band hone par wapas normal
  useEffect(() => {
    if (showBankModal) {
      // Current scroll position save karo
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // scrollbar hata ne se layout shift rokta hai
    } else {
      // Scroll position restore karo
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [showBankModal]);

  const openModal  = () => setShowBankModal(true);
  const closeModal = () => setShowBankModal(false);

  return (
    <>
      <Navbar />
      <Hero onDonateClick={openModal} />
      <About />
      <Facilities />
      {/* <Zakat /> */}
      <Donate />
      <Report />
      <Footer />

      {showBankModal && (
        <div
          className="rm-modal__backdrop"
          onClick={closeModal}
        >
          <div
            className="rm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="rm-modal__close"
              onClick={closeModal}
            >
              ✕
            </button>
            <DonateSection />
          </div>
        </div>
      )}
    </>
  );
}

