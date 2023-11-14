import React, { useCallback, useRef, useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type FirstScreenProps = NativeStackScreenProps<RootStackParamList, 'First'>;

function First({ navigation }: FirstScreenProps) {
    const toSignIn = useCallback(() => {
        navigation.navigate('SignIn');
    }, [navigation]);
    const toSignUp = useCallback(() => {
        navigation.navigate('SignUp');
    }, [navigation]);


    return (
        <View>

            <View style={styles.buttonLocation}>

                <Pressable onPress={toSignIn}>
                    <Text style={styles.loginButton}
                    >로그인</Text>
                </Pressable>
                <Pressable onPress={toSignUp}>
                    <Text style={styles.loginButton}>회원가입</Text>
                </Pressable>

            </View>
        </View>




    );
}

const styles = StyleSheet.create({
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
    loginButton: {
        backgroundColor: 'black',
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: 130, // 두 버튼에 대해 동일한 폭을 설정합니다. 필요에 따라 조절하세요.
        textAlign: 'center', // 버튼 내에서 텍스트를 수평으로 가운데 정렬합니다.
        marginBottom: 20,
    },
    loginButtonActive: {
        backgroundColor: 'blue',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },

    buttonLocation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: '50%',
        height: '80%',

    }
});

export default First;
