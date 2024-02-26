import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const FIlterbutton = ({label, isActive, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.filterButton,
          isActive ? styles.activeFilterButton : null,
        ]}
        onPress={onPress}>
        <Text style={isActive ? styles.activeButtonText : styles.buttonText}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FIlterbutton;

const styles = StyleSheet.create({
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: 5,
    marginVertical: 3,
  },
  activeFilterButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#333',
  },
  activeButtonText: {
    color: 'white',
  },
});
