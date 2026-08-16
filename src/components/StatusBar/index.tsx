import {useEffect, useState} from "react";

import styles from "./index.module.scss";

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const StatusBar = () => {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatTime());
    }, 15000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className={styles.statusBar} aria-label="status bar">
      <time className={styles.time}>{time}</time>
      <div className={styles.icons} aria-hidden="true">
        <span className={styles.cellular}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.wifi} />
        <span className={styles.battery}>
          <i />
        </span>
      </div>
    </header>
  );
};
