import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';
import SideMenu from './SideMenu.jsx';
import logo from '/logo.PNG';

const HeroSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const pillLogo = document.querySelector('.navbar-pill__logo');
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

        // Also fade in the pill logo on mobile
        if (pillLogo) {
          const pillLogoOpacity = t > 0.5 ? (t - 0.5) / 0.5 : 0;
          pillLogo.style.opacity = pillLogoOpacity;
        }

        // Toggle scrolled state for the navbar pill color transition
        setScrolled(scrollProgress > 0.5);

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
          <a href="https://wa.me/919879337290" target="_blank" rel="noopener noreferrer" className="header__whatsapp--mobile button-round --outline --invert" aria-label="Tell us on WhatsApp">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Tell us</span>
          </a>
          <button className={`Header__toggle ${menuOpen ? 'is-active' : ''}`} onClick={handleToggleMenu} aria-label="Toggle menu" role="menuitem">
            <span className="hamburger">
              <span className="hamburger__bar"></span>
              <span className="hamburger__bar"></span>
            </span>
          </button>
        </nav>
        <a href="https://wa.me/919879337290" target="_blank" rel="noopener noreferrer" className="header__whatsapp button-round --outline --invert" aria-label="Tell us on WhatsApp">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Tell us</span>
        </a>
      </header>

      {/* Mobile pill navbar — Fitouter style */}
      <div className={`navbar-pill ${menuOpen ? 'is-open' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar-pill__top">
          <a href="/" className="navbar-pill__logo" aria-label="Jigar Interiors">
            <img src={logo} alt="Jigar Interiors" />
          </a>
          <button
            className={`navbar-pill__hamburger ${menuOpen ? 'is-active' : ''}`}
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
          >
            <span className="navbar-pill__bar"></span>
            <span className="navbar-pill__bar"></span>
          </button>
        </div>
        <div className="navbar-pill__menu">
          <a className="navbar-pill__link" href="#sec_realizzazioni" onClick={() => setMenuOpen(false)}>Projects</a>
          <a className="navbar-pill__link" href="#sec_servizi" onClick={() => setMenuOpen(false)}>Services</a>
          <a className="navbar-pill__link" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="https://wa.me/919879337290" target="_blank" rel="noopener noreferrer" className="navbar-pill__tellus" aria-label="Tell us on WhatsApp">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Tell us</span>
          </a>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'is-visible' : ''}`} onClick={(e) => {
        if (e.target === e.currentTarget) setMenuOpen(false);
      }}>
        <div className="mobile-menu__inner">
          <a className="mobile-menu__link" href="#sec_realizzazioni" onClick={() => setMenuOpen(false)}>Projects</a>
          <a className="mobile-menu__link" href="#sec_servizi" onClick={() => setMenuOpen(false)}>Services</a>
          <a className="mobile-menu__link" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="https://wa.me/919879337290" target="_blank" rel="noopener noreferrer" className="mobile-menu__link mobile-menu__whatsapp" aria-label="Tell us on WhatsApp">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Tell us</span>
          </a>
        </div>
      </div>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div id="HeroLogoText" ref={heroLogoRef} aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 12.210000038146973 351.8999938964844 30.65999984741211" data-asc="0.83984375" width="351.8999938964844" height="30.65999984741211"><g fill="#a2adb4"><g transform="translate(0, 0)"><path d="M17.33 13.96L17.33 12.70L4.83 12.70L4.83 13.96L9.23 13.96L9.23 34.08Q9.23 40.09 7.71 41.26Q7.13 41.65 6.40 41.65Q5.08 41.65 4.64 40.14Q4.10 38.43 3.91 38.13Q3.32 37.35 2.15 37.35Q0.63 37.35 0.15 38.77Q0 39.16 0 39.50Q0 41.46 2.54 42.38Q3.91 42.87 5.57 42.87Q9.77 42.87 11.91 39.55Q13.43 37.16 13.43 33.59L13.43 13.96L17.33 13.96ZM32.96 41.99Q32.96 40.92 32.18 40.77Q31.93 40.72 31.69 40.72L29.10 40.72L29.10 13.96L32.96 13.96L32.96 12.70L21.00 12.70L21.00 13.96L24.90 13.96L24.90 40.72L21.00 40.72L21.00 41.99L32.96 41.99ZM55.18 28.81L55.18 30.08L59.57 30.08L59.57 37.70Q57.13 40.63 53.03 40.97Q52.64 41.02 52.25 41.02Q42.53 40.92 42.48 27.34Q42.48 15.72 49.51 13.87Q50.73 13.57 52.10 13.57Q57.13 13.57 59.38 16.36Q60.84 18.26 62.01 22.31L63.28 22.31L63.04 12.84L58.79 13.72Q55.71 12.21 52.25 12.21Q46.39 12.21 42.19 16.06Q37.60 20.31 37.60 27.15Q37.60 34.96 43.16 39.36Q47.22 42.48 52.25 42.48Q55.91 42.48 58.89 40.87Q59.28 40.67 59.52 40.48L63.67 41.99L63.67 30.08L67.33 30.08L67.33 28.81L55.18 28.81ZM98.73 41.99Q98.73 40.92 97.95 40.77Q97.71 40.72 97.46 40.72L95.80 40.72L84.62 12.70L82.81 12.70L71.88 40.72L68.80 40.72L68.80 41.99L77.49 41.99Q77.49 40.92 76.71 40.77Q76.46 40.72 76.22 40.72L73.83 40.72L77.49 31.25L87.70 31.25L91.36 40.72L88.18 40.72L88.18 41.99L98.73 41.99M87.16 29.83L78.03 29.83L82.57 18.02L87.16 29.83ZM112.65 41.99L112.65 40.72L108.79 40.72L108.79 28.56L113.43 28.56L121.24 41.99L128.61 41.99Q128.61 40.92 128.03 40.77Q127.78 40.72 127.44 40.72L125.59 40.72L117.72 28.13Q122.36 27.00 124.07 23.29Q124.71 21.83 124.71 20.31Q124.71 16.65 121.53 14.45Q118.95 12.70 115.14 12.70L100.68 12.70L100.68 13.96L104.59 13.96L104.59 40.72L100.68 40.72L100.68 41.99L112.65 41.99M113.67 13.96Q117.87 13.96 119.48 17.38Q120.12 18.80 120.12 20.36Q120.12 23.88 117.68 25.83Q116.02 27.15 113.82 27.15L108.79 27.15L108.79 13.96L113.67 13.96ZM152.05 41.99Q152.05 40.92 151.27 40.77Q151.03 40.72 150.78 40.72L148.19 40.72L148.19 13.96L152.05 13.96L152.05 12.70L140.09 12.70L140.09 13.96L143.99 13.96L143.99 40.72L140.09 40.72L140.09 41.99L152.05 41.99ZM176.17 13.96L180.32 13.96L180.32 35.84L161.77 12.70L154.98 12.70L154.98 13.96L158.89 13.96L158.89 40.72L154.98 40.72L154.98 41.99L164.99 41.99Q164.99 40.92 164.21 40.77Q163.96 40.72 163.72 40.72L160.84 40.72L160.84 18.12L180.03 42.24L182.28 41.75L182.28 13.96L186.18 13.96L186.18 12.70L176.17 12.70L176.17 13.96ZM207.28 41.99Q207.28 40.92 206.49 40.77Q206.25 40.72 206.01 40.72L202.69 40.72L202.69 13.96L205.52 13.96Q209.47 13.96 210.79 18.75Q210.79 18.95 210.84 19.04L211.62 22.31L212.99 22.31L212.74 12.70L188.62 12.70L188.38 22.31L189.75 22.31L190.53 19.04Q192.09 14.26 195.85 13.96L198.49 13.96L198.49 40.72L193.85 40.72L193.85 41.99L207.28 41.99ZM239.40 21.48L239.16 12.70L216.65 12.70L216.65 13.96L220.56 13.96L220.56 40.72L216.65 40.72L216.65 41.99L239.16 41.99L239.40 33.20L238.43 33.20L237.74 35.50Q236.52 39.65 234.13 40.48Q233.40 40.72 232.57 40.72L224.76 40.72L224.76 27.59L234.81 27.59L234.81 26.17L224.76 26.17L224.76 13.96L232.57 13.96Q236.08 13.96 237.60 18.70Q237.70 18.99 237.74 19.19L238.43 21.48L239.40 21.48ZM255.76 41.99L255.76 40.72L251.90 40.72L251.90 28.56L256.54 28.56L264.36 41.99L271.73 41.99Q271.73 40.92 271.14 40.77Q270.90 40.72 270.56 40.72L268.70 40.72L260.84 28.13Q265.48 27.00 267.19 23.29Q267.82 21.83 267.82 20.31Q267.82 16.65 264.65 14.45Q262.06 12.70 258.25 12.70L243.80 12.70L243.80 13.96L247.71 13.96L247.71 40.72L243.80 40.72L243.80 41.99L255.76 41.99M256.79 13.96Q260.99 13.96 262.60 17.38Q263.23 18.80 263.23 20.36Q263.23 23.88 260.79 25.83Q259.13 27.15 256.93 27.15L251.90 27.15L251.90 13.96L256.79 13.96ZM285.64 41.99Q285.64 40.92 284.86 40.77Q284.62 40.72 284.38 40.72L281.79 40.72L281.79 13.96L285.64 13.96L285.64 12.70L273.68 12.70L273.68 13.96L277.59 13.96L277.59 40.72L273.68 40.72L273.68 41.99L285.64 41.99ZM304.93 12.21Q299.07 12.21 294.87 16.06Q290.28 20.31 290.28 27.15Q290.28 35.06 295.70 39.36Q299.66 42.48 304.79 42.48Q310.55 42.48 314.70 38.57Q319.34 34.23 319.34 27.34Q319.34 19.29 313.72 15.09Q309.91 12.21 304.93 12.21M304.93 41.11Q297.85 41.11 295.85 33.54Q295.17 30.86 295.17 27.34Q295.17 15.72 302.20 13.87Q303.42 13.57 304.79 13.57Q314.40 13.67 314.45 27.15Q314.45 37.79 308.54 40.38Q306.88 41.11 304.93 41.11ZM335.94 41.99L335.94 40.72L332.08 40.72L332.08 28.56L336.72 28.56L344.53 41.99L351.90 41.99Q351.90 40.92 351.32 40.77Q351.07 40.72 350.73 40.72L348.88 40.72L341.02 28.13Q345.65 27.00 347.36 23.29Q348.00 21.83 348.00 20.31Q348.00 16.65 344.82 14.45Q342.24 12.70 338.43 12.70L323.97 12.70L323.97 13.96L327.88 13.96L327.88 40.72L323.97 40.72L323.97 41.99L335.94 41.99M336.96 13.96Q341.16 13.96 342.77 17.38Q343.41 18.80 343.41 20.36Q343.41 23.88 340.97 25.83Q339.31 27.15 337.11 27.15L332.08 27.15L332.08 13.96L336.96 13.96Z"/></g></g></svg>
      
      </div>

      <section className="widget-landing" id="s1_home" ref={heroRef}>
        <h1 className="seo-h1">
          Jigar Interiors – Interior Designer in Vadodara | Bedroom, Kitchen, Living Room &amp; Full Home Interior Design
        </h1>
        <figure className="media-bg" ref={mediaBgRef}>
          <video
            autoPlay
            muted
            loop
            playsInline
            webkitplaysinline="true"
            preload="auto"
          >
            <source src="/mobilehero.mp4" type="video/mp4" media="(max-width: 768px), (pointer: coarse) and (orientation: portrait)" />
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