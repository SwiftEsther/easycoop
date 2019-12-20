import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

export default class SideMenu extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 1
            </Text>
            <View style={styles.navSectionStyle}>
                {/* onPress={this.navigateToScreen('Page1')} */}
              <Text style={styles.navItemStyle} >
              Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}>
                Page2
              </Text>
              <Text style={styles.navItemStyle}>
                Page3
              </Text>
            </View>            
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 3
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}>
              Page4
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

const styles={
    container: {
        paddingTop: 20,
        flex: 1
      },
      navItemStyle: {
        padding: 10
      },
      navSectionStyle: {
        backgroundColor: 'lightgrey'
      },
      sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
      },
      footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
      }
}
