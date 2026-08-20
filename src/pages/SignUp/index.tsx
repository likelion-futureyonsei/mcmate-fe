import {useState} from "react";
import {Link} from "react-router-dom";
import {Glass} from "@samasante/liquid-glass";

import {IconHelpCircle, IconInfo} from "@/assets/icons";
import {AvatarYykib} from "@/assets/images";
import {Logo, Screen} from "@/components";

import styles from "./index.module.scss";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen
      label="회원가입"
      background={null}
      backdrop={AvatarYykib}
      flush
      className={styles.page}
    >
      <Logo tone="dark" className={styles.logo} />

      <form
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <Glass className={styles.field}>
          <input
            className={styles.input}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="@mcmate.com"
            aria-label="이메일"
          />
        </Glass>

        <Glass className={`${styles.field} ${styles.password}`}>
          <input
            className={styles.input}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="대소문자, 기호 포함하여 8자 이상"
            aria-label="비밀번호"
          />
          <button
            type="button"
            className={styles.hint}
            aria-label="비밀번호 규칙"
          >
            <IconHelpCircle className={styles.hintIcon} />
          </button>
        </Glass>

        <Glass className={styles.submit}>
          <Link to="/" className={styles.submitLabel}>
            회원가입
          </Link>
        </Glass>
      </form>

      <button type="button" className={styles.help}>
        <IconInfo className={styles.helpIcon} />
        <span className={styles.helpLabel}>로그인이 안 되나요?</span>
      </button>

      <button type="button" className={styles.privacy}>
        개인정보처리방침
      </button>

      <p className={styles.credits}>
        Concept &amp; Prototype by {"{it works on my machine}"}
        <br />
        for LIKELION Hackathon — SJF Track, 2026
      </p>
    </Screen>
  );
}
