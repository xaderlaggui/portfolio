import React from 'react';
import { useInView } from '../../hooks/useInView';

export default function Gallery({ images = [] }) {
  const { ref, inView } = useInView();

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className="sectionTitle">Gallery</h2>
      <div className="masonry">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`item stagger-item ${inView ? 'active' : ''}`}
            style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
          >
            <img src={img.src} alt={img.alt || 'Gallery image'} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
