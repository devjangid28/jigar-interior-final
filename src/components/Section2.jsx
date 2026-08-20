import React, { useEffect, useRef, useCallback } from 'react';
import './Section2.css';

const textLines = [
  'Home is more than a place: it is ',
  'emotion, sensations, a ',
  'reflection of those who live it. Every ',
  'space can transform into ',
  'a work of art, where luxury, ',
  'form and function merge ',
  'to create unique environments.',
];

const Section2 = () => {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const rafRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!h2Ref.current) return;

    const h2 = h2Ref.current;
    const rect = h2.getBoundingClientRect();
    const vh = window.innerHeight;

    const scrollProgress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));

    const colorChildren = h2.querySelectorAll('.text_color_comp .split-child');
    const totalLines = colorChildren.length;

    colorChildren.forEach((child, i) => {
      const lineStart = i / totalLines;
      const lineEnd = (i + 1) / totalLines;
      const lineProgress = Math.max(0, Math.min(1, (scrollProgress - lineStart) / (lineEnd - lineStart)));
      const revealPercent = (1 - lineProgress) * 100;
      child.style.clipPath = `inset(0% ${revealPercent}% 0% 0%)`;
    });
  }, []);

  useEffect(() => {
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
  }, [handleScroll]);

  useEffect(() => {
    const triggers = sectionRef.current?.querySelectorAll('.sec_trigger');
    if (!triggers) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    triggers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="s2_page" id="s2_home" ref={sectionRef}>
      <div className="container p10tb p5lr flex flex-auto gap-7-5">

        <div className="sec_img sec_trigger toRight w40l rel">
          <picture className="rel w100 ratio-1-1e1">
            <img
              src="/interior 5.png"
              width="100"
              height="100"
              alt="Villa Nicole Project"
            />
          </picture>
        </div>

        <div className="text w55l rel tar_mobile">
          <h2 className="rel" ref={h2Ref}>
            <span className="not_text_color_comp">
              {textLines.map((line, i) => (
                <div
                  className="split-child"
                  key={`not-${i}`}
                  style={{ display: 'block', textAlign: 'start', position: 'relative' }}
                >
                  {line}
                </div>
              ))}
            </span>
            <span className="text_color_comp">
              {textLines.map((line, i) => (
                <div
                  className="split-child"
                  key={`color-${i}`}
                  style={{
                    display: 'block',
                    textAlign: 'start',
                    position: 'relative',
                    clipPath: 'inset(0% 100% 0% 0%)',
                  }}
                >
                  {line}
                </div>
              ))}
            </span>
          </h2>
        </div>

      </div>

      <div className="container p10b p5lr flex-r">
        <div className="sec_img sec_trigger toLeft w40l rel">
          <div className="wrp_freccetta top">
            <div className="freccia_box m7t">
              <p>STYLE DETAILS</p>
              <svg
                x="0px"
                y="0px"
                viewBox="0 0 78.8 99.9"
                style={{ enableBackground: 'new 0 0 78.8 99.9' }}
                xmlSpace="preserve"
              >
                <path
                  className="st0"
                  fill="#fff"
                  d="M47.3,60.7c-8.5-4.2-17.3-7.9-25.2-13.1c-7.6-5-14.5-11.7-17.8-20.4c-2.9-7.7-3-16.4-0.1-24.1c0,0,0-0.1,0-0.2
                    c-1.1,1-2.1,1.9-3.5,2.4c0,0-0.1,0-0.2,0C0.2,5.3,0,5,0,4.8c0-0.3,0.2-0.6,0.5-0.7C0.6,4,0.8,3.9,1,3.9c1.6-0.7,2.8-2.1,4.1-3.2
                    c0-0.1,0.1-0.3,0.2-0.4C5.5,0,5.9-0.1,6.2,0c0.1,0,0.2-0.1,0.3,0c0.2,0,0.1,0.3,0,0.4c0,0,0,0.2,0,0.3c0,0.2-0.2,0.4-0.2,0.5
                    s0,0.3,0,0.4c0,0.5,0,1.1,0.1,1.6c0.1,1.2,0.3,2.3,0.4,3.4c0,0.3-0.3,0.6-0.5,0.8c0,0-0.5,0.4-0.6,0.1C5.5,6.2,5.3,4.9,5.2,3.6
                    c-2.4,6.8-2.6,14.3-0.4,21.2c2.7,8.9,9.3,15.8,16.8,21c7.8,5.4,16.5,9.1,24.8,13.2c8.1,4,16.2,8.5,22.4,15.2c5.7,6,9.9,13.7,10,22
                    c0,1,0,2-0.1,3c-0.1,0.7-1.5,1-1.4,0.3c0.9-8.4-2.7-16.5-8.1-22.9C63.4,69.5,55.4,64.8,47.3,60.7L47.3,60.7z"
                />
              </svg>
            </div>
          </div>

          <picture className="rel w100 ratio-1-1e1">
            <img
              src="/interior 10.png"
              width="100"
              height="100"
              alt="Style Details Interior Design"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Section2;
