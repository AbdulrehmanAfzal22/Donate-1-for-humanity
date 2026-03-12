"use client";

import "./floatingChatButtons.css";

export default function FloatingChatButtons({
  whatsappLink = "https://wa.me/923270195296",
  messengerLink = "https://m.me/d1h.trust",
}) {
  return (
    <div className="fcb" aria-label="Chat buttons">

      {/* WhatsApp — official icon */}
      <a
        className="fcb__btn fcb__btn--whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 48 48" width="26" height="26" aria-hidden="true" fill="none">
          <path
            fill="#fff"
            d="M24 4C12.954 4 4 12.954 4 24c0 3.59.94 6.962 2.587 9.878L4 44l10.42-2.54A19.927 19.927 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z"
          />
          <path
            fill="#25D366"
            d="M24 7.5C14.835 7.5 7.5 14.835 7.5 24c0 3.18.87 6.157 2.387 8.705L7.5 40.5l8.09-2.35A16.456 16.456 0 0 0 24 40.5c9.165 0 16.5-7.335 16.5-16.5S33.165 7.5 24 7.5Z"
          />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M19.07 16.5c-.42-1.01-.87-.98-1.2-.99-.31-.01-.66-.01-1.01-.01-.35 0-.92.13-1.4.66-.48.53-1.84 1.8-1.84 4.38 0 2.59 1.88 5.09 2.14 5.44.26.35 3.65 5.88 8.97 8.01 4.44 1.8 5.34 1.44 6.3 1.35.96-.09 3.1-1.27 3.54-2.49.44-1.22.44-2.27.31-2.49-.13-.22-.48-.35-.97-.61-.48-.26-2.89-1.43-3.34-1.59-.44-.17-.76-.26-1.08.26-.32.53-1.24 1.59-1.52 1.92-.28.33-.56.37-1.04.12-.48-.26-2.03-.75-3.87-2.39-1.43-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.57.72-.86.24-.28.32-.48.48-.79.16-.31.08-.59-.04-.83-.12-.24-1.04-2.65-1.47-3.64Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="fcb__label">WhatsApp</span>
      </a>

      {/* Messenger */}
      <a
        className="fcb__btn fcb__btn--messenger"
        href={messengerLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on Messenger"
        title="Chat on Messenger"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.45 5.5 3.72 7.2V22l3.39-1.86c.92.25 1.9.39 2.89.39 5.52 0 10-4.14 10-9.25S17.52 2 12 2Zm1 12.5-2.55-2.72-4.98 2.72 5.48-5.83 2.58 2.72 4.95-2.72L13 14.5Z"
          />
        </svg>
        <span className="fcb__label">Messenger</span>
      </a>

    </div>
  );
}