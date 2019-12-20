import React from 'react';
import {View, Text} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import theme from '../../../../assets/styles/globalStyles';

export default class Contributions extends React.Component {
    renderHeader = () => {
        return null;
    }
    
    renderContent = () => {
        return (
            <View>
                <Text>g,hjbcnndj </Text>
                <Text>g,hjbcnndj </Text>
                <Text>g,hjbcnndj </Text>
                <Text>g,hjbcnndj </Text>
                <Text>g,hjbcnndj </Text>
            </View>
        );
    }
    render() {

    return (
      <View style={theme.container}>
        <BottomSheet
          snapPoints = {[450, 300, 0]}
          renderContent = {this.renderContent}
          renderHeader = {this.renderHeader}
        />
    </View>)
  }
}