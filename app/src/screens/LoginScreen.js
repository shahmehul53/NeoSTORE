import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends Component {
    

render(){
    return(
    <View style={style.container}>
        <View style={{flex:5, alignItems: 'center', justifyContent: 'center'}}>

         <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
          
        <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Username'></CustomTextInput>

        <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password'></CustomTextInput>

        <CustomButton title='LOGIN' onPress={()=> this.props.navigation.navigate('Home')} ></CustomButton>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
           <Text style={style.forgotBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>

        

        <View style={style.regAccount}>
            <View style={{flex:1}}>
            
            <Text style={style.regAccountText}>DONT HAVE AN ACCOUNT?</Text> 
            
            </View>
            <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}}>
            <Image source={R.images.Plus} style={{marginLeft: 100}} ></Image>
            </TouchableOpacity>
            </View>
        </View>
    </View>

    )
}
}