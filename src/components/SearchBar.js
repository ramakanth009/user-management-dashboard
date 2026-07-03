import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <div className="search-box">
    <i className="fa-solid fa-magnifying-glass"></i>
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;