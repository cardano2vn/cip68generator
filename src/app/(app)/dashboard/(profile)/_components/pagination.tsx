"use client";

import React from "react";
import Image from "next/image";
import { paginationIcon } from "@/public/icons";
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  totalPages: number;
  className?: string;
};

const Pagination: React.FC<Props> = ({
  page = 1,
  totalItems,
  className,
  setPage,
  totalPages,
}) => {
  return (
    <div
      className={`flex justify-center items-center mt-6 text-white ${className}`}
    >
      <Button
        className="bg-[#030711] border-0 rounded-[12px] text-white cursor-pointer flex items-center justify-center text-xs h-[24px] font-normal px-3 py-[1px] mx-2"
        disabled={page === 1}
        onClick={() => setPage(1)}
      >
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowLeftPagination}
          alt="First Page"
        />
        <span className="mx-1">First</span>
      </Button>
      <Button
        className="bg-[#030711] border-0 rounded-[12px] text-white cursor-pointer flex items-center justify-center text-xs h-[24px] font-normal px-3 py-[1px] mx-2"
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowLeftPagination}
          alt="Previous Page"
        />
        <span className="mx-1">Previous</span>
      </Button>
      <span className="text-xs font-light leading-8 min-w-[110px] text-center">
        {page} - {totalPages} of {totalItems} Orders
      </span>
      <Button
        className="bg-[#030711] border-0 rounded-[12px] text-white cursor-pointer flex items-center justify-center text-xs h-[24px] font-normal px-3 py-[1px] mx-2"
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      >
        <span className="mx-1">Next</span>
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowRightPagination}
          alt="Next Page"
        />
      </Button>
      <Button
        className="bg-[#030711] border-0 rounded-[12px] text-white cursor-pointer flex items-center justify-center text-xs h-[24px] font-normal px-3 py-[1px] mx-2"
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
      >
        <span className="mx-1">Last</span>
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowRightPagination}
          alt="Last Page"
        />
      </Button>
    </div>
  );
};

export default Pagination;
