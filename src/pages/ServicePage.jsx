import { Link } from 'react-router-dom';
import logo from '/logo.PNG';
import usePageMeta from '../hooks/usePageMeta.js';
import Footer from '../components/Footer.jsx';
import serviceList from '../data/services.js';
import './ServicePage.css';

const WHATSAPP = '919724441259';

const enquiry = (label) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello Jigar Interiors, I want to discuss ${label} in Vadodara.`)}`;

const WhatsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

const ServicePage = ({ service }) => {
  usePageMeta({
    title: service.title,
    description: service.description,
    path: service.path,
    image: service.images[0]?.src,
  });

  return (
    <div className="svc">
      <header className="svc__pill">
        <a className="svc__pill-logo" href="/" aria-label="Jigar Interiors – go to homepage">
          <img src={logo} alt="Jigar Interiors" />
        </a>
        <nav className="svc__pill-nav">
          <a className="svc__pill-link" href="/#sec_servizi">Services</a>
        </nav>
        <div className="svc__pill-actions">
          <a className="svc__pill-wa" href={enquiry(service.h1)} target="_blank" rel="noopener noreferrer">
            <WhatsIcon />
            <span>Tell us</span>
          </a>
          <a className="svc__pill-link svc__pill-home" href="/" aria-label="Go to homepage">
            <HomeIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="svc__hero">
          <h1>{service.h1}</h1>
          <p className="svc__intro">{service.intro}</p>
          <div className="svc__cta">
            <a className="svc__btn svc__btn--primary" href={enquiry(service.h1)} target="_blank" rel="noopener noreferrer">
              Get Free Estimate on WhatsApp
            </a>
            <a className="svc__btn svc__btn--ghost" href="tel:+919724441259">Call +91 97244 41259</a>
          </div>
        </section>

        {service.images.length > 0 && (
          <section className="svc__gallery">
            {service.images.map((img, i) => (
              <figure className="svc__figure" key={`${img.src}-${i}`}>
                <img src={img.src} alt={img.alt} loading={i === 0 ? undefined : 'lazy'} />
              </figure>
            ))}
          </section>
        )}

        <section className="svc__section" id="features">
          <h2>What we design for you</h2>
          <div className="svc__grid">
            {service.features.map((f, i) => (
              <article className="svc__card" key={i}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="svc__section" id="process">
          <h2>Our process</h2>
          <ol className="svc__steps">
            {service.processSteps.map((s, i) => (
              <li className="svc__step" key={i}>
                <span className="svc__step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {service.faqs.length > 0 && (
          <section className="svc__section" id="faq">
            <h2>Frequently Asked Questions</h2>
            <div className="svc__faq">
              {service.faqs.map((f, i) => (
                <details className="svc__faq-item" key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="svc__more">
          <h2>More services in Vadodara</h2>
          <div className="svc__more-grid">
            {serviceList.map((s, i) => (
              <Link key={s.path} to={s.path} className="svc__more-card">
                <span className="svc__more-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc__more-title">{s.linkLabel}</span>
                <span className="svc__more-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;