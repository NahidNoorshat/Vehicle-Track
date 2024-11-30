import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import Playback from '../screens/Playback';
import LiveTracking from '../screens/LiveTracking';
import Dashbord from '../screens/Dashbord';

const CarDiaplayhome = ({setDisplay, dislpay, data}) => {
  const {iemei} = useContext(AuthContext);
  // const {devicedata} = useContext(AuthContext);
  const route = useRoute();
  const routeName = route.name;

  const hendlePressframe2 = () => {
    setDisplay(!dislpay);
  };

  // console.log(
  //   'ti si sfo chekcing............... 999999999999999999999999',
  //   data,
  // );

  // navigation for playback......................

  const navigation = useNavigation();

  const handeplayback = () => {
    navigation.navigate(Playback);
  };
  const handlelivetrackin = () => {
    navigation.navigate(LiveTracking);
  };
  const handleDhashbord = () => {
    navigation.navigate(Dashbord);
  };

  return (
    <View className=" pb-1 bg-[#006e99] mt-5 mx-5 h-auto w-auto rounded-lg overflow-hidden">
      <View className=" bg-[#FFFFFF] p-3  rounded-lg overflow-hidden">
        <View className="flex flex-row  ">
          <View className="flex mx-2 ">
            <Image
              resizeMode="cover"
              className=" h-[63px] w-[100px]"
              source={require('../assets/car--convertible-005removebgpreview-1.png')}
            />
            <View className=" px-3 text-left ">
              <Text className="font-semibold text-black text-[12px] leading-[14.52px] mb-1 ">
                {/* DM KA 12-2563 */}
                {data?.name}
              </Text>
              <View className="flex flex-row gap-2 mb-1 items-center">
                <Image
                  className="h-[11.03px] w-[15px] "
                  resizeMode="cover"
                  source={require('../assets/group.png')}
                />
                <Text className="text-[10px] leading-[12.1px] text-black ">
                  {data?.location_data?.speed}/h
                </Text>
              </View>
              <View className="flex flex-row gap-2 w-[130px] ">
                <Image
                  className=" h-[14px] w-[14px]   "
                  resizeMode="cover"
                  source={require('../assets/eloff.png')}
                />
                <Text className="text-[10px] leading-[12.1px] text-black">
                  {data?.status}
                </Text>
                <Text className="text-[10px] leading-[12.1px] text-black">
                  {data?.status_time}
                </Text>
              </View>
            </View>
          </View>

          {/* side of code............... */}
          <View className="flex  pl-7  gap-2  pt-3 mt-4   ">
            <TouchableOpacity onPress={handlelivetrackin}>
              <View className=" flex flex-row items-center gap-3">
                <Image
                  className=" h-[18px] w-[18px] "
                  resizeMode="cover"
                  source={require('../assets/group4.png')}
                />
                <Text className="text-black text-[12px] leading-[14.52px]">
                  Live tracking
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handeplayback}>
              <View className=" flex flex-row items-center gap-3">
                <Image
                  className=" h-[18px] w-[18px] "
                  resizeMode="cover"
                  source={require('../assets/carbonplayoutline.png')}
                />
                <Text className="text-black text-[12px] leading-[14.52px]">
                  Playback
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDhashbord}>
              <View className=" flex flex-row items-center gap-3">
                <Image
                  className=" h-[18px] w-[18px] "
                  resizeMode="cover"
                  source={require('../assets/materialsymbolsdashboard.png')}
                />
                <Text className="text-black text-[12px] leading-[14.52px]">
                  Dashboard
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {routeName !== 'Map' ? (
            <TouchableOpacity onPress={hendlePressframe2}>
              <Image
                className=" mb-16 h-[19px] w-[18px] ml-9  "
                resizeMode="cover"
                source={require('../assets/icbaselinemenuopen.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CarDiaplayhome;

const styles = StyleSheet.create({});
