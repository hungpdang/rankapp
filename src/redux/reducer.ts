import {Alert} from 'react-native';
import {User} from '../types/User';
import {
  SET_USERS,
  SET_SEARCH_USER,
  SET_SORT_BY,
  SET_SHOW_LOWEST,
  SET_FUZZY_SEARCH,
} from './actions';

interface AppState {
  users: User[];
  searchedUser: string;
  sortBy: 'rank' | 'name';
  showLowestRanked: boolean;
  displayUsers: User[];
  isFuzzySearch: boolean;
}

const initialState: AppState = {
  users: [],
  searchedUser: '',
  sortBy: 'rank',
  showLowestRanked: false,
  displayUsers: [],
  isFuzzySearch: false,
};

const processDisplayUsers = (
  users: User[],
  searchedUser: string,
  sortBy: 'rank' | 'name',
  showLowestRanked: boolean,
  isFuzzySearch: boolean,
): User[] => {
  // First, rank all users by banana count
  let allUsers = [...users]
    .sort((a, b) => b.bananas - a.bananas)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  let displayList = allUsers.slice(0, 10); // Default top 10

  // If search is empty or just whitespace, return default sorted list
  if (!searchedUser || !searchedUser.trim()) {
    if (showLowestRanked) {
      displayList = allUsers.slice(-10).sort((a, b) => {
        if (a.bananas === b.bananas) {
          return a.name.localeCompare(b.name);
        }
        return b.bananas - a.bananas;
      });
    }

    if (sortBy === 'name') {
      displayList = [...displayList].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    return displayList;
  }

  // Handle search when there's actual input
  const searchTerm = searchedUser.toLowerCase().trim();

  if (isFuzzySearch) {
    // Fuzzy search: match partial names
    const matchingUsers = allUsers
      .filter(user => user.name.toLowerCase().includes(searchTerm))
      .map(user => ({...user, rank: user.rank ?? 0}));

    if (matchingUsers.length === 0) {
      Alert.alert(
        'This user name does not exist! Please specify an existing user name!',
      );
      return displayList;
    }

    // Sort matching users by rank (highest to lowest)
    matchingUsers.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    displayList = matchingUsers.slice(0, 10).map(user => ({
      ...user,
      rank: user.rank ?? 0,
    }));
  } else {
    // Exact match search
    const exactMatch = allUsers.find(
      user => user.name.toLowerCase() === searchTerm,
    );

    if (!exactMatch) {
      Alert.alert(
        'This user name does not exist! Please specify an existing user name!',
      );
      return displayList;
    }

    // If user is in top 10, keep the current list
    if (displayList.some(user => user.name === exactMatch.name)) {
      return displayList;
    }

    // If user is not in top 10, replace last position
    displayList[9] = {...exactMatch, rank: exactMatch.rank ?? 0};
  }

  // Apply sorting options
  if (showLowestRanked) {
    displayList = allUsers.slice(-10).sort((a, b) => {
      if (a.bananas === b.bananas) {
        return a.name.localeCompare(b.name);
      }
      return b.bananas - a.bananas;
    });
  }

  if (sortBy === 'name') {
    displayList = [...displayList].sort((a, b) => a.name.localeCompare(b.name));
  }

  return displayList;
};

export default function reducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        displayUsers: processDisplayUsers(
          action.payload,
          state.searchedUser,
          state.sortBy,
          state.showLowestRanked,
          state.isFuzzySearch,
        ),
      };

    case SET_SEARCH_USER:
      return {
        ...state,
        searchedUser: action.payload,
        displayUsers: processDisplayUsers(
          state.users,
          action.payload,
          state.sortBy,
          state.showLowestRanked,
          state.isFuzzySearch,
        ),
      };

    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
        displayUsers: processDisplayUsers(
          state.users,
          state.searchedUser,
          action.payload,
          state.showLowestRanked,
          state.isFuzzySearch,
        ),
      };

    case SET_SHOW_LOWEST:
      return {
        ...state,
        showLowestRanked: action.payload,
        displayUsers: processDisplayUsers(
          state.users,
          state.searchedUser,
          state.sortBy,
          action.payload,
          state.isFuzzySearch,
        ),
      };

    case SET_FUZZY_SEARCH:
      return {
        ...state,
        isFuzzySearch: action.payload,
        // Clear search when turning off fuzzy search
        searchedUser: action.payload ? state.searchedUser : '',
        displayUsers: processDisplayUsers(
          state.users,
          action.payload ? state.searchedUser : '',
          state.sortBy,
          state.showLowestRanked,
          action.payload,
        ),
      };

    default:
      return state;
  }
}
