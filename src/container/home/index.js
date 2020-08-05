import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';
import CardNew from '../../component/card/cardNew';
import TabBar from '../../component/tabBar';
import firebaseApp from '../../service/api/index';

var {width, height} = Dimensions.get('window');
var today = new Date();
var dateTime =
  'Day ' +
  today.getDate() +
  ' Month ' +
  (today.getMonth() + 1) +
  ' Year ' +
  today.getFullYear();
export default function Home({navigation}) {
  const [cities, setCities] = useState([]);
  const [allNew, setAllNew] = useState([]);
  const [info, setInfo] = useState({
    icon: '',
  });
  useEffect(() => {
    async function fetchApiWeather() {
      fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=ha%20noi&APPID=3945e743bedd3454dda78b8df8cb34db',
      )
        .then(item => item.json())
        .then(cityData => {
          setCities(cityData);
          setInfo({icon: cityData.weather[0].icon});
        })
        .catch(error => {
          console.log(error);
        });
    }
    async function getDataFB() {
      try {
        firebaseApp
          .database()
          .ref('data/News')
          .on('value', dataSnapshot => {
            let news = [];
            dataSnapshot.forEach(child => {
              news.push({
                title: child.val().title,
                img: child.val().img,
                imgDes: child.val().imgDes,
                information1: child.val().information1,
                information2: child.val().information2,
                newsTitle: child.val().newsTitle,
              });
            });
            setAllNew(news);
          });
      } catch (error) {
        alert(error.message);
      }
    }

    fetchApiWeather();
    getDataFB();
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
      />

      <Image
        style={{width: width, height: 450, borderBottomRightRadius: 60}}
        source={require('../../image/TranQuoc.jpg')}
      />
      <View style={styles.viewText}>
        <Text
          style={{
            fontSize: 24,
            color: 'white',
            marginLeft: 16,
            fontWeight: '700',
          }}>
          Hi, Chiến đep trai
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: 'white',
            marginLeft: 16,
          }}>
          Where do you want to go ?
        </Text>
        {cities != '' ? (
          <>
            <View style={styles.viewWeather} />
            <View style={styles.viewTxtWeather}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: 8,
                  color: 'white',
                }}>
                {cities.name + ', ' + cities.sys.country}
              </Text>
              <Text style={{fontSize: 14, color: 'black', color: 'white'}}>
                {dateTime}
              </Text>
            </View>
            <View style={styles.viewTemp}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  color: 'black',
                  color: 'white',
                }}>
                {cities.main.temp - 272.15 + ' ˚C'}
              </Text>
              <Image
                style={{width: 50, height: 50, marginLeft: 8}}
                source={{
                  uri: 'https://openweathermap.org/img/w/' + info.icon + '.png',
                }}
              />
            </View>
          </>
        ) : null}

        <TabBar
          onPressFood={() => navigation.navigate('Food')}
          onPressTraveler={() => navigation.navigate('Destination')}
          onPressIntroduce={() => navigation.navigate('Introduce')}
          onPressHandbook={() => navigation.navigate('HandBook')}
        />
        <Text
          style={{
            margin: 16,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          News
        </Text>
        <FlatList
          style={styles.fatList}
          data={allNew}
          numColumns={2}
          renderItem={({item}) => (
            <CardNew
              img={item.img}
              title={item.title}
              onPressNews={() => {
                navigation.navigate('News', {
                  title: item.title,
                  img: item.img,
                  imgDes: item.imgDes,
                  information1: item.information1,
                  information2: item.information2,
                  newsTitle: item.newsTitle,
                });
              }}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    flex: 1,
    position: 'absolute',
    top: 16,
    left: 0,
    marginTop: Platform.OS == 'ios' ? 32 : 0,
  },
  fatList: {
    height: 200,
    marginLeft: 16,
    marginBottom: 50,
  },
  viewWeather: {
    width: width,
    height: 80,
    position: 'absolute',
    top: Platform.OS == 'ios' ? 320 : 355,
    backgroundColor: 'white',
    opacity: 0.3,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  viewTxtWeather: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 335 : 365,
    left: 24,
  },
  viewTemp: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 335 : 365,
    right: Platform.OS == 'ios' ? 30 : 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
