// src/hooks/useContentful.ts
import { useState, useEffect } from "react";
import { createClient } from "contentful";
import type { UseContentfulResult } from "../models/models";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const useContentful = <T,>(
  contentType: string,
  query: Record<string, any> = {}
): UseContentfulResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    client
      .getEntries({ content_type: contentType, ...query })
      .then((res) => {
        const mapped: T[] = res.items.map((item: any) => ({
          id: item.sys.id,
          ...item.fields,
        }));
        setData(mapped);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, [contentType, query]);

  return { data, loading, error };
};
