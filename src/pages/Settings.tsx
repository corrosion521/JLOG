import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import First from './First';
import Root from './Root';
import SettingsMy from './SettingsMy';
import SettingsPosts from './SettingsPosts';
import SettingsReply from './SettingsReply';
import SettingsScrap from './SettingsScrap';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function Settings() {

  const Tab = createMaterialTopTabNavigator();

  return (
    // <View>
    //   <Text>세팅 화면</Text>
    // </View>
    <Tab.Navigator
      initialRouteName='SettingsPosts'
    >

      <Tab.Screen
        name="SettingsPosts"
        component={SettingsPosts}
        options={{
          title: '게시글'
        }}

      />
      <Tab.Screen
        name="SettingsReply"
        component={SettingsReply}
        options={{
          title: '댓글'
        }}
      />
      <Tab.Screen
        name="SettingsScrap"
        component={SettingsScrap}
        options={{
          title: '스크랩'

        }}
      />
      <Tab.Screen
        name="SettingsMy"
        component={SettingsMy}
        options={{
          title: '개인정보'

        }}
      />
    </Tab.Navigator >
  );
}



export default Settings;
