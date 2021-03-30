import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

function SelectModal({
  modalVisible,
  alertText,
  refuseText,
  allowText,
  onHandlePressAllow,
  onHandlePressRefuse,
  secondText,
}) {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onHandlePressRefuse
          ? onHandlePressRefuse()
          : alert('함수를 props로 내려주세요!');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.alertText}>{alertText}</Text>
            {secondText && <Text style={styles.alertText}>{secondText}</Text>}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.button, styles.allowButton]}>
              <Text
                style={styles.allowText}
                onPress={() => onHandlePressAllow()}>
                {allowText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.button, styles.refuseButton]}>
              <Text
                style={styles.refuseText}
                onPress={() => onHandlePressRefuse()}>
                {refuseText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    width: windowWidth * 0.375,
    height: windowHeight * 0.4122,
    elevation: 7,
  },

  buttonContainer: {
    width: '100%',
    height: windowHeight * 0.0745,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: windowHeight * 0.07,
  },
  button: {
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    paddingVertical: 12,
    height: windowHeight * 0.0745,
    width: windowWidth * 0.133,
    elevation: 7,
  },
  allowButton: {
    backgroundColor: '#707070',
  },
  refuseButton: {
    backgroundColor: '#FB537B',
  },
  alertText: {
    fontSize: windowWidth * 0.019,
    color: '#707070',
    fontFamily: 'NotoSansKR-Bold',
    // backgroundColor: 'red',
    // height: windowWidth * 0.01875,
  },
  allowText: {
    fontSize: windowWidth * 0.01875,
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
  refuseText: {
    fontSize: windowWidth * 0.01875,
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },

  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: windowHeight * 0.08,
    alignItems: 'center',
    width: windowWidth * 0.375,
    height: windowHeight * 0.4122,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
});

export default SelectModal;