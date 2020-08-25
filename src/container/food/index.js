import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';
import Header from '../../component/header';
import CardItem from '../../component/card/cardItem';
import firebaseApp from '../../service/api/index';
export default function Food({navigation}) {
  const [allFood, setAllFood] = useState([]);
  useEffect(() => {
    function fetchAPI() {
      try {
        firebaseApp
          .database()
          .ref('data/Food')
          .on('value', dataSnapshot => {
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
                uid: child.key,
                contact: child.val().Contact,
              });
            });
            setAllFood(food);
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
        title="Food"
        onPress={() => navigation.navigate('BottomNavigator')}
      />

      {/* <Text
        style={{
          fontSize: Platform.OS == 'ios' ? 24 : 32,
          margin: 16,
          color: Platform.OS == 'ios' ? '#707070' : 'black',
          fontFamily:
            Platform.OS == 'ios' ? null : 'DancingScript-VariableFont_wght',
        }}>
        Welcome we will introduce to you the best food in Hanoi.
      </Text> */}
      <FlatList
        data={allFood}
        renderItem={({item}) => (
          <CardItem
            image={item.image2}
            name={item.name}
            address={item.address}
            onPressAbouts={() => {
              navigation.navigate('AboutFood', {
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
                contact: item.contact,
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
  container: {
    flex: 1,
  },
});
