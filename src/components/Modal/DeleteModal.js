import React from 'react';
import { useUserContext } from '../../store/UserContext';

const DeleteModal = ({ isOpen, onClose, onConfirm, userId }) => {
  const { state } = useUserContext();
  const user = state.users.find(u => u.id === userId);
  const name = user ? `${user.firstName} ${user.lastName}` : 'this user';

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚠️ Confirm Delete</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <p>Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.</p>
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;