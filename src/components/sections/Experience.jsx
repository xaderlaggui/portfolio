import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Experience.module.css';

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section id="education" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className={styles.sectionTitle}>Education</h2>
      
      <div className={styles.timeline}>
        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '0ms' }}>
          <h3>Pamantasan ng Lungsod ng Pasig</h3>
          <p className={styles.period}>Bachelor of Science in Information Technology | 2023 - 2026</p>
          <p className={styles.description}>Coursework: Data Structures & Algorithms, Object-Oriented Programming, Integrative Programming, Database Systems, Discrete Mathematics, Security & Assurance, Software Engineering, System Integration and Architecture</p>
          <ul className={styles.list}>
            <li>Dean's List Academic Achievement Awardee</li>
            <li>President's List Academic Achievement Awardee</li>
          </ul>
        </div>

        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}>
          <h3>Pateros Technological College</h3>
          <p className={styles.period}>Bachelor of Science in Information Technology | 2022 - 2023</p>
        </div>
      </div>
    </section>
  );
}
