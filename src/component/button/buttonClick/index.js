import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default ({onPress, title, colors}) => (
  <TouchableOpacity
    style={[styles.btnClick, {backgroundColor: `${colors}`}]}
    onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnClick: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
