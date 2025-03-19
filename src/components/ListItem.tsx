/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {User} from '../types/User';

interface ListItemProps {
  item: User;
  searchedUser: string;
}

export const ListItem = ({item, searchedUser}: ListItemProps) => (
  <View
    style={[
      styles.row,
      item.name.toLowerCase() === searchedUser.toLowerCase() &&
        styles.highlightedRow,
    ]}>
    <Text style={[styles.cell, {textAlign: 'left'}]}>{item.name}</Text>
    <View style={[styles.cell, styles.rankCell]}>
      <Text style={{textAlign: 'center'}}>{item.rank}</Text>
    </View>
    <Text style={[styles.cell, {textAlign: 'center'}]}>{item.bananas}</Text>
  </View>
);

const styles = StyleSheet.create({
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
  rankCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortIcon: {
    marginLeft: 4,
  },
});
