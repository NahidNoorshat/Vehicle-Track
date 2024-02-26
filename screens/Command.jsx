import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import closeloock from '../assets/padlock.png';

const Command = () => {
  return (
    <View>
      <View className=" my-4 mx-3 bg-white rounded-xl shadow-lg p-2 ">
        <View className="flex flex-row justify-between mx-2">
          <Text className=" text-black text-base font-medium">
            Hello nahid...
          </Text>
          <Text className="text-black text-base font-medium"> 012343455 </Text>
        </View>
        <Text className=" self-center text-red-700 font-medium text-base mt-1 ">
          Device Suppoerted:
        </Text>
      </View>
      <View className=" flex flex-row justify-between sm:mx-12 mx-16 ">
        <TouchableOpacity>
          <View className=" bg-red-600 h-24 w-24 rounded-full  flex items-center justify-center  ">
            <View className=" bg-green-800 h-[70px] w-[70px] rounded-full flex justify-center items-center ">
              <Image source={closeloock} className=" h-6 w-6  " />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className=" bg-green-600 h-24 w-24 rounded-full flex items-center justify-center  ">
            <View className=" bg-red-800 h-[70px] w-[70px] rounded-full flex justify-center items-center ">
              <Image source={closeloock} className=" h-6 w-6  " />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View className="  mx-5 my-3 flex  flex-row items-center ">
        <TextInput
          placeholder="Send Custom Command"
          className=" px-3 py-2 text-black flex-1 bg-white rounded-xl shadow-lg mx-5 my-2 "
        />
        <TouchableOpacity>
          <Text className=" text-black bg-white rounded-xl p-2  ">send</Text>
        </TouchableOpacity>
      </View>
      <View className=" mt-5  ">
        <Text className=" text-black text-base font-medium mx-4">
          Command History
        </Text>
        <Text className=" text-black self-center mt-2 ">*Gps Command Only</Text>
      </View>
    </View>
  );
};

export default Command;

const styles = StyleSheet.create({});
