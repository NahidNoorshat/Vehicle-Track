import {Image, StyleSheet, Text, ScrollView, View} from 'react-native';
import React from 'react';
import Logo from '../assets/Logomain.png';

const ShowReport = ({route}) => {
  const {data} = route?.params;
  console.log(data.device, 'Ok chkeck');
  return (
    <ScrollView className=" ">
      <Image source={Logo} className=" self-center my-4  " />
      <Text className=" text-black text-base mx-3 "> General Information</Text>
      <View className=" gap-2 mx-2 px-2 my-3 ">
        <Text className=" text-black ">Object: {data?.device} </Text>
        <Text className=" text-black ">period: {data?.period} </Text>
        <Text className=" text-black ">route start: {data?.route_start} </Text>
        <Text className=" text-black ">route end: {data?.route_end} </Text>
        <Text className=" text-black ">route length: {data?.route_length}</Text>
        <Text className=" text-black ">
          move duration: {data?.move_duration}
        </Text>
        <Text className=" text-black ">
          stop duration: {data?.stop_duration}
        </Text>
        <Text className=" text-black ">stop count: {data?.stop_count} </Text>
        <Text className=" text-black ">top_speed: {data?.top_speed} </Text>
        <Text className=" text-black ">avg_speed: {data?.avg_speed} </Text>
        <Text className=" text-black ">
          overspeed_count: {data?.overspeed_count}
        </Text>
        <Text className=" text-black ">
          fuel_consumption: {data?.fuel_consumption}
        </Text>
        <Text className=" text-black ">fuel_cost: {data?.fuel_cost} </Text>
        <Text className=" text-black ">engine_work: {data?.engine_work} </Text>
        <Text className=" text-black ">engine_idle: {data?.engine_idle} </Text>
        <Text className=" text-black ">odometer: {data?.odometer} </Text>
        <Text className=" text-black ">engine_hours: {data?.engine_hours}</Text>
        <Text className=" text-black ">driver: {data?.driver} </Text>
        <Text className=" text-black ">trailer: {data?.trailer} </Text>
      </View>
    </ScrollView>
  );
};

export default ShowReport;

const styles = StyleSheet.create({});
