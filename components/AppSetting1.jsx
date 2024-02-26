import {StyleSheet, Image, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import Bell from '../assets/-icon-bell.png';
// import Status from '../assets/Group31.png';

const AppSetting1 = ({title}) => {
  const [notificatinOn, setNotificatonOn] = useState(false);
  return (
    <View className=" bg-[#FFFFFF] mx-2 px-3 mt-2 items-center rounded-xl shadow-md py-2 flex-row  ">
      <Image className="h-[19.92] w-[17]" source={Bell} />
      <Text className="flex-1 ml-2 text-black ">{title}</Text>
      <Switch
        value={notificatinOn}
        onValueChange={() => setNotificatonOn(previous => !previous)}
      />
    </View>
  );
};

export default AppSetting1;

const styles = StyleSheet.create({});
