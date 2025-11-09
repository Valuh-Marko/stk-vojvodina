import { createClient } from "contentful";
import resolveResponse from "contentful-resolve-response";
import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

interface ContentfulContextType {
  getData: <T>(
    contentType: string,
    query?: Record<string, any>
  ) => Promise<T[]>;
  loading: boolean;
  error: Error | null;
}

export const ContentfulContext = createContext<
  ContentfulContextType | undefined
>(undefined);

export const ContentfulProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getData = async <T,>(
    contentType: string,
    query: Record<string, any> = {}
  ): Promise<T[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.getEntries({
        content_type: contentType,
        locale: i18n.language,
        ...query,
      });
      const resolved = resolveResponse(res);
      setLoading(false);
      return resolved;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return [];
    }
  };

  return (
    <ContentfulContext.Provider value={{ getData, loading, error }}>
      {children}
    </ContentfulContext.Provider>
  );
};
