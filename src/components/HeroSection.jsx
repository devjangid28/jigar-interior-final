import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';
import SideMenu from './SideMenu.jsx';
import logo from '/logo.PNG';

const HeroSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mediaBgRef = useRef(null);
  const heroRef = useRef(null);
  const heroLogoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => { clearTimeout(timer); };
  }, []);

  // Scroll parallax + SVG logo transition
  useEffect(() => {
    const hero = heroRef.current;
    const mediaBg = mediaBgRef.current;
    const heroLogo = heroLogoRef.current;
    const logo = document.querySelector('#Header > .logo');
    if (!hero) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const heroHeight = hero.offsetHeight;
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / heroHeight));

        if (scrollProgress > 0) {
          if (mediaBg) {
            const bgOffset = scrollProgress * heroHeight * -0.5;
            mediaBg.style.transform = `translate3d(0px, ${bgOffset}px, 0px)`;
          }
        } else {
          if (mediaBg) {
            mediaBg.style.transform = 'translate3d(0px, 0px, 0px)';
          }
        }

        // SVG text → logo transition
        // At scroll 0: SVG visible (large, centered), logo hidden
        // At scroll 1: SVG hidden, logo visible in header
        const transitionStart = 0;
        const transitionEnd = 0.6;
        const t = Math.max(0, Math.min(1, (scrollProgress - transitionStart) / (transitionEnd - transitionStart)));

        if (heroLogo) {
          // Scale: 1.1 → 0.12 (header size)
          const svgScale = 1.1 - t * (0.9 - 0.12);
          // Opacity: fade out in last 30%
          const opacity = t > 0.7 ? 1 - ((t - 0.7) / 0.3) : 1;

          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const isMobile = vw <= 480;

          if (isMobile) {
            const translateX = -t * vw * 0.3;
            const translateY = -t * vh * 0.35;
            heroLogo.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale3d(${svgScale}, ${svgScale}, 1)`;
          } else {
            const translateX = -t * vw * 0.1;
            const translateY = -t * vh * 0.25;
            heroLogo.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale3d(${svgScale}, ${svgScale}, 1)`;
          }

          heroLogo.style.opacity = opacity;
        }

        if (logo) {
          // Logo fades in as SVG fades out
          const logoOpacity = t > 0.5 ? (t - 0.5) / 0.5 : 0;
          logo.style.opacity = logoOpacity;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header id="Header" className={menuOpen ? '--with-bg' : ''}>
        <a href="/" className="logo" aria-label="Jigar Interiors">
          <img src={logo} alt="Jigar Interiors" className="logo__full" />
          <img src={logo} alt="Jigar Interiors" className="logo__symbol" />
        </a>
        <nav className="__menu" role="menu">
          <a className="link-circle" href="#sec_realizzazioni" role="menuitem">
            <span>Projects</span>
          </a>
          <a className="link-circle" href="#sec_servizi" role="menuitem">
            <span>Services</span>
          </a>
          <a className="link-circle" href="#contact" role="menuitem">
            <span>Contact</span>
          </a>
          <button className="link-circle menu-toggle" onClick={handleToggleMenu} role="menuitem" aria-label="Toggle menu">
            <span>Menu</span>
          </button>
          <a href="https://wa.me/9879337290" target="_blank" rel="noopener noreferrer" className="header__whatsapp--mobile button-round --outline --invert" aria-label="Tell us on WhatsApp">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Tell us</span>
          </a>
          <button className="Header__toggle button-round --outline --invert" onClick={handleToggleMenu} aria-label="Menu" role="menuitem">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.25c-3.22 0-6.15 1.78-7.63 4.64l-.06.12.06.12c1.49 2.86 4.41 4.63 7.63 4.63s6.14-1.77 7.63-4.63l.06-.12-.06-.12A8.568 8.568 0 008 3.25zm0 9C5.01 12.25 2.29 10.63.87 8 2.28 5.37 5 3.75 8 3.75S13.71 5.38 15.13 8A8.092 8.092 0 018 12.25z" fill="currentColor"/>
              <path d="M8 5.5a2.5 2.5 0 000 5 2.5 2.5 0 000-5zM8 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
            </svg>
            <span>Menu</span>
          </button>
        </nav>
        <a href="https://wa.me/9879337290" target="_blank" rel="noopener noreferrer" className="header__whatsapp button-round --outline --invert" aria-label="Tell us on WhatsApp">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Tell us</span>
        </a>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}>
          <div className="mobile-menu__inner">
            <a className="mobile-menu__link" href="#sec_realizzazioni" onClick={() => setMenuOpen(false)}>Projects</a>
            <a className="mobile-menu__link" href="#sec_servizi" onClick={() => setMenuOpen(false)}>Services</a>
            <a className="mobile-menu__link" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="https://wa.me/9879337290" target="_blank" rel="noopener noreferrer" className="mobile-menu__link mobile-menu__whatsapp" aria-label="Tell us on WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Tell us</span>
            </a>
          </div>
        </div>
      )}

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div id="HeroLogoText" ref={heroLogoRef} aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 11.329999923706055 220.30999755859375 35.400001525878906" data-asc="0.9296875" width="220.30999755859375" height="35.400001525878906"><g fill="#a2adb4"><g transform="translate(0, 0)"><path d="M6.86 46.63C11.91 46.63 14.45 43.19 14.45 36.99L14.45 11.47L11.25 11.47L11.25 36.99C11.25 42.94 9.81 46.24 6.81 46.24C4.52 46.24 2.34 43.09 3.39 37.79L0 41.63C0.46 44.63 3.20 46.63 6.86 46.63ZM19.31 46.48L22.51 46.48L22.51 11.47L19.31 11.47ZM35.06 46.73C36.72 46.73 37.94 46.00 39.06 44.43L39.16 44.29C39.23 44.19 39.31 44.07 39.38 43.95L41.63 40.43L41.63 46.48L42.02 46.48L42.02 24.54C41.16 25.15 40.06 25.29 39.06 25.29L33.67 25.29L33.67 25.68L39.06 25.68L39.06 43.63C38.75 44.09 37.96 44.48 36.96 44.48C32.67 44.48 29.98 38.94 29.98 27.83C29.98 18.63 31.86 11.74 35.11 11.74C37.38 11.74 39.31 15.58 38.26 22.68L41.67 18.82C41.21 14.09 38.70 11.33 35.11 11.33C29.88 11.33 26.76 17.94 26.76 28.74C26.76 39.99 30.08 46.73 35.06 46.73ZM59.86 46.48L63.11 46.48L54.42 11.47L53.96 11.47L52.54 17.16L45.26 46.48L48.66 46.48C48.49 42.65 48.75 38.84 49.29 35.03L57.01 35.03ZM49.37 34.64C50.17 29.13 51.49 23.61 52.76 18.07L56.91 34.64ZM84.16 46.48L84.72 46.48L84.72 46.14L84.16 46.14C81.91 46.14 81.20 42.14 79.86 35.18C78.59 28.74 77.20 25.59 73.05 23.83L73.41 23.83C78.42 23.83 81.15 21.48 81.15 17.53C81.15 13.53 78.22 11.47 71.66 11.47L69.68 11.47L69.68 11.50L66.87 11.47L66.87 46.48L70.07 46.48L70.07 23.02C70.36 23.17 70.70 23.34 71.12 23.46L71.12 23.49C74.90 25.07 75.22 28.03 76.66 35.18C78.10 42.38 79.66 46.48 84.16 46.48ZM70.07 22.63L70.07 11.89L71.66 11.89C76.05 11.89 77.95 13.79 77.95 17.53C77.95 21.19 76.37 23.44 73.41 23.44C72.02 23.44 70.92 23.17 70.07 22.63ZM91.43 46.48L94.63 46.48L94.63 11.47L91.43 11.47ZM114.33 46.48L114.75 46.48L114.75 11.47L111.43 11.47C113.72 20.68 114.21 29.91 114.31 39.11L103.03 15.67C102.37 14.31 101.78 12.89 101.64 11.47L97.53 11.47L99.98 16.55L99.98 46.48L103.30 46.48C100.88 36.84 100.46 27.15 100.42 17.46ZM124.37 46.48L127.56 46.48L127.56 11.91C129.59 12.04 131.88 12.55 134.08 14.99L134.08 11.47L117.87 11.47L117.87 14.99C120.07 12.57 122.34 12.04 124.37 11.91ZM137.21 11.47L137.21 46.48L151.76 46.48L151.76 42.99C147.68 46.00 144.14 46.09 140.41 46.09L140.41 24.15C142.85 24.17 145.31 24.32 147.75 25.20L147.75 22.71C145.31 23.58 142.85 23.73 140.41 23.75L140.41 11.89C143.85 11.89 147.31 11.99 150.76 14.99L150.76 11.47ZM172.53 46.48L173.10 46.48L173.10 46.14L172.53 46.14C170.29 46.14 169.58 42.14 168.24 35.18C166.97 28.74 165.58 25.59 161.43 23.83L161.79 23.83C166.80 23.83 169.53 21.48 169.53 17.53C169.53 13.53 166.60 11.47 160.03 11.47L158.06 11.47L158.06 11.50L155.25 11.47L155.25 46.48L158.45 46.48L158.45 23.02C158.74 23.17 159.08 23.34 159.50 23.46L159.50 23.49C163.28 25.07 163.60 28.03 165.04 35.18C166.48 42.38 168.04 46.48 172.53 46.48ZM158.45 22.63L158.45 11.89L160.03 11.89C164.43 11.89 166.33 13.79 166.33 17.53C166.33 21.19 164.75 23.44 161.79 23.44C160.40 23.44 159.30 23.17 158.45 22.63ZM174.80 46.48L178.00 46.48L178.00 11.47L174.80 11.47ZM190.26 46.63C195.21 46.63 198.22 39.94 198.22 28.88C198.22 17.90 195.21 11.33 190.26 11.33C185.25 11.33 182.25 17.90 182.25 28.88C182.25 39.94 185.25 46.63 190.26 46.63ZM185.47 28.88C185.47 18.24 187.26 11.74 190.26 11.74C193.21 11.74 195.02 18.24 195.02 28.88C195.02 39.67 193.21 46.24 190.26 46.24C187.26 46.24 185.47 39.67 185.47 28.88ZM219.75 46.48L220.31 46.48L220.31 46.14L219.75 46.14C217.50 46.14 216.80 42.14 215.45 35.18C214.18 28.74 212.79 25.59 208.64 23.83L209.01 23.83C214.01 23.83 216.75 21.48 216.75 17.53C216.75 13.53 213.82 11.47 207.25 11.47L205.27 11.47L205.27 11.50L202.47 11.47L202.47 46.48L205.66 46.48L205.66 23.02C205.96 23.17 206.30 23.34 206.71 23.46L206.71 23.49C210.50 25.07 210.82 28.03 212.26 35.18C213.70 42.38 215.26 46.48 219.75 46.48ZM205.66 22.63L205.66 11.89L207.25 11.89C211.65 11.89 213.55 13.79 213.55 17.53C213.55 21.19 211.96 23.44 209.01 23.44C207.62 23.44 206.52 23.17 205.66 22.63Z"/></g></g></svg>
      
      </div>

      <section className="widget-landing" id="s1_home" ref={heroRef}>
        <figure className="media-bg" ref={mediaBgRef}>
          <video
            autoPlay
            muted
            loop
            playsInline
            webkitplaysinline="true"
            preload="auto"
          >
            <source src="/MOBILE%20.mp4" type="video/mp4" media="(max-width: 768px), (pointer: coarse) and (orientation: portrait)" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </figure>

        <span className="bg"></span>
        <span className="grad"></span>

        <div className="caption __caption">
          <div className={`left ${isActive ? 'visible' : ''}`}>
            <p>At Jigar Interiors, we are dedicated to creating environments where every detail is carefully aligned to offer you a unique multisensory experience.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;