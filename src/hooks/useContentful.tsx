import { createClient } from "contentful";
import { useEffect, useState } from "react";
import type { UseContentfulResult } from "../models/models";
import resolveResponse from "contentful-resolve-response";
import { useTranslation } from "react-i18next";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

const CACHE_TTL = 5 * 60 * 1000;

type CacheEntry = {
  fetchedAt: number;
  request: Promise<unknown>;
  data?: unknown;
};

// Shared by every caller, so reopening a tab or a second mount of the same
// query reuses the response (or the request still in flight).
const cache = new Map<string, CacheEntry>();

const getFresh = (key: string) => {
  const entry = cache.get(key);
  return entry && Date.now() - entry.fetchedAt < CACHE_TTL ? entry : undefined;
};

const cachedRequest = (key: string, fetcher: () => Promise<unknown>) => {
  const fresh = getFresh(key);
  if (fresh) return fresh.request;

  const entry: CacheEntry = { fetchedAt: Date.now(), request: fetcher() };
  entry.request = entry.request.then(
    (data) => {
      entry.data = data;
      return data;
    },
    (err) => {
      if (cache.get(key) === entry) cache.delete(key);
      throw err;
    }
  );
  cache.set(key, entry);
  return entry.request;
};

export const useContentful = <T,>(
  contentType: string,
  options?: {
    id?: string;
    query?: Record<string, unknown>;
  }
): UseContentfulResult<T> & { refetch: () => void } => {
  const { i18n } = useTranslation();
  const key = JSON.stringify([
    contentType,
    options?.id,
    options?.query,
    i18n.language,
  ]);

  const [data, setData] = useState<T[]>(
    () => (getFresh(key)?.data as T[] | undefined) ?? []
  );
  const [loading, setLoading] = useState<boolean>(
    () => getFresh(key)?.data === undefined
  );
  const [error, setError] = useState<Error | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let superseded = false;

    setLoading(getFresh(key)?.data === undefined);
    setError(null);

    cachedRequest(key, () =>
      options?.id
        ? client.getEntry(options.id, { locale: i18n.language })
        : client
            .getEntries({
              content_type: contentType,
              locale: i18n.language,
              ...options?.query,
            })
            .then((res) => resolveResponse(res))
    )
      .then((res) => {
        if (superseded) return;
        setData(res as T[]);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (superseded) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      superseded = true;
    };
  }, [key, contentType, options, i18n.language, attempt]);

  const refetch = () => {
    cache.delete(key);
    setAttempt((current) => current + 1);
  };

  return { data, loading, error, refetch };
};
