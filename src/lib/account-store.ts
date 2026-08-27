/**
 * Client-side placeholder store.
 *
 * This exists ONLY so the frontend can be exercised end-to-end before a
 * backend exists. Every function below maps 1:1 to a future API call and
 * should be replaced by real network requests (auth, credits, payments,
 * search history, identification results).
 *
 * It never fabricates data: new accounts start with zero credits, zero
 * transactions and zero searches.
 */

export type Account = {
  id: string;
  email: string;
  fullName: string;
  emailVerified: boolean;
  createdAt: string;
};

export type Transaction = {
  id: string;
  createdAt: string;
  description: string;
  amountCents: number;
  credits: number;
  status: "pending" | "paid" | "failed";
};

export type SearchStatus = "processing" | "complete" | "failed";

export type SearchRecord = {
  id: string;
  createdAt: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  status: SearchStatus;
};

export type ResultField =
  | "title"
  | "releaseYear"
  | "actors"
  | "episode"
  | "streaming"
  | "recommendations";

/** Shape the backend will return. Values stay null until the API fills them. */
export type IdentificationResult = Record<ResultField, null>;

type StoreShape = {
  account: Account | null;
  credits: number;
  transactions: Transaction[];
  searches: SearchRecord[];
};

const KEY = "frameid.store.v1";

const EMPTY: StoreShape = {
  account: null,
  credits: 0,
  transactions: [],
  searches: [],
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function readStore(): StoreShape {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<StoreShape>) };
  } catch {
    return EMPTY;
  }
}

export function writeStore(next: StoreShape) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("frameid:store"));
}

export function updateStore(fn: (current: StoreShape) => StoreShape) {
  const next = fn(readStore());
  writeStore(next);
  return next;
}

export function createId() {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2, 12);
}

export type { StoreShape };
