import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import {Card} from 'native-base';
export default ({image, onPressAbouts, name, address}) => (
  <Card style={styles.cardNew}>
    <TouchableOpacity style={styles.btnTab} onPress={onPressAbouts}>
      <Image style={styles.imgTab} source={{uri: image}} />
      <Text style={styles.txtTab}>{name}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 25, height: 25, margin: 8}}
          source={require('../../../image/location.png')}
        />
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginTop: 16,
            marginBottom: 16,
            marginRight: 16,
            width: 330,
          }}>
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  </Card>
);
const styles = StyleSheet.create({
  cardNew: {
    width: width - 32,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 16,
  },

  imgTab: {
    width: width - 32,
    height: 300,
  },
  txtTab: {
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginTop: 16,
    paddingRight: 100,
  },
});
