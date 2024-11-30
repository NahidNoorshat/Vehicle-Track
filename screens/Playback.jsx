import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Filterbutton from '../components/FIlterbutton';
import {useNavigation} from '@react-navigation/native';
import PlaybackShow from './PlaybackShow';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthProvider';
import Mapicon from '../assets/map-car-1.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import calander from '../assets/calendar.png';
import Timepicker from '../assets/Timepicker.png';
import LoadingSpinner from '../components/LoadingSpinner';

const Playback = () => {
  const {iemei, setpreviousdata, singlecarinfo, setPlaybackinfo} =
    useContext(AuthContext);
  // testig the filter button...................

  const [activeFilter, setActiveFilter] = useState('lastHour');
  const [newerror, setNewerror] = useState(false);
  const [loading, setLoading] = useState(true);
  const [datetimeview, setDatetimeview] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isCustomDateSelected, setIsCustomDateSelected] = useState(false); // New state variable
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Function to handle filter press...
  const handleFilterPress = filter => {
    if (!isCustomDateSelected) {
      // Disable filter press if custom date is selected
      setActiveFilter(filter);
      let startDateTime, endDateTime;

      // Logic to determine startDateTime and endDateTime based on the selected filter...

      const now = new Date();
      switch (filter) {
        case 'lastHour':
          endDateTime = now.toISOString();
          startDateTime = new Date(now - 3600000).toISOString();
          break;
        case 'today':
          endDateTime = now.toISOString();
          startDateTime = new Date(now - 24 * 3600000).toISOString(); // 1 day before
          break;
        case 'last3Days':
          // Update startDateTime and endDateTime for the last 3 days...
          endDateTime = now.toISOString();
          startDateTime = new Date(now - 7 * 24 * 3600000).toISOString();
          break;
        case 'lastWeek':
          // Update startDateTime and endDateTime for the last week...
          endDateTime = now.toISOString();
          startDateTime = new Date(now - 7 * 24 * 3600000).toISOString();
          break;
        case 'lastMonth':
          // Update startDateTime and endDateTime for the last month...
          endDateTime = now.toISOString();
          startDateTime = new Date(now - 30 * 24 * 3600000).toISOString(); // 1 month earlier
          break;
        default:
          break;
      }
      // Fetch data with updated startDateTime and endDateTime...
      console.log(
        startDateTime,
        endDateTime,
        'cheking all date time is ok or not..',
      );
      fetchData(iemei, startDateTime, endDateTime);
    }
  };

  useEffect(() => {
    if (!isCustomDateSelected) {
      // Call fetchData with default parameters
      handleFilterPress(activeFilter);
    }
  }, []);
  // Function to handle date selection...
  const handleDateSelection = () => {
    console.log(fromDate, toDate, 'befor call api...');
    if (fromDate && toDate) {
      // If both fromDate and toDate are selected, call the API...
      const startDateTime = fromDate.toISOString();
      const endDateTime = toDate.toISOString();
      fetchData(iemei, startDateTime, endDateTime);

      // Update isCustomDateSelected state
      setIsCustomDateSelected(true);
    } else {
      // Show an error message or handle the case when both dates are not selected...
      console.log('Please select both From and To dates');
    }
  };

  // Function to fetch data from the API...
  const fetchData = async (iemei, startDateTime, endDateTime) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      let tokendon = JSON.parse(token);
      // console.log('this is t,,,,', token);
      // console.log('This is pase token.. ', tokendon);
      console.log(
        iemei,

        'request handeling data cheking.....',
      );

      const url2 = 'https://gps.speedotrack.com/api/device-history';

      const requestData2 = {
        cmd: 'load_route_data',

        imei: iemei,
        dtf: startDateTime,
        dtt: endDateTime,
        min_stop_duration: 1,
      };

      const response = await axios.post(url2, requestData2, {
        headers: {
          Authorization: tokendon,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      console.log('ok chek response ......', responseData);

      // setPlaybackdta(responseData);
      setpreviousdata(responseData?.route);
      setPlaybackinfo({
        topSpeed: responseData?.topSpeed,
        routeLength: responseData?.routeLength,
        avgSpeed: responseData?.avgSpeed,
        stopDuration: responseData?.stopDuration,
      });
      setNewerror(false);
      setLoading(false);
    } catch (error) {
      console.error('AxiosError: ', error);
      console.error('AxiosError:', error.message);
      console.error(
        'AxiosError Details:',
        error.response.data || error.request || error.message,
      );
      setNewerror(true);
      setLoading(false);
    }
  };

  // Function to show date picker...
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleFromConfirm = date => {
    console.log('A date has been picked: ', date);
    setFromDate(date);
    hideDatePicker();
    handleDateSelection();
  };
  const handleToConfirm = date => {
    console.log('A date has been picked: ', date);
    setToDate(date);
    hideDatePicker();
    handleDateSelection();
  };
  console.log(toDate, 'this is to date..');
  console.log(fromDate, 'this is form date..');
  // test done on filter button................
  const navigation = useNavigation();

  const handlePlaybak = () => {
    navigation.navigate('PlaybackShow');
  };

  if (loading) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  const handledatetimeview = () => {
    setDatetimeview(!datetimeview);
  };

  return (
    <View className=" flex flex-col h-full w-full  ">
      <View className=" flex-1  ">
        <MapView
          className=" min-h-screen -z-10 "
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          //   23.936035, 90.349746
          region={{
            latitude: 23.936035,
            longitude: 90.349746,
            latitudeDelta: 0.075,
            longitudeDelta: 0.0721,
          }}>
          <Marker
            coordinate={{
              latitude: 23.936035,
              longitude: 90.349746,
            }}>
            <Image className=" h-[46.44px] w-[13.8px] " source={Mapicon} />
          </Marker>
        </MapView>
      </View>

      <View className=" bg-white mx-1 p-2 rounded-xl overflow-hidden my-1 ">
        <Text className="flex items-center text-black text-center font-bold">
          {singlecarinfo?.name}
        </Text>
        <View className=" px-6 ">
          <Text className=" text-blue-600  ">Filter</Text>

          {/* the implimentation of filter button.......... */}

          <View className=" flex  flex-row flex-wrap  mt-6 ">
            <Filterbutton
              label="Last Hour"
              isActive={activeFilter === 'lastHour'}
              onPress={() => handleFilterPress('lastHour')}
            />
            <Filterbutton
              label="Today"
              isActive={activeFilter === 'today'}
              onPress={() => handleFilterPress('today')}
            />
            <Filterbutton
              label="Last 3 days"
              isActive={activeFilter === 'last3Days'}
              onPress={() => handleFilterPress('last3Days')}
            />
            <Filterbutton
              label="last 7 days"
              isActive={activeFilter === 'lastWeek'}
              onPress={() => handleFilterPress('lastWeek')}
            />
            <Filterbutton
              label="Last Month"
              isActive={activeFilter === 'lastMonth'}
              onPress={() => handleFilterPress('lastMonth')}
            />

            {/* Add more FilterButton components for additional filters */}
          </View>

          {/* implementation done..................... */}
        </View>

        <View className=" flex items-center">
          <TouchableOpacity
            className=" px-4 py-2 mt-4 bg-[#006E99] rounded-2xl "
            onPress={handledatetimeview}>
            <Text className=" text-white  ">Custom Date & Time</Text>
          </TouchableOpacity>
        </View>

        {datetimeview && (
          <View className="mt-1">
            <View>
              <Text>From: </Text>
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
              <Text className=" ">To: </Text>
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
        )}

        {/* <View className=" flex items-center">
          <TouchableOpacity
            onPress={handlePlaybak}
            className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl  ">
            <Text className=" text-white">Go Play</Text>
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
              <Text className=" text-white">Go Play</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handlePlaybak}
              className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl">
              <Text className=" text-white">Go Play</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Playback;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
