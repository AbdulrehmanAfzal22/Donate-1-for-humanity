"use client";
import { useState } from "react";
import "./nav.css";
import Image from "next/image";
import sayalogo from "../../../public/assets/d1h.png";
import JoinModal from "../../../app/page/join/page";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const links = ["Home", "About us", "Facilities", "Donate", "Programs", "Events"];

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar__logo">
          <Image src={sayalogo} alt="Logo" className="navbar__logo-img" />
        </div>

        {/* Desktop Links — centered */}
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {links.map((link) => (
            <li key={link} className="navbar__item">
              <a
                href={
                  // link === "Home"       ? "#hero"       :
                  link === "About us"   ? "#about"      :
                  link === "Programs"   ? "#packages"   :
                  link === "Facilities" ? "#facilities" :
                  link === "Zakat"      ? "#zakat"      :
                  link === "Donate"     ? "#donate"     :
                   link === "Events"     ? "#events"     :
                  link === "Contacts"   ? "#contact"    : "#"
                }
                className={`navbar__link ${active === link ? "navbar__link--active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  const idMap = {
                    "Home": "hero", "About us": "about", "Programs": "packages",
                    "Facilities": "facilities", "Zakat": "zakat",
                    "Donate": "donate", "Events": "events", "Contacts": "contact",
                  };
                  const section = document.getElementById(idMap[link]);
                  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActive(link);
                  setMenuOpen(false);
                }}
              >
                {link}
              </a>
            </li>
          ))}
                 {/* Blinking Event Dot */}
          <button
            className="navbar__event-dot"
            aria-label="Go to Events"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("events");
              if (!section) return;

              // Account for fixed navbar height
              const navOffset = 84; // ~72px navbar + a bit of spacing
              const y = section.getBoundingClientRect().top + window.scrollY - navOffset;
              window.scrollTo({ top: y, behavior: "smooth" });

              setActive("Events");
              setMenuOpen(false);
            }}
          />
          {/* Join Us — mobile only (inside dropdown) */}
          <li className="navbar__item navbar__item--join-mobile">
            <button
              className="navbar__join-btn"
              onClick={() => { setMenuOpen(false); setShowJoin(true); }}
            >
              Join Us
            </button>
          </li>
        </ul>

        {/* Right: Join Us (desktop) + Event dot + Hamburger */}
        <div className="navbar__right">
          <button
            className="navbar__join-btn navbar__join-btn--desktop"
            onClick={() => setShowJoin(true)}
          >
            Join Us
          </button>

   

          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {showJoin && <JoinModal onClose={() => setShowJoin(false)} />}
    </>
  );
};

export default Navbar;