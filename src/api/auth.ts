import {request} from "./client";
import {
  clearTokens,
  getRefreshToken,
  setStoredUserId,
  setTokens,
} from "./tokens";
import type {LoginResponse, SignUpPayload, UserPublic, UserSelf} from "./types";

/** `POST /users` — creates the account. It does not return tokens. */
export const signUp = (payload: SignUpPayload) =>
  request<UserSelf>("/users", {
    method: "POST",
    auth: false,
    body: {agree_marketing: false, ...payload},
  });

/** `POST /tokens` — exchanges credentials for the token pair and stores it. */
export const logIn = async (email: string, password: string) => {
  const session = await request<LoginResponse>("/tokens", {
    method: "POST",
    auth: false,
    body: {email, password},
  });

  setTokens({
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
  });
  setStoredUserId(session.user_id);

  return session;
};

/**
 * `DELETE /tokens` — blacklists the refresh token. The local session is dropped
 * either way, so a rejected call still logs the user out of this device.
 */
export const logOut = async () => {
  const refreshToken = getRefreshToken();

  try {
    if (refreshToken) {
      await request<void>("/tokens", {
        method: "DELETE",
        body: {refresh_token: refreshToken},
      });
    }
  } catch {
    /* already expired or blacklisted — nothing left to revoke */
  } finally {
    clearTokens();
  }
};

export const getMe = (userId: number) =>
  request<UserSelf>(`/users/${userId}`, {method: "GET"});

export const getUser = (userId: number) =>
  request<UserPublic>(`/users/${userId}`, {method: "GET"});

export type ProfilePatch = Partial<
  Pick<
    UserSelf,
    | "nickname"
    | "birth"
    | "phone"
    | "agree_marketing"
    | "notify_memory"
    | "notify_place"
    | "notify_ad"
  >
>;

export const updateProfile = (userId: number, patch: ProfilePatch) =>
  request<UserSelf>(`/users/${userId}`, {method: "PATCH", body: patch});
