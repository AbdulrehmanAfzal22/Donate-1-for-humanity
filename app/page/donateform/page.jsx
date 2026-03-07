"use client";
import { useState, useEffect } from "react";
import "./donateform.css";
import {
  X, Heart, User, Mail, Phone,
  Lock, CheckCircle, Loader2, Send
} from "lucide-react";

export default function DonateForm({ amount, onClose }) {

  const [form, setForm]           = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function validate() {
    const errs = {};

    if (!form.name.trim()) errs.name = "Full name is required.";

    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email.";

    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone))
      errs.phone = "Enter a valid phone.";

    return errs;
  }

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    setErrors(prev => ({
      ...prev,
      [e.target.name]: ""
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("amount", amount);

    /* FormSubmit hidden fields */
    formData.append("_subject", "New Donation Request");
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_replyto", form.email);

    try {

      const response = await fetch(
        "https://formsubmit.co/abdulrehmanafzal60@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: formData
        }
      );

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("FormSubmit failed");
      }

    } catch (err) {
      console.error("FormSubmit error:", err);
    }

    setLoading(false);
  }

  const fields = [
    { id: "df-name",  name: "name",  type: "text",  label: "Full Name",     placeholder: "Ahmed Khan",      icon: User,  autoComplete: "name" },
    { id: "df-email", name: "email", type: "email", label: "Email Address",  placeholder: "ahmed@email.com", icon: Mail,  autoComplete: "email" },
    { id: "df-phone", name: "phone", type: "tel",   label: "Phone Number",   placeholder: "+92 300 1234567", icon: Phone, autoComplete: "tel" },
  ];

  return (
    <div className="dform__backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dform__modal" role="dialog" aria-modal="true">

        <div className="dform__top-bar" />

        <button className="dform__close" onClick={onClose} aria-label="Close">
          <X size={14} strokeWidth={2.5} />
        </button>

        {submitted ? (
          <div className="dform__success">

            <div className="dform__success-ring">
              <div className="dform__success-icon">
                <CheckCircle size={30} strokeWidth={2} color="#fff" />
              </div>
            </div>

            <h3 className="dform__success-title">Thank You!</h3>

            <p className="dform__success-msg">
              Your request of <strong>{amount}Rs</strong> has been received.
              <br />
              our&apos; volunteers will contact you soon!
            </p>

            <button
              className="dform__submit dform__submit--done"
              onClick={onClose}
            >
              <Heart size={13} fill="white" stroke="none" /> Close
            </button>

          </div>
        ) : (
          <>
            <div className="dform__header">

              <div className="dform__heart-wrap">
                <Heart size={20} fill="#f07b2f" stroke="none" className="dform__heart" />
              </div>

              <div className="dform__header-text">
                <h3 className="dform__title">Complete Donation</h3>
                <p className="dform__subtitle">
                  Giving <span className="dform__amount">{amount}Rs</span> — fill in your details
                </p>
              </div>

            </div>

            <form
              className="dform__form"
              onSubmit={handleSubmit}
              noValidate
            >

              <input type="hidden" name="_subject" value="New Donation Request" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {fields.map(({ id, name, type, label, placeholder, icon: Icon, autoComplete }) => (
                <div className="dform__field" key={id}>

                  <label className="dform__label" htmlFor={id}>
                    <Icon size={12} strokeWidth={2.5} className="dform__label-icon" />
                    {label}
                  </label>

                  <div className={`dform__input-wrap ${errors[name] ? "dform__input-wrap--error" : ""}`}>
                    <span className="dform__input-icon">
                      <Icon size={14} strokeWidth={2} />
                    </span>

                    <input
                      id={id}
                      name={name}
                      type={type}
                      className="dform__input"
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      autoComplete={autoComplete}
                    />

                  </div>

                  {errors[name] && (
                    <span className="dform__error">{errors[name]}</span>
                  )}

                </div>
              ))}

              <button
                type="submit"
                className={`dform__submit ${loading ? "dform__submit--loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="dform__spinner-icon" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Send size={13} strokeWidth={2.5} />
                    Send & Donate {amount}Rs
                  </>
                )}
              </button>

            </form>

            <div className="dform__secure">
              <Lock size={10} strokeWidth={2.5} />
              Encrypted & secure
            </div>
          </>
        )}
      </div>
    </div>
  );
}