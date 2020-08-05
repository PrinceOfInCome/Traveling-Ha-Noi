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
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
var {width, height} = Dimensions.get('window');
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';

// const initialState = {
//   latitudes: 21.040907,
//   longitudes: 105.834354,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// };
// export default function GoogleMaps({navigation, route}) {
//   const {params} = route;
//   const {
//     latitude,
//     longitude,
//     imageTitle,
//     image1,
//     image2,
//     name,
//     address,
//     price,
//     timeOpen,
//     description,
//     introduction,
//   } = params;
//   const [currentPosition, setCurrentPosition] = useState(initialState);
//   const [bottom, setBottom] = useState(1);
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={[
//           styles.map,
//           // , {marginBottom: bottom}
//         ]}
//         showsMyLocationButton={true}
//         showsUserLocation={true}
//         provider={PROVIDER_GOOGLE}
//         //   onPress={(location) => {
//         //     this.setState({container: location.nativeEvent.coordinate});
//         //   }}
//         initialRegion={{
//           latitude: currentPosition.latitudes,
//           longitude: currentPosition.longitudes,
//           latitudeDelta: currentPosition.latitudeDelta,
//           longitudeDelta: currentPosition.longitudeDelta,
//         }}
//         // onMapReady={() => {
//         //   setBottom(100);
//         // }}
//       >
//         <Marker
//           coordinate={{latitude, longitude}}
//           title="Hello"
//           description=""
//         />
//       </MapView>
//       <Button
//         title="Click"
//         onPress={() => console.log('Hello' + latitude, longitude, name)}
//       />
//     </View>
//   );
// }

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinate: {
        latitudes: 21.040907,
        longitudes: 105.834354,
      },
      marginBottom: 1,
    };
  }
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 21.040907,
        longitude: 105.834354,
      },
      destination: {
        latitude: 21.032601, 
        longitude: 105.766257,
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
      //   waypoints: [
      //     {
      //       latitude: -33.8600025,
      //       longitude: 18.697452,
      //     },
      //     {
      //       latitude: -33.8600026,
      //       longitude: 18.697453,
      //     },
      //     {
      //       latitude: -33.8600036,
      //       longitude: 18.697493,
      //     },
      //   ],
    };

    getDirections(data);
  };
  async componentDidMount() {
    await Geolocation.getCurrentPosition(
      ({coords}) => {
        this.setState({latitudes: coords.latitude});
        this.setState({longitudes: coords.longitude});
        console.log('Location: ', coords);
      },
      error => {
        alert(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  render() {
    const {
      latitude,
      longitude,
      imageTitle,
      image1,
      image2,
      name,
      address,
      price,
      timeOpen,
      description,
      introduction,
    } = this.props.route.params;
    const {latitudes, longitudes} = this.state.coordinate;
    const {locationX, locationY} = this.state;
    if (!this.state.coordinate) {
      return <ActivityIndicator />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <MapView
            style={[styles.map, {marginBottom: this.state.marginBottom}]}
            showsMyLocationButton={true}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            //   onPress={(location) => {
            //     this.setState({container: location.nativeEvent.coordinate});
            //   }}
            initialRegion={{
              latitude: latitudes,
              longitude: longitudes,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onMapReady={() => {
              this.setState({marginBottom: 100});
            }}>
            <Marker
              coordinate={{
                latitude: latitudes,
                longitude: longitudes,
              }}
              title={name}
              description="Des"
            />
          </MapView>
          <Button onPress={this.handleGetDirections} title="Get Directions" />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
