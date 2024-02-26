import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AppSetting1 from '../components/AppSetting1';
import AppSetting2 from '../components/AppSetting2';
import changedeviceicon from '../assets/changedeviceicon.svg';
import geofence from '../assets/geofence.svg';
import downarrow from '../assets/down-arrow.png';
import upload from '../assets/upload.png';
import {AuthContext} from '../context/AuthProvider';

const AppSetting = () => {
  const [modal, setModal] = useState(false);
  const {devicedata} = useContext(AuthContext);

  const namesArray = devicedata.result.map(item => item.name);

  console.log(namesArray);
  const [openarrow, setOpenarrow] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState('Hello Nahid.');

  const [statedata, setStatedata] = useState([]);

  return (
    <View className=" mx-6 mt-2">
      <AppSetting1 title={'Notification Setting'} />
      <AppSetting2 title={'Notification'} />
      <AppSetting2 title={'Device Setting'} />
      <AppSetting2 title={'Overspeed Setting '} setModal={setModal} />
      <AppSetting2 title={'GeoFence'} naigator={'GeoFence'} />
      <AppSetting2 title={'Notification'} />
      <AppSetting2 title={'Notification'} />

      <Modal visible={modal} transparent={true}>
        <View className=" flex-1  justify-center items-center  ">
          <View className=" bg-transparent/50 flex py-4 items-center gap-3 rounded-xl w-[95%] h-[250px] mx-2 ">
            <Text className=" text-xl text-white font-semibold ">
              OverSpeed Limit
            </Text>
            <View className=" bg-white p-5 w-[90%] rounded-xl relative ">
              <View className=" flex flex-row justify-between w-full  ">
                <Text className=" text-black font-medium text-lg ">
                  {selectedvalue}
                </Text>
                <TouchableOpacity onPress={() => setOpenarrow(!openarrow)}>
                  <Image
                    source={openarrow ? upload : downarrow}
                    className={`${openarrow} ? " h-6 w-6 ": "h-8 w-8" `}
                  />
                </TouchableOpacity>
              </View>
              {openarrow && (
                <View className=" absolute top-14 left-0 h-[150px] w-[113%] bg-white z-10 shadow-xl drop-shadow-xl rounded-b-xl ">
                  <FlatList
                    data={statedata}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedvalue(item.name);
                            setOpenarrow(false);
                          }}
                          className=" self-center h-7  ">
                          <Text className="text-lg text-black ">
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}

              <TextInput keyboardType="numeric" placeholder="Inter text" />
              <TouchableOpacity
                className=" flex flex-row justify-end "
                onPress={() => setModal(false)}>
                <Text className=" text-black ">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppSetting;

const styles = StyleSheet.create({});
