import {useProgress} from "@/hooks/useProgress";

import {Loading} from "./index";

type LoadingScreenProps = {
  /** `false` once the data has arrived, so the bar can run to the end. */
  pending?: boolean;
  label?: string;
};

/**
 * The `/loading` frame, driven by a live request instead of a fixed value. Every
 * screen that waits on the API renders this, so loading looks the same
 * everywhere and the bar keeps moving while the call is open.
 */
export const LoadingScreen = ({
  pending = true,
  label = "추억 불러오는 중...",
}: LoadingScreenProps) => (
  <Loading progress={useProgress(pending)} label={label} />
);

/**
 * Failures reuse the same frame with the bar run out and the backend's message
 * in place of the caption, so no screen needs its own error treatment.
 */
export const ErrorScreen = ({message}: {message: string}) => (
  <Loading progress={1} label={message} />
);
