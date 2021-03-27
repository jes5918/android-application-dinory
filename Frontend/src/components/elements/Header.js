import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ArrowButton from './ArrowButton';
import Profile from './Profile';

function Header({children}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <ArrowButton onHandlePress={() => navigation.goBack()} />
      {children}
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flex: 1.5, // 141
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default Header;
