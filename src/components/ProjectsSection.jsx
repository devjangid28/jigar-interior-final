import React, { useEffect, useRef, useState } from 'react';
import './ProjectsSection.css';
import ProjectDetail from './ProjectDetail.jsx';

const projects = [
  {
    id: 1,
    num: '1',
    title: ['Master', 'Bedroom'],
    image: '/Bedroom D.jpg',
    mobileImage: '/bedroom M.jpg',
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
    image: '/living D.jpg',
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
    image: '/Tv D.jpg',
    mobileImage: '/Tv M.jpg',
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
    image: '/kitchen D.jpg',
    mobileImage: '/Kitchen M.jpg',
    alt: 'Kitchen Design',
    images: [
      '/kitchen.jpg',
      '/kitchen3.jpg',
    ],
  },
  {
    id: 5,
    num: '5',
    title: ['Pooja', 'Room'],
    image: '/mandir.webp',
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
    image: '/Dinning D.jpg',
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
    image: '/Room D.jpg',
    alt: 'Door Design',
    images: [
      '/door2.jpg',
    ],
  },
  {
    id: 8,
    num: '8',
    title: ['Foyer'],
    image: '/foyer.webp',
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

const collageImages = [
  { src: '/living D.jpg', mobileSrc: '/living.webp', alt: 'Living Room' },
  { src: '/Bedroom D.jpg', mobileSrc: '/bedroom M.jpg', alt: 'Master Bedroom' },
  { src: '/kitchen D.jpg', mobileSrc: '/Kitchen M.jpg', alt: 'Kitchen Design' },
  { src: '/mandir.webp', mobileSrc: '/mandir.webp', alt: 'Pooja Room' },
  { src: '/Dinning D.jpg', mobileSrc: '/dinning.webp', alt: 'Dining Room' },
];

// slot definitions matching Framer exactly
// slot 0 = left  (rotate -20deg, small, behind-left)
// slot 1 = center (full size, front)
// slot 2 = right (rotate +20deg, small, behind-right)
// slot 3 = hidden off-screen left
// slot 4 = hidden off-screen right
const getSlotStyle = (slot) => {
  const base = 'position:absolute; overflow:hidden; transition: all 0.6s cubic-bezier(0.16,1,0.3,1); will-change: transform;';
  switch (slot) {
    case 0: return { top:'18%', left:'-28%', width:'50%', height:'65%', borderRadius:'32px', transform:'rotate(-20deg)', zIndex:1, opacity:1 };
    case 1: return { top:'0',   left:'0',    width:'100%',height:'100%',borderRadius:'44px', transform:'none',           zIndex:3, opacity:1 };
    case 2: return { top:'18%', left:'78%',  width:'50%', height:'65%', borderRadius:'32px', transform:'rotate(20deg)',  zIndex:1, opacity:1 };
    default: return { top:'18%', left:'50%',  width:'50%', height:'65%', borderRadius:'32px', transform:'rotate(0deg)',   zIndex:0, opacity:0 };
  }
};

const CollageCards = ({ isMobile }) => {
  const n = collageImages.length;
  // slotOf[i] = which slot image i currently occupies
  // start: image 0 → slot 1 (center), image 1 → slot 2 (right), image 4 → slot 0 (left), rest hidden
  const [slotOf, setSlotOf] = useState(() => {
    const s = new Array(n).fill(99);
    s[0] = 1; // center
    s[1] = 2; // right
    s[n - 1] = 0; // left
    return s;
  });

  const handleTap = () => {
    setSlotOf((prev) => {
      const next = [...prev];
      // find who is in each slot
      const centerIdx = prev.indexOf(1);
      const rightIdx  = prev.indexOf(2);
      const leftIdx   = prev.indexOf(0);
      // find the next image after rightIdx
      const newRightIdx = (rightIdx + 1) % n;

      // animate: center→left, right→center, left→hidden, newRight→right
      next[centerIdx] = 0;        // center goes to left
      next[rightIdx]  = 1;        // right comes to center
      next[leftIdx]   = 99;       // old left hides
      next[newRightIdx] = 2;      // new image enters from right
      return next;
    });
  };

  return (
    <div className="collage-wrap" onClick={handleTap}>
      <div className="collage-heading">
        <h2>TURNKEY SOLUTIONS</h2>
        <p>Your Space, Fully Transformed.</p>
      </div>
      <div className="collage-stage">
        {collageImages.map((img, i) => {
          const s = getSlotStyle(slotOf[i]);
          return (
            <div
              key={img.src}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                width: s.width,
                height: s.height,
                borderRadius: s.borderRadius,
                transform: s.transform,
                transformOrigin: '50% 50%',
                zIndex: s.zIndex,
                opacity: s.opacity,
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                willChange: 'transform',
              }}
            >
              <img src={isMobile ? img.mobileSrc : img.src} alt={img.alt} draggable={false} />
            </div>
          );
        })}
      </div>
      <div className="collage-btn-wrap" onClick={(e) => e.stopPropagation()}>
        <a href="/all-projects" className="collage-show-btn">show all</a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const itemsRef = useRef([]);
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                src={isMobile && project.mobileImage ? project.mobileImage : project.image}
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

      <CollageCards isMobile={isMobile} />

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
