/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {User, AppState} from '../types/User';
import {ListHeader} from '../components/ListHeader';
import {ListItem} from '../components/ListItem';
import {
  setSearchUser,
  setSortBy,
  setShowLowest,
  setFuzzySearch,
} from '../redux/actions';

interface Props {
  displayUsers: User[];
  searchedUser: string;
  sortBy: 'rank' | 'name';
  showLowestRanked: boolean;
  isFuzzySearch: boolean;
  setSearchUser: (username: string) => void;
  setSortBy: (sortBy: 'rank' | 'name') => void;
  setShowLowest: (show: boolean) => void;
  setFuzzySearch: (isFuzzy: boolean) => void;
}

const HomeScreen: React.FC<Props> = ({
  displayUsers,
  searchedUser,
  sortBy,
  showLowestRanked,
  isFuzzySearch,
  setSearchUser,
  setSortBy,
  setShowLowest,
  setFuzzySearch,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchUser(searchText.trim());
    }
  };

  const onFuzzySearchToggle = () => {
    setFuzzySearch(!isFuzzySearch);
    if (!isFuzzySearch) {
      setSearchText('');
      setSearchUser('');
    }
  };

  const handleHeaderPress = (type: 'rank' | 'name') => {
    if (type === 'rank') {
      setShowLowest(!showLowestRanked);
    } else {
      setSortBy(sortBy === 'name' ? 'rank' : 'name');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MagnifyingGlassIcon size={20} color="#666" />
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search user..."
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Fuzzy Search</Text>
        <Switch
          value={isFuzzySearch}
          onValueChange={onFuzzySearchToggle}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isFuzzySearch ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      <FlatList
        data={displayUsers}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <ListItem item={item} searchedUser={searchedUser} />
        )}
        ListHeaderComponent={
          <ListHeader
            sortBy={sortBy}
            showLowestRanked={showLowestRanked}
            onHeaderPress={handleHeaderPress}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    padding: 8,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  option: {
    marginRight: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#e6e6e6',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  highlightedRow: {
    backgroundColor: '#fff3cd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  optionText: {
    textAlign: 'center',
    width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 16,
  },
  toggleText: {
    marginRight: 8,
  },
});

const mapStateToProps = (state: AppState) => ({
  displayUsers: state.displayUsers,
  searchedUser: state.searchedUser,
  sortBy: state.sortBy,
  showLowestRanked: state.showLowestRanked,
  isFuzzySearch: state.isFuzzySearch,
});

const mapDispatchToProps = {
  setSearchUser,
  setSortBy,
  setShowLowest,
  setFuzzySearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
