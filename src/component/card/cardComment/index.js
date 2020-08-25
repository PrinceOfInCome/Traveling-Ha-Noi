import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Card} from 'native-base';

export default ({imgComment, txtComment, imgAvatar}) => (
  <>
    <View style={styles.CardComment}>
      <Image style={styles.img} source={{uri: imgAvatar}} />

      <View style={styles.viewText}>
        <Text style={styles.txtCmt}>{txtComment}</Text>
      </View>
    </View>
    {imgComment ? (
      <Image style={styles.imgCmt} source={{uri: imgComment}} />
    ) : null}
  </>
);
const styles = StyleSheet.create({
  CardComment: {
    flexDirection: 'row',
	marginTop: 8,
	marginBottom: 16
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    margin: 8,
  },
  viewText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
    borderRadius: 15,
	marginTop: 6,
	width: 300
  },
  txtCmt: {
    fontSize: 16,
    padding: 8,
  },
  imgCmt: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    borderRadius: 15,
  },
});
