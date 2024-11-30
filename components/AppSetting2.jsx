import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Bell from '../assets/-icon-bell.png';
import {useNavigation} from '@react-navigation/native';

const AppSetting2 = ({title, setModal, naigator, icon}) => {
  const navigation = useNavigation();
  const handlepress = () => {
    if (setModal) {
      setModal(true);
    }
    if (naigator) {
      navigation.navigate(naigator);
    }
  };
  return (
    <TouchableOpacity
      onPress={handlepress}
      className=" bg-[#FFFFFF] mx-2 px-3 mt-2 items-center rounded-xl shadow-md py-2 flex-row  ">
      <Image className="h-[19.92] w-[17]  " source={icon ? icon : Bell} />
      <Text className="flex-1 ml-2 text-black">{title}</Text>
    </TouchableOpacity>
  );
};

export default AppSetting2;

const styles = StyleSheet.create({});
