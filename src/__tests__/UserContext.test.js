import { reducer, initialState } from '../store/UserContext';

test('SET_USERS updates users', () => {
  const state = reducer(initialState, { type: 'SET_USERS', payload: [{ id: 1 }] });
  expect(state.users).toEqual([{ id: 1 }]);
});

test('SET_SEARCH updates searchTerm and resets page', () => {
  const state = reducer({ ...initialState, currentPage: 5 }, { type: 'SET_SEARCH', payload: 'john' });
  expect(state.searchTerm).toBe('john');
  expect(state.currentPage).toBe(1);
});