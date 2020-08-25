import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import ButtonFacebook from '../../component/button/buttomFacebook';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import firebaseApp from '../../service/api/index';
import * as firebase from 'firebase';
import {setUniqueValue} from '../../utility/constants/index';
import {setAsyncStorage, keys} from '../../asyncStorage';

export default function LoginFacebook({navigation}) {
  const onLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      const tokenData = await AccessToken.getCurrentAccessToken();
      const token = await tokenData.accessToken.toString();
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token,
      );

      const user = await firebaseApp.auth().signInWithCredential(credential);
      const data = user.user.providerData;
      data.forEach(dataFb => {
        if (user != null) {
          setAsyncStorage(keys.uuid, user.user.uid);
          setUniqueValue(user.user.uid);
          firebaseApp
            .database()
            .ref('user/' + user.user.uid)
            .set({
              uid: dataFb.uid,
              userName: dataFb.displayName,
              imgAvatar: dataFb.photoURL,
              phone: dataFb.phoneNumber,
              email: dataFb.email,
              uuid: user.user.uid,
            });
          navigation.navigate('BottomNavigator');
        }
      });
    } catch (error) {
      console.log(error);
      //alert(error.message);
    }
  };
  return (
    <>
      <ImageBackground
        style={styles.container}
        source={require('../../image/cauLongBien.jpg')}>
        <Text style={styles.txtTitle}>
          We wish you a great experience Thanks !
        </Text>
        <ButtonFacebook
          title="Login With Facebook"
          onPress={() => onLoginFacebook()}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('BottomNavigator')}>
          <Text style={styles.txtSkip}>Skip</Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    color: 'white',
    fontSize: 53,
    alignSelf: 'center',
    marginLeft: 16,
    marginRight: 16,
    fontFamily: Platform.OS == 'ios' ? null : 'DancingScript-VariableFont_wght',
  },
  txtSkip: {
    fontSize: 16,
    color: '#CCC',
    marginTop: 40,
  },
});
