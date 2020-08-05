import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function ShowImg() {
  return (
    <SafeAreaView style = {styles.container}>
      <Text>ShowImg</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
