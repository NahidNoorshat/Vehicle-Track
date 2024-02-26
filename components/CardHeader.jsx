import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CardHeader = ({title, contaty}) => {
  //   const nahid = ' flet';
  // const abu = 1;

  return (
    <View
      style={styles.card}
      className="bg-[#FFFFFF]  overflow-hidden h-auto w-auto mx-1  rounded-md">
      <Text className="text-[#006E99] text-[10px] py-1 px-2 leading-[12.1px] ">
        {title} ({contaty})
      </Text>
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#000000',
  },
});
