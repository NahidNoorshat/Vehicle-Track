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
  const {iemei, setpreviousdata, setPlaybackinfo} = useContext(AuthContext);
  // testig the filter button...................
  const [activeFilter, setActiveFilter] = useState('filter1');
  const [palybackdata, setPlaybackdta] = useState();
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [toTime, setToTime] = useState(null);

  // date tiem picker...........
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [datetimeview, setDatetimeview] = useState(false);

  const handledatetimeview = () => {
    setDatetimeview(!datetimeview);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleFormDateConfirm = date => {
    console.log('A date has ************************** been picked: ', date);
    hideDatePicker();
    setFromDate(date);
    console.log(fromDate, 'on the function...');
    // const isoDate = date.toISOString();
    // dynamicDtf = isoDate;
    // console.log(dynamicDtf, 'let chekc1st');
  };
  const handleToDateConfirm = date => {
    console.log('A date has 99999999999 been picked: ', date);
    hideDatePicker();
    setToDate(date);
    // const isoDate = date.toISOString();
    // dynamicDtt = isoDate;
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = date => {
    console.log('A date has (((((((((((()))))))))))) been picked: ', date);
    hideTimePicker();
    setFromTime(date);
    // const isoTime = date.toISOString();
    // dynamicDtf = isoTime;
  };

  // date time picker end... ************

  // const handleFilterPress = filter => {
  //   setActiveFilter(filter);
  //   // Update dynamicDtf and dynamicDtt based on the selected filter
  //   const now = new Date();
  //   switch (filter) {
  //     case 'filter1':
  //       dynamicDtt = now.toISOString();
  //       dynamicDtf = new Date(now - 3600000).toISOString();
  //       break;
  //     case 'filter2':
  //       dynamicDtt = now.toISOString();
  //       dynamicDtf = new Date(now - 3 * 24 * 3600000).toISOString();
  //       break;
  //     case 'filter3':
  //       dynamicDtt = now.toISOString();
  //       dynamicDtf = new Date(now - 7 * 24 * 3600000).toISOString();
  //       break;
  //     case 'filter4':
  //       dynamicDtt = now.toISOString();
  //       dynamicDtf = new Date(now - 30 * 24 * 3600000).toISOString(); // 1 month earlier
  //       break;

  //     case 'filter5':
  //       dynamicDtt = now.toISOString();
  //       dynamicDtf = new Date(now - 24 * 3600000).toISOString(); // 1 day before
  //       break;

  //     // Add more cases for additional filters
  //     default:
  //       break;
  //   }

  //   // If toDate and toTime are available, update dynamicDtt
  //   // if (fromDate && toDate) {
  //   //   dynamicDtf = fromDate.toISOString();
  //   //   dynamicDtt = toDate.toISOString();
  //   // }

  //   // Fetch data with updated dynamicDtf and dynamicDtt
  //   getdata(dynamicImei, dynamicDtf, dynamicDtt);
  // };

  const handleFilterPress = filter => {
    setActiveFilter(filter);
    let startDateTime, endDateTime;

    // Update startDateTime and endDateTime based on the selected filter
    const now = new Date();
    switch (filter) {
      case 'filter1':
        endDateTime = now.toISOString();
        startDateTime = new Date(now - 3600000).toISOString();
        break;
      case 'filter2':
        endDateTime = now.toISOString();
        startDateTime = new Date(now - 3 * 24 * 3600000).toISOString();
        break;
      case 'filter3':
        endDateTime = now.toISOString();
        startDateTime = new Date(now - 7 * 24 * 3600000).toISOString();
        break;
      case 'filter4':
        endDateTime = now.toISOString();
        startDateTime = new Date(now - 30 * 24 * 3600000).toISOString(); // 1 month earlier
        break;
      case 'filter5':
        endDateTime = now.toISOString();
        startDateTime = new Date(now - 24 * 3600000).toISOString(); // 1 day before
        break;
      default:
        break;
    }

    // If toDate and fromDate are available, update startDateTime and endDateTime
    if (fromDate && toDate) {
      startDateTime = fromDate.toISOString();
      endDateTime = toDate.toISOString();
    }

    // Fetch data with updated startDateTime and endDateTime
    getdata(dynamicImei, startDateTime, endDateTime);
  };

  // test done on filter button................
  const navigation = useNavigation();

  const handlePlaybak = () => {
    navigation.navigate('PlaybackShow');
  };

  // get data.......................
  const getdata = async (imei, dtf, dtt) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      let tokendon = JSON.parse(token);
      console.log('this is t,,,,', token);
      console.log('This is pase token.. ', tokendon);

      const url2 = 'https://gps.speedotrack.com/api/device-history';

      const requestData2 = {
        cmd: 'load_route_data',
        // imei: '357544372448254',
        // dtf: '2023-12-24T05:30:00Z',
        imei: imei,
        dtf: dtf,
        dtt: dtt,
        min_stop_duration: 1,
      };

      const response = await axios.post(url2, requestData2, {
        headers: {
          Authorization: tokendon,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.data;
      // console.log('ok chek response ......', responseData);

      setPlaybackdta(responseData);
      setpreviousdata(responseData?.route);
      setPlaybackinfo({
        topSpeed: responseData?.topSpeed,
        routeLength: responseData?.routeLength,
        avgSpeed: responseData?.avgSpeed,
        stopDuration: responseData?.stopDuration,
      });
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

    // console.log('this is data form playbna', palybackdata);
  };

  // console.log(fromDate, 'this is form dateee........');

  const dynamicImei = iemei;
  let dynamicDtf = '2023-12-24T05:30:00Z';
  let dynamicDtt = '2023-12-25T06:00:00';

  const currentDateTime = new Date();
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Dhaka', // Set to Bangladesh Standard Time
  };
  const formattedCurrentTime = currentDateTime.toLocaleString('en-US', options);
  const isoFormattedDateTime = currentDateTime.toISOString();

  // console.log('checking the ral time', formattedCurrentTime);

  useEffect(() => {
    handleFilterPress(activeFilter);

    // getdata(dynamicImei, dynamicDtf, dynamicDtt);
    // getdata(dynamicImei, fromDate, toDate);
  }, []);

  // const handleDateSelection = () => {
  //   if (fromDate && toDate) {
  //     // If both fromDate and toDate are selected, call the API
  //     handleFilterPress();
  //   } else {
  //     // Show an error message or handle the case when both dates are not selected
  //     console.log('Please select both From and To dates');
  //   }
  // };

  // data faching done................

  const routedata = palybackdata?.route;
  // console.log(
  //   ' this is only route data......... ********************************************************************************************************************* ',
  //   routedata,
  // );

  if (loading) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

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
        <Text className="flex items-center text-center font-bold">
          Hello nahid
        </Text>
        <View className=" px-6 ">
          <Text className=" text-blue-600  ">Filter</Text>

          {/* the implimentation of filter button.......... */}

          <View className=" flex  flex-row flex-wrap  mt-6 ">
            <Filterbutton
              label="Last Hour"
              isActive={activeFilter === 'filter1'}
              onPress={() => handleFilterPress('filter1')}
            />
            <Filterbutton
              label="Today"
              isActive={activeFilter === 'filter5'}
              onPress={() => handleFilterPress('filter5')}
            />
            <Filterbutton
              label="Last 3 days"
              isActive={activeFilter === 'filter2'}
              onPress={() => handleFilterPress('filter2')}
            />
            <Filterbutton
              label="last 7 days"
              isActive={activeFilter === 'filter3'}
              onPress={() => handleFilterPress('filter3')}
            />
            <Filterbutton
              label="Last Month"
              isActive={activeFilter === 'filter4'}
              onPress={() => handleFilterPress('filter4')}
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
              <Text className=" ">From: </Text>
              <View className="flex flex-row mx-3 justify-between">
                <TouchableOpacity
                  className="  px-4 py-2 my-4 bg-[#006E99] rounded-2xl "
                  onPress={showDatePicker}>
                  <View className="flex flex-row items-center gap-1">
                    <Image source={calander} className=" h-7 w-7  " />
                    <Text className="text-white">Select date</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="  px-4 py-2 my-4 bg-[#006E99] rounded-2xl "
                  onPress={showTimePicker}>
                  <View className="flex flex-row items-center gap-1">
                    <Image source={Timepicker} className=" h-7 w-7  " />
                    <Text className="text-white">Select Time</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleFormDateConfirm}
                onCancel={hideDatePicker}
              />

              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>

            <View>
              <Text>To: </Text>
              <View className="flex flex-row mx-3 justify-between">
                <TouchableOpacity
                  className="  px-4 py-2 my-4 bg-[#006E99] rounded-2xl "
                  onPress={showDatePicker}>
                  <View className="flex flex-row items-center gap-1">
                    <Image source={calander} className=" h-7 w-7  " />
                    <Text className="text-white">Select date</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="  px-4 py-2 my-4 bg-[#006E99] rounded-2xl "
                  onPress={showTimePicker}>
                  <View className="flex flex-row items-center gap-1">
                    <Image source={Timepicker} className=" h-7 w-7  " />
                    <Text className="text-white">Select Time</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleToDateConfirm}
                onCancel={hideDatePicker}
              />

              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>
          </View>
        )}

        <View className=" flex items-center">
          <TouchableOpacity
            onPress={handlePlaybak}
            className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl  ">
            <Text className=" text-white">Go Play</Text>
          </TouchableOpacity>
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
