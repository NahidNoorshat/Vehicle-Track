import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../context/AuthProvider';

const GetData = async () => {
  const {iemei} = useContext(AuthContext);
  const [getData, setGetData] = useState([]);

  try {
    const token = await AsyncStorage.getItem('token');
    let tokendon = JSON.parse(token);
    console.log('this is t,,,,', token);

    if (token) {
      const response = await axios.post(
        'https://gps.speedotrack.com/api/tracking/load-device-data',
        {
          // Your POST data goes here
        },
        {
          headers: {
            Authorization: tokendon,
            'Content-Type': 'application/json', // Set content type if required
          },
        },
      );

      // Handle the response data as needed
      console.log(
        'this is resposse from call data fuction... 000000000000000000000000 ',
        response.data.result,
      );

      await setGetData(response.data.result);
      console.log(getData);
      // await setDevicedata(response.data);
    }

    const newRegion = {
      latitude: selectedCar?.location_data.lat,
      longitude: selectedCar?.location_data.lat,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    return newRegion;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired, handle token refresh or re-authentication
      // You may need to implement a token refresh mechanism here
      console.error('Token expired, handle refresh');
    } else {
      console.error('Error posting data:', error);
    }
  }
};

export default GetData;
