import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Header from '../../component/header';
var {width, height} = Dimensions.get('window');
export default function News({navigation, route}) {
  const {params} = route;
  const {title, img, imgDes, information1, information2, newsTitle} = params;
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()} title="News" />
      <ScrollView>
        <View style={styles.viewNew}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.newTxt}>{newsTitle}</Text>
          <Image source={{uri: img}} style={styles.imgNew} />
          <Text style={styles.newTxt}>{information1}</Text>
          <Image source={{uri: imgDes}} style={styles.imgNew} />
          <Text style={styles.newTxt}>{information2}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewNew: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  newTxt: {
    fontSize: 16,
  },
  imgNew: {
    width: width - 32,
    height: 300,
    marginTop: 16,
    marginBottom: 16,
  },
});
