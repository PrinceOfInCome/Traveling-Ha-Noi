import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Header from '../../component/header';
import CardDes from '../../component/card/cardDes';
import CardItem from '../../component/card/cardItem';
import firebaseApp from '../../service/api/index';
export default function Destination({navigation}) {
  const [allDestination, setAllDestination] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      try {
        await firebaseApp
          .database()
          .ref('data/Destination')
          .on('value', dataSnapshot => {
            let destination = [];
            dataSnapshot.forEach(child => {
              destination.push({
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
                imageTitle: child.val().imageTitle,
                uid: child.key,
              });
            });
            setAllDestination(destination);
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchAPI();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Destination"
        onPress={() => navigation.navigate('BottomNavigator')}
      />
      <Text style={styles.txtDesHorizontal}>Hot destinations</Text>
      <FlatList
        style={styles.scrollHorizontal}
        data={allDestination}
        horizontal={true}
        renderItem={({item}) => (
          <CardDes
            image={item.image1}
            name={item.name}
            address={item.address}
            onPressAbout={() => {
              navigation.navigate('AboutDestination', {
                latitudes: item.latitude,
                longitudes: item.longitude,
                imageTitle: item.imageTitle,
                image1: item.image1,
                image2: item.image2,
                name: item.name,
                address: item.address,
                price: item.price,
                timeOpen: item.timeOpen,
                description: item.description,
                imageTitle: item.imageTitle,
                uid: item.uid,
              });
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Text style={styles.txtDesHorizontal}>Best destination</Text>
      <FlatList
        style={styles.fatList}
        data={allDestination}
        renderItem={({item}) => (
          <CardItem
            image={item.imageTitle}
            name={item.name}
            address={item.address}
            onPressAbouts={() => {
              navigation.navigate('AboutDestination', {
                latitudes: item.latitude,
                longitudes: item.longitude,
                imageTitle: item.imageTitle,
                image1: item.image1,
                image2: item.image2,
                name: item.name,
                address: item.address,
                price: item.price,
                timeOpen: item.timeOpen,
                description: item.description,
                imageTitle: item.imageTitle,
                uid: item.uid,
              });
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollHorizontal: {
    marginLeft: 16,
    marginRight: 16,
  },
  txtDesHorizontal: {
    margin: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
