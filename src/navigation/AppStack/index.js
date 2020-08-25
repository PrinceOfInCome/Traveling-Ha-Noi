import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../../container/splash';
import LoginFacebook from '../../container/loginFacebook';
import Home from '../../container/home';
import Food from '../../container/food';
import AboutFood from '../../container/aboutFood';
import Destination from '../../container/destination';
import AboutDestination from '../../container/aboutDestination';
import Introduce from '../../container/introduce';
import Profile from '../../container/profile';
import ShowImg from '../../container/showImg';
import BottomNavigator from '../BottomNavigator';
import HandBook from '../../container/handBook';
import News from '../../container/news';
import Add from '../../container/add';
import MapsFood from '../../container/MapsFood';
import MapsDestination from '../../container/MapsDestination';
import FavoriteDestination from '../../container/favoriteDestination';
import FavoriteFood from '../../container/favoriteFood';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginFb"
          component={LoginFacebook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Food"
          component={Food}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutFood"
          component={AboutFood}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Destination"
          component={Destination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutDestination"
          component={AboutDestination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Introduce"
          component={Introduce}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HandBook"
          component={HandBook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapsFood"
          component={MapsFood}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapsDestination"
          component={MapsDestination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FavoriteDestination"
          component={FavoriteDestination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FavoriteFood"
          component={FavoriteFood}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ShowImg" component={ShowImg} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
