"use client";
import { useState } from "react";
import Image from "next/image";
import useBlurValidation from "../../hooks/useBlurValidation";
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

  const role = ROLES.find((r) => r.id === selected);

  const validators = role
    ? role.fields.reduce((acc, label, i) => {
        const key = `field_${i}`;
        const type = role.fieldTypes[i];

        acc[key] = (v) => {
          const value = (v ?? "").trim();

          if (!value) return `${label} is required`;

          if (type === "email") {
            if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address";
          }

          if (type === "tel") {
            const normalized = value.replace(/\s+/g, "");
            if (!/^(\+92|0)[3-9]\d{9}$/.test(normalized)) {
              return "Enter a valid Pakistani phone number (+92 or 03XX format)";
            }
          }

          if (label.toLowerCase().includes("donation") && role.id === "donor") {
            const amount = parseFloat(value.replace(/[^\d.]/g, ""));
            if (isNaN(amount) || amount < 100) return "Minimum donation amount is PKR 100";
          }

          return "";
        };

        return acc;
      }, {})
    : {};

  const {
    visibleErrors,
    setValue,
    handleBlur,
    validateAll,
  } = useBlurValidation({
    initialValues: values,
    validators,
  });
  const [loading, setLoading] = useState(false);

  const handleSelect = (id) => {
    setSelected(id);
    setStep("form");
    setValues({});
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return;
    const errs = validateAll();
    if (Object.keys(errs).length) return;

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
                    <div className={`jm__input-wrap ${visibleErrors[key] ? "jm__input-wrap--error" : ""}`}>
                      <input
                        className="jm__input"
                        type={role.fieldTypes[i]}
                        placeholder={role.placeholders[i]}
                        value={values[key] || ""}
                        onChange={(e) => {
                          const next = e.target.value;
                          setValues((v) => ({ ...v, [key]: next }));
                          setValue(key, next);
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                    {visibleErrors[key] && <span className="jm__error">{visibleErrors[key]}</span>}
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
            <div className="jm__success-ring">
              <div className="jm__success-icon">✓</div>
            </div>
            <h2 className="jm__success-title">You're In!</h2>
            <p className="jm__success-msg">
              Thank you for signing up as a <strong>{role.title}</strong>.<br />
              We'll be in touch with you shortly.
            </p>
            <button className="jm__success-btn" onClick={onClose}>Close</button>
          </div>
        )}

        <span className="jm__deco jm__deco--s1">✦</span>
        <span className="jm__deco jm__deco--s2">✦</span>
        <span className="jm__deco jm__deco--s3">✦</span>
      </div>
    </div>
  );
}