import React from 'react';
import SearchBar from './SearchBar';

const Toolbar = ({
  search,
  onSearch,
  onFilterOpen,
  pageSize,
  onPageSizeChange,
  filterActive,
  onClearFilters,
}) => (
  <div className="toolbar">
    <div className="toolbar-left">
      <SearchBar value={search} onChange={onSearch} />
      <button className="btn-filter" onClick={onFilterOpen}>
        <i className="fa-solid fa-sliders"></i> Filter
      </button>
      {filterActive && (
        <span className="filter-badge">
          <i className="fa-solid fa-filter"></i> Filtered
          <span className="clear-filter" onClick={onClearFilters}>✕</span>
        </span>
      )}
    </div>
    <div className="toolbar-right">
      <label><i className="fa-regular fa-eye"></i> Show</label>
      <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
);

export default Toolbar;