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
import CarSetting from '../assets/AppSetting/CarSetting.png';
import OverSpeed from '../assets/AppSetting/OverSpeed.png';
import GeoFence from '../assets/AppSetting/GeoFence.png';

// icons for marker..
import CarIcon from '../assets/markericons/cariconmarker.png';
import Human from '../assets/markericons/humantopviewicon.png';
import TracIcon from '../assets/markericons/Truckicon.png';

const AppSetting = () => {
  const {setIconmarker, singlecarinfo} = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [newModal, setNewModl] = useState(false);
  const {devicedata, alldevice} = useContext(AuthContext);

  // const namesArray = devicedata.result.map(item => item.name);
  const deviceNames = alldevice?.map(device => device.name);

  console.log(
    '88888888888888888888',
    alldevice,
    'All device data 00000000000000000000000000',
  );
  console.log(deviceNames);
  const [openarrow, setOpenarrow] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState(singlecarinfo?.name);

  const [statedata, setStatedata] = useState([]);

  const handlaeIcon = iconMarker => {
    setIconmarker(iconMarker);
    setNewModl(false);
  };

  return (
    <View className=" mx-6 mt-2">
      <AppSetting1 title={'Notification Setting'} />
      <AppSetting2 title={'Notification'} />
      <AppSetting2
        title={'Device Setting'}
        icon={CarSetting}
        setModal={setNewModl}
      />
      <AppSetting2
        title={'Overspeed Setting '}
        setModal={setModal}
        icon={OverSpeed}
      />
      <AppSetting2 title={'GeoFence'} naigator={'GeoFence'} icon={GeoFence} />

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
                    data={deviceNames}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedvalue(item);
                            setOpenarrow(false);
                          }}
                          className=" self-center h-7  ">
                          <Text className="text-lg text-black ">{item}</Text>
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

      <Modal visible={newModal} transparent={true}>
        <View className=" flex-1 justify-center items-center ">
          <View className=" bg-white flex py-4 self-center rounded-xl w-[95%] h-[250px] mx-5 shadow-xl  flex-row gap-4 ">
            <TouchableOpacity onPress={() => handlaeIcon(CarIcon)}>
              <Image source={CarIcon} className=" h-[80px] w-[80px] " />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlaeIcon(Human)}>
              <Image source={Human} className=" h-[80px] w-[80px] " />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlaeIcon(TracIcon)}>
              <Image source={TracIcon} className=" h-[80px] w-[80px] " />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setNewModl(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AppSetting;

const styles = StyleSheet.create({});
