import React, { useState } from 'react';
import './Section8.css';

const WHATSAPP_NUMBER = '9879337290';

const ArrowSvg = () => (
  <svg x="0px" y="0px" viewBox="0 0 99.9 99.9" xmlSpace="preserve">
    <path className="st0" d="M90,83V6.4c0-1.4,0.4-2.5,1.3-3.5s2.1-1.4,3.7-1.4c1.5,0,2.7,0.5,3.6,1.3c0.9,0.9,1.3,2.1,1.3,3.6v85.5
      c0,1.2-0.2,2.3-0.6,3.2c-0.4,0.9-1,1.7-1.7,2.5s-1.6,1.3-2.5,1.7c-0.9,0.4-1.9,0.6-3.2,0.6H6.5c-1.3,0-2.5-0.4-3.5-1.3
      S1.5,96.5,1.5,95s0.4-2.8,1.3-3.7c0.9-0.9,2.1-1.4,3.7-1.4H83L1.5,8.5C0.5,7.5,0,6.3,0,5s0.5-2.5,1.5-3.5S3.7,0,5,0s2.5,0.5,3.5,1.5
      L90,83z" />
  </svg>
);

const Section8 = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const buildWhatsAppMessage = () => {
    return [
      '✦  NEW ENQUIRY  ·  JIGAR INTERIORS  ✦',
      '',
      'Hello Jigar Interiors,',
      'someone has just shared their dream space with you.',
      '',
      `Name        : ${form.name} ${form.surname}`.trim(),
      `Email         : ${form.email}`,
      form.phone ? `Phone       : ${form.phone}` : null,
      '',
      form.message
        ? `Their vision:\n“${form.message}”`
        : 'Their vision: “I would love to talk about my interiors.”',
      '',
      '— sent with love from jigarinteriors.in',
    ]
      .filter((line) => line !== null)
      .join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.surname.trim()) {
      setError('May we know your lovely name? Please fill in Name & Surname.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Please enter a valid email so we can write back to you.');
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSent(true);
    setError('');
    setForm({ name: '', surname: '', email: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="sec_form">
      <div className="container p15t p10b p5lr flex-t flex-auto gap-7-5">

        <div className="s8_text tac_mobile w45l rel">
          <h3 className="s8_h3">CONTACT US</h3>
          <p className="s8_tagline">
            Every beautiful space begins with a simple hello.
            Share your dream with us — and let&rsquo;s craft it into reality.
          </p>
          <p className="s8_whatsapp_hint">
            Your message lands directly on our WhatsApp&nbsp;·&nbsp;
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              +91 98793 37290
            </a>
          </p>
        </div>

        <div className="w55l rel" id="form">
          <form onSubmit={handleSubmit} noValidate>
            <div className="s8_fields">

              <div className="s8_field w50m">
                <label htmlFor="s8-name">Name <span className="s8_required">*</span></label>
                <input type="text" id="s8-name" name="name" required value={form.name} onChange={handleChange} autoComplete="given-name" />
              </div>

              <div className="s8_field w50m">
                <label htmlFor="s8-surname">Surname <span className="s8_required">*</span></label>
                <input type="text" id="s8-surname" name="surname" required value={form.surname} onChange={handleChange} autoComplete="family-name" />
              </div>

              <div className="s8_field w50m">
                <label htmlFor="s8-email">Email <span className="s8_required">*</span></label>
                <input type="email" id="s8-email" name="email" required value={form.email} onChange={handleChange} autoComplete="email" />
              </div>

              <div className="s8_field w50m">
                <label htmlFor="s8-phone">Telephone</label>
                <input type="tel" id="s8-phone" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" />
              </div>

              <div className="s8_field s8_field_full">
                <label htmlFor="s8-message">Message</label>
                <textarea id="s8-message" name="message" rows="3" placeholder="Tell us about the space you dream of…" value={form.message} onChange={handleChange} />
              </div>

            </div>

            {error && (
              <p className="s8_error" role="alert">{error}</p>
            )}

            {sent && (
              <p className="s8_success" role="status">
                Thank you — WhatsApp is opening with your message.
                Just press send, and we&rsquo;ll be with you shortly. ✦
              </p>
            )}

            <div className="s8_submit_wrap">
              <button type="submit" className="s8_submit">
                <ArrowSvg />
                <span>Send message</span>
                <ArrowSvg />
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Section8;
