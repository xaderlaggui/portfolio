import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import mobileStyles from './SidebarMobile.module.css';
import ThemeToggle from './ThemeToggle';

const cx = (name) => `${styles[name] || ''} ${mobileStyles[name] || ''}`.trim();

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
          <p className={cx('title')}>Full Stack Developer</p>
          <p className={cx('title')}>Agentic Coding</p>
          <p className={cx('location')}>Pasig City, Philippines</p>

          <div className={cx('contactLinks')}>
            <a href="mailto:laggui.xader@gmail.com" className={cx('link')}>
              laggui.xader@gmail.com
            </a>
            <a href="tel:+639388286776" className={cx('link')}>
              +(63) 938 8286 776
            </a>
            <a href="https://linkedin.com/in/xaderlaggui" target="_blank" rel="noopener noreferrer" className={cx('link')}>
              LinkedIn
            </a>
            <a href="https://github.com/xaderlaggui" target="_blank" rel="noopener noreferrer" className={cx('link')}>
              GitHub
            </a>
            <a href="/Laggui_Xader_Resume.pdf" target="_blank" rel="noopener noreferrer" className={cx('link')}>
              Curriculum Vitae
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}