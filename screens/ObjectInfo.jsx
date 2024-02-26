import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Objectinfobox from '../components/Objectinfobox';
import antenadishicon from '../assets/antenna-dish-icon.png';
import imeiicon from '../assets/imei-icon.png';
import prodcustlineconnecton from '../assets/prodcustlineconnecton.png';
import engineinfo from '../assets/9183608-1.png';
import carnumberplate from '../assets/carnumberplate.png';
import simcard from '../assets/simcard.png';
import expiarydate from '../assets/expiarydate.png';
import odometericon from '../assets/odometericon.png';
import enghour from '../assets/enghour.png';
import {AuthContext} from '../context/AuthProvider';

const ObjectInfo = () => {
  const {singlecarinfo} = useContext(AuthContext);
  console.log(singlecarinfo, 'This is chekcing single car infot......');

  const imeinum = singlecarinfo?.imei;
  const obometer = singlecarinfo?.odometer;
  const enghours = singlecarinfo?.engine_hours;
  const nameobjec = singlecarinfo?.name;
  const {sensors} = singlecarinfo;
  console.log(sensors);

  // Filter the array based on the condition where name is "Ignition"
  const ignitionSensors = sensors.filter(sensor => sensor?.name === 'Ignition');

  const gpsSensors = sensors.filter(sensor => sensor?.name === 'GPS Signal');

  // Extract the valueFull for each object in the filtered array
  const valueFullArray = ignitionSensors.map(sensor => sensor.valueFull);
  const gpsvaluarry = gpsSensors.map(sensor => sensor.valueFull);

  console.log(valueFullArray); // Output: ["On"]

  return (
    <View className=" flex flex-row justify-around flex-wrap">
      <Objectinfobox title={'IMEI'} imgsrc={imeiicon} objectinfo={imeinum} />
      <Objectinfobox
        title={'GPS'}
        imgsrc={antenadishicon}
        objectinfo={gpsvaluarry}
      />
      <Objectinfobox title={'Connection'} imgsrc={prodcustlineconnecton} />
      <Objectinfobox
        title={'Ignition'}
        imgsrc={engineinfo}
        objectinfo={valueFullArray}
      />
      <Objectinfobox
        title={'Plate Num'}
        imgsrc={carnumberplate}
        objectinfo={nameobjec}
      />
      <Objectinfobox title={'Sim Num'} imgsrc={simcard} />
      <Objectinfobox title={'Devices'} imgsrc={engineinfo} />
      <Objectinfobox title={'Expiry Date'} imgsrc={expiarydate} />
      <Objectinfobox
        title={'Odometer'}
        imgsrc={odometericon}
        objectinfo={obometer}
      />
      <Objectinfobox
        title={'Eng. Hour'}
        imgsrc={enghour}
        objectinfo={enghours}
      />
    </View>
  );
};

export default ObjectInfo;

const styles = StyleSheet.create({});
