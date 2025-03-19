import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import {Provider, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducer';
import leaderboardData from './src/assets/leaderboard.json';
import {setUsers} from './src/redux/actions';

const store = createStore(reducer);

const AppContent = () => {
  const dispatch = useDispatch();

  const processData = (data: Record<string, any>) => {
    return Object.values(data)
      .filter(user => user.name) // Ensure user has a name
      .map(user => ({
        uid: user.uid,
        name: user.name,
        bananas: user.bananas,
      }))
      .sort((a, b) => b.bananas - a.bananas); // Sort by highest bananas first
  };

  useEffect(() => {
    const processedUsers = processData(leaderboardData);
    dispatch(setUsers(processedUsers));
  }, []);

  return (
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
