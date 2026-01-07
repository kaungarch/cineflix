import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Props {
  currentPage: number;
  total_pages: number;
  url: string;
}

const PaginationTemplate = ({ currentPage, total_pages, url }: Props) => {
  const isPrevious = currentPage > 1;
  const isNext = total_pages - currentPage > 0;

  return (
    <Pagination>
      <PaginationContent>
        {/* previous */}
        {isPrevious ? (
          <PaginationItem>
            <PaginationPrevious href={`${url}&page=${currentPage - 1}`} />
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationLink isActive>
            {currentPage}/{total_pages}
          </PaginationLink>
        </PaginationItem>

        {/* next */}
        {isNext ? (
          <PaginationItem>
            <PaginationNext href={`${url}page=${currentPage + 1}`} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTemplate;
