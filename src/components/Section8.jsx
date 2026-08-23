import React from 'react';
import './Section8.css';

const ArrowSvg = () => (
  <svg x="0px" y="0px" viewBox="0 0 99.9 99.9" xmlSpace="preserve">
    <path className="st0" d="M90,83V6.4c0-1.4,0.4-2.5,1.3-3.5s2.1-1.4,3.7-1.4c1.5,0,2.7,0.5,3.6,1.3c0.9,0.9,1.3,2.1,1.3,3.6v85.5
      c0,1.2-0.2,2.3-0.6,3.2c-0.4,0.9-1,1.7-1.7,2.5s-1.6,1.3-2.5,1.7c-0.9,0.4-1.9,0.6-3.2,0.6H6.5c-1.3,0-2.5-0.4-3.5-1.3
      S1.5,96.5,1.5,95s0.4-2.8,1.3-3.7c0.9-0.9,2.1-1.4,3.7-1.4H83L1.5,8.5C0.5,7.5,0,6.3,0,5s0.5-2.5,1.5-3.5S3.7,0,5,0s2.5,0.5,3.5,1.5
      L90,83z" />
  </svg>
);

const WHATSAPP_NUMBER = '9879337290';

const Section8 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const get = (field) => (data.get(field) || '').toString().trim();

    const lines = [
      'New enquiry from website:',
      `Name: ${get('name')}`,
      `Surname: ${get('surname')}`,
      `Email: ${get('email')}`,
      get('phone') && `Telephone: ${get('phone')}`,
      get('message') && `Message: ${get('message')}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="sec_form">
      <div className="container p15t p10b p5lr flex-t flex-auto gap-7-5">

        <div className="s8_text tac_mobile w45l rel">
          <h3 className="s8_h3">CONTACT US</h3>
        </div>

        <div className="w55l rel" id="form">
          <form onSubmit={handleSubmit} noValidate>
            <div className="s8_fields">

              <div className="s8_field w50m">
                <label htmlFor="s8-name">Name <span className="s8_required">*</span></label>
                <input type="text" id="s8-name" name="name" required />
              </div>

              <div className="s8_field w50m">
                <label htmlFor="s8-surname">Surname <span className="s8_required">*</span></label>
                <input type="text" id="s8-surname" name="surname" required />
              </div>

              <div className="s8_field w50m">
                <label htmlFor="s8-email">Email <span className="s8_required">*</span></label>
                <input type="email" id="s8-email" name="email" required />
              </div>

              <div className="s8_field w50m">
                <label htmlFor="s8-phone">Telephone</label>
                <input type="tel" id="s8-phone" name="phone" />
              </div>

              <div className="s8_field s8_field_full">
                <label htmlFor="s8-message">Message</label>
                <textarea id="s8-message" name="message" rows="3" />
              </div>

            </div>

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
