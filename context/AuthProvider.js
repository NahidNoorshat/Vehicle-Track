import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [iemei, setIemei] = useState();
  const [devicedata, setDevicedata] = useState();
  const [priviousdata, setpreviousdata] = useState();
  const [reportdata, setReportdata] = useState();
  const [singlecarinfo, setSinglecarinf] = useState();
  const [playbackinfo, setPlaybackinfo] = useState();
  const [notifications, setNotification] = useState();

  return (
    <AuthContext.Provider
      value={{
        iemei,
        setIemei,
        devicedata,
        setDevicedata,
        priviousdata,
        setpreviousdata,
        reportdata,
        setReportdata,
        singlecarinfo,
        setSinglecarinf,
        playbackinfo,
        setPlaybackinfo,
        notifications,
        setNotification,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
