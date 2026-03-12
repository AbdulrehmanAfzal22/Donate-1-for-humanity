"use client";
import { useState } from "react";
import Image from "next/image";
import { HandCoins, HeartHandshake, Home } from "lucide-react";
import "./join.css";
import d1h from "../../../public/assets/d1h.png";

const ROLES = [
  {
    id: "donor",
    icon: "lucide",
    LucideIcon: HandCoins,
    title: "Donor",
    subtitle: "Support with funds",
    desc: "Make a financial contribution to help us reach more people in need.",
    fields: ["Full Name", "Email", "Phone", "Donation Amount (PKR)"],
    fieldTypes: ["text", "email", "tel", "text"],
    placeholders: ["Muhammad Ali", "you@email.com", "+92 300 0000000", "e.g. 5000"],
  },
  {
    id: "volunteer",
    icon: "lucide",
    LucideIcon: HeartHandshake,
    title: "Volunteer",
    subtitle: "Give your time",
    desc: "Join our on-ground team and contribute your skills and energy directly.",
    fields: ["Full Name", "Email", "Phone", "Skills / Expertise"],
    fieldTypes: ["text", "email", "tel", "text"],
    placeholders: ["Muhammad Ali", "you@email.com", "+92 300 0000000", "e.g. Teaching, Medical, IT"],
  },
  {
    id: "place",
    icon: "lucide",
    LucideIcon: Home,
    title: "Offer a Venue",
    subtitle: "Volunteer by space",
    desc: "Provide a venue, hall or space for our programs, events or activities.",
    fields: ["Full Name", "Email", "Phone", "Venue / Address"],
    fieldTypes: ["text", "email", "tel", "text"],
    placeholders: ["Muhammad Ali", "you@email.com", "+92 300 0000000", "Street, City"],
  },
];

function RoleIcon({ role, size = 26 }) {
  const Icon = role.LucideIcon;
  return <Icon size={size} strokeWidth={1.8} className="jm__lucide-icon" />;
}

export default function JoinModal({ onClose }) {
  const [step, setStep] = useState("choose");
  const [selected, setSelected] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const role = ROLES.find((r) => r.id === selected);

  const handleSelect = (id) => {
    setSelected(id);
    setStep("form");
    setValues({});
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    // Guard: validate can be triggered before a role is selected.
    if (!role) return newErrors;

    role.fields.forEach((label, i) => {
      const key = `field_${i}`;
      const val = values[key];

      if (!val || !val.trim()) {
        newErrors[key] = `${label} is required`;
      }

      if (role.fieldTypes?.[i] === "email" && val && !/\S+@\S+\.\S+/.test(val)) {
        newErrors[key] = "Enter a valid email";
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      role.fields.forEach((label, i) => {
        formData.append(label, values[`field_${i}`]);
      });
      formData.append("Role", role.title);
      formData.append("_subject", `New ${role.title} Application`);
      formData.append("_captcha", "false");
      formData.append("_template", "table");

      await fetch("https://formsubmit.co/abdulrehmanafzal60@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      setLoading(false);
      setStep("success");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Submission failed. Please try again.");
    }
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="jm__backdrop" onClick={handleBackdrop}>
      <div className="jm__modal">
        <div className="jm__top-bar" />
        <button className="jm__close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── STEP 1: Choose role ── */}
        {step === "choose" && (
          <div className="jm__choose">
            <div className="jm__header">
              <Image src={d1h} alt="Join Icon" className="d1h-logo1" />
              <h2 className="jm__title">Join Our Mission</h2>
              <p className="jm__subtitle">Choose how you'd like to make a difference</p>
            </div>

            <div className="jm__cards">
              {ROLES.map((r) => (
                <button key={r.id} className="jm__role-card" onClick={() => handleSelect(r.id)}>
                  <span className="jm__role-icon-wrap">
                    <RoleIcon role={r} size={24} />
                  </span>
                  <span className="jm__role-title">{r.title}</span>
                  <span className="jm__role-sub">{r.subtitle}</span>
                  <span className="jm__role-arrow">→</span>
                </button>
              ))}
            </div>

            <p className="jm__note">Every contribution shapes a better tomorrow</p>
          </div>
        )}

        {/* ── STEP 2: Form ── */}
        {step === "form" && role && (
          <div className="jm__form-wrap">
            <div className="jm__form-header">
              <button className="jm__back" onClick={() => setStep("choose")}>← Back</button>
              <span className="jm__form-emoji-wrap">
                <RoleIcon role={role} size={28} />
              </span>
              <h2 className="jm__title">{role.title}</h2>
              <p className="jm__subtitle">{role.desc}</p>
            </div>

            <form className="jm__form" onSubmit={handleSubmit} noValidate>
              {role.fields.map((label, i) => {
                const key = `field_${i}`;
                return (
                  <div key={key} className="jm__field">
                    <label className="jm__label">{label}</label>
                    <div className={`jm__input-wrap ${errors[key] ? "jm__input-wrap--error" : ""}`}>
                      <input
                        className="jm__input"
                        type={role.fieldTypes?.[i] || "text"}
                        placeholder={role.placeholders?.[i] || ""}
                        value={values[key] || ""}
                        onChange={(e) => {
                          setValues((v) => ({ ...v, [key]: e.target.value }));
                          // If the user edits after an error was shown, clear it.
                          if (errors[key])
                            setErrors((er) => {
                              const n = { ...er };
                              delete n[key];
                              return n;
                            });
                        }}
                        onBlur={() => {
                          // Show validation as soon as the user leaves the input.
                          if (!role) return;

                          const val = (values[key] || "").trim();
                          let err = "";

                          if (!val) {
                            err = `${label} is required`;
                          } else if (role.fieldTypes?.[i] === "email" && !/\S+@\S+\.\S+/.test(val)) {
                            err = "Enter a valid email";
                          }

                          if (err) setErrors((prev) => ({ ...prev, [key]: err }));
                        }}
                      />
                    </div>
                    {errors[key] && <span className="jm__error">{errors[key]}</span>}
                  </div>
                );
              })}

              <button className="jm__submit" type="submit" disabled={loading}>
                {loading ? (
                  <span className="jm__spinner">⟳</span>
                ) : (
                  <>Submit as {role.title} <span className="jm__btn-arrow">→</span></>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === "success" && role && (
          <div className="jm__success">

            {/* Confetti dots */}
            {["c1","c2","c3","c4","c5","c6","c7","c8"].map(c => (
              <span key={c} className={`jm__confetti jm__confetti--${c}`} />
            ))}

            {/* Big emoji icon with rings */}
            <div className="jm__success-rings">
              <div className="jm__success-ring jm__success-ring--3" />
              <div className="jm__success-ring jm__success-ring--2" />
              <div className="jm__success-ring jm__success-ring--1" />
              <div className="jm__success-orb">
                <span className="jm__success-emoji">🎉</span>
              </div>
            </div>

            {/* Text */}
            <div className="jm__success-text-wrap">
              <h2 className="jm__success-title">You're In! <span>✨</span></h2>
              <p className="jm__success-role-line">
                Joined as <span className="jm__success-role-chip">{role.icon && <role.icon size={13} strokeWidth={2.5} />} {role.title}</span>
              </p>
              <p className="jm__success-msg">
                Thank you for stepping up 💛 We'll review your details and reach out to you shortly with next steps.
              </p>
            </div>

            {/* Stats row */}
            <div className="jm__success-stats">
              <div className="jm__success-stat"><span className="jm__success-stat-num">500+</span><span className="jm__success-stat-lbl">Volunteers</span></div>
              <div className="jm__success-stat-div" />
              <div className="jm__success-stat"><span className="jm__success-stat-num">20+</span><span className="jm__success-stat-lbl">Events</span></div>
              <div className="jm__success-stat-div" />
              <div className="jm__success-stat"><span className="jm__success-stat-num">5k+</span><span className="jm__success-stat-lbl">Families</span></div>
            </div>

            <button className="jm__success-btn" onClick={onClose}>
              Back to Home 🏠
            </button>

          </div>
        )}

        <span className="jm__deco jm__deco--s1">✦</span>
        <span className="jm__deco jm__deco--s2">✦</span>
        <span className="jm__deco jm__deco--s3">✦</span>
      </div>
    </div>
  );
}