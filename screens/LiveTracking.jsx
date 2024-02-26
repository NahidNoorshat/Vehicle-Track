import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// for google map....
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import Meter from '../assets/meterfinal.png';
import Card1 from '../assets/9183608-1.png';
import Card2 from '../assets/group2.png';
import Card3 from '../assets/fluentcellulardata220filled1.png';
import Card4 from '../assets/group1.png';
import Card5 from '../assets/572834-1.png';
import Card6 from '../assets/group3.png';
import Mapicon from '../assets/map-car-1.png';
// data facthing..............
import GetData from '../components/GetData';
import {AuthContext} from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const LiveTracking = () => {
  const {iemei, singlecarinfo} = useContext(AuthContext);
  const {devicedata} = useContext(AuthContext);
  // const {setIemei} = useContext(AuthContext)
  console.log('This is feom Frame 2 i got iemei', iemei);
  console.log(
    'This is feom Frame 2 i got data _++++++++++++++++++++++++++++',
    devicedata,
  );

  // sensor info....
  const {sensors} = singlecarinfo;
  console.log(sensors);

  // Filter the array based on the condition where name is "Ignition"
  const ignitionSensors = sensors.filter(sensor => sensor?.name === 'Ignition');

  const gpsSensors = sensors.filter(sensor => sensor?.name === 'GPS Signal');

  // Extract the valueFull for each object in the filtered array
  const valueFullArray = ignitionSensors.map(sensor => sensor.valueFull);
  const gpsvaluarry = gpsSensors.map(sensor => sensor.valueFull);

  console.log(gpsvaluarry); // Output: ["On"]
  // start lat log sett *************************************************************

  const initialCoordinates = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  // State variables for latitude and longitude
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [zoomlavel, setZoomlavel] = useState(0.075);

  // Function to update the coordinates
  const updateCoordinates = () => {
    // Example: Fetch new coordinates from an API or any other source
    const newCoordinates = {
      latitude: carInfo?.location_data?.lat,
      longitude: carInfo?.location_data?.lng,
    };

    // Update the state with the new coordinates
    setCoordinates(newCoordinates);
  };

  // finish lat log set+++++++++++++++++++++++++++++++++++++++++++++

  const [carInfo, setCarInfo] = useState(null);

  useEffect(() => {
    // Check if devicedata is defined before using find
    if (devicedata) {
      // Find the object with the matching IMEI in devicedata
      console.log(
        'the data of frame 22222222222222222222222222222222',
        devicedata,
      );
      const selectedCar = devicedata.result?.find(car => car.imei === iemei);

      console.log(
        'this is slect car   ===============================',
        selectedCar,
      );

      // Check if the car with the matching IMEI is found
      if (selectedCar) {
        // Extract other information from the selected car
        setCarInfo(selectedCar);
      }
    }

    if (speed > 0) {
      setZoomlavel(0.01);
    } else {
      setZoomlavel(0.075);
    }
  }, [devicedata, iemei]);

  if (!devicedata) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  console.log(
    'this is crinfo ......................... 00000000000000',
    carInfo,
  );
  console.log(
    '????????????????????????????//////////////////////////////////////////////////',
  );
  console.log(coordinates?.latitude);
  console.log(coordinates?.longitude);
  let speed = carInfo?.location_data?.speed
    ? parseInt(carInfo.location_data.speed)
    : null;

  const odometer = carInfo?.odometer;

  if (!carInfo) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  console.log(speed, 'testing speed is ok or not ');

  return (
    <View className=" flex flex-col h-full w-full ">
      {/* ************************* Map implematation ************** */}
      <View className=" flex-1  -z-10 ">
        <MapView
          className=" min-h-screen "
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude: carInfo?.location_data?.lat,
            longitude: carInfo?.location_data?.lng,

            latitudeDelta: zoomlavel,
            longitudeDelta: zoomlavel,
          }}>
          {/* 23.170265, 90.092926 */}
          <Marker
            coordinate={{
              latitude: carInfo?.location_data?.lat,
              longitude: carInfo?.location_data?.lng,
            }}>
            <Image className=" h-[46.44px] w-[13.8px] " source={Mapicon} />
          </Marker>
        </MapView>
      </View>
      {/* **************** Map impleataton Done *********************** */}

      <View className="  h-auto w-auto bg-[#006E99] mx-3 rounded-b-2xl rounded-t-md overflow-hidden pb-6 ">
        <View className=" bg-white relative h-auto w-auto rounded-b-md   ">
          {/* <View
            style={{
              borderBottomWidth: 3,
              borderBottomColor: '#002535',
            }}
          /> */}
          <View className=" flex-row justify-between items-center px-4 pt-1 ">
            <Text className="text-black">
              Mileage: {carInfo?.location_data?.speed}
            </Text>
            <View className="   z-10  ">
              <View className="items-center relative    ">
                <Text className=" absolute text-white left-[30px] z-20 top-[27px] font-bold text-2xl ">
                  {speed}
                </Text>
                <Image className="h-[80] w-[80]  " source={Meter} />
              </View>
            </View>
            <View className="text-center  ">
              <Text className="text-black"> {carInfo?.name} </Text>
              <View className=" w-[120px] ">
                <Text className="text-[#F24E1E]">{carInfo?.status}</Text>
              </View>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className=" flex  flex-row gap-4 pl-2  pt-3 pb-2 ">
            <View className="flex items-center w-auto pt-1">
              <Image className=" h-[30] w-[30]" source={Card1} />
              <Text className="text-black">Engine </Text>
              <Text className="text-black">
                {valueFullArray ? valueFullArray : null}
              </Text>
            </View>
            <View className="flex items-center w-auto pt-3 ">
              <Image className=" h-[24] w-[24]" source={Card2} />
              <Text className="text-black">GPS </Text>
              <Text className="text-black">
                {gpsvaluarry ? gpsvaluarry : null}
              </Text>
            </View>
            <View className="flex items-center w-auto">
              <Image className=" h-[35] w-[36]" source={Card3} />
              <Text className="text-black">Connection</Text>
              <Text className="text-black">{null}</Text>
            </View>
            <View className="flex items-center w-auto pt-4">
              <Image className=" h-[20] w-[25]" source={Card4} />
              <Text className="text-black">Odometer </Text>
              <Text className="text-black">
                {odometer ? `${odometer} ` : '0 km'}
              </Text>
            </View>
            <View className="flex items-center w-auto pt-4">
              <Image className=" h-[21] w-[21]" source={Card5} />
              <Text className="text-black">Time</Text>
            </View>
            <View className="flex items-center w-auto pt-3">
              <Image className=" h-[24] w-[24]" source={Card6} />
              <Text className="text-black">GPS</Text>
              <Text className="text-black">signal</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default LiveTracking;

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
