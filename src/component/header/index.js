import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default ({title, onPress}) => (
  <TouchableOpacity style={styles.header} onPress={onPress}>
    <Image
      style={{width: 30, height: 40, marginLeft: 16, marginRight: 16}}
      source={require('../../image/left.png')}
    />
    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
