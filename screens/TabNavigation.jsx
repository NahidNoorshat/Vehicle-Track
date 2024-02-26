import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {useRoute} from '@react-navigation/native';
// screens...
import Frame2 from './Frame2';
import Option from './Option';
import Notify from './Notify';
import Map from './Map';

const Tab = createBottomTabNavigator();

// icons....
import Home1 from '../assets/home-line1.png';
import Home from '../assets/home-line.png';
import Noti from '../assets/notifications.png';
import Noti1 from '../assets/notifications1.png';
import Solor from '../assets/solarmapbold.png';
import solor1 from '../assets/solarmapbold2.png';
import Opt from '../assets/vector1.png';
import Opt1 from '../assets/vector2.png';

const TabNavigation = () => {
  // const route = useRoute();
  // const {carData} = route.params;
  // console.log(carData.name);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 35,
          height: 60,
          paddingLeft: 2,
          paddingTop: 2,
          marginHorizontal: 25,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Frame2}
        options={{
          title: '',
          tabBarIcon: ({focused}) => {
            return (
              <View
                className={`items-center justify-center mt-2 w-[83] rounded-md overflow-hidden py-2 ${
                  focused ? 'bg-[#006E99]' : null
                } `}>
                <Image
                  className=" h-[19px] w-[20px] "
                  source={focused ? Home : Home1}
                />
                <Text
                  className={` font-medium ${
                    focused ? 'text-white ' : 'text-[#006E99]'
                  } `}>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notify"
        component={Notify}
        options={{
          title: '',
          tabBarIcon: ({focused}) => {
            return (
              <View
                className={`items-center justify-center mt-2 w-[83] rounded-md overflow-hidden py-2 ${
                  focused ? 'bg-[#006E99]' : null
                } `}>
                <Image
                  className=" h-[19px] w-[20px] "
                  source={focused ? Noti1 : Noti}
                />
                <Text
                  className={` font-medium ${
                    focused ? 'text-white ' : 'text-[#006E99]'
                  } `}>
                  Notify
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          title: '',
          tabBarIcon: ({focused}) => {
            return (
              <View
                className={`items-center justify-center mt-2 w-[83] rounded-md overflow-hidden py-2 ${
                  focused ? 'bg-[#006E99]' : null
                } `}>
                <Image
                  className=" h-[19px] w-[20px] "
                  source={focused ? Solor : solor1}
                />
                <Text
                  className={` font-medium ${
                    focused ? 'text-white ' : 'text-[#006E99]'
                  } `}>
                  Map
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Option"
        component={Option}
        options={{
          title: '',
          tabBarIcon: ({focused}) => {
            return (
              <View
                className={`items-center justify-center mt-2 w-[83] rounded-md overflow-hidden py-2 ${
                  focused ? 'bg-[#006E99]' : null
                } `}>
                <Image
                  className=" h-[19px] w-[20px] "
                  source={focused ? Opt1 : Opt}
                />
                <Text
                  className={` font-medium ${
                    focused ? 'text-white ' : 'text-[#006E99]'
                  } `}>
                  Option
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
