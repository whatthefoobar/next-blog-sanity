import Link from "next/link";
import Image from "next/image";
import type { SanityDocument } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface BlogPostCardProps {
  post: SanityDocument;
  urlFor: (source: SanityImageSource) => string | null; // Function to generate image URLs
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, urlFor }) => {
  const postImageUrl = post.image ? urlFor(post.image) : null;
  return (
    <li
      key={post._id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <Link href={`/${post.slug.current}`} className="block">
        {/* Image */}
        {postImageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={postImageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        )}
        {/* Card Content */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-sm line-clamp-3">
            {post.body[0]?.children[0]?.text || ""}
          </p>
        </div>
      </Link>
    </li>
  );
};
