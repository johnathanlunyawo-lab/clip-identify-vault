import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  createId,
  readStore,
  updateStore,
  type Account,
  type SearchRecord,
  type StoreShape,
  type Transaction,
} from "./account-store";

/**
 * Frontend auth + account session.
 * Replace each method body with a backend call when the API lands.
 */

type AuthContextValue = {
  hydrated: boolean;
  account: Account | null;
  credits: number;
  transactions: Transaction[];
  searches: SearchRecord[];
  signUp: (input: { fullName: string; email: string; password: string }) => Promise<void>;
  signIn: (input: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateProfile: (input: { fullName: string; email: string }) => Promise<void>;
  markEmailVerified: () => void;
  createSearch: (file: { name: string; type: string; size: number }) => SearchRecord;
  completeSearch: (id: string) => void;
  getSearch: (id: string) => SearchRecord | undefined;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreShape>(() => readStore());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readStore());
    setHydrated(true);
    const sync = () => setState(readStore());
    window.addEventListener("frameid:store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("frameid:store", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const mutate = useCallback((fn: (s: StoreShape) => StoreShape) => {
    setState(updateStore(fn));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      hydrated,
      account: state.account,
      credits: state.credits,
      transactions: state.transactions,
      searches: state.searches,
      async signUp({ fullName, email }) {
        mutate((s) => ({
          ...s,
          account: {
            id: createId(),
            email,
            fullName,
            emailVerified: false,
            createdAt: new Date().toISOString(),
          },
        }));
      },
      async signIn({ email }) {
        mutate((s) => ({
          ...s,
          account: s.account?.email === email
            ? s.account
            : {
                id: createId(),
                email,
                fullName: "",
                emailVerified: false,
                createdAt: new Date().toISOString(),
              },
        }));
      },
      signOut() {
        mutate((s) => ({ ...s, account: null }));
      },
      async updateProfile({ fullName, email }) {
        mutate((s) => (s.account ? { ...s, account: { ...s.account, fullName, email } } : s));
      },
      markEmailVerified() {
        mutate((s) => (s.account ? { ...s, account: { ...s.account, emailVerified: true } } : s));
      },
      createSearch(file) {
        const record: SearchRecord = {
          id: createId(),
          createdAt: new Date().toISOString(),
          fileName: file.name,
          fileType: file.type || "unknown",
          fileSize: file.size,
          status: "processing",
        };
        mutate((s) => ({ ...s, searches: [record, ...s.searches] }));
        return record;
      },
      completeSearch(id) {
        mutate((s) => ({
          ...s,
          searches: s.searches.map((r) => (r.id === id ? { ...r, status: "complete" } : r)),
        }));
      },
      getSearch(id) {
        return state.searches.find((r) => r.id === id);
      },
    }),
    [hydrated, mutate, state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
