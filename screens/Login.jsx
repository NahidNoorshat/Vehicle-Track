import {
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    // Check if a token exists in AsyncStorage
    const token = await AsyncStorage.getItem('token');
    console.log('this is testing...', token);

    // If a token exists, navigate to the home screen
    if (token) {
      navigation.navigate('Frame1');
    }
  };

  const handlePressLog = async () => {
    try {
      // Replace the URL with your server authentication endpoint
      const response = await axios.post(
        'https://gps.speedotrack.com/api/login',
        {
          uname: username,
          pwd: password,
        },
      );

      // Assuming the server responds with a JWT in the 'token' property
      const token = response.data.token.token;

      // Store the token securely on the device
      await AsyncStorage.setItem('token', JSON.stringify(token));

      // Navigate to the home screen upon successful login
      navigation.navigate('Frame1');
    } catch (error) {
      console.error('Login failed', error);
      // Handle login error (e.g., display an error message)
    }
  };

  // axios
  //   .post('https://gps.speedotrack.com/api/login', {
  //     uname: 'admin',
  //     pwd: '123456',
  //   })
  //   .then(function (response) {
  //     console.log(response.data.token.token);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return (
    <View>
      <StatusBar hidden />
      <ImageBackground
        className=" h-full "
        source={require('../assets/Bacground.png')}>
        <View className=" top-12 mx-10 px-5 my-9 h-[500] bg-[#ffffff] opacity-30  rounded-lg " />
        <View className="absolute top-14 mt-8 left-[50]   mx-6  ">
          <Image
            className="  h-[140] mx-12"
            source={require('../assets/20231018-022628-0000-1.png')}
          />
          <Text className=" text-[#006E99] mx-6 ">
            Welcome to RunXol GPS Tracker
          </Text>

          <View className=" mt-6">
            <TextInput
              placeholder="USERNAME"
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.textInput}
              className=" text-black "
            />
            <TextInput
              placeholder="Password."
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.textInput}
              className="text-black"
            />
          </View>
          <TouchableOpacity
            onPress={handlePressLog}
            className="bg-[#006E99] items-center py-2 rounded-md mt-7">
            <Text className="text-white">Log in</Text>
          </TouchableOpacity>
          {/* <Pressable>
            <Text className=" text-red-600 mt-9 ml-20 opacity-75 ">
              Forgot Passowrd
            </Text>
          </Pressable> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#006E99',
    borderRadius: 5,
    padding: 2,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    marginTop: 15,
  },
});
