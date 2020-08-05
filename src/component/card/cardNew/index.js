import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'native-base';
var {width, height} = Dimensions.get('window');
export default function CardNew({img, title, onPressNews}) {
  return (
    <>
      <Card style={styles.cardNew}>
        <TouchableOpacity onPress={onPressNews} style={styles.btnTab}>
          <Image style={styles.imgTab} source={{uri: img}} />
          <Text style={styles.txtTab}>{title}</Text>
        </TouchableOpacity>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  cardNew: {
    width: width / 2 - 25,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 16,
    borderColor: '#ccc',
	height: 200,
  },

  txtTab: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 8,
    paddingBottom: 10,
    height: 70,
  },
  imgTab: {
    width: width / 2 - 25,
    height: 130,
  },
});
