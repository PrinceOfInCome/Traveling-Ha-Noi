import React, {useContext} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {Store} from '../../context/store';

export default function Loader() {
  const globalState = useContext(Store);
  const {mapLoaderState} = globalState;
  const {loading} = mapLoaderState;

  return loading ? (
    <Modal animationType="fade" transparent visible={loading}>
      <View style={styles.wrapper}>
        <View style={styles.loaderContainer}>
          <BallIndicator color="#f57f17" />
        </View>
      </View>
    </Modal>
  ) : null;
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loaderContainer: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 15,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -45,
    marginTop: -45,
  },
  loaderImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    position: 'relative',
    left: '50%',
    marginLeft: -35,
    top: '50%',
    marginTop: -35,
  },
});
