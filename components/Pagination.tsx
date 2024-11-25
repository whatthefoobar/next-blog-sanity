import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  tag: string; // Add this prop to handle the tag
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  tag,
}) => {
  const getPageLink = (page: number) =>
    tag === "all" ? `?page=${page}` : `?page=${page}&tag=${tag}`;

  return (
    <nav className="flex justify-center mt-8 space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={getPageLink(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Link
            key={page}
            href={getPageLink(page)}
            className={`px-4 py-2 ${
              currentPage === page
                ? "bg-teal-800  text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={getPageLink(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </Link>
      )}
    </nav>
  );
};
