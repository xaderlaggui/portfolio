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
const VISIBLE_CARDS = 3;

export default function Certifications() {
  const { ref, inView } = useInView();

  /* ── carousel state ── */
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  /* ── modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const modalRef = useRef(null);

  const total = CERTIFICATES.length;

  /* ── helpers ── */
  const goTo = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(((index % total) + total) % total);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── auto-scroll ── */
  const startAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTO_SCROLL_INTERVAL);
  }, [total]);

  const stopAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!isHovered && !modalOpen) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return stopAutoScroll;
  }, [isHovered, modalOpen, startAutoScroll, stopAutoScroll]);

  /* ── keyboard nav for modal ── */
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

  /* ── lock body scroll when modal open ── */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  /* ── drag / swipe support ── */
  const dragStartX = useRef(null);

  const handleDragStart = (e) => {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStartX.current - endX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    dragStartX.current = null;
  };

  /* ── compute translated position ── */
  // On mobile we show 1 card, on desktop 3. Slide by card width (%).
  // translateX offset: -current * (100 / visibleCards)  per card slot
  const trackOffset = `-${current * (100 / VISIBLE_CARDS)}%`;

  return (
    <>
      {/* ════════════════════════════════
          SECTION
      ════════════════════════════════ */}
      <section
        id="certifications"
        ref={ref}
        className={`reveal ${inView ? 'active' : ''}`}
      >
        <h2 className="sectionTitle">Certifications &amp; Workshops</h2>

        <div
          className="cert-carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Track */}
          <div
            className="cert-track"
            style={{ transform: `translateX(${trackOffset})` }}
          >
            {CERTIFICATES.map((cert, i) => (
              <div
                key={cert.id}
                className={`cert-card stagger-item ${inView ? 'active' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => openModal(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${cert.title} certificate`}
                onKeyDown={(e) => e.key === 'Enter' && openModal(i)}
              >
                {/* PDF Thumbnail via iframe */}
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

                {/* Card info */}
                <div className="cert-info">
                  <p className="cert-issuer">{cert.issuer}</p>
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-date">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Arrow controls ── */}
        <div className="cert-controls">
          <button
            className="cert-arrow cert-arrow--prev"
            onClick={prev}
            aria-label="Previous certificate"
          >
            ←
          </button>

          {/* Dot indicators */}
          <div className="cert-dots">
            {CERTIFICATES.map((_, i) => (
              <button
                key={i}
                className={`cert-dot ${i === current ? 'cert-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="cert-arrow cert-arrow--next"
            onClick={next}
            aria-label="Next certificate"
          >
            →
          </button>
        </div>
      </section>

      {/* ════════════════════════════════
          MODAL / LIGHTBOX
      ════════════════════════════════ */}
      {modalOpen && (
        <div
          className="cert-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
          ref={modalRef}
        >
          <div className="cert-modal">
            {/* Header */}
            <div className="cert-modal-header">
              <div className="cert-modal-meta">
                <span className="cert-modal-issuer">
                  {CERTIFICATES[modalIndex].issuer}
                </span>
                <h3 className="cert-modal-title">
                  {CERTIFICATES[modalIndex].title}
                </h3>
              </div>
              <button
                className="cert-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="cert-modal-body">
              <iframe
                key={modalIndex}
                src={CERTIFICATES[modalIndex].pdf}
                title={CERTIFICATES[modalIndex].title}
                className="cert-modal-iframe"
              />
            </div>

            {/* Footer nav */}
            <div className="cert-modal-footer">
              <button
                className="cert-modal-nav"
                onClick={() => setModalIndex((i) => ((i - 1) + total) % total)}
                aria-label="Previous"
              >
                ← Prev
              </button>
              <span className="cert-modal-counter">
                {modalIndex + 1} / {total}
              </span>
              <button
                className="cert-modal-nav"
                onClick={() => setModalIndex((i) => (i + 1) % total)}
                aria-label="Next"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
