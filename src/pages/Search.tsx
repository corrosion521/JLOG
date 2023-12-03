import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, SearchBar} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {IPostData, searchAPI, postData} from '../Data/PostData';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {KeyboardAvoidingView} from 'react-native';

function SearchBox({navigation}) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]); // 검색 결과 담을 list
  const [keyword, setKeyword] = useState<string>(''); // 검색 키워드
  const [showResult, setShowResult] = useState(false); // 검색 결과 출력 유무 관리

  // 키워드 입력
  const onChangeKeyword = useCallback((text: string) => {
    if (text === '') setShowResult(false);
    setKeyword(text.trim()); // 입력한 키워드에서 공백 제거
  }, []);

  // 게시물 목록 가져오기
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    fetch('http://jlog.shop/api/v1/post?pageNumber=0&pageSize=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          setPostData(result.result.postList);

          console.log(result.result);
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('알림', result.message);
        }
      });
  }, []);

  // 검색 기능
  const searchAPI = (keyword: string) => {
    return postData.filter(
      v => v.title.includes(keyword) || v.nickname.includes(keyword),
    );
  };

  useEffect(() => {
    const getList = () => {
      try {
        setLoading(true);
        // if have API, set here

        // I just use dummy data.
        const data = searchAPI(keyword);
        setList(data);
      } catch (error) {
        // code error
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      getList();
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  const onPressPost = useCallback(
    item => {
      navigation.navigate('PostDetail', {item});
    },
    [navigation],
  );

  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );

  // 각 게시물 프레임
  const renderItem = ({item}: {item}) => {
    if (item.member.imageUrl != null) setProfileImg(item.member.imageUrl);
    return (
      <View style={styles.post}>
        <Pressable onPress={e => onPressPost(item)}>
          <View style={styles.postHeader}>
            <Avatar
              rounded
              source={{
                uri: profileImg,
              }}
            />
            <View>
              <View>
                <Text style={styles.postTitle}>{item.title}</Text>
              </View>
              <View>
                <Text style={{fontSize: 12}}>{item.member.nickname}</Text>
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <SearchBar
          placeholder="키워드, 작성자 입력"
          onChangeText={onChangeKeyword}
          value={keyword}
          placeholderTextColor={'#8E8D8D'}
          leftIconContainerStyle={{backgroundColor: '#F5F5F7'}}
          inputContainerStyle={{backgroundColor: '#F5F5F7', height: 32}}
          searchIcon={{color: 'black'}}
          clearIcon={{color: 'black'}}
          inputStyle={{
            backgroundColor: '#F5F5F7',
            color: 'black',
            fontSize: 12,
            height: 12,
          }}
          containerStyle={{
            // backgroundColor: 'none',
            backgroundColor: '#F5F5F7',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          autoFocus
          enterKeyHint="search"
          onSubmitEditing={() => setShowResult(true)}
        />
        {showResult ? (
          <View>
            <SafeAreaView
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingTop: 10,
              }}>
              <FlatList
                keyExtractor={item => item.id}
                data={list}
                // disableScrollViewPanResponder={true}
                ListEmptyComponent={() => (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        display: 'flex',
                        paddingVertical: 10,
                      }}>
                      검색 내용이 없습니다.
                    </Text>
                  </View>
                )}
                renderItem={renderItem}
              />
            </SafeAreaView>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>최근 검색</Text>
          </View>
        )}
      </DismissKeyboardView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  // fontStyle: {
  //   fontSize: 14,
  //   color: 'black',
  //   marginTop: 6,
  // },
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

export default SearchBox;
