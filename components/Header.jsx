import {StyleSheet, Image, Text, View, StatusBar} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View>
      <View className="bg-white flex flex-row justify-between items-center">
        <StatusBar
          backgroundColor="blue" // Example: Change color as needed
          barStyle="light-content" // Example: Set bar style
          hidden={false}
        />
        <Image
          style={styles.icon}
          resizeMode="cover"
          className="mt-2"
          source={require('../assets/20231018-022628-0000-11.png')}
        />
        <View className="mt-7 mr-4">
          <Image
            style={styles.materialSymbolssearchIcon}
            resizeMode="cover"
            source={require('../assets/materialsymbolssearch.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  icon: {
    width: 74,
    height: 64,
    left: 26,
  },
  materialSymbolssearchIcon: {
    height: 24,
    width: 24,
  },
});
