import React, {useCallback, useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ISearchData, searchAPI} from '../Data/SearchData';

function SearchBox() {
  const [loading, setLoading] = useState(true);
  const [enter, setEnter] = useState(false);
  const [list, setList] = useState<ISearchData[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  // const onChangeKeyword = useCallback((text: string) => {
  //   setKeyword(text.trim());
  // }, []);
  const onChangeKeyword = useCallback((text: string) => {
    setKeyword(text.trim());
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      setEnter(true);
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="게시물을 검색해보세요"
        onChangeText={onChangeKeyword}
        value={keyword}
        placeholderTextColor={'#8E8D8D'}
        leftIconContainerStyle={{backgroundColor: '#F5F5F7'}}
        inputContainerStyle={{backgroundColor: '#F5F5F7'}}
        searchIcon={{color: 'black'}}
        clearIcon={{color: 'black'}}
        inputStyle={{
          backgroundColor: '#F5F5F7',
          color: 'black',
        }}
        containerStyle={{
          // backgroundColor: 'none',
          backgroundColor: '#F5F5F7',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        autoFocus
      />
      {
        loading ? (
          <View
            style={{
              marginTop: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#fff'} />
          </View>
        ) : (
          // enter ?
          <FlatList
            keyExtractor={item => item.id}
            data={list}
            disableScrollViewPanResponder={true}
            ListEmptyComponent={() => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    color: '#fff',
                    display: loading ? 'none' : 'flex',
                    paddingVertical: 30,
                  }}>
                  검색 내용이 없습니다.
                </Text>
              </View>
            )}
            renderItem={items => {
              const {item} = items;
              return (
                <TouchableOpacity
                  onPressIn={() => Keyboard.dismiss()}
                  onPress={() => Alert.alert('클릭 시: 동작 코드')}
                  activeOpacity={1}
                  style={styles.applicationBox}
                  key={items.index}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}></View>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                    }}>
                    <Text style={styles.fontStyle}>Id {item.id} : </Text>
                    <Text style={[styles.fontStyle, {fontWeight: 'bold'}]}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )
        // : (
        //   <View></View>
        // )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  fontStyle: {
    fontSize: 14,
    color: 'black',
    marginTop: 6,
  },
  applicationBox: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  // searchTextInput: {
  //   justifyContent: 'center',
  //   height: 40,
  //   lineHeight: 40,
  //   paddingHorizontal: 5,
  //   backgroundColor: '#fff',
  //   marginTop: 15,
  //   borderRadius: 5,
  // },

  // textInput: {
  //   color: 'black',
  //   fontSize: 16,
  //   marginLeft: 8,
  //   paddingHorizontal: 7,
  //   paddingVertical: 0,
  // },
});

export default SearchBox;
