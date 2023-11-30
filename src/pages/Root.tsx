import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Complete from './Complete';
import Ing from './Ing';
import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';

const Stack = createNativeStackNavigator();

function Root() {

    const [rec, setRec] = useState(false);

    //watchId(끄기 위해 저장해둠)
    const [watchIdrs, setWatchIdrs] = useState(0);
    const [intervalIdrs, setIntervalIdrs] = useState<NodeJS.Timeout | null>(null);

    const onRecordOn = useCallback(() => {
        // //gps 기록 초기화
        setLatitudeArray([]);
        setLongitudeArray([]);
        setRec(true); //기록 시작
        currentStimer(); // 시작 시간 측정
        setTimeFinished(false);//기록 종료 x (시작한다는 뜻)
        setRecwrite(false);//저장 x

        geoLocationCon(); // 좌표 측정(시작 좌표)
    }, [rec]);

    const onRecordOff = useCallback(() => {

        setRec(false); // 기록 종료
        currentFtimer(); // 종료 시간 측정
        setTimeFinished(true); //기록 종료 
        setRecwrite(false);//저장 x (여전히 이 시점에는 저장하는 시점이 아님)

        //gps 기록중지
        stopGeolocation(); // 위치 정보 업데이트 멈춤

        // geoLocation();//해당위치 찍기 
        console.log("멈춰")

        // geoLocation(); //좌표 측정()

    }, [rec]);

    //머무르기 (기록 정지)
    const [onStay, setOnStay] = useState(false);

    const stopGeolocation = () => {

        if (intervalIdrs) {
            console.log("멈춤!")
            clearInterval(intervalIdrs);

        }

    };
    // const onRecordStop = useCallback(() => {
    //     setOnStay(true);
    //     stopGeolocation(); // 위치 정보 업데이트 멈춤
    //     // geoLocation();//해당위치 찍기 
    //     console.log("멈춰")
    // }, [rec]);

    // //이동 재시작
    // const onRecordRestart = () => {
    //     setOnStay(false);
    //     if (intervalIdrs) {
    //         clearInterval(intervalIdrs); // 이전 interval 중지
    //     }
    //     const newIntervalId = setInterval(geoLocationCon, 5000);
    //     setIntervalIdrs(newIntervalId); // 새로운 interval ID 설정        console.log("재시작")
    // };



    //저장 하지 않으면 시간 기록 초기화 
    const onRecordWriteOff = useCallback(() => {

        setRec(false);
        currentFtimer();
        setTimeFinished(false);
        setRecwrite(false);


    }, [rec]);

    //위치정보
    /*https://ssilook.tistory.com/entry/React-Native-RN-%ED%98%84%EC%9E%AC-%EC%9C%84%EC%B9%98-%EC%A2%8C%ED%91%9C-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0 */

    const [latitude, setLatitude] = useState([]);
    const [longitude, setLogitude] = useState([]);

    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                updateLocation(latitude, longitude)
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    // 기본 인터벌(10분?)간격으로 기록되는 위도, 경도 -
    // watchPosition을 사용하여 1분마다 위치 정보를 업데이트하는 함수

    //담는 배열 (기록한 좌표들을 배열형식으로 저장)
    // 좌표를 담을 배열 상태 초기화
    const [latitudeArray, setLatitudeArray] = useState([]);//위도
    const [longitudeArray, setLongitudeArray] = useState([]);//경도
    const [timeArray, setTimeArray] = useState([]); //시간


    //업데이트함수 (현재 위치 배열)
    const updateLocation = (latitude: string, longitude: string) => {
        setLatitudeArray(prevLatitudeArray => [...prevLatitudeArray, latitude]);
        setLongitudeArray(prevLongitudeArray => [...prevLongitudeArray, longitude]);
    };



    const geoLocationCon = () => {
        // watchPosition을 통해 주기적으로 위치 정보를 가져옵니다.
        const watchId = Geolocation.watchPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                updateLocation(latitude, longitude)
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
        //기록
        setWatchIdrs(watchId);

        // 1분(60초)마다 위치 정보 업데이트
        const intervalId = setInterval(() => {
            Geolocation.getCurrentPosition(
                position => {
                    const latitude = JSON.stringify(position.coords.latitude);
                    const longitude = JSON.stringify(position.coords.longitude);

                    // 위치 정보를 배열에 추가 => 해당 내용은 비동기 처리 (useEffect사용)
                    updateLocation(latitude, longitude);
                    updateTime(currentTimeArray());

                },
                error => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }, 5000); // 1분(60초)마다 실행

        setIntervalIdrs(intervalId)

        // 컴포넌트가 언마운트되면 watchPosition과 setInterval을 클리어합니다.

    };
    //비동기 처리 
    useEffect(() => {
        console.log('Latitude Array:', latitudeArray);
        console.log('Longitude Array:', longitudeArray);
        console.log('시간:', timeArray);
    }, [longitudeArray]);

    //시간기록
    const [stimer, setStimer] = useState(false); //저장 내용1
    const [ftimer, setFtimer] = useState(false); //저장 내용2


    const [timeFinished, setTimeFinished] = useState(false);

    const currentStimer = () => {

        const date = new Date();
        var day = String(date.getFullYear() + '년' + (date.getMonth() + 1) + '월' + date.getDate() + '일').padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setStimer(`${day} ${hours}:${minutes}:${seconds}`)
    }
    const currentFtimer = () => {

        const date = new Date();
        var day = String(date.getFullYear() + '년' + (date.getMonth() + 1) + '월' + date.getDate() + '일').padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setFtimer(`${day} ${hours}:${minutes}:${seconds}`)
    }
    const currentTimeArray = () => {

        const date = new Date();
        var day = String(date.getFullYear() + '년' + (date.getMonth() + 1) + '월' + date.getDate() + '일').padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return (`${day} ${hours}:${minutes}:${seconds}`)
    }
    const updateTime = (time) => {

        setTimeArray(prevTimeArray => [...prevTimeArray, time]);
    };

    //기록을 저장하기 
    const [recwrite, setRecwrite] = useState(false);
    const onRecordWrite = () => {
        setRecwrite(true);

    }

    //저장시 타이틀
    const [title, setTitle] = useState('');//저장내용3

    const onChangeTitle = useCallback(text => {
        setTitle(text.trim());
    }, []);

    //저장내용1,2,3을 리스트에 넣기
    const onRecordWriteList = () => {

        //이 부분을 서버에 올림. 
        console.log(`제목 : ${title}, 시작 : ${stimer}, 종료 : ${ftimer}`,
            `latitude : ${latitudeArray}`,
            `longitude: ${longitudeArray}`

        )
        Alert.alert(latitudeArray.length.toString());



        //처리 
        setRec(false);
        setTimeFinished(false);
        setRecwrite(false);
    }

    return (

        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View
                style={{ marginTop: 30 }}>

            </View>
            {recwrite ? <TextInput
                placeholder="제목 입력"
                placeholderTextColor="#666"
                importantForAutofill="yes"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="default"
                clearButtonMode="while-editing"
                onChangeText={onChangeTitle}
                blurOnSubmit={false}
            /> :
                rec ? <Image source={require('../assets/powerOn.png')}
                    style={styles.infoProfile} /> : <Image source={require('../assets/powerOff.png')}
                        style={styles.infoProfile} />
            }
            {/*테스트용 geolocation.  */}
            {/* <TouchableOpacity
                onPress={() => geoLocation()}
                style={{ backgroundColor: '#89B2E9' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>
                    Get GeoLocation Button
                </Text>
            </TouchableOpacity> */}

            {/* <Text> latitude: {latitude} </Text>
            <Text> longitude: {longitude} </Text> */}
            <View>
                <View
                    style={{
                        flexDirection: 'column',
                        marginTop: 50,
                    }}>
                    {recwrite ? null :
                        rec ? <Text
                            style={styles.infoEditText}>경로 기록 중</Text> : <Text
                                style={styles.infoEditText}>경로를 기록하지 않고 있습니다.</Text>




                    }
                    {
                        recwrite ? <Text
                            style={styles.infoEditText}>기록의 제목을 입력하세요</Text> : null
                    }

                    {
                        rec || timeFinished ? <Text style={{ textAlign: 'center' }}>{"시작 시간 : "}{stimer}</Text> : <Text >{"  "}</Text>
                    }

                    {
                        timeFinished ? <Text style={{ textAlign: 'center' }}>{"종료 시간 : "}{ftimer}</Text> : <Text >{"  "}</Text>

                    }



                </View>



                <View
                    style={{
                        flexDirection: 'row'
                    }}>


                </View>
                {
                    timeFinished ? <View

                        style={{ marginTop: 50 }}>

                    </View> : <View

                        style={{ marginTop: 100 }}>

                    </View>
                }

                {
                    recwrite ? null :
                        timeFinished ? <Pressable
                            style={styles.button}
                            onPress={onRecordWrite}
                        >
                            <Text style={styles.buttonText}>기록 저장</Text>
                        </Pressable> : null

                }
                {
                    timeFinished ? <View

                        style={{ marginTop: 10 }}>

                    </View> : null
                }
                {recwrite ? null : (
                    rec ? (
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* {
                                onStay ? <Pressable
                                    style={styles.stay}
                                    onPress={onRecordOff}
                                >
                                    <Text style={styles.buttonText}>이동 재시작</Text>
                                </Pressable>

                                    : <Pressable
                                        style={styles.stay}
                                        onPress={onRecordOff}
                                    >
                                        <Text style={styles.buttonText}>머무르기</Text>
                                    </Pressable>

                            } */}

                            <Pressable
                                style={styles.button}
                                onPress={onRecordOff}
                            >
                                <Text style={styles.buttonText}>기록 종료</Text>
                            </Pressable>


                        </View>



                    ) : <Pressable
                        style={styles.button}
                        onPress={onRecordOn}
                    >
                        <Text style={styles.buttonText}>기록 시작</Text>
                    </Pressable>
                )
                }
                {
                    recwrite ?
                        <View style={{

                        }}>



                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly'
                                }}>

                                <Pressable
                                    style={styles.button}
                                    onPress={onRecordWriteList}
                                >
                                    <Text style={styles.buttonText}>저장 하기</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.button}
                                    onPress={onRecordWriteOff}
                                >
                                    <Text style={styles.buttonText}>저장 안함</Text>
                                </Pressable>
                            </View>
                        </View>


                        : null
                }



            </View>

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
        padding: 10
    },
    stay: {
        backgroundColor: 'green',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 5,
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
        paddingHorizontal: 15,
        paddingVertical: 15,
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
        paddingBottom: 50
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
        color: 'black'
    },
    infoEditText: {

        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
        color: 'black',
        paddingTop: 5,
        width: 200,
        textAlign: 'center',
        marginLeft: 15
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
export default Root;
