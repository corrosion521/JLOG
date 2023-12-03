import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import NaverMapView, { Marker, Path } from "react-native-nmap";
import Timeline from 'react-native-timeline-flatlist'
import Icon from "react-native-vector-icons/AntDesign";

function RootList() {

    const [editIndex, setEditIndex] = useState(null);
    const [editedName, setEditedName] = useState('');

    const [showRoot, setShowRoot] = useState(false);
    const [showList, setShowList] = useState(true);

    const [latitudes, setLatitudes] = useState<number[]>([36, 37, 38, 39]);

    const [longitudes, setLongitudes] = useState<number[]>([127, 128, 129, 130]);

    // const latitudes = [36, 37, 38, 39]
    // const longitudes = [127, 127, 127, 127];

    const start = "2023.06.04 02:44:24"
    const finish = "2023.06.06 04:44:24"

    const [times, setTimes] = useState(["2023-12-03T00:12:12", "2023-12-03T00:12:12", "2023-12-03T00:12:12", "2023-12-03T00:12:12"])





    const [tripContent, setTripContent] = useState([
        "출발함",
        "점심을 먹었다",
        "숙소에 도착",
        "저녁밥",
        "아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
        "1111",
        "2222",
        "3333",
        "4444"
    ]);

    //real
    //start times
    const [stimes, setStimes] = useState<string[]>([]);
    const [ftimes, setFtimes] = useState<string[]>([]);

    //아이디 리스트 
    const [id, setId] = useState<number[]>([]);
    const [content, setContent] = useState<string[]>([
    ]);

    //현재 루트 아이디
    const [nowId, setNowId] = useState<number>(null);
    //루트의 경로 아이디 
    const [nowRoots, setNowRoots] = useState<number[]>([]);


    const onSubmit = (index) => {
        setShowRoot(true);
        setShowList(false);

        //console.log(index);
        fetch(`http://jlog.shop/location/list/${id[index]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(result => {


                //        setLatitudes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                //      setLongitudes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


                //console.log(result.result.locationInfoList.length)

                if (result.status === 'OK') {

                    //현 아이디 지정
                    const tmp = id[index]
                    setNowId(tmp)
                    //위도
                    const updatedLatitudes = []; // latitudes 배열을 복사합니다.

                    for (let i = 0; i < result.result.locationInfoList.length; i++) {
                        updatedLatitudes.push(result.result.locationInfoList[i].latitude);
                    }
                    setLatitudes(updatedLatitudes)

                    //경도
                    const updatedLongitudes = []; // latitudes 배열을 복사합니다.

                    for (let i = 0; i < result.result.locationInfoList.length; i++) {
                        updatedLongitudes.push(result.result.locationInfoList[i].longitude);
                    }
                    // console.log(updatedLongitudes)
                    setLongitudes(updatedLongitudes)

                    //코멘트 
                    const updatedComment = []; // latitudes 배열을 복사합니다.

                    for (let i = 0; i < result.result.locationInfoList.length; i++) {

                        if (result.result.locationInfoList[i].comment == null)
                            updatedComment.push("코멘트 입력");
                        else
                            updatedComment.push(result.result.locationInfoList[i].comment);
                    }
                    setTripContent(updatedComment)

                    //시간 
                    const updatedTimes = []; // latitudes 배열을 복사합니다.

                    for (let i = 0; i < result.result.locationInfoList.length; i++) {


                        updatedTimes.push(result.result.locationInfoList[i].startTime);
                    }

                    setTimes(updatedTimes)

                    //각 루트지점 아이디
                    const updatedRootPointId = []; // latitudes 배열을 복사합니다.

                    for (let i = 0; i < result.result.locationInfoList.length; i++) {


                        updatedRootPointId.push(result.result.locationInfoList[i].id);
                    }

                    setNowRoots(updatedRootPointId)

                    console.log("루트별 아이디", nowRoots)
                    console.log("현 아이디", nowId)

                    console.log(times)
                    console.log(longitudes)
                    console.log(latitudes)


                } else {
                    // 실패 시 에러 메세지
                    //return Alert.alert('실패', result.result.message);
                }
            });
    }
    const onDelete = (index) => {
        console.log(id)

        //이동
        fetch(`http://jlog.shop/location/${id[index]}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(result => {
                console.log("good")

                if (result.status === 'OK') {
                    setContent(prevContent => {
                        const newContent = [...prevContent];
                        newContent.splice(index, 1);
                        return newContent;
                    });



                } else {
                    // 실패 시 에러 메세지
                    //return Alert.alert('실패', result.result.message);
                }
            });

    };

    const onModify = (index) => {
        setEditIndex(index);
        setEditedName(content[index]);


    };

    const onSaveEditedName = (index) => {
        setContent(prevContent => {
            const newContent = [...prevContent];
            if (editIndex != null)
                newContent[editIndex] = editedName;
            return newContent;
        });
        setEditIndex(null);
        setEditedName('');



        //api
        //api 
        //이동
        console.log("....")
        fetch(`http://jlog.shop/location/path/${id[index]}?title=${editedName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


        })
            .then(response => response.json())
            .then(result => {

                if (result.status === 'OK') {

                    console.log("good")
                    Alert.alert("....")


                } else {
                    // 실패 시 에러 메세지
                    //return Alert.alert('실패', result.result.message);
                }
            });
    };
    const onSubmit2 = () => {
        setShowRoot(false);
        setShowList(true);

        //순간적으로 바뀔 때, 인덱스 부족으로 오류나는 현상 방지 (coordinate)
        setLatitudes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        setLongitudes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    }

    //타임라인 수정

    const [onEditTimeLine, setOnEditTimeLine] = useState(false);
    const onModifyTimeLine = () => {
        setOnEditTimeLine(true);
        setOnEditTimeLineNow(false);

    }

    const [onEditTimeLineNow, setOnEditTimeLineNow] = useState(true);

    const onTimeLineOk = (index) => {
        setOnEditTimeLineNow(true);
        setOnEditTimeLine(false);

        //api 
        //이동
        fetch(`http://jlog.shop/location/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                locationPathId: nowId,
                locationId: nowRoots[index],
                comment: tripContent[index]
            }),

        })
            .then(response => response.json())
            .then(result => {

                if (result.status === 'OK') {

                    console.log("good")
                    // Alert.alert("....")


                } else {
                    // 실패 시 에러 메세지
                    //return Alert.alert('실패', result.result.message);
                }
            });

    }


    useEffect(() => {
        //이동
        fetch('http://jlog.shop/location/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(result => {


                console.log('결과: ', result.result.length);
                if (result.status === 'OK') {
                    // 성공 시
                    //처리 

                    //제목
                    const updatedContent = [...content];
                    for (let i = 0; i < result.result.length; i++) {

                        updatedContent.push(result.result[i].title);
                        console.log(updatedContent)

                        setContent(updatedContent);
                    }

                    //시작 시간
                    const updatedStime = [...stimes];

                    for (let i = 0; i < result.result.length; i++) {

                        updatedStime.push(result.result[i].startTime);
                        setStimes(updatedStime);
                    }

                    //종료 시간
                    const updatedFtime = [...ftimes];

                    for (let i = 0; i < result.result.length; i++) {

                        updatedFtime.push(result.result[i].endTime);
                        setFtimes(updatedFtime);
                    }

                    //아이디
                    const updatedId = [...id];

                    for (let i = 0; i < result.result.length; i++) {

                        updatedId.push(result.result[i].id);
                        setId(updatedId);
                    }



                } else {
                    // 실패 시 에러 메세지
                    //  return Alert.alert('실패', result.result.message);
                }
            });

    }, [])



    const markers = latitudes.map((latitude, index) => (
        <Marker
            key={`marker-${index}`}
            coordinate={{
                latitude: latitude,
                longitude: longitudes[index],
            }}
            pinColor="blue"
            caption={{ text: (index + 1).toString() }}

        />
    ));

    const pathCoordinates = latitudes.map((latitude, index) => ({
        latitude: latitude,
        longitude: longitudes[index],
    }));

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const onTimeDelete = (index) => {
        setTripContent(prevContent => {
            const newContent = [...prevContent]; // 현재 content 배열을 복사합니다.
            newContent.splice(index, 1); // 해당 인덱스의 요소를 제거합니다.
            return newContent; // 새로운 배열을 반환하여 content를 업데이트합니다.
        });
        setLatitudes(prevContent => {
            const newContent = [...prevContent]; // 현재 content 배열을 복사합니다.
            newContent.splice(index, 1); // 해당 인덱스의 요소를 제거합니다.
            return newContent; // 새로운 배열을 반환하여 content를 업데이트합니다.
        });
        setLongitudes(prevContent => {
            const newContent = [...prevContent]; // 현재 content 배열을 복사합니다.
            newContent.splice(index, 1); // 해당 인덱스의 요소를 제거합니다.
            return newContent; // 새로운 배열을 반환하여 content를 업데이트합니다.
        });
        setTimes(prevContent => {
            const newContent = [...prevContent]; // 현재 content 배열을 복사합니다.
            newContent.splice(index, 1); // 해당 인덱스의 요소를 제거합니다.
            return newContent; // 새로운 배열을 반환하여 content를 업데이트합니다.
        });

        const tmp = []
        tmp.push(nowRoots[index])
        console.log(tmp)
        //api 
        //이동
        fetch(`http://jlog.shop/location/list/${nowId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                locationIdList: tmp
            }),

        })
            .then(response => response.json())
            .then(result => {

                if (result.status === 'OK') {

                    console.log("goodㄴ")


                } else {
                    // 실패 시 에러 메세지
                    // return Alert.alert('실패', result.result.message);
                }
            });


    }




    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                onScrollBeginDrag={() => setKeyboardVisible(false)}
                scrollEventThrottle={16}
            >
                <Pressable

                    onPress={() => //이동
                        fetch('http://jlog.shop/location/list', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },

                        })
                            .then(response => response.json())
                            .then(result => {


                                console.log('결과: ', result.result.length);
                                if (result.status === 'OK') {
                                    // 성공 시
                                    //처리 

                                    //제목
                                    const updatedContent = [];
                                    for (let i = 0; i < result.result.length; i++) {

                                        updatedContent.push(result.result[i].title);
                                        console.log(updatedContent)

                                        setContent(updatedContent);
                                    }

                                    //시작 시간
                                    const updatedStime = [];

                                    for (let i = 0; i < result.result.length; i++) {

                                        updatedStime.push(result.result[i].startTime);
                                        setStimes(updatedStime);
                                    }

                                    //종료 시간
                                    const updatedFtime = [];

                                    for (let i = 0; i < result.result.length; i++) {

                                        updatedFtime.push(result.result[i].endTime);
                                        setFtimes(updatedFtime);
                                    }

                                    //아이디
                                    const updatedId = [];

                                    for (let i = 0; i < result.result.length; i++) {

                                        updatedId.push(result.result[i].id);
                                        setId(updatedId);
                                    }



                                } else {
                                    // 실패 시 에러 메세지
                                    //  return Alert.alert('실패', result.result.message);
                                }
                            })}>

                    {/* <Text>새로고침</Text> */}
                    <Icon name="reload1" size={25} />

                </Pressable>
                {
                    showList ? <View style={{ marginBottom: 100 }}>
                        {content.map((item, index) => (
                            <View key={index} style={styles.listZone}>
                                <View style={{

                                    width: 200,
                                    borderWidth: 3,
                                    padding: 10
                                }}>
                                    {editIndex === index ? (
                                        <>
                                            <TextInput
                                                style={styles.contentText}
                                                value={editedName}
                                                onChangeText={(text) => setEditedName(text)}
                                            />
                                            <Pressable onPress={() => onSaveEditedName(index)}>
                                                <Text style={styles.contentText}>확인</Text>
                                            </Pressable>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>{item}</Text>
                                            <Pressable

                                                onPress={() => onSubmit(index)}
                                            >
                                                <Text style={{ marginLeft: 150, fontSize: 10 }}>보기{'\n'}</Text>
                                            </Pressable>
                                        </>
                                    )}
                                </View>
                                <View
                                    style={{ paddingLeft: 10 }}>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'black'
                                    }}>{stimes[index]}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'black'
                                    }}>{ftimes[index]}</Text>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',

                                        }}>
                                        <Pressable onPress={() => onDelete(index)}>
                                            <Text style={styles.contentText}>삭제</Text>
                                        </Pressable>
                                        <Pressable onPress={() => onModify(index)}>
                                            <Text style={styles.contentText}>수정</Text>
                                        </Pressable>
                                    </View>

                                </View>

                            </View>
                        ))}
                    </View> : null
                }

                {
                    showRoot ? <View
                        style={{
                            width: Dimensions.get('window').width - 30,
                            height: 200,
                            marginTop: 10,

                        }}
                    >
                        <View
                            style={{ display: 'flex', flexDirection: 'row' }}>
                            <Pressable

                                onPress={onSubmit2}
                            >
                                <Text style={styles.contentText}>리스트로</Text>
                            </Pressable>

                            {
                                onEditTimeLineNow ? <Pressable

                                    onPress={onModifyTimeLine}
                                >
                                    <Text style={styles.contentText}>타임라인 수정</Text>
                                </Pressable> :
                                    <Pressable

                                        onPress={onTimeLineOk}
                                    >
                                        <Text style={styles.contentText}>수정 완료</Text>
                                    </Pressable>
                            }



                        </View>

                        <NaverMapView
                            style={{ width: '100%', height: '100%' }}
                            zoomControl={false}
                            center={{
                                zoom: 10,
                                tilt: 0,
                                latitude: latitudes[0],
                                longitude: longitudes[0],
                            }}
                        >
                            {markers}
                            <Path coordinates={pathCoordinates} />
                        </NaverMapView>


                        {/*this place */}





                    </View> : null
                }




                {onEditTimeLine && showRoot ? <FlatList
                    data={tripContent}
                    style={{ marginTop: 50, marginBottom: 200 }}
                    renderItem={({ item, index }) => (

                        <View style={{
                        }}>
                            <Text>{index + 1}</Text>
                            {/* <View style={{ borderWidth: 30 }}></View> */}
                            <View
                                style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }}>
                                <TextInput onChangeText={(text) => {
                                    const updatedTripContent = [...tripContent];
                                    updatedTripContent[index] = text;
                                    setTripContent(updatedTripContent);
                                    setEditedName(text); // TextInput의 값을 업데이트해야 합니다.



                                }}>
                                    {item}
                                </TextInput>
                                <View>
                                    <View
                                        style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                        <Pressable

                                            onPress={() => onTimeDelete(index)}
                                        >
                                            <Text style={styles.button}>지점 삭제</Text>
                                        </Pressable>
                                        <Pressable

                                            onPress={() => onTimeLineOk(index)}
                                        >
                                            <Text style={styles.button}>코멘트 수정</Text>
                                        </Pressable>

                                    </View>

                                    <Text style={{ marginRight: 'auto' }}>{times[index]}</Text>
                                </View>

                            </View>


                            {/* <View style={{ borderWidth: 30, marginLeft: 'auto' }}
              ></View> */}


                        </View>
                    )

                    }
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.contentContainer}
                /> :

                    showRoot ?
                        <TimelineAPI
                            data1={tripContent}
                            data2={times}
                        />
                        : null

                }

            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const TimelineAPI = ({ data1, data2, index

}) => {
    const [list, setList] = useState([
        // {
        //     time: <Text> 07am </Text>,
        //     title: <Text>{data} </Text>,
        //     description: <Text> 기상 </Text>
        // },

    ]);

    useEffect(() => {
        // data가 변경될 때마다 list 상태 업데이트
        setList(data1.map((con, index) => ({
            time: <Text>{index + 1}</Text>,
            title: <Text>{data1[index]}</Text>,
            description: <Text>{data2[index]}</Text>,
        })));


    }, [data1]);






    return (
        <Timeline
            style={{ minHeight: 450 }}
            titleStyle={{ fontSize: 13 }}
            data={list}
            rowContainerStyle={{ height: 150 }}
            eventContainerStyle={{ height: 200 }}
            eventDetailStyle={{ height: 2000 }}
            circleSize={15}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{ minWidth: 50, marginTop: 0 }}
            timeStyle={{ fontSize: 10, textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 0, borderRadius: 13 }}
            descriptionStyle={{ color: 'red' }}

            options={{
                style: {

                    borderWidth: 50,
                    marginBottom: 20,
                    borderColor: 'white',
                    backgroundColor: 'white'


                }
            }}

        />
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    listZone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 2,
        minHeight: 100,
        borderColor: 'lightgrey',
        padding: 10,
        backgroundColor: 'white'
    },
    buttonZone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'lightgrey'
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        color: 'white',
        textAlign: 'center'
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
        paddingBottom: 50
    },
    contentText: {
        fontSize: 10,
        marginBottom: 10,
        margin: 'auto',
        marginLeft: 20
    },
    infoText: {
        marginRight: 60,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15,
        width: 80,
        color: 'black'
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
        fontSize: 20
    },
    infoProfile: {
        borderWidth: 40, width: 2, height: 2, margin: 20
    }, modalContainer: {
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
});
export default RootList;
