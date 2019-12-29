import {Dimensions} from 'react-native';
const {width,  height} = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;
const scale = size => width/guidelineBaseWidth * size;
const scaleHeight = size => height/guidelineBaseHeight * size;

export {scale, scaleHeight};