import React, { useEffect, useRef, useCallback } from 'react';
import './Section5.css';

const services = [
  { label: 'We design', id: 'img_2_1', src: 'https://www.tecnoarreda.it/wp-content/uploads/2025/06/TAV-4C-Abuja-Conference-Center-Main-Concourse-B-PROSPETTIVA.webp', alt: 'We design' },
  { label: 'We Build', id: 'img_2_2', src: 'https://www.tecnoarreda.it/wp-content/uploads/2025/06/02colline-luxury--1280x720.webp', alt: 'We Build' },
  { label: 'We renovate', id: 'img_2_3', src: 'https://www.tecnoarreda.it/wp-content/uploads/2025/05/Wasescha_APT_Special_04.webp', alt: 'We renovate' },
  { label: 'We furnish', id: 'img_2_4', src: 'https://www.tecnoarreda.it/wp-content/uploads/2025/04/arredo-interno-di-una-sala-da-pranzo-1080x720.webp', alt: 'We furnish' },
];

const Section5 = () => {
  const wrapperRef = useRef(null);
  const imageHoverRef = useRef(null);
  const animRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0, rafId: null });

  const handleMouseMove = useCallback((e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    animRef.current.targetX = e.clientX - rect.left;
    animRef.current.targetY = e.clientY - rect.top;
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const imageHover = imageHoverRef.current;
    if (!wrapper || !imageHover) return;

    const isDesktop = window.innerWidth > 1023;

    if (isDesktop) {
      const anim = animRef.current;
      const speed = 0.1;
      const images = imageHover.querySelectorAll('img');
      const boxAnims = wrapper.querySelectorAll('.box_anim');

      wrapper.addEventListener('mousemove', handleMouseMove);

      function animate() {
        anim.currentX += (anim.targetX - anim.currentX) * speed;
        anim.currentY += (anim.targetY - anim.currentY) * speed;
        imageHover.style.left = `${anim.currentX}px`;
        imageHover.style.top = `${anim.currentY}px`;
        anim.rafId = requestAnimationFrame(animate);
      }
      anim.rafId = requestAnimationFrame(animate);

      const handleMouseOver = (e) => {
        const item = e.currentTarget;
        const dataIndex = item.getAttribute('data-index');

        images.forEach((img) => img.classList.remove('visible'));
        const targetImg = document.getElementById(dataIndex);
        if (targetImg) targetImg.classList.add('visible');

        boxAnims.forEach((box) => { box.style.opacity = '0.25'; });
        item.style.opacity = '1';
      };

      const handleMouseOut = () => {
        images.forEach((img) => img.classList.remove('visible'));
        boxAnims.forEach((box) => { box.style.opacity = '1'; });
      };

      const hoverTargets = wrapper.querySelectorAll('.hover-target-2');
      hoverTargets.forEach((item) => {
        item.addEventListener('mouseover', handleMouseOver);
        item.addEventListener('mouseout', handleMouseOut);
      });

      return () => {
        cancelAnimationFrame(anim.rafId);
        wrapper.removeEventListener('mousemove', handleMouseMove);
        hoverTargets.forEach((item) => {
          item.removeEventListener('mouseover', handleMouseOver);
          item.removeEventListener('mouseout', handleMouseOut);
        });
      };
    } else {
      /* Mobile: IntersectionObserver adds hover_mob class for underline animation */
      const boxAnims = wrapper.querySelectorAll('.box_anim');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('hover_mob');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      );

      boxAnims.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [handleMouseMove]);

  return (
    <section id="sec_servizi">
      <div className="container p10tb p5lr">

        <div className="wrapper_servizi w100 rel" id="wrapper_servizi" ref={wrapperRef}>

          <div className="w100 rel">
            {services.map((svc) => (
              <a
                key={svc.id}
                href="#"
                className="box_anim w100 rel hover-target-2 tac_mobile"
                data-index={svc.id}
                style={{ opacity: 1 }}
              >
                {svc.label}
              </a>
            ))}
          </div>

          <picture id="image_hover_2" className="img_hover ratio-4-3" ref={imageHoverRef}>
            {services.map((svc) => (
              <img key={svc.id} src={svc.src} alt={svc.alt} id={svc.id} />
            ))}
          </picture>

        </div>

      </div>
    </section>
  );
};

export default Section5;
