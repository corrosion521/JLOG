import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PostHome, {PostStackParamList} from './PostHome';
import Search from './Search';
import Category from './Categoty';
import PostDetail from './PostDetail';
import {Pressable, Share, Text} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Stack = createNativeStackNavigator<PostStackParamList>();

function Post() {
  return (
    // navigator 중첩 -> 초반에 작업하기!
    <Stack.Navigator initialRouteName="PostHome">
      {/* 게시물 홈 */}
      <Stack.Screen
        name="PostHome"
        component={PostHome}
        options={{headerShown: false}}
      />
      {/* 게시물 상세 페이지 */}
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          // headerShown: false
          // headerRight(props) {},
          headerTitle: '',
          headerRight(props) {
            return (
              // * To Do : 게시물 페이지 링크 공유
              <Pressable
                onPress={async uri => await Share.share({message: `${uri}`})}>
                {/* <Text>공유하기</Text> */}
                <Icon name="share-alt" size={20} color="black"></Icon>
              </Pressable>
            );
          },
          headerStyle: {backgroundColor: 'white'},
          headerShadowVisible: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
      {/* 검색 페이지 */}
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      {/* 카테고리 페이지 */}
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Post;
