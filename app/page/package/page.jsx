'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiPeaceDove } from "react-icons/gi";
import { PiPottedPlantFill } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";
import "./package.css";

import heroBg from "../../../public/assets/saya2.jpg";

const Ramadan = () => {
    const [activeSection, setActiveSection] = useState(null);
    const wrapperRef = useRef(null);
    const scrollYRef = useRef(0);

    const handleToggle = (section) => {
        setActiveSection(prev => prev === section ? null : section);
    };

    const handleDonateScroll = () => {
        // 1. Popup band karo
        setActiveSection(null);

        // 2. Scroll lock manually hata do (useEffect se pehle)
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollYRef.current);

        // 3. Thodi der baad donate section par smooth scroll
        setTimeout(() => {
            const section = document.getElementById('donate');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setActiveSection(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setActiveSection(null);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <section className="ramadan" id="packages">

            <Image src={heroBg} alt="Ramadan" fill className="ramadan__bg-img" />
            <div className="ramadan__overlay" />

            <span className="rm__dot rm__dot--orange" />
            <span className="rm__dot rm__dot--green"  />
            <span className="rm__dot rm__dot--pink"   />
            <span className="rm__dot rm__dot--green2" />

            <span className="rm__star rm__star--s1">★</span>
            <span className="rm__star rm__star--s2">✦</span>
            <span className="rm__star rm__star--s3">★</span>
            <span className="rm__star rm__star--s4">✦</span>
            <span className="rm__star rm__star--s5">★</span>
            <span className="rm__star rm__star--s6">★</span>
            <span className="rm__star rm__star--s7">✦</span>
            <span className="rm__star rm__star--s8">★</span>
            <span className="rm__star rm__star--s9">✦</span>
            <span className="rm__star rm__star--s10">★</span>
            <span className="rm__star rm__star--s11">★</span>
            <span className="rm__star rm__star--s12">✦</span>

            <div className="ramadan__inner">

                <div className="ramadan__header">
                    <p className="ramadan__tagline">Blessed Month</p>
                    <h2 className="ramadan__heading">Ramadan Programs</h2>
                    <div className="ramadan__divider" />
                    <p className="ramadan__subtitle">
                        <strong>Ramadan Activities</strong> — During the blessed month of
                        Ramadan, we intensify our efforts to reach more families and spread
                        the spirit of giving.
                    </p>
                </div>

                <div className="imagesWrapper" ref={wrapperRef}>

                    {/* Image 1 */}
                    <div className="imageContainer1">
                        <div className="reportImage1">
                            <img src="/assets/img11.jpg" alt="Ration Drive" />
                            <span>01</span>
                            <FaHandHoldingUsd />
                            <h3>Ramadan Ration Drive</h3>
                            <p>Distributing essential food packages to families, ensuring no one goes hungry during the blessed month.</p>
                            <GoArrowRight
                                className="hoverArrow"
                                onClick={(e) => { e.stopPropagation(); handleToggle('packages'); }}
                            />
                        </div>
                        {activeSection === 'packages' && (
                            <div className="popup1">
                                <button onClick={() => setActiveSection(null)} style={{position:'absolute',top:12,right:14,background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#888'}}>×</button>
                                <h3 className="popup1Title">Ramadan Ration Packages</h3>
                                <p className="popup1Desc">Your generosity ensures families receive complete, nutritious food packages.</p>
                                <div className="popup1Cards">
                                    <div className="package1Card">
                                        <h4 className="package1Name">Essential Package</h4>
                                        <p className="package1SubDesc">Family of 4 for one week</p>
                                        <h2 className="package1Price">$20</h2>
                                        <ul className="package1Items">
                                            <li>5kg Premium Rice</li>
                                            <li>2kg Flour (Atta)</li>
                                            <li>1L Cooking Oil</li>
                                            <li>1kg Sugar</li>
                                            <li>500g Tea Leaves</li>
                                            <li>1kg Lentils (Dal)</li>
                                            <li>500g Salt</li>
                                            <li>Dates (1kg)</li>
                                        </ul>
                                        <button className="sponsor1Btn" onClick={handleDonateScroll}>Sponsor This Package</button>
                                    </div>
                                    <div className="package1Card popular1">
                                        <span className="popular1Badge">Most Popular</span>
                                        <h4 className="package1Name">Complete Family Package</h4>
                                        <p className="package1SubDesc">Family of 5 for two weeks</p>
                                        <h2 className="package1Price">$30</h2>
                                        <ul className="package1Items">
                                            <li>5kg Flour (Atta)</li>
                                            <li>3kg Premium Basmati Rice</li>
                                            <li>2kg Sugar</li>
                                            <li>3L Cooking Oil</li>
                                            <li>1/2kg Tea Leaves</li>
                                            <li>4kg Mixed Lentils</li>
                                            <li>Salt</li>
                                            <li>Dates (1/2kg)</li>
                                            <li>Spice Box (Complete)</li>
                                            <li>Vermicelli (Seviyan)</li>
                                            <li>Gram Flour Dumplings 1/2kg</li>
                                        </ul>
                                        <button className="sponsor1Btn" onClick={handleDonateScroll}>Sponsor This Package</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image 2 */}
                    <div className="imageContainer2">
                        <div className="reportImage2">
                            <img src="/assets/saya4.jpeg" alt="Iftar for the Needy" />
                            <GiPeaceDove />
                            <span>02</span>
                            <h3>Iftar for the Needy</h3>
                            <p>Organizing Iftar gatherings for underprivileged families and individuals in our community.</p>
                            <GoArrowRight
                                className="hoverArrow"
                                onClick={(e) => { e.stopPropagation(); handleToggle('iftar'); }}
                            />
                        </div>
                        {activeSection === 'iftar' && (
                            <div className="popup2">
                                <button onClick={() => setActiveSection(null)} style={{position:'absolute',top:12,right:14,background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#888'}}>×</button>
                                <h3 className="popup2Title">Ramadan 2026 - Lahore</h3>
                                <p className="popup2Desc">We are arranging Iftar drives in Ramadan 2026 in Lahore for underprivileged families and individuals. Come forward and support us in spreading the blessings of Ramadan to those who need it most.</p>
                                <div className="iftar2Card">
                                    <span className="iftar2Emoji">🤲</span>
                                    <p className="iftar2Highlight">Your contribution can help us serve Iftar to hundreds of needy people</p>
                                </div>
                                <button className="iftar2Btn" onClick={handleDonateScroll}>Donate for Iftar Drive</button>
                            </div>
                        )}
                    </div>

                    {/* Image 3 */}
                    <div className="imageContainer3">
                        <div className="reportImage3">
                            <PiPottedPlantFill />
                            <span>03</span>
                            <img src="/assets/img13.jpg" alt="Iftar for Orphans" />
                            <h3>Iftar for Orphans</h3>
                            <p>Special Iftar programs dedicated to orphaned children, bringing joy and warmth to their hearts.</p>
                            <GoArrowRight
                                className="hoverArrow"
                                onClick={(e) => { e.stopPropagation(); handleToggle('orphan'); }}
                            />
                        </div>
                        {activeSection === 'orphan' && (
                            <div className="popup3">
                                <button onClick={() => setActiveSection(null)} style={{position:'absolute',top:12,right:14,background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#888'}}>×</button>
                                <h3 className="popup3Title">Orphanage Iftar Program</h3>
                                <p className="popup3Desc">We are arranging Iftar in orphanages to bring joy and warmth to orphaned children during the blessed month of Ramadan. Your support helps us create memorable moments for these children.</p>
                                <div className="iftar3Card">
                                    <span className="iftar3Emoji">🤲</span>
                                    <p className="iftar3Highlight">Help us bring smiles to orphaned children this Ramadan</p>
                                </div>
                                <button className="iftar3Btn" onClick={handleDonateScroll}>Donate for Orphan Iftar</button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Ramadan;