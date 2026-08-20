import React, { useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const textAnimRef = useRef(null);

  useEffect(() => {
    const el = textAnimRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="rel w100" role="contentinfo" id="contact">
      <div className="rel">
        <div className="container p20tb p5lr">
          <div className="w100 rel flex-t flex-auto gap-15-2" style={{ paddingTop: '100px' }}>
            <div className="foot_block flex-r tac_mobile w33l rel" style={{ paddingRight: '160px' }}>
              <div>
                <p style={{ font: '31.9577px "Anek Bangla", sans-serif', color: '#FFFFFF' }}>
                  <a
                    href="https://maps.app.goo.gl/Y49bmjVvK1i1TPjD9"
                    title="View on Google Maps"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    A-8, Govardhan Township,<br />Waghodia Dabhoi Ring Road,
                  </a>
                </p>
              </div>
            </div>

            <div className="foot_block flex-r tac_mobile w33l rel">
              <div>
                <p style={{ fontFamily: 'var(--title-font)' }}>
                  <a href="tel:+919879337290" title="Chiamaci" rel="noopener">
                    Tel: <u className="b0">+91 9879337290</u>
                  </a>
                </p>
                <p>
                  <a href="mailto:jigarinterior@gmail.com" title="Scrivici" rel="noopener">
                    <u>jigarinterior07@gmail.com</u>
                  </a>
                </p>
              </div>
            </div>

            <div className="foot_block flex tac_mobile w33l rel" style={{ paddingLeft: '160px' }}>
              <div>
                <p style={{ font: '31.9577px "Anek Bangla", sans-serif', color: '#FFFFFF' }}>
                  <a
                    href="#"
                    title="Seguici su Facebook"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <u>Facebook</u>
                  </a>
                </p>
                <p style={{ font: '31.9577px "Anek Bangla", sans-serif', color: '#FFFFFF' }}>
                  <a
                    href="https://www.instagram.com/jigar_interior?igsi=dHNiZ3Vjdjl2cTNl"
                    title="Seguici su Instagram"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <u>Instagram</u>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w100 textAnim rel" ref={textAnimRef} style={{ marginTop: '120px' }}>
          <p className="titolonemega">
            JIGAR <br />
            <span>INTERIOR </span>
          </p>
        </div>
      </div>

      <div className="p10tb p1lr w100 rel" id="credits">
        <p className="tac_mobile" style={{ textAlign: 'left', paddingLeft: '50px', font: '15px "Anek Bangla", sans-serif', color: '#FFFFFF' }}>
          <span>&copy; 2026&nbsp;Jigar Interior Design srl </span>
          <span className="resp_sep"> - </span>
          <br />
          <span>Vadodara</span>
          <span className="resp_sep"> - </span>
          <br />
          <span>Email: jigarinterior@gmail.com - M 9724441259</span>
          <span className="resp_sep"> - </span>
          <br />
          <span>For More info. 9724441259 </span>
          <span className="resp_sep"> - </span>
          <br />
          <span>Cap. Soc.50.000&euro; i.v.</span>
          <br style={{ display: 'block' }} />
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            title="Privacy Policy"
          >
            Privacy Policy
          </a>
          &nbsp;-&nbsp;
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            title="Cookie Policy"
          >
            Cookie Policy
          </a>
          &nbsp;-&nbsp;
          <a href="#" title="Privacy preferences">
            Privacy preferences
          </a>
        </p>
        <p className="tac_mobile" style={{ font: '15px "Anek Bangla", sans-serif', color: '#FFFFFF', paddingRight: '50px' }}>
          Credits:{' '}
          <a
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            title="THE Studio"
            id="credits_studio"
          >
            THE Studio
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
