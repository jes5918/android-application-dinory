import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import AlertModal from '../../components/elements/AlertModal';
import BasicButton from '../../components/elements/BasicButton';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import {useNavigation} from '@react-navigation/core';
import changePassword from '../../api/accounts/settings';

// static variable
const baseURL = 'http://j4b105.p.ssafy.io/';
const backgroundImage = require('../../assets/images/background2.png');
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768
const inputWidth = windowWidth * 0.2625;
const inputHeight = windowHeight * 0.077;
const marginBottom = windowHeight * 0.06;

function PassWordUpdate() {
  const navigation = useNavigation();

  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onHandleSubmit = async () => {
    let child_pk = '';
    await AsyncStorage.getItem('child_pk').then((childPk) => {
      child_pk = childPk;
    });
    await AsyncStorage.getItem('password').then((oldPassword) =>
      changePassword(
        child_pk,
        {
          password: password,
          password_confirmation: passwordCheck,
        },
        (res) => {
          setModalVisible(!modalVisible);
        },
        (err) => {
          console.error(err);
        },
      ),
    );
  };

  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
      navigation.navigate('Main');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <AlertModal
        modalVisible={modalVisible}
        onHandleCloseModal={() => changeModalState()}
        text={'비밀번호가 변경되었습니다.'}
        iconName={'checkcircle'}
        color={'green'}
        setTimeFunction={() => closeModal()}
      />
      <BackgroundAbsolute imageSrc={backgroundImage}>
        <Header />
        <View style={styles.main}>
          <View style={styles.mainTop}>
            <Text style={styles.mainText}>비밀번호 변경</Text>
          </View>
          <View style={styles.mainMid}>
            <AuthTextInput
              setFunction={setPassword}
              width={inputWidth}
              height={inputHeight}
              marginRight={0}
              marginBottom={0}
              text={'새로운 비밀번호를 입력해주세요.'}
              secureTextEntry={true}
            />
            <Text style={styles.infoText}>
              * 비밀번호는 대소문자(영어), 숫자 조합 8자리로 구성되어야 합니다
            </Text>
            <AuthTextInput
              setFunction={setPasswordCheck}
              width={inputWidth}
              height={inputHeight}
              marginRight={0}
              marginBottom={marginBottom}
              text={'비밀번호를 한 번 더 입력해주세요.'}
              secureTextEntry={true}
            />
            {password !== passwordCheck ? (
              <Text style={styles.alertMessage}>
                비밀번호가 일치하지 않습니다.
              </Text>
            ) : null}
          </View>
          <View style={styles.mainBot}>
            <BasicButton
              text="변경 완료"
              customFontSize={windowWidth * 0.01875} // 24
              btnWidth={windowWidth * 0.2625} // 336
              btnHeight={windowHeight * 0.077} // 58
              borderRadius={14}
              onHandlePress={onHandleSubmit}
            />
          </View>
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: windowWidth * 0.372, // 476
    height: windowHeight * 0.754, // 642
    borderRadius: 50,
    elevation: 7,
    paddingTop: windowHeight * 0.043, // 32
  },
  mainTop: {
    marginBottom: windowHeight * 0.043, // 64
  },
  mainMid: {
    position: 'relative',
  },
  mainText: {
    fontSize: windowWidth * 0.03125,
    fontFamily: 'NotoSansKR-Bold',
    color: '#707070',
  },
  mainBot: {
    marginTop: windowHeight * 0.043, //64
    marginBottom: windowHeight * 0.043, //64
  },
  alertMessage: {
    position: 'absolute',
    color: '#FF3120',
    fontSize: 18,
    fontFamily: 'NotoSansKR-Bold',
    bottom: 0,
  },
  infoText: {
    fontSize: 18,
    color: '#707070',
    width: windowWidth * 0.26,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.06,
  },
});

export default PassWordUpdate;