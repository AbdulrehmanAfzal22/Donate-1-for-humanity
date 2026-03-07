"use client";
import { useState } from "react";
import {
  BsBank2,
  BsCreditCard2Front,
  BsClipboard,
  BsCheckCircleFill,
  BsEnvelopeHeart,
} from "react-icons/bs";
import "./bank.css";

const banks = [
  {
    id: "meezan",
    name: "Meezan Bank",
    type: "Islamic Banking",
    icon: <BsBank2 />,
    holder: "Muhammad Fuad Mufti",
    iban: "PK68MEZN0002360103881902",
  },
  {
    id: "mcb",
    name: "MCB Bank",
    type: "Commercial Banking",
    icon: <BsCreditCard2Front />,
    holder: "Muhammad Fuad Mufti",
    iban: "PK13MUCB1606024001010677",
  },
];

function BankCard({ bank, delay }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bank.iban).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bank-card" style={{ animationDelay: `${delay}s` }}>
      {copied && <span className="copy-toast">Copied!</span>}

      <div className="bank-card__logo">
        <div className="bank-card__icon">{bank.icon}</div>
        <div>
          <div className="bank-card__name">{bank.name}</div>
          <div className="bank-card__type">{bank.type}</div>
        </div>
      </div>

      <div className="bank-card__field">
        <div className="bank-card__label">Account Holder</div>
        <div className="bank-card__value">{bank.holder}</div>
      </div>

      <div className="bank-card__field">
        <div className="bank-card__label">IBAN Number</div>
        <div className="bank-card__iban-row">
          <span className="bank-card__iban-text">{bank.iban}</span>
          <button
            className={`copy-btn ${copied ? "copy-btn--copied" : ""}`}
            onClick={handleCopy}
          >
            {copied ? <BsCheckCircleFill /> : <BsClipboard />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Close button page.jsx mein hai — yahan nahi
export default function DonateSection() {
  return (
    <section className="donate-section">

      <span className="dot dot--pink1" />
      <span className="dot dot--pink2" />
      <span className="dot dot--green1" />
      <span className="dot dot--green2" />

      <span className="bank__star bank__star--s1">★</span>
      <span className="bank__star bank__star--s2">✦</span>
      <span className="bank__star bank__star--s3">★</span>
      <span className="bank__star bank__star--s4">✦</span>

      <div className="donate-header">
        <p className="donate-header__tagline">Make a Difference Today</p>
        <h2>
          Your Generosity<br />
          <span>Transforms Lives</span>
        </h2>
        <div className="donate-header__bar" />
        <p className="donate-header__sub">
          Every contribution, big or small, brings hope to those in need.
        </p>
      </div>

      <div className="donate-grid">
        {banks.map((bank, i) => (
          <BankCard key={bank.id} bank={bank} delay={0.1 + i * 0.12} />
        ))}
      </div>

      <div className="donate-notice">
        <div className="donate-notice__body">
          <p>
            After completing your transfer, please send us your{" "}
            <strong>payment screenshot or transaction ID</strong>{" "}
            for proper acknowledgment.
          </p>
        </div>
      </div>

    </section>
  );
}