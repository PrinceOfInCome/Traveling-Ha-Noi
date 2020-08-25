import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import {getAsyncStorage, keys} from '../../asyncStorage/index';
import {setUniqueValue} from '../../utility/constants/index';

export default function Splash({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then(uuid => {
          console.log(uuid);
          if (uuid) {
            setUniqueValue(uuid);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 2000,
            }).start(() => {
              navigation.navigate('BottomNavigator');
            });
          } else {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 2000,
            }).start(() => {
              navigation.navigate('LoginFb');
            });
          }
        })
        .catch(error => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
          }).start(() => {
            navigation.navigate('LoginFb');
          });
        });
    }, 1000);
    return () => clearTimeout(redirect);
  }, [navigation]);

  return (
    <>
      <StatusBar hidden={true} translucent={true} />
      <ImageBackground
        style={styles.container}
        source={require('../../image/hoGuom.jpg')}>
        <View style={{marginBottom: 100}}>
          <Animated.Text style={[styles.txtTitle, {opacity: fadeAnim}]}>
            Welcome to
          </Animated.Text>
          <Animated.Text style={[styles.txtTitle, {opacity: fadeAnim}]}>
            Ha Noi, Viet Nam
          </Animated.Text>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  txtTitle: {
    color: 'white',
    fontSize: 53,
    alignSelf: 'center',
    marginLeft: 16,
    marginRight: 16,
    fontFamily: Platform.OS == 'ios' ? null : 'DancingScript-VariableFont_wght',
  },
});
