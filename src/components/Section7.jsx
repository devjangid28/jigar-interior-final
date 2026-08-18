import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Section7.css';

const isDesktopView = () => window.innerWidth > 1023;

const ArrowSvg = () => (
  <svg x="0px" y="0px" viewBox="0 0 99.9 99.9" xmlSpace="preserve">
    <path className="st0" d="M90,83V6.4c0-1.4,0.4-2.5,1.3-3.5s2.1-1.4,3.7-1.4c1.5,0,2.7,0.5,3.6,1.3c0.9,0.9,1.3,2.1,1.3,3.6v85.5
      c0,1.2-0.2,2.3-0.6,3.2c-0.4,0.9-1,1.7-1.7,2.5s-1.6,1.3-2.5,1.7c-0.9,0.4-1.9,0.6-3.2,0.6H6.5c-1.3,0-2.5-0.4-3.5-1.3
      S1.5,96.5,1.5,95s0.4-2.8,1.3-3.7c0.9-0.9,2.1-1.4,3.7-1.4H83L1.5,8.5C0.5,7.5,0,6.3,0,5s0.5-2.5,1.5-3.5S3.7,0,5,0s2.5,0.5,3.5,1.5
      L90,83z" />
  </svg>
);

const FrecciaSvg = () => (
  <svg x="0px" y="0px" viewBox="0 0 100 53.2" xmlSpace="preserve">
    <path fill="var(--white)" className="st0" d="M90.8,2.5c1.3,0.7,2.6,1.5,4,1.9c1.4,0.5,2.9,0.6,4.4,0.3c0.6-0.1,0.8,0.7,0.8,1.2c0,0.3-0.2,0.7-0.4,0.9
      c-0.1,0.4-0.3,0.7-0.5,0.8c-0.6,0-1.1,0.1-1.7,0.2c-1.3,0.6-2.5,1.5-3.6,2.4c-1.8,1.5-3.4,3.2-5.1,4.8c-0.4,0.4-1,0.2-1.2-0.4
      c-0.2-0.6,0-1.3,0.5-1.8c1.6-1.5,3.2-3.1,4.9-4.6c-5.1,0.6-10.2,1.5-15.2,2.7c-7.1,1.6-14.1,3.7-20.9,6.2
      c-6.7,2.5-13.2,5.5-19.6,8.8s-12.5,7.2-18.4,11.5C13,41.6,7.4,46.2,2.2,51.2c-0.7,0.6-1.3,1.3-2,1.9c-0.3,0.3-0.2-0.9-0.2-1
      c0-0.5,0.2-1.2,0.6-1.5c5.2-5.1,10.7-9.8,16.5-14.1S29,28.2,35.3,24.7c6.4-3.5,13-6.6,19.7-9.3c6.7-2.6,13.6-4.8,20.6-6.5
      c5.3-1.3,10.8-2.3,16.2-3.1c-1-0.5-2.1-1.1-3.1-1.6c-0.6-0.3-1.1-0.6-1.7-0.9c-0.3-0.2-0.7-0.4-1.1-0.6c-0.2,0.1-0.4,0.2-0.6,0
      c-1.5-0.6-0.4-3.4,1.2-2.6C87.8,0.9,89.3,1.7,90.8,2.5L90.8,2.5L90.8,2.5z" />
  </svg>
);

const projects = [
  {
    id: 'img_0',
    alt: 'Interior Design 1',
    ratio: 'ratio-3-4',
    srcSet: { fallback: '/interior 1.png' },
    bkg: {
      small: "url('/interior 1.png')",
      medium: "url('/interior 1.png')",
      large: "url('/interior 1.png')",
      xlarge: "url('/interior 1.png')",
    },
  },
  {
    id: 'img_1',
    alt: 'Interior Design 2',
    ratio: 'ratio-4-5',
    srcSet: { fallback: '/interior 2.png' },
    bkg: {
      small: "url('/interior 2.png')",
      medium: "url('/interior 2.png')",
      large: "url('/interior 2.png')",
      xlarge: "url('/interior 2.png')",
    },
  },
  {
    id: 'img_2',
    alt: 'Interior Design 3',
    ratio: 'ratio-4-5',
    hasFreccia: true,
    frecciaText: 'Creative in concept, technical in detail',
    srcSet: { fallback: '/interior 3.png' },
    bkg: {
      small: "url('/interior 3.png')",
      medium: "url('/interior 3.png')",
      large: "url('/interior 3.png')",
      xlarge: "url('/interior 3.png')",
    },
  },
  {
    id: 'img_3',
    alt: 'Interior Design 4',
    ratio: 'ratio-3-4',
    srcSet: { fallback: '/interior 4.png' },
    bkg: {
      small: "url('/interior 4.png')",
      medium: "url('/interior 4.png')",
      large: "url('/interior 4.png')",
      xlarge: "url('/interior 4.png')",
    },
  },
  {
    id: 'img_4',
    alt: 'Interior Design 5',
    ratio: 'ratio-1-1',
    srcSet: { fallback: '/interior 5.png' },
    bkg: {
      small: "url('/interior 5.png')",
      medium: "url('/interior 5.png')",
      large: "url('/interior 5.png')",
      xlarge: "url('/interior 5.png')",
    },
  },
];

const Section7 = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const pinSpacerRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
    if (mobileTrackRef.current) {
      mobileTrackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, []);

  const activeSlideRef = useRef(activeSlide);
  activeSlideRef.current = activeSlide;

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const pinSpacer = pinSpacerRef.current;
    if (!section || !wrapper || !pinSpacer) return;

    if (isDesktopView()) {
      let rafId = null;
      let cachedDistance = 0;

      const updateLayout = () => {
        const wrapperWidth = wrapper.scrollWidth;
        const viewportWidth = window.innerWidth;
        cachedDistance = Math.max(wrapperWidth - viewportWidth, 0);
        const sectionHeight = section.offsetHeight;
        pinSpacer.style.height = `${sectionHeight + cachedDistance}px`;
      };

      const onScroll = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (cachedDistance <= 0) return;
          const spacerRect = pinSpacer.getBoundingClientRect();
          const scrolled = -spacerRect.top;
          const progress = Math.min(Math.max(scrolled / cachedDistance, 0), 1);
          wrapper.style.transform = `translateX(${-progress * cachedDistance}px)`;
        });
      };

      updateLayout();
      window.addEventListener('resize', updateLayout);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', updateLayout);
        if (rafId) cancelAnimationFrame(rafId);
      };
    } else {
      const slider = mobileSliderRef.current;
      if (!slider) return;

      const startAutoplay = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
          setActiveSlide((prev) => {
            const next = (prev + 1) % projects.length;
            if (mobileTrackRef.current) {
              mobileTrackRef.current.style.transform = `translateX(-${next * 100}%)`;
            }
            return next;
          });
        }, 5000);
      };

      let touchStartX = 0;
      let touchDeltaX = 0;

      const onTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        touchDeltaX = 0;
        clearInterval(autoplayRef.current);
      };

      const onTouchMove = (e) => {
        touchDeltaX = e.touches[0].clientX - touchStartX;
        if (mobileTrackRef.current) {
          const currentIdx = activeSlideRef.current;
          const offset = -currentIdx * 100 + (touchDeltaX / slider.offsetWidth) * 100;
          mobileTrackRef.current.style.transition = 'none';
          mobileTrackRef.current.style.transform = `translateX(${offset}%)`;
        }
      };

      const onTouchEnd = () => {
        if (mobileTrackRef.current) {
          mobileTrackRef.current.style.transition = '';
        }
        setActiveSlide((prev) => {
          let next = prev;
          if (Math.abs(touchDeltaX) > 50) {
            if (touchDeltaX < 0 && prev < projects.length - 1) {
              next = prev + 1;
            } else if (touchDeltaX > 0 && prev > 0) {
              next = prev - 1;
            }
          }
          if (mobileTrackRef.current) {
            mobileTrackRef.current.style.transform = `translateX(-${next * 100}%)`;
          }
          return next;
        });
        startAutoplay();
      };

      slider.addEventListener('touchstart', onTouchStart, { passive: true });
      slider.addEventListener('touchmove', onTouchMove, { passive: true });
      slider.addEventListener('touchend', onTouchEnd);

      startAutoplay();

      return () => {
        clearInterval(autoplayRef.current);
        slider.removeEventListener('touchstart', onTouchStart);
        slider.removeEventListener('touchmove', onTouchMove);
        slider.removeEventListener('touchend', onTouchEnd);
      };
    }
  }, [goToSlide, activeSlide]);

  const renderMobileSlideStyle = (project) => ({
    '--bkg-small': project.bkg.small,
    '--bkg-medium': project.bkg.medium,
    '--bkg-large': project.bkg.large,
    '--bkg-xlarge': project.bkg.xlarge,
  });

  return (
    <div className="s7-pin-spacer" ref={pinSpacerRef}>
    <section id="sec_realizzazioni" ref={sectionRef}>
      <div className="container">

        {/* MOBILE: Swiper gallery */}
        <div className="s7_mobile p10tb p5lr" ref={mobileSliderRef}>
          <div className="s7_text textAnim tac_mobile rel w100">
            <h2 className="h1">PROJECTS</h2>
          </div>

          <div className="s7_swiper_wrap rel w100 m7t">
            <div className="s7_swiper_track" ref={mobileTrackRef}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="s7_swiper_slide sized rel w100 ratio-3-4"
                  style={renderMobileSlideStyle(project)}
                />
              ))}
            </div>
          </div>

          <div className="s7_nav_dots">
            {projects.map((project, i) => (
              <button
                key={project.id}
                className={`s7_dot ${i === activeSlide ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP: Horizontal scroll */}
        <div className="s7_desktop p10tb" id="wrapper_scroll_orizzontale" ref={wrapperRef}>

          <div className="s7_sec_img s7_img_0">
            <picture className="w100 rel ratio-3-4">
              <img
                src={projects[0].srcSet.fallback}
                width="100"
                height="100"
                alt={projects[0].alt}
              />
            </picture>
          </div>

          <div className="s7_text textAnim rel">
            <h2 className="h1">PROJECTS</h2>
          </div>

          {projects.slice(1).map((project) => (
            <div key={project.id} className={`s7_sec_img ${project.hasFreccia ? 's7_has_freccia' : ''}`}>
              <picture className={`w100 rel ${project.ratio}`}>
                <img
                  src={project.srcSet.fallback}
                  width="100"
                  height="100"
                  alt={project.alt}
                />
              </picture>

              {project.hasFreccia && (
                <div className="wrp_freccetta left">
                  <div className="freccia_box">
                    <FrecciaSvg />
                    <p>{project.frecciaText}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
    </div>
  );
};

export default Section7;
