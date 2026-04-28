import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';

const CERTIFICATES = [
  { id: 1, title: 'Alibaba Masterclass',        issuer: 'PhilDev Foundation', date: '2024', img: '/1.jpg' },
  { id: 2, title: 'Design Thinking',             issuer: 'PhilDev Foundation', date: '2024', img: '/2.jpg' },
  { id: 3, title: 'Leadership & Communication',  issuer: 'PhilDev Foundation', date: '2024', img: '/3.jpg' },
  { id: 4, title: 'Workshop – Day 2',            issuer: 'PhilDev Foundation', date: '2024', img: '/4.jpg' },
  { id: 5, title: 'Workshop – Day 3',            issuer: 'PhilDev Foundation', date: '2024', img: '/5.jpg' },
];

// Detect iOS — all browsers on iPhone/iPad use WebKit
function detectIOS() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPadOS 13+ reports as MacIntel with touch support
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export default function Certifications() {
  const { ref, inView } = useInView();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Refs for the RAF loop (avoid stale closures)
  const trackRef     = useRef(null);
  const animFrameRef = useRef(null);
  const posRef       = useRef(0);
  const pausedRef    = useRef(false);
  const modalRef     = useRef(false);
  const isIOS        = useRef(detectIOS());

  const total        = CERTIFICATES.length;
  const marqueeItems = [...CERTIFICATES, ...CERTIFICATES];

  // Keep pause/modal refs in sync with state
  useEffect(() => { pausedRef.current = paused; },    [paused]);
  useEffect(() => { modalRef.current  = modalOpen; }, [modalOpen]);

  // ── iOS: JS-driven RAF marquee ──────────────────────────────────────────
  useEffect(() => {
    if (!isIOS.current) return;

    const track = trackRef.current;
    if (!track) return;

    // Kill the CSS animation so JS can own the transform
    track.style.animation       = 'none';
    track.style.webkitAnimation = 'none';

    let halfWidth = 0;
    const SPEED = 0.5; // px / frame  (~30 px/s at 60 fps)

    const animate = () => {
      if (!pausedRef.current && !modalRef.current) {
        // Lazy-compute half-width once the DOM has real dimensions
        if (!halfWidth && track.scrollWidth > 0) {
          halfWidth = track.scrollWidth / 2;
        }
        if (halfWidth > 0) {
          posRef.current -= SPEED;
          if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
          const t = `translate3d(${posRef.current}px, 0, 0)`;
          track.style.webkitTransform = t;
          track.style.transform       = t;
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []); // run once — refs handle dynamic values

  // ── Modal keyboard nav ──────────────────────────────────────────────────
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape')     closeModal();
      if (e.key === 'ArrowRight') setModalIndex((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft')  setModalIndex((i) => ((i - 1) + total) % total);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, total]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const openModal  = (index) => { setModalIndex(index % total); setModalOpen(true); };
  const closeModal = ()      => setModalOpen(false);

  return (
    <>
      <section
        id="certifications"
        ref={ref}
        className={`reveal ${inView ? 'active' : ''}`}
      >
        <h2 className="sectionTitle">Certifications &amp; Workshops</h2>

        {/* ── Marquee wrapper ── */}
        <div
          className="cert-marquee-outer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={()   => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="cert-marquee-track"
            style={{
              animationPlayState:       paused || modalOpen ? 'paused' : 'running',
              WebkitAnimationPlayState: paused || modalOpen ? 'paused' : 'running',
            }}
          >
            {marqueeItems.map((cert, i) => (
              <div
                key={`${cert.id}-${i}`}
                className={`cert-card stagger-item ${inView ? 'active' : ''}`}
                style={{ transitionDelay: `${(i % total) * 80}ms` }}
                onClick={() => openModal(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${cert.title} certificate`}
                onKeyDown={(e) => e.key === 'Enter' && openModal(i)}
              >
                <div className="cert-thumb">
                  <img
                    src={cert.img}
                    alt={`${cert.title} certificate`}
                    className="cert-thumb-img"
                    loading="lazy"
                  />
                  <div className="cert-thumb-overlay">
                    <span className="cert-thumb-icon">⊕</span>
                  </div>
                </div>
                <div className="cert-info">
                  <p className="cert-issuer">{cert.issuer}</p>
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-date">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="cert-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
        >
          <div className="cert-modal">
            <div className="cert-modal-header">
              <button
                className="cert-modal-nav"
                onClick={() => setModalIndex((i) => ((i - 1) + total) % total)}
                aria-label="Previous certificate"
              >←</button>

              <div className="cert-modal-meta">
                <span className="cert-modal-issuer">{CERTIFICATES[modalIndex].issuer}</span>
                <h3 className="cert-modal-title">{CERTIFICATES[modalIndex].title}</h3>
              </div>

              <button
                className="cert-modal-nav"
                onClick={() => setModalIndex((i) => (i + 1) % total)}
                aria-label="Next certificate"
              >→</button>

              <button className="cert-modal-close" onClick={closeModal} aria-label="Close modal">✕</button>
            </div>

            <div className="cert-modal-body">
              <img
                key={modalIndex}
                src={CERTIFICATES[modalIndex].img}
                alt={CERTIFICATES[modalIndex].title}
                className="cert-modal-img"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}