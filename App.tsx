/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

const Stack = createNativeStackNavigator();
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './screens/Login';
import Frame1 from './screens/Frame1';
import Frame2 from './screens/Frame2';
import TabNavigation from './screens/TabNavigation';
import LiveTracking from './screens/LiveTracking';
import AppSetting from './screens/AppSetting';
import Splash from './screens/Splash';
import AuthProvider, {AuthContext} from './context/AuthProvider';
import Playback from './screens/Playback';
import PlaybackShow from './screens/PlaybackShow';
import Dashbord from './screens/Dashbord';
import Map from './screens/Map';
import GeoFence from './screens/GeoFence';
import Command from './screens/Command';
import ObjectInfo from './screens/ObjectInfo';
import KmSummary from './screens/KmSummary';
import EngHour from './screens/EngHour';
import Report from './screens/Report';
import ShowReport from './screens/ShowReport';

import {LogLevel, OneSignal} from 'react-native-onesignal';
import Checkingtheapp from './screens/Checkingtheapp';

function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const {setNotification} = React.useContext(AuthContext);

  React.useEffect(() => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize('8dd03440-24d4-492f-be6d-608209ce9c9a');
    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      setNotification(event);
    });

    // let see what happen...
  }, []);
  return (
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Frame1"
            component={Frame1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tab"
            component={TabNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LiveTracking"
            component={LiveTracking}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Playback"
            component={Playback}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="PlaybackShow"
            component={PlaybackShow}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="AppStting"
            component={AppSetting}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Dashbord"
            component={Dashbord}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GeoFence"
            component={GeoFence}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Command"
            component={Command}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Objectinfo"
            component={ObjectInfo}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="KmSummary"
            component={KmSummary}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="EngHour"
            component={EngHour}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Report"
            component={Report}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="ShowReport"
            component={ShowReport}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
    // </AuthProvider>
  );
}

export default App;
