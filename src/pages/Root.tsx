import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Complete from './Complete';
import Ing from './Ing';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function Root() {
    return (
        // <Stack.Navigator>
        //     <Stack.Screen 
        //     name="Ing" component={Ing} options={{ title: '내 오더' }} />
        //     <Stack.Screen
        //         name="Complete"
        //         component={Complete}
        //         options={{ title: '완료하기' }}
        //     />
        // </Stack.Navigator>
        <View>
            <Text>경로 화면</Text>
        </View>
    );
}

export default Root;
