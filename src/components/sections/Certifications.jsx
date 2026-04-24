import React from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './Certifications.module.css';

export default function Certifications() {
  const { ref, inView } = useInView();

  return (
    <section id="certifications" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className="sectionTitle">Certifications & Workshops</h2>
      
      <div className={styles.container}>
        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '0ms' }}>
          <h4>PhilDev Foundation</h4>
          <p>"Alibaba Masterclass, Design Thinking, Leadership and Communication, Project Management, Cybersecurity and Fraud Management, Strategic Foresight and Intro to Technopreneurship"</p>
        </div>
        
        <div className={`${styles.item} stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}>
          <h4>Amazon Web Services (AWS)</h4>
          <p>"Getting Started with Compute, Databases, Networking, Serverless, Storage, Introduction to Generative AI, Machine Learning Foundations"</p>
        </div>
      </div>
    </section>
  );
}
