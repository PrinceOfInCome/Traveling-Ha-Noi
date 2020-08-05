import React, {useEffect, useState, Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
var {width, height} = Dimensions.get('window');
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import mapsDarkStyle from '../../utility/maps/mapDarkStyle';
import firebaseApp from '../../service/api/index';
import ModelMaps from '../../component/model/mapModel';

export default function GoogleMaps({route, navigation}) {
  const [dataAllFood, setDataAllFood] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const {params} = route;
  const [currentFood, setCurrentFood] = useState({
    name: '',
    imageTitle: '',
    latitude: '',
    longitude: '',
    address: '',
  });
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
  useEffect(() => {
    function getLocation() {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          const {latitude, longitude} = coords;
          setCurrentLocation({
            ...currentLocation,
            latitude,
            longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    function fetchAPI() {
      const getDataFB = firebaseApp.database().ref('data/Food');
      try {
        getDataFB.on('value', dataSnapshot => {
          let food = [];
          dataSnapshot.forEach(child => {
            food.push({
              latitude: child.val().latitude,
              longitude: child.val().longitude,
              imageTitle: child.val().imageTitle,
              image1: child.val().image1,
              image2: child.val().image2,
              name: child.val().name,
              address: child.val().address,
              price: child.val().price,
              timeOpen: child.val().timeOpen,
              description: child.val().description,
              introduction: child.val().introduction,
            });
          });
          setDataAllFood(food);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAPI();
    getLocation();
    fetchAPI();
    setModalVisible(true);
  }, []);
  onShowDes = marker => {
    setVisible(true);
    setCurrentFood({
      name: marker.name,
      imageTitle: marker.imageTitle,
      latitude: marker.latitude,
      longitude: marker.longitude,
      address: marker.address,
    });
    console.log('object' + currentFood);
  };
  onDirections = () => {
    const data = {
      source: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      destination: {
        latitude: 21.033571,
        longitude: 105.846432,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [
        {
          latitude: latitudes,
          longitude: longitudes,
        },
        //  {
        //    latitude: -33.8600026,
        //    longitude: 18.697453
        //  },
        // 	{
        //    latitude: -33.8600036,
        //    longitude: 18.697493
        //  }
      ],
    };

    getDirections(data);
  };
  onDirectionsFood = () => {
    const data = {
      source: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      destination: {
        latitude: 21.033571,
        longitude: 105.846432,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
      waypoints: [
        {
          latitude: currentFood.latitude,
          longitude: currentFood.longitude,
        },
        //  {
        //    latitude: -33.8600026,
        //    longitude: 18.697453
        //  },
        // 	{
        //    latitude: -33.8600036,
        //    longitude: 18.697493
        //  }
      ],
    };

    getDirections(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnGoBack}
        onPress={() => navigation.goBack()}>
        <Image
          style={{width: 30, height: 30}}
          source={require('../../image/left.png')}
        />
      </TouchableOpacity>
      <MapView
        style={[styles.map]}
        showsMyLocationButton={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        pitchEnabled={true}
        showsCompass={true}
        liteMode={false}
        showsTraffic={true}
        showsIndoors={true}
        initialRegion={{
          latitude: Number(latitudes),
          longitude: Number(longitudes),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {dataAllFood.map((marker, index) => (
          <Marker
            style={{width: 10, height: 100}}
            coordinate={{
              latitude: Number(marker.latitude),
              longitude: Number(marker.longitude),
            }}
            title={marker.name}
            image={require('../../image/map_marker.png')}
            onPress={() => onShowDes(marker)}
          />
        ))}
      </MapView>
      <ModelMaps
        modalVisible={modalVisible}
        image={imageTitle}
        name={name}
        onDirections={() => onDirections()}
        address={address}
        onClose={() => setModalVisible(false)}
      />
      <ModelMaps
        modalVisible={visible}
        image={currentFood.imageTitle}
        name={currentFood.name}
        address={currentFood.address}
        onDirections={() => onDirectionsFood()}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  btnGoBack: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#FFF',
    elevation: 5,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: Platform.OS == 'ios' ? 56 : 16,
    left: 16,
    borderRadius: 10,
    zIndex: 100,
  },
});
