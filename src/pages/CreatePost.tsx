import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {useCallback, useEffect, useRef, useState} from 'react';
import IconA from 'react-native-vector-icons/AntDesign';
import React from 'react';

function CreatePost({navigation}) {
  // * To Do *
  // 1. 여행 경로 모음 가져오기
  // 2. 서버로 데이터 보내서 게시물 생성

  // 여행 경로 모음 가져오기
  const [pathList, setPathList] = useState([]);

  useEffect(() => {
    fetch('http://jlog.shop/location/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.result);
        setPathList(result.result);
      });
  }, []);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<TextInput | null>(null);
  const contentRef = useRef<TextInput | null>(null);

  // 여행리스트 중 선택하는 모달
  const [showSelectModal, setShowSelectModal] = useState(false); // 모달 상태
  const [selectedId, setSelectedId] = useState(); // 선택된 여행 경로 id
  const [selectedTitle, setSelectedTitle] = useState(); // 선택된 여행 경로 title

  const openSelectModal = () => {
    setShowSelectModal(true);
  };

  const closeSelectModal = () => {
    setShowSelectModal(false);
  };

  const renderPathList = ({item}) => {
    const handlePressPath = () => {
      // 경로 선택시 실행되는 함수
      setSelectedId(item.id);
      setSelectedTitle(item.title);
      closeSelectModal();
    };

    return (
      <Pressable onPress={handlePressPath}>
        <Text style={styles.pathList}>{item.title}</Text>
      </Pressable>
    );
  };

  const selectTrip = () => {
    closeSelectModal();
  };

  const onChangeTitle = useCallback(text => {
    setTitle(text);
  }, []);

  const onChangeContent = useCallback(text => {
    setContent(text);
  }, []);

  const canGoNext = title && content;

  // 게시물 생성
  const onSubmit = useCallback(() => {
    if (!title || !title.trim()) {
      return Alert.alert('알림', '제목을 입력해주세요.');
    }
    if (!content || !content.trim()) {
      return Alert.alert('알림', '내용을 입력해주세요.');
    }
    fetch('http://jlog.shop/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        categoryList: [0],
        locationPathId: selectedId,
        imageList: [0],
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('결과: ', result.status);
        if (result.status === 'OK') {
          Alert.alert('성공', '게시물이 등록되었습니다');
          navigation.navigate('PostHome');
        } else {
          // 실패 시 에러 메세지
          return Alert.alert('알림', result.message);
        }
      });
  }, [title, content]);

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <View>
          <Text style={styles.header}>나만의 여행기를 작성해보세요</Text>
        </View>
        {/* 여행리스트 중 선택하기 */}
        <View style={styles.selectZone}>
          <Text style={styles.selectedTrip}>{selectedTitle}</Text>
          <Pressable style={styles.selectButton} onPress={openSelectModal}>
            <Text style={styles.selectButtonText}>여행선택</Text>
          </Pressable>
          <Modal
            visible={showSelectModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
              // 뒤로가기 버튼 누르면 모달 닫히도록
              closeSelectModal();
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>여행 리스트</Text>
                  <Pressable onPress={closeSelectModal}>
                    <IconA name="close" size={15}></IconA>
                  </Pressable>
                </View>

                <FlatList
                  data={pathList}
                  renderItem={renderPathList}></FlatList>
                {/* <Pressable style={styles.selectButton} onPress={selectTrip}>
                  <Text style={styles.selectButtonText}>선택 완료</Text>
                </Pressable> */}
              </View>
            </View>
          </Modal>
        </View>

        {/* 제목 입력 */}
        <View style={styles.inputWrapper}>
          {/* <Text style={styles.label}>제목</Text> */}
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeTitle}
            placeholder="제목을 입력해주세요"
            placeholderTextColor="#666"
            value={title}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={titleRef}
            onSubmitEditing={() => contentRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>

        {/* 내용 입력 */}
        <View style={styles.inputWrapper}>
          {/* <Text style={styles.label}>이름</Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="이번 여행은 어떤 여행이었는지 소개해주세요!"
            placeholderTextColor="#666"
            onChangeText={onChangeContent}
            value={content}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={contentRef}
            blurOnSubmit={false}
          />
        </View>

        {/* To Do : 이미지 등록 */}

        {/* 작성 완료 버튼 */}
        <View style={styles.buttonZone}>
          <Pressable
            style={
              canGoNext
                ? StyleSheet.compose(styles.doneButton, styles.doneButtonActive)
                : styles.doneButton
            }
            disabled={!canGoNext}
            onPress={onSubmit}>
            <Text style={styles.doneButtonText}>작성 완료</Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  selectZone: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    columnGap: 5,
  },
  selectedTrip: {
    flex: 1,
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 14,
    color: 'black',
  },
  selectButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 0,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 14,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  doneButtonActive: {
    backgroundColor: 'blue',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
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
    // alignItems: 'center',
    width: 300,
    height: 500,
    rowGap: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  modalTitle: {
    fontSize: 16,
    color: 'black',
  },
  pathList: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8E8D8D',
  },
});

export default CreatePost;
