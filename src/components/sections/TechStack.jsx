import React from 'react';
import { useInView } from '../../hooks/useInView';

const getIconSlug = (name) => {
  const map = {
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'PHP': 'php',
    'Python': 'python',
    'HTML': 'html5',
    'CSS': 'css3',
    'C# (.NET)': 'dotnet',
    'React': 'react',
    'React Native': 'react',
    'Node.js': 'nodedotjs',
    'Tailwind CSS': 'tailwindcss',
    'Bootstrap': 'bootstrap',
    'Axios': 'axios',
    'Laravel': 'laravel',
    'Next.js': 'nextdotjs',
    'Java EE': 'eclipseide',
    'MySQL': 'mysql',
    'PostgreSQL': 'postgresql',
    'MariaDB': 'mariadb',
    'Git': 'git',
    'GitHub': 'github',
    'Figma': 'figma',
    'NPM': 'npm',
    'AWS': 'amazonaws'
  };
  return map[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export default function TechStack() {
  const { ref, inView } = useInView();

  const categories = [
    {
      title: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'HTML', 'CSS', 'C# (.NET)']
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['React', 'React Native', 'Node.js', 'Tailwind CSS', 'Bootstrap', 'Axios', 'Laravel', 'Next.js', 'Java EE']
    },
    {
      title: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'MariaDB']
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'GitHub', 'Figma', 'NPM', 'AWS']
    }
  ];

  return (
    <section id="skills" ref={ref} className={`reveal ${inView ? 'active' : ''}`}>
      <h2 className="sectionTitle">Skills & Expertise</h2>
      
      <div className="container">
        {categories.map((category, idx) => (
          <div 
            key={category.title} 
            className={`category stagger-item ${inView ? 'active' : ''}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <h3>{category.title}</h3>
            <ul className="list">
              {category.skills.map((skill) => (
                <li key={skill} className="pill">
                  <img 
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${getIconSlug(skill)}.svg`} 
                    width="18" 
                    height="18" 
                    alt={skill} 
                    className="icon"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
