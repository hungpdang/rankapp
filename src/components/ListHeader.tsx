/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ChevronUpIcon, ChevronDownIcon} from 'react-native-heroicons/outline';

interface ListHeaderProps {
  sortBy: 'rank' | 'name';
  showLowestRanked: boolean;
  onHeaderPress: (type: 'rank' | 'name') => void;
}

export const ListHeader = ({
  sortBy,
  showLowestRanked,
  onHeaderPress,
}: ListHeaderProps) => (
  <View style={styles.headerRow}>
    <TouchableOpacity
      style={[styles.headerCell, styles.headerButton]}
      onPress={() => onHeaderPress('name')}>
      <Text style={styles.headerText}>Name</Text>
      {sortBy === 'name' && (
        <ChevronDownIcon size={16} color="#666" style={styles.sortIcon} />
      )}
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.headerCell, styles.headerButton]}
      onPress={() => onHeaderPress('rank')}>
      <Text style={styles.headerText}>Rank</Text>
      {sortBy === 'rank' && (
        <ChevronUpIcon
          size={16}
          color="#666"
          style={[styles.sortIcon, showLowestRanked && styles.sortIconRotated]}
        />
      )}
    </TouchableOpacity>
    <View style={styles.headerCell}>
      <Text style={[styles.headerText, {textAlign: 'center'}]}>Bananas</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  headerCell: {
    flex: 1,
    padding: 8,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  sortIcon: {
    marginLeft: 4,
  },
  sortIconRotated: {
    transform: [{rotate: '180deg'}],
  },
});
