import React, {Component} from 'react';
import { Dimensions, StyleSheet, View, Platform, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import theme from '../../../../assets/styles/globalStyles';
import GreenButton from '../../../components/GreenButton';
import { Icon } from 'react-native-elements';
import { scale, scaleHeight } from '../../../helpers/scale';

export default class ApplicationSuccessful extends Component{
  constructor(props){
    super(props);

    this.state={
      success: false,
      failure: false
    }
  }

  showDeleteSuccess=()=>{
    this.props._toggleView();
      this.setState({
        success: !this.state.success
    })
  }

  showDeleteFailure=()=>{
    this.props._toggleView();
      this.setState({
        failure: !this.state.failure
    })
  }

  toggleFailure=()=>this.setState({
    failure: !this.state.failure
  })

  toggleDelete=()=>this.setState({
    success: !this.state.success
  })

  render() {
    return (
      <ScrollView>
        <BottomSheet
          visible={this.props.visible}
          onBackButtonPress={this.props._toggleView}
          onBackdropPress={this.props._toggleView}
        >
          <View style={styles.bottomNavigationView}>
            <View style={[styles.header, { marginVertical: scaleHeight(20) }]}>
              <Image
                style={{}}
                source={require("../../../../assets/icons/naira.png")}
              />
              <Text
                style={[
                  theme.typo_bold,
                  theme.font17,
                  {
                    width: width - 80,
                    paddingLeft: scale(20),
                    paddingVertical: scaleHeight(15)
                  }
                ]}
              >
                Apply For Loan
              </Text>
            </View>
            <View style={{ flex: 4 }}>
              <View style={[theme.center]}>
                <Image
                  source={require("../../../../assets/icons/check_circle.png")}
                  style={[theme.pad_bottom30, { marginTop: scale(10) }]}
                />
                {this.props.subtitle && (
                  <Text
                    style={[
                      theme.typo_bold,
                      theme.font15,
                      theme.pad_bottom20,
                      { color: "#138516" }
                    ]}
                  >
                    {this.props.subtitle}
                  </Text>
                )}
                <Text
                  style={[
                    theme.typo_regular,
                    theme.margin_left_right_25,
                    {
                      textAlign: "center",
                      fontSize: scale(10),
                      color: "#C6C6C6"
                    }
                  ]}
                >
                  {this.props.smallText}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => this.props.navigation.navigate("RequestHistory")}
            >
              <GreenButton button_text="Check Request Status" />
            </TouchableOpacity>
          </View>
        </BottomSheet>
        {/* <DeleteSuccess visible={this.state.success} _toggleView={this.toggleDelete} 
          smallText={`Request Deleted Successfully`}/>
          <FailureModal visible={this.state.failure} _toggleView={this.toggleFailure} 
            subtitle="Request Submission Failed"
            smallText={`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out prints'}`}/> */}
      </ScrollView>
    );
  }
}

const {width,  height} = Dimensions.get('window');
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: scaleHeight(400),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: scale(10)
  },
  button: {
    marginTop: scaleHeight(20),
    bottom: 0,
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: scale(10),
    marginBottom: scaleHeight(20),
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1
  },
});
