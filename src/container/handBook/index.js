import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import Header from '../../component/header';
var {width, height} = Dimensions.get('window');
import HtmlContent from '../../service/html/index';
import HTML from 'react-native-render-html';

export default function HandBook({navigation}) {
  useEffect(() => {
    console.log('Width: ', width);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Hand Book"
        onPress={() => navigation.navigate('BottomNavigator')}
      />
      <ScrollView>
        <View style={styles.viewIntro}>
          <Image
            style={{width: width - 32, height: 300}}
            source={require('../../image/chua1cot.jpg')}
          />
          <View style={styles.viewText} />
          <Text style={styles.txtTile}>TOURISM HANDS, HANOI TOURIST</Text>
        </View>
        
        <View style={{marginLeft: 16, marginRight: 16}}>
          <HTML
            html={HtmlContent}
            imagesMaxWidth={width - 32}
            imagesMaxHeight={300}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  viewText: {
    width: width - 32,
    height: 50,
    backgroundColor: 'white',
    opacity: 0.4,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewIntro: {
    marginLeft: 16,
    marginRight: 16,
  },
  txtTile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    bottom: 135,
    left: Platform.OS == 'ios' ? 25 : 10,
  },
  scrollView: {marginBottom: Platform.OS == 'ios' ? 50 : 60},
  txt1: {
    fontSize: 16,
  },
  txtText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  txtDes: {
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  viewDes: {
    marginLeft: 16,
    marginRight: 16,
  },
  titleSeason: {fontSize: 16, fontWeight: 'bold'},
  txtSeason: {
    fontSize: 16,
  },
  imgDes: {
    width: width - 32,
    height: 300,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});
