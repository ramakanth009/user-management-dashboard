import React from 'react';
import { getPageItems } from '../utils/helpers';
import './UserTable.css';

const UserTable = ({ users, page, pageSize, onEdit, onDelete, onSort, sortField, sortAsc }) => {
  const pageItems = getPageItems(users, page, pageSize);

  const handleSort = (field) => {
    const asc = sortField === field ? !sortAsc : true;
    onSort(field, asc);
  };

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} className={sortField === 'id' ? 'active' : ''}>
              ID <span className="sort-icon">{sortField === 'id' ? (sortAsc ? '▲' : '▼') : '⇅'}</span>
            </th>
            <th onClick={() => handleSort('firstName')} className={sortField === 'firstName' ? 'active' : ''}>
              First Name <span className="sort-icon">{sortField === 'firstName' ? (sortAsc ? '▲' : '▼') : '⇅'}</span>
            </th>
            <th onClick={() => handleSort('lastName')} className={sortField === 'lastName' ? 'active' : ''}>
              Last Name <span className="sort-icon">{sortField === 'lastName' ? (sortAsc ? '▲' : '▼') : '⇅'}</span>
            </th>
            <th onClick={() => handleSort('email')} className={sortField === 'email' ? 'active' : ''}>
              Email <span className="sort-icon">{sortField === 'email' ? (sortAsc ? '▲' : '▼') : '⇅'}</span>
            </th>
            <th onClick={() => handleSort('department')} className={sortField === 'department' ? 'active' : ''}>
              Department <span className="sort-icon">{sortField === 'department' ? (sortAsc ? '▲' : '▼') : '⇅'}</span>
            </th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-state">
                <i className="fa-regular fa-circle-user"></i>
                <p>No users found</p>
              </td>
            </tr>
          ) : (
            pageItems.map(user => (
              <tr key={user.id}>
                <td className="col-id">{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td className="col-actions">
                  <button className="btn-edit" onClick={() => onEdit(user.id)} title="Edit">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(user.id)} title="Delete">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;