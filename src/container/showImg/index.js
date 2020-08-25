import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {dummyData} from '../../service/data/slider/data';
export default function ShowImg() {
  return <SafeAreaView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
