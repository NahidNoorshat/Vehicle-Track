import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Slider from '@react-native-community/slider';

const GeoFence = () => {
  const [circleRadius, setCircleRadius] = useState(1200); // Initial radius in meters
  const [circleCenter, setCircleCenter] = useState({
    latitude: 24.069669,
    longitude: 90.480772,
  });

  const onCircleDrag = e => {
    setCircleCenter(e.nativeEvent.coordinate);
  };

  const onRadiusChange = value => {
    setCircleRadius(value);
  };
  return (
    <View className=" flex h-full w-full ">
      <View className=" flex-1 ">
        <MapView
          className=" min-h-screen -z-10 "
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          //   24.069669, 90.480772
          initialRegion={{
            latitude: 24.069669,
            longitude: 90.480772,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={circleCenter}
            title="Draggable Circle"
            draggable
            onDragEnd={onCircleDrag}
          />
          <Circle
            center={circleCenter}
            radius={circleRadius} // Set your desired radius
            fillColor="rgba(0, 128, 255, 0.3)"
          />
        </MapView>
      </View>
      <View className=" bg-white m-3 p-2 rounded-lg overflow-hidden ">
        <View className="flex flex-row justify-around items-center">
          {/* <Text>Radius: {circleRadius} meters</Text> */}
          <View className=" flex-1 mt-1 ">
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={100}
              maximumValue={1000}
              step={10}
              value={circleRadius}
              onValueChange={onRadiusChange}
            />
          </View>
          <Text className=" text-black text-lg ">Custom</Text>
        </View>
        <View className=" mt-3 ">
          <TextInput
            placeholder="Enter Zone Name"
            className=" text-black px-3 py-2 border-2 rounded-xl "
          />
        </View>
        <View className=" flex flex-row justify-around items-center my-2 ">
          <View>
            <Text className=" text-black ">Zone In</Text>
          </View>
          <View>
            <Text className="text-black">Zone Out</Text>
          </View>

          <TouchableOpacity className=" px-4 py-2 my-4 bg-[#006E99] rounded-2xl">
            <Text className=" text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GeoFence;

const styles = StyleSheet.create({});
