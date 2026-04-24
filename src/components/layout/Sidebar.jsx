import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.stickyContent}>
        <div className={styles.profileWrapper}>
          <img
            src="/img_src/der.jpg"
            alt="Xader Laggui"
            className={styles.avatar}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className={`${styles.info} ${mounted ? styles.mounted : ''}`}>
          <h1 className={styles.name}>Xader Laggui</h1>
          <p className={styles.title}>Full Stack Developer | AI</p>
          <p className={styles.location}>Pasig City, Philippines</p>

          <div className={styles.contactLinks}>
            <a href="mailto:laggui.xader@gmail.com" className={styles.link}>
              laggui.xader@gmail.com
            </a>
            <a href="tel:+639388286776" className={styles.link}>
              +(63) 938 8286 776
            </a>
            <a href="https://linkedin.com/in/xaderlaggui" target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn
            </a>
            <a href="https://github.com/xaderlaggui" target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
