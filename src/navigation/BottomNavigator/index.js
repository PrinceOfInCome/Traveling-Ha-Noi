import * as React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Home from '../../container/home';
import Profile from '../../container/profile';
import Favorite from '../../container/favorite';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#F37A00',
        inactiveTintColor: '#999',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-home"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="ios-heart"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="md-person"
              color={color}
              size={32}
              style={{textAlignVertical: 'center'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigator;
