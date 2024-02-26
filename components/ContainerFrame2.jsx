import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IneerCardFrame2 from './IneerCardFrame2';
import card1 from '../assets/2290123-1.png';
import card2 from '../assets/-icon-sport-car.png';
import card3 from '../assets/7171906-1.png';
import card4 from '../assets/1008754-1.png';
import card5 from '../assets/2040880-1.png';
import card6 from '../assets/9183608-1.png';
import card7 from '../assets/191500-1.png';
import card8 from '../assets/2415836-1.png';

const ContainerFrame2 = () => {
  return (
    <View className=" flex flex-row flex-wrap  bg-[#FFFFFF] h-auto w-auto mx-5 mt-9 rounded-lg pl-4  pt-9  ">
      <IneerCardFrame2
        title="Live tracking"
        img={card1}
        screenName={'LiveTracking'}
      />
      <IneerCardFrame2
        title={'Object Info'}
        img={card2}
        screenName={'Objectinfo'}
      />
      <IneerCardFrame2
        title={'Trip Info'}
        img={card3}
        screenName={'LiveTracking'}
      />
      <IneerCardFrame2 title={'Lock'} img={card4} screenName={'Command'} />
      <IneerCardFrame2
        title={'Km Summary'}
        img={card5}
        screenName={'KmSummary'}
      />
      <IneerCardFrame2 title={'Eng. Hour'} img={card6} screenName={'EngHour'} />
      <IneerCardFrame2
        title={'Sen. Duration'}
        img={card7}
        screenName={'LiveTracking'}
      />
      <IneerCardFrame2 title={'Reports'} img={card8} screenName={'Report'} />
    </View>
  );
};

export default ContainerFrame2;

const styles = StyleSheet.create({});
