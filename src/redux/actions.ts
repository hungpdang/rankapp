import {User} from '../types/User';

export const SET_USERS = 'SET_USERS';
export const SET_SEARCH_USER = 'SET_SEARCH_USER';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SHOW_LOWEST = 'SET_SHOW_LOWEST';
export const SET_FUZZY_SEARCH = 'SET_FUZZY_SEARCH';

export const setUsers = (users: User[]) => ({
  type: SET_USERS,
  payload: users,
});

export const setSearchUser = (username: string) => ({
  type: SET_SEARCH_USER,
  payload: username,
});

export const setSortBy = (sortBy: 'rank' | 'name') => ({
  type: SET_SORT_BY,
  payload: sortBy,
});

export const setShowLowest = (show: boolean) => ({
  type: SET_SHOW_LOWEST,
  payload: show,
});

export const setFuzzySearch = (isFuzzy: boolean) => ({
  type: SET_FUZZY_SEARCH,
  payload: isFuzzy,
});
