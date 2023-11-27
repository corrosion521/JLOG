import React, {useCallback, useState} from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Button, Image, SearchBar} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {IPostData, postData} from '../Data/PostData';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export type PostStackParamList = {
  PostHome: undefined;
  PostDetail: {item: IPostData};
  Search: undefined;
  Category: undefined;
};

type PostScreenProps = NativeStackScreenProps<PostStackParamList, 'PostHome'>;

function PostHome({navigation}: PostScreenProps) {
  // 검색창 누르면 검색페이지로 이동
  const toSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const onPressPost = useCallback(
    (item: IPostData) => {
      navigation.navigate('PostDetail', {item});
    },
    [navigation],
  );

  const onPressCategory = useCallback(() => {
    navigation.navigate('Category');
  }, [navigation]);

  // 각 게시물 프레임
  const renderItem = ({item}: {item: IPostData}) => {
    return (
      // <TouchableWithoutFeedback>
      // <SafeAreaView>
      <View style={styles.post}>
        <Pressable onPress={e => onPressPost(item)}>
          <View style={styles.postHeader}>
            <Avatar
              rounded
              source={{
                uri: item.profileImg,
              }}
            />
            <View>
              <View>
                <Text style={styles.postTitle}>{item.title}</Text>
              </View>
              <View>
                <Text style={{fontSize: 12}}>{item.nickname}</Text>
              </View>
            </View>
          </View>
          <Image
            // source={{uri: item.postImg}}
            source={require('../Data/usj.jpg')}
            // source={require(item.postImg)}
            style={{height: 200, borderRadius: 10}}
          />
        </Pressable>
      </View>
      // </SafeAreaView>
      // </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <SearchBar
            onFocus={toSearch}
            placeholder="게시물을 검색해보세요"
            placeholderTextColor={'#8E8D8D'}
            leftIconContainerStyle={{
              backgroundColor: '#F5F5F7',
            }}
            inputContainerStyle={{
              backgroundColor: '#F5F5F7',
              height: 40,
              borderRadius: 18,
            }}
            searchIcon={{color: 'black'}}
            clearIcon={{color: 'black'}}
            inputStyle={{
              backgroundColor: '#F5F5F7',
              color: 'black',
              fontSize: 12,
              // height: 16,
            }}
            containerStyle={{
              backgroundColor: 'none',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
          />
        </View>
        <Pressable onPress={onPressCategory}>
          {/* <Text>카테고리</Text> */}
          <Icon
            name="menu"
            size={20}
            color="black"
            style={{paddingRight: 10}}></Icon>
        </Pressable>
      </View>

      <View
      // style={{
      //   marginBottom: 130,
      // }}
      >
        <Text style={styles.title}>인기 게시물</Text>
        <SafeAreaView
          style={{
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingBottom: 120,
            // flex: 1,
          }}>
          <FlatList
            data={postData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // contentContainerStyle={{flex: 1}}
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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  post: {
    display: 'flex',
    marginBottom: 20,
    // height: 250,
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    columnGap: 5,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PostHome;
