import React, { useEffect, useState } from 'react';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onClose }) => {
  const [lightbox, setLightbox] = useState(null);
  const total = project.images.length;

  // Body scroll lock while detail page is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Browser back button / swipe gesture closes the page
  useEffect(() => {
    window.history.pushState({ projDetail: true }, '');
    const handlePop = () => onClose();
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [onClose]);

  // ESC: close lightbox first, then page
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (lightbox !== null) setLightbox(null);
        else handleCloseClick();
      }
      if (lightbox !== null && total > 1) {
        if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % total);
        if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + total) % total);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleCloseClick = () => {
    if (window.history.state && window.history.state.projDetail) {
      window.history.back(); // triggers popstate -> onClose
    } else {
      onClose();
    }
  };

  return (
    <div className="pd --in" role="dialog" aria-modal="true" aria-label={project.alt}>
      <div className="pd__bar">
        <button className="pd__back" onClick={handleCloseClick} aria-label="Back to projects">
          <span className="pd__back-arrow">&#8592;</span>
          <span>Back</span>
        </button>
        <div className="pd__count">{total} photos</div>
      </div>

      <header className="pd__head">
        <h2 className="pd__title">
          {project.title.map((line, i) => (
            <span
              className="pd__title-line"
              key={i}
              style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="pd__title-line-inner">{line}</span>
            </span>
          ))}
        </h2>
      </header>

      <div className="pd__grid">
        {project.images.map((src, i) => (
          <figure
            className="pd__item"
            key={src}
            style={{ animationDelay: `${Math.min(i * 60, 480)}ms` }}
            onClick={() => setLightbox(i)}
          >
            <img src={encodeURI(src)} alt={`${project.alt} ${i + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>

      {lightbox !== null && (
        <div className="pd__lightbox" onClick={() => setLightbox(null)}>
          <button className="pd__lb-close" onClick={() => setLightbox(null)} aria-label="Close">
            &#215;
          </button>
          {total > 1 && (
            <>
              <button
                className="pd__lb-nav pd__lb-nav--prev"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + total) % total); }}
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                className="pd__lb-nav pd__lb-nav--next"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % total); }}
                aria-label="Next image"
              >
                &#8250;
              </button>
            </>
          )}
          <img
            src={encodeURI(project.images[lightbox])}
            alt={`${project.alt} ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="pd__lb-counter">
            {lightbox + 1} / {total}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
