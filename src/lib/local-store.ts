import { useSyncExternalStore } from "react";

export interface LocalStore<T> {
  get: () => T;
  set: (value: T) => void;
  subscribe: (listener: () => void) => () => void;
  /** What server rendering and the first client render see, so markup matches until hydration. */
  getServerSnapshot: () => T;
}

/**
 * A value kept in localStorage that every component on the page can subscribe to.
 * Reads and writes never throw: private windows or blocked storage just fall back to memory.
 */
export function createLocalStore<T>(key: string, fallback: T): LocalStore<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  const get = (): T => {
    if (cache !== undefined) return cache;
    try {
      const raw = localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      cache = fallback;
    }
    return cache;
  };

  const set = (value: T) => {
    cache = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { get, set, subscribe, getServerSnapshot: () => fallback };
}

/**
 * Subscribes a component to a store. Kept at module level on purpose: a hook defined inside
 * createLocalStore gets its closure hoisted away by the React compiler ("fallback is not defined").
 */
export function useStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServerSnapshot);
}

/** Same interface as createLocalStore but kept in memory only, for state that must reset on reload. */
export function createMemoryStore<T>(initial: T): LocalStore<T> {
  let value = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set: (v) => {
      value = v;
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getServerSnapshot: () => initial,
  };
}
