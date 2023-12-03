import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { TextInput } from 'react-native';

function Settings() {
  const [posts, setPosts] = useState(true);
  const [reply, setReply] = useState(false);
  const [scrap, setScrap] = useState(true);
  const [info, setInfo] = useState(true);

  //게시물
  let [content, setContent] = useState([
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
  ]); // content를 배열로 초기화합니다.
  let [writer, setWriter] = useState([
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
  ]); // content를 배열로 초기화합니다.

  //댓글
  let [rpContent, setRpContent] = useState([
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
    '[제주] 제주도 3일 코스',
  ]); // content를 배열로 초기화합니다.
  let [rpReview, setRpReview] = useState([
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
    '재미있습니다!',
  ]); // content를 배열로 초기화합니다.

  //스크랩
  let [srContent, setSrContent] = useState([
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
    '[오사카] 테마파크 순회 코스!',
  ]); // content를 배열로 초기화합니다.
  let [srWriter, setSrWriter] = useState([
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
    '정지오',
  ]); // content를 배열로 초기화합니다.

  //내정보 가져오기
  const [myInfo, setMyInfo] = useState();
  const getMyInfo = () => {
    fetch('http://jlog.shop/member/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          setMyInfo(result.result);
          console.log(result.result);
          setNowName(result.result.nickname)
          setNowUrl(result.result.imgUrl)
          setNowWrites(result.result.postCnt)
          setNowScraps(result.result.scrapCnt)
          setNowId(result.result.userId)

        } else {
          // 실패 시 에러 메세지
          return Alert.alert('알람', result.message);
        }
      });
  };

  const { isLoggedIn, setLoggedIn } = useAuth();

  //로그아웃
  const onLogOut = useCallback(() => {
    fetch('http://jlog.shop/member/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          // 로그아웃 성공 시 처음 페이지로 이동
          setLoggedIn(false);
          console.log(result);
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('로그아웃 실패', result.message);
        }
      });
  }, [isLoggedIn]);

  //회원탈퇴
  //모달
  const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가

  //열기
  const openModal = () => {
    setShowModal(true);
  };

  //탈퇴(예)
  const exitSite = useCallback(() => {
    fetch('http://jlog.shop/member/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          // 회원탈퇴 성공 시 처음 페이지로 이동
          setLoggedIn(false);
          console.log(result);
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('회원 탈퇴 실패', result.message);
        }
      });
  }, [isLoggedIn]);

  //닫기(아니오)
  const closeModal = () => {
    setShowModal(false);
  };

  // // const Stack = createMaterialTopTabNavigator<SettingStackParamList>();
  // 게시글 페이지
  const [myPosts, setMyPosts] = useState();
  const onSubmit = useCallback(() => {
    setPosts(true);
    setReply(false);
    setBack(true)

    setScrap(false);
    setInfo(false);



    fetch('http://jlog.shop/member/post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          setMyPosts(result.result);
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('알림', result.message);
        }
      });
  }, []);

  // 댓글 페이지
  const onSubmit2 = useCallback(() => {
    setPosts(false);
    setReply(true);
    setScrap(false);
    setInfo(false);
    setBack(true)

  }, []);

  // 스크랩 페이지
  const onSubmit3 = useCallback(() => {
    setPosts(false);
    setReply(false);
    setScrap(true);
    setInfo(false);
    setBack(true)

  }, []);

  // 회원정보 페이지
  const onSubmit4 = useCallback(() => {
    setPosts(false);
    setReply(false);
    setScrap(false);
    setInfo(true);
    getMyInfo();
    setBack(true)

  }, []);

  // 뒤로가기
  const onSubmit5 = useCallback(() => {
    setPosts(true);
    setReply(true);
    setScrap(true);
    setInfo(true);
    setBack(false);
  }, []);

  //변경
  const [editInfo, setEditInfo] = useState(false);

  const onEditInfo = useCallback(() => {
    setEditInfo(true);
    setPosts(false);
    setReply(false);
    setScrap(false);
    setInfo(false);
  }, [editInfo]);

  const onEditInfoComplete = useCallback(() => {
    setEditInfo(false);
    setPosts(false);
    setReply(false);
    setScrap(false);
    setInfo(true);
    fetch('http://jlog.shop/member/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: nowId,
        nickname: nickName,
        password: password,
        imgUrl: 'http://sswo.adsd',
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('알림', result.message);
        }
      });
  }, [editInfo]);

  //변경 닉네임과 패스워드
  const [nickName, setNickname] = useState('');
  const [password, setPassword] = useState('');


  //현재 정보
  const [nowName, setNowName] = useState("");
  const [nowUrl, setNowUrl] = useState("");
  const [nowWrites, setNowWrites] = useState(0);
  const [nowScraps, setNowScraps] = useState(0);
  const [nowId, setNowId] = useState("");


  const [back, setBack] = useState(false);

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.buttonZone}>
        {
          back ? <Pressable style={styles.button} onPress={onSubmit5}>
            <Text style={styles.buttonText}>뒤로가기</Text>
          </Pressable> : null
        }

        {
          info && !back ? <Pressable style={styles.button} onPress={onSubmit4}>
            <Text style={styles.buttonText}>회원정보</Text>

          </Pressable> : null

        }


        {
          posts && !back ? <Pressable style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>게시글</Text>

          </Pressable> : null

        }


        {/* <Pressable style={styles.button} onPress={onSubmit2}>
          <Text style={styles.buttonText}>댓글</Text>
        </Pressable> */}
        {
          scrap && !back ? <Pressable style={styles.button} onPress={onSubmit3}>
            <Text style={styles.buttonText}>스크랩</Text>
          </Pressable> : null
        }

      </View>

      {posts && back ? (
        <FlatList
          data={myPosts}
          renderItem={({ item, index }) => (
            <View style={styles.listZone}>
              {/* <View style={{ borderWidth: 30 }}></View> */}
              <Image
                source={require('../assets/testpng.png')}
                style={{
                  borderWidth: 30,
                  width: 15,
                  height: 15,
                  marginRight: 5,
                }}></Image>
              <Text style={styles.contentText}>
                {item}
                {'\n'}
                {writer[index]}
              </Text>

              {/* <View style={{ borderWidth: 30, marginLeft: 'auto' }}
              ></View> */}

              <Image
                source={require('../assets/close.png')}
                style={{
                  borderWidth: 7,
                  marginLeft: 'auto',
                  width: 2,
                  height: 2,
                  marginBottom: 'auto',
                }}></Image>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      ) : null}
      {/* {reply ? (
        <FlatList
          data={rpContent}
          renderItem={({ item, index }) => (
            <View style={styles.listZone}>
              <Text style={styles.contentText}>
                {rpReview[index]}
                {'\n'}
                {item}
              </Text>

              <Image
                source={require('../assets/close.png')}
                style={{
                  borderWidth: 7,
                  marginLeft: 'auto',
                  width: 2,
                  height: 2,
                  marginBottom: 'auto',
                }}></Image>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      ) : null} */}
      {scrap && back ? (
        <FlatList
          data={srContent}
          renderItem={({ item, index }) => (
            <View style={styles.listZone}>
              {/* <View style={{ borderWidth: 30 }}></View> */}
              <Image
                source={require('../assets/testpng.png')}
                style={{
                  borderWidth: 30,
                  width: 15,
                  height: 15,
                  marginRight: 5,
                }}></Image>
              <Text style={styles.contentText}>
                {item}
                {'\n'}
                {srWriter[index]}
              </Text>

              {/* <View style={{ borderWidth: 30, marginLeft: 'auto' }}
              ></View> */}

              <Image
                source={require('../assets/star.png')}
                style={{
                  borderWidth: 12,
                  marginLeft: 'auto',
                  width: 2,
                  height: 2,
                  marginBottom: 'auto',
                }}></Image>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      ) : null}
      {info && back ? (
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{ uri: nowUrl }}
              style={styles.infoProfile}></Image>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.infoText}>이름</Text>
                <Text style={styles.infoTextContent}>
                  {nowName}
                  {/* 이름 */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.infoText}>아이디</Text>
                <Text style={styles.infoTextContent}>
                  {nowId}
                  {/* 아이디 */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.infoText}>게시물</Text>
                <Text style={styles.infoTextContent}>
                  {nowWrites}
                  {/* 게시물 */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.infoText}>스크랩</Text>
                <Text style={styles.infoTextContent}>
                  {nowScraps}
                  {/* 스크랩 */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}></View>
              <Pressable style={styles.button} onPress={onEditInfo}>
                <Text style={styles.buttonText}>변경</Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 100 }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 'auto',
                marginRight: 15,
              }}>
              <Pressable
                style={{
                  backgroundColor: 'black',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 70,
                  marginRight: 20,
                }}
                onPress={onLogOut}>
                <Text style={styles.buttonText2}>로그아웃</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: 'black',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 70,
                }}
                onPress={openModal}>
                <Text style={styles.buttonText2}>회원탈퇴</Text>
              </Pressable>
              <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                  // 모달이 닫힐 때 실행되는 함수
                  closeModal();
                }}>
                <View style={styles.modalContainer}>
                  {/* 모달 내용 */}
                  <View style={styles.modalContent}>
                    <Text
                      style={{
                        marginBottom: 20,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      정말로 탈퇴하시겠습니까?
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Pressable onPress={exitSite} style={{ marginRight: 20 }}>
                        <Text>네</Text>
                      </Pressable>
                      <Pressable onPress={closeModal}>
                        <Text>아니오</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      ) : null}
      {editInfo ? (
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/star.png')}
              style={styles.infoProfile}></Image>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.infoEditText}>이름</Text>

                <TextInput
                  placeholder="변경할 이름을 입력"
                  style={{ fontSize: 15 }}
                  onChangeText={text => {
                    // 입력 값 state에 반영
                    setNickname(text);
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.infoEditText}>패스워드</Text>
                <TextInput
                  placeholder="변경할 패스워드를 입력"
                  style={{ fontSize: 15 }}
                  onChangeText={text => {
                    // 입력 값 state에 반영
                    setPassword(text);
                  }}
                />
              </View>
              <View style={{ marginTop: 50 }}></View>
              <Pressable style={styles.button} onPress={onEditInfoComplete}>
                <Text style={styles.buttonText}>변경완료</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  listZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: 'lightgrey',
    padding: 10,
  },
  buttonZone: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderWidth: 1,

    borderColor: 'lightgrey',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 50,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoText: {
    marginRight: 60,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    width: 80,
    color: 'black',
  },
  infoEditText: {
    marginRight: 60,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    width: 80,
    color: 'black',
    paddingTop: 5,
  },
  infoTextContent: {
    fontSize: 20,
  },
  infoProfile: {
    borderWidth: 40,
    width: 2,
    height: 2,
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 영역 주변의 배경색
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  background: {
    backgroundColor: "rgba(0,0,0,0,6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
});
export default Settings;
