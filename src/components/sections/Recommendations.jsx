import React from 'react';
import { useInView } from '../../hooks/useInView';

export default function Recommendations({ items = [] }) {
  const { ref, inView } = useInView();

  if (!items || items.length === 0) return null;

  return (
    <section id="recommendations" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className="sectionTitle">Recommendations</h2>
      <div className="container">
        {items.map((item, idx) => (
          <blockquote 
            key={idx} 
            className={`quote stagger-item ${inView ? 'active' : ''}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <p className="text">"{item.text}"</p>
            <footer className="author">
              <span className="name">{item.name}</span>
              <span className="role">{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
