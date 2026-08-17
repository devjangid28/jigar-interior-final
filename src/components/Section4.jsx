import React, { useEffect, useRef } from 'react';
import './Section4.css';

const h2Lines = [
  'Our mission: to create ',
  'excellence',
];

const Section4 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const textAnimEls = sectionRef.current?.querySelectorAll('.textAnim');
    if (!textAnimEls) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    textAnimEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="s5_home" ref={sectionRef}>
      <div className="container p10t p15b p5lr grid-3col">

        <div className="text textAnim rel">
          <h2>
            {h2Lines.map((line, i) => (
              <div
                className="split-parent"
                key={i}
                style={{ display: 'block', textAlign: 'start', position: 'relative' }}
              >
                <div
                  className="split-child"
                  style={{ display: 'block', textAlign: 'start', position: 'relative' }}
                >
                  {line}
                </div>
              </div>
            ))}
          </h2>
        </div>

        <div className="text textAnim rel">
          <p>Trust a single point of contact to complete your project with expertise, precision, dedication, exclusivity, and mastery, from design to final delivery.</p>
        </div>

        <div className="text textAnim rel">
          <p>We manage every phase with a turnkey approach, ensuring a result that fully respects aesthetics, functionality, time, and budget.</p>
        </div>

      </div>
    </section>
  );
};

export default Section4;
