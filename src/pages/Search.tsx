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
// import {ISearchData, searchAPI} from '../Data/SearchData';
import {IPostData, searchAPI, postData} from '../Data/PostData';

function SearchBox({navigation}) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<IPostData[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const onChangeKeyword = useCallback((text: string) => {
    if (text === '') setShowResult(false);
    setKeyword(text.trim());
  }, []);

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
    (item: IPostData) => {
      navigation.navigate('PostDetail', {item});
    },
    [navigation],
  );

  const renderItem = ({item}: {item: IPostData}) => {
    return (
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
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
                  {item.title}
                </Text>
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
});

export default SearchBox;
