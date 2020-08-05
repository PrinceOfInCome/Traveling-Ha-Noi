import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
var {width, height} = Dimensions.get('window');
export default function ModalMaps({
  modalVisible,
  onClose,
  onDirections,
  image,
  name,address
}) {
  return (
    <Modal animationType="side" transparent visible={modalVisible}>
      <View style={styles.viewMaps}>
        <Image style={styles.imgMaps} source={{uri: image}} />
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Text style={styles.txtClose}>X</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
  <Text style={styles.feedBack}>{address}</Text>

        <TouchableOpacity style={styles.btnDirections} onPress={onDirections}>
          <Text style={styles.txtDirections}>Directions</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewModel: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#DDD',
    width: width,
    height: height / 3,
  },
  viewMaps: {
    width: width - 48,
    marginLeft: 24,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 30,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgMaps: {
    width: width - 48,
    height: 200,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  feedBack: {
    fontSize: 16,
    marginLeft: 8,
  },
  btnDirections: {
    width: 200,
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 5,
    margin: 16,
    alignSelf: 'center',
    padding: 5,
  },
  txtDirections: {
    fontSize: 16,
    textAlign: 'center',
  },
  close: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    position: 'absolute',
    right: -15,
    top: -15,
    justifyContent: 'center',
    borderRadius: 100,
  },
  txtClose: {
    textAlign: 'center',
  },
});
