import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
  TextStyle,
  TextInput,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {IPostData} from '../Data/PostData';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DismissKeyboardView from '../components/DismissKeyboardView';
import IconA from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {color} from 'react-native-elements/dist/helpers';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import Timeline from 'react-native-timeline-flatlist';

export interface ILogData {
  day: string;
  mapImg: string;
  timeline: string;
  id: string;
}

// * To Do : 게시물 상세 내용 데이터 받아오기 (제목, 사진, 내용, 타임라인, 댓글) *

const logList: ILogData[] = [
  {
    day: 'DAY1',
    mapImg: 'JLOG/src/Data/map.png',
    timeline: 'time line1',
    id: '1',
  },
  {
    day: 'DAY2',
    mapImg: 'JLOG/src/Data/map.png',
    timeline: 'time line2',
    id: '2',
  },
  {
    day: 'DAY3',
    mapImg: 'JLOG/src/Data/map.png',
    timeline: 'time line3',
    id: '3',
  },
  {
    day: 'DAY4',
    mapImg: 'JLOG/src/Data/map.png',
    timeline: 'time line4',
    id: '4',
  },
];

function PostDetail({route}) {
  const {item} = route.params; // route.params 안에서 item을 받아옵니다.

  console.log(item.id);

  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );

  if (item.member.imgageUrl != null) setProfileImg(item.member.imageUrl);

  // 댓글 게시 후 새로고침에 이용
  const [rflag, setRflag] = useState<boolean>(false);

  const [isScrap, setIsScrap] = useState(false);

  // * To Do : postId 등의 값으로 해당 게시물의 내용 받아오기 *
  const [content, setContent] = useState();
  const [pathId, setPathId] = useState();
  const [locationInfo, setLocationInfo] = useState([]);
  const [scrapCnt, setScrapCnt] = useState();
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    fetch(`http://jlog.shop/api/v1/post/details/${item.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          const detail = result.result;
          console.log(detail);
          setContent(detail.content);
          setPathId(detail.locationPathId);
          setLocationInfo(detail.locationInfo);
          setScrapCnt(detail.scraps);
          // setCommentList(detail.commentList);
        } else {
          // 실패 시 에러 메세지
          Alert.alert('알림', result.message);
        }
      });
  }, [isScrap]);
  // }, []);

  // const contents = detail.content;
  const contents = '게시물 내용부분';

  // const renderItem = ({item}: {item: ILogData}) => {
  //   const imgSrc = item.mapImg;
  //   // const [height, setHeight] = useState(0);
  //   // const {width} = Dimensions.get('window');
  //   // Image.getSize(imgSrc, (w, h) => {
  //   //   setHeight(h * (width / w));
  //   // });

  //   return (
  //     <View style={styles.log}>
  //       {/* <Text>{item.day}</Text> */}
  //       <Image
  //         source={require('JLOG/src/Data/map.png')}
  //         // source={{uri: imgSrc, height}}
  //         style={{width: '100%'}}
  //         resizeMode="cover"
  //       />
  //       <Text>{item.timeline}</Text>
  //     </View>
  //   );
  // };

  const [timelineData, setTimelineData] = useState<ILogData>(logList[0]);
  const [selectedDay, setSelectedDay] = useState<string>(logList[0].day);

  const renderDay = ({item}: {item: ILogData}) => {
    const handlePressDay = () => {
      setTimelineData(item);
      setSelectedDay(item.day);
    };

    const dayStyle: TextStyle = {
      color: selectedDay === item.day ? 'black' : '#8E8D8D',
      fontWeight: selectedDay === item.day ? 'bold' : 'normal',
    };

    return (
      <Pressable onPress={handlePressDay}>
        <Text style={[styles.day, dayStyle]}>{item.day}</Text>
      </Pressable>
    );
  };

  // 댓글 출력
  // 테스트용 댓글들 list
  const [replyList, setReplyList] = useState<string[]>(['댓글1', '댓글2']);

  const renderReply = ({item}: {item: string}) => {
    return (
      <View style={styles.reply}>
        <Avatar
          rounded
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
        />
        <View>
          {/* <Text style={styles.nickname}>작성자 닉네임</Text> */}
          <Text style={styles.replyContents}>{item}</Text>
        </View>
      </View>
    );
  };

  // 댓글 작성
  // 댓글 내용 담을 변수
  const [reply, setReply] = useState<string>('');

  const onChangeReply = useCallback((text: string) => {
    setReply(text);
  }, []);

  const onSubmitReply = ({reply}: {reply: string}) => {
    // API 호출 및 데이터 저장 코드 작성

    fetch('http://jlog.shop/api/v1/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: item.id,
        content: reply,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.status);

        if (result.status === 'CREATED') {
          // 완료된 후 페이지 새로고침
          setRflag(!rflag);
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('알림1', result.message);
        }
      });

    // 테스트용
    setReplyList([...replyList, reply]);
  };

  // 스크랩 기능
  // const [isScrap, setIsScrap] = useState(false);
  const handlePressScrap = () => {
    setIsScrap(!isScrap);
    if (!isScrap) {
      fetch('http://jlog.shop/api/v1/interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: item.id,
          type: 'SCRAP',
        }),
      })
        .then(response => response.json())
        .then(result => {
          console.log('스크랩 결과:', result.status);
          if (result.status === 'OK') {
            return;
            // console.log(result.status);
          } else {
            // 실패 시 에러 메세지
            // return Alert.alert('알림1', result.message);
          }
        });
    } else {
      fetch('http://jlog.shop/api/v1/interaction', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: item.id,
          type: 'SCRAP',
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.status === 'OK') {
            return;
            // console.log(result.status);
          } else {
            // 실패 시 에러 메세지
            return Alert.alert('알림2', result.message);
          }
        });
    }
  };

  const [latitudes, setLatitudes] = useState<number[]>([36, 37, 38, 39]);

  const [longitudes, setLongitudes] = useState<number[]>([127, 128, 129, 130]);
  const markers = latitudes.map((latitude, index) => (
    <Marker
      key={`marker-${index}`}
      coordinate={{
        latitude: latitude,
        longitude: longitudes[index],
      }}
      pinColor="blue"
      caption={{text: (index + 1).toString()}}
    />
  ));

  const pathCoordinates = latitudes.map((latitude, index) => ({
    latitude: latitude,
    longitude: longitudes[index],
  }));

  const [times, setTimes] = useState([
    '2023-12-03T00:12:12',
    '2023-12-03T00:12:12',
    '2023-12-03T00:12:12',
    '2023-12-03T00:12:12',
  ]);

  const [tripContent, setTripContent] = useState([
    '출발함',
    '점심을 먹었다',
    '숙소에 도착',
    '저녁밥',
    '아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
    '1111',
    '2222',
    '3333',
    '4444',
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        // behavior="padding"
        // keyboardVerticalOffset={160}
        // keyboardVerticalOffset={55}
      >
        {/* <DismissKeyboardView> */}
        <ScrollView>
          <View style={styles.post}>
            <View style={styles.title}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                {item.title}
              </Text>
            </View>

            <View style={styles.profile}>
              <Avatar
                rounded
                source={{
                  uri: profileImg,
                }}
              />
              <Text style={{fontSize: 14, color: 'black'}}>
                {item.member.nickname}
              </Text>
            </View>

            {/* 게시물 사진 부분 */}
            {/* <Image
              source={{uri: item.postImg}}
              // source={require('../Data/usj.jpg')}
              // source={require(item.postImg)}
              style={{height: 200, borderRadius: 10}}
            /> */}

            <View style={styles.contents}>
              <Text>{content}</Text>
            </View>

            {/* 날짜 선택 기능 */}
            {/* <ScrollView style={styles.selectDay} horizontal={true}>
              <FlatList
                data={logList}
                renderItem={renderDay}
                keyExtractor={item => item.id}
                horizontal={true}></FlatList>
            </ScrollView> */}

            {/* 날짜별 여행 경로 지도, 타임라인 리스트 */}

            {/* <FlatList
            data={timelineData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          /> */}
            {/* <View style={styles.log}>
              <Image
                source={require('JLOG/src/Data/map.png')}
                // source={{uri: imgSrc, height}}
                style={{ width: '100%' }}
                resizeMode="cover"
              />
              <Text>{timelineData.timeline}</Text>
            </View> */}
            <View style={{height: 200}}>
              <NaverMapView
                style={{width: '100%', height: '100%'}}
                zoomControl={false}
                center={{
                  zoom: 10,
                  tilt: 0,
                  latitude: 37,
                  longitude: 128,
                }}>
                {markers}
                <Path coordinates={pathCoordinates} />
              </NaverMapView>
            </View>

            <TimelineAPI data1={tripContent} data2={times} />
          </View>

          {/* 댓글, 좋아요 수 */}
          <View style={styles.info}>
            <Text>댓글 {commentList.length}개</Text>
            {/* <Text>댓글 {detail.commentList.length}개</Text> */}
            <Text>스크랩 {scrapCnt}회</Text>
            {/* <Text>스크랩 {detail.scraps}회</Text> */}
          </View>

          {/* 댓글 창 */}
          <View style={styles.replyList}>
            <FlatList data={commentList} renderItem={renderReply}></FlatList>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {/* 스크랩 버튼 */}
          <Pressable onPress={handlePressScrap}>
            <IconA
              name={isScrap ? 'star' : 'staro'}
              size={20}
              color={isScrap ? 'orange' : 'black'}></IconA>
          </Pressable>
          {/* 댓글 입력 창 */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="댓글을 입력해주세요"
              placeholderTextColor={'#8E8D8D'}
              value={reply}
              autoCorrect={false}
              onChangeText={onChangeReply}
              enterKeyHint="done"
              onSubmitEditing={() => onSubmitReply({reply})}
            />
          </View>
        </View>
        {/* </DismissKeyboardView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TimelineAPI = ({data1, data2, index}) => {
  const [list, setList] = useState([
    // {
    //     time: <Text> 07am </Text>,
    //     title: <Text>{data} </Text>,
    //     description: <Text> 기상 </Text>
    // },
  ]);

  useEffect(() => {
    // data가 변경될 때마다 list 상태 업데이트
    setList(
      data1.map((con, index) => ({
        time: <Text>{index + 1}</Text>,
        title: <Text>{data1[index]}</Text>,
        description: <Text>{data2[index]}</Text>,
      })),
    );
  }, [data1]);

  return (
    <Timeline
      style={{minHeight: 450}}
      titleStyle={{fontSize: 13}}
      data={list}
      rowContainerStyle={{height: 150}}
      eventContainerStyle={{height: 200}}
      eventDetailStyle={{height: 2000}}
      circleSize={15}
      circleColor="rgb(45,156,219)"
      lineColor="rgb(45,156,219)"
      timeContainerStyle={{minWidth: 50, marginTop: 0}}
      timeStyle={{
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: '#ff9797',
        color: 'white',
        padding: 0,
        borderRadius: 13,
      }}
      descriptionStyle={{color: 'red'}}
      options={{
        style: {
          borderWidth: 50,
          marginBottom: 20,
          borderColor: 'white',
          backgroundColor: 'white',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // backgroundColor: '#ffffff',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  post: {
    // backgroundColor: 'white',
    display: 'flex',
    // marginBottom: 20,
    rowGap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  contents: {},
  selectDay: {},
  log: {marginBottom: 10},
  day: {paddingRight: 10},
  pressedDay: {paddingRight: 10, color: 'black', fontWeight: 'bold'},
  textInputContainer: {
    marginTop: 'auto',
    // borderTopWidth: 1,
    // borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    height: 60,
    flex: 1,
  },
  textInput: {
    // flex: 1,
    backgroundColor: '#F5F5F7',
    color: 'black',
    fontSize: 12,
    height: 40,
    // height: 'auto',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'pink',
    borderRadius: 18,
    paddingHorizontal: 10,
  },
  info: {
    borderTopWidth: 0.5,
    borderColor: '#D9D9D9',
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    marginHorizontal: 10,
    paddingTop: 5,
  },
  replyList: {
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  reply: {
    borderTopWidth: 0.5,
    borderColor: '#D9D9D9',
    display: 'flex',
    flexDirection: 'row',
    columnGap: 5,
    paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  nickname: {
    color: 'black',
    fontWeight: 'bold',
  },
  replyContents: {},
  footer: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    paddingHorizontal: 10,
    columnGap: 10,
  },
});
export default PostDetail;
