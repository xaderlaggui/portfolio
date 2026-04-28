import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/layout/Sidebar';
import ThemeToggle from './components/layout/ThemeToggle';
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

  let preloadingStarted = false;
  const preloadedImages = [];

  useEffect(() => {
    if (preloadingStarted) return;
    preloadingStarted = true;

    const preloadSequentially = async () => {
      // Small delay to prioritize initial page load
      await new Promise(resolve => setTimeout(resolve, 1000));

      for (let i = 0; i <= 138; i++) {
        await new Promise((resolve) => {
          const img = new Image();
          const padded = String(i).padStart(3, '0');
          img.src = `/profile-frames/frame-${padded}.jpg`;

          // Wait for each image to load before requesting the next
          // This prevents Vercel from blocking concurrent requests
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
          preloadedImages.push(img);
        });
      }
    };

    preloadSequentially();
  }, []);

  const toggleDark = () => {
    setIsDark(prev => !prev);
  };

  return (
    <>
      <ThemeToggle isDark={isDark} toggleDark={toggleDark} avatarRef={avatarRef} />
      <div className={styles.layout}>
        <Sidebar avatarRef={avatarRef} />
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