import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthProvider';

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';

const Report = () => {
  const {iemei, singlecarinfo} = useContext(AuthContext);

  const [reportdata, setReportdata] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle API call
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      let tokendon = JSON.parse(token);
      console.log('this is t,,,,', token);
      console.log('This is pase token.. ', tokendon);

      const url2 = 'https://gps.speedotrack.com/api/reports/general-info';

      const requestData2 = {
        devices_imei: iemei,
        data_items:
          'route_start,route_end,route_length,move_duration,stop_duration,stop_count,top_speed,avg_speed,overspeed_count,fuel_consumption,avg_fuel_consumption,fuel_cost,engine_work,engine_idle,odometer,engine_hours,driver,trailer',
        date_time_from: '2023-06-07 00:00:00',
        date_time_to: '2023-12-24 00:00:00',
        speed_limit: 30,
        stop_duration: 1,
      };

      const response = await axios.post(url2, requestData2, {
        headers: {
          Authorization: tokendon,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      console.log('ok chek response ......', responseData);
      setReportdata(response?.data);
      setLoading(false);
    } catch (error) {
      console.error('AxiosError: ', error);
      console.error('AxiosError:', error.message);
      console.error(
        'AxiosError Details:',
        error.response.data || error.request || error.message,
      );
      setLoading(false);
    }
  };

  // Function to handle date picker visibility
  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();

  const handlereport = () => {
    navigation.navigate('ShowReport', {
      data: reportdata[0],
    });
  };
  // Function to handle datetime changes
  if (loading) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  return (
    <>
      <Text className=" text-center self-center text-blue-700 font-medium text-lg mt-3 ">
        {singlecarinfo?.name}
      </Text>
      <View className=" bg-white text-black rounded-lg shadow-lg m-4 p-3  ">
        <Text className=" text-black text-base my-2 ">Rrport Type</Text>
        <View className=" bg-slate-400 shadow-lg px-3 py-2 mx-3 my-2 rounded-lg w-full items-center ">
          <Text className=" text-black text-base font-normal ">
            General Info
          </Text>
        </View>
        <Text className=" text-black text-base my-2 ">Filter</Text>
        <View className=" bg-slate-400 shadow-lg px-3 py-2 mx-3 my-2 rounded-lg w-full items-center ">
          <Text className=" text-black text-base font-normal ">Today</Text>
        </View>
      </View>

      <View className=" flex items-center">
        <TouchableOpacity
          onPress={handlereport}
          className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl  ">
          <Text className=" text-white">Show Report</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Report;

const styles = StyleSheet.create({});
