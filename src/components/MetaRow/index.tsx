import {Fragment, type ReactNode} from "react";

import styles from "./index.module.scss";

export type MetaItem = {label: string; icon: ReactNode; value: ReactNode};

type MetaRowProps = {items: MetaItem[]; className?: string};

/**
 * Centred caption strip of labelled facts (order / place / date), split by
 * hairline dividers.
 */
export const MetaRow = ({items, className}: MetaRowProps) => (
  <dl className={`${styles.row} ${className ?? ""}`}>
    {items.map((item, index) => (
      <Fragment key={item.label}>
        {index > 0 ? (
          <span className={styles.divider} aria-hidden="true" />
        ) : null}
        <div className={styles.cell}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>
            {item.icon}
            {item.value}
          </dd>
        </div>
      </Fragment>
    ))}
  </dl>
);
