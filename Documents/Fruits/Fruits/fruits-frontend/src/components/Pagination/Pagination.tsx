import React from 'react';
import { styles } from './Pagination.styles';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                      }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" data-testid="pagination" style={styles.container}>
            <button
                type="button"
                className="pagination-button pagination-button--prev"
                data-testid="pagination-prev"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                style={styles.button(currentPage === 1)}
            >
                ← Previous
            </button>

            <span
                className="pagination-info"
                data-testid="pagination-info"
                style={styles.pageInfo}
            >
        Page {currentPage} of {totalPages}
      </span>

            <button
                type="button"
                className="pagination-button pagination-button--next"
                data-testid="pagination-next"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                style={styles.button(currentPage === totalPages)}
            >
                Next →
            </button>
        </nav>
    );
};