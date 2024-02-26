import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Objectinfobox = ({title, imgsrc, objectinfo}) => {
  return (
    <View className="  w-[180px] bg-white flex flex-row justify-between rounded-lg shadow-xl overflow-hidden px-3 py-2 mx-1 my-2 items-center ">
      <View>
        <Text className=" text-black   ">{title}</Text>
        <Text className=" text-sm text-blue-800  font-semibold ">
          {objectinfo ? objectinfo : null}
        </Text>
      </View>
      <Image source={imgsrc} className=" h-6 w-6 " />
    </View>
  );
};

export default Objectinfobox;

const styles = StyleSheet.create({});
