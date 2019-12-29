import { Dimensions, Platform, StyleSheet } from 'react-native'
import * as colors from '../../../lib/constants/colors';
import { scale, scaleHeight } from '../../../helpers/scale';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  leftTabStyle: {
    backgroundColor: "yellow",
    borderRightColor: "#FCFCFC",
    borderRightWidth: 2
  },
  container2: {
    backgroundColor: "#FFFFFF", //EFF1F5
    marginHorizontal: scale(13),
    marginVertical: scaleHeight(22),
    padding: 20,
    borderRadius: 5
  },
  container1: {
    backgroundColor: "#F3F5F9", //EFF1F5
    flexDirection: "column"
  },
  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: scaleHeight(26)
  },
  amountText: {
    color: "#9F9F9F",
    marginBottom: scale(13),
    fontFamily: "nunito-medium",
    
  },
  price: {
    fontSize: 20,
    fontFamily: "nunito-bold"
  },
  pickerStlye: {
    color: "#9f9f9f",
    borderColor: "#d0d0d0",
    backgroundColor: "rgba(0, 13, 55, 0.02)",
    marginBottom: scaleHeight(26) ,
    marginRight: scale(78)
  }
});