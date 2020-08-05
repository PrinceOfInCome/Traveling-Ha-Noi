import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
var {width, height} = Dimensions.get('window');
export default ({name, description, imgAbout, about}) => (
  <View
    style={{
      marginLeft: 16,
      marginRight: 16,
    }}>
    <Text style={styles.txtTitle}>{name}</Text>
    <Text style={styles.txtDes}>{description}</Text>
    <Image style={styles.imgAbout} source={{uri: imgAbout}} />
    <Text style={styles.txtDes}>{about}</Text>
  </View>
);

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  imgAbout: {
    width: width - 32,
    height: 255,
    marginBottom: 8,
    marginTop: 8,
  },
  txtDes: {
    color: 'black',
    fontSize: 16,
  },
});
