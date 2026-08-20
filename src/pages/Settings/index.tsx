import {Link} from "react-router-dom";

import {IconChevronRight, IconClose} from "@/assets/icons";
import {Avatar, GlassButton, Screen} from "@/components";

import styles from "./index.module.scss";

const account = {name: "_yykib", hint: "계정 정보"};

const groups = [
  {
    heading: "나의 쇼핑 정보",
    rows: ["주문/예약 내역", "취소/교환/반품 내역", "최근 본 상품"],
  },
  {
    heading: "더 많은 정보 및 지원",
    rows: ["내 활동", "서비스 설정", "고객 지원", "개인 맞춤형 추천"],
  },
];

export function Settings() {
  return (
    <Screen label="설정" bleed flush className={styles.page}>
      <div className={styles.sheet}>
        <div className={styles.header}>
          <h1 className={`${styles.title} typo-h1`}>설정</h1>

          <GlassButton
            label="닫기"
            tint="solid"
            to="/"
            className={styles.close}
          >
            <IconClose className={styles.closeIcon} />
          </GlassButton>
        </div>

        <Link to="/character/body" className={styles.account}>
          <Avatar />
          <span className={styles.accountText}>
            <span className={styles.accountName}>{account.name}</span>
            <span className={styles.accountHint}>{account.hint}</span>
          </span>
          <IconChevronRight
            className={`${styles.chevron} ${styles.accountChevron}`}
          />
        </Link>

        {groups.map((group) => (
          <section className={styles.group} key={group.heading}>
            <h2 className={styles.groupHeading}>{group.heading}</h2>

            {group.rows.map((row) => (
              <button type="button" className={styles.row} key={row}>
                {row}
                <IconChevronRight
                  className={`${styles.chevron} ${styles.rowChevron}`}
                />
              </button>
            ))}
          </section>
        ))}
      </div>
    </Screen>
  );
}
