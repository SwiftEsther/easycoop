import { StyleSheet, Platform } from 'react-native';
import { systemWeights } from 'react-native-typography';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        color: '#000000',
        alignItems: 'stretch',
    },
    SectionStyle: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    intro_logo: {
        width: 258, 
        height: 145, 
    },
    input:  {
        flexDirection: "column",
    },
    input_margin_bottom: {
        marginBottom: 20
    },
    padded_label: {paddingBottom: 20},
    image_icon: {
        margin: 10,
    },
    input_with_icon:  {
        flexDirection: "column",
    },
    white_bg: {
        backgroundColor: '#ffffff',
    },
    screen_pad: {
        padding: 25,
    },
    gap_small: {
        marginTop: 2,
    },
    gap: {
        marginTop: 7,
    },
    gap_2: {
        marginTop: 13,
    },
    gap_3: {
        marginTop: 20,
    },
    gap_4: {
        marginTop: 18,
    },
    gap_5: {
        marginTop: 60,
    },
    gap_6: {
        marginTop: 45,
    },
    box_gap_wide: {
        marginTop: 75,
    },
    box_gap_tabbar: {
        marginTop: 100,
    },
    box_gap_wide2: {
        marginTop: 67,
    },
    box_gap_wide4: {
        marginTop: 58,
    },
    box_gap_wide5: {
        marginTop: 53,
    },
    box_gap_wide3: {
        marginTop: 50,
    },
    box_gap_more: {
        marginTop: 30,
    },
    box_gap: {
        marginTop: 20,
    },
    box_gap12: {
        marginTop: 12,
    },
    box_gap_mini: {
        marginTop: 7,
    },
    box_gap_mini2: {
        marginTop: 5,
    },
    textCenter: {
        textAlign: 'center',
    },
    textRight: {
        textAlign: 'right',
    },
    textTop: {
        textAlignVertical: 'top',
    },
    center_all: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput_ui_pad: {
        marginTop: 8,
    },
    pad_left: {
        paddingLeft: 8,
    },
    fill: {
        alignSelf: 'stretch',
    },
    flex: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    flex3: {
        flex: 3,
    },
    caption: {
        fontSize: 15,
        color: '#000000',
        ...systemWeights.bold
    },
    underline: {
        textDecorationLine: 'underline'
    },
    caption_lite: {
        fontSize: 15,
        color: '#585d5f',
    },
    caption_liter: {
        fontSize: 13,
        color: '#707070',

    },
    caption_liter2: {
        fontSize: 13,
        color: '#93989c',
    },
    caption_liter3: {
        fontSize: 13,
        color: '#585d5f',
    },
    font14: {
        fontSize: 14,
    },
    font15: {
        fontSize: 15,
    },
    font16: {
        fontSize: 16,
    },
    font17: {
        fontSize: 17,
    },
    font19: {
        fontSize: 19,
    },
    typo_thin: {
        ...systemWeights.thin,
    },
    typo_light_v2: {
        ...systemWeights.light,
    },
    typo_light: {
        ...systemWeights.regular,
    },
    typo_regular: {
        ...systemWeights.regular,
    },
    typo_bold: {
        ...systemWeights.bold,
    },
    pad_top12: {
        paddingTop: 12,
    },
    pad_top15: {
        paddingTop: 15,
    },
    pad_top20: {
        paddingTop: 20,
    },
    pad_top30: {
        paddingTop: 30,
    },
    pad_top8: {
        paddingTop: 8,
    },
    pad17: {
        padding: 17,
    },
    pad_bottom: {
        marginBottom: 15,
    },
    pad_bottom50: {
        marginBottom: 50,
    },
    pad_bottom30: {
        marginBottom: 30,
    },
    pad_bottom20: {
        marginBottom: 20,
    },
    pad_bottom_mini: {
        marginBottom: 4,
    },
    pad_bottom_mini_6: {
        marginBottom: 6,
    },
    pad_bottom_mini_1: { 
        marginBottom: 1,
    },
    pad_bottom_mini_3: {
        marginBottom: 3,
    },
    padTopBottom: {
        marginBottom: 7,
        marginTop: 12,
    },
    pad_bottom10: {
        marginBottom: 10,
    },
    row: {
        flexDirection : 'row',
        alignItems: 'center',
    },
    black: {
        color: '#000000'
    },
    white_clr: {
        color: '#ffffff',
    },
    margin_top_bottom30: {
        marginTop: 30,
        marginBottom: 30
    },
    margin_left_right_25: {
        marginLeft: 25,
        marginRight: 25
    },
});