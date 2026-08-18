import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';
import logo from '/logo.PNG';

const menuItems = [
  { label: 'Home', href: '#', id: 'menu-item-46', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2 current_page_item menu-item-46' },
  { label: 'Who we are', href: '#', id: 'menu-item-47', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-47' },
  { label: 'Solutions', href: '#', id: 'menu-item-905', classes: 'desktop open_sub menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-905', hasSub: true, subItems: [
    { label: 'We design', href: '#', id: 'menu-item-904', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-904' },
    { label: 'We build', href: '#', id: 'menu-item-903', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-903' },
    { label: 'We renovate', href: '#', id: 'menu-item-902', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-902' },
    { label: 'We furnish', href: '#', id: 'menu-item-901', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-901' },
  ]},
  { label: 'Projects', href: '#', id: 'menu-item-50', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-50' },
  { label: 'Contacts', href: '#', id: 'menu-item-48', classes: 'menu-item menu-item-type-post_type menu-item-object-page menu-item-48' },
];

const hoverLinks = [
  { label: 'We design', href: '#', imgId: 'img_1' },
  { label: 'We build', href: '#', imgId: 'img_2' },
  { label: 'We renovate', href: '#', imgId: 'img_3' },
  { label: 'We furnish', href: '#', imgId: 'img_4' },
];

const hoverImages = [
  { id: 'img_1', src: '/interior 1.png', alt: 'We design' },
  { id: 'img_2', src: '/interior 2.png', alt: 'We build' },
  { id: 'img_3', src: '/interior 3.png', alt: 'We renovate' },
  { id: 'img_4', src: '/interior 4.png', alt: 'We furnish' },
];

const HeroSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(false);

  const menuAnimRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Exact replica of tecnoarreda.it mouse follow + hover logic
  useEffect(() => {
    const wrapper = menuAnimRef.current;
    const imageHover = document.getElementById('image_hover');
    if (!wrapper || !imageHover) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const speed = 0.1;
    let animId = null;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    function animate() {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      imageHover.style.left = `${currentX}px`;
      imageHover.style.top = `${currentY}px`;
      animId = requestAnimationFrame(animate);
    }

    wrapper.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(animate);

    const images = imageHover.querySelectorAll('img');
    const boxAnims = wrapper.querySelectorAll('.box_anim');

    wrapper.querySelectorAll('.hover-target').forEach((item) => {
      item.addEventListener('mouseover', () => {
        const dataIndex = item.getAttribute('data-index');
        images.forEach((img) => img.classList.remove('visible'));
        const targetImg = document.getElementById(dataIndex);
        if (targetImg) targetImg.classList.add('visible');
        boxAnims.forEach((box) => (box.style.opacity = '0.25'));
        item.style.opacity = '1';
      });
      item.addEventListener('mouseout', () => {
        images.forEach((img) => img.classList.remove('visible'));
        boxAnims.forEach((box) => (box.style.opacity = '1'));
      });
    });

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [menuOpen]);

  const handleHamburgerClick = () => {
    setMenuOpen((prev) => !prev);
    setSubMenuActive(false);
  };

  const handleSubOpen = (e) => {
    e.preventDefault();
    setSubMenuActive(true);
  };

  const handleCloseSub = () => {
    setSubMenuActive(false);
  };

  return (
    <>
      {/* HEADER - exactly like reference */}
      <header className={`header abs w100 ${isActive ? 'active' : ''} ${menuOpen ? 'open_menu' : ''}`}>
        <div className="head_wrapper rel w100 flex-t">
          <div className="head_left flex-l">
            <a href="/" className="head_logo rel">
              <img src={logo} alt="Jigar Interiors" width="100" height="100" />
            </a>
          </div>

          <div className="head_inner flex-el flex-r rel">
            <button
              id="close_submenu"
              className={subMenuActive ? 'active' : ''}
              onClick={handleCloseSub}
              aria-label="Close submenu"
            >
              <svg viewBox="0 0 135.92 135.35">
                <path d="M15.71,72.56l54.16,54.16c.99.99,1.48,2.05,1.56,3.39s-.49,2.47-1.63,3.61c-1.06,1.06-2.26,1.56-3.46,1.63-1.27,0-2.4-.57-3.46-1.63L2.42,73.26c-.85-.85-1.48-1.77-1.84-2.69-.35-.92-.49-1.91-.57-2.97s.21-2.05.57-2.97c.35-.92.92-1.77,1.84-2.69L62.8,1.56c.92-.92,2.05-1.48,3.39-1.56s2.55.42,3.61,1.48,1.7,2.26,1.7,3.54c0,1.27-.49,2.47-1.63,3.61L15.78,62.73l115.19-.07c1.41,0,2.62.49,3.54,1.41s1.41,2.12,1.41,3.54-.49,2.62-1.41,3.54-2.12,1.41-3.54,1.41H15.71Z" />
              </svg>
            </button>

            <button
              id="hamburger"
              className={menuOpen ? 'tapped' : ''}
              onClick={handleHamburgerClick}
              aria-controls="main-nav"
              aria-expanded={menuOpen}
              aria-label="open-menu"
            >
              <div className="wrap rel w100">
                <span className="top_bun"></span>
                <span className="bottom_bun"></span>
              </div>
            </button>
          </div>
        </div>

        {/* MAIN NAV - inside header, exactly like reference */}
        <nav
          aria-label="primary-menu"
          role="navigation"
          className="w100 flex"
          id="main_nav"
          style={{ display: menuOpen ? 'block' : 'none' }}
        >
          <div className="menu_wrapper abs w100 h100 flex-l flex-wrap">

            <div className="menu_left w40l">
              <div className="menu-menu-container">
                <ul id="menu-menu" className="head_menu">
                  {menuItems.map((item) => (
                    <li key={item.id} id={item.id} className={item.classes}>
                      <a
                        href={item.href}
                        onClick={item.hasSub ? handleSubOpen : undefined}
                        style={{ font: '31.9577px "Anek Bangla", sans-serif', color: 'var(--white)' }}
                      >
                        {item.label}
                      </a>
                      {item.hasSub && (
                        <ul className={`sub-menu ${subMenuActive ? 'active' : ''}`}>
                          {item.subItems.map((sub) => (
                            <li key={sub.id} id={sub.id} className={sub.classes}>
                              <a href={sub.href}>{sub.label}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="menu_right rel w60l h100 flex-l flex-wrap p5l desktop" id="menu_anim" ref={menuAnimRef}>
              <div className="w100 rel">
                {hoverLinks.map((link) => (
                  <a
                    key={link.imgId}
                    href={link.href}
                    className="box_anim w100 rel hover-target"
                    data-index={link.imgId}
                    style={{ opacity: 1 }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <picture id="image_hover" className="img_hover ratio-4-3">
                {hoverImages.map((img) => (
                  <img key={img.id} src={img.src} alt={img.alt} id={img.id} />
                ))}
              </picture>
            </div>

          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="s1" id="s1_home">
        <picture className="bkg_thumb abs w100 h100">
          <img
            src="/interior 3.png"
            width="100"
            height="100"
            alt="Interior Design"
          />
        </picture>

        <div className="filter filter_black"></div>
        <div className="filter filter_bt"></div>

        <div className="container p15tb p5lr h100 flex">
          <h1 className={`sec_trigger ${isActive ? 'active' : ''}`}>
            <span className="riga_1">
              <span>Study of</span>
              <span>architecture</span>
            </span>
            <span className="wrp w100 rel">
              <span className="w100 riga_2">INTERIOR</span>
              <span className="w100 riga_3">DESIGN</span>
            </span>
          </h1>

          <div className={`textAnim ${isActive ? 'active' : ''}`}>
            <div className="s1_title slogan">
              <p>Exclusive design, timeless emotions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
