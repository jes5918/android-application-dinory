import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import Layout from '../../../components/elements/Layout';
import {getChildProfile} from '../../../api/accounts/childSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectProfileButton from '../../../components/authorization/SelectProfileButton';
import BasicButton from '../../../components/elements/BasicButton';
import Header from '../../../components/elements/Header';
import SelectModal from '../../../components/elements/SelectModal';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

export default function SelectProfile({navigation, route}) {
  const [childrenInfo, setChildrenInfo] = useState(null);
  const imageSrc = require('../../../assets/images/background2.png');
  const [logoutModal, setLogoutModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        onHandleLogout();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const transformImage = (num) => {
    let Src = '';
    switch (String(num)) {
      case '0':
        Src = require('../../../assets/images/character1.png');
        break;
      case '1':
        Src = require('../../../assets/images/character2.png');
        break;
      case '2':
        Src = require('../../../assets/images/character3.png');
        break;
      case '3':
        Src = require('../../../assets/images/character4.png');
        break;
      default:
        Src = require('../../../assets/images/character5.png');
        break;
    }
    return Src;
  };

  useFocusEffect(
    useCallback(() => {
      getChildProfile(
        (res) => {
          setChildrenInfo(res.data);
        },
        (error) => {},
      );
    }, []),
  );

  const executeLogout = async () => {
    const willRemovedKeys = ['jwt', 'profile', 'autoLogin'];

    try {
      setLogoutModal(!logoutModal);
      await AsyncStorage.multiRemove(willRemovedKeys);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } catch (e) {}
  };

  const onHandleLogout = () => {
    setLogoutModal(!logoutModal);
  };

  const onHandlePressAllowLogout = async () => {
    await executeLogout();
  };

  const onHandlePressRefuseLogout = () => {
    setLogoutModal(!logoutModal);
  };

  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <SelectModal
        modalVisible={logoutModal}
        alertText={'정말 로그아웃 하시겠습니까?'}
        refuseText={'취소'}
        allowText={'로그아웃'}
        onHandlePressAllow={onHandlePressAllowLogout}
        onHandlePressRefuse={onHandlePressRefuseLogout}
        secondText={'자동 로그인을 한 경우, 해제됩니다.'}
      />
      <Header onHandlePress={onHandleLogout} logoHeader={true} />
      <View style={styles.body}>
        <ContentTitle title={'프로필을 선택하세요'} />
        <Layout
          width={windowWidth * 0.8}
          height={windowHeight * 0.6}
          opacity={0.8}>
          <View>
            <View style={styles.bodyCardContainer}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {childrenInfo &&
                  childrenInfo.map((profile) => {
                    const {id, img, name, voice, year} = profile;
                    const profileImg = transformImage(img);
                    const onButtonClick = () => {
                      const profileData = {
                        profile_pk: id,
                        profile_image: img,
                        profile_name: name,
                        profile_year: year,
                        voice_pk: voice,
                      };
                      AsyncStorage.mergeItem(
                        'profile',
                        JSON.stringify(profileData),
                      );
                      navigation.navigate('Main');
                    };
                    return (
                      <View key={id}>
                        <SelectProfileButton
                          imageSrc={profileImg}
                          Name={name}
                          onHandlePress={onButtonClick}
                        />
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            <View style={styles.btn}>
              <BasicButton
                text={'프로필 추가하기'}
                btnWidth={windowWidth * 0.26}
                onHandlePress={() => {
                  navigation.navigate('NameProfile');
                }}
              />
            </View>
          </View>
        </Layout>
      </View>
    </BackgroundAbsolute>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 6,
    alignItems: 'center',
    marginTop: windowHeight * 0.17,
  },
  bodyCardContainer: {
    flex: 9,
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flex: 2.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
