import React from 'react';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';
import FadeInView from '../AnimatedComponents/FadeInView'
import { scale } from "../../lib/utils/scaleUtils";

const Toast = (props) => {
    return (
        <FadeInView style={[styles.container, styles[props.type]]}>
            <Text style={styles.text}>
                {props.message}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    props.onClickHandler()
                }}
                style={{
                    paddingRight: scale(10),
                    paddingLeft: scale(10),
                    paddingTop: scale(10),
                    paddingBottom: scale(10)
                }}
            >
                <Ionicons name={"md-close"} size={scale(20)}
                          color={'white'}/>
            </TouchableOpacity>
        </FadeInView>
    )
};

// class FadeInView extends React.Component {
//     state = {
//         fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
//     }
//
//     componentDidMount() {
//         Animated.timing(                  // Animate over time
//             this.state.fadeAnim,            // The animated value to drive
//             {
//                 toValue: 1,                   // Animate to opacity: 1 (opaque)
//                 duration: 500,              // Make it take a while
//             }
//         ).start();                        // Starts the animation
//     }
//
//     render() {
//         let { fadeAnim } = this.state;
//
//         return (
//             <Animated.View                 // Special animatable View
//                 style={[this.props.style,{opacity:fadeAnim}]}
//             >
//                 {this.props.children}
//             </Animated.View>
//         );
//     }
// }
export default Toast
