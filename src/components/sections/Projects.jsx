import React from 'react';
import { useInView } from '../../hooks/useInView';

export default function Projects() {
  const { ref, inView } = useInView();

  const projects = [
    {
      title: 'CGG Loaning System',
      stack: 'Laravel • Next.js • Laragon • MySQL • Tailwind CSS',
      desc: 'Developed a loaning system for Comfac Global Group using Laravel and Next.js to streamline loan applications for both members and non-members. The platform features a structured workflow for submitting, reviewing, and approving requests, combined with a responsive and user-friendly interface. It ensures secure data handling, real-time updates, and scalable performance while addressing practical business needs.'
    },
    {
      title: 'SmartVision',
      stack: 'TypeScript • Python • React Native • PostgreSQL',
      desc: 'Developed SmartVision, a mobile application designed to assist visually impaired students by interpreting Braille characters using machine learning. Built with React Native for cross-platform accessibility, the app integrates a Python-based ML model for accurate recognition and PostgreSQL for secure storage of user data and activity logs..'
    },
    {
      title: 'QuickReserve',
      stack: 'JavaScript • TypeScript • React • MySQL • Tailwind CSS',
      desc: 'Developed QuickReserve, a pet hospital appointment and scheduling system with full CRUD functionality. Built using modern JavaScript and TypeScript practices, the platform provides a reliable and maintainable solution with a clean, responsive interface, improving both operational efficiency and user experience.'
    },
    {
      title: 'Barangay Bambang Information System',
      stack: 'HTML • CSS • PHP • Bootstrap • MySQL',
      desc: 'Developed a Lost and Found module for the Barangay Bambang Information System, featuring full CRUD functionality and a responsive interface for efficient item tracking and data management.'
    }
  ];

  return (
    <section id="projects" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className="sectionTitle">Featured Projects</h2>

      <div className="grid">
        {projects.map((project, idx) => (
          <div
            key={project.title}
            className={`item stagger-item ${inView ? 'active' : ''}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <h3>{project.title}</h3>
            <p className="stack">{project.stack}</p>
            <p className="desc">{project.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
