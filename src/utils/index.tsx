import type { BlogPage } from "../models/models";

export const filterPostsByTag = (posts: BlogPage[], tagId: string) => {
  return posts.filter((post) => post.tags?.some((tag) => tag.id === tagId));
};

export const camelCaseToTitle = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};
