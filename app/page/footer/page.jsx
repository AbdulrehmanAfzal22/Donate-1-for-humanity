"use client";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Two-column main section */}
        <div className="footer__main">
          <h2 className="footer__headline">
            Let's talk about how we can<br />
            transform lives together!
          </h2>

          <div className="footer__contact">
            <p className="footer__label">Get in touch with our team</p>
            <a href="mailto:info@SAYA.com" className="footer__email">
              d1h.organization@gmail.com
            </a>
          </div>
        </div>

        <div className="footer__line" />

        {/* Bottom bar: logo | copyright | social */}
        <div className="footer__bottom">
          <div className="footer__logo">
            <span className="footer__logo-icon" aria-hidden="true" />
            D1H - Donate 1% For Humanity
          </div>

        
        

          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* <a href="#" className="footer__social-link" aria-label="X (Twitter)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a> */}
            <a href="https://www.instagram.com/d1h.trust/" className="footer__social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* <a href="#" className="footer__social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a> */}
          </div>
        </div>

      </div>
    </footer>
  );
}