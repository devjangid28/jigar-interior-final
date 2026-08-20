import React, { useEffect, useRef } from 'react';
import './ProjectsSection.css';

const projects = [
  {
    id: 1,
    num: '1',
    title: ['Master', 'Bedroom'],
    image: '/master.jpg',
    alt: 'Master Bedroom',
  },
  {
    id: 2,
    num: '2',
    title: ['Living', 'Room'],
    image: '/living.jpg',
    alt: 'Living Room',
  },
  {
    id: 3,
    num: '3',
    title: ['TV', 'Units', 'Design'],
    image: '/tv.jpg',
    alt: 'TV Units Design',
  },
  {
    id: 4,
    num: '4',
    title: ['Kitchen', 'Design'],
    image: '/kitchen.jpg',
    alt: 'Kitchen Design',
  },
  {
    id: 5,
    num: '5',
    title: ['Pooja', 'Room'],
    image: '/pooja.jpg',
    alt: 'Pooja Room',
  },
  {
    id: 6,
    num: '6',
    title: ['Dining', 'Room'],
    image: '/dining.jpg',
    alt: 'Dining Room',
  },
];

const ProjectsSection = () => {
  const itemsRef = useRef([]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        itemsRef.current.forEach((item) => {
          if (!item) return;
          const rect = item.getBoundingClientRect();
          const vh = window.innerHeight;

          const img = item.querySelector('.proj-img');
          if (img) {
            const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
            const y = (progress - 0.5) * 80;
            img.style.transform = `translate3d(0px, ${y}px, 0px) scale(1.2, 1.2)`;
          }
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="proj_section" id="projects">
      <div className="proj_list">
        {projects.map((project, index) => (
          <div
            className="proj_item"
            key={project.id}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <figure className="proj_visual">
              <div className="proj_bg"></div>
              <img
                src={project.image}
                loading="lazy"
                alt={project.alt}
                className="proj-img"
              />
              <div className="proj_overlay"></div>
            </figure>

            <div className="proj_content">
              <div className="proj_info">
                <div className="proj_title">
                  <h3>
                    {project.title.map((line, i) => (
                      <span className="proj_line" key={i}>
                        <span className="proj_line_inner">{line}</span>
                      </span>
                    ))}
                  </h3>
                </div>
              </div>

              <div className="proj_right">
                <div className="proj_num">
                  <span>{project.num}</span>
                  <span>/</span>
                  <span>{projects.length}</span>
                </div>
                <a href="#" className="proj_btn">
                  <span className="proj_btn_text">see project</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;