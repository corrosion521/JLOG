import {useState, useCallback} from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet, View} from 'react-native';
import {SearchBar, Text} from 'react-native-elements';
import DismissKeyboardView from '../components/DismissKeyboardView';
import IconA from 'react-native-vector-icons/AntDesign';
import NaverMapView, {Marker, Path} from 'react-native-nmap';

// 국내여행 카테고리 리스트
export interface category {
  name: string;
  id: string;
}

const categoryList: category[] = [
  {
    name: '도시',
    id: '1',
  },
  {
    name: '강원도',
    id: '2',
  },
  {
    name: '경기도',
    id: '3',
  },
  {
    name: '충청도',
    id: '4',
  },
  {
    name: '경상도',
    id: '5',
  },
  {
    name: '전라도',
    id: '6',
  },
  {
    name: '제주도',
    id: '7',
  },
];

function Category() {
  const [keyword, setKeyword] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  // toggle 목록 위한 state
  const [toggle, setToggle] = useState<boolean>(false);

  const onChangeKeyword = useCallback((text: string) => {
    if (text === '') setShowResult(false);
    setKeyword(text.trim());
  }, []);

  // 국내여행 카테고리리스트 render
  const renderCategory = ({item}: {item: category}) => {
    return (
      <Pressable style={styles.eachCategory}>
        <View style={styles.categoryHeader}>
          <Text>{item.name}</Text>
          <IconA name="right" size={16}></IconA>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <DismissKeyboardView>
        <View style={styles.header}>
          <View style={{flex: 1}}>
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
              enterKeyHint="search"
              onSubmitEditing={() => setShowResult(true)}
            />
          </View>
        </View>
        {/* 카테고리 리스트 */}
        <View style={styles.categoryList}>
          {/* 국내여행 */}
          {/* <Pressable onPress={() => setToggle(!toggle)}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>국내여행</Text>
              <IconA name={toggle ? 'up' : 'down'} size={16}></IconA>
            </View>
          </Pressable>
          {toggle ? ( */}
          <View>
            <FlatList
              data={categoryList}
              renderItem={renderCategory}
              keyExtractor={item => item.id}></FlatList>
          </View>
          {/* // ) : null} */}
          {/* 해외여행 */}
          {/* <Pressable>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>해외여행</Text>
              <IconA name="right" size={16}></IconA>
            </View>
          </Pressable> */}
        </View>
      </DismissKeyboardView>
      {/* <View
        style={{
          width: Dimensions.get('window').width - 30,
          height: 200,
          marginTop: 10,
        }}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          zoomControl={false}
          center={{
            zoom: 10,
            tilt: 50,
            latitude: 37,
            longitude: 126,
          }}>
          <Marker
            coordinate={{
              latitude: 37,
              longitude: 126,
            }}
            pinColor="blue"
          />
          <Path
            coordinates={[
              {
                latitude: 37,
                longitude: 126,
              },
              {latitude: 38, longitude: 127},
            ]}
          />
          <Marker coordinate={{latitude: 38, longitude: 127}} />
        </NaverMapView>
      </View> */}
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
  categoryList: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    rowGap: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eachCategory: {
    paddingVertical: 5,
  },
});

export default Category;
