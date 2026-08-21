import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

import {listMyProducts} from "@/api";
import {useAuth} from "@/auth";
import {useAsync} from "@/hooks/useAsync";

import {ErrorScreen, LoadingScreen} from "./LoadingScreen";

/**
 * The `/loading` step of the first run. It is the one screen that knows where a
 * signed-in user belongs, so both sign-up and a returning visit land here:
 *
 *   no character  -> the customiser, to create one
 *   no products   -> the empty shelf, to register the first serial
 *   otherwise     -> the home shelf
 */
const MINIMUM_MS = 900;

export function Onboarding() {
  const {user} = useAuth();
  const products = useAsync(() => listMyProducts(), []);

  // Hold the frame briefly so the bar is seen travelling rather than flashing.
  const [held, setHeld] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeld(false), MINIMUM_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (products.error) {
    return <ErrorScreen message={products.error} />;
  }

  if (held || products.pending || !user) {
    return <LoadingScreen label="추억 불러오는 중..." />;
  }

  if (!user.character) {
    return <Navigate to="/character/body" replace />;
  }

  if (!products.data?.items.length) {
    return <Navigate to="/home-empty" replace />;
  }

  return <Navigate to="/" replace />;
}
