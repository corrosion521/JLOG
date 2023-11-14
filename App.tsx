import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Posts from './src/pages/Post';
import { useState } from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Root from './src/pages/Root';
import First from './src/pages/First';
import { AuthProvider, useAuth } from './src/AuthContext';
import AppInner from './AppInner';

export type LoggedInParamList = {
  Settings: undefined;
  Root: undefined;
  Complete: { orderId: string };

};

//스택
export type RootStackParamList = {
  SignIn: { isLoggedIn?: boolean }; // 상태 조작
  SignUp: undefined;
  First: undefined;
  Posts: undefined;


};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  // App 컴포넌트에서

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppInner></AppInner>

      </NavigationContainer>

    </AuthProvider>

  );
}

export default App;
