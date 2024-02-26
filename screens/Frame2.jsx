import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import CardHeader from '../components/CardHeader';
import CarDisplayhome from '../components/CarDiaplayhome';
import ContainerFrame2 from '../components/ContainerFrame2';
import {AuthContext} from '../context/AuthProvider';

const Frame2 = () => {
  const {iemei} = useContext(AuthContext);
  const {devicedata, setSinglecarinf} = useContext(AuthContext);
  // const {setIemei} = useContext(AuthContext)
  // console.log('This is feom Frame 2 i got iemei', iemei);
  // console.log(
  //   'This is feom Frame 2 i got data _++++++++++++++++++++++++++++',
  //   devicedata,
  // );

  const [carInfo, setCarInfo] = useState(null);
  useEffect(() => {
    // Check if devicedata is defined before using find
    if (devicedata) {
      // Find the object with the matching IMEI in devicedata
      // console.log(
      //   'the data of frame 22222222222222222222222222222222',
      //   devicedata,
      // );
      const selectedCar = devicedata.result?.find(car => car.imei === iemei);

      // console.log(
      //   'this is slect car   ===============================',
      //   selectedCar,
      // );

      // Check if the car with the matching IMEI is found
      if (selectedCar) {
        // Extract other information from the selected car
        setCarInfo(selectedCar);
        setSinglecarinf(selectedCar);
      }
    }
  }, [devicedata, iemei]);

  console.log(
    'this is crinfo ......................... 00000000000000',
    carInfo,
  );

  const [display, setDisplay] = useState(true);

  let all = devicedata?.total;
  let moving = devicedata?.moving;
  let stopped = devicedata?.stopped;
  let idle = devicedata?.idle;
  let online = devicedata?.online;
  let offline = devicedata?.offline;
  let expired = devicedata?.expired;
  let inactive = devicedata?.inactive;
  console.log(all);

  return (
    <View>
      <Header />
      <ScrollView
        className=" mt-7 ml-3 "
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <CardHeader title="All" contaty={all} />
        <CardHeader title="moving" contaty={moving} />
        <CardHeader title="stopped" contaty={stopped} />
        <CardHeader title="idle" contaty={idle} />
        <CardHeader title="online" contaty={online} />
        <CardHeader title="offline" contaty={offline} />
        <CardHeader title="expired" contaty={expired} />
        <CardHeader title="inactive" contaty={inactive} />
      </ScrollView>

      <CarDisplayhome
        setDisplay={setDisplay}
        dislpay={display}
        data={carInfo}
      />
      {display ? (
        <View>
          <ContainerFrame2 />
        </View>
      ) : null}
    </View>
  );
};

export default Frame2;

const styles = StyleSheet.create({});
