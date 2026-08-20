import {useRef, useState, type KeyboardEvent} from "react";

import {IconClose, IconInfo, IconQrScan} from "@/assets/icons";
import {GlassButton, Screen, TopBar} from "@/components";

import styles from "./index.module.scss";

const CODE_LENGTH = 5;

export function NumberInput() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const cells = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, raw: string) => {
    const value = raw.slice(-1).toUpperCase();

    setCode((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });

    if (value && index < CODE_LENGTH - 1) {
      cells.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      cells.current[index - 1]?.focus();
    }
  };

  return (
    <Screen label="제품 번호 입력" className={styles.page}>
      <TopBar
        className={styles.topBar}
        hideBack
        actions={
          <GlassButton label="닫기" tint="solid" to="/my-products">
            <IconClose className={styles.closeIcon} />
          </GlassButton>
        }
      />

      <h1 className={styles.title}>
        브라스 플레이트에 각인된 번호를
        <br />
        입력하여 제품을 등록하세요
      </h1>

      <div className={styles.code}>
        {code.map((value, index) => (
          <input
            key={index}
            ref={(node) => {
              cells.current[index] = node;
            }}
            className={styles.cell}
            value={value}
            inputMode="text"
            maxLength={1}
            aria-label={`번호 ${index + 1}번째 자리`}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
      </div>

      <div className={styles.scan}>
        <GlassButton label="QR코드 촬영" to="/qr-register" tint="veil">
          <IconQrScan className={styles.scanIcon} />
        </GlassButton>
        <span className={styles.scanLabel}>QR코드 촬영</span>
      </div>

      <button type="button" className={styles.help}>
        <IconInfo className={styles.helpIcon} />
        <span className={styles.helpLabel}>브라스 플레이트란?</span>
      </button>
    </Screen>
  );
}
