import React from 'react'

const Pagination = ({eventsPerPage, totalEvents, paginate, currentPage}) => {
let pageNumbers = []

for (let i=1; i<=Math.ceil(totalEvents/eventsPerPage); i++){
  pageNumbers.push(i)

}

const goToNextPage = () => {
  if (currentPage < pageNumbers.length) {
    paginate(currentPage + 1);
  }
}

const goToPreviousPage = () => {
  if (currentPage > 1) {
    paginate(currentPage - 1);
  } 

}

return (
  <div className="flex justify-center items-center h-full pt-6">
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {/* Previous Button */}
        <li>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-black bg-white border-2 border-black rounded-s-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <span className="sr-only">Back</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`flex items-center justify-center px-4 ${
                currentPage === number ? "h-12 text-lg font-bold" : "h-10"
              } leading-tight text-black bg-white border-2 border-black hover:bg-gray-100`}
            >
        
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= pageNumbers.length}
            className="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border-2 border-black rounded-e-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
);
}

export default Pagination