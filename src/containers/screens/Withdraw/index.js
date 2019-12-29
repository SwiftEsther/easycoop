import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image, ScrollView, ScrollViewBase } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale } from '../../../helpers/scale';
import { render } from 'react-dom';

export default class index extends Component{

    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <ScrollView>
                <BottomSheet
                visible={this.props.visible}
                onBackButtonPress={this.props._toggleView}
                onBackdropPress={this.props._toggleView}
                >
                <View>
                    <Image source={require('../../../../assets/icons/coins.png')}></Image>
                    <Text>Withdraw Funds</Text>
                </View>
                <View style={styles.bottomNavigationView}>
                    <Icon name='close' iconStyle={[theme.typo_bold, styles.icon]} handlePress={this.props._toggleView}/>
                    <View style={[theme.center, theme.padding_left_right_25, {paddingTop: 270}]}>
                        <Image source={require('../../../../assets/icons/take_a_note_2.png')} style={[theme.pad_bottom20]}/>
                        <Text style={[theme.typo_bold, theme.font15, theme.pad_bottom]}>Terms and Conditions</Text>
                        <Text style={[theme.typo_regular, theme.margin_left_right_25, {textAlign: 'center', fontSize: scale(14)}]}>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
                        </Text>
                        {/* <View style={styles.button}>
                        <GreenButton button_text='I Accept Terms &amp; Conditions' handlePress={this.props.handleClick}/>
                        </View> */}
                    </View>
                </View>
                </BottomSheet>
            </ScrollView>
        )
    }
}

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
    height: scale(450),
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    backgroundColor: '#fff', 
    borderRadius:50, 
    fontSize: scale(25), 
    padding:scale(6), 
    top: 16, 
    right:0, 
    position: 'absolute'
  },
  button: {
    marginTop: 20, 
    bottom:0
  }
});
