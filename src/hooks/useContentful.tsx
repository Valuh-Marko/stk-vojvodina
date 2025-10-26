import { createClient } from "contentful";
import { useEffect, useState } from "react";
import type { UseContentfulResult } from "../models/models";
import resolveResponse from "contentful-resolve-response";

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
        const resolved = resolveResponse(res);
        setData(resolved);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, [contentType, query]);

  return { data, loading, error };
};
