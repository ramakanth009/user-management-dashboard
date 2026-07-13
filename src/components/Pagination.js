import React from 'react';
import { getTotalPages } from '../utils/helpers';
import './Pagination.css';

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = getTotalPages(totalItems, pageSize);
  
  // Only hide pagination if there are NO items OR only 1 page
  // For 2+ pages, ALWAYS show pagination
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display (max 5 visible)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust if we're near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      {/* Previous button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-nav"
      >
        <i className="fa-solid fa-chevron-left"></i> Prev
      </button>

      {/* First page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="pagination-number">1</button>
          {visiblePages[0] > 2 && <span className="pagination-ellipsis">…</span>}
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-number ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      {/* Last page if not visible */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="pagination-ellipsis">…</span>
          )}
          <button onClick={() => onPageChange(totalPages)} className="pagination-number">
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-nav"
      >
        Next <i className="fa-solid fa-chevron-right"></i>
      </button>

      {/* Page info */}
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;