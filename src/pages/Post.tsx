import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PostList from './PostList';
import SearchBox from './SearchBox';
import Category from './Categoty';

const Stack = createNativeStackNavigator();

function Post() {
  return (
    // navigator 중첩 -> 초반에 작업하기!
    <Stack.Navigator initialRouteName="PostList">
      <Stack.Screen
        name="PostList"
        component={PostList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchBox}
        // component={Search}
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
