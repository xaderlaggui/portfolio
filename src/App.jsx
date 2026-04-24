import React, { useState, useEffect } from 'react';
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

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply class to body
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <ThemeToggle isDark={isDark} toggleDark={toggleDark} />
      <div className={styles.layout}>
        <Sidebar />
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
