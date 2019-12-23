import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import style from './style';
import theme from '../../../../assets/styles/globalStyles';
import { scale, scaleHeight } from '../../../helpers/scale';

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      activeSlide: 0
    }
  }
  openModal = () => {
    this.setState({ modalVisible: true });
  }

  _navigate = () => {
    this.props.navigation.navigate('Onboarding');
  }
  _renderItem = ({ item, index }) => {
    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
        <Image style={[style.image]} source={item.imageUrl} resizeMode={'cover'} />
        <Text style={[theme.typo_bold, style.text]}>{item.text}</Text>
      </View>
    );
  }

  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: scale(10),
          height: scale(10),
          borderRadius: scale(5),
          backgroundColor: '#138516',
        }}
        inactiveDotStyle={{
          backgroundColor: '#e3e3e3'
        }}
        inactiveDotScale={scale(0.6)}
      />
    );
  }


  render() {

    return (
      <ScrollView>
        <View style={[style.container]}>
          <View style={{}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={scale(360)}
              itemWidth={scale(299)}
              autoplay={true}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />
          </View>
          <View style={style.pagination}>
            {this.pagination}
          </View>
          <TouchableOpacity activeOpacity={0.4} style={[theme.fill, style.arrow_btn]} onPress={this._navigate}>
            <Image source={require('../../../../assets/icons/White_arrow.png')} style={{ height: scale(100), width: scale(120) }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
