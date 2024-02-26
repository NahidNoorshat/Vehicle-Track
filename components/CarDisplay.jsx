import {StyleSheet, Pressable, Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Color, Border, FontSize, FontFamily} from '../GlobalStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../context/AuthProvider';

const CarDisplay = ({data}) => {
  const navigation = useNavigation();
  const {setIemei} = useContext(AuthContext);

  const handlePress = () => {
    console.log('the IMEI Number', data.imei);
    // navigation.navigate('Tab');
    setIemei(data.imei);
    navigation.navigate('Tab', {carData: data});
  };

  return (
    <View className="mt-2 mb-4 ">
      <Pressable style={[styles.frame1InnerShadowBox]} onPress={handlePress}>
        <View style={styles.frame1Child1ShadowBox}>
          <View className="flex flex-row items-center flex-1 justify-between mr-2">
            <View className="flex flex-row items-center gap-2">
              <Image
                style={styles.carConvertible005RemovebgIcon}
                resizeMode="cover"
                className=" mx-3"
                source={require('../assets/car--convertible-005removebgpreview-1.png')}
              />
              <View className="flex ">
                <Text
                  className="mb-2"
                  style={[styles.dmKa122563, styles.pmTypo]}>
                  {/* DM KA 12-2563 */}
                  {data?.name}
                  {/* if (data !== null && data.name !== null){' '}
                {
                  // Access the name property
                  data.name
                } */}
                </Text>
                <View className="flex flex-row gap-2 mb-1">
                  <Image
                    className="h-[11.03px] w-[15px]"
                    resizeMode="cover"
                    source={require('../assets/group.png')}
                  />
                  <Text style={[styles.kmhTypo]}>
                    {data.location_data.speed}/h
                  </Text>
                </View>
                <View className="flex flex-row gap-2 ">
                  <Image
                    className=" h-[11px] w-[11px]  mr-1 "
                    resizeMode="cover"
                    source={require('../assets/eloff.png')}
                  />
                  <Text style={[styles.kmhTypo]}> {data.status} </Text>
                </View>
              </View>
            </View>
            <Image
              //   className="absolute top-2 right-2"
              className=" mb-16"
              style={[
                styles.icbaselineMenuOpenIcon1,
                styles.icbaselineIconLayout,
              ]}
              resizeMode="cover"
              source={require('../assets/icbaselinemenuopen.png')}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CarDisplay;

const styles = StyleSheet.create({
  frame1Child1ShadowBox: {
    height: 105,
    width: 333,
    elevation: 1,
    shadowRadius: 1,
    borderRadius: Border.br_8xs,
    marginLeft: -166,
    left: '50%',
    backgroundColor: Color.colorWhite,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  frame1InnerShadowBox: {
    height: 109,
    width: 333,
    elevation: 1,
    shadowRadius: 1,
    backgroundColor: Color.colorSteelblue,
    marginLeft: -166,
    borderRadius: Border.br_8xs,
    left: '50%',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  carConvertible005RemovebgIcon: {
    // top: 164,
    // left: 38,
    width: 100,
    height: 63,
  },
  dmKa122563: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: '600',

    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
  },
  pmTypo: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
  },
  kmhTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',

    color: Color.colorBlack,
    textAlign: 'left',
    fontSize: FontSize.size_3xs,
  },
  icbaselineIconLayout: {
    height: 19,
    width: 18,
  },
});
