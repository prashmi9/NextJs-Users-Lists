"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { CustomerList, Customer } from "./customerListData";
import { useState } from "react";

export default function Pagination({
  pageData,
  //   items,
  //   pageSize,
  //   currentPage,
  onPageChange,
}: {
  pageData: CustomerList | undefined;
  //   items: number | 0;
  //   pageSize: number;
  //   currentPage: number;
  onPageChange: any;
}) {
  const [currentPage, setcurrentPage] = useState(1);
  const items = pageData?.info.results || 0;
  const pageSize = pageData?.info.page || 0;
  const pagesCount = Math.ceil(items / pageSize);
  //   if (pagesCount === 1) return null;
  //   const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  //   console.log(pagesCount);
  //   function onPageChange(page: number) {
  //     setcurrentPage(page);
  //   }
  function renderPaginationLinks() {
    return Array.from({ length: pagesCount }, (_, i) => i + 1).map(
      (pageNumber) => (
        <a
          key={pageNumber}
          href={`#${pageNumber}`}
          onClick={() => onPageChange(pageNumber)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {pageNumber}
        </a>
      )
    );
  }
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage}</span> to{" "}
            <span className="font-medium">{pageSize}</span> of{" "}
            <span className="font-medium">{items}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {renderPaginationLinks()}

            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
