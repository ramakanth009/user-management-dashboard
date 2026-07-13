import React, { createContext, useReducer, useContext, useEffect, useMemo } from 'react';
import * as api from '../services/api';

const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: { firstName: '', lastName: '', email: '', department: '' },
  sortField: 'id',
  sortAsc: true,
  currentPage: 1,
  pageSize: 10,
  isFilterActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_FILTERED':
      return { ...state, filteredUsers: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload, currentPage: 1 };
    case 'SET_SORT':
      return { ...state, sortField: action.field, sortAsc: action.asc, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, currentPage: 1 };
    case 'SET_FILTER_ACTIVE':
      return { ...state, isFilterActive: action.payload };
    default:
      return state;
  }
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure state outside useMemo
  const { users, searchTerm, filters, sortField, sortAsc, filteredUsers, isFilterActive } = state;

  // Fetch users on mount only
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await api.getUsers();
        dispatch({ type: 'SET_USERS', payload: data });
        dispatch({ type: 'SET_FILTERED', payload: data });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load users.' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchUsers();
  }, []);

  // Compute filtered users using useMemo
  const computed = useMemo(() => {
    let result = [...users];

    const hasSearchTerm = searchTerm.trim().length > 0;
    const hasFilter = filters.firstName || filters.lastName || filters.email || filters.department;

    // Search
    if (hasSearchTerm) {
      const s = searchTerm.trim().toLowerCase();
      result = result.filter((u) =>
        u.firstName.toLowerCase().includes(s) ||
        u.lastName.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.department.toLowerCase().includes(s) ||
        String(u.id).includes(s)
      );
    }

    // Filters
    if (hasFilter) {
      const { firstName, lastName, email, department } = filters;
      result = result.filter((u) => {
        const match = (val, filter) =>
          !filter || val.toLowerCase().includes(filter.toLowerCase());
        return (
          match(u.firstName, firstName) &&
          match(u.lastName, lastName) &&
          match(u.email, email) &&
          match(u.department, department)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      let va = a[sortField] ?? '';
      let vb = b[sortField] ?? '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

    const isActive = hasFilter || hasSearchTerm;

    return { filteredUsers: result, isFilterActive: isActive };
  }, [users, searchTerm, filters, sortField, sortAsc]); // Explicit dependencies

  // Update filteredUsers in state when computed changes
  useEffect(() => {
    const { filteredUsers: newFilteredUsers, isFilterActive: newIsFilterActive } = computed;
    
    // Only update if changed
    if (JSON.stringify(newFilteredUsers) !== JSON.stringify(filteredUsers)) {
      dispatch({ type: 'SET_FILTERED', payload: newFilteredUsers });
    }
    if (isFilterActive !== newIsFilterActive) {
      dispatch({ type: 'SET_FILTER_ACTIVE', payload: newIsFilterActive });
    }
  }, [computed, filteredUsers, isFilterActive]);

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);