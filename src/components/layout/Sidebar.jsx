import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import mobileStyles from './SidebarMobile.module.css';
import ThemeToggle from './ThemeToggle';

const cx = (name) => `${styles[name] || ''} ${mobileStyles[name] || ''}`.trim();

const IconLocation = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const IconCV = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const BrandIcon = ({ slug, alt }) => (
  <img
    src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`}
    width="13"
    height="13"
    alt={alt}
    className={styles.brandIcon}
    onError={(e) => { e.target.style.display = 'none'; }}
  />
);

export default function Sidebar({ avatarRef, isDark, toggleDark }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const savedTheme = localStorage.getItem('theme');
  const initialFrame = savedTheme === 'dark' ? '138' : '000';

  return (
    <aside className={cx('sidebar')}>
      <div className={cx('stickyContent')}>
        <div className={`${cx('profileWrapper')} ${mounted ? styles.profileMounted : ''}`}>
          <img
            ref={avatarRef}
            src={`/profile-frames/frame-${initialFrame}.jpg`}
            alt="Xader Laggui"
            className={cx('avatar')}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className={`${cx('info')} ${mounted ? cx('mounted') : ''}`}>
          <div className={cx('nameRow')}>
            <h1 className={cx('name')}>Xader Laggui</h1>
            <ThemeToggle isDark={isDark} toggleDark={toggleDark} avatarRef={avatarRef} />
          </div>
          <div className={cx('title-wrapper')}>
            <p className={cx('title')}>Full Stack Developer</p>
            <p className={cx('title')}>Agentic Coding</p>
          </div>
          <p className={cx('location')}>
            <IconLocation />
            Pasig City, Philippines
          </p>

          <div className={cx('contactLinks')}>
            <a href="mailto:laggui.xader@gmail.com" className={cx('link')}>
              <BrandIcon slug="gmail" alt="Gmail" />
              laggui.xader@gmail.com
            </a>
            <a href="tel:+639388286776" className={cx('link')}>
              <IconPhone />
              +(63) 938 8286 776
            </a>
            <a href="https://linkedin.com/in/xaderlaggui" target="_blank" rel="noopener noreferrer" className={cx('link')}>
              <BrandIcon slug="linkedin" alt="LinkedIn" />
              LinkedIn
            </a>
            <a href="https://github.com/xaderlaggui" target="_blank" rel="noopener noreferrer" className={cx('link')}>
              <BrandIcon slug="github" alt="GitHub" />
              GitHub
            </a>
            <a href="/Laggui_Xader_Resume.pdf" target="_blank" rel="noopener noreferrer" className={cx('link')}>
              <IconCV />
              Curriculum Vitae
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}