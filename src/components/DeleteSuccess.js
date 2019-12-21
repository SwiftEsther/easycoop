import React from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../assets/styles/globalStyles';
import GreenButton from '../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../helpers/scale';

const DeleteSuccess = (props) => (
  <ScrollView>
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props._toggleView}
      onBackdropPress={props._toggleView}
    >
      <View style={styles.bottomNavigationView}>
        <View style={[styles.header]}>
          <Text style={[theme.typo_bold, theme.font17, { marginVertical: scaleHeight(25)}]}>Delete Request</Text>
        </View>
        <View>
          <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={props._toggleView} />
          <View style={[theme.center, theme.padding_left_right_25]}>
            <Image source={require('../../assets/icons/bin.png')} style={[theme.pad_bottom30, {marginTop: scale(10)}]} />
           <Text style={[theme.typo_regular, theme.margin_left_right_25, { textAlign: 'center', fontSize: scale(10), color: '#C6C6C6' }]}>
              {props.smallText}
            </Text>
          </View>
        </View>
      </View>
    </BottomSheet>
  </ScrollView>
);
const {width,  height} = Dimensions.get('window');
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(270),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(10)
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    fontSize: scale(25),
    padding: scale(6),
    top: scale(-130),
    right: 0,
    position: 'absolute'
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width,
    paddingHorizontal: scale(20)
  },
});
export default DeleteSuccess;
