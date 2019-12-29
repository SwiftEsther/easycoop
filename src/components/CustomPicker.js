import React from 'react';
import {View, Picker, StyleSheet} from 'react-native';

const CustomPicker = (props) => (
<   Picker
        selectedValue={props.selectedValue}
        style={{height: 50, width: 100}}
        onValueChange={()=>props.onPickerChange
            // (itemValue, itemIndex) =>
            // this.setState({language: itemValue})
        }>
        {props.items.map((item, index) =><Picker.Item key={index} label={item.label} value={item.value} />)}
    </Picker>
);

const style = StyleSheet.create({
    
});

export default CustomPicker;
