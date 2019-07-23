import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ForgotPasswordScreen extends Component{
    render() {
        return(
            <View style={style.container}>
                <View style={style.RegisterView}>
                    <CustomTextInput sourceImage={R.images.email_icon} placeholderValue='Email'></CustomTextInput>

                    <CustomButton title='OK'></CustomButton>
                </View>
            </View>
        )
        
    }
}