/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthProvider, {AuthContext} from './context/AuthProvider';

const Root = () => {
  return (
    <AuthProvider>
      {/* Wrap your root component with the Context Provider */}
      <App />
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);

// AppRegistry.registerComponent(appName, () => App);
