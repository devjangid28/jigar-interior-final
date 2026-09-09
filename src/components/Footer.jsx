import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import serviceList from '../data/services.js';

const Footer = ({ hideServices }) => {
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
          <div className="w100 rel flex-t flex-auto gap-15-2">
            <div className="foot_block flex-r tac_mobile w33l rel">
              <div>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
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
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  <a href="tel:+919724441259" title="Call Jigar Interiors" rel="noopener">
                    Tel: +91 9724441259
                  </a>
                </p>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  <a href="tel:+919879337290" title="Call Jigar Interiors" rel="noopener">
                    Tel: +91 9879337290
                  </a>
                </p>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  <a href="mailto:studio@jigarinterior.com" title="Email Jigar Interiors" rel="noopener">
                    studio@jigarinterior.com
                  </a>
                </p>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  Mon - Sat: 10:00 - 20:00
                </p>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="foot_block flex tac_mobile w33l rel">
              <div>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  <a
                    href="https://wa.me/919724441259"
                    title="Chat with Jigar Interiors on WhatsApp"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </p>
                <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.5 }}>
                  <a
                    href="https://www.instagram.com/jigar_interior?igsi=dHNiZ3Vjdjl2cTNl"
                    title="Follow Jigar Interiors on Instagram"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </p>
              </div>
            </div>
          </div>

          {!hideServices && (
          <div className="foot_services w100 rel" style={{ marginTop: '70px' }}>
            <p style={{ fontFamily: '"Anek Bangla", sans-serif', fontSize: '15px', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E', margin: '0 0 16px' }}>
              Interior Services in Vadodara
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', maxWidth: '860px' }}>
              {serviceList.map((s) => (
                <Link
                  key={s.path}
                  to={s.path}
                  style={{ color: '#a2adb4', textDecoration: 'none', fontFamily: '"Anek Bangla", sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.6 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#a2adb4')}
                >
                  {s.linkLabel}
                </Link>
              ))}
            </div>
          </div>
          )}
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
          <span>&copy; 2026&nbsp;Jigar Interior Design</span>
          <span className="resp_sep"> - </span>
          <span>Vadodara</span>
          <span className="resp_sep"> - </span>
          <span>Email: studio@jigarinterior.com - M 9724441259, 9879337290</span>
          <span className="resp_sep"> - </span>
          <span>For More info. 9724441259</span>
        </p>
        <p className="tac_mobile" style={{ display: 'none', font: '15px "Anek Bangla", sans-serif', color: '#FFFFFF', paddingRight: '50px' }} id="credits_studio_container" hidden>
          Created by:{' '}
          <a
            href="https://portfolio-theta-rosy-cv2yj45f9r.vercel.app/"
            rel="noopener noreferrer"
            target="_blank"
            title="Dev Jangid"
            id="credits_studio"
            style={{ color: '#C9A96E', fontWeight: 600, textDecoration: 'underline', letterSpacing: '0.05em' }}
          >
            DEV JANGID
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
