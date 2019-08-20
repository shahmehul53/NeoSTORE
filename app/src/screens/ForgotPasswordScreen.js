import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text, AsyncStorage} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Api from '../components/Api';

export default class ForgotPasswordScreen extends Component{
    constructor(){
        super()
        this.state = {
            datasource: [],
            email: "",
            access_token: ""
        }
    }

    

    async  forgotPassword(){
        const email = this.state.email;
        const { navigate } = this.props.navigation;
        return Api('users/forgot','POST',`email=${email}`)
         .then((responseJson)=>{
             this.setState({datasource: responseJson})
             if(this.state.datasource.status == 200){
                alert(this.state.datasource.user_msg)
                 setTimeout(function(){
                     navigate("Login");
                 }, 3000);    
             } 
             else if(this.state.datasource.status == 400){
                alert(this.state.datasource.user_msg)
             } 
             console.log(responseJson)
         }).catch(error => {
            console.error(error);
        });
    }

    render() {
        return(
            <View style={style.container}>
                <View style={style.RegisterView}>
                    <CustomTextInput sourceImage={R.images.email_icon} placeholderValue='Email' 
                    onChangeText={email => this.setState({ email })}
                    autoCapitalize="none"
                    keyboardType="email-address">
                    </CustomTextInput>

                    <CustomButton title='OK'
                    onPress={()=>this.forgotPassword()}></CustomButton>
                </View>
            </View>
        )
        
    }
}