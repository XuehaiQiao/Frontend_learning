import React from 'react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
    const pageNumbers: number[] = [];

    const sideLength = 3; // sidLength > 1

    let firstPage = 1;
    let lastPage = props.totalPages;

    // Add page numbers to the array
    for (let i = Math.max(2, props.currentPage - sideLength); i <= Math.min(props.currentPage + sideLength, props.totalPages - 1); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            <li className={'page-item'}>
                <button
                    className="page-link"
                    onClick={() => props.onPageChange(props.currentPage - 1)}
                >
                    {'<'}
                </button>
            </li>

            {/* firstPage */}
            <li
                key={firstPage}
                className={`page-item ${props.currentPage === firstPage ? 'active' : ''}`}
            >
                <button
                    className="page-link"
                    onClick={() => props.onPageChange(firstPage)}
                >
                    {firstPage}
                </button>
            </li>

            {/* second... */}
            {props.currentPage - sideLength > 2 && (<li
                className={`page-item`}
            >
                <button
                    className="page-link"
                >
                    {'...'}
                </button>
            </li>)}

            {/* middlePages */}
            {pageNumbers.map((number) => (
                <li
                    key={number}
                    className={`page-item ${props.currentPage === number ? 'active' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => props.onPageChange(number)}
                    >
                        {number}
                    </button>
                </li>
            ))}

            {/* second... */}
            {props.currentPage + sideLength < props.totalPages - 1 && (<li
                className={`page-item`}
            >
                <button
                    className="page-link"
                >
                    {'...'}
                </button>
            </li>)}

            {/* lastPage */}
            {lastPage > 1 && <li
                key={lastPage}
                className={`page-item ${props.currentPage === lastPage ? 'active' : ''}`}
            >
                <button
                    className="page-link"
                    onClick={() => props.onPageChange(lastPage)}
                >
                    {lastPage}
                </button>
            </li>}


            <li className={'page-item'}>
                <button
                    className="page-link"
                    onClick={() => props.onPageChange(props.currentPage + 1)}
                >
                    {'>'}
                </button>
            </li>
        </ul>
    );
};

export default Pagination;