import reducer from '../reducer';
import {
  SET_USERS,
  SET_SEARCH_USER,
  SET_SORT_BY,
  SET_SHOW_LOWEST,
  SET_FUZZY_SEARCH,
} from '../actions';
import {AppState} from '../../types/User';

describe('Reducer', () => {
  const mockUsers = [
    {uid: '3', name: 'Charlie', bananas: 300},
    {uid: '2', name: 'Bob', bananas: 200},
    {uid: '1', name: 'Alice', bananas: 100},
  ];

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      searchedUser: '',
      sortBy: 'rank',
      showLowestRanked: false,
      displayUsers: [],
      isFuzzySearch: false,
    });
  });

  it('should handle SET_USERS', () => {
    const action = {type: SET_USERS, payload: mockUsers};
    const state = reducer(undefined, action);

    expect(state.users).toEqual(mockUsers);
    expect(state.displayUsers.length).toBe(3);
    // Should be sorted by bananas (rank)
    expect(state.displayUsers[0].name).toBe('Charlie');
  });

  it('should handle SET_SEARCH_USER with exact match', () => {
    const initialState: AppState = {
      users: mockUsers,
      searchedUser: '',
      sortBy: 'rank',
      showLowestRanked: false,
      displayUsers: mockUsers,
      isFuzzySearch: false,
    };

    const action = {type: SET_SEARCH_USER, payload: 'Bob'};
    const state = reducer(initialState, action);

    expect(state.searchedUser).toBe('Bob');
    // Should maintain original list with Bob in it since he's in top 10
    expect(state.displayUsers.some(user => user.name === 'Bob')).toBe(true);
  });

  it('should handle SET_SEARCH_USER with fuzzy search', () => {
    const initialState: AppState = {
      users: mockUsers,
      searchedUser: '',
      sortBy: 'rank',
      showLowestRanked: false,
      displayUsers: mockUsers,
      isFuzzySearch: true,
    };

    const action = {type: SET_SEARCH_USER, payload: 'B'};
    const state = reducer(initialState, action);

    expect(state.searchedUser).toBe('B');
    // Should find Bob in the results
    expect(state.displayUsers.some(user => user.name === 'Bob')).toBe(true);
  });

  it('should handle SET_SORT_BY', () => {
    const initialState: AppState = {
      users: mockUsers,
      searchedUser: '',
      sortBy: 'rank',
      showLowestRanked: false,
      displayUsers: mockUsers,
      isFuzzySearch: false,
    };

    const action = {type: SET_SORT_BY, payload: 'name'};
    const state = reducer(initialState, action);

    expect(state.sortBy).toBe('name');
    // When sorted by name, Alice should be first
    expect(state.displayUsers[0].name).toBe('Alice');
  });

  it('should handle SET_SHOW_LOWEST', () => {
    const initialState: AppState = {
      users: mockUsers,
      searchedUser: '',
      sortBy: 'rank',
      showLowestRanked: false,
      displayUsers: mockUsers,
      isFuzzySearch: false,
    };

    const action = {type: SET_SHOW_LOWEST, payload: true};
    const state = reducer(initialState, action);

    expect(state.showLowestRanked).toBe(true);
    expect(state.displayUsers[0].name).toBe('Charlie');
  });

  it('should handle SET_FUZZY_SEARCH', () => {
    const initialState: AppState = {
      users: mockUsers,
      searchedUser: 'B',
      sortBy: 'rank',
      showLowestRanked: false,
      displayUsers: mockUsers,
      isFuzzySearch: false,
    };

    // Turn fuzzy search on
    const action = {type: SET_FUZZY_SEARCH, payload: true};
    const state = reducer(initialState, action);

    expect(state.isFuzzySearch).toBe(true);
    expect(state.searchedUser).toBe('B');

    // Turn fuzzy search off
    const turnOffAction = {type: SET_FUZZY_SEARCH, payload: false};
    const stateAfterTurnOff = reducer(state, turnOffAction);

    expect(stateAfterTurnOff.isFuzzySearch).toBe(false);
    expect(stateAfterTurnOff.searchedUser).toBe('');
  });
});
