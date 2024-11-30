import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

// for google map....
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from 'react-native-maps';

import Meter from '../assets/meterfinal.png';
import CarMarker from '../assets/markericons/cariconmarker.png';
import Humanview from '../assets/markericons/humantopviewicon.png';
import cartop from '../assets/cartopview.png';
import trafic from '../assets/trafficlights1.png';
import Meter1 from '../assets/meterruhan.png';
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
import Geocoder from 'react-native-geocoding';

const LiveTracking = () => {
  const {iemei, singlecarinfo, iconmarker} = useContext(AuthContext);
  // console.log(
  //   iconmarker,
  //   'cheking icon is comming or not....... **********************************************************************',
  // );
  const {devicedata} = useContext(AuthContext);
  // const {setIemei} = useContext(AuthContext)
  console.log('This is feom Frame 2 i got iemei', iemei);
  console.log(
    'This is feom Frame 2 i got data _++++++++++++++++++++++++++++',
    devicedata,
  );
  const [address, setAddress] = useState('');
  const [mapType, setMapType] = useState('standard');
  const markerRef = useRef();

  const [showtraffic, setShowtraffic] = useState(false);
  // 24.505603, 90.360886
  const fallbackLatitude = 24.505603; // New York City latitude
  const fallbackLongitude = 90.360886; // New York City longitude
  // smooth car tracking....
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: singlecarinfo?.location_data?.lat || fallbackLatitude,
      longitude: singlecarinfo?.location_data?.lng || fallbackLongitude,
      latitudeDelta: zoomlavel,
      longitudeDelta: zoomlavel,
    }),
  );

  const toggleMapType = () => {
    setMapType(prevType => (prevType === 'standard' ? 'hybrid' : 'standard'));
  };

  const handetraffic = () => {
    setShowtraffic(!showtraffic);
  };
  // sensor info....
  const {sensors} = singlecarinfo;
  console.log(sensors);

  // Filter the array based on the condition where name is "Ignition"
  const ignitionSensors = sensors?.filter(
    sensor => sensor?.name === 'Ignition',
  );

  const gpsSensors = sensors?.filter(sensor => sensor?.name === 'GPS Signal');

  // Extract the valueFull for each object in the filtered array
  const valueFullArray = ignitionSensors?.map(sensor => sensor?.valueFull);
  const gpsvaluarry = gpsSensors?.map(sensor => sensor?.valueFull);

  console.log(gpsvaluarry); // Output: ["On"]

  const [zoomlavel, setZoomlavel] = useState(0.075);

  console.log(singlecarinfo, 'this is cheking.. live data...');
  let latitude = singlecarinfo?.location_data?.lat;
  let longitude = singlecarinfo?.location_data?.lng;

  useEffect(() => {
    Geocoder.init('AIzaSyCntjTjNgMy1UOc3MCdtVzuh1JytiEpZFo');

    // Fetch address using reverse geocoding
    Geocoder.from(latitude, longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.log(error));

    if (speed > 0) {
      setZoomlavel(0.01);
    } else {
      setZoomlavel(0.075);
    }
    animate(latitude, longitude);
  }, [iemei, latitude, longitude]);

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  let speed = singlecarinfo?.location_data?.speed
    ? parseInt(singlecarinfo.location_data.speed)
    : null;

  const odometer = singlecarinfo?.odometer;

  if (!singlecarinfo) {
    // Data is still loading, render loading indicator or return null
    return <LoadingSpinner />;
  }

  console.log(speed, 'testing speed is ok or not ');
  console.log(address);
  console.log(singlecarinfo?.location_data?.angle, 'angle cheking..');
  const rotationAngle = singlecarinfo?.location_data?.angle || 0;

  return (
    <View className=" flex flex-col h-full w-full ">
      {/* ************************* Map implematation ************** */}
      <View className=" flex-1  -z-10 ">
        <MapView
          className=" min-h-screen "
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          mapType={mapType}
          showsTraffic={showtraffic}
          region={{
            latitude: singlecarinfo?.location_data?.lat || fallbackLatitude,
            longitude: singlecarinfo?.location_data?.lng || fallbackLongitude,
            latitudeDelta: zoomlavel,
            longitudeDelta: zoomlavel,
          }}>
          {/* 23.170265, 90.092926 */}

          {latitude && longitude && (
            <Marker.Animated ref={markerRef} coordinate={coordinate}>
              <View className=" h-full w-full overflow-visible ">
                <Image
                  // className={`h-[44.44px] w-[13.8px] object-contain  origin-center overflow-visible  transform rotate-${rotationAngle}`}
                  className=" h-[40px] w-[40px]  "
                  source={iconmarker ? iconmarker : Humanview}
                  style={{
                    transform: [
                      {
                        rotate: `${
                          singlecarinfo?.location_data?.angle || 0
                        }deg`,
                      },
                    ],
                  }}
                />
              </View>
            </Marker.Animated>
          )}
        </MapView>
        <View className=" absolute top-3 right-5    ">
          <TouchableOpacity onPress={toggleMapType}>
            <Image className=" h-[30] w-[30]  " source={Card2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handetraffic} className=" mt-3  ">
            <Image className=" h-[40] w-[40]  " source={trafic} />
          </TouchableOpacity>
        </View>
      </View>

      {/* **************** Map impleataton Done *********************** */}

      <View className="  h-auto w-auto bg-[#006E99] mx-3 rounded-b-2xl rounded-t-md overflow-hidden pb-2 my-1 ">
        <View className=" bg-white relative h-auto w-auto rounded-b-md   ">
          <View className=" flex-row justify-between items-center px-4 pt-1 ">
            <Text className="text-black">
              Mileage: {singlecarinfo?.location_data?.speed}
            </Text>
            <View className="   z-10  ">
              <View className="items-center relative    ">
                <Text className=" absolute text-white left-[30px] z-20 top-[27px] font-bold text-2xl ">
                  {speed}
                </Text>
                <Image className="h-[60] w-[85]  " source={Meter1} />
              </View>
            </View>
            <View className="text-center mt-2  ">
              <Text className="text-black"> {singlecarinfo?.name} </Text>
              <View className=" w-[120px] mt-1 ">
                <Text className="text-[#F24E1E]">{singlecarinfo?.status}</Text>
                <Text className="text-[#F24E1E]">
                  {singlecarinfo?.status_time}
                </Text>
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
        <Text className="text-black w-[300px] px-2 py-1 ">
          {address ? address : null}
        </Text>
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
