import {useState} from "react";
import {Glass} from "@samasante/liquid-glass";

import {ApiError, errorMessage} from "@/api";
import {IconHelpCircle, IconInfo} from "@/assets/icons";
import {AvatarYykib} from "@/assets/images";
import {useAuth} from "@/auth";
import {Logo, Screen} from "@/components";

import styles from "./index.module.scss";

/**
 * The account model requires a nickname, but the frame only asks for an email
 * and a password — so the local part of the address becomes the initial
 * nickname, editable later through `PATCH /users/{id}`.
 */
const nicknameFrom = (email: string) =>
  (email.split("@")[0] || "mcmate").slice(0, 30);

const ALREADY_REGISTERED = "이미 가입된";

export function SignUp() {
  const {signUp, logIn} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (submitting) {
      return;
    }

    if (!email.trim() || !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await signUp({
        email: email.trim().toLowerCase(),
        password,
        nickname: nicknameFrom(email.trim()),
        // The frame has no consent checkbox; the privacy notice below the form
        // is the consent surface, and the backend refuses signup without it.
        agree_data: true,
      });
    } catch (cause) {
      // One button covers both cases: a known address logs in instead.
      if (
        cause instanceof ApiError &&
        cause.status === 400 &&
        cause.message.includes(ALREADY_REGISTERED)
      ) {
        try {
          await logIn(email.trim().toLowerCase(), password);
          return;
        } catch (loginCause) {
          setError(errorMessage(loginCause));
          setSubmitting(false);
          return;
        }
      }

      setError(errorMessage(cause));
      setSubmitting(false);
    }
  };

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
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
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
          {/*
           * No loading frame here on purpose: success redirects to `/loading`,
           * which is the journey's single loading step. Showing one during the
           * request too would restart the progress bar halfway through.
           */}
          <button
            type="submit"
            className={styles.submitLabel}
            disabled={submitting}
          >
            회원가입
          </button>
        </Glass>
      </form>

      {/* the help row doubles as the form's status line */}
      <button type="button" className={styles.help}>
        <IconInfo className={styles.helpIcon} />
        <span className={styles.helpLabel} role={error ? "alert" : undefined}>
          {error ?? "로그인이 안 되나요?"}
        </span>
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
