import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Header from '../components/Header';
import NotificationInner from '../components/NotificationInner';
import {AuthContext} from '../context/AuthProvider';
import {isDate} from 'moment';

const Notify = () => {
  const {notifications} = useContext(AuthContext);
  console.log(notifications);
  const body = notifications?.notification.body;
  console.log(body);

  return (
    <View>
      <Header />
      <ScrollView>
        <View className="bg-[#FFFFFF] mx-5 mt-7 px-6 py-5 mb-2 rounded-2xl overflow-hidden">
          <Text className="text-[14px] leading-[14.52px] text-black ">
            Sometimes you may not get some notificationsdue to GPS coverage,
            network errors, batteryvoltage issues and unsupported vehicles.
          </Text>
        </View>
        <NotificationInner body={body} />
      </ScrollView>
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({});
