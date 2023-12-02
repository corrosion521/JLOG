import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import NaverMapView, { Marker, Path } from "react-native-nmap";
import Timeline from 'react-native-timeline-flatlist'

function RootList() {
    const [content, setContent] = useState([
        "1번",
        "2번",
        "3번ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
    ]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedName, setEditedName] = useState('');

    const [showRoot, setShowRoot] = useState(false);
    const [showList, setShowList] = useState(true);

    const [latitudes, setLatitudes] = useState([37.49742249, 37.49089972, 37.52599299, 38.5, 39.5, 40, 41, 42, 43]);
    const [longitudes, setLongitudes] = useState([126.95828461, 126.93815058, 126.88261906, 127, 129, 130, 131, 132, 133]);
    const start = "2023.06.04 02:44:24"
    const finish = "2023.06.06 04:44:24"

    const [times, setTimes] = useState(["2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24", "2023.06.06 04:44:24"])


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

    const onSubmit = () => {
        setShowRoot(true);
        setShowList(false);

        //api
    }
    const onDelete = (index) => {
        setContent(prevContent => {
            const newContent = [...prevContent];
            newContent.splice(index, 1);
            return newContent;
        });
    };

    const onModify = (index) => {
        setEditIndex(index);
        setEditedName(content[index]);
    };

    const onSaveEditedName = () => {
        setContent(prevContent => {
            const newContent = [...prevContent];
            if (editIndex != null)
                newContent[editIndex] = editedName;
            return newContent;
        });
        setEditIndex(null);
        setEditedName('');
    };
    const onSubmit2 = () => {
        setShowRoot(false);
        setShowList(true);
    }

    //타임라인 수정

    const [onEditTimeLine, setOnEditTimeLine] = useState(false);
    const onModifyTimeLine = () => {
        setOnEditTimeLine(true);
        setOnEditTimeLineNow(false);

    }

    const [onEditTimeLineNow, setOnEditTimeLineNow] = useState(true);

    const onTimeLineOk = () => {
        setOnEditTimeLineNow(true);
        setOnEditTimeLine(false);

    }






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

                {
                    showList ? <View style={{ marginBottom: 500 }}>
                        {content.map((item, index) => (
                            <View key={index} style={styles.listZone}>
                                <View style={{

                                    width: 200,
                                    borderWidth: 2
                                }}>
                                    {editIndex === index ? (
                                        <>
                                            <TextInput
                                                style={styles.contentText}
                                                value={editedName}
                                                onChangeText={(text) => setEditedName(text)}
                                            />
                                            <Pressable onPress={() => onSaveEditedName()}>
                                                <Text style={styles.contentText}>확인</Text>
                                            </Pressable>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.contentText}>{item}</Text>
                                            <Pressable

                                                onPress={onSubmit}
                                            >
                                                <Text style={{ margin: 'auto' }}>보기{'\n'}</Text>
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
                                    <Text>{times[0]}</Text>
                                    <Text>{finish}</Text>
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
                                    <Pressable

                                        onPress={() => onTimeDelete(index)}
                                    >
                                        <Text style={styles.button}>지점 삭제</Text>
                                    </Pressable>

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
        borderColor: 'lightgrey',
        padding: 10
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
        fontSize: 16,
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
