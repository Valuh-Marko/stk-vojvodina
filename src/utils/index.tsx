import type { TypeBlogPage } from "../models/models";

export const filterPostsByTag = (
  posts: TypeBlogPage[],
  tagId: string
): TypeBlogPage[] => {
  return posts.filter((post) =>
    post.metadata.tags?.some((tag) => tag.sys.id === tagId)
  );
};
