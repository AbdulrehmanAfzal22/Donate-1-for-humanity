"use client";
import { useState } from "react";
import "./donatesection.css";
import DonateForm from "../donateform/page";
import { Heart, ChevronRight } from "lucide-react";

const AMOUNTS = [500,1000, 5000, 10000, ];

export default function Donate() {
  const [selected, setSelected] = useState(500);
  const [custom, setCustom] = useState("");

  const [showForm, setShowForm] = useState(false);

  const finalAmount = selected === "custom"
    ? (parseFloat(custom) || 0)
    : selected;

  function handleCustomChange(e) {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setCustom(val);
  }

  return (
    <>
      <section className="donate" id="donate">

        {/* Decorative elements – kept subtle */}
        <span className="donate__dot donate__dot--orange" />
        <span className="donate__dot donate__dot--green"  />
        <span className="donate__dot donate__dot--pink"   />

        {["s1","s3","s5","s7","s9"].map(k => (
          <span key={k} className={`donate__star donate__star--${k}`}>★</span>
        ))}

        <div className="donate__inner">

          {/* Header */}
          <div className="donate__header">
            <p className="donate__tagline">MAKE DONATIONS</p>
            <h2 className="donate__heading">
              Inspiring acts of kindness,<br />
              our charity of journey
            </h2>
            <p className="donate__subtitle">
              Help us make lasting impact. Together we uplift lives and strengthen the communities.
            </p>
            {/* <p className="donate__description">
              Gravida quis blandit turpis cursus in hac habitasse platea dictumst.
              Risus feugiat in ante metus dictum at tempor commodo ullamcorper.
            </p> */}
          </div>

          {/* Amount selector */}
          <div className="donate__amounts">
            {AMOUNTS.map(amt => (
              <button
                key={amt}
                className={`donate__amt-btn ${selected === amt ? "donate__amt-btn--active" : ""}`}
                onClick={() => { setSelected(amt); setCustom(""); }}
              >
                {amt}Rs
              </button>
            ))}
            <button
              className={`donate__amt-btn donate__amt-btn--custom ${selected === "custom" ? "donate__amt-btn--active" : ""}`}
              onClick={() => setSelected("custom")}
            >
              Custom
            </button>
          </div>

          {/* Custom amount input – only visible when "Custom" is selected */}
          {selected === "custom" && (
            <div className="donate__custom-container">
              <div className="donate__custom-wrap">
                <span className="donate__custom-prefix">$</span>
                <input
                  className="donate__custom-input"
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={custom}
                  onChange={handleCustomChange}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Donate button */}
          <button
            className="donate__btn"
            onClick={() => finalAmount > 0 && setShowForm(true)}
            disabled={finalAmount <= 0}
          >
            <span className="donate__btn-inner">
              <Heart size={18} fill="white" stroke="none" />
              <span className="donate__btn-text">DONATE NOW</span>
              <ChevronRight size={18} />
            </span>
          </button>

        </div>
      </section>

      {showForm && (
        <DonateForm
          amount={finalAmount}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}