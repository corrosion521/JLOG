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
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {IPostData} from '../Data/PostData';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DismissKeyboardView from '../components/DismissKeyboardView';
import IconA from 'react-native-vector-icons/AntDesign';

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

  // * To Do : postId 등의 값으로 해당 게시물의 내용 받아오기 *
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
          <Text style={styles.nickname}>작성자 닉네임</Text>
          <Text style={styles.replyContents}>{item}</Text>
        </View>
      </View>
    );
  };
  // 댓글 작성
  // 댓글 내용 담을 변수
  const [reply, setReply] = useState<string>('');
  // 댓글 게시 후 새로고침에 이용
  const [rflag, setRflag] = useState<boolean>(false);

  const onChangeReply = useCallback((text: string) => {
    setReply(text);
  }, []);

  const onSubmitReply = ({reply}: {reply: string}) => {
    // API 호출 및 데이터 저장 코드 작성
    // 완료된 후 페이지 새로고침
    // fetch(`/community/comment/${data}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     content: reply,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     setRflag(true);
    //   });
    setReplyList([...replyList, reply]);
  };

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
                  uri: item.profileImg,
                }}
              />
              <Text style={{fontSize: 14, color: 'black'}}>
                {item.nickname}
              </Text>
            </View>

            <Image
              source={{uri: item.postImg}}
              // source={require('../Data/usj.jpg')}
              // source={require(item.postImg)}
              style={{height: 200, borderRadius: 10}}
            />

            <View style={styles.contents}>
              <Text>{contents}</Text>
            </View>

            {/* 날짜 선택 기능 */}
            <ScrollView style={styles.selectDay} horizontal={true}>
              <FlatList
                data={logList}
                renderItem={renderDay}
                keyExtractor={item => item.id}
                horizontal={true}></FlatList>
            </ScrollView>

            {/* 날짜별 여행 경로 지도, 타임라인 리스트 */}

            {/* <FlatList
            data={timelineData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          /> */}
            <View style={styles.log}>
              <Image
                source={require('JLOG/src/Data/map.png')}
                // source={{uri: imgSrc, height}}
                style={{width: '100%'}}
                resizeMode="cover"
              />
              <Text>{timelineData.timeline}</Text>
            </View>
          </View>

          {/* 댓글, 좋아요 수 */}
          <View style={styles.info}>
            <Text>댓글 {replyList.length}개</Text>
            <Text>스크랩 3회</Text>
          </View>

          {/* 댓글 창 */}
          <View style={styles.replyList}>
            <FlatList data={replyList} renderItem={renderReply}></FlatList>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {/* 스크랩 버튼 */}
          <Pressable>
            <IconA name="staro" size={20}></IconA>
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
