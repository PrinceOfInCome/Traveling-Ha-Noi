import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default ({onLongPress, image, name, address, onPress}) => (
  <TouchableOpacity
    style={styles.favorite}
    onPress={onPress}
    onLongPress={onLongPress}>
    <Image
      style={{width: 130, height: 100, marginRight: 8}}
      source={{uri: image}}
    />
    <View style={styles.viewName}>
      <Text style={styles.txtFavoriteName}>{name}</Text>

      <View style={styles.viewAddress}>
        <Image
          style={{width: 25, height: 25, marginTop: 8}}
          source={require('../../../image/location.png')}
        />
        <Text style={styles.txtFavorite}>{address}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  favorite: {
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: 'white',
    elevation: 3,
  },
  viewAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewName: {
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  txtFavorite: {
    fontSize: 16,
    marginRight: 8,
    width: 230,
    marginTop: 5,
    marginLeft: 8,
  },
  txtFavoriteName: {
    fontSize: 18,
    marginRight: 8,
    width: 250,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
