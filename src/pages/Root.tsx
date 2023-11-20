import React, { useCallback, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Complete from './Complete';
import Ing from './Ing';
import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Stack = createNativeStackNavigator();

function Root() {

    const [rec, setRec] = useState(false);

    const onRecordOn = useCallback(() => {

        setRec(true);
        currentStimer();
        setTimeFinished(false);
        setRecwrite(false);


    }, [rec]);

    const onRecordOff = useCallback(() => {

        setRec(false);
        currentFtimer();
        setTimeFinished(true);
        setRecwrite(false);


    }, [rec]);

    //저장 하지 않으면 시간 기록 초기화 
    const onRecordWriteOff = useCallback(() => {

        setRec(false);
        currentFtimer();
        setTimeFinished(false);
        setRecwrite(false);


    }, [rec]);


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
        Alert.alert(`제목 : ${title}, 시작 : ${stimer}, 종료 : ${ftimer}`)
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
                    rec ? <Pressable
                        style={styles.button}
                        onPress={onRecordOff}
                    >
                        <Text style={styles.buttonText}>기록 종료</Text>
                    </Pressable> : <Pressable
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
