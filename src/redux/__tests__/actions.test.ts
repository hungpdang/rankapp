import {
  setUsers,
  setSearchUser,
  setSortBy,
  setShowLowest,
  setFuzzySearch,
} from '../actions';
import {
  SET_USERS,
  SET_SEARCH_USER,
  SET_SORT_BY,
  SET_SHOW_LOWEST,
  SET_FUZZY_SEARCH,
} from '../actions';

describe('Actions', () => {
  const mockUsers = [
    {uid: '1', name: 'Alice', bananas: 100},
    {uid: '2', name: 'Bob', bananas: 200},
  ];

  it('should create SET_USERS action', () => {
    const expectedAction = {
      type: SET_USERS,
      payload: mockUsers,
    };
    expect(setUsers(mockUsers)).toEqual(expectedAction);
  });

  it('should create SET_SEARCH_USER action', () => {
    const searchTerm = 'Alice';
    const expectedAction = {
      type: SET_SEARCH_USER,
      payload: searchTerm,
    };
    expect(setSearchUser(searchTerm)).toEqual(expectedAction);
  });

  it('should create SET_SORT_BY action', () => {
    const sortBy = 'name';
    const expectedAction = {
      type: SET_SORT_BY,
      payload: sortBy,
    };
    expect(setSortBy(sortBy)).toEqual(expectedAction);
  });

  it('should create SET_SHOW_LOWEST action', () => {
    const showLowest = true;
    const expectedAction = {
      type: SET_SHOW_LOWEST,
      payload: showLowest,
    };
    expect(setShowLowest(showLowest)).toEqual(expectedAction);
  });

  it('should create SET_FUZZY_SEARCH action', () => {
    const isFuzzy = true;
    const expectedAction = {
      type: SET_FUZZY_SEARCH,
      payload: isFuzzy,
    };
    expect(setFuzzySearch(isFuzzy)).toEqual(expectedAction);
  });
});
