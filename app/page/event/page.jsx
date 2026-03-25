"use client";
import { useState, useEffect, useRef } from "react";
import "./event.css";
import { MapPin, Calendar, Clock, Users, ChevronRight, ArrowLeft, X, ChevronLeft } from "lucide-react";

/* ── CountUp Component that animates every time on view ── */
function CountUpOnView({ value, suffix = "", startDigit = 0 }) {
    const [count, setCount] = useState(startDigit);
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    } else {
                        setIsInView(false);
                        setCount(startDigit);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [startDigit]);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = (value - startDigit) / steps;
        let current = startDigit;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            if (step >= steps) {
                setCount(value);
                clearInterval(timer);
            } else {
                current += increment;
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value, startDigit]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Upcoming Event ── */
const UPCOMING_EVENT = {
    title: "Annual Ration Drive 2025",
    subtitle: "Nourishing Families Across Pakistan",
    // Next Sunday at 6:00 PM Pakistan time (computed dynamically)
    venue: "Alhamra Cultural Complex",
    location: "The Mall Road, Lahore, Punjab",
    description:
        "Join us for our biggest annual ration distribution event. We'll be providing essential food packages to over 500 families in need. Volunteers, donors, and well-wishers are all welcome.",
    capacity: "500+ Families",
    registrationLink: "#donate",
};

function getNextSundayAt6pmPKT() {
    // Compute next Sunday 6:00 PM in Pakistan time (UTC+05:00)
    // We build it as an ISO string with +05:00 so countdown is consistent across devices.
    const now = new Date();

    // Convert "now" to Pakistan local date parts
    const pktNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));

    const day = pktNow.getDay(); // 0=Sun
    let daysUntilSunday = (7 - day) % 7;

    // If it's already Sunday and past (or equal) 6pm, go to next week
    const isSunday = day === 0;
    const isPast6pm = pktNow.getHours() > 18 || (pktNow.getHours() === 18 && pktNow.getMinutes() > 0);
    if (isSunday && isPast6pm) daysUntilSunday = 7;

    const target = new Date(pktNow);
    target.setDate(pktNow.getDate() + daysUntilSunday);
    target.setHours(18, 0, 0, 0);

    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, "0");
    const dd = String(target.getDate()).padStart(2, "0");

    // 18:00:00 in PKT
    return `${yyyy}-${mm}-${dd}T18:00:00+05:00`;
}

/* ── Past Events — add real photo arrays per event ── */
const PAST_EVENTS = [
    {
        id: "ramadan-2024",
        year: "2024",
        title: "Ramadan Iftar Drive",
        location: "Model Town, Lahore",
        date: "March 2024",
        impact: "1,200 meals served",
        color: "#7C3AFF",
        description:
            "Our Ramadan Iftar Drive brought together hundreds of volunteers to serve over 1,200 warm meals to families and individuals across Lahore during the holy month.",
        photos: [
            "/assets/ramzansaya.jpg",
            "/assets/s15.jpeg",
            "/assets/s18.jpeg",
            "/assets/s19.jpeg",
            "/assets/clothsaya.jpg",
            "/assets/skillsaya.jpg",
        ],
    },
    {
        id: "winter-2023",
        year: "2024",
        title: "Winter Clothing Drive",
        location: "Gulberg, Lahore",
        date: "December 2023",
        impact: "800 families clothed",
        color: "#00BFDF",
        description:
            "As temperatures dropped, our team distributed warm clothing bundles to 800 families, ensuring no one faced the cold without proper clothing.",
        photos: [
            "/assets/clothsaya.jpg",
            "/assets/s18.jpeg",
            "/assets/s19.jpeg",
            "/assets/se.jpeg",
            "/assets/sg.jpeg",
            "/assets/ramzansaya.jpg",
        ],
    },
    {
        id: "flood-2023",
        year: "2023",
        title: "Flood Relief Camp",
        location: "Sindh, Pakistan",
        date: "September 2023",
        impact: "2,000+ kits distributed",
        color: "#5B1FE0",
        description:
            "In response to devastating floods, our teams reached remote areas of Sindh distributing over 2,000 emergency relief kits to affected families.",
        photos: [
            "/assets/se.jpeg",
            "/assets/sg.jpeg",
            "/assets/sd.jpeg",
            "/assets/s15.jpeg",
            "/assets/skillsaya.jpg",
            "/assets/widowsaya.avif",
        ],
    },
    {
        id: "education-2023",
        year: "2023",
        title: "Education Scholarship Night",
        location: "Johar Town, Lahore",
        date: "June 2023",
        impact: "60 students sponsored",
        color: "#00E5FF",
        description:
            "An inspiring evening where 60 deserving students received full scholarships, giving them the opportunity to continue their education without financial burden.",
        photos: [
            "/assets/s18.jpeg",
            "/assets/skillsaya.jpg",
            "/assets/s19.jpeg",
            "/assets/ramzansaya.jpg",
            "/assets/sd.jpeg",
            "/assets/clothsaya.jpg",
        ],
    },
    {
        id: "ration-2022",
        year: "2022",
        title: "Ration Distribution Drive",
        location: "Faisalabad",
        date: "November 2022",
        impact: "450 families supported",
        color: "#7C3AFF",
        description:
            "We reached out to 450 families in Faisalabad, providing them with monthly ration packages to help sustain their households through difficult times.",
        photos: [
            "/assets/s15.jpeg",
            "/assets/ramzansaya.jpg",
            "/assets/se.jpeg",
            "/assets/s18.jpeg",
            "/assets/sg.jpeg",
            "/assets/s19.jpeg",
        ],
    },
    {
        id: "medical-2022",
        year: "2022",
        title: "Medical Camp",
        location: "Rural Punjab",
        date: "April 2022",
        impact: "300 patients treated",
        color: "#00BFDF",
        description:
            "Our medical camp brought healthcare professionals to rural Punjab, providing free consultations, medicines, and treatments to over 300 patients.",
        photos: [
            "/assets/se.jpeg",
            "/assets/sg.jpeg",
            "/assets/widowsaya.avif",
            "/assets/s15.jpeg",
            "/assets/sd.jpeg",
            "/assets/skillsaya.jpg",
        ],
    },
];

/* ── Countdown hook ── */
function useCountdown(targetDate) {
    const calc = () => {
        const target = new Date(targetDate);
        const now = new Date();

        // If date is invalid, fail gracefully
        if (isNaN(target.getTime())) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const diff = target.getTime() - now.getTime();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    };

    const [time, setTime] = useState(calc);

    useEffect(() => {
        // Update immediately so UI is never stale
        setTime(calc());

        const t = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetDate]);

    return time;
}

/* ════════════════════════════════════════
   EVENT DETAIL PAGE
════════════════════════════════════════ */
function EventDetailPage({ event, onBack }) {
    const [lightbox, setLightbox] = useState(null); // index or null

    const handleKey = (e) => {
        if (lightbox === null) return;
        if (e.key === "ArrowRight") setLightbox((l) => (l + 1) % event.photos.length);
        if (e.key === "ArrowLeft") setLightbox((l) => (l - 1 + event.photos.length) % event.photos.length);
        if (e.key === "Escape") setLightbox(null);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightbox]);

    useEffect(() => {
        document.body.style.overflow = lightbox !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [lightbox]);

    return (
        <div className="ev-detail" style={{ "--ev-accent": event.color }}>
            {/* Bg orbs */}
            <div className="ev__orb ev__orb--1" />
            <div className="ev__orb ev__orb--2" />

            <div className="ev-detail__inner">

                {/* Back button */}
                <button className="ev-detail__back" onClick={onBack}>
                    <ArrowLeft size={16} strokeWidth={2.5} />
                    Back to Events
                </button>

                {/* Header */}
                <div className="ev-detail__header">
                    <div className="ev-detail__header-meta">
                        <span className="ev-detail__year-tag" style={{ color: event.color, borderColor: event.color }}>
                            {event.year}
                        </span>
                        <span className="ev-detail__impact-tag">{event.impact}</span>
                    </div>
                    <h1 className="ev-detail__title">{event.title}</h1>
                    <div className="ev-detail__info-row">
                        <span className="ev-detail__info-item"><MapPin size={14} />{event.location}</span>
                        <span className="ev-detail__info-item"><Calendar size={14} />{event.date}</span>
                    </div>
                    <p className="ev-detail__desc">{event.description}</p>
                </div>

                {/* Photo gallery */}
                <div className="ev-detail__gallery-label">
                    <span className="ev-detail__gallery-title">Event Photos</span>
                    <span className="ev-detail__gallery-count">{event.photos.length} photos</span>
                </div>

                <div className="ev-detail__gallery">
                    {event.photos.map((src, i) => (
                        <div
                            key={i}
                            className={`ev-detail__photo-wrap ev-detail__photo-wrap--${i === 0 ? "featured" : "normal"}`}
                            onClick={() => setLightbox(i)}
                        >
                            <img src={src} alt={`${event.title} photo ${i + 1}`} className="ev-detail__photo" />
                            <div className="ev-detail__photo-overlay">
                                <span className="ev-detail__photo-zoom">🔍</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Lightbox */}
            {lightbox !== null && (
                <div className="ev-lb" onClick={() => setLightbox(null)}>
                    <button className="ev-lb__close" onClick={() => setLightbox(null)}><X size={22} /></button>

                    <button
                        className="ev-lb__nav ev-lb__nav--prev"
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + event.photos.length) % event.photos.length); }}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div className="ev-lb__img-wrap" onClick={(e) => e.stopPropagation()}>
                        <img src={event.photos[lightbox]} alt="" className="ev-lb__img" />
                        <p className="ev-lb__counter">{lightbox + 1} / {event.photos.length}</p>
                    </div>

                    <button
                        className="ev-lb__nav ev-lb__nav--next"
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % event.photos.length); }}
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════════════════
   MAIN EVENTS PAGE
════════════════════════════════════════ */
export default function EventsPage() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [popupEvent, setPopupEvent] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const upcomingTarget = getNextSundayAt6pmPKT();
    const countdown = useCountdown(upcomingTarget);

    const eventDate = new Date(upcomingTarget);
    const formattedDate = eventDate.toLocaleDateString("en-PK", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Karachi",
    });
    const formattedTime = eventDate.toLocaleTimeString("en-PK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Karachi",
    });

    if (selectedEvent) {
        return <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
    }

    return (
        <div className="events-page" id="events">
            <div className="ev__orb ev__orb--1" />
            <div className="ev__orb ev__orb--2" />
            <div className="ev__orb ev__orb--3" />
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map(s => (
                <span key={s} className={`ev__star ev__star--${s}`}>✦</span>
            ))}

            <div className="ev__inner">

                {/* Header */}
                <div className="ev__page-header">
                    <span className="ev__page-tag">Events &amp; Programs</span>
                    <h1 className="ev__page-title">Our <span className="ev__title-accent">Events</span></h1>
                    <div className="ev__page-divider" />
                    <p className="ev__page-sub">Be part of something meaningful. Every event is a step towards a better tomorrow.</p>
                </div>

                {/* Stats row */}
                <section className="ev-stats" aria-label="Impact statistics">
                    <div className="ev-stats__grid">
                        <div className="ev-stats__card">
                            <p className="ev-stats__num">
                                <CountUpOnView value={35} suffix="+" startDigit={8} />
                            </p>
                            <p className="ev-stats__label">Events Organized</p>
                        </div>

                        <div className="ev-stats__card">
                            <p className="ev-stats__num">
                                <CountUpOnView value={250} suffix="+" startDigit={42} />
                            </p>
                            <p className="ev-stats__label">Volunteers</p>
                        </div>

                        <div className="ev-stats__card">
                            <p className="ev-stats__num">
                                <CountUpOnView value={5000} suffix="+" startDigit={1250} />
                            </p>
                            <p className="ev-stats__label">People Helped</p>
                        </div>

                        <div className="ev-stats__card">
                            <p className="ev-stats__num">
                                <CountUpOnView value={1200} suffix="+" startDigit={350} />
                            </p>
                            <p className="ev-stats__label">Meals Served</p>
                        </div>
                    </div>
                </section>

                {/* Upcoming */}
                <section className="ev__upcoming">
                    <div className="ev__upcoming-badge">
                        <span className="ev__badge-dot" />
                        Upcoming Event
                    </div>

                    <div className="ev__upcoming-card">
                        <div className="ev__upcoming-left">
                            <h2 className="ev__upcoming-title">{UPCOMING_EVENT.title}</h2>
                            <p className="ev__upcoming-subtitle">{UPCOMING_EVENT.subtitle}</p>

                            <div className="ev__meta-grid">
                                <div className="ev__meta-item"><Calendar size={15} className="ev__meta-icon" /><span>{formattedDate}</span></div>
                                <div className="ev__meta-item"><Clock size={15} className="ev__meta-icon" /><span>{formattedTime}</span></div>
                                <div className="ev__meta-item"><MapPin size={15} className="ev__meta-icon" /><span>{UPCOMING_EVENT.venue}</span></div>
                                <div className="ev__meta-item"><MapPin size={15} className="ev__meta-icon ev__meta-icon--sub" /><span className="ev__meta-sub">{UPCOMING_EVENT.location}</span></div>
                                <div className="ev__meta-item"><Users size={15} className="ev__meta-icon" /><span>{UPCOMING_EVENT.capacity}</span></div>
                            </div>

                            <p className="ev__upcoming-desc">{UPCOMING_EVENT.description}</p>
                            <a href={UPCOMING_EVENT.registrationLink} className="ev__register-btn">
                                Register / Donate Now <ChevronRight size={16} />
                            </a>
                        </div>

                        <div className="ev__countdown-wrap">
                            <p className="ev__countdown-label">Event starts in</p>
                            <div className="ev__countdown">
                                {[
                                    { val: countdown.days, label: "Days" },
                                    { val: countdown.hours, label: "Hours" },
                                    { val: countdown.minutes, label: "Minutes" },
                                    { val: countdown.seconds, label: "Seconds" },
                                ].map(({ val, label }) => (
                                    <div key={label} className="ev__cd-unit">
                                        <div className="ev__cd-box">
                                            <span className="ev__cd-num" suppressHydrationWarning>
                                                {mounted ? String(val).padStart(2, "0") : "00"}
                                            </span>
                                        </div>
                                        <span className="ev__cd-label">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="ev__venue-card">
                                <div className="ev__venue-pin"><MapPin size={18} strokeWidth={2.5} /></div>
                                <div>
                                    <p className="ev__venue-name">{UPCOMING_EVENT.venue}</p>
                                    <p className="ev__venue-addr">{UPCOMING_EVENT.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Past Events */}
                <section className="ev__history">
                    <div className="ev__history-header">
                        <h2 className="ev__history-title">Past <span className="ev__title-accent">Events</span></h2>
                        <div className="ev__history-divider" />
                        <p className="ev__history-sub">Click on any event to view photos and details.</p>
                    </div>

                    <div className="ev__history-grid">
                        {PAST_EVENTS.map((ev, i) => (
                            <button
                                key={ev.id}
                                className="ev__hist-card ev__hist-card--clickable"
                                style={{ "--ev-color": ev.color, animationDelay: `${i * 0.08}s` }}
                                onClick={() => setPopupEvent(ev)}
                            >
                                <div className="ev__hist-top">
                                    <span className="ev__hist-year">{ev.year}</span>
                                    <span className="ev__hist-impact">{ev.impact}</span>
                                </div>
                                <h3 className="ev__hist-title">{ev.title}</h3>
                                <div className="ev__hist-meta">
                                    <span className="ev__hist-meta-item"><MapPin size={12} /> {ev.location}</span>
                                    <span className="ev__hist-meta-item"><Calendar size={12} /> {ev.date}</span>
                                </div>
                                <div className="ev__hist-footer">
                                    <span className="ev__hist-view-btn">View Photos <ChevronRight size={13} /><span className="circular-glow"></span></span>
                                </div>
                                <div className="ev__hist-line" />
                            </button>
                        ))}
                    </div>
                </section>

            </div>

            {/* Past Event Photos Popup (scrollable) */}
            {popupEvent && (
                <div className="ev-pop" role="dialog" aria-modal="true" onClick={() => setPopupEvent(null)}>
                    <div className="ev-pop__panel" onClick={(e) => e.stopPropagation()}>
                        <div className="ev-pop__header">
                            <div className="ev-pop__title-wrap">
                                <p className="ev-pop__kicker">{popupEvent.year} • {popupEvent.location}</p>
                                <h3 className="ev-pop__title">{popupEvent.title}</h3>
                            </div>
                            <button className="ev-pop__close" onClick={() => setPopupEvent(null)} aria-label="Close">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="ev-pop__body">
                            <div className="ev-pop__grid">
                                {popupEvent.photos.map((src, idx) => (
                                    <div key={idx} className="ev-pop__img-wrap">
                                        <img className="ev-pop__img" src={src} alt={`${popupEvent.title} photo ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}