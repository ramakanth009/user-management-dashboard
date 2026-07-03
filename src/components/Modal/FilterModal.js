import React, { useState, useEffect } from 'react';

const FilterModal = ({ isOpen, onClose, filters, applyFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  // to sync local state with props when modal opens
  useEffect(() => {
    if (filters) {
      setLocalFilters(filters);
    }
  }, [filters, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    applyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const empty = { firstName: '', lastName: '', email: '', department: '' };
    setLocalFilters(empty);
    applyFilters(empty);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fa-solid fa-sliders"></i> Filter Users</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="filter-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              value={localFilters.firstName}
              onChange={handleChange}
              placeholder="Any"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              value={localFilters.lastName}
              onChange={handleChange}
              placeholder="Any"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={localFilters.email}
              onChange={handleChange}
              placeholder="Any"
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              name="department"
              value={localFilters.department}
              onChange={handleChange}
              placeholder="Any"
            />
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={handleReset}>
            <i className="fa-solid fa-undo"></i> Reset
          </button>
          <button type="button" className="btn-submit" onClick={handleApply}>
            <i className="fa-solid fa-check"></i> Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;