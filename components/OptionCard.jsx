import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';

const OptionCard = ({src, title}) => {
  return (
    <View className=" bg-[#FFFFFF] h-auto w-[90] shadow-md gap-1 mx-9 my-1 py-1 items-center rounded-lg">
      <Image className=" w-[40] h-[38]  " source={src} />
      <Text className="text-black text-[10px]">{title}</Text>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({});
