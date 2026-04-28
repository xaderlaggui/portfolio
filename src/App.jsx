import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Recommendations from './components/sections/Recommendations';
import Gallery from './components/sections/Gallery';
import styles from './App.module.css';

// Global Section Styles
import './components/sections/SectionGlobal.css';
import './components/sections/SectionGlobalMobile.css';

function App() {
  const avatarRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const preloadedImages = [];

  useEffect(() => {
    if (preloadedImages.length === 0) {
      for (let i = 0; i <= 138; i++) {
        const img = new Image();
        const padded = String(i).padStart(3, '0');
        img.src = `/profile-frames/frame-${padded}.jpg`;
        preloadedImages.push(img);
      }
    }
  }, []);

  const toggleDark = () => {
    setIsDark(prev => !prev);
  };

  return (
    <>
      <div className={styles.layout}>
        <Sidebar avatarRef={avatarRef} isDark={isDark} toggleDark={toggleDark} />
        <div className={styles.mainContent}>
          <main>
            <About />
            <Experience />
            <Projects />
            <TechStack />
            <Certifications />
            <Recommendations items={[]} />
            <Gallery images={[]} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;