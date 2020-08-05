import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
var {width, height} = Dimensions.get('window');
export default ({
  onPressFood,
  onPressIntroduce,
  onPressTraveler,
  onPressHandbook,
}) => (
  <ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    style={styles.scrollView}>
    <View style={styles.viewTab}>
      <TouchableOpacity style={styles.btnFood} onPress={onPressFood}>
        <Image
          style={styles.imgFood}
          source={require('../../image/soup.png')}
        />
        <Text style={styles.txtTab}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnTraveler} onPress={onPressTraveler}>
        <Image
          style={styles.imgTraveler}
          source={require('../../image/traveler.png')}
        />
        <Text style={styles.txtTab}>Destination</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnIntroduce} onPress={onPressIntroduce}>
        <Image
          style={styles.imgIntroduce}
          source={require('../../image/history.png')}
        />
        <Text style={styles.txtTab}>Introduce</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnTraveler} onPress={onPressHandbook}>
        <Image
          style={styles.imgTraveler}
          source={require('../../image/book.png')}
        />
        <Text style={styles.txtTab}>Handbook</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  viewTab: {
    marginTop: Platform.OS == 'ios' ? 360 : 376,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  scrollView: {
    width: 300,
    marginLeft: 55,
  },
  btnFood: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgFood: {
    width: 30,
    height: 30,
  },
  btnIntroduce: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 32,
    borderColor: '#707070',
  },
  imgIntroduce: {
    width: 30,
    height: 30,
  },
  btnTraveler: {
    width: 100,
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 32,
    borderColor: '#707070',
  },
  imgTraveler: {
    width: 30,
    height: 30,
  },
  txtTab: {
    fontSize: 12,
    color: '#707070',
  },
});
