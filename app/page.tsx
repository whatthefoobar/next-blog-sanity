import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { Pagination } from "@/components/Pagination";
import { BlogPostCard } from "@/components/BlogPostCard";
import { TagBar } from "@/components/TagBar";

// Configure image URL builder
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const TAGS_QUERY = `*[_type == "post" && defined(tags)]{tags}`;

const POSTS_QUERY = (start: number, end: number, selectedTag: string) => `
  *[
    _type == "post" && defined(slug.current)
    ${selectedTag !== "all" ? `&& "${selectedTag}" in tags` : ""}
  ]|order(publishedAt desc)[${start}...${end}]{
    _id, title, slug, publishedAt, image, body, tags
  }
`;
// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//   imageUrlBuilder({ projectId, dataset }).image(source);

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string };
}) {
  const postsPerPage = 4;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const selectedTag = searchParams.tag || "all";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  const posts = await client.fetch<SanityDocument[]>(
    POSTS_QUERY(start, end, selectedTag)
  );
  const totalPosts = await client.fetch<number>(
    `count(*[
      _type == "post" && defined(slug.current)
      ${selectedTag !== "all" ? `&& "${selectedTag}" in tags` : ""}
    ])`
  );
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const tagsData = await client.fetch<{ tags: string[] }[]>(TAGS_QUERY);
  const tags = Array.from(new Set(tagsData.flatMap((item) => item.tags)));

  return (
    <main className="container mx-auto min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Posts</h1>

      {/* Tags Bar */}
      <TagBar tags={tags} selectedTag={selectedTag} />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <BlogPostCard
            key={post._id}
            post={post}
            urlFor={(source) => urlFor(source)?.url() || null}
          />
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        tag={selectedTag}
      />
    </main>
  );
}
