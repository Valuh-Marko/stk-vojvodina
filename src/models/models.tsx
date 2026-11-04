import type { Asset, Entry } from "contentful";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Category = "topNews" | "scoreboard" | "events";
export type TeamNavigationConfig = "seniors" | "coaching-staff" | "delegation";

export type RichTextContent = {
  nodeType: string;
  value?: string;
  marks?: any[];
  data: any;
  content: RichTextContent[];
};

export type RichTextDocument = {
  nodeType: "document";
  data: any;
  content: RichTextContent[];
};

export interface TypeSeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Asset;
  indexable?: boolean;
}

export interface TypeSeoSkeleton {
  fields: TypeSeoFields;
  contentTypeId: "seo";
}

export interface TypeBlogPageFields {
  title?: string;
  slug: string;
  body?: RichTextDocument;
  image?: Asset;
  excerpt?: string;
  recommendedPosts?: TypeBlogPage[];
  seo?: Entry<TypeSeoSkeleton>;
}

export interface TypeBlogPageSkeleton {
  fields: TypeBlogPageFields;
  contentTypeId: "blogPage";
}

export type TypeBlogPage = Entry<TypeBlogPageSkeleton>;

export type UseContentfulResult<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};

export type PlayerFields = {
  playerName: string;
  age: string;
  image?: Asset;
  playerAtributes?: RichTextDocument;
};

export type PlayerSkeleton = {
  fields: PlayerFields;
  contentTypeId: "player";
};

export type PlayerEntry = Entry<PlayerSkeleton>;

export type ScoreboardFields = {
  title?: string;
  scoreboard: {
    rows: (number | string)[][];
    timestamp: string;
  };
};

export type ScoreboardSkeleton = {
  fields: ScoreboardFields;
  contentTypeId: "scoreboard";
};

export type ScoreboardEntry = Entry<ScoreboardSkeleton>;

export type CoachFields = {
  name: string;
  role: string;
  age: string;
};

export type CoachSkeleton = {
  fields: CoachFields;
  contentTypeId: "coach";
};

export type CoachEntry = Entry<CoachSkeleton>;

export type MatchGame = {
  player1: string;
  player2: string;
  gameScores?: string;
  matchScore: string;
};

export type MatchRow = {
  round: string;
  date: string;
  team1: string;
  team2: string;
  score?: string;
  details?: MatchGame[];
};

export type MatchesFields = {
  title?: string;
  scoreboard?: {
    rows: MatchRow[];
    timestamp: string;
  };
};

export type MatchesSkeleton = {
  fields: MatchesFields;
  contentTypeId: "matches";
};

export type MatchesEntry = Entry<MatchesSkeleton>;
