import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dashborddata from '../components/Dashborddata';
import LoadingSpinner from '../components/LoadingSpinner';
import Routelanth from '../assets/Routelanth.png';

const Dashbord = () => {
  const {iemei, reportdata, setReportdata} = useContext(AuthContext);

  const [report, setReprot] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = async (imei, dtf, dtt) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      let tokendon = JSON.parse(token);
      // console.log('this is t,,,,', token);
      // console.log('This is pase token.. ', tokendon);

      const url2 = 'https://gps.speedotrack.com/api/reports/general-info';

      const requestData = {
        devices_imei: imei,
        data_items:
          'route_start,route_end,route_length,move_duration,stop_duration,stop_count,top_speed,avg_speed,overspeed_count,fuel_consumption,avg_fuel_consumption,fuel_cost,engine_work,engine_idle,odometer,engine_hours,driver,trailer',
        date_time_from: dtf,
        date_time_to: dtt,
        speed_limit: 30,
        stop_duration: 1,
      };

      const response = await axios.post(url2, requestData, {
        headers: {
          Authorization: tokendon,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      console.log(
        'ok chek response ...... ************************************************************',
        responseData,
      );

      setReprot(responseData);
      setReportdata(responseData);
      setLoading(false);
    } catch (error) {
      // console.error('AxiosError: ', error);
      setLoading(false);
    } finally {
      // Stop loading whether the request was successful or not
      setLoading(false);
    }

    // console.log('this is data form playbna', palybackdata);
  };

  // console.log(report, 'This is report data.................');
  let dynamicDtf = '2023-12-24T05:30:00Z';
  let dynamicDtt = '2023-12-25T06:00:00';

  useEffect(() => {
    const now = new Date();
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000); // Subtract 24 hours in milliseconds

    // Format the dates to the required format (adjust as needed)
    const formattedNow = now.toISOString();
    const formattedOneDayAgo = oneDayAgo.toISOString();
    getdata(iemei, formattedOneDayAgo, formattedNow);
  }, [report]);

  if (loading) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }
  const [datePart, timePart] = report[0]?.route_start.split(' ');
  const [datePartend, timePartend] = report[0]?.route_end.split(' ');

  return (
    <View>
      <View className=" bg-white rounded-lg drop-shadow-lg shadow-xl px-4 py-2 mx-3 my-2 ">
        <Text className=" text-black">Today</Text>
      </View>
      <View className=" flex flex-row flex-wrap justify-between mx-4 ">
        <Dashborddata
          title={'Route Start'}
          date={datePart}
          timePart={timePart}
        />

        <Dashborddata
          title={'Route end'}
          date={datePartend}
          timePart={timePartend}
        />

        <Dashborddata
          title={'Move Duration'}
          report={reportdata[0]?.move_duration}
        />

        <Dashborddata
          title={'Route Length'}
          report={reportdata[0]?.route_length}
        />
        <Dashborddata
          title={'Stop duration'}
          report={reportdata[0]?.stop_duration}
        />
        <Dashborddata title={'Stop Count'} report={reportdata[0]?.stop_count} />
        <Dashborddata title={'Top Speed'} report={reportdata[0]?.top_speed} />
        <Dashborddata title={'Avg. count'} report={reportdata[0]?.avg_speed} />
        {/*
        <Dashborddata
          title={'O.Speed count'}
          report={reportdata[0]?.overspeed_count}
        />
        <Dashborddata title={'Eng. Work'} report={reportdata[0]?.engine_work} />
        <Dashborddata title={'Eng. Idle'} report={reportdata[0]?.engine_idle} />
        <Dashborddata title={'Odometer'} report={reportdata[0]?.odometer} /> */}
      </View>
    </View>
  );
};

export default Dashbord;

const styles = StyleSheet.create({});
