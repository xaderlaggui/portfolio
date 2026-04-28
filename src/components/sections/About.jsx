import React from 'react';
import { useInView } from '../../hooks/useInView';

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className="sectionTitle">About</h2>

      <div className="content">
        <div className={`item stagger-item ${inView ? 'active' : ''}`} style={{ transitionDelay: '0ms' }}>
          <p>Hi, I'm Xader Laggui, an aspiring developer with a strong foundation in AI and prompt engineering. I am currently pursuing a Bachelor of Science in Information Technology at Pamantasan ng Lungsod ng Pasig, where I have consistently earned recognition as a Dean's List and President's List awardee, reflecting my commitment to academic excellence.</p>
          <p>I am passionate about web and mobile development, with hands-on experience in React, React Native, TypeScript, and modern development practices. I focus on building accessible, user-centered applications that solve real-world problems.</p>
          <p>One of my most notable works is SmartVision, our capstone project—a system designed to help visually impaired individuals communicate effectively in a classroom environment. This project highlights my interest in developing technology with meaningful social impact.</p>
          <p>I am particularly interested in achieving efficient and high-quality development through the use of AI and prompting techniques. However, I prioritize building a strong understanding of systems and concepts before integrating AI, ensuring that the solutions I create are both reliable and well-structured.</p>
          <p>In addition, I am a continuous learner who has completed certifications in AWS, cybersecurity, design thinking, and technopreneurship, and I consistently seek to expand my knowledge and adapt to evolving technologies.</p>
        </div>
      </div>
    </section>
  );
}
