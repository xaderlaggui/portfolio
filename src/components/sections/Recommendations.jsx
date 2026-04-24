import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Recommendations.module.css';

export default function Recommendations({ items = [] }) {
  const { ref, inView } = useInView();

  if (!items || items.length === 0) return null;

  return (
    <section id="recommendations" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className={styles.sectionTitle}>Recommendations</h2>
      <div className={styles.container}>
        {items.map((item, idx) => (
          <blockquote 
            key={idx} 
            className={`${styles.quote} stagger-item ${inView ? 'active' : ''}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <p className={styles.text}>"{item.text}"</p>
            <footer className={styles.author}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.role}>{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
