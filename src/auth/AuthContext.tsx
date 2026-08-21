import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  SESSION_EXPIRED_EVENT,
  getAccessToken,
  getMe,
  getStoredUserId,
  logIn as logInRequest,
  logOut as logOutRequest,
  setStoredUserId,
  signUp as signUpRequest,
  type SignUpPayload,
  type UserSelf,
} from "@/api";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthValue = {
  status: AuthStatus;
  user: UserSelf | null;
  logIn: (email: string, password: string) => Promise<void>;
  /** Creates the account and signs straight in with the same credentials. */
  signUp: (payload: SignUpPayload) => Promise<void>;
  logOut: () => Promise<void>;
  /** Re-reads `GET /users/{id}`, e.g. after the character changes. */
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [status, setStatus] = useState<AuthStatus>(() =>
    getAccessToken() && getStoredUserId() !== null ? "loading" : "anonymous",
  );
  const [user, setUser] = useState<UserSelf | null>(null);

  const load = useCallback(async () => {
    const userId = getStoredUserId();

    if (!getAccessToken() || userId === null) {
      setUser(null);
      setStatus("anonymous");
      return;
    }

    const profile = await getMe(userId);
    setUser(profile);
    setStatus("authenticated");
  }, []);

  // Restore the session on start: the tokens survive a reload, the profile does not.
  useEffect(() => {
    let cancelled = false;

    void load().catch(() => {
      if (!cancelled) {
        setUser(null);
        setStatus("anonymous");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [load]);

  // The client clears the tokens when a refresh is rejected; follow it here.
  useEffect(() => {
    const onExpired = () => {
      setUser(null);
      setStatus("anonymous");
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);

    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, []);

  const logIn = useCallback(
    async (email: string, password: string) => {
      const session = await logInRequest(email, password);
      setStoredUserId(session.user_id);
      await load();
    },
    [load],
  );

  const signUp = useCallback(
    async (payload: SignUpPayload) => {
      // `POST /users` returns the profile but no tokens, so log in afterwards.
      await signUpRequest(payload);
      await logIn(payload.email, payload.password);
    },
    [logIn],
  );

  const logOut = useCallback(async () => {
    await logOutRequest();
    setUser(null);
    setStatus("anonymous");
  }, []);

  const refresh = useCallback(async () => {
    try {
      await load();
    } catch {
      /* keep the current profile; the next navigation will surface the error */
    }
  }, [load]);

  const value = useMemo<AuthValue>(
    () => ({status, user, logIn, signUp, logOut, refresh}),
    [status, user, logIn, signUp, logOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthValue => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth 는 AuthProvider 안에서만 사용할 수 있습니다.");
  }

  return value;
};

/** The signed-in user's id, or null while loading / signed out. */
export const useUserId = (): number | null => useAuth().user?.id ?? null;
