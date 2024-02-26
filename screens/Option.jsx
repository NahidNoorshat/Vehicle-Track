import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import OptionCard from '../components/OptionCard';

// image..

import Card1 from '../assets/mdipaymentclock.png';
import Card2 from '../assets/solartagpricebold.png';
import Card3 from '../assets/ricustomerservice2line.png';
import Card4 from '../assets/mdiabout.png';
import Card5 from '../assets/bisharefill.png';
import Card6 from '../assets/callreporticon3-1.png';
import OptionCard2 from '../components/OptionCard2';

// image option2...

import card1 from '../assets/flatcoloriconssettings.png';
import card2 from '../assets/codicondebugb.png';
import card3 from '../assets/ictwotoneprivacytip.png';
import card4 from '../assets/majesticonslogout.png';

const Option = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <View className=" flex flex-row flex-wrap ml-12 mt-4 ">
          <OptionCard src={Card1} title={'Play Now'} />
          <OptionCard src={Card2} title={'Pricing'} />
          <OptionCard src={Card3} title={'Live support'} />
          <OptionCard src={Card4} title={'About Us'} />
          <OptionCard src={Card5} title={'Share Location'} />
          <OptionCard src={Card6} title={'Report'} />
        </View>
        <View className=" mt-5 mx-12">
          <OptionCard2 src={card1} title={'App Settings'} navi="AppStting" />
          <OptionCard2
            src={card2}
            title={'Terms and Condition'}
            navi="AppStting"
          />
          <OptionCard2 src={card3} title={'Privacy Policy'} navi="AppStting" />
          <OptionCard2 src={card4} title={'Logout'} navi="Login" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({});
