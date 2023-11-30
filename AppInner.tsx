import Settings from './src/pages/Settings';
import Posts from './src/pages/Post';
import { useState } from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Root from './src/pages/Root';
import First from './src/pages/First';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './src/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import SettingsMy from './src/pages/SettingsMy';
import { KeyboardAvoidingView } from 'react-native';
import RootList from './src/pages/RootList';
export type LoggedInParamList = {
    Settings: undefined;
    Root: undefined;
    Posts: undefined;
    Complete: { orderId: string };
};

//스택
export type RootStackParamList = {
    SignIn: { isLoggedIn?: boolean }; // 상태 조작
    SignUp: undefined;
    First: undefined;
};

export type SettingStackParamList = {
    My: undefined; // 상태 조작
    Posts: undefined;
    Reply: undefined;
    Scrap: undefined;
};

function AppInner() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator<RootStackParamList>();

    // const { isLoggedIn } = useAuth();
    const { isLoggedIn } = useAuth();
    //const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        isLoggedIn ? (
            <Tab.Navigator >
                <Tab.Screen
                    name="Posts"
                    component={Posts}
                    options={{
                        title: '게시물',

                    }}

                />
                <Tab.Screen
                    name="Root"
                    component={Root}
                    options={{ title: '나의 경로' }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{ title: '마이페이지' }}
                />
            </Tab.Navigator >

        ) : (
            <Stack.Navigator>
                <Stack.Screen
                    name="First"
                    component={First}
                    options={{
                        title: '초기',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ title: '로그인' }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ title: '회원가입' }}
                />
            </Stack.Navigator>)



    );
}
export default AppInner;
