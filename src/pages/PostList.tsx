import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, Image, SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

export type SearchStackParamList = {
  PostList: undefined;
  Search: undefined;
  Category: undefined;
};

// const Stack = createNativeStackNavigator<SearchStackParamList>();
const Stack = createNativeStackNavigator();

// * To Do : 서버에서 게시물 정보 받아오기 *

// 게시물 dummy data
// Post 타입 정의
export interface Post {
  title: string;
  nickname: string;
  profileImg: string;
  postImg: string;
  id: string;
}

// Post 타입의 배열 posts 변수 (게시물 리스트)
const posts: Post[] = [
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: 'usj.jpeg',
    id: '1',
  },
  {
    title: 'osaka',
    nickname: 'nick',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../post',
    id: '2',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '3',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '4',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '5',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '6',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '7',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '8',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '9',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '10',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '11',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '12',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '13',
  },
  {
    title: 'osaka',
    nickname: 'nick',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '14',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '15',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '16',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '/src/Data/usj.jpeg',
    id: '17',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '18',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '19',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '20',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '21',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '22',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '23',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '24',
  },

];

type SearchScreenProps = NativeStackScreenProps<
  SearchStackParamList,
  'PostList'
>;

function PostList({ navigation }: SearchScreenProps) {
  // 검색창 누르면 검색페이지로 이동
  const toSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const onPressPost = () => {
    // * To Do : 게시물 상세페이지로 이동 *
    Alert.alert('You press the post');
  };

  const onPressCategory = useCallback(() => {
    navigation.navigate('Category');
  }, [navigation]);

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <Pressable onPress={onPressPost}>
          <View>
            <Text>id: {item.id}</Text>
          </View>
          <Avatar
            rounded
            source={{
              uri: item.profileImg,
            }}
          />
          <View>
            <Text>title: {item.title}</Text>
          </View>
          <View>
            <Text>nickname: {item.nickname}</Text>
          </View>
          <Image
            // source={{uri: item.postImg}}
            source={require('../Data/usj.jpeg')}
            // source={require(item.postImg)}
            style={{ height: 200 }}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <SearchBar
            onFocus={toSearch}
            placeholder="게시물을 검색해보세요"
            placeholderTextColor={'#8E8D8D'}
            leftIconContainerStyle={{ backgroundColor: '#F5F5F7' }}
            inputContainerStyle={{ backgroundColor: '#F5F5F7' }}
            searchIcon={{ color: 'black' }}
            clearIcon={{ color: 'black' }}
            inputStyle={{
              backgroundColor: '#F5F5F7',
              color: 'black',
            }}
            containerStyle={{
              backgroundColor: 'none',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
          />
        </View>
        <Pressable onPress={onPressCategory}>
          <Text>카테고리</Text>
        </Pressable>
      </View>
      <View style={{ marginBottom: 150 }}>
        <Text style={styles.title}>인기 게시물</Text>
        <SafeAreaView
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default PostList;
