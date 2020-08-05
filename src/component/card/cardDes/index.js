import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default ({image, name, onPressAbout}) => (
  <TouchableOpacity onPress = {onPressAbout} style={{marginRight: 8, height: 200, flex: 1}}>
    <Image style={styles.imgDes} source={{uri: image}} />
    <Text style={styles.txtDes}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imgDes: {
    width: 230,
    height: 150,
  },
  txtDes: {
    width: 200,
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    position: 'absolute',
    bottom: 80,
    left: 8,
  },
});
