import React, { useEffect, useRef, useCallback, useState } from 'react';
import './Section3.css';

const Section3 = () => {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const toBigRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isDesktop) return;
    const wrapper = wrapperRef.current;
    const toBig = toBigRef.current;
    const filter = filterRef.current;
    const text = textRef.current;
    if (!wrapper || !toBig) return;

    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const sectionHeight = sectionRef.current?.offsetHeight || 0;
    const scrollDistance = wrapperHeight - sectionHeight;
    const scrollY = window.scrollY;

    if (scrollDistance <= 0) return;

    const rawProgress = (scrollY - wrapperTop) / scrollDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));

    if (progress <= 0) {
      toBig.style.width = '35%';
      toBig.style.transform = 'translateX(var(--c5o))';
      if (filter) filter.style.opacity = '0';
      if (text) text.style.transform = 'translateX(100%)';
      return;
    }

    const imgProgress = Math.min(1, progress / 0.093);
    const imgWidth = 35 + 65 * imgProgress;
    const imgOffset = 5 * (1 - imgProgress);
    toBig.style.width = `${imgWidth}%`;
    toBig.style.transform = `translateX(${imgOffset}%)`;

    const filterProgress = Math.max(0, Math.min(1, (progress - 0.047) / 0.093));
    if (filter) filter.style.opacity = `${filterProgress}`;

    const textProgress = Math.max(0, Math.min(1, (progress - 0.07) / 0.93));
    const textX = 100 - 300 * textProgress;
    if (text) text.style.transform = `translateX(${textX}%)`;
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, isDesktop]);

  return (
    <div className="s3_pin_wrapper" ref={wrapperRef}>
      <section id="s3_home" ref={sectionRef}>
        <div className="container p20b p5lr">
          <div className="sec_img to_big w35l rel" ref={toBigRef}>
            <picture className="rel">
              <source
                media="(max-width: 520px)"
                srcSet="https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89-600x383.webp, https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89-1127x720.webp 2x"
              />
              <source
                media="(max-width: 980px)"
                srcSet="https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89-1127x720.webp, https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89-1690x1080.webp 2x"
              />
              <source
                media="(max-width: 1440px)"
                srcSet="https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89-1690x1080.webp, https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89.webp 2x"
              />
              <img
                src="https://www.tecnoarreda.it/wp-content/uploads/2026/05/Yhom_PrivateHouse21_89.webp"
                width="100"
                height="100"
                alt="Pool inside the villa"
              />
            </picture>
            <div className="filter filter_bt anim" ref={filterRef} style={{ opacity: 0 }}></div>
            <h2 className="h1 text_enter" ref={textRef}>Balance of forms</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section3;
