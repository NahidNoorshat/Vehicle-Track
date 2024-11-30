import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import {Color, Border, FontSize, FontFamily} from '../GlobalStyles';
import CarDisplay from '../components/CarDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';
import Map from './Map';
import LoadingSpinner from '../components/LoadingSpinner';

const Frame1 = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [allDevices, setAllDevices] = useState([]);

  const {setDevicedata, setAlldevice} = useContext(AuthContext);

  const handleMap = () => {
    navigation.navigate(Map);
  };

  useEffect(() => {
    postData();
    // Set up interval for periodic API calls
    const intervalId = setInterval(postData, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // post data function **************************

  const postData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      let tokendon = JSON.parse(token);
      console.log('this is t,,,,', token);
      console.log('This is pase token.. ', tokendon);

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
        console.log('this is resposse', response.data);
        const devices = response.data.result.reduce(
          (accumulator, currentGroup) => {
            // Extract devices from each group and concatenate them into one array
            return accumulator.concat(currentGroup.devices);
          },
          [],
        );
        console.log(
          devices,
          '***********************checking devices all **********************************',
        );
        setAllDevices(devices);

        await setAlldevice(devices);

        await setDevicedata(response.data);
        setLoading(false);
      } else {
        // Handle the case where no token is found (user not logged in)
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired, handle token refresh or re-authentication
        // You may need to implement a token refresh mechanism here
        console.error('Token expired, handle refresh');
        setLoading(false);
      } else {
        console.error('Error posting data:', error);
        setLoading(false);
      }
    }
  };

  if (loading) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  return (
    <View className=" flex-1 ">
      <View className="bg-[#FBF8F8] h-full">
        <Header />
        <Text style={styles.activeDevices}>Active Devices</Text>

        <ScrollView>
          {allDevices?.map((vehicle, index) => (
            <View key={index}>
              <CarDisplay data={vehicle} />
            </View>
          ))}

          <TouchableOpacity
            onPress={handleMap}
            style={styles.shadow}
            className="bg-white w-[118px] h-[30px] left-[136px] shadow-2xl  rounded-[5px] mt-4 mb-5 ">
            <Text
              className=" pt-2  "
              style={[styles.allDevices, styles.pmTypo]}>
              All Devices
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Frame1;

const styles = StyleSheet.create({
  activeDevices: {
    left: 27,
    color: Color.colorSteelblue,
    textAlign: 'left',
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_3xs,
    marginTop: 20,
  },
  allDevices: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interMedium,
  },
  pmTypo: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    textAlign: 'center',
  },
  shadow: {
    boxShadow: '0px 10px 15px 15px rgba(0,0,0,0.1)',
    elevation: 4,
  },
});
