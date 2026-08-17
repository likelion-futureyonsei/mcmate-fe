import {useEffect, useState} from "react";

import styles from "./index.module.scss";

type StatusBarProps = {
  variant?: "dark" | "light";
};

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const StatusBar = ({variant = "dark"}: StatusBarProps) => {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className={`${styles.statusBar} ${variant === "light" ? styles.light : ""}`} aria-label="status bar">
      <time className={styles.time}>{time}</time>
      <div className={styles.icons} aria-hidden="true" />
    </header>
  );
};
