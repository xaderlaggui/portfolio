import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from '../../hooks/useInView';

const CERTIFICATES = [
  {
    id: 1,
    title: 'Alibaba Masterclass',
    issuer: 'PhilDev Foundation',
    date: '2024',
    pdf: '/[Alibaba Masterclass] Certificate of Completion.pdf',
  },
  {
    id: 2,
    title: 'Design Thinking',
    issuer: 'PhilDev Foundation',
    date: '2024',
    pdf: '/[Design Thinking] Certificate of Completion.pdf',
  },
  {
    id: 3,
    title: 'Leadership & Communication',
    issuer: 'PhilDev Foundation',
    date: '2024',
    pdf: '/[Leadership] Certificate of Completion.pdf',
  },
  {
    id: 4,
    title: 'Workshop – Day 2',
    issuer: 'PhilDev Foundation',
    date: '2024',
    pdf: '/[Day 2] Certificate of Completion.pdf',
  },
  {
    id: 5,
    title: 'Workshop – Day 3',
    issuer: 'PhilDev Foundation',
    date: '2024',
    pdf: '/[Day3] Certificate of Completion.pdf',
  },
];

const AUTO_SCROLL_INTERVAL = 3000;

/* ── How many cards are visible at each breakpoint ── */
function getVisibleCount() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

/*
 * Infinite-loop strategy: clone buffer
 *   - Prepend clones of the last N real cards  (tail clones)
 *   - Append  clones of the first N real cards (head clones)
 *   - Start visual position at real card[0]
 *   - After animating into a clone zone, instantly jump to the mirror real card
 */

export default function Certifications() {
  const { ref, inView } = useInView();

  const total = CERTIFICATES.length;

  /* ── visible count (responsive) ── */
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  /* ── currentIndex: index among real cards (0-based) ── */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ── isAnimating: controls CSS transition class ── */
  const [isAnimating, setIsAnimating] = useState(false);

  /* ── inTransition: blocks new slides until transitionend ── */
  const inTransition = useRef(false);

  /* ── track ref for transitionend ── */
  const trackRef = useRef(null);

  /* ── modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  /* ── hover (pauses auto-scroll) ── */
  const [isHovered, setIsHovered] = useState(false);

  /* ── drag ── */
  const dragStartX = useRef(null);
  const dragCurrentX = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  /* ── auto-scroll ── */
  const intervalRef = useRef(null);

  /* ════════════════════════════════
     Build cloned items array
  ════════════════════════════════ */
  // tailClones = last N real items   (prepended)
  // headClones = first N real items  (appended)
  const tailClones = CERTIFICATES.slice(-visibleCount);
  const headClones = CERTIFICATES.slice(0, visibleCount);
  const allItems = [...tailClones, ...CERTIFICATES, ...headClones];

  /* ════════════════════════════════
     translateX calculation
     Visual position = -(visibleCount + currentIndex) * cardWidthPct
  ════════════════════════════════ */
  const cardWidthPct = 100 / visibleCount;
  const baseOffset = -(visibleCount + currentIndex) * cardWidthPct;
  const translateX = baseOffset + (dragOffset / (trackRef.current?.offsetWidth || 1)) * 100 * visibleCount;

  /* ════════════════════════════════
     Slide function
  ════════════════════════════════ */
  const slide = useCallback((dir) => {
    if (inTransition.current) return;
    inTransition.current = true;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + dir);
  }, []);

  const next = useCallback(() => slide(1), [slide]);
  const prev = useCallback(() => slide(-1), [slide]);

  /* ════════════════════════════════
     transitionend → infinite jump
  ════════════════════════════════ */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      setIsAnimating(false);

      setCurrentIndex((prev) => {
        // Jumped past the end → jump to real start
        if (prev >= total) return prev - total;
        // Jumped before the start → jump to real end
        if (prev < 0) return prev + total;
        return prev;
      });

      inTransition.current = false;
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [total]);

  /* ════════════════════════════════
     Auto-scroll
  ════════════════════════════════ */
  const startAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, AUTO_SCROLL_INTERVAL);
  }, [next]);

  const stopAutoScroll = useCallback(() => clearInterval(intervalRef.current), []);

  useEffect(() => {
    if (!isHovered && !modalOpen) startAutoScroll();
    else stopAutoScroll();
    return stopAutoScroll;
  }, [isHovered, modalOpen, startAutoScroll, stopAutoScroll]);

  /* ════════════════════════════════
     goTo (dot click) – jump directly
  ════════════════════════════════ */
  const goTo = useCallback((index) => {
    if (inTransition.current) return;
    inTransition.current = true;
    setIsAnimating(true);
    setCurrentIndex(index);
    // Short timeout for the animation, then unlock
    setTimeout(() => {
      inTransition.current = false;
      setIsAnimating(false);
    }, 450);
  }, []);

  /* ════════════════════════════════
     Drag / swipe
  ════════════════════════════════ */
  const handleDragStart = (e) => {
    if (inTransition.current) return;
    isDragging.current = true;
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentX.current = dragStartX.current;
    stopAutoScroll();
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    dragCurrentX.current = x;
    setDragOffset(x - dragStartX.current);
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragCurrentX.current - dragStartX.current;
    setDragOffset(0);

    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev();
    }

    if (!isHovered && !modalOpen) startAutoScroll();
  };

  /* ════════════════════════════════
     Responsive resize
  ════════════════════════════════ */
  useEffect(() => {
    const onResize = () => {
      const newVisible = getVisibleCount();
      setVisibleCount((prev) => {
        if (prev !== newVisible) return newVisible;
        return prev;
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ════════════════════════════════
     Modal keyboard nav
  ════════════════════════════════ */
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') setModalIndex((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setModalIndex((i) => ((i - 1) + total) % total);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, total]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const openModal = (index) => { setModalIndex(index); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  /* ── real currentIndex (clamped for dot display) ── */
  const displayIndex = ((currentIndex % total) + total) % total;

  /* ════════════════════════════════
     RENDER
  ════════════════════════════════ */
  return (
    <>
      <section
        id="certifications"
        ref={ref}
        className={`reveal ${inView ? 'active' : ''}`}
      >
        <h2 className="sectionTitle">Certifications &amp; Workshops</h2>

        <div
          className="cert-carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); handleDragEnd(); }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className={`cert-track${isAnimating ? ' is-animating' : ''}`}
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {allItems.map((cert, i) => {
              // Real card index (clones don't have one, so we pick the closest real)
              const realIndex = i - visibleCount;
              const clampedReal = ((realIndex % total) + total) % total;

              return (
                <div
                  key={`${cert.id}-${i}`}
                  className={`cert-card stagger-item ${inView ? 'active' : ''}`}
                  style={{
                    transitionDelay: `${Math.max(0, realIndex) * 80}ms`,
                    flex: `0 0 ${cardWidthPct}%`,
                  }}
                  onClick={() => openModal(clampedReal)}
                  role="button"
                  tabIndex={i >= visibleCount && i < visibleCount + total ? 0 : -1}
                  aria-label={`View ${cert.title} certificate`}
                  aria-hidden={i < visibleCount || i >= visibleCount + total}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(clampedReal)}
                >
                  <div className="cert-thumb">
                    <iframe
                      src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={`${cert.title} preview`}
                      className="cert-thumb-iframe"
                      tabIndex={-1}
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
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="cert-controls">
          <button className="cert-arrow cert-arrow--prev" onClick={prev} aria-label="Previous certificate">←</button>

          <div className="cert-dots">
            {CERTIFICATES.map((_, i) => (
              <button
                key={i}
                className={`cert-dot ${i === displayIndex ? 'cert-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>

          <button className="cert-arrow cert-arrow--next" onClick={next} aria-label="Next certificate">→</button>
        </div>
      </section>

      {/* Modal */}
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
              <div className="cert-modal-meta">
                <span className="cert-modal-issuer">{CERTIFICATES[modalIndex].issuer}</span>
                <h3 className="cert-modal-title">{CERTIFICATES[modalIndex].title}</h3>
              </div>
              <button className="cert-modal-close" onClick={closeModal} aria-label="Close modal">✕</button>
            </div>
            <div className="cert-modal-body">
              <iframe
                key={modalIndex}
                src={CERTIFICATES[modalIndex].pdf}
                title={CERTIFICATES[modalIndex].title}
                className="cert-modal-iframe"
              />
            </div>
            <div className="cert-modal-footer">
              <button className="cert-modal-nav" onClick={() => setModalIndex((i) => ((i - 1) + total) % total)} aria-label="Previous">← Prev</button>
              <span className="cert-modal-counter">{modalIndex + 1} / {total}</span>
              <button className="cert-modal-nav" onClick={() => setModalIndex((i) => (i + 1) % total)} aria-label="Next">Next →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}