import React, { useEffect } from 'react';
import './SideMenu.css';

const projectImages = [
  { src: '/interior 1.png', alt: 'Interior Project 1' },
  { src: '/interior 2.png', alt: 'Interior Project 2' },
  { src: '/interior 3.png', alt: 'Interior Project 3' },
  { src: '/interior 4.png', alt: 'Interior Project 4' },
  { src: '/interior 5.png', alt: 'Interior Project 5' },
  { src: '/interior 7.png', alt: 'Interior Project 7' },
  { src: '/interior 8.png', alt: 'Interior Project 8' },
  { src: '/interior 9.png', alt: 'Interior Project 9' },
  { src: '/interior 10.png', alt: 'Interior Project 10' },
];

const SideMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = () => {
    onClose();
  };

  const renderImages = (keyPrefix) => (
    projectImages.map((img, i) => (
      <li key={`${keyPrefix}-${i}`}>
        <a href="#sec_realizzazioni" onClick={handleNavClick}>
          <figure>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </figure>
        </a>
      </li>
    ))
  );

  return (
    <div className={`sidemenu ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="sidemenu__backdrop" onClick={onClose} />

      <div className="sidemenu__panel">
        <div className="sidemenu__nav">
          <header>
            <button className="sidemenu__close button-round --outline" onClick={onClose} aria-label="Close menu">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Close</span>
            </button>
          </header>
          <ul className="sidemenu__list">
            <li><a href="#s1_home" onClick={handleNavClick}>Home</a></li>
            <li><a href="#sec_servizi" onClick={handleNavClick}>Services</a></li>
            <li><a href="#sec_realizzazioni" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>
          <span className="sidemenu__copyright">&copy; 2026 Jigar Interior Design</span>
        </div>

        <div className="sidemenu__slider">
          <div className="sidemenu__slider-track">
            <ul className="sidemenu__slider-list">
              {renderImages('a')}
            </ul>
            <ul className="sidemenu__slider-list" aria-hidden="true">
              {renderImages('b')}
            </ul>
          </div>
        </div>

        <div className="sidemenu__contact">
          <div className="sidemenu__contact-header">
            <a href="https://wa.me/9879337290" target="_blank" rel="noopener noreferrer" className="button-round --outline sidemenu__whatsapp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Tell us</span>
            </a>
            <button className="sidemenu__close button-round --outline" onClick={onClose} aria-label="Close menu">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Close</span>
            </button>
          </div>
          <ul className="sidemenu__contact-list">
            <li>
              <div className="sidemenu__contact-title">Location</div>
              <div className="sidemenu__contact-content">
                <a href="https://maps.app.goo.gl/Y49bmjVvK1i1TPjD9" target="_blank" rel="noopener noreferrer">
                  A-8, Govardhan Township,<br />
                  Waghodia Dabhoi Ring Road,<br />
                  Vadodara
                </a>
              </div>
            </li>
            <li>
              <div className="sidemenu__contact-title">Schedule</div>
              <div className="sidemenu__contact-content">
                <div>Monday to Thursday 09:00 - 18:00</div>
                <div>Friday 08:00 - 14:00</div>
                <div>Closed Saturday and Sunday</div>
              </div>
            </li>
            <li>
              <div className="sidemenu__contact-title">Phone</div>
              <div className="sidemenu__contact-content">
                <a href="tel:+919879337290">+91 9879337290</a>
              </div>
            </li>
            <li>
              <div className="sidemenu__contact-title">Email</div>
              <div className="sidemenu__contact-content">
                <a href="mailto:jigarinterior07@gmail.com">jigarinterior07@gmail.com</a>
              </div>
            </li>
            <li>
              <div className="sidemenu__contact-title">WhatsApp</div>
              <div className="sidemenu__contact-content">
                <a href="https://wa.me/9879337290" target="_blank" rel="noopener noreferrer">+91 9879337290</a>
              </div>
            </li>
            <li>
              <div className="sidemenu__contact-title">Instagram</div>
              <div className="sidemenu__contact-content">
                <a href="https://www.instagram.com/jigar_interior?igsi=dHNiZ3Vjdjl2cTNl" target="_blank" rel="noopener noreferrer">@jigar_interior</a>
              </div>
            </li>
          </ul>
          <div className="sidemenu__contact-footer">
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
