import { Link } from 'react-router-dom';
import logo from '/logo.PNG';
import usePageMeta from '../hooks/usePageMeta.js';
import Footer from '../components/Footer.jsx';
import serviceList from '../data/services.js';
import './ServicePage.css';
import './BlogPage.css';

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

const BlogPage = () => {
  usePageMeta({
    title: 'Interior Design Blog Vadodara | Jigar Interiors – Ideas & Guides',
    description: 'Interior design blog by Jigar Interiors, Vadodara — commercial, office, modular kitchen, bedroom, pooja room, false ceiling, living room and turnkey home interior guides with ideas. Call +91 97244 41259.',
    path: '/blog',
    image: serviceList[0].images[0]?.src,
    schema: {
      '@type': 'Blog',
      blogPost: serviceList.map((s) => ({
        '@type': 'BlogPosting',
        headline: s.linkLabel,
        url: `https://jigarinterior.com${s.path}`,
        description: s.intro,
      })),
    },
  });

  return (
    <div className="blog">
      <header className="svc__pill">
        <a className="svc__pill-logo" href="/" aria-label="Jigar Interiors – go to homepage">
          <img src={logo} alt="Jigar Interiors" />
        </a>
        <nav className="svc__pill-nav">
          <a className="svc__pill-link" href="/#sec_servizi">Services</a>
        </nav>
        <div className="svc__pill-actions">
          <a className="svc__pill-wa" href={enquiry('your interior project')} target="_blank" rel="noopener noreferrer">
            <WhatsIcon />
            <span>Tell us</span>
          </a>
          <a className="svc__pill-link svc__pill-home" href="/" aria-label="Go to homepage">
            <HomeIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="blog__hero">
          <p className="blog__eyebrow">Jigar Interiors &middot; Vadodara</p>
          <h1>Interior Design Blog</h1>
          <p className="blog__intro">
            Ideas, guides and inspiration from our interior design studio in Vadodara. Explore every space we design — homes, kitchens, offices, mandirs, ceilings and complete turnkey interiors.
          </p>
        </section>

        <section className="blog__grid">
          {serviceList.map((s, i) => (
            <Link key={s.path} to={s.path} className="blog__card">
              {s.images[0] && (
                <figure className="blog__fig">
                  <img src={s.images[0].src} alt={s.images[0].alt || s.linkLabel} loading={i === 0 ? undefined : 'lazy'} />
                </figure>
              )}
              <div className="blog__body">
                <span className="blog__num">{String(i + 1).padStart(2, '0')}</span>
                <h2>{s.linkLabel}</h2>
                <p>{s.intro}</p>
                <span className="blog__read">
                  Read more <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="blog__cta">
          <h2>Planning your interior in Vadodara?</h2>
          <p>Talk to our design team about any space in your home or business. Free consultation, fixed estimates, done-for-you delivery.</p>
          <div className="svc__cta">
            <a className="svc__btn svc__btn--primary" href={enquiry('a new interior project')} target="_blank" rel="noopener noreferrer">
              Get Free Estimate on WhatsApp
            </a>
            <a className="svc__btn svc__btn--ghost" href="tel:+919724441259">Call +91 97244 41259</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;