import {Navigate, Outlet, useLocation} from "react-router-dom";

import {LoadingScreen} from "@/pages/Loading/LoadingScreen";

import {useAuth} from "./AuthContext";

/**
 * Gate for everything except the sign-up frame. Every API route but
 * `POST /users`, `POST /tokens` and `POST /tokens/refresh` requires a bearer
 * token, so an anonymous visitor is sent to the sign-up screen rather than
 * shown a wall of 401s.
 */
export const RequireAuth = () => {
  const {status} = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <LoadingScreen label="로그인 정보 확인 중..." />;
  }

  if (status === "anonymous") {
    return <Navigate to="/signup" replace state={{from: location.pathname}} />;
  }

  return <Outlet />;
};

/**
 * Sends a signed-in visitor to the loading step, which works out whether they
 * still need a character or a first product before reaching the shelf.
 */
export const RedirectIfAuthenticated = () => {
  const {status} = useAuth();

  if (status === "loading") {
    return <LoadingScreen label="로그인 정보 확인 중..." />;
  }

  return status === "authenticated" ? (
    <Navigate to="/loading" replace />
  ) : (
    <Outlet />
  );
};

/**
 * Creating a character is the second step of the first run, and the home shelf,
 * the storybooks and the recommendation-backed registration flow all read from
 * it. Screens behind this gate therefore assume `user.character` exists.
 *
 * The customiser, the loading step and settings sit outside it, so the user has
 * somewhere to go.
 */
export const RequireCharacter = () => {
  const {user} = useAuth();

  return user?.character ? (
    <Outlet />
  ) : (
    <Navigate to="/character/body" replace />
  );
};
