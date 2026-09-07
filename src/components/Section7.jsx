import React, { useEffect, useRef, useState } from 'react';
import './Section7.css';

const isDesktopView = () => window.innerWidth > 1023;

const SLIDE_DURATION = 5000;
const HOLD_DURATION = 7000;

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
    <path fill="#fff" className="st0" d="M90.8,2.5c1.3,0.7,2.6,1.5,4,1.9c1.4,0.5,2.9,0.6,4.4,0.3c0.6-0.1,0.8,0.7,0.8,1.2c0,0.3-0.2,0.7-0.4,0.9
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
    alt: 'Master Bedroom Interior',
    name: 'Master Bedroom',
    tag: 'quiet luxury & comfort',
    ratio: 'ratio-3-4',
    src: '/interior 1.png',
  },
  {
    id: 'img_1',
    alt: 'Dining Room Interior',
    name: 'Dining Room',
    tag: 'where meals become memories',
    ratio: 'ratio-4-5',
    src: '/dinning.jpg',
  },
  {
    id: 'img_2',
    alt: 'Living Room Interior',
    name: 'Living Room',
    tag: 'the heart of every home',
    ratio: 'ratio-4-5',
    hasFreccia: true,
    frecciaText: 'Creative in concept, technical in detail',
    src: '/living roomm.jpg',
  },
  {
    id: 'img_3',
    alt: 'TV Lounge Interior',
    name: 'TV Lounge',
    tag: 'entertain, unwind, live',
    ratio: 'ratio-3-4',
    src: '/Tvv unit.jpg',
  },
  {
    id: 'img_4',
    alt: 'Grand Foyer Interior',
    name: 'Grand Foyer',
    tag: 'first impressions, always',
    ratio: 'ratio-1-1',
    src: '/floyer2.jpg',
  },
];

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Section7 = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const pinSpacerRef = useRef(null);
  const sliderRef = useRef(null);
  const stageRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [isHeld, setIsHeld] = useState(false);

  const activeSlideRef = useRef(0);
  const inViewRef = useRef(true);
  const heldRef = useRef(false);
  const holdTimerRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  const holdAutoplay = (duration = HOLD_DURATION) => {
    heldRef.current = true;
    setIsHeld(true);
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      heldRef.current = false;
      setIsHeld(false);
    }, duration);
  };

  const goToSlide = (index) => {
    const next = (index + projects.length) % projects.length;
    setActiveSlide(next);
    holdAutoplay();
    if (stageRef.current) {
      stageRef.current.style.transform = 'translateX(0px)';
    }
  };

  useEffect(() => {
    // Desktop pinned horizontal scroll
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const pinSpacer = pinSpacerRef.current;
    const slider = sliderRef.current;
    const stage = stageRef.current;

    if (isDesktopView()) {
      if (!section || !wrapper || !pinSpacer) return;
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
    }

    if (!slider || !stage) return;

    const onEnter = (entries) => {
      entries.forEach((entry) => {
        inViewRef.current = entry.isIntersecting;
        setIsInView(entry.isIntersecting);
      });
    };
    const visibilityObserver = new IntersectionObserver(onEnter, { threshold: 0.25 });
    visibilityObserver.observe(slider);

    autoplayRef.current = setInterval(() => {
      if (inViewRef.current && !heldRef.current) {
        setActiveSlide((prev) => (prev + 1) % projects.length);
      }
    }, SLIDE_DURATION);

    let startX = 0;
    let dragging = false;

    const onTouchStart = (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
      stage.style.transition = 'none';
      holdAutoplay(HOLD_DURATION + 15000);
    };

    const onTouchMove = (e) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - startX;
      stage.style.transform = `translateX(${dx}px)`;
    };

    const onTouchEnd = () => {
      if (!dragging) return;
      dragging = false;
      stage.style.transition = '';
      stage.style.transform = 'translateX(0px)';
    };

    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchmove', onTouchMove, { passive: true });
    slider.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      clearInterval(autoplayRef.current);
      clearTimeout(holdTimerRef.current);
      visibilityObserver.disconnect();
      slider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchmove', onTouchMove);
      slider.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="s7-pin-spacer" ref={pinSpacerRef}>
    <section id="sec_realizzazioni" ref={sectionRef}>
      <div className="container">

        {/* MOBILE: Cinematic slider */}
        <div className="w100 mobile p10tb p5lr">
          <div className="text textAnim tac_mobile rel w100">
            <h2 className="h1">ACHIEVEMENTS</h2>
          </div>

          <div className="s7-slider" ref={sliderRef}>
            <div className="s7-slider__stage" ref={stageRef}>
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`s7-slider__slide ${i === activeSlide ? 'is-active' : ''}`}
                >
                  <div className="s7-slider__img">
                    <img src={project.src} alt={project.alt} loading={i === 0 ? undefined : 'lazy'} />
                  </div>
                  <span className="s7-slider__shade" />

                  <div className="s7-slider__content">
                    <span className="s7-slider__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="s7-slider__rule" />
                    <span className="s7-slider__name">{project.name}</span>
                    <span className="s7-slider__tag">{project.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={`s7-slider__bar-wrap ${isHeld || !isInView ? 'is-paused' : ''}`}>
              <span className="s7-slider__bar" key={activeSlide + (isHeld ? '-h' : '') + (isInView ? '-v' : '')} />
            </div>

            <div className="s7-slider__foot">
              <span className="s7-slider__count">
                {String(activeSlide + 1).padStart(2, '0')}<em>/</em>{String(projects.length).padStart(2, '0')}
              </span>

              <div className="s7-slider__dots">
                {projects.map((project, i) => (
                  <button
                    key={project.id}
                    className={`s7-slider__dot ${i === activeSlide ? 'is-active' : ''}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="s7-slider__next">
                <button className="s7-slider__arrow" onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous slide">
                  <ChevronLeft />
                </button>
                <button className="s7-slider__arrow" onClick={() => goToSlide(activeSlide + 1)} aria-label="Next slide">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP: Horizontal scroll */}
        <div className="desktop p10tb" id="wrapper_scroll_orizzontale" ref={wrapperRef}>

          <div className="s7_sec_img s7_img_0">
            <picture className="w100 rel ratio-3-4">
              <img
                src={projects[0].src}
                width="100"
                height="100"
                alt={projects[0].alt}
              />
            </picture>
          </div>

          <div className="s7_text textAnim rel">
            <h2 className="h1">ACHIEVEMENTS</h2>
          </div>

          {projects.slice(1).map((project) => (
            <div key={project.id} className={`s7_sec_img ${project.hasFreccia ? 's7_has_freccia' : ''}`}>
              <picture className={`w100 rel ${project.ratio}`}>
                <img
                  src={project.src}
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