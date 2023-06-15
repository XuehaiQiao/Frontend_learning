import React from 'react';
import './Pagination.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
    const pageNumbers: number[] = [];

    // Add page numbers to the array
    for (let i = Math.max(1, props.currentPage - 3); i <= Math.min(props.currentPage + 3, props.totalPages); i++) {
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