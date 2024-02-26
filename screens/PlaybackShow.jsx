import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import Speed from '../assets/speedmeeter.png';
import clock from '../assets/clock.png';
import topspeed from '../assets/topspeed.png';
import movingicon from '../assets/movingicon.png';
import carlength from '../assets/carlength.png';
import mapmarker from '../assets/mapmarker.png';
import mapmarker2 from '../assets/mapmarker2.png';
import {AuthContext} from '../context/AuthProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Slider from '@react-native-community/slider';

const PlaybackShow = ({route}) => {
  const {iemei, priviousdata, playbackinfo} = useContext(AuthContext);
  const {topSpeed, routeLength, avgSpeed, stopDuration} = playbackinfo;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentData, setCurrentData] = useState(priviousdata?.[0]);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        // Increment the index cyclically
        const newIndex = (currentIndex + 1) % priviousdata.length;
        setCurrentIndex(newIndex);
        setCurrentData(priviousdata[newIndex]);
      }, 1000); // Adjust the interval as needed
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, currentIndex]); // Include currentIndex as a dependency

  const updateIndex = value => {
    const newIndex = Math.floor(value * (priviousdata.length - 1));
    setCurrentIndex(newIndex);
    setCurrentData(priviousdata[newIndex]);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  if (!priviousdata) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  const firstPoint = priviousdata[0];
  const lastPoint = priviousdata[priviousdata.length - 1];

  // Extracting latitude and longitude from the first point
  const firstLatitude = firstPoint?.[1];
  const firstLongitude = firstPoint?.[2];

  // console.log(firstLatitude);
  // console.log(firstLongitude);

  // Extracting latitude and longitude from the last point
  const lastLatitude = lastPoint?.[1];
  const lastLongitude = lastPoint?.[2];
  // polyline .........
  const coordinates = priviousdata?.map(point => ({
    latitude: point[1],
    longitude: point[2],
  }));

  const dateString = currentData[0];
  const dateObject = new Date(dateString);

  // Format the date and time
  const formattedDate = dateObject.toLocaleDateString(); // Format as "MM/DD/YYYY"
  const formattedTime = dateObject.toLocaleTimeString();

  return (
    <View className=" flex flex-col h-full w-full  ">
      {/* map view..................... */}
      <View className=" flex-1  ">
        <MapView
          className=" flex-1 -z-10 "
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          //   23.936035, 90.349746

          region={{
            latitude: firstLatitude,
            longitude: firstLongitude,
            latitudeDelta: 0.0095,
            longitudeDelta: 0.00921,
          }}>
          <Polyline
            coordinates={coordinates}
            strokeColor="#006E99" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          />

          <Marker
            coordinate={{
              latitude: firstLatitude,
              longitude: firstLongitude,
            }}>
            <Image className=" h-[44px] w-[44px] " source={mapmarker2} />
          </Marker>
          <Marker
            coordinate={{
              latitude: currentData[1],
              longitude: currentData[2],
            }}
          />
          <Marker
            coordinate={{
              latitude: lastLatitude,
              longitude: lastLongitude,
            }}>
            <Image className=" h-[44px] w-[44px]" source={mapmarker} />
          </Marker>
        </MapView>
      </View>
      {/* map view end.................... */}
      {/* ****bottom view********** */}
      <View>
        <View className=" flex flex-row items-center gap-4 mx-3 mt-2 ">
          <View className="  w-20 px-1 rounded-md overflow-hidden ">
            <Button
              title={isPlaying ? 'Pause' : 'Start'}
              onPress={togglePlayback}
            />
          </View>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            value={currentIndex / (priviousdata.length - 1)}
            onValueChange={value => updateIndex(value)}
          />
        </View>
        {/* **** bottom top view ****** */}
        <View className=" flex flex-row justify-between my-4 mx-7 items-center">
          <View className=" flex flex-row items-center gap-1">
            <Image source={Speed} className=" h-6 w-6" />
            <Text className=" text-[#006E99] font-semibold text-base">
              {' '}
              {currentData[5]} km/h{' '}
            </Text>
          </View>
          <View className=" flex flex-row items-center gap-2">
            <Image source={clock} className=" h-6 w-6" />
            <View className=" flex items-center  ">
              <Text className=" text-[#006E99] font-light text-sm">
                {/* 2024-01-17 */}
                {formattedDate}
              </Text>
              <Text className=" text-[#006E99] font-light text-xs mx-2">
                {/* 05:05:46 */}
                {formattedTime}
              </Text>
            </View>
          </View>

          <View className=" flex flex-row items-center gap-1">
            <Image source={topspeed} className=" h-6 w-6 mr-2" />
            <View className=" flex flex-col ">
              <Text className=" text-[#006E99] font-semibold text-base ml-2 ">
                {topSpeed}
              </Text>
              <Text className=" text-xs font-light text-[#006E99]">
                Top Speed
              </Text>
            </View>
          </View>
        </View>
        {/* bottom top view end  */}

        {/* *********** bottom bottom vew start *************** */}

        <View className=" flex flex-row justify-between items-center mx-3 mb-4 ">
          <View className=" flex flex-row items-center gap-1">
            <Image source={movingicon} className=" h-6 w-6 mr-2" />
            <View className=" flex flex-col ">
              <Text className=" text-sm  text-[#006E99]">
                {stopDuration ? `${stopDuration} ` : '0 h'}
              </Text>
              <Text className="text-[#006E99]  font-medium text-xs">
                Move Duration
              </Text>
            </View>
          </View>
          <View className=" flex flex-row items-center gap-1">
            <Image source={carlength} className=" h-6 w-6 mr-2" />
            <View className=" flex flex-col ">
              <Text className=" text-sm  text-[#006E99] ml-2 ">
                {routeLength ? `${routeLength} km` : '0 km'}
              </Text>
              <Text className=" text-[#006E99]  font-medium text-xs">
                Route Length
              </Text>
            </View>
          </View>
          <View className=" flex flex-row items-center gap-1">
            <Image source={topspeed} className=" h-6 w-6 mr-2" />
            <View className=" flex flex-col ">
              <Text className=" text-[#006E99] text-xs  ">
                {avgSpeed ? `${avgSpeed} km/h` : '0 km/h'}
              </Text>
              <Text className=" text-[#006E99]  font-medium text-sm">
                Avg. Speed
              </Text>
            </View>
          </View>
        </View>

        {/* *********** bottom bottom vew end *************** */}
      </View>
      {/* ******** bottom view end ***** */}
    </View>
  );
};

export default PlaybackShow;

const styles = StyleSheet.create({});
