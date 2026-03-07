"use client";
import { useRef, useState, useCallback } from "react";
import "./facilities.css";
import Image from "next/image";
import {
  ShoppingBasket,
  GraduationCap,
  Home,
  HeartPulse,
  Droplets,
  Baby,
  Utensils,
  Shirt,
  BookOpen,
  HandHeart,





  
} from "lucide-react";

import s15  from "../../../public/assets/s15.jpeg";
import s18  from "../../../public/assets/s18.jpeg";
import s19  from "../../../public/assets/s19.jpeg";
import se  from "../../../public/assets/se.jpeg";
import sg  from "../../../public/assets/sg.jpeg";
import sd  from "../../../public/assets/sd.jpeg";
import img7  from "../../../public/assets/ramzansaya.jpg";
import img8  from "../../../public/assets/clothsaya.jpg";
import img9  from "../../../public/assets/skillsaya.jpg";
import img10 from "../../../public/assets/widowsaya.avif";

const facilities = [
  {
    icon: ShoppingBasket,
    title: "Ration Drives",
    description:
      "Supporting white-collar families who were suffering from lockdown with essential food supplies and household necessities.",
    color: "#f07b2f",
    image: s15,
    size: "big",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description:
      "Bearing educational expenses for white-collar families' children and orphans to ensure they continue their studies.",
    color: "#4caf82",
    image: s18,
    size: "small",
  },
  {
    icon: Home,
    title: "Monthly Support",
    description:
      "Providing regular ration and helping with household expenses of widows and white-collar families in need.",
    color: "#1f325a",
    image: s19,
    size: "big",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Providing healthcare facilities and arranging medical camps for underprivileged communities across Pakistan.",
    color: "#e91e8c",
    image: se,
    size: "small",
  },
  {
    icon: Droplets,
    title: "Clean Water",
    description:
      "Installing water filtration plants in rural communities to provide access to clean and safe drinking water.",
    color: "#0ea5e9",
    image: sg,
    size: "big",
  },
   {
    icon: Utensils,
    title: "Iftar Programs",
    description:
      "Organizing community Iftar gatherings during Ramadan for underprivileged families and individuals.",
    color: "#f5a623",
    image: img7,
    size: "small",
  },
  {
    icon: Baby,
    title: "Orphan Care",
    description:
      "Providing comprehensive care, education and emotional support to orphaned children across Pakistan.",
    color: "#a855f7",
    image: sd,
    size: "big",
  },
  {
    icon: Shirt,
    title: "Clothing Drives",
    description:
      "Distributing seasonal clothing to families in need, ensuring warmth and dignity throughout the year.",
    color: "#4caf82",
    image: img8,
    size: "small",
  },
  {
    icon: BookOpen,
    title: "Skill Training",
    description:
      "Empowering youth and women with vocational skills to help them become self-sufficient and independent.",
    color: "#f07b2f",
    image: img9,
    size: "big",
  },
  {
    icon: HandHeart,
    title: "Widow Support",
    description:
      "Providing financial and emotional support to widows to help them rebuild their lives and care for their families.",
    color: "#e91e8c",
    image: img10,
    size: "small",
  },
];

const Facilities = () => {
  const trackRef = useRef(null);
  const [cur, setCur] = useState({ x: 0, y: 0, side: "right", show: false });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCur({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      side: e.clientX - rect.left < rect.width / 2 ? "left" : "right",
      show: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCur((p) => ({ ...p, show: false }));
  }, []);

  const handleClick = useCallback((e) => {
    if (!trackRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const goRight = e.clientX - rect.left >= rect.width / 2;
    trackRef.current.scrollBy({
      left: goRight ? 340 : -340,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="facilities" id="facilities">
      <span className="fac__dot fac__dot--orange" />
      <span className="fac__dot fac__dot--green" />
      <span className="fac__dot fac__dot--pink" />

      <span className="fac__star fac__star--s1">★</span>
      <span className="fac__star fac__star--s2">✦</span>
      <span className="fac__star fac__star--s3">★</span>
      <span className="fac__star fac__star--s4">✦</span>
      <span className="fac__star fac__star--s5">★</span>
      <span className="fac__star fac__star--s6">★</span>
      <span className="fac__star fac__star--s7">✦</span>
      <span className="fac__star fac__star--s8">★</span>
      <span className="fac__star fac__star--s9">✦</span>
      <span className="fac__star fac__star--s10">★</span>
      <span className="fac__star fac__star--s11">★</span>
      <span className="fac__star fac__star--s12">✦</span>
      <span className="fac__star fac__star--s13">★</span>
      <span className="fac__star fac__star--s14">✦</span>
      <span className="fac__star fac__star--s15">★</span>

      <div className="facilities__inner">
        <div className="facilities__header">
          <p className="facilities__tagline">What We Do</p>
          <div className="facilities__divider" />
          <p className="facilities__subtitle">
            Every initiative we run is built around one goal.
          </p>
        </div>

        <div
          className="fac__scroll-zone"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {cur.show && (
            <div
              className={`fac__cursor fac__cursor--${cur.side}`}
              style={{ left: cur.x, top: cur.y }}
            >
              {cur.side === "left" ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 4L7 10L13 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L13 10L7 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          )}

          <div className="fac__track" ref={trackRef}>
            {facilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`fac__card fac__card--${item.size}`}
                  style={{ "--card-color": item.color }}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="fac__card-bg-img"
                      sizes="(max-width: 768px) 60vw, 22vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}

                  {/* Overlay + text — DONO cards pe, big aur small dono */}
                  <div className="fac__card-overlay" />
                  <div className="fac__card-content">
                    <div className="fac__card-icon-wrap">
                      <Icon size={20} color="#fff" strokeWidth={2} />
                    </div>
                    <h3 className="fac__card-title">{item.title}</h3>
                    <p className="fac__card-desc">{item.description}</p>
                    <span className="fac__card-line" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fac__fade fac__fade--left" />
          <div className="fac__fade fac__fade--right" />
        </div>

        <div className="facilities__quote-banner">
          <span className="facilities__quote-mark">"</span>
          <p className="facilities__quote-text">
       
Narrated by Abu Hurairah (RA): 
The Prophet ﷺ said, "Every day two angels come down from Heaven and one of them says, O Allah! Compensate every person who spends in Your Cause, and the other (angel) says, O Allah!  <br />Sahih al‑Bukhari 1442
          </p>
        </div>
      </div>
    </section>
  );
};

export default Facilities;