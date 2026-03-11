"use client";
import "./footer.css";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* ── TOP: Contact + Legal columns ── */}
        <div className="footer__main">

          {/* Contact Us */}
          <div className="footer__col">
            <h3 className="footer__col-heading">Contact Us</h3>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <MapPin size={15} strokeWidth={2} className="footer__contact-icon" />
                <span>
                  Johr town, Lahore<br />
                  Pakistan
                </span>
              </li>
              <li className="footer__contact-item">
                <Phone size={15} strokeWidth={2} className="footer__contact-icon" />
                <a href="tel:+923001234567" className="footer__contact-link">+92 327 0195296</a>
              </li>
              <li className="footer__contact-item">
                <svg className="footer__contact-icon footer__contact-icon--gmail" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-8 4.8-8-4.8V6l8 4.8L20 6v2.236Z"
                  />
                </svg>
                <a href="mailto:d1h.organization@gmail.com" className="footer__contact-link footer__contact-link--email">
                  d1h.organization@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__col">
            <h3 className="footer__col-heading">Legal</h3>
            <ul className="footer__legal-list">
              <li><a href="/privacy-policy" className="footer__legal-link">Privacy Policy</a></li>
              <li><a href="/refund-policy"  className="footer__legal-link">Refund Policy</a></li>
              <li><a href="/terms"          className="footer__legal-link">Terms and Conditions</a></li>
            </ul>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="footer__line" />

        {/* ── BOTTOM: copyright + social ── */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            Copyright © {year} D1H — Donate 1% For Humanity. All rights reserved.
          </p>

          <div className="footer__social">
            {/* Facebook */}
            <a href="https://www.facebook.com/d1h.trust/" className="footer__social-link footer__social-link--fb" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/d1h.trust/" className="footer__social-link footer__social-link--ig" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* LinkedIn */}
            {/* <a href="#" className="footer__social-link footer__social-link--li" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
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