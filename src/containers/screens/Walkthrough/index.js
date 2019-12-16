import React, {Component} from 'react';
import {Image, TouchableOpacity, StatusBar, Modal, StyleSheet, ImageBackground, Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import style from './style';
import theme from '../../../../assets/styles/globalStyles';
import * as constants from '../../../../lib/constants';
import { systemWeights } from 'react-native-typography';

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state={
      entries: [
        {
          imageUrl: require('../../../../assets/images/Walkthrough_1.png'),
          text: 'Withdrawal'
        },
        {
          imageUrl: require('../../../../assets/images/Walkthrough_2.png'),
          text: 'Loan At Your Finger Tips'
        },
        {
          imageUrl: require('../../../../assets/images/Walkthrough_3.png'),
          text: 'Savings'
        }
      ],
      activeSlide: 1
    }
  }
  openModal = () => {
    this.setState({modalVisible: true});
  }

  _navigate = () => {
      this.props.navigation.navigate('SignUp');
  }
  _renderItem = ({item, index}) => {
    return (
        <View>
            <Image style={[style.image]} source={item.imageUrl}/>
            <Text style={[theme.textCenter,theme.typo_bold, style.text]}>{item.text}</Text>
        </View>
    );
  }

  get pagination () {
    const { entries, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: '#138516'
          }}
          inactiveDotStyle={{
            backgroundColor: '#e3e3e3'
          }}
          inactiveDotScale={0.6}
        />
    );
  }


  render() {   
 
    return (  
        <View style={[style.container]}>
          <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={410}
              itemWidth={340}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />
            {this.pagination}
            <TouchableOpacity activeOpacity={0.4} style={[theme.fill, {alignItems:'center'}]}>
              <Image source={require('../../../../assets/icons/White_arrow.png')} onPress={() => this.props.navigation.navigate('Onboarding')}/>
          </TouchableOpacity> 
      </View>
    );
  }
}