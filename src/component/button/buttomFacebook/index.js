import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default ({onPress, title}) => (
  <TouchableOpacity style={styles.btnLoginFacebook} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnLoginFacebook: {
    marginTop: 350,
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
