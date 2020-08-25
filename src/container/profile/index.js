import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import firebaseApp from '../../service/api/index';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonApp from '../../component/button/buttonClick';
import {LoginManager} from 'react-native-fbsdk';
import {uuid} from '../../utility/constants';
import {clearAsyncStorage, keys} from '../../asyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

export default function Profile({navigation}) {
  const [user, setUser] = useState({
    uid: '',
    email: '',
    imgAvatar: '',
    userName: '',
    phone: '',
  });
  useEffect(() => {
    function getApiUser() {
      firebaseApp
        .database()
        .ref('user')
        .on('value', dataUser => {
          let currentUser = {
            uid: '',
            email: '',
            imgAvatar: '',
            userName: '',
            phone: '',
          };

          dataUser.forEach(child => {
            if (uuid == child.val().uuid) {
              (currentUser.uid = uuid),
                (currentUser.userName = child.val().userName),
                (currentUser.phone = child.val().phone),
                (currentUser.email = child.val().email),
                (currentUser.imgAvatar = child.val().imgAvatar);
            }
          });
          setUser(currentUser);
        });
    }
    getApiUser();
  }, []);
  handleOnSignOut = () => {
    console.log(user, 'user');
    if (user.userName == '') {
      Alert.alert(
        'Alert',
        'Please login to your account ! \nClick ok to login your account',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('LoginFb')},
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Warning',
        'All your information has been deleted !\nYou definitely want to log out ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => onSignOut()},
        ],
        {cancelable: false},
      );
    }
  };

  onSignOut = async () => {
    await clearAsyncStorage();
    await firebaseApp
      .database()
      .ref(`user/${uuid}`)
      .remove();

    LoginManager.logOut();
    navigation.navigate('LoginFb');
  };
  onExit = () => {
    Alert.alert(
      'Alert',
      'Are you exit ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
          Profile
        </Text>
        <TouchableOpacity onPress={() => onExit()}>
          <Image
            style={{marginRight: 16, width: 25, height: 25}}
            source={require('../../image/sign-out.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.user}>
        {user.imgAvatar ? (
          <Image
            style={{width: 120, height: 120, borderRadius: 100}}
            source={{uri: user.imgAvatar}}
          />
        ) : (
          <Image
            style={{width: 120, height: 120, borderRadius: 100}}
            source={require('../../image/cauLongBien.jpg')}
          />
        )}

        <Text style={{fontSize: 24, marginTop: 30}}>{user.userName}</Text>
      </View>
      <View style={styles.information}>
        <View style={styles.viewIpm}>
          {user.email ? (
            <>
              <Image
                source={require('../../image/mail.png')}
                style={{width: 30, height: 30, marginLeft: 16, marginRight: 16}}
              />
              <Text style={{fontSize: 18, color: '#707070'}}>{user.email}</Text>
            </>
          ) : (
            <Text style={{fontSize: 18, color: '#707070'}}>Please login !</Text>
          )}
        </View>
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginLeft: 32,
          marginTop: 20,
        }}>
        Information app
      </Text>
      <View style={styles.information}>
        <View style={styles.viewIpm}>
          <Text style={{fontSize: 18, color: '#707070', marginLeft: 16}}>
            Terms of application
          </Text>
        </View>
        <View style={styles.viewIpm}>
          <Text style={{fontSize: 18, color: '#707070', marginLeft: 16}}>
            Developed by chiendeptrai
          </Text>
        </View>
      </View>
      <ButtonApp
        title="Sign Out"
        colors="#F57F17"
        onPress={() => handleOnSignOut()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'space-between',
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#E6DEDE',
  },
  user: {
    alignItems: 'center',
    marginTop: 50,
  },
  information: {
    marginTop: 40,
  },
  viewIpm: {
    marginLeft: 16,
    marginRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6DEDE',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 5,
  },
});
