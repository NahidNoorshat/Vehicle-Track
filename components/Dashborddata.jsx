import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Routelanth from '../assets/Routelanth.png';
import {AuthContext} from '../context/AuthProvider';

const Dashborddata = ({report, date, timePart, title}) => {
  const {reportdata} = useContext(AuthContext);
  // console.log(report, 'chekcthis also');

  // console.log(reportdata, 'why data not come.............. ');
  return (
    <View className=" w-[160px]  mx-2 my-1  h-auto ">
      <View className="bg-white rounded-lg px-3 py-2 flex flex-row ">
        <View className=" mr-2 flex-1 ">
          <Text className=" text-black ">{title}:</Text>
          {report && (
            <Text className=" text-blue-800 font-semibold">{report}</Text>
          )}

          {date && timePart && (
            <View>
              <Text className=" text-blue-800 font-semibold">{date}</Text>
              <Text className=" text-blue-800 font-semibold ">{timePart}</Text>
            </View>
          )}
        </View>
        <View>
          <Image source={Routelanth} className=" h-7 w-7 " />
        </View>
      </View>
    </View>
  );
};

export default Dashborddata;

const styles = StyleSheet.create();
