import React, { useEffect, useRef, useState } from 'react';
import './AllProjects.css';

const categories = [
  {
    title: ['Living', 'Room'],
    cover: '/living.webp',
    images: [
      '/interior 3.png',
      '/interior 4.png',
      '/interior 8.png',
      '/living2.jpg',
    ],
  },
  {
    title: ['TV', 'Units'],
    cover: '/Tv M.jpg',
    images: [
      '/interior 4.png',
      '/tv2.jpg',
    ],
  },
  {
    title: ['Kitchen'],
    cover: '/Kitchen M.jpg',
    images: [
      '/kitchen.jpg',
      '/kitchen3.jpg',
    ],
  },
  {
    title: ['Dining', 'Room'],
    cover: '/dinning.webp',
    images: [
      '/dinning2.jpg',
      '/dinning3.jpg',
      '/dinning4.jpg',
    ],
  },
  {
    title: ['Pooja', 'Room'],
    cover: '/mandir.webp',
    images: [
      '/pooja2.jpg',
      '/pooja3.jpg',
      '/pooja4.jpg',
    ],
  },
  {
    title: ['Master', 'Bedroom'],
    cover: '/bedroom M.jpg',
    images: [
      '/interior 1.png',
      '/masterbed room.jpg',
      '/bedroom1.jpg',
      '/bedroom2.jpg',
      '/bedroom3.jpg',
      '/bedroom4.jpg',
      '/bedroom5.jpg',
      '/bedroom6.jpg',
      '/bedroom7.jpg',
    ],
  },
  {
    title: ['Foyer'],
    cover: '/foyer.webp',
    images: [
      '/interior 9.png',
      '/floyer1.jpg',
      '/floyer2.jpg',
      '/floyer3.jpg',
      '/floyer4.jpg',
    ],
  },
  {
    title: ['Door', 'Design'],
    cover: '/door.webp',
    images: [
      '/door2.jpg',
    ],
  },
];

const AllProjects = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [entered, setEntered] = useState(false);
  const [docked, setDocked] = useState(false);
  const catRefs = useRef([]);
  const apRef = useRef(null);

  useEffect(() => {
    const scroller = apRef.current;
    if (!scroller) return;
    const navEl = scroller.querySelector('.ap__nav');
    if (!navEl) return;
    const base = navEl.offsetTop;
    const showAt = base - 60;
    const hideAt = base - 180;
    let current = false;
    let ticking = false;
    const read = () => {
      ticking = false;
      const next = current
        ? scroller.scrollTop >= hideAt
        : scroller.scrollTop >= showAt;
      if (next !== current) {
        current = next;
        setDocked(next);
      }
    };
    const update = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };
    read();
    scroller.addEventListener('scroll', update, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', update);
      if (ticking) cancelAnimationFrame(read);
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = catRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveCategory(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    catRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    window.history.pushState({ allProjects: true }, '');
    const handlePop = () => onClose();
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (lightbox !== null) setLightbox(null);
        else handleClose();
      }
      if (lightbox !== null) {
        if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % flat.length);
        if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + flat.length) % flat.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleClose = () => {
    if (window.history.state?.allProjects) {
      window.history.back();
    } else {
      onClose();
    }
  };

  const flat = React.useMemo(() => {
    return categories.flatMap((cat) =>
      cat.images.map((src) => ({ src, label: cat.title.join(' ') }))
    );
  }, []);

  const openLightbox = (catIdx, imgIdx) => {
    let offset = 0;
    for (let i = 0; i < catIdx; i++) offset += categories[i].images.length;
    setLightbox(offset + imgIdx);
  };

  const renderPills = () =>
    categories.map((cat, i) => (
      <button
        key={i}
        className={`ap__nav-btn ${activeCategory === i ? 'ap__nav-btn--active' : ''}`}
        onClick={() => {
          setActiveCategory(i);
          document.getElementById(`ap-cat-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        {cat.title.join(' ')}
      </button>
    ));

  return (
    <div className={`ap ${entered ? 'ap--in' : ''}`} ref={apRef}>
      <div className="ap__bar">
        <button className="ap__close" onClick={handleClose} aria-label="Close">
          <span className="ap__close-line" />
          <span className="ap__close-line" />
        </button>
      </div>

      <div className={`ap__dock ${docked ? 'ap__dock--in' : ''}`}>
        {renderPills()}
      </div>

      <header className="ap__header">
        <h1 className="ap__title">
          <span className="ap__title-line">
            <span className="ap__title-line-inner">All</span>
          </span>
          <span className="ap__title-line">
            <span className="ap__title-line-inner">Projects</span>
          </span>
        </h1>
        <p className="ap__subtitle">Every space, beautifully transformed</p>
      </header>

      <nav className={`ap__nav ${docked ? 'ap__nav--hidden' : ''}`}>
        {renderPills()}
      </nav>

      <div className="ap__body">
        {categories.map((cat, catIdx) => (
          <section
            className="ap__category"
            key={catIdx}
            id={`ap-cat-${catIdx}`}
            ref={(el) => (catRefs.current[catIdx] = el)}
          >
            <div className="ap__cat-header">
              <h2 className="ap__cat-title">
                {cat.title.map((line, i) => (
                  <span className="ap__cat-title-line" key={i}>
                    <span className="ap__cat-title-line-inner">{line}</span>
                  </span>
                ))}
              </h2>
              <span className="ap__cat-count">{cat.images.length} photos</span>
            </div>

            <div className="ap__cat-cover">
              <img src={cat.cover} alt={cat.title.join(' ')} loading="lazy" />
            </div>

            <div className="ap__grid">
              {cat.images.map((src, imgIdx) => (
                <figure
                  className="ap__item"
                  key={src}
                  style={{ animationDelay: `${Math.min(imgIdx * 50, 300)}ms` }}
                  onClick={() => openLightbox(catIdx, imgIdx)}
                >
                  <img src={encodeURI(src)} alt={`${cat.title.join(' ')} ${imgIdx + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        ))}

        <div className="ap__footer">
          <div className="ap__footer-line" />
          <p className="ap__footer-text">Your space, fully transformed.</p>
          <div className="ap__footer-line" />
        </div>
      </div>

      {lightbox !== null && (
        <div className="ap__lightbox" onClick={() => setLightbox(null)}>
          <button className="ap__lb-close" onClick={() => setLightbox(null)} aria-label="Close">
            &#215;
          </button>
          {flat.length > 1 && (
            <>
              <button
                className="ap__lb-nav ap__lb-nav--prev"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + flat.length) % flat.length); }}
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                className="ap__lb-nav ap__lb-nav--next"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % flat.length); }}
                aria-label="Next image"
              >
                &#8250;
              </button>
            </>
          )}
          <img
            src={encodeURI(flat[lightbox].src)}
            alt={flat[lightbox].label}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="ap__lb-counter">
            {flat[lightbox].label} &nbsp;&middot;&nbsp; {lightbox + 1} / {flat.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
