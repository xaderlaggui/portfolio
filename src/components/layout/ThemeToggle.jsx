import React, { useRef } from 'react';
import styles from './ThemeToggle.module.css';

const TOTAL_FRAMES = 138;
const FRAME_DURATION = 11; // ~1.5s for 138 frames

export default function ThemeToggle({ isDark, toggleDark, avatarRef }) {
  const frameRef = useRef(isDark ? 138 : 0);
  const timerRef = useRef(null);

  const animateFrames = (towardDark) => {
    clearInterval(timerRef.current);
    const target = towardDark ? TOTAL_FRAMES : 0;
    const step = towardDark ? 1 : -1;

    timerRef.current = setInterval(() => {
      frameRef.current += step;
      if (avatarRef?.current) {
        const padded = String(frameRef.current).padStart(3, '0');
        avatarRef.current.src = `/profile-frames/frame-${padded}.jpg`;
      }
      if (frameRef.current === target) clearInterval(timerRef.current);
    }, FRAME_DURATION);
  };

  const handleToggle = () => {
    toggleDark();
    animateFrames(!isDark);
  };

  return (
    <button
      className={`${styles.pill} ${isDark ? styles.pillDark : styles.pillLight}`}
      onClick={handleToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Knob slides: left = dark (sun), right = light (moon) */}
      <span className={`${styles.knob} ${isDark ? styles.knobLeft : styles.knobRight}`}>
        {isDark ? (
          /* Sun icon — shown in dark mode */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
               strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2"  x2="12" y2="5"  />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"  />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="2"  y1="12" x2="5"  y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          /* Moon icon — shown in light mode */
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}