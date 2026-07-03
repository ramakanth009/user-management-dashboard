import React, { createContext, useReducer, useContext, useEffect } from 'react';
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
  pageSize: 25,
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

  // fetchs users on mount
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

  // recalculate filtered & sorted list whenever dependencies changed
  useEffect(() => {
    let result = [...state.users];

    // search
    if (state.searchTerm.trim()) {
      const s = state.searchTerm.trim().toLowerCase();
      result = result.filter((u) =>
        u.firstName.toLowerCase().includes(s) ||
        u.lastName.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.department.toLowerCase().includes(s) ||
        String(u.id).includes(s)
      );
    }

    // filters
    const { firstName, lastName, email, department } = state.filters;
    const hasFilter = firstName || lastName || email || department;
    if (hasFilter) {
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

    // sort
    const { sortField, sortAsc } = state;
    result.sort((a, b) => {
      let va = a[sortField] ?? '';
      let vb = b[sortField] ?? '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

    dispatch({ type: 'SET_FILTERED', payload: result });
    dispatch({
      type: 'SET_FILTER_ACTIVE',
      payload: hasFilter || !!state.searchTerm.trim(),
    });
  }, [state]);

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);