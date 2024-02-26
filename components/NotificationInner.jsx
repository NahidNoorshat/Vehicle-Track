import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';

import Icon from '../assets/9183608-1.png';

const NotificationInner = ({body}) => {
  return (
    <View className="   bg-[#FFFFFF] mx-5 mt-2 pl-3 py-3 pr-6  rounded-2xl overflow-hidden">
      <View className="flex flex-row gap-2 items-center">
        <Image className="h-[35] w-[36]  " source={Icon} />
        <View className="flex gap-1">
          <Text className="text-[14px] leading-[14.52px] text-black ">
            {body}
          </Text>
          {/* <Text className="text-black"> 19-10-2023 01:19 AM </Text> */}
        </View>
      </View>
    </View>
  );
};

export default NotificationInner;

const styles = StyleSheet.create({});
