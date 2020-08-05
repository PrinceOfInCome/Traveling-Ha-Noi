import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function Favorite() {
  return (
    <SafeAreaView style = {styles.container}>
      <Text>Favorite</Text>
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
