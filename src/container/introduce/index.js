import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import RenderItem from '../../component/card/renderItem';
import Header from '../../component/header';
import aboutHaNoi from '../../service/data/data';
export default function Introduce({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Introduce"
        onPress={() => navigation.navigate('BottomNavigator')}
      />
      <Text style={styles.txtAbout}>About Ha Noi:</Text>
      <FlatList
        data={aboutHaNoi}
        renderItem={({item, index}) => (
          <RenderItem
            name={item.title}
            description={item.description}
            imgAbout={item.imageAbout}
            about={item.about}>
            {' '}
          </RenderItem>
        )}
        keyExtractor={item => item.index}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  txtAbout: {
    margin: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
