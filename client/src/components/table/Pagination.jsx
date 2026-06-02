import React, { useEffect, useState } from 'react'
import ArrowRightIcon from '../../assets/icons/ArrowRight'
import ArrowLeftIcon from '../../assets/icons/ArrowLeft'

const Pagination = ({ page, setPage, totalItems, totalPages, limit, setLimit }) => {
  const [canGoNext, setCanGoNext] = useState(true)
  const [canGoBack, setCanGoBack] = useState(true)
  const [noOfPages, setNoOfPages] = useState(0)
  const [pageArr, setPageArr] = useState([])

  const onNextPage = () => setPage((prev) => prev + 1)
  const onPrevPage = () => setPage((prev) => prev - 1)
  const onPageSelect = (pageNumber) => setPage(pageNumber)

  useEffect(() => {
    if (limit && totalItems) {
      const pages = Math.ceil(totalItems / Number(limit))

      if (pages === 0) {
        setPage(1)
      }

      setNoOfPages(pages)
      setPageArr(Array.from({ length: pages }, (_, i) => i + 1))
    }
  }, [limit, totalItems, setPage])

  useEffect(() => {
    setCanGoNext(page < totalPages)
    setCanGoBack(page > 1)
  }, [page, totalPages])

  return (
    <div className="w-full lg:flex items-center justify-between">
      {/* Page size selector */}
      <div className="flex items-center place-content-center">
        <div className="w-14">
          <select
            className="outline-none bg-white rounded-lg shadow px-1 w-26 h-7.5 text-[12px] font-semibold"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[10, 15, 25, 50, 100, 200].map((size) => (
              <option key={size} value={size}>
                Showing {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center place-content-center gap-3 mt-4 lg:mt-0">
        <button
          disabled={!canGoBack}
          className={`${canGoBack ? 'cursor-pointer' : 'cursor-not-allowed'} `}
          onClick={onPrevPage}
        >
          <ArrowLeftIcon />
        </button>

        <div className="flex items-center gap-3">
          {pageArr.length < 5 ? (
            pageArr.map((value, index) => (
              <button
                key={index + 1}
                onClick={() => onPageSelect(index + 1)}
                className={`rounded-xs text-white font-semibold text-[10px] w-4 h-4 cursor-pointer ${
                  page === index + 1 ? 'bg-[#0043D880]' : 'bg-[#0043D81A]'
                }`}
              >
                {index + 1}
              </button>
            ))
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onPageSelect(1)}
                className={`rounded-xs text-white font-semibold text-[10px] w-4 h-4 cursor-pointer ${
                  page === 1 ? 'bg-[#0043D880]' : 'bg-[#0043D81A]'
                }`}
              >
                1
              </button>

              <span>...</span>

              {page - 1 > 1 && (
                <button
                  type="button"
                  onClick={() => onPageSelect(page - 1)}
                  className="rounded-xs text-white font-semibold text-[10px] w-4 h-4 bg-[#0043D81A] cursor-pointer"
                >
                  {page - 1}
                </button>
              )}

              {page > 1 && page < pageArr.length && (
                <button
                  type="button"
                  onClick={() => onPageSelect(page)}
                  className={`rounded-xs text-white font-semibold text-[10px] w-4 h-4 cursor-pointer ${
                    page === page ? 'bg-[#0043D880]' : 'bg-[#0043D81A]'
                  }`}
                >
                  {page}
                </button>
              )}

              {page + 1 < pageArr.length && (
                <button
                  type="button"
                  onClick={() => onPageSelect(page + 1)}
                  className="rounded-xs text-white font-semibold text-[10px] w-4 h-4 bg-[#0043D81A] cursor-pointer"
                >
                  {page + 1}
                </button>
              )}

              <span>...</span>

              <button
                type="button"
                onClick={() => onPageSelect(pageArr.length)}
                className={` ${
                  pageArr.length === page ? 'bg-[#0043D880]' : 'bg-[#0043D81A]'
                } rounded-xs text-white font-semibold text-[10px] w-4 h-4 cursor-pointer`}
              >
                {pageArr.length}
              </button>
            </div>
          )}
        </div>

        <button
          disabled={!canGoNext}
          className={`${canGoNext ? 'cursor-pointer' : 'cursor-not-allowed'} `}
          onClick={onNextPage}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}

export default Pagination

// import React, { useEffect, useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import ArrowLeftIcon from "../../assets/icons/ArrowLeft";
// import ArrowRightIcon from "../../assets/icons/ArrowRight";

// type PaginationProps = {
//   page: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   limit: number;
//   setLimit: React.Dispatch<React.SetStateAction<number>>;
//   totalItems: number;
//   pageBlockSize?: number; // default 4
// };

// const Pagination = ({
//   page,
//   setPage,
//   totalItems,
//   limit,
//   setLimit,
//   pageBlockSize = 4,
// }: PaginationProps) => {
//   const [noOfPages, setNoOfPages] = useState(0);

//   useEffect(() => {
//     setLimit(limit);
//     const pages = Math.ceil(totalItems / limit);
//     setNoOfPages(pages);
//     if (page > pages) setPage(pages || 1);
//   }, [totalItems, limit]);

//   // Calculate current block
//   const currentBlock = Math.floor((page - 1) / pageBlockSize);
//   const startPage = currentBlock * pageBlockSize + 1;
//   const endPage = startPage + pageBlockSize - 1;

//   const pages = [];
//   for (let i = startPage; i <= startPage + pageBlockSize - 1; i++) {
//     pages.push(i);
//   }

//   const canGoPrevBlock = startPage > 1;
//   const canGoNextBlock = endPage < noOfPages;

//   return (
//     <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-content">
//       <div className="text-[12px] text-gray-700 font=semibold">
//         Showing page <span>{page}</span> to <span>{noOfPages}</span> of{" "}
//         <span>{totalItems}</span>entries
//       </div>

//       <div className="flex items-center gap-[8px]">
//         {/* Previous block */}
//         <button
//           onClick={() => setPage(startPage - 1)}
//           disabled={!canGoPrevBlock}
//           className={`p-1 ${
//             !canGoPrevBlock ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           <ArrowLeftIcon />
//         </button>

//         {/* Page numbers */}
//         {pages.map((p) => (
//           <button
//             key={p}
//             onClick={() => p <= noOfPages && setPage(p)}
//             disabled={p > noOfPages}
//             className={`rounded-xs text-white font-semibold text-[10px] w-4 h-4 ${
//               page === p
//                 ? "bg-[#0043D880]"
//                 : p > noOfPages
//                 ? "bg-[#0043D81A] cursor-not-allowed"
//                 : "bg-[#0043D81A]"
//             }`}
//           >
//             {p}
//           </button>
//         ))}

//         {/* Next block */}
//         <button
//           onClick={() => setPage(endPage + 1)}
//           disabled={!canGoNextBlock}
//           className={`p-1 ${
//             !canGoNextBlock ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           <ArrowRightIcon />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
