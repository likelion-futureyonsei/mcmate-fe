import {useRef, useState, type KeyboardEvent} from "react";
import {useNavigate} from "react-router-dom";

import {errorMessage, registerProduct} from "@/api";
import {IconClose, IconInfo, IconQrScan} from "@/assets/icons";
import {useAuth} from "@/auth";
import {GlassButton, Screen, TopBar} from "@/components";
import {useAsync} from "@/hooks/useAsync";
import {resolveCatalogue} from "@/lib";
import {LoadingScreen} from "@/pages/Loading/LoadingScreen";

import styles from "./index.module.scss";

const CODE_LENGTH = 5;

export function NumberInput() {
  const navigate = useNavigate();
  const {user} = useAuth();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const cells = useRef<(HTMLInputElement | null)[]>([]);

  /** Same catalogue resolution as the QR frame; the plate only carries a serial. */
  const catalogue = useAsync(
    () => resolveCatalogue(user?.character?.id ?? null),
    [user?.character?.id],
  );

  const submit = async (serialNo: string) => {
    const product = catalogue.data?.[0];

    if (!product) {
      setStatus("등록할 제품을 확인할 수 없습니다.");
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      await registerProduct(product.id, serialNo);
      navigate("/", {replace: true});
    } catch (cause) {
      setStatus(errorMessage(cause));
      setSaving(false);
    }
  };

  const handleChange = (index: number, raw: string) => {
    const value = raw.slice(-1).toUpperCase();
    const next = [...code];
    next[index] = value;

    setCode(next);

    // The plate number is the serial, and the frame has no submit control, so
    // registration fires as soon as the last cell is filled.
    if (next.every(Boolean)) {
      void submit(next.join(""));
      return;
    }

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

  if (saving) {
    return <LoadingScreen label="제품 등록 중..." />;
  }

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

      {/* the help row doubles as the frame's status line */}
      <button type="button" className={styles.help}>
        <IconInfo className={styles.helpIcon} />
        <span className={styles.helpLabel} role={status ? "alert" : undefined}>
          {status ?? "브라스 플레이트란?"}
        </span>
      </button>
    </Screen>
  );
}
