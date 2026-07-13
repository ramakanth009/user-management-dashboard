import React, { useState } from "react";
import { useUserContext } from "./store/UserContext";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import Toolbar from "./components/Toolbar";
import { FormModal, FilterModal, DeleteModal } from "./components/Modal";
import * as api from "./services/api";
import "./App.css";
import "./components/Modal.css";

function App() {
  const { state, dispatch } = useUserContext();
  const [modal, setModal] = useState({ type: null, data: null });

  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  const handleAdd = async (userData) => {
    try {
      const newUser = await api.addUser(userData);
      // Update local state with the new user
      dispatch({ type: 'SET_USERS', payload: [newUser, ...state.users] });
      closeModal();
      alert('User added successfully!');
    } catch (error) {
      console.error('Add failed:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  const handleEdit = async (userData) => {
    try {
      const updated = await api.updateUser(userData);
      // Update the user in the local state
      const updatedList = state.users.map((u) =>
        u.id === updated.id ? updated : u
      );
      dispatch({ type: 'SET_USERS', payload: updatedList });
      closeModal();
      alert('User updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteUser(id);
      dispatch({
        type: "SET_USERS",
        payload: state.users.filter((u) => u.id !== id),
      });
      closeModal();
    } catch {
      alert("Failed to delete user");
    }
  };

  const handleApplyFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const handleClearFilters = () => {
    dispatch({
      type: "SET_FILTERS",
      payload: { firstName: "", lastName: "", email: "", department: "" },
    });
    dispatch({ type: "SET_SEARCH", payload: "" });
  };

  const userToEdit =
    modal.type === "edit" ? state.users.find((u) => u.id === modal.data) : null;
  const userIdToDelete = modal.type === "delete" ? modal.data : null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <i className="fa-regular fa-users"></i> User Management Dashboard
        </h1>
        <button className="btn-add" onClick={() => openModal("add")}>
          <i className="fa-solid fa-plus"></i> Add User
        </button>
      </header>

      <Toolbar
        search={state.searchTerm}
        onSearch={(val) => dispatch({ type: "SET_SEARCH", payload: val })}
        onFilterOpen={() => openModal("filter")}
        pageSize={state.pageSize}
        onPageSizeChange={(size) =>
          dispatch({ type: "SET_PAGE_SIZE", payload: size })
        }
        filterActive={state.isFilterActive}
        onClearFilters={handleClearFilters}
      />

      <UserTable
        users={state.filteredUsers}
        page={state.currentPage}
        pageSize={state.pageSize}
        onEdit={(id) => openModal("edit", id)}
        onDelete={(id) => openModal("delete", id)}
        onSort={(field, asc) => dispatch({ type: "SET_SORT", field, asc })}
        sortField={state.sortField}
        sortAsc={state.sortAsc}
      />

      <Pagination
        totalItems={state.filteredUsers.length}
        pageSize={state.pageSize}
        currentPage={state.currentPage}
        onPageChange={(page) => dispatch({ type: "SET_PAGE", payload: page })}
      />

      <FormModal
        isOpen={modal.type === "add" || modal.type === "edit"}
        onClose={closeModal}
        onSubmit={modal.type === "add" ? handleAdd : handleEdit}
        initialData={modal.type === "edit" ? userToEdit : null}
        mode={modal.type === "edit" ? "edit" : "add"}
      />

      <FilterModal
        isOpen={modal.type === "filter"}
        onClose={closeModal}
        filters={state.filters}
        applyFilters={handleApplyFilters}
      />

      <DeleteModal
        isOpen={modal.type === "delete"}
        onClose={closeModal}
        onConfirm={() => handleDelete(userIdToDelete)}
        userId={userIdToDelete}
      />
    </div>
  );
}

export default App;
