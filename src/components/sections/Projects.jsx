import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Projects.module.css';

export default function Projects() {
  const { ref, inView } = useInView();

  const projects = [
    {
      title: 'CGG Loaning System',
      stack: 'Laravel • Next.js • Laragon • MySQL • Tailwind CSS',
      desc: 'A loaning system for Comfac Global Group where the members and non-members of the company can use.'
    },
    {
      title: 'SmartVision',
      stack: 'TypeScript • Python • React Native • PostgreSQL',
      desc: 'Braille interpretation mobile app for visually impaired students using machine learning to interpret Braille characters. Integrated PostgreSQL for secure storage of user data and activity logs.'
    },
    {
      title: 'QuickReserve',
      stack: 'JavaScript • TypeScript • React • MySQL • Tailwind CSS',
      desc: 'Pet hospital appointment and scheduling system with full CRUD functionality. Built using modern JavaScript practices to enhance code reliability, maintainability, and user experience.'
    },
    {
      title: 'Barangay Bambang Information System',
      stack: 'HTML • CSS • PHP • Bootstrap • MySQL',
      desc: 'Lost and Found module for barangay information system with full CRUD functionality and responsive interface for efficient item management and data access.'
    }
  ];

  return (
    <section id="projects" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className={styles.sectionTitle}>Featured Projects</h2>
      
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <div 
            key={project.title} 
            className={`${styles.item} stagger-item ${inView ? 'active' : ''}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <h3>{project.title}</h3>
            <p className={styles.stack}>{project.stack}</p>
            <p className={styles.desc}>{project.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
