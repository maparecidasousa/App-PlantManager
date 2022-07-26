import 'react-native-gesture-handler';

import * as Notifications from 'expo-notifications';

import {
 Jost_400Regular,
 Jost_600SemiBold,
 useFonts
} from '@expo-google-fonts/jost';
import React, {useEffect} from "react";

import AppLoading from "expo-app-loading";
import { PlantProps } from './src/libs/storage';
import Routes from './src/routes';

export default function App() {
const [fontsLoaded] =  useFonts({
  Jost_400Regular,
  Jost_600SemiBold
})

useEffect(() => {
  const subscription = Notifications.addNotificationReceivedListener(
    async notification => {
      const data = notification.request.content.data.plant as PlantProps;
      console.log(data)
    }
  )

  return () => subscription.remove();
},[])


if (!fontsLoaded) {
  return <AppLoading />;
}

  return (
   <Routes/>
 )}
