"use client";
import { useState } from "react";
import NextImage from "next/image";
import "./about.css";
import img4 from "../../../public/assets/saya3.jpg";

import icon1 from "../../../public/assets/icon1.png";
import icon2 from "../../../public/assets/icon2.png";
import icon3 from "../../../public/assets/icon3.png";
import icon4 from "../../../public/assets/icon4.png";
import icon5 from "../../../public/assets/icon5.png";
import icon6 from "../../../public/assets/icon6.png";


const YOUTUBE_ID = "8jSdLOWWiiY"; // Replace with your own

export default function AboutStory() {
  const [playing, setPlaying] = useState(false);

  const icons = [icon1, icon2, icon3, icon4, icon5, icon6];
  return (
    <section className="story" id="about">

       {/* Sliding Icons Bar */}
      <div className="hero__slider-wrapper">
        <div className="hero__slider-track">
          {icons.map((icon, idx) => (
            <div key={`set1-${idx}`} className="hero__slider-item">
              <NextImage src={icon} alt={`icon ${idx + 1}`} width={64} height={64} />
            </div>
          ))}
          {icons.map((icon, idx) => (
            <div key={`set2-${idx}`} className="hero__slider-item">
              <NextImage src={icon} alt={`icon ${idx + 1}`} width={64} height={64} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative dots */}
      <span className="story__dot story__dot--orange" />
      <span className="story__dot story__dot--green"  />
      <span className="story__dot story__dot--pink"   />

      {/* Floating stars */}
      <span className="story__star story__star--s1">★</span>
      <span className="story__star story__star--s2">✦</span>
      <span className="story__star story__star--s3">★</span>
      <span className="story__star story__star--s4">✦</span>
      <span className="story__star story__star--s5">★</span>
      <span className="story__star story__star--s6">✦</span>
      <span className="story__star story__star--s7">★</span>
      <span className="story__star story__star--s8">✦</span>

      <div className="story__inner">

        {/* ══════════════════════════════
            LEFT COLUMN
        ══════════════════════════════ */}
        <div className="story__left">

          {/* Text block */}
          <div className="story__text">
            <p className="story__tagline">About us</p>
            <h2 className="story__heading">
              We make your events perfect in every way possible
            </h2>
            <div className="story__divider" />
          </div>

          {/* Image with badge at top-right corner */}
          <div className="story__img-wrap">
            <NextImage
              src={img4}
              alt="Saya Welfare community"
              className="story__img"
            />

            {/* Rotating badge — gradient text + heart */}
            <div className="story__badge">
              <svg viewBox="0 0 100 100" className="story__badge-svg">
                <defs>
                  <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#f07b2f" />
                    <stop offset="100%" stopColor="#c026d3" />
                  </linearGradient>
                  <path
                    id="badgeCircle"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text fontSize="11.5" fontWeight="700" fill="url(#badgeGrad)" letterSpacing="3">
                  <textPath href="#badgeCircle">
                    D1h • SERVING FOR ISLAM •
                  </textPath>
                </text>
              </svg>
              <span className="story__badge-heart">♥</span>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════
            RIGHT COLUMN
        ══════════════════════════════ */}
        <div className="story__right">

          {/* Video — no badge */}
          <div
            className={`story__video-wrap ${playing ? "story__video-wrap--playing" : ""}`}
            onClick={() => setPlaying(true)}
          >
            {!playing ? (
              <>
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt="Watch our story"
                  className="story__video-thumb"
                />
                <div className="story__video-overlay" />
                <button className="story__play-btn" aria-label="Play video">
                  <span className="story__play-icon">▶</span>
                </button>
                <span className="story__video-label">Watch Our Story</span>
              </>
            ) : (
              <iframe
                className="story__iframe"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Saya Welfare Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Description */}
          <div className="story__desc-block">
            <p className="story__desc">
              We started in <strong>2020</strong> when COVID-19 hit Pakistan.
              What began as a ration drive for white-collar families suffering
              from the lockdown has grown into a comprehensive welfare
              organization.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}