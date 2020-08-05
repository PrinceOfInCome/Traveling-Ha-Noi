import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
import ButtonMaps from '../../component/button/buttonClick';
import Geolocation from 'react-native-geolocation-service';

var {width, heigh} = Dimensions.get('window');
const HEADER_MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 65;
const HEADER_MAX_HEIGHT = 400;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import getDirections from 'react-native-google-maps-directions';

export default function AboutFood({navigation, route}) {
  const scrollYAnimatedValue = useRef(new Animated.Value(0)).current;
  const {params} = route;
  const [currentLocation, setCurrentLocation] = useState('');
  const {
    latitudes,
    longitudes,
    imageTitle,
    image1,
    image2,
    name,
    address,
    price,
    timeOpen,
    description,
    introduction,
  } = params;
;
  const headerTranslate = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['#e91e63', '#FFF'],
    extrapolate: 'clamp',
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollYAnimatedValue}}},
        ])}>
        <View style={{flex: 1, marginTop: 16}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Introduction
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>{introduction}</Text>
          <Image
            style={styles.image}
            source={{
              uri: image2,
            }}
          />
          <Text style={{fontSize: 16, margin: 16}}>{description}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Price:
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>{price}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Address
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>
            {name} {address}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Times open
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>{timeOpen}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            About Image
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image1}
              source={{
                uri: image1,
              }}
            />
            <Image
              style={styles.image2}
              source={{
                uri: image2,
              }}
            />
          </View>
          <ButtonMaps
            colors="orange"
            title="View on Google Map"
            onPress={() =>
              navigation.navigate('GoogleMaps', {
                latitudes: latitudes,
                longitudes: longitudes,
                imageTitle: imageTitle,
                image1: image1,
                image2: image2,
                name: name,
                address: address,
                price: price,
                timeOpen: timeOpen,
                description: description,
                introduction: introduction,
              })
            }
          />
        </View>
      </ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}
          source={{
            uri: imageTitle,
          }}
        />
      </Animated.View>
      <Animated.View
        style={[styles.animatedHeaderContainer, {height: headerHeight}]}>
        <TouchableOpacity
          style={styles.btnGoBack}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../image/left.png')}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFavorite}
          onPress={() => alert('Favorite')}>
          <Image
            source={require('../../image/heart.png')}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnShare}
          onPress={() => alert('Share')}>
          <Image
            source={require('../../image/share.png')}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 0 : 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  image2: {
    width: (width - 48) / 2,
    height: 150,
    marginRight: 16,
    marginTop: 16,
  },
  image: {
    width: width - 32,
    height: 300,
    marginRight: 16,
    marginLeft: 16,
  },
  image1: {
    width: (width - 48) / 2,
    height: 150,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  btnGoBack: {
    borderRadius: 100,
    width: 35,
    height: 35,
    backgroundColor: '#E4E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    left: 16,
    top: Platform.OS == 'ios' ? 45 : 15,
  },
  btnFavorite: {
    borderRadius: 100,
    width: 35,
    height: 35,
    backgroundColor: '#E4E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    left: 275,
    top: Platform.OS == 'ios' ? 45 : 15,
  },
  btnShare: {
    borderRadius: 100,
    width: 35,
    height: 35,
    backgroundColor: '#E4E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    left: 295,
    top: Platform.OS == 'ios' ? 45 : 15,
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
});
