import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import CardFavorite from '../../component/card/cardFavorite';
import firebaseApp from '../../service/api/index';
import {uuid} from '../../utility/constants';

export default function Favorite({navigation}) {
  const [foods, setFoods] = useState([]);
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    async function fetchApiDestination() {
      try {
        await firebaseApp
          .database()
          .ref(`user/${uuid}/favoriteDestination`)
          .on('value', dataSnapshot => {
            const dataDestination = [];
            dataSnapshot.forEach(child => {
              dataDestination.push({
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
              setDestinations(dataDestination);
              console.log('Des', destinations);
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    async function fetchApiFood() {
      try {
        const dataFood = await firebaseApp
          .database()
          .ref(`user/${uuid}/favoriteFood`);

        dataFood.on('value', dataSnapshot => {
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
              uid: child.val().uid,
            });
          });
          setFoods(food);
          console.log(foods);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchApiFood();
    fetchApiDestination();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
          Favorite
        </Text>
      </View>

      <View style={styles.food}>
        <Text style={styles.txtTitle}>Food</Text>

        {foods != '' ? (
          <FlatList
            style={styles.fatList}
            data={foods}
            renderItem={({item}) => (
              <CardFavorite
                image={item.imageTitle}
                name={item.name}
                address={item.address}
                onPress={() => {
                  navigation.navigate('FavoriteFood', {
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
                    introduction: item.introduction,
                    uid: item.uid,
                  });
                }}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 120,
              color: '#aaa',
            }}>
            You do not have any favorite food
          </Text>
        )}
      </View>
      <View style={styles.destination}>
        <Text style={styles.txtTitle}>Destination</Text>
        {destinations != '' ? (
          <FlatList
            style={styles.fatList}
            data={destinations}
            renderItem={({item}) => (
              <CardFavorite
                image={item.imageTitle}
                name={item.name}
                address={item.address}
                onPress={() => {
                  navigation.navigate('FavoriteDestination', {
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
                    introduction: item.introduction,
                    uid: item.uid,
                  });
                }}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 120,
              color: '#AAA',
            }}>
            You do not have any favorite places
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#E6DEDE',
    backgroundColor: 'white',
  },
  food: {
    flex: 1,
  },
  destination: {
    flex: 1,
  },
  txtTitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});
