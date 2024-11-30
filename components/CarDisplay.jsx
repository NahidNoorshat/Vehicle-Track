import {StyleSheet, Pressable, Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Color, Border, FontSize, FontFamily} from '../GlobalStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';

const CarDisplay = ({data}) => {
  const navigation = useNavigation();
  const {setIemei} = useContext(AuthContext);
  console.log(data, 'come from frame1');
  // console.log(data.icon);

  const handlePress = () => {
    console.log('the IMEI Number', data.imei);
    // navigation.navigate('Tab');
    setIemei(data.imei);
    navigation.navigate('Tab', {carData: data});
  };

  return (
    <Pressable
      onPress={handlePress}
      className=" bg-[#006e99]  h-[120px] w-[300px] m-2 self-center pb-1 rounded-lg overflow-hidden shadow-2xl ">
      <View className=" bg-white h-full w-full justify-center rounded-b-lg p-3 ">
        <View className=" flex flex-row justify-start items-center gap-2 ">
          <Image
            source={require('../assets/car--convertible-005removebgpreview-1.png')}
          />
          <View className="flex ">
            <Text className=" text-black text-base mb-1 ">{data?.name}</Text>
            <View className="flex flex-row gap-2 mb-1 items-center">
              <Image
                className="h-[11.03px] w-[15px]"
                source={require('../assets/group.png')}
              />
              <Text className=" text-black">{data?.location_data?.speed}</Text>
            </View>
            <View className="flex flex-row gap-2 w-[130px] items-center ">
              <Image
                className=" h-[11px] w-[11px]  mr-1 "
                source={require('../assets/eloff.png')}
              />
              <View className=" w-[142px] mt-2 ">
                <Text className=" text-black ">{data?.status}</Text>
                <Text className=" text-black ">{data?.status_time}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CarDisplay;
