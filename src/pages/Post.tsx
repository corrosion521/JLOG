import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PostHome, {PostStackParamList} from './PostHome';
import Search from './Search';
import Category from './Categoty';
import PostDetail from './PostDetail';

const Stack = createNativeStackNavigator<PostStackParamList>();

function Post() {
  return (
    // navigator 중첩 -> 초반에 작업하기!
    <Stack.Navigator initialRouteName="PostHome">
      <Stack.Screen
        name="PostHome"
        component={PostHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={
          {
            // headerShown: false
          }
        }
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default Post;
