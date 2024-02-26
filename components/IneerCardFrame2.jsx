import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const IneerCardFrame2 = ({title, img, screenName}) => {
  const navigation = useNavigation();

  const handlepressiner = () => {
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity className="py-2" onPress={handlepressiner}>
      <View className="flex mx-5 w-11   items-center ">
        <View className="bg-[#EFF2F4] items-center justify-center rounded-full h-[49px] w-[49px] ">
          <Image className="h-[32px] w-[33px]" source={img} />
        </View>
      </View>
      <Text className=" mt-1 text-black text-center text-[10px] leading-[10px] ">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IneerCardFrame2;

const styles = StyleSheet.create({});
