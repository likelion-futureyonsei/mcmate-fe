import type {FormEvent} from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Logo} from "@/assets/images";
import {StatusBar} from "@/components/StatusBar";

import styles from "./index.module.scss";

type StartScreen = "splash" | "signup" | "loading";

export function Start() {
  const [screen, setScreen] = useState<StartScreen>("splash");
  const navigate = useNavigate();
  const pageClassName = `${styles.page} ${
    screen === "splash" ? styles.splash : screen === "signup" ? styles.signup : styles.loading
  }`;

  useEffect(() => {
    const signupTimer = window.setTimeout(() => setScreen("signup"), 3000);

    return () => window.clearTimeout(signupTimer);
  }, []);

  useEffect(() => {
    if (screen !== "loading") return undefined;

    const homeTimer = window.setTimeout(() => navigate("/home"), 5000);

    return () => window.clearTimeout(homeTimer);
  }, [navigate, screen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setScreen("loading");
  };

  return (
    <section className={pageClassName} aria-label="start page">
      <StatusBar />

      {screen === "splash" ? (
        <img
          className={styles.reference}
          src="/start-step-1.svg?v=start-20260817-4"
          alt=""
          aria-hidden="true"
        />
      ) : null}

      {screen === "signup" ? (
        <form className={styles.signupForm} aria-label="회원가입 form" onSubmit={handleSubmit}>
          <img className={styles.logo} src={Logo} alt="MCMATE" />
          <input
            className={styles.authField}
            type="email"
            placeholder="@mcmate.com"
            autoComplete="email"
            aria-label="이메일"
          />
          <input
            className={styles.authField}
            type="password"
            placeholder="대소문자, 기호 포함하여 8자 이상"
            autoComplete="current-password"
            aria-label="비밀번호"
          />
          <span className={styles.passwordHintIcon} aria-hidden="true" />
          <button className={styles.signupButton} type="submit">
            회원가입
          </button>
          <button className={styles.loginHelp} type="button">
            로그인이 안 되나요?
          </button>
          <button className={styles.privacy} type="button">
            개인정보처리방침
          </button>
          <p className={styles.copyright}>
            Concept &amp; Prototype by &#123;it works on my machine&#125;
            <br />
            for LIKELION Hackathon — SJF Track, 2026
          </p>
        </form>
      ) : null}

      {screen === "loading" ? (
        <>
          <div className={styles.progress} aria-hidden="true">
            <span />
          </div>
          <p className={styles.loadingText}>추억 불러오는 중...</p>
        </>
      ) : null}
    </section>
  );
}
