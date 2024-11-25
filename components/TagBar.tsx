import Link from "next/link";

interface TagBarProps {
  tags: string[];
  selectedTag: string;
}

export const TagBar: React.FC<TagBarProps> = ({ tags, selectedTag }) => {
  return (
    <div className="flex overflow-x-auto mb-6 pb-2 border-b border-gray-200">
      <Link
        href="/"
        className={`px-4 py-2 rounded ${
          selectedTag === "all"
            ? "bg-teal-800  text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/?tag=${tag}`}
          className={`px-4 py-2 rounded ${
            selectedTag === tag
              ? "bg-teal-800  text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};
