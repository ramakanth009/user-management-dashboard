import React from 'react';
import { getTotalPages } from '../utils/helpers';
import './Pagination.css';

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = getTotalPages(totalItems, pageSize);
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      {start > 1 && <button onClick={() => onPageChange(1)}>1</button>}
      {start > 2 && <span>…</span>}
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} className={p === currentPage ? 'active' : ''}>
          {p}
        </button>
      ))}
      {end < totalPages - 1 && <span>…</span>}
      {end < totalPages && <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;