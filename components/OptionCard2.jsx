import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OptionCard2 = ({src, title, navi}) => {
  const navigation = useNavigation();

  const handlePressOpt = async () => {
    // if (navi === Login) {
    //   await AsyncStorage.removeItem('token');
    // }

    // await AsyncStorage.removeItem('token');

    navigation.navigate(navi);
  };
  return (
    <TouchableOpacity
      onPress={handlePressOpt}
      className=" flex-row bg-[#FFFFFF] mx-6 mt-2 rounded-md overflow-hidden h-auto w-[278] px-2 py-2 items-center ">
      <Image className=" h-[27] w-[26] mx-2 " source={src} />
      <Text className=" text-black ">{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionCard2;

const styles = StyleSheet.create({});
