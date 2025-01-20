import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div className="pagination-container flex justify-center items-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-sm bg-purple-400 px-4 py-2 rounded-md text-justify mx-2"
            >
                Prev
            </button>
            <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-sm bg-purple-400 px-4 py-2 text-justify rounded-md mx-2"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
