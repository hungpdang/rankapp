export interface User {
  name: string;
  bananas: number;
  rank?: number;
  uid: string;
}

export interface AppState {
  users: User[];
  searchedUser: string;
  sortBy: 'rank' | 'name';
  showLowestRanked: boolean;
  displayUsers: User[];
  isFuzzySearch: boolean;
}
