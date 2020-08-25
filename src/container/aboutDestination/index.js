import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import ButtonMaps from '../../component/button/buttonClick';
import firebaseApp from '../../service/api/index';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share';
import {uuid} from '../../utility/constants';
import CardComment from '../../component/card/cardComment';
var {width, heigh} = Dimensions.get('window');
const HEADER_MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 65;
const HEADER_MAX_HEIGHT = 400;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function AboutDestination({navigation, route}) {
  const scrollYAnimatedValue = useRef(new Animated.Value(0)).current;
  const [review, setReview] = useState({
    review: '',
  });

  const [imgSource, setImgSource] = useState('');
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState({userName: '', imageAvatar: '', uuid});

  const {params} = route;
  const {
    latitudes,
    longitudes,
    imageTitle,
    image1,
    image2,
    name,
    address,
    price,
    timeOpen,
    description,
    uid,
  } = params;
  useEffect(() => {
    async function fetchUser() {
      await firebaseApp
        .database()
        .ref('user')
        .on('value', dataUser => {
          let currentUser = {
            uuid: '',
            img: '',
            name: '',
          };

          dataUser.forEach(child => {
            if (uuid == child.val().uuid) {
              (currentUser.uuid = child.val().uuid),
                (currentUser.name = child.val().userName),
                (currentUser.img = child.val().imgAvatar);
            }
          });
          setUser(currentUser);
        });
    }
    async function fetchComment() {
      await firebaseApp
        .database()
        .ref(`Comment/Destination/${uid}`)
        .on('value', dataSnapshot => {
          const comment = [];
          dataSnapshot.forEach(child => {
            console.log(child);
            comment.push({
              imgAvatar: child.val().imageAvatar,
              imgComment: child.val().imageComment,
              txtComment: child.val().textComment,
              uuid: child.val().uuid,
            });
          });
          setComment(comment);
        });
    }
    fetchComment();
    fetchUser();
  }, []);
  const headerTranslate = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['#e91e63', '#FFF'],
    extrapolate: 'clamp',
  });
  const handleOnChange = (name, value) => {
    setReview({
      ...review,
      [name]: value,
    });
  };
  const onFavorite = async () => {
    if (!uuid) {
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
      Toast.show('Save to favorites list ', Toast.LONG);

      firebaseApp
        .database()
        .ref(`user/${uuid}/favoriteDestination/${uid}`)
        .set({
          latitudes: latitudes,
          longitudes: longitudes,
          imageTitle: imageTitle,
          image1: image1,
          image2: image2,
          name: name,
          address: address,
          price: price,
          timeOpen: timeOpen,
          description: description,
          uid: uid,
        });
      Toast.show('Save to favorites list ', Toast.LONG);
    }
  };
  const onShare = async () => {
    const shareOptions = {
      message: 'To Hanoi must try this dish',
      title: name,
      url: imageTitle,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const onInsertImage = async () => {
    if (!uuid) {
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
      const options = {
        storageOptions: {
          skipBackup: true,
        },
      };
      ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // Base 64 image:
          let sources = 'data:image/jpeg;base64,' + response.data;
          setImgSource(sources);
        }
      });
    }
  };
  const onReview = async () => {
    if (!uuid) {
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
      await firebaseApp
        .database()
        .ref(`Comment/Destination/${uid}`)
        .push({
          userNam: user.name,
          imageAvatar: user.img,
          uuid: user.uuid,
          imageComment: imgSource,
          textComment: review.review,
        });
      setReview('');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollYAnimatedValue}}},
        ])}>
        <View style={{flex: 1, marginTop: 16}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 16,
              marginBottom: 16,
            }}>
            {name}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: image1,
            }}
          />
          <Text style={{fontSize: 16, margin: 16}}>{description}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Entrance ticket:
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>{price}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Address
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>
            {name} {address}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            Times open
          </Text>
          <Text style={{fontSize: 16, margin: 16}}>{timeOpen}</Text>

          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold', margin: 16}}>
              Comments and Reviews
            </Text>

            {comment != '' ? (
              <FlatList
                style={styles.fatList}
                data={comment}
                renderItem={({item}) => (
                  <CardComment
                    imgAvatar={item.imgAvatar}
                    txtComment={item.txtComment}
                    imgComment={item.imgComment}
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            ) : null}

            <View style={styles.review}>
              <TouchableOpacity
                onPress={() => onInsertImage()}
                style={{marginBottom: 25, marginLeft: 16, marginRight: 16}}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../image/camera.png')}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.inputText}
                placeholder="Please write your review here !"
                placeholderTextColor="#999"
                value={review}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={text => handleOnChange('review', text)}
              />

              <TouchableOpacity
                style={styles.btnUser}
                onPress={() => onReview()}>
                <Image
                  style={{width: 40, height: 40, borderRadius: 100}}
                  source={require('../../image/sent.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 16}}>
            About Image
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image1}
              source={{
                uri: image1,
              }}
            />
            <Image
              style={styles.image2}
              source={{
                uri: image2,
              }}
            />
          </View>
          <ButtonMaps
            colors="orange"
            title="View on Google Map"
            onPress={() =>
              navigation.navigate('MapsDestination', {
                latitudes: latitudes,
                longitudes: longitudes,
                imageTitle: imageTitle,
                name: name,
                address: address,
              })
            }
          />
        </View>
      </ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}
          source={{
            uri: imageTitle,
          }}
        />
      </Animated.View>
      <Animated.View
        style={[styles.animatedHeaderContainer, {height: headerHeight}]}>
        <TouchableOpacity
          style={styles.btnGoBack}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../image/left.png')}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFavorite}
          onPress={() => onFavorite()}>
          <Image
            source={require('../../image/heart.png')}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnShare} onPress={() => onShare()}>
          <Image
            source={require('../../image/share.png')}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',backgroundColor: 'white'
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 0 : 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  image2: {
    width: (width - 48) / 2,
    height: 150,
    marginRight: 16,
    marginTop: 16,
  },
  image: {
    width: width - 32,
    height: 300,
    marginRight: 16,
    marginLeft: 16,
  },
  image1: {
    width: (width - 48) / 2,
    height: 150,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  btnGoBack: {
    borderRadius: 100,
    width: 35,
    height: 35,
    backgroundColor: '#E4E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    left: 16,
    top: Platform.OS == 'ios' ? 45 : 15,
  },
  btnFavorite: {
    borderRadius: 100,
    width: 35,
    height: 35,
    backgroundColor: '#E4E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    left: 275,
    top: Platform.OS == 'ios' ? 45 : 15,
  },
  btnShare: {
    borderRadius: 100,
    width: 35,
    height: 35,
    backgroundColor: '#E4E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    left: 295,
    top: Platform.OS == 'ios' ? 45 : 15,
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  inputText: {
    width: 270,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#888',
    paddingLeft: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnUser: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginBottom: 20,
    marginRight: 16,
    marginLeft: 16,
  },
  fatList: {
    width: width - 32,
    marginLeft: 16,
    marginBottom: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
