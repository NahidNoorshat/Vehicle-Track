import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import calander from '../assets/calendar.png';
import Timepicker from '../assets/Timepicker.png';
import LoadingSpinner from '../components/LoadingSpinner';
import settingrefresh from '../assets/settingrefresh.png';

const KmSummary = () => {
  const {iemei, singlecarinfo} = useContext(AuthContext);

  // date time picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [todate, setTodate] = useState(null);
  const [fromdate, setFromdate] = useState(null);

  const [newerror, setNewerror] = useState(false);

  // feching data..
  const [todayroute, setTodayroute] = useState(null);
  const [yesterdayroute, setYesterdayroute] = useState(null);
  const [lastweekroute, setLastweekroute] = useState(null);
  const [lastmonthroute, setLastmonthroute] = useState(null);
  const [customroute, setCustomroute] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleFromConfirm = date => {
    console.log('A date has been picked: ', date);
    setFromdate(date);
    hideDatePicker();
  };
  const handleToConfirm = date => {
    console.log('A date has been picked: ', date);
    setTodate(date);
    hideDatePicker();
  };
  console.log(todate, 'selectd...');
  console.log(fromdate, 'selected....');

  // data faching...................

  const getdata = async (iemei, dtf, dtt) => {
    try {
      const token = await AsyncStorage.getItem('token');
      let tokendon = JSON.parse(token);
      console.log('this is t,,,,', token);
      console.log('This is pase token.. ', tokendon);

      const url2 = 'https://gps.speedotrack.com/api/reports/general-info';
      console.log(dtf, dtt, 'calling from api...');

      const requestData2 = {
        devices_imei: iemei,
        data_items:
          'route_start,route_end,route_length,move_duration,stop_duration,stop_count,top_speed,avg_speed,overspeed_count,fuel_consumption,avg_fuel_consumption,fuel_cost,engine_work,engine_idle,odometer,engine_hours,driver,trailer',
        date_time_from: dtf,
        date_time_to: dtt,
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
      return responseData;
    } catch (error) {
      console.error('AxiosError: ', error);
      console.error('AxiosError:', error.message);
      console.error(
        'AxiosError Details:',
        error.response.data || error.request || error.message,
      );
    }
  };

  const handleDataFetch = async () => {
    // Check if both fromdate and todate are selected
    console.log(fromdate, todate, 'cheking both date and time..');
    if (fromdate && todate) {
      // Call getdata function with selected dates

      const custondata = await getdata(iemei, fromdate, todate);
      console.log(custondata, 'custon data cheking... ');
      setCustomroute(custondata[0]);
      setNewerror(false);
    } else {
      console.warn('Please select both from and to dates');
      setNewerror(true);
    }
  };

  // calling data for all range...
  const handleAllDataFetch = async () => {
    const now = new Date();
    try {
      const today = {
        endDateTime: now.toISOString(),
        startDateTime: new Date(now - 24 * 3600000).toISOString(),
      };
      console.log(today.startDateTime, 'this is start date time....');
      console.log(today.endDateTime, 'this is start date time....');

      const last7days = {
        endDateTime: now.toISOString(),
        startDateTime: new Date(now - 7 * 24 * 3600000).toISOString(),
      };
      const last30days = {
        endDateTime: now.toISOString(),
        startDateTime: new Date(now - 30 * 24 * 3600000).toISOString(),
      };

      const todayData = await getdata(
        iemei,
        today.startDateTime,
        today.endDateTime,
      );

      setTodayroute(todayData[0]);

      const last7daysData = await getdata(
        iemei,
        last7days.startDateTime,
        last7days.endDateTime,
      );

      setLastweekroute(last7daysData[0]);
      const last30daysData = await getdata(
        iemei,
        last30days.startDateTime,
        last30days.endDateTime,
      );

      setLastmonthroute(last30daysData[0]);

      console.log('Today data:', todayData);
      // console.log('Yesterday data:', yesterdayData);
      console.log('Last 7 days data:', last7daysData);
      console.log('Last 30 days data:', last30daysData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleAllDataFetch();
  }, []);

  return (
    <View>
      <Text className=" text-black text-lg self-center mt-4 ">
        {singlecarinfo?.name}
      </Text>

      <View className=" flex flex-row flex-wrap justify-around mt-6 ">
        <View className=" w-[150px] bg-white rounded-xl px-3  py-2 my-4 flex flex-row items-center   ">
          <Image source={settingrefresh} className=" h-7 w-7 " />
          <View className=" ml-4">
            <Text className=" text-black  ">
              {todayroute ? todayroute.route_length : 'Fetching data...'}
            </Text>
            <Text className=" text-black ">Today</Text>
          </View>
        </View>
        <View className=" w-[150px] bg-white rounded-xl px-3  py-2 my-4 flex flex-row items-center   ">
          <Image source={settingrefresh} className=" h-7 w-7 " />
          <View className=" ml-4">
            <Text className=" text-black  ">
              {todayroute ? todayroute.route_length : 'Fetching data...'}
            </Text>
            <Text className=" text-black ">Yesterday</Text>
          </View>
        </View>
        <View className=" w-[150px] bg-white rounded-xl px-3  py-2 my-4 flex flex-row items-center   ">
          <Image source={settingrefresh} className=" h-7 w-7 " />
          <View className=" ml-4">
            <Text className=" text-black  ">
              {lastweekroute ? lastweekroute.route_length : 'Fetching data...'}
            </Text>
            <Text className=" text-black ">last 7 days</Text>
          </View>
        </View>
        <View className=" w-[150px] bg-white rounded-xl px-3  py-2 my-4 flex flex-row items-center   ">
          <Image source={settingrefresh} className=" h-7 w-7 " />
          <View className=" ml-4">
            <Text className=" text-black  ">
              {lastmonthroute
                ? lastmonthroute.route_length
                : 'Fetching data...'}
            </Text>
            <Text className=" text-black ">This month</Text>
          </View>
        </View>
      </View>

      {/* date time viewer start  .... */}

      <View className=" bg-white rounded-lg overflow-hidden w-full  shadow-lg px-3 mx-2 mt-5 ">
        <View className="mt-1">
          <View>
            <Text className=" text-black">From: </Text>
            <View className="flex flex-row mx-3 justify-between">
              <TouchableOpacity
                className="  px-4 py-2 my-4 bg-[#006E99] rounded-2xl "
                onPress={showDatePicker}>
                <View className="flex flex-row items-center gap-1">
                  <Image source={calander} className=" h-7 w-7  " />
                  <Text className="text-white">Select date</Text>
                </View>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleFromConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View>
            <Text className=" text-black ">TO: </Text>
            <View className="flex flex-row mx-3 justify-between">
              <TouchableOpacity
                className="  px-4 py-2 my-4 bg-[#006E99] rounded-2xl "
                onPress={showDatePicker}>
                <View className="flex flex-row items-center gap-1">
                  <Image source={calander} className=" h-7 w-7  " />
                  <Text className="text-white">Select date</Text>
                </View>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleToConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>

        <View className=" flex items-center p-5 rounded-md justify-center shadow-lg  ">
          <Text className=" text-black">
            {customroute ? customroute.route_length : 'select date and wait.. '}
          </Text>
        </View>

        {/* <View className=" flex items-center">
          <TouchableOpacity
            onPress={handleDataFetch}
            className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl  ">
            <Text className=" text-white">Face data</Text>
          </TouchableOpacity>
        </View> */}
        <View className=" flex items-center">
          {newerror ? (
            <TouchableOpacity
              onPress={() => {
                // Show popup or error message
                alert('An error occurred while fetching data.');
              }}
              className=" px-4 py-2 my-4  bg-red-500 rounded-2xl">
              <Text className=" text-white">Face data</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleDataFetch}
              className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl">
              <Text className=" text-white">Face data</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* date timw viewer end ......... */}
    </View>
  );
};

export default KmSummary;

const styles = StyleSheet.create({});
