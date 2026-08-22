import React, { useEffect, useRef, useState } from 'react';
import './ProjectsSection.css';
import ProjectDetail from './ProjectDetail.jsx';

const projects = [
  {
    id: 1,
    num: '1',
    title: ['Master', 'Bedroom'],
    image: '/interior 7.png',
    alt: 'Master Bedroom',
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
    id: 2,
    num: '2',
    title: ['Living', 'Room'],
    image: '/living room.jpg',
    alt: 'Living Room',
    images: [
      '/interior 3.png',
      '/interior 4.png',
      '/interior 8.png',
      '/living2.jpg',
    ],
  },
  {
    id: 3,
    num: '3',
    title: ['TV', 'Units', 'Design'],
    image: '/tv unit design.jpg',
    alt: 'TV Units Design',
    images: [
      '/interior 4.png',
      '/tv2.jpg',
    ],
  },
  {
    id: 4,
    num: '4',
    title: ['Kitchen', 'Design'],
    image: '/kitchen.jpg',
    alt: 'Kitchen Design',
    images: [
      '/kitchen 2.jpg',
      '/kitchen3.jpg',
    ],
  },
  {
    id: 5,
    num: '5',
    title: ['Pooja', 'Room'],
    image: '/POOJA ROOM.jpg',
    alt: 'Pooja Room',
    images: [
      '/pooja2.jpg',
      '/pooja3.jpg',
      '/pooja4.jpg',
    ],
  },
  {
    id: 6,
    num: '6',
    title: ['Dining', 'Room'],
    image: '/Dining room1.jpg',
    alt: 'Dining Room',
    images: [
      '/dinning2.jpg',
      '/dinning3.jpg',
      '/dinning4.jpg',
    ],
  },
  {
    id: 7,
    num: '7',
    title: ['Door', 'Design'],
    image: '/Doordesign.jpg',
    alt: 'Door Design',
    images: [
      '/door2.jpg',
    ],
  },
  {
    id: 8,
    num: '8',
    title: ['Foyer'],
    image: '/foyer.jpg',
    alt: 'Foyer',
    images: [
      '/interior 9.png',
      '/floyer1.jpg',
      '/floyer2.jpg',
      '/floyer3.jpg',
      '/floyer4.jpg',
    ],
  },
];

const ProjectsSection = () => {
  const itemsRef = useRef([]);
  const [activeProject, setActiveProject] = useState(null);

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
            img.style.transform = `translate3d(0px, ${y}px, 0px)`;
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
                <a
                  href="#"
                  className="proj_btn"
                  onClick={(e) => { e.preventDefault(); setActiveProject(project); }}
                >
                  <span className="proj_btn_text">see project</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeProject && (
        <ProjectDetail
          key={activeProject.id}
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;