import {Button, StyleSheet, FlatList, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import CarDiaplayhome from '../components/CarDiaplayhome';
import {useRoute} from '@react-navigation/native';

// for google map....
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Slider from '@react-native-community/slider';
import {AuthContext} from '../context/AuthProvider';

const Map = () => {
  const {alldevice} = useContext(AuthContext);
  console.log(alldevice, 'map page data.......................');
  // console.log(alldevice[4].location_data.lat);

  return (
    <View className=" flex min-h-screen ">
      <View className="  w-full">
        <Header />
      </View>

      {/* <Text> {routeName} </Text> */}
      <View style={styles.container} className="  -z-10 ">
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 23.870547706071235,
            longitude: 90.3891613061401,
            latitudeDelta: 10.075,
            longitudeDelta: 10.0721,
          }}>
          {alldevice.map((device, index) => {
            const latitude = device.location_data?.lat;
            const longitude = device.location_data?.lng;

            // Check if latitude and longitude are both available
            if (latitude && longitude) {
              return (
                <Marker
                  key={index} // Ensure each marker has a unique key
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  title={device.name}
                  description={device.status}
                />
              );
            } else {
              // Return null or a placeholder if no coordinates are available
              return null; // or return a placeholder marker
            }
          })}
        </MapView>
      </View>
    </View>
  );
};

export default Map;

// 23.870547706071235, 90.3891613061401
// const styles = StyleSheet.create({});
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
