import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './About.module.css';

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className={styles.sectionTitle}>About Me</h2>
      
      <div className={styles.content}>
        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '0ms' }}>
          <h3>Academic Excellence</h3>
          <p>Currently pursuing a Bachelor of Science in Information Technology at Pamantasan ng Lungsod ng Pasig. Dean's List and President's List awardee, demonstrating consistent academic achievement.</p>
        </div>
        
        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}>
          <h3>Technical Passion</h3>
          <p>Passionate about web and mobile development with hands-on experience in React, React Native, TypeScript, and modern development practices. Focused on creating accessible and user-friendly applications.</p>
        </div>
        
        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h3>Continuous Learner</h3>
          <p>Completed comprehensive certifications in AWS, cybersecurity, design thinking, and technopreneurship. Always eager to learn new technologies and best practices.</p>
        </div>
      </div>
    </section>
  );
}
